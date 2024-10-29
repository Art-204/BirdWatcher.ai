'use client';

import { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  loading?: boolean;
}

export default function ImageUploader({ onImageSelected, loading = false }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const captureImage = (e: React.MouseEvent) => {
    e.preventDefault();

    // Create a Promise to handle the camera capture
    const getCameraImage = () => {
      return new Promise<File>((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';

        // Set up the change handler before clicking
        input.onchange = async () => {
          try {
            const file = input.files?.[0];
            if (!file) {
              reject(new Error('No file selected'));
              return;
            }

            // Read the file data immediately
            const reader = new FileReader();
            reader.onloadend = async () => {
              try {
                // Convert base64 to blob
                const response = await fetch(reader.result as string);
                const blob = await response.blob();

                // Create a new file from the blob
                const newFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });

                resolve(newFile);
              } catch (error) {
                reject(error);
              }
            };
            reader.onerror = () => reject(new Error('Error reading file'));
            reader.readAsDataURL(file);
          } catch (error) {
            reject(error);
          }
        };

        // Handle cancel
        input.oncancel = () => reject(new Error('User cancelled'));

        // Trigger file selection
        input.click();
      });
    };

    // Handle the camera capture
    getCameraImage()
      .then(capturedFile => {
        // Create preview URL
        const previewUrl = URL.createObjectURL(capturedFile);

        // Update state
        setFile(capturedFile);
        setPreview(previewUrl);

        // Start identification process
        onImageSelected(capturedFile);
      })
      .catch(error => {
        console.error('Camera capture error:', error);
      });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreview(previewUrl);
    }
  };

  const resetImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md" onClick={e => e.preventDefault()}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        onClick={e => e.stopPropagation()}
      />

      {preview ? (
        <>
          <div className="relative aspect-[4/3] mb-4">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="rounded-lg object-contain"
              priority
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                resetImage();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!loading && file && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onImageSelected(file);
              }}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Identify Bird
            </button>
          )}
        </>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current?.click();
            }}
            className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-8 hover:border-blue-500 transition-colors"
          >
            <Upload className="w-10 h-10 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600 text-center">Upload Image</p>
          </button>

          <button
            type="button"
            onClick={captureImage}
            className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-8 hover:border-blue-500 transition-colors"
          >
            <Camera className="w-10 h-10 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600 text-center">Take Photo</p>
          </button>
        </div>
      )}

      {loading && (
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Identifying Bird...</span>
          </div>
        </div>
      )}
    </div>
  );
}