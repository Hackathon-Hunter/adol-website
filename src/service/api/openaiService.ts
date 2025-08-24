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

const IMAGE_ANALYSIS_SYSTEM_PROMPT = `You are an expert marketplace AI that analyzes product photos and creates comprehensive listings.
ANALYZE PHOTOS carefully and provide REALISTIC price estimates based on the products visible in the image.
Based on the photo, create product data in valid JSON format:
{
 product_listing: {
 "item_name": "Product name with brand/model if visible",
 "category": "Product category (motorcycle, electronics, furniture, etc.)",
 "description": "Complete and attractive product description",
 "condition": "Excellent/Good/Fair/Poor",
 "listing_price": [REALISTIC_PRICE_BASED_ON_PRODUCT],
 "target_price": [85%_OF_LISTING_PRICE],
 "minimum_price": [70%_OF_LISTING_PRICE],
 "selling_points": "3-5 attractive points for buyers",
 "known_flaws": "Issues/damage visible from photo",
 "reason_selling": "Reasonable guess for selling reason",
 "delivery_info": "Pickup/delivery information"
 },
 message: "Explanation or question or confirmation for user"
}
IMPORTANT CRITERIA:
- Price in local currency (numbers only, no dots/commas)
- Target price = 85% of listing price
- Minimum price = 70% of listing price
- Analyze condition from photo honestly and in detail
- Provide reasonable prices for the product visible in photo
- Consider condition, brand, model, and product age from image
- DON'T use template prices - provide real market price estimates
- If user provides additional notes, consider them in analysis
- Must respond in the same language as the prompt message whether it's Indonesian, English, or other languages`;

const CHAT_SYSTEM_PROMPT = `You are a marketplace AI assistant that helps users manage and improve product listings.
CURRENT PRODUCT CONTEXT:
${
  productListing
    ? JSON.stringify(productListing, null, 2)
    : "No product currently being edited"
}
YOUR TASKS:
1. Help users improve product details
2. Answer questions about pricing, description, or condition
3. Provide suggestions to increase listing attractiveness
4. Process requests for product detail changes
RESPONSE RULES:
- If user wants to change product details, MUST provide response in JSON format:
{
 "type": "update_product",
 "changes": {
 "field_name": "new_value"
 },
 "message": "Explanation of changes for user"
}
- IMPORTANT: Whenever there are product changes, ALWAYS display JSON update AND confirmation message
- For regular conversation, provide normal text response
- Give constructive suggestions to improve listing
- Must respond in the same language as the prompt message whether it's Indonesian, English, or other languages
UPDATABLE FIELD FORMATS:
- item_name: string
- category: string
- description: string
- condition: "Excellent" | "Good" | "Fair" | "Poor"
- listing_price: number
- target_price: number (automatically 85% of listing_price)
- minimum_price: number (automatically 70% of listing_price)
- selling_points: string
- known_flaws: string
- reason_selling: string
- delivery_info: string
UPDATE RESPONSE EXAMPLE:
When user wants to change selling reason:
{
 "type": "update_product",
 "changes": {
 "reason_selling": "No longer needed"
 },
 "message": "Selling reason has been updated to 'No longer needed'."
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
    const userPrompt = `Analyze this product photo and create a complete marketplace listing.\n\nUser notes: ${userNotes}`;

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
          "Sorry, there was an error analyzing the image. Please try again.",
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
            "Product analyzed successfully!",
        };
      } else {
        console.warn("Parsed JSON lacks expected structure:", parsedResponse);
        return {
          productListing: null,
          message: "Response format is incorrect. Please try again.",
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
        message: "Error processing response. Please try again.",
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
      "${productListing ? JSON.stringify(productListing, null, 2) : 'No product currently being edited'}",
      productListing
        ? JSON.stringify(productListing, null, 2)
        : "No product currently being edited"
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
              message: jsonData.message || "Product updated successfully.",
            };
          } catch (updateError) {
            console.error("Error applying product updates:", updateError);
            return {
              productListing: productListing,
              message:
                "Error updating product. Details: " +
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
            message: "Product updated with complete details!",
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
