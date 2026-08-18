-- Mosconi Inmobiliaria — CMS schema
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS / OR REPLACE / DROP ... IF EXISTS).

-- ---------------------------------------------------------------------------
-- 1. properties
-- ---------------------------------------------------------------------------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',

  price numeric,
  currency text not null default 'USD',

  -- Free text on purpose (not an enum): the agency's catalog of property
  -- types/operations may grow, and a rigid CHECK would force a migration
  -- every time. The admin form offers a fixed select with common values.
  property_type text not null,
  operation text not null,

  -- `zone` is the coarse area tag used by the public site's filter buttons
  -- (Salta Capital / Zona Norte / Tres Cerritos / San Lorenzo / Vaqueros).
  -- `location` is the human-readable place description shown on cards.
  -- `address` is an optional precise street address, shown only internally
  -- for now (not all listings have one).
  zone text,
  location text not null default '',
  address text,

  surface_total numeric,
  surface_covered numeric,
  bedrooms integer,
  bathrooms integer,
  rooms integer,

  features text[] not null default '{}',

  featured boolean not null default false,
  published boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_published_idx on public.properties (published);
create index if not exists properties_featured_idx on public.properties (featured);
create index if not exists properties_slug_idx on public.properties (slug);

-- Keep updated_at current on every row change.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists properties_set_updated_at on public.properties;
create trigger properties_set_updated_at
  before update on public.properties
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 2. property_images
-- ---------------------------------------------------------------------------
create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  storage_path text not null,
  -- Lowest position = cover/main image, matching the public site's
  -- convention that images[0] is always the main photo.
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists property_images_property_id_idx on public.property_images (property_id);

-- ---------------------------------------------------------------------------
-- 3. Row Level Security
-- ---------------------------------------------------------------------------
alter table public.properties enable row level security;
alter table public.property_images enable row level security;

-- Public visitors (anon + authenticated) can only read published properties.
drop policy if exists "public read published properties" on public.properties;
create policy "public read published properties"
  on public.properties for select
  to anon, authenticated
  using (published = true);

-- Logged-in admin (any authenticated user — this is a single-admin site,
-- so no extra role table is needed) can read every property, published or
-- not. Combined with the policy above via OR, per Postgres RLS semantics.
drop policy if exists "admin read all properties" on public.properties;
create policy "admin read all properties"
  on public.properties for select
  to authenticated
  using (true);

drop policy if exists "admin write properties" on public.properties;
create policy "admin write properties"
  on public.properties for all
  to authenticated
  using (true)
  with check (true);

-- Images: publicly visible only when the parent property is published.
drop policy if exists "public read images of published properties" on public.property_images;
create policy "public read images of published properties"
  on public.property_images for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.properties p
      where p.id = property_images.property_id
        and p.published = true
    )
  );

drop policy if exists "admin read all images" on public.property_images;
create policy "admin read all images"
  on public.property_images for select
  to authenticated
  using (true);

drop policy if exists "admin write images" on public.property_images;
create policy "admin write images"
  on public.property_images for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- 4. Storage bucket for property photos
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

drop policy if exists "public read property images" on storage.objects;
create policy "public read property images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'property-images');

drop policy if exists "admin manage property images" on storage.objects;
create policy "admin manage property images"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'property-images')
  with check (bucket_id = 'property-images');
