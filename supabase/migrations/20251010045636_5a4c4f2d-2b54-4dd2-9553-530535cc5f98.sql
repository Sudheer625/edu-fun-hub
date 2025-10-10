-- Phase 2: Database Security Hardening

-- Step 1: Fix update_updated_at_column function to set search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Step 2: Create a public view for PDFs that excludes uploaded_by field
CREATE OR REPLACE VIEW public.pdfs_public AS
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
COMMENT ON VIEW public.pdfs_public IS 'Public view of PDFs that excludes admin identity (uploaded_by field) for privacy protection';