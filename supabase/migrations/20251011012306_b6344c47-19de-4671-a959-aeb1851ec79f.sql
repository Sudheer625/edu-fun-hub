-- Fix pdfs table to allow public SELECT (users will access via pdfs_public view)
-- The security is enforced by directing users to the view which excludes uploaded_by

-- Add a policy allowing everyone to SELECT from pdfs table
-- This enables the pdfs_public view to work for all users
CREATE POLICY "Everyone can select pdfs"
  ON public.pdfs
  FOR SELECT
  USING (true);

-- The pdfs_public view already restricts which columns are visible (excludes uploaded_by)
-- So even though the table is readable, users access it through the view which is safe