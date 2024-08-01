import { useEffect, useState } from 'react';
import Image from 'next/image';

type ImageUploadProps = {
  images: File[];
  setImages: (files: File[]) => void;
  imagePreviews: string[];
  setImagePreviews: (previews: string[]) => void;
};

const ImageUpload = ({
  images,
  setImages,
  imagePreviews,
  setImagePreviews,
}: ImageUploadProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files];

    if (newImages.length > 4) {
      setError('이미지는 최대 4개까지 업로드할 수 있습니다.');
    } else {
      setError(null);
      setImages(newImages);
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    }
  };

  const handleImageDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
        className="input no-focus"
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="image-previews flex space-x-2 mt-4 overflow-x-scroll">
        {imagePreviews.map((src, index) => (
          <div key={index} className="relative flex-none w-32 h-32">
            <Image
              src={src}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
              layout="fill"
              objectFit="cover"
            />
            <button
              type="button"
              onClick={() => handleImageDelete(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUpload;
