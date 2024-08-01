import { useEffect } from 'react';

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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
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
      <div className="image-previews flex flex-wrap space-x-2">
        {imagePreviews.map((src, index) => (
          <div key={index} className="relative">
            <img
              src={src}
              alt={`Preview ${index}`}
              className="preview w-32 h-32 object-cover"
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
