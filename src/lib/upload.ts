import imageCompression from "browser-image-compression";
import { supabase } from "./supabase";

/**
 * Compresses an image file and uploads it to Supabase Storage.
 * @param file The original File from an input.
 * @param bucket Specified storage bucket (defaults to 'dishes').
 * @returns The public URL of the uploaded image.
 */
export const uploadImage = async (file: File, bucket: string = "dishes"): Promise<string> => {
  try {
    // 1. Compression Settings
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      fileType: "image/webp", // Standardize on webp for efficiency
    };

    const compressedFile = await imageCompression(file, options);

    // 2. Generate Unique Filename
    const fileExt = "webp";
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    // 3. Upload to Supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, compressedFile, {
        contentType: "image/webp",
        upsert: false,
      });

    if (error) throw error;

    // 4. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Compression/Upload Error:", error);
    throw new Error("Failed to showcase your culinary craft. Please try a different photo.");
  }
};
