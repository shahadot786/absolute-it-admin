import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { storage } from "@/firebase";

interface ImageUploadResult {
  image: File | null;
  imageUrl: string;
  uploadProgress: number;
  error: Error | null;
  setImage: (image: File) => void;
  uploadImage: () => void;
}

const useImageUpload = (): ImageUploadResult => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async () => {
    if (!image) return;

    const storageRef: StorageReference = ref(
      storage,
      "Products-images/" + image.name
    );
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setError(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return { image, setImage, imageUrl, uploadImage, uploadProgress, error };
};

export default useImageUpload;
