-- Persist watering photo proof as an inline data-URL blob.
-- These columns hold a (client-compressed) base64 data URL for now; the R2
-- migration will replace stored values with https object URLs. See
-- docs/photo-storage.md for the swap plan.
ALTER TABLE watering_logs ADD COLUMN photoProof TEXT;
ALTER TABLE watering_logs ADD COLUMN photoVerified INTEGER NOT NULL DEFAULT 0;
