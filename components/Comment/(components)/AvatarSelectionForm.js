import { useState } from "react";
import Image from "next/image";

// Assuming you have 11 images named 1.png, 2.png, etc., in the Avatar folder
const avatarImages = Array.from({ length: 11 }, (_, i) => `/Images/${i + 1}.png`);

const AvatarSelectionForm = ({ currentUserImage, onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(currentUserImage);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    onImageSelect(image); // Pass the selected image to the parent component
  };

  return (
    <div className="grid max-md:grid-cols-6 grid-cols-5 gap-4 mb-6">
      {avatarImages.map((image, index) => (
        <div key={index} className="cursor-pointer w-full">
          <Image
            src={image}
            alt={`Avatar ${index + 1}`}
            width={1200}
            height={1200}
            className={`rounded-full w-full aspect-square ${selectedImage === image ? "ring-4 ring-blue-500" : ""}`}
            onClick={() => handleImageSelect(image)}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarSelectionForm;
