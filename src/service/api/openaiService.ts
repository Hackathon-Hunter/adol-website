import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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

export interface AIResponse {
  productListing: ProductListing | null;
  message: string;
}

const messages: ChatCompletionMessageParam[] = [];
let productListing: ProductListing | null = null;

const IMAGE_ANALYSIS_SYSTEM_PROMPT = `Anda adalah AI ahli marketplace yang menganalisis foto produk dan membuat listing lengkap.
ANALISIS FOTO dengan teliti dan berikan estimasi harga yang REALISTIS berdasarkan produk yang terlihat dalam gambar.
Berdasarkan foto, buat data produk dalam format JSON yang valid:
{
 product_listing: {
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
 },
 message: "Penjelasan atau pertanyaan atau konfirmasi untuk pengguna"
}
KRITERIA PENTING:
- Harga dalam Rupiah (angka saja, tanpa titik/koma)
- Target price = 85% dari listing price
- Minimum price = 70% dari listing price
- Analisis kondisi dari foto secara jujur dan detail
- Berikan harga yang masuk akal untuk produk yang terlihat di foto
- Pertimbangkan kondisi, merek, model, dan usia produk dari gambar
- JANGAN gunakan harga template - berikan estimasi harga pasar yang nyata
- Jika user memberikan notes tambahan, pertimbangkan dalam analisis
-- Respons berdasarkan bahasa pengguna`;

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
- Respons berdasarkan bahasa pengguna
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

      const maxDimension = Math.max(width, height);
      if (maxDimension > maxSize) {
        const scale = maxSize / maxDimension;
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(dataUrl);
    };

    img.onerror = (error) => {
      reject(new Error("Failed to load image for processing"));
    };

    const objectUrl = URL.createObjectURL(file);
    img.crossOrigin = "anonymous";
    img.src = objectUrl;

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

    const maxSize = 50 * 1024 * 1024;
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
export const sendMessageWithImage = async (
  base64Image: string,
  userNotes: string = ""
): Promise<AIResponse> => {
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

    messages.push(response.choices[0].message);
    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response content from OpenAI");
    }

    let jsonString = "";

    const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      jsonString = codeBlockMatch[1].trim();
    } else {
      const fullJsonMatch = content.match(/(\{[\s\S]*\})/);
      if (fullJsonMatch && fullJsonMatch[1]) {
        jsonString = fullJsonMatch[1].trim();
      }
    }

    const attemptJsonRecovery = (brokenJson: string): string => {
      if (
        brokenJson.includes('"product_listing": {') &&
        !brokenJson.includes("}}")
      ) {
        return brokenJson + "}}";
      }

      if (
        brokenJson.includes('"product_listing": {') &&
        brokenJson.includes("}") &&
        !brokenJson.endsWith("}")
      ) {
        return brokenJson + "}";
      }
      return brokenJson;
    };

    if (!jsonString) {
      console.log("No valid JSON structure found in response:", content);
      return {
        productListing: null,
        message:
          "Maaf, terjadi kesalahan saat menganalisis gambar. Mohon coba lagi.",
      };
    }

    try {
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(jsonString);
      } catch (initialParseError) {
        console.warn(
          "Initial JSON parse failed, attempting recovery:",
          initialParseError
        );
        const recoveredJson = attemptJsonRecovery(jsonString);
        console.log("Attempting to parse recovered JSON:", recoveredJson);
        parsedResponse = JSON.parse(recoveredJson);
      }

      if (
        parsedResponse.product_listing &&
        typeof parsedResponse.message === "string"
      ) {
        productListing = parsedResponse.product_listing;

        return {
          productListing: productListing,
          message: parsedResponse.message,
        };
      } else if (parsedResponse.item_name) {
        productListing = parsedResponse;

        return {
          productListing: productListing,
          message:
            content.replace(/```(?:json)?\s*[\s\S]*?```/, "").trim() ||
            "Produk telah dianalisis dengan sukses!",
        };
      } else {
        console.warn("Parsed JSON lacks expected structure:", parsedResponse);
        return {
          productListing: null,
          message: "Format respons tidak sesuai. Mohon coba lagi.",
        };
      }
    } catch (parseError) {
      console.error(
        "Error parsing JSON:",
        parseError,
        "JSON string:",
        jsonString
      );

      return {
        productListing: null,
        message:
          "Terjadi kesalahan dalam memproses respons. Silakan coba lagi.",
      };
    }
  } catch (error) {
    console.error("API or processing error:", error);

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
 * sendMessageText function with product update capability
 */
export const sendMessageText = async (message: string): Promise<AIResponse> => {
  try {
    messages.push({ role: "user", content: message });

    const currentSystemPrompt = CHAT_SYSTEM_PROMPT.replace(
      "${productListing ? JSON.stringify(productListing, null, 2) : 'Tidak ada produk yang sedang diedit'}",
      productListing
        ? JSON.stringify(productListing, null, 2)
        : "Tidak ada produk yang sedang diedit"
    );

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

    messages.push({ role: "assistant", content });

    let jsonString = "";

    const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      jsonString = codeBlockMatch[1].trim();
    } else {
      const fullJsonMatch = content.match(/(\{[\s\S]*\})/);
      if (fullJsonMatch && fullJsonMatch[1]) {
        jsonString = fullJsonMatch[1].trim();
      }
    }

    const attemptJsonRecovery = (brokenJson: string): string => {
      if (
        brokenJson.includes('"product_listing": {') &&
        !brokenJson.includes("}}")
      ) {
        return brokenJson + "}}";
      }

      if (
        (brokenJson.includes('"product_listing": {') ||
          brokenJson.includes('"type": "update_product"')) &&
        brokenJson.includes("}") &&
        !brokenJson.endsWith("}")
      ) {
        return brokenJson + "}";
      }
      return brokenJson;
    };

    if (jsonString) {
      try {
        let jsonData;
        try {
          jsonData = JSON.parse(jsonString);
        } catch (initialParseError) {
          console.warn(
            "Initial JSON parse failed, attempting recovery:",
            initialParseError
          );
          const recoveredJson = attemptJsonRecovery(jsonString);
          console.log("Attempting to parse recovered JSON:", recoveredJson);
          jsonData = JSON.parse(recoveredJson);
        }

        if (
          jsonData.type === "update_product" &&
          jsonData.changes &&
          productListing
        ) {
          try {
            Object.keys(jsonData.changes).forEach((key) => {
              if (productListing && key in productListing) {
                (productListing as any)[key] = jsonData.changes[key];
              }
            });

            if (jsonData.changes.listing_price !== undefined) {
              const listingPrice = Number(jsonData.changes.listing_price);
              if (!isNaN(listingPrice)) {
                productListing.listing_price = listingPrice;
                productListing.target_price = Math.round(listingPrice * 0.85);
                productListing.minimum_price = Math.round(listingPrice * 0.7);
              }
            }

            return {
              productListing: productListing,
              message: jsonData.message || "Produk berhasil diperbarui.",
            };
          } catch (updateError) {
            console.error("Error applying product updates:", updateError);
            return {
              productListing: productListing,
              message:
                "Terjadi kesalahan saat memperbarui produk. Detail: " +
                (updateError instanceof Error
                  ? updateError.message
                  : "Unknown error"),
            };
          }
        }

        if (jsonData.product_listing && jsonData.message) {
          productListing = jsonData.product_listing;

          return {
            productListing: productListing,
            message: jsonData.message,
          };
        }

        if (jsonData.item_name && jsonData.category) {
          if (!productListing) {
            productListing = jsonData;
          } else {
            Object.assign(productListing, jsonData);
          }

          return {
            productListing: productListing,
            message: "Produk telah diperbarui dengan detail lengkap!",
          };
        }
      } catch (jsonError) {
        console.warn("Failed to parse JSON from response:", jsonError);
      }
    }

    return {
      productListing: productListing,
      message:
        content.replace(/```(?:json)?\s*[\s\S]*?```/, "").trim() || content,
    };
  } catch (error) {
    console.error("API call or processing error:", error);
    throw new Error(
      `Failed to process message: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
