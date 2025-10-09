-- Fix contact information security by ensuring only authenticated admins can view contacts
-- This prevents any anonymous access attempts to the contacts table

-- Drop the existing policy
DROP POLICY IF EXISTS "Admins can view contacts" ON public.contacts;

-- Recreate with explicit authenticated requirement
CREATE POLICY "Admins can view contacts"
  ON public.contacts 
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Ensure the insert policy also specifies TO anonymous explicitly for clarity
DROP POLICY IF EXISTS "Anyone can insert contacts" ON public.contacts;

CREATE POLICY "Anyone can insert contacts"
  ON public.contacts 
  FOR INSERT
  TO anon
  WITH CHECK (true);