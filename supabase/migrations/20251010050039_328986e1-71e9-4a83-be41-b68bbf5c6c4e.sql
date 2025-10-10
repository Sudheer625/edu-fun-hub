-- Make pdfs_public view security model explicit and prevent any write operations
-- The view is intentionally read-only and publicly accessible for PDF listings

-- First, ensure the view exists with security_invoker
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

-- Explicitly grant only SELECT to make it clear this is read-only
REVOKE ALL ON public.pdfs_public FROM PUBLIC, authenticated, anon;
GRANT SELECT ON public.pdfs_public TO authenticated, anon;

-- Add a trigger to prevent any INSERT/UPDATE/DELETE attempts on the view
CREATE OR REPLACE FUNCTION public.prevent_pdfs_public_modifications()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'The pdfs_public view is read-only. Use the pdfs table directly with proper admin permissions for modifications.';
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Create triggers to block any write operations
DROP TRIGGER IF EXISTS prevent_pdfs_public_insert ON public.pdfs_public;
CREATE TRIGGER prevent_pdfs_public_insert
  INSTEAD OF INSERT ON public.pdfs_public
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_pdfs_public_modifications();

DROP TRIGGER IF EXISTS prevent_pdfs_public_update ON public.pdfs_public;
CREATE TRIGGER prevent_pdfs_public_update
  INSTEAD OF UPDATE ON public.pdfs_public
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_pdfs_public_modifications();

DROP TRIGGER IF EXISTS prevent_pdfs_public_delete ON public.pdfs_public;
CREATE TRIGGER prevent_pdfs_public_delete
  INSTEAD OF DELETE ON public.pdfs_public
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_pdfs_public_modifications();

-- Update comment to document security model
COMMENT ON VIEW public.pdfs_public IS 'Read-only public view of PDFs that excludes admin identity (uploaded_by field) for privacy protection. Uses SECURITY INVOKER and inherits RLS from underlying pdfs table. Write operations are explicitly blocked via triggers.';