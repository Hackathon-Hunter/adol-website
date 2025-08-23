import { ChatMessage } from "@/components/ui/Chat/UIChat";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

// OpenAI client configuration using OpenRouter with GPT-4.0
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Product listing interface
export interface ProductListing {
  item_name: string;
  category: string;
  description: string;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  listing_price: number;
  target_price: number;
  minimum_price: number;
  selling_points: string;
  known_flaws: string;
  reason_selling: string;
  delivery_info: string;
  imageBase64?: string;
}

// Global variables for conversation state
const messages: ChatCompletionMessageParam[] = [];
let productListing: ProductListing | null = null;

// System prompt for image analysis
const IMAGE_ANALYSIS_SYSTEM_PROMPT = `Anda adalah AI ahli marketplace yang menganalisis foto produk dan membuat listing lengkap.

ANALISIS FOTO dengan teliti dan berikan estimasi harga yang REALISTIS berdasarkan produk yang terlihat dalam gambar.

Berdasarkan foto, buat data produk dalam format JSON yang valid:

{
    "item_name": "Nama produk dengan brand/model jika terlihat",
    "category": "Kategori produk (motor, elektronik, furniture, dll)", 
    "description": "Deskripsi lengkap dan menarik produk",
    "condition": "Excellent/Good/Fair/Poor",
    "listing_price": [HARGA_REALISTIS_BERDASARKAN_PRODUK],
    "target_price": [85%_DARI_LISTING_PRICE],
    "minimum_price": [70%_DARI_LISTING_PRICE],
    "selling_points": "3-5 poin menarik untuk pembeli",
    "known_flaws": "Masalah/kerusakan yang terlihat dari foto",
    "reason_selling": "Tebakan alasan menjual yang masuk akal",
    "delivery_info": "Info pengambilan/pengiriman"
}

KRITERIA PENTING:
- Harga dalam Rupiah (angka saja, tanpa titik/koma)
- Target price = 85% dari listing price
- Minimum price = 70% dari listing price
- Analisis kondisi dari foto secara jujur dan detail
- Berikan harga yang masuk akal untuk produk yang terlihat di foto
- Pertimbangkan kondisi, merek, model, dan usia produk dari gambar
- JANGAN gunakan harga template - berikan estimasi harga pasar yang nyata
- Jika user memberikan notes tambahan, pertimbangkan dalam analisis`;

// System prompt for chat conversation
const CHAT_SYSTEM_PROMPT = `Anda adalah asisten AI marketplace yang membantu pengguna mengelola dan menyempurnakan product listing.

KONTEKS PRODUK SAAT INI:
${
  productListing
    ? JSON.stringify(productListing, null, 2)
    : "Tidak ada produk yang sedang diedit"
}

TUGAS ANDA:
1. Membantu pengguna menyempurnakan detail produk
2. Menjawab pertanyaan tentang harga, deskripsi, atau kondisi
3. Memberikan saran untuk meningkatkan daya tarik listing
4. Memproses permintaan perubahan detail produk

ATURAN RESPONS:
- Jika pengguna ingin mengubah detail produk, WAJIB berikan respons dalam format JSON:
{
  "type": "update_product",
  "changes": {
    "field_name": "new_value"
  },
  "message": "Penjelasan perubahan untuk pengguna"
}

- PENTING: Setiap kali ada perubahan produk, SELALU tampilkan JSON update DAN pesan konfirmasi
- Untuk percakapan biasa, berikan respons teks normal
- Selalu gunakan bahasa Indonesia yang ramah dan profesional
- Berikan saran konstruktif untuk meningkatkan listing

FORMAT FIELD YANG BISA DIUBAH:
- item_name: string
- category: string  
- description: string
- condition: "Excellent" | "Good" | "Fair" | "Poor"
- listing_price: number
- target_price: number (otomatis 85% dari listing_price)
- minimum_price: number (otomatis 70% dari listing_price)
- selling_points: string
- known_flaws: string
- reason_selling: string
- delivery_info: string

CONTOH RESPONS UPDATE:
Ketika pengguna ingin mengubah alasan jual:
{
  "type": "update_product",
  "changes": {
    "reason_selling": "Sudah tidak dipakai"
  },
  "message": "Alasan penjualan telah diubah menjadi 'Sudah tidak dipakai'."
}`;

/**
 * Process image for AI analysis with optimization
 */
const processImageForAI = (
  file: File,
  maxSize: number = 1024,
  quality: number = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    img.onload = () => {
      let { width, height } = img;

      // Calculate new dimensions maintaining aspect ratio
      const maxDimension = Math.max(width, height);
      if (maxDimension > maxSize) {
        const scale = maxSize / maxDimension;
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      canvas.width = width;
      canvas.height = height;

      // Set white background for transparent images
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Draw image with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to JPEG for better compatibility
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(dataUrl);
    };

    img.onerror = (error) => {
      reject(new Error("Failed to load image for processing"));
    };

    const objectUrl = URL.createObjectURL(file);
    img.crossOrigin = "anonymous";
    img.src = objectUrl;

    // Clean up object URL after processing
    const originalOnload = img.onload;
    img.onload = (event) => {
      if (originalOnload) {
        originalOnload.call(img, event);
      }
      setTimeout(() => URL.revokeObjectURL(objectUrl), 100);
    };
  });
};

/**
 * Convert file to base64 using FileReader
 */
