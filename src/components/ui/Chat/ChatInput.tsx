"use client";

import { useState, useRef } from "react";
import { ArrowUp, Sparkles, Upload, X, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSubmit: (text: string, imageFiles: File[]) => void;
  isLoading?: boolean;
}

export default function ChatInput({
  onSubmit,
  isLoading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [autoPrice, setAutoPrice] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const newImageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (newImageFiles.length > 0) {
      addImages(newImageFiles);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (newImageFiles.length > 0) {
      addImages(newImageFiles);
    }
  };

  const addImages = (files: File[]) => {
    const newFiles = files.slice(0, 4 - imageFiles.length);
    if (newFiles.length === 0) return;

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setImageFiles([...imageFiles, ...newFiles]);
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);

    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleSubmitMessage = () => {
    if (isLoading) return;

    if (message.trim() === "" && imageFiles.length === 0) return;

    onSubmit(message, imageFiles);

    setMessage("");
    clearAllImages();

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const clearAllImages = () => {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImageFiles([]);
    setImagePreviews([]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`bg-white border rounded-2xl shadow-sm p-4 relative transition ${
          dragActive ? "ring-2 ring-purple-400" : ""
        }`}
      >
        {/* Multiple Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {imagePreviews.map((url, idx) => (
              <div key={idx} className="relative w-20 h-20">
                <img
                  src={url}
                  alt={`Preview ${idx}`}
                  className="w-full h-full object-cover rounded-xl shadow-sm"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute -top-1 -right-1 bg-white border rounded-full p-0.5 shadow"
                  type="button"
                >
                  <X size={12} className="text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <div className="flex gap-3">
          <Sparkles size={20} className="text-purple-500 mt-1 shrink-0" />
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Tell me what you want to sell or drop a photo — or just hit enter"
            className="w-full resize-none text-sm text-gray-700 p-1 focus:outline-none bg-transparent min-h-[2.5rem] max-h-[120px] overflow-y-auto"
            disabled={isLoading}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          {/* Upload */}
          <label
            htmlFor="fileInput"
            className={`flex items-center px-3 py-1 shadow-md rounded-full text-sm text-black cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
          >
            <Upload size={14} className="mr-1" /> Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            id="fileInput"
            disabled={isLoading || imageFiles.length >= 4}
          />

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={autoPrice}
                onChange={() => setAutoPrice(!autoPrice)}
                disabled={isLoading}
              />
              <div className="relative w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-purple-500 transition-colors">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </div>
              <span className="ml-2 text-sm text-black">Auto Price</span>
            </label>

            <button
              className={`w-8 h-8 px-[6px] rounded-full text-white font-medium text-sm
                transition-all duration-200 hover:scale-105 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              onClick={handleSubmitMessage}
              disabled={
                isLoading || (message.trim() === "" && imageFiles.length === 0)
              }
              style={{
                background: "linear-gradient(180deg, #9BA2FE 0%, #615FFF 100%)",
                boxShadow: `
                  0 1px 0 0 rgba(255, 255, 255, 0.50) inset,
                  0 -2px 2px 0 rgba(10, 10, 10, 0.10) inset,
                  0 0 0 1px #432DD7,
                  0 3px 4px -1px rgba(0, 0, 0, 0.25)
                `,
              }}
              type="button"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <ArrowUp size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
