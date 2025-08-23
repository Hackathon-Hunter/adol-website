"use client";

import { useState } from "react";
import { ChatIcon } from "@/components/icons";
import { ArrowUp, Sparkles, Upload, X } from "lucide-react";
import { fileToBase64, analyzeImageForProductListing, getAnalysisCost, type ProductListing } from "@/service/api/openaiService";

interface ChatInputProps {
  onSubmit: (data: { 
    text: string; 
    images: File[]; 
    hasImages: boolean;
    onAnalysisComplete?: (results: ProductListing[]) => void;
  }) => void;
}

export default function ChatInput({ onSubmit }: ChatInputProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...urls]);
    setUploadedFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...urls]);
    setUploadedFiles((prev) => [...prev, ...imageFiles]);
  };

  const removeImage = (url: string, index: number) => {
    setPreviews((prev) => prev.filter((img, idx) => idx !== index));
    setUploadedFiles((prev) => prev.filter((file, idx) => idx !== index));
    URL.revokeObjectURL(url); // Clean up memory
  };

  const handleSubmit = async () => {
    if (isAnalyzing) return;
    
    const hasImages = uploadedFiles.length > 0;
    const hasText = inputText.trim().length > 0;
    
    if (!hasImages && !hasText) return;

    // Pass data to parent component - it will handle the analysis
    onSubmit({
      text: inputText,
      images: uploadedFiles,
      hasImages: hasImages
    });
    
    // Reset form
    setInputText("");
    setPreviews([]);
    setUploadedFiles([]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20">
      {/* Input Card */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`bg-white border rounded-2xl shadow-sm mt-6 p-4 relative transition ${dragActive ? "ring-2 ring-purple-400" : ""
          }`}
      >
        {/* Multiple Image Previews */}
        {previews.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {previews.map((url, idx) => (
              <div key={idx} className="relative w-20 h-20">
                <img
                  src={url}
                  alt={`Preview ${idx}`}
                  className="w-full h-full object-cover rounded-xl shadow-sm"
                />
                <button
                  onClick={() => removeImage(url, idx)}
                  className="absolute -top-1 -right-1 bg-white border rounded-full p-0.5 shadow"
                >
                  <X size={12} className="text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <div className="flex gap-3">
          <Sparkles size={20} className="text-purple-500 mt-1" />
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tell me what you want to sell or drop a quick snap works — or just hit enter"
            className="w-full resize-none text-sm text-gray-500 p-2 focus:outline-none bg-transparent"
            rows={2}
            disabled={isAnalyzing}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          {/* Upload */}
          <label
            htmlFor="fileInput"
            className="flex items-center px-3 py-1 shadow-md rounded-full text-sm text-black cursor-pointer"
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
          />

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="relative w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-purple-500 transition-colors">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </div>
              <span className="ml-2 text-sm text-black">Auto Price</span>
            </label>

            <button
              className="w-8 h-8 px-[6px] rounded-full text-white font-medium text-sm
        transition-all duration-200 hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleSubmit}
              disabled={isAnalyzing || (uploadedFiles.length === 0 && inputText.trim().length === 0)}
              style={{
                background: "linear-gradient(180deg, #9BA2FE 0%, #615FFF 100%)",
                boxShadow: `
            0 1px 0 0 rgba(255, 255, 255, 0.50) inset,
            0 -2px 2px 0 rgba(10, 10, 10, 0.10) inset,
            0 0 0 1px #432DD7,
            0 3px 4px -1px rgba(0, 0, 0, 0.25)
          `,
              }}
            >
              {isAnalyzing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
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
