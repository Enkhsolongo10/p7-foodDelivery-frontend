"use client";
import { useState } from "react";

type ImageUploadProps = {
  onUpload: (url: string) => void;
};

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setLoading(true);

    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-delivery");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dvedrysvm/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.secure_url) onUpload(json.secure_url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <input type="file" onChange={handleUpload} className="..." />
      {loading && <p>Uploading...</p>}
    </>
  );
}