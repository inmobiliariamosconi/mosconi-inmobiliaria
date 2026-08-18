-- Mosconi Inmobiliaria — security hardening follow-up (2026-08-18 audit)
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement is idempotent (DROP ... IF EXISTS / ON CONFLICT).
--
-- Fixes confirmed by a live, non-destructive test against this project:
--
-- 1) The Storage "public read" policy only checked `bucket_id`, unlike the
--    equivalent `property_images` table policy, which also checks that the
--    parent property is published. That gap meant an anonymous visitor could
--    list the entire bucket (enumerating every property's folder, including
--    draft/unpublished ones) and fetch those images directly — even though
--    the property record itself was correctly hidden. This migration scopes
--    the anon read policy the same way the table policy already is.
--
-- 2) The bucket had no file size limit or MIME type allowlist, so it would
--    accept arbitrarily large files or non-image uploads. Only the
--    authenticated admin can upload at all (unaffected by this), but this
--    adds server-side enforcement to match "only images" as intended —
--    the app's own upload UI already restricts this client-side, which
--    isn't sufficient on its own since it's trivially bypassable.

-- ---------------------------------------------------------------------------
-- 1. Scope anon's Storage read access to published properties only
-- ---------------------------------------------------------------------------
drop policy if exists "public read property images" on storage.objects;
create policy "public read property images"
  on storage.objects for select
  to anon
  using (
    bucket_id = 'property-images'
    and exists (
      select 1
      from public.property_images pi
      join public.properties p on p.id = pi.property_id
      where pi.storage_path = storage.objects.name
        and p.published = true
    )
  );

-- The admin (any authenticated user, per the single-admin model already in
-- 0001_init.sql) still gets full read access to every image, published or
-- not, via the existing "admin manage property images" policy (`for all`,
-- unscoped by published) — no change needed there.

-- ---------------------------------------------------------------------------
-- 2. Restrict the bucket to images only, capped at 10MB per file
-- ---------------------------------------------------------------------------
update storage.buckets
set file_size_limit = 10485760, -- 10 MB
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
where id = 'property-images';
