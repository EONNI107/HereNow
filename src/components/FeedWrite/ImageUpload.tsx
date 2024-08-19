import { useEffect, useState } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ImageUploadProps = {
  images: File[];
  setImages: (files: File[]) => void;
  imagePreviews: string[];
  setImagePreviews: (previews: string[]) => void;
  handleImageDelete?: (index: number) => void;
  isDesktop: boolean;
};

function ImageUpload({
  images,
  setImages,
  imagePreviews,
  setImagePreviews,
  handleImageDelete,
  isDesktop,
}: ImageUploadProps) {
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

  const handleLocalImageDelete = (index: number) => {
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

  if (isDesktop) {
    return (
      <div className="flex flex-col">
        <div className="flex items-center">
          <label
            htmlFor="file-upload"
            className="btn text-blue3 border-blue3 border-[1px] mr-6 rounded-[8px] cursor-pointer w-[104px] h-[46px] text-[20px] font-semibold flex justify-center items-center hover:bg-blue3 hover:text-white transition-colors duration-300"
          >
            사진 첨부
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="hidden"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="image-previews grid grid-cols-3 gap-4 mt-4">
          {imagePreviews.map((src, index) => (
            <div
              key={index}
              className="relative flex-none w-32 h-32 bg-gray-300"
            >
              <Image
                src={src}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
                fill
              />
              <XMarkIcon
                onClick={() => {
                  if (handleImageDelete) {
                    handleImageDelete(index);
                  } else {
                    handleLocalImageDelete(index);
                  }
                }}
                className="absolute top-1 right-1 bg-gray2 bg-opacity-50 rounded-md h-5 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          className="input no-focus text-sm"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="image-previews flex space-x-2 mt-4 overflow-x-scroll">
          {imagePreviews.map((src, index) => (
            <div
              key={index}
              className="relative flex-none w-32 h-32 bg-gray-300"
            >
              <Image
                src={src}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
                fill
              />
              <XMarkIcon
                onClick={() => {
                  if (handleImageDelete) {
                    handleImageDelete(index);
                  } else {
                    handleLocalImageDelete(index);
                  }
                }}
                className="absolute top-1 right-1 bg-gray2 bg-opacity-50 rounded-md h-5 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default ImageUpload;
