"use client";

import { useState, useEffect } from "react";
import useAdditionalData from "../../../../components/Form/useAdditionalData";

export default function FormImagesInput() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { addAdditionalData } = useAdditionalData();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleImageDelete = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const formData = new FormData();
    selectedImages.forEach(
      (file) => file.size && formData.append("images", file)
    );
    addAdditionalData(formData);
  }, [selectedImages]);

  return (
    <>
      <label className="block mb-4">
        <span className="text-gray-600">
          Upload images of the product you're ordering
        </span>
        <input
          type="file"
          name="selectedFiles"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="mt-1 block w-full p-2 border rounded border-gray-300"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-4">
        {selectedImages.map((image, index) => (
          <div
            key={index}
            className="relative w-32 h-32 border border-gray-300 rounded overflow-hidden"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleImageDelete(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              aria-label="Delete image"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
