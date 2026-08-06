// Photo storage seam — the ONE place picture persistence changes when we move
// off inline blobs.
//
// Blob mode (current): the client compresses the image and we persist the
// resulting base64 data URL directly in the database (watering_logs.photoProof).
// No object storage required.
//
// R2 mode (future): implement the R2 branch below to decode the data URL, PUT
// the bytes into the bucket, and return a public https URL instead. Route code
// and the frontend (`<img src>`) work unchanged with either return value.
// See docs/photo-storage.md for the full migration plan.

export interface PhotoStoreEnv {
  PHOTOS?: R2Bucket;
}

export async function storePhoto(dataUrl: string, _env: PhotoStoreEnv): Promise<string> {
  // R2 mode (future):
  //   if (_env.PHOTOS && dataUrl.startsWith('data:')) {
  //     const [meta, b64] = dataUrl.split(',');
  //     const contentType = meta.slice(5, meta.indexOf(';')) || 'image/jpeg';
  //     const bytes = Uint8Array.from(atob(b64), (ch) => ch.charCodeAt(0));
  //     const key = `photos/${Date.now()}-${crypto.randomUUID()}`;
  //     await _env.PHOTOS.put(key, bytes, { httpMetadata: { contentType } });
  //     return `https://verde-sector-5-photos.r2.dev/${key}`;
  //   }

  // Blob mode (current): store the compressed data URL as-is.
  return dataUrl;
}
