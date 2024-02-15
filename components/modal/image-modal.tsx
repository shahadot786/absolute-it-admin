"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import { Input } from "../ui/input";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  imageUrl: string;
  handleImageChange: any;
  handleUpload: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  imageUrl,
  handleImageChange,
  handleUpload,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Upload Image"
      description="Please upload image first..."
      isOpen={isOpen}
      onClose={onClose}
    >
      {imageUrl && (
        <Image src={imageUrl} width={200} height={180} alt="Product Picture" />
      )}
      <Input
        type="file"
        alt="Product Image"
        onChange={handleImageChange}
        className="w-1/2"
      />
      <Button
        disabled={loading}
        variant="secondary"
        onClick={handleUpload}
        className="my-5"
      >
        Upload Image
      </Button>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        {!imageUrl && (
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        {imageUrl && (
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Ok
          </Button>
        )}
      </div>
    </Modal>
  );
};
