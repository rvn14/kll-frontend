"use client";

import { FileImage, Trash2, UploadCloud, Loader2 } from "lucide-react";
import { useState } from "react";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export function ImageUploader({ defaultImages = [], onImagesChange }: { defaultImages?: string[], onImagesChange: (urls: string[]) => void }) {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    const newUrls: string[] = [];
    
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        
        const res = await apiClient.post<{ blob_url: string }>(apiEndpoints.uploads, formData);
        if (res.blob_url) {
          newUrls.push(res.blob_url);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
    
    const updatedImages = [...images, ...newUrls];
    setImages(updatedImages);
    onImagesChange(updatedImages);
    setIsUploading(false);
  };

  return (
    <div>
      <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-soft-strong bg-soft/20 p-8 text-center text-brand transition hover:bg-soft/35">
        {isUploading ? <Loader2 className="size-9 animate-spin" /> : <UploadCloud className="size-9" />}
        <span className="mt-4 text-lg font-black">{isUploading ? "Uploading..." : "Drop product media here"}</span>
        <span className="mt-2 text-sm text-ink-muted">or select PNG, JPG or WebP files</span>
        <input 
          type="file" 
          accept="image/png,image/jpeg,image/webp" 
          multiple 
          className="sr-only" 
          disabled={isUploading}
          onChange={(event) => {
            if (event.target.files) {
              handleUpload(Array.from(event.target.files));
            }
          }} 
        />
      </label>
      
      {images.length > 0 && (
        <div className="mt-5 space-y-3">
          {images.map((url, index) => (
            <div className="flex items-center gap-3 rounded-2xl border border-border p-3" key={`${url}-${index}`}>
              <div className="flex size-11 shrink-0 overflow-hidden rounded-2xl bg-soft/45">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Uploaded ${index}`} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-brand">{url.split('/').pop()}</p>
                <p className="mt-1 text-xs text-ink-muted">Uploaded</p>
              </div>
              <button 
                type="button"
                onClick={() => {
                  const updated = images.filter((_, i) => i !== index);
                  setImages(updated);
                  onImagesChange(updated);
                }} 
                className="flex size-11 items-center justify-center rounded-full text-red-700 hover:bg-red-50" 
                aria-label={`Remove image`}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
