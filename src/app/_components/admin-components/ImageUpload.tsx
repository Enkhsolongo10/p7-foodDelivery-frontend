import { useState } from "react";

type ImageUploadProps = {
  onUpload: (url: string) => void;
};

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-delivery");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dvedrysvm/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.secure_url) {
        setTimeout(() => {
          setImageUrl(json.secure_url);
          onUpload(json.secure_url);
        }, 300);
      }
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) handleUpload(e.target.files[0]);
  }

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={onChangeHandler}
        accept="image/*"
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center border bg-[#2563EB0D] border-dashed rounded-lg cursor-pointer overflow-hidden"
        style={{ minHeight: 150 }}
      >
        <div className="flex flex-col items-center justify-center transition-opacity ease-in-out">
          {loading ? (
            <div className="w-[412px] h-[138px] border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="object-cover w-[412px] h-[180px] opacity-0 transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
            />
          ) : (
            <>
              <img
                className="w-[30px] h-[30px]"
                src="https://res.cloudinary.com/dvedrysvm/image/upload/v1754897699/ah6y2b45vhyjcxtqzwsw.png"
                alt="logo"
              />
              <p className="text-[14px]">Choose a file or drag & drop it here</p>
            </>
          )}
        </div>
      </label>
    </div>
  );
}