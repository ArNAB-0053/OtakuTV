import { useState } from "react";
import Image from "next/image";

// Assuming you have 11 images named 1.png, 2.png, etc., in the Avatar folder
const avatarImages = Array.from({ length: 11 }, (_, i) => 
    `https://firebasestorage.googleapis.com/v0/b/internproject-5d594.appspot.com/o/${i + 1}.png?alt=media&token=a116e95c-e213-4f2c-bbd2-73319218d834`
  );

const AvatarSelectionForm = ({ currentUserImage, onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(currentUserImage);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    onImageSelect(image); // Pass the selected image to the parent component
  };

  return (
    <div className="grid max-sm:grid-cols-6 sm:grid-cols-8 md:grid-cols-5 gap-4 mb-6">
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
