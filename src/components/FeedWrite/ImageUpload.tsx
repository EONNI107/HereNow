import { useEffect } from 'react';

type ImageUploadProps = {
  images: File[];
  setImages: (files: File[]) => void;
  imagePreviews: string[];
  setImagePreviews: (previews: string[]) => void;
};

const ImageUpload = ({
  setImages,
  imagePreviews,
  setImagePreviews,
}: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
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
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            className="preview"
          />
        ))}
      </div>
    </>
  );
};

export default ImageUpload;
