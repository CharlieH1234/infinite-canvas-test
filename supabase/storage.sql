-- Storage bucket policies for canvas images
-- These policies ensure users can only access their own images

-- Create the canvas-images bucket if it doesn't exist
-- Note: You'll need to create this bucket through the Supabase dashboard first
-- Then apply these policies

-- Policy for uploading images - users can only upload to their own folder
CREATE POLICY "Users can upload their own images"
  ON storage.objects FOR INSERT
  WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);

-- Policy for viewing images - users can only view their own images
CREATE POLICY "Users can view their own images"
  ON storage.objects FOR SELECT
  USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Policy for updating images - users can only update their own images
CREATE POLICY "Users can update their own images"
  ON storage.objects FOR UPDATE
  USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Policy for deleting images - users can only delete their own images
CREATE POLICY "Users can delete their own images"
  ON storage.objects FOR DELETE
  USING (auth.uid()::text = (storage.foldername(name))[1]);
