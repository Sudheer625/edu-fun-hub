-- Fix pdfs table to restrict public SELECT access
-- Public users should use pdfs_public view, not the table directly

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Everyone can view pdfs" ON public.pdfs;

-- Create admin-only SELECT policy on the main table
CREATE POLICY "Admins can view all pdfs"
  ON public.pdfs
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Note: Public access is provided through the pdfs_public view which excludes uploaded_by
COMMENT ON TABLE public.pdfs IS 'PDF metadata including admin information (uploaded_by). Direct access restricted to admins. Public access provided through pdfs_public view which excludes sensitive fields.';