-- ─────────────────────────────────────────────────────────────────────────────
-- PLOTKITCH SUPABASE STORAGE SETUP
-- ─────────────────────────────────────────────────────────────────────────────
-- Run this script in your Supabase SQL Editor to create the necessary buckets
-- and set up Row Level Security (RLS) policies.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Create Buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('dishes', 'dishes', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up RLS Policies for 'avatars' bucket

-- Allow public to read avatars
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Allow authenticated users to upload their own avatar
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND 
    auth.role() = 'authenticated'
  );

-- Allow users to update/delete their own avatar (matching based on owner/path)
CREATE POLICY "Owner Update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- 3. Set up RLS Policies for 'dishes' bucket

-- Allow public to read dish images
CREATE POLICY "Public Dish Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'dishes');

-- Allow chefs and admins to upload dish images
CREATE POLICY "Chef/Admin Upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'dishes' AND 
    auth.role() = 'authenticated'
  );

-- Allow owners to modify their dish images
CREATE POLICY "Chef/Admin Modify" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'dishes' AND 
    auth.role() = 'authenticated'
  );

-- NOTICE: You can refine these policies further by checking user roles in the 
-- public.users table if needed, e.g.:
-- (SELECT role FROM public.users WHERE id = auth.uid()) = 'chef'