const convertFileToBase64Direct = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) {
        reject(new Error("FileReader returned null result"));
        return;
      }
      resolve(result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Convert file to base64 with different methods
 */
export const fileToBase64 = async (
  file: File,
  method: "auto" | "direct" | "processed" = "auto"
): Promise<string> => {
  try {
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image type");
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new Error("Image file is too large. Maximum size is 50MB.");
    }

    let base64Data: string;

    if (method === "auto") {
      if (
        file.size > 2 * 1024 * 1024 ||
        file.type === "image/png" ||
        file.type === "image/webp"
      ) {
        base64Data = await processImageForAI(file);
      } else {
        base64Data = await convertFileToBase64Direct(file);
      }
    } else if (method === "direct") {
      base64Data = await convertFileToBase64Direct(file);
    } else {
      base64Data = await processImageForAI(file);
    }

    if (!base64Data || !base64Data.startsWith("data:image/")) {
      throw new Error("Invalid base64 format generated");
    }

    return base64Data;
  } catch (error) {
    throw new Error(
      `Image conversion failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Analyze image and generate product listing
 */
export const analyzeImageForProductListing = async (
  base64Image: string,
  userNotes: string = ""
): Promise<ProductListing> => {
  try {
    const userPrompt = `Analisis foto produk ini dan buat listing marketplace lengkap.\n\nCatatan user: ${userNotes}`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "system",
          content: IMAGE_ANALYSIS_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userPrompt,
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
                detail: "auto",
              },
            },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });
    messages.push(response.choices[0].message)
    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response content from OpenAI");
    }

    // Extract JSON from response
    let jsonMatch = content.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      jsonMatch = content.match(/```json\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        jsonMatch[0] = jsonMatch[1];
      }
    }

    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    productListing = JSON.parse(jsonMatch[0]);

    if (!productListing?.item_name || !productListing.category) {
      throw new Error("Invalid product listing format");
    }

    return productListing;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        throw new Error(
          "API key is invalid. Please check your OpenRouter API key."
        );
      } else if (error.message.includes("403")) {
        throw new Error("Access forbidden. Please check your API permissions.");
      } else if (error.message.includes("429")) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
    }

    throw new Error(
      `Failed to analyze image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Enhanced sendMessageText function with product update capability
 */
export const sendMessageText = async (message: string): Promise<{
  productListing: ProductListing
} | string> => {
  try {
    // Add user message to conversation history
    messages.push({ role: "user", content: message });

    // Create dynamic system prompt based on current product state
    const currentSystemPrompt = CHAT_SYSTEM_PROMPT.replace(
      "${productListing ? JSON.stringify(productListing, null, 2) : 'Tidak ada produk yang sedang diedit'}",
      productListing
        ? JSON.stringify(productListing, null, 2)
        : "Tidak ada produk yang sedang diedit"
    );

    // Create messages array with system prompt
    const conversationMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: currentSystemPrompt,
      },
      ...messages,
    ];

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o",
      messages: conversationMessages,
      max_tokens: 1500,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || "";

    // Add assistant response to conversation history
    messages.push({ role: "assistant", content });

    // Check if response contains product update JSON
    try {
      // Look for JSON with "type": "update_product"
      const updateMatch = content.match(
        /\{[\s\S]*?"type"\s*:\s*"update_product"[\s\S]*?\}/
      );

      if (updateMatch && productListing) {
        const updateData = JSON.parse(updateMatch[0]);

        if (updateData.changes) {
          // Create a backup of current product
          const originalProduct = { ...productListing };

          // Update the product listing
          Object.keys(updateData.changes).forEach((key) => {
            if (key in productListing!) {
              (productListing as any)[key] = updateData.changes[key];
            }
          });

          // Auto-calculate target and minimum prices if listing_price changed
          if (updateData.changes.listing_price) {
            productListing.target_price = Math.round(
              updateData.changes.listing_price * 0.85
            );
            productListing.minimum_price = Math.round(
              updateData.changes.listing_price * 0.7
            );
          }

          // Return just the message part for user display
          return {
            productListing: productListing
          };
        }
      }

      // If no update JSON found, check for standalone product JSON (complete product listing)
      const productMatch = content.match(/\{[\s\S]*?"item_name"[\s\S]*?\}/);
      if (productMatch) {
        try {
          const updatedProductListing = JSON.parse(productMatch[0]);
          if (
            updatedProductListing.item_name &&
            updatedProductListing.category
          ) {
            // Replace the entire product listing
            Object.assign(productListing || {}, updatedProductListing);

            // Return a confirmation message
            return "Produk telah diperbarui dengan detail lengkap!";
          }
        } catch (parseError) {
          // Not a valid product JSON, continue with normal response
        }
      }
    } catch (parseError) {
      // Response is not a product update, treating as normal message
    }

    return content;
  } catch (error) {
    throw new Error(
      `Failed to process message: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Get current product listing
 */
export const getCurrentProductListing = (): ProductListing | null => {
  return productListing;
};

/**
 * Set current product listing
 */
export const setCurrentProductListing = (
  listing: ProductListing | null
): void => {
  productListing = listing;
};

/**
 * Clear conversation history
 */
export const clearConversation = (): void => {
  messages.length = 0;
  productListing = null;
};

/**
 * Enhanced image analysis with fallback methods
 */
export const analyzeImageWithFallback = async (
  file: File,
  userNotes: string = ""
): Promise<ProductListing> => {
  try {
    // Try with optimized processed image first
    const processedImage = await fileToBase64(file, "processed");
    return await analyzeImageForProductListing(processedImage, userNotes);
  } catch (error1) {
    try {
      // Try with direct file conversion
      const directImage = await fileToBase64(file, "direct");
      return await analyzeImageForProductListing(directImage, userNotes);
    } catch (error2) {
      throw new Error(
        `Image analysis failed: ${
          error1 instanceof Error ? error1.message : "Unknown error"
        }`
      );
    }
  }
};
