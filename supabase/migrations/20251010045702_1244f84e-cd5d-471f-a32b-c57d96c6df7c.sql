-- Fix the security definer issue by recreating the view with SECURITY INVOKER
-- This ensures the view uses the permissions of the querying user, not the view creator

DROP VIEW IF EXISTS public.pdfs_public;

CREATE VIEW public.pdfs_public 
WITH (security_invoker = true)
AS
SELECT 
  id,
  subject_id,
  title,
  description,
  file_url,
  file_size,
  created_at
FROM public.pdfs;

-- Grant SELECT permission to authenticated and anonymous users on the view
GRANT SELECT ON public.pdfs_public TO authenticated, anon;

-- Add comment to document the view's purpose
COMMENT ON VIEW public.pdfs_public IS 'Public view of PDFs that excludes admin identity (uploaded_by field) for privacy protection. Uses SECURITY INVOKER for proper RLS enforcement.';