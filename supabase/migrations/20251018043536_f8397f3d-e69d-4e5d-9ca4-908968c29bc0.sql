-- Remove the conflicting public SELECT policy from pdfs table
-- This ensures only admins can query the pdfs table directly
-- Public access should use the pdfs_public view instead
DROP POLICY IF EXISTS "Everyone can select pdfs" ON public.pdfs;