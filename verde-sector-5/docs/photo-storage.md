# Photo storage — blob now, R2 later

## Current approach: inline data-URL blobs

Pictures (watering proof photos) are stored as **base64 data-URL blobs**, not as
objects in a bucket. This needs no object storage and runs entirely on the
Cloudflare free tier.

Flow:

1. **Client compresses** the uploaded image before it ever leaves the browser —
   `compressImage()` in `web-dashboard/src/components/UI/WateringModal.tsx`
   downscales to ≤1000px and re-encodes as JPEG (quality 0.7), typically
   ~50–150 KB. This keeps blobs small enough for D1 and request payloads.
2. The compressed **data URL is sent** as `photoProofUrl` to
   `POST /api/v1/trees/:id/water`.
3. The backend passes it through the storage seam
   `cloudflare-backend/src/lib/photoStore.ts` (`storePhoto()`), which currently
   returns the data URL unchanged.
4. It's persisted in **`watering_logs.photoProof`** (a `TEXT` column added by
   `migrations/0003_watering_photo.sql`), alongside `photoVerified`.
5. The frontend renders it with `<img src={photoProof}>` — a data URL works
   directly.

### Constraints / notes
- Compression is the guardrail: without it a 5 MB upload becomes ~6.7 MB of
  base64 and would exceed D1 limits and bloat rows. Keep `compressImage` in the
  path for any new upload UI.
- Blobs live in the DB row, so they count against D1 storage and are returned in
  full by any query that selects `photoProof`. Select it only when needed.

## Migration to R2 (later)

R2 is currently **not enabled** on the account (`wrangler r2 bucket create`
returns `code 10042`). When we want real object storage:

1. **Enable R2** in the Cloudflare dashboard and create the bucket:
   `wrangler r2 bucket create verde-sector-5-photos`.
2. **Re-enable the binding** in `cloudflare-backend/wrangler.toml` (uncomment the
   `[[r2_buckets]]` block — binding `PHOTOS`).
3. **Implement the R2 branch** in `src/lib/photoStore.ts` — the commented block
   already sketches it: decode the data URL, `PHOTOS.put(key, bytes, …)`, return
   the public `https://…r2.dev/<key>` URL. This is the *only* code change needed;
   the route and frontend are untouched (an `<img src>` works with either a data
   URL or an https URL).
4. **Backfill** existing rows: a one-off script that reads `watering_logs` where
   `photoProof LIKE 'data:%'`, uploads each to R2, and rewrites the column to the
   R2 URL. (Optional — old blobs keep working as-is.)
5. Optionally expose photos via a custom domain / `r2.dev` public bucket and set
   a cache policy.

Because every write goes through `storePhoto()` and every read is just an
`<img src>`, the swap is isolated to that one function plus config.
