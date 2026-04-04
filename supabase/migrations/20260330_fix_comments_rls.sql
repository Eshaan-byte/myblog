-- ============================================================
-- Migration: Fix Comments RLS Policies for CMS Operations
-- This migration updates the RLS policies to allow admins to
-- update and delete comments for moderation purposes
-- ============================================================

-- Drop existing comment policies
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can comment" ON public.comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
DROP POLICY IF EXISTS "Users and admins can delete comments" ON public.comments;

-- Create new policies with proper admin permissions

-- SELECT: Anyone can view approved comments, users can view their own, admins see all
CREATE POLICY "Comments visibility"
  ON public.comments FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- INSERT: Authenticated users can comment
CREATE POLICY "Authenticated users can comment"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can update their own comments, admins can update any comment
CREATE POLICY "Comments update policy"
  ON public.comments FOR UPDATE
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- DELETE: Users can delete their own comments, admins can delete any comment
CREATE POLICY "Comments delete policy"
  ON public.comments FOR DELETE
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Grant proper permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.comments TO authenticated;
