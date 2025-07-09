-- Create canvases table
CREATE TABLE canvases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create canvas versions table for history
CREATE TABLE canvas_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  canvas_id UUID REFERENCES canvases(id) ON DELETE CASCADE,
  version_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE canvases ENABLE ROW LEVEL SECURITY;
ALTER TABLE canvas_versions ENABLE ROW LEVEL SECURITY;

-- Canvas policies
CREATE POLICY "Users can view their own canvases" 
  ON canvases FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own canvases" 
  ON canvases FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own canvases" 
  ON canvases FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own canvases" 
  ON canvases FOR DELETE 
  USING (auth.uid() = user_id);

-- Canvas versions policies
CREATE POLICY "Users can view versions of their own canvases" 
  ON canvas_versions FOR SELECT 
  USING (auth.uid() = (SELECT user_id FROM canvases WHERE id = canvas_id));

CREATE POLICY "Users can create versions of their own canvases" 
  ON canvas_versions FOR INSERT 
  WITH CHECK (auth.uid() = (SELECT user_id FROM canvases WHERE id = canvas_id));
