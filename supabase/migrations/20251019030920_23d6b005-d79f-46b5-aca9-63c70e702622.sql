-- Allow authenticated users to view PDFs
CREATE POLICY "Authenticated users can select pdfs"
ON public.pdfs
FOR SELECT
USING (auth.uid() IS NOT NULL);