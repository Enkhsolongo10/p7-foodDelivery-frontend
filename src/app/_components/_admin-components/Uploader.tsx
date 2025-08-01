"use client";

import { useState } from "react";

type Props = {
  onUpload: (url: string) => void;
};

export function Uploader({ onUpload }: Props) {
  const [preview, setPreview] = useState<string>();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fd-admin-images");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvedrysvm/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
      } else {
        console.error("Cloudinary upload error:", data);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-1">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-[150px] h-[100px] object-cover rounded-md"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm"
      />
      {uploading && <p className="text-xs text-gray-500">Uploading...</p>}
    </div>
  );
}