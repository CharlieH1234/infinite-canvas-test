import { useState, useEffect } from 'react';
import { supabase, getCurrentUser } from '../lib/supabase';
import { CanvasState } from '../types/canvas.types';

/**
 * Hook for interacting with Supabase services
 */
export const useSupabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Check for user on mount
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    checkUser();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  /**
   * Save canvas to Supabase
   */
  const saveCanvas = async (title: string, canvasState: CanvasState, thumbnailUrl?: string) => {
    if (!user) {
      setError('You must be logged in to save a canvas');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: saveError } = await supabase
        .from('canvases')
        .insert({
          user_id: user.id,
          title,
          data: canvasState,
          thumbnail_url: thumbnailUrl,
        })
        .select()
        .single();

      if (saveError) {
        throw saveError;
      }

      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to save canvas');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update an existing canvas in Supabase
   */
  const updateCanvas = async (canvasId: string, canvasState: CanvasState, thumbnailUrl?: string) => {
    if (!user) {
      setError('You must be logged in to update a canvas');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('canvases')
        .update({
          data: canvasState,
          thumbnail_url: thumbnailUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', canvasId)
        .eq('user_id', user.id);

      if (updateError) {
        throw updateError;
      }

      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update canvas');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Save a version of the canvas for history
   */
  const saveCanvasVersion = async (canvasId: string, versionData: CanvasState) => {
    if (!user) {
      setError('You must be logged in to save a canvas version');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: versionError } = await supabase
        .from('canvas_versions')
        .insert({
          canvas_id: canvasId,
          version_data: versionData,
        });

      if (versionError) {
        throw versionError;
      }

      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to save canvas version');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get all canvases for the current user
   */
  const getUserCanvases = async () => {
    if (!user) {
      setError('You must be logged in to fetch canvases');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('canvases')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      return data || [];
    } catch (err: any) {
      setError(err.message || 'Failed to fetch canvases');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get a specific canvas by ID
   */
  const getCanvas = async (canvasId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('canvases')
        .select('*')
        .eq('id', canvasId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch canvas');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a canvas
   */
  const deleteCanvas = async (canvasId: string) => {
    if (!user) {
      setError('You must be logged in to delete a canvas');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('canvases')
        .delete()
        .eq('id', canvasId)
        .eq('user_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete canvas');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Upload an image to Supabase storage
   */
  const uploadImage = async (file: File | Blob, fileName: string) => {
    if (!user) {
      setError('You must be logged in to upload images');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: uploadError } = await supabase.storage
        .from('canvas-images')
        .upload(`${user.id}/${fileName}`, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('canvas-images')
        .getPublicUrl(`${user.id}/${fileName}`);

      return publicUrlData.publicUrl;
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    saveCanvas,
    updateCanvas,
    saveCanvasVersion,
    getUserCanvases,
    getCanvas,
    deleteCanvas,
    uploadImage,
  };
};
