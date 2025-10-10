-- Make profiles table RLS policies explicitly block anonymous users
-- Current policies use auth.uid() which returns NULL for anonymous users,
-- but we'll make this more explicit by specifying TO authenticated

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Block all anonymous access to profiles" ON public.profiles;

-- Recreate policies with explicit authenticated requirement
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Add explicit deny policy for anonymous users (belt and suspenders approach)
CREATE POLICY "Block all anonymous access to profiles"
  ON public.profiles
  FOR ALL
  TO anon
  USING (false);

-- Update table comment to document security model
COMMENT ON TABLE public.profiles IS 'User profile data. RLS enabled with policies that only allow authenticated users to access their own profile. Anonymous access is explicitly blocked.';