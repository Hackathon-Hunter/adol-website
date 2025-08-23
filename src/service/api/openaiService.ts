import OpenAI from "openai";

// OpenAI client configuration using OpenRouter with GPT-4.0
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:
    "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",
  dangerouslyAllowBrowser: true, // Allow usage in browser
});

// Product listing interface based on the template
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
  imageBase64?: string; // Add optional image field
}

// System prompt from the template
const SYSTEM_PROMPT = `Anda adalah AI ahli marketplace yang menganalisis foto produk dan membuat listing lengkap.

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

/**
 * Convert image to optimal format for AI analysis
 */
const processImageForAI = (file: File, maxSize: number = 1024, quality: number = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    
    img.onload = () => {
      let { width, height } = img;
      
      console.log(`Original image dimensions: ${width}x${height}`);
      
      // Calculate new dimensions maintaining aspect ratio
      const maxDimension = Math.max(width, height);
      if (maxDimension > maxSize) {
        const scale = maxSize / maxDimension;
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      
      console.log(`Processed image dimensions: ${width}x${height}`);
      
      canvas.width = width;
      canvas.height = height;
      
      // Set white background (important for transparent images)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      
      // Draw image with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to JPEG for better compatibility
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      
      console.log(`Base64 length: ${dataUrl.length}, estimated size: ${Math.round(dataUrl.length * 0.75 / 1024)}KB`);
      
      resolve(dataUrl);
    };
    
    img.onerror = (error) => {
      console.error('Image loading failed:', error);
      reject(new Error('Failed to load image for processing'));
    };
    
    // Create object URL for the image
    const objectUrl = URL.createObjectURL(file);
    img.crossOrigin = 'anonymous'; // Enable cross-origin for canvas
    img.src = objectUrl;
    
    // Clean up object URL after processing
    const originalOnload = img.onload;
    img.onload = (event) => {
      if (originalOnload) {
        originalOnload.call(img, event);
      }
      setTimeout(() => URL.revokeObjectURL(objectUrl), 100); // Clean up after processing
    };
  });
};

/**
 * Alternative: Direct file reader method
 */
const convertFileToBase64Direct = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) {
        reject(new Error('FileReader returned null result'));
        return;
      }
      
      console.log(`Direct conversion - File: ${file.name}, Size: ${file.size}, Base64 length: ${result.length}`);
      resolve(result);
    };
    
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Enhanced image conversion with multiple methods for AI compatibility
 */
export const fileToBase64 = async (file: File, method: 'auto' | 'direct' | 'processed' = 'auto'): Promise<string> => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image type');
    }
    
    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new Error('Image file is too large. Maximum size is 50MB.');
    }
    
    console.log('Converting image to base64:', {
      name: file.name,
      type: file.type,
      size: file.size,
      sizeInMB: (file.size / (1024 * 1024)).toFixed(2),
      method
    });
    
    let base64Data: string;
    
    // Choose conversion method
    if (method === 'auto') {
      // Auto-select based on file size and type
      if (file.size > 2 * 1024 * 1024 || file.type === 'image/png' || file.type === 'image/webp') {
        console.log('Using processed method (optimize for AI)');
        base64Data = await processImageForAI(file);
      } else {
        console.log('Using direct method (small file)');
        base64Data = await convertFileToBase64Direct(file);
      }
    } else if (method === 'direct') {
      base64Data = await convertFileToBase64Direct(file);
    } else {
      base64Data = await processImageForAI(file);
    }
    
    // Validate result
    if (!base64Data || !base64Data.startsWith('data:image/')) {
      throw new Error('Invalid base64 format generated');
    }
    
    // Additional validation for AI compatibility
    const validation = validateImageData(base64Data);
    if (!validation.valid) {
      throw new Error(`Image validation failed: ${validation.error}`);
    }
    
    console.log('Image conversion completed successfully:', {
      originalSize: file.size,
      base64Length: base64Data.length,
      estimatedSizeKB: validation.info.estimatedSizeKB,
      format: validation.info.mimeType
    });
    
    return base64Data;
    
  } catch (error) {
    console.error('Failed to convert image to base64:', error);
    throw new Error(`Image conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Create multiple base64 versions for testing
 */
export const fileToBase64WithFallbacks = async (file: File): Promise<{ 
  processed: string; 
  direct: string; 
  recommended: string 
}> => {
  try {
    console.log('Creating multiple base64 versions for compatibility testing...');
    
    const [processed, direct] = await Promise.all([
      fileToBase64(file, 'processed'),
      fileToBase64(file, 'direct')
    ]);
    
    // Choose recommended version (processed is usually better for AI)
    const recommended = processed;
    
    console.log('Multiple versions created:', {
      processedSize: processed.length,
      directSize: direct.length,
      recommendedVersion: 'processed'
    });
    
    return { processed, direct, recommended };
    
  } catch (error) {
    console.error('Failed to create fallback versions:', error);
    throw error;
  }
};

/**
 * Analyze image and generate product listing using OpenAI
 */
export const analyzeImageForProductListing = async (
  base64Image: string,
  userNotes: string = ""
): Promise<ProductListing> => {
  try {
    // Validate image data first
    const validation = validateImageData(base64Image);
    
    if (!validation.valid) {
      console.error('Image validation failed:', validation);
      throw new Error(`Image validation failed: ${validation.error}`);
    }

    console.log("Image validation passed:", validation.info);

    // Ensure image isn't too large for API
    if (validation.info.estimatedSizeKB > 20 * 1024) { // ~20MB
      throw new Error('Image is too large for API processing. Please use a smaller image.');
    }

    console.log("Starting image analysis...", {
      userNotes,
      validation: validation.info
    });

    const userPrompt = `Analisis foto produk ini dan buat listing marketplace lengkap.\n\nCatatan user: ${userNotes}`;

    // Using GPT-4.0 model as requested
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
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
                detail: "auto", // Changed from "high" to "auto" for better compatibility
              },
            },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    console.log("OpenAI Response received:", response);

    const content = response.choices[0]?.message?.content;

    if (!content) {
      console.error("No content in response:", response);
      throw new Error("No response content from OpenAI");
    }

    console.log("Response content:", content);

    // Extract JSON from response - be more flexible with JSON extraction
    let jsonMatch = content.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      // Try to find JSON in code blocks
      jsonMatch = content.match(/```json\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        jsonMatch[0] = jsonMatch[1];
      }
    }

    if (!jsonMatch) {
      console.error("No JSON found in content:", content);
      throw new Error("No valid JSON found in response: " + content);
    }

    console.log("Extracted JSON:", jsonMatch[0]);

    const productListing: ProductListing = JSON.parse(jsonMatch[0]);

    // Validate required fields
    if (!productListing.item_name || !productListing.category) {
      console.error("Invalid product listing:", productListing);
      throw new Error("Invalid product listing format");
    }

    // Check for template prices (reject if AI used example prices)
    const templatePrices = [1000000, 850000, 700000, 18000000, 15300000, 12600000];
    if (templatePrices.includes(productListing.listing_price) || 
        templatePrices.includes(productListing.target_price) || 
        templatePrices.includes(productListing.minimum_price)) {
      console.error("AI returned template prices instead of real analysis:", productListing);
      throw new Error("AI used template prices - retrying with different approach");
    }

    console.log("✅ Successfully parsed product listing with real prices:", {
      item: productListing.item_name,
      prices: {
        listing: productListing.listing_price,
        target: productListing.target_price,
        minimum: productListing.minimum_price
      }
    });
    return productListing;
  } catch (error) {
    console.error("Error analyzing image - Full details:", error);

    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        throw new Error(
          "API key is invalid. Please check your OpenRouter API key."
        );
      } else if (error.message.includes("403")) {
        throw new Error("Access forbidden. Please check your API permissions.");
      } else if (error.message.includes("429")) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      } else if (error.message.includes("model")) {
        throw new Error("Model not available. Please try again later.");
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
 * Test API connection
 */
export const testAPIConnection = async (): Promise<boolean> => {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: "Hello, can you respond with 'API connection successful'?",
        },
      ],
      max_tokens: 50,
    });

    console.log("API Test Response:", response);
    return true;
  } catch (error) {
    console.error("API Test Failed:", error);
    return false;
  }
};

/**
 * Fallback function for image analysis using a different approach
 */
export const analyzeImageFallback = async (
  base64Image: string,
  userNotes: string = ""
): Promise<ProductListing> => {
  try {
    console.log("Trying fallback analysis approach...");

    // Try different GPT-4.0 variants and other models as fallbacks
    const models = [
      "openai/gpt-4o-mini",
      "openai/gpt-4-turbo",
      "openai/gpt-4-vision-preview",
      "anthropic/claude-3-5-sonnet:beta",
      "google/gemini-pro-vision",
    ];

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);

        const response = await client.chat.completions.create({
          model: model,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `${SYSTEM_PROMPT}\n\nAnalisis foto produk ini dan buat listing marketplace lengkap.\n\nCatatan user: ${userNotes}`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64Image,
                  },
                },
              ],
            },
          ],
          max_tokens: 1500,
          temperature: 0.7,
        });

        const content = response.choices[0]?.message?.content;
        if (!content) continue;

        // Try to extract JSON
        let jsonMatch = content.match(/\{[\s\S]*?\}/);
        if (!jsonMatch) {
          jsonMatch = content.match(/```json\s*(\{[\s\S]*?\})\s*```/);
          if (jsonMatch) jsonMatch[0] = jsonMatch[1];
        }

        if (jsonMatch) {
          const productListing: ProductListing = JSON.parse(jsonMatch[0]);
          if (productListing.item_name && productListing.category) {
            console.log(`Success with model: ${model}`, productListing);
            return productListing;
          }
        }
      } catch (modelError) {
        console.log(`Model ${model} failed:`, modelError);
        continue;
      }
    }

    throw new Error("All fallback models failed");
  } catch (error) {
    console.error("Fallback analysis failed:", error);
    throw error;
  }
};

/**
 * Enhanced analyze function with fallback
 */
/**
 * Simple image analysis without system prompt (for compatibility)
 */
export const analyzeImageSimple = async (
  base64Image: string,
  userNotes: string = ""
): Promise<ProductListing> => {
  try {
    // Validate image data first
    const validation = validateImageData(base64Image);
    
    if (!validation.valid) {
      console.error('Image validation failed (simple):', validation);
      throw new Error(`Image validation failed: ${validation.error}`);
    }

    console.log("Trying simple analysis approach...", validation.info);
    
    const simplePrompt = `Analyze this product image carefully and create a marketplace listing with REALISTIC prices based on what you see in the photo.

{
  "item_name": "Product name with brand/model if visible",
  "category": "Product category",
  "description": "Detailed product description",
  "condition": "Excellent/Good/Fair/Poor",
  "listing_price": [REALISTIC_MARKET_PRICE_IN_RUPIAH],
  "target_price": [85%_OF_LISTING_PRICE],
  "minimum_price": [70%_OF_LISTING_PRICE],
  "selling_points": "Key selling points based on what you see",
  "known_flaws": "Any visible issues or damage",
  "reason_selling": "Likely reason for selling",
  "delivery_info": "Delivery options"
}

IMPORTANT:
- Provide REALISTIC prices in Rupiah based on the actual product in the image
- Consider brand, condition, age, and market value
- Do NOT use template prices - analyze the real product
- Target = 85% of listing, Minimum = 70% of listing

User notes: ${userNotes}

Please respond with valid JSON only with actual market-based pricing.`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: simplePrompt,
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
                detail: "low", // Use low detail for better compatibility
              },
            },
          ],
        },
      ],
      max_tokens: 800,
      temperature: 0.5,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response content from simple analysis");
    }

    // Extract JSON
    let jsonMatch = content.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      jsonMatch = content.match(/```json\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) jsonMatch[0] = jsonMatch[1];
    }

    if (!jsonMatch) {
      throw new Error("No valid JSON found in simple response");
    }

    const productListing: ProductListing = JSON.parse(jsonMatch[0]);
    
    if (!productListing.item_name || !productListing.category) {
      throw new Error("Invalid product listing from simple analysis");
    }

    // Check for template prices (reject if AI used example prices)
    const templatePrices = [1000000, 850000, 700000, 18000000, 15300000, 12600000];
    if (templatePrices.includes(productListing.listing_price) || 
        templatePrices.includes(productListing.target_price) || 
        templatePrices.includes(productListing.minimum_price)) {
      console.error("AI returned template prices instead of real analysis:", productListing);
      throw new Error("AI used template prices - retrying with different approach");
    }

    console.log("✅ Simple analysis successful with real prices:", {
      listing: productListing.listing_price,
      target: productListing.target_price,
      minimum: productListing.minimum_price
    });

    return productListing;
    
  } catch (error) {
    console.error("Simple analysis failed:", error);
    throw error;
  }
};

/**
 * Enhanced analysis with multiple image formats and methods
 */
export const analyzeImageWithFullFallback = async (
  file: File,
  userNotes: string = ""
): Promise<ProductListing> => {
  console.log('Starting comprehensive image analysis with multiple approaches...');
  
  // First test API connection
  const apiWorking = await testAPIConnection();
  if (!apiWorking) {
    throw new Error("API connection failed. Please check your internet connection and API key.");
  }

  try {
    // Method 1: Try with optimized processed image (best for AI)
    console.log('Attempting analysis with processed image (Method 1)...');
    const processedImage = await fileToBase64(file, 'processed');
    return await analyzeImageSimple(processedImage, userNotes);
    
  } catch (error1) {
    console.log('Method 1 failed, trying direct conversion (Method 2)...', error1);
    
    try {
      // Method 2: Try with direct file conversion
      const directImage = await fileToBase64(file, 'direct');
      return await analyzeImageSimple(directImage, userNotes);
      
    } catch (error2) {
      console.log('Method 2 failed, trying full analysis with processed image (Method 3)...', error2);
      
      try {
        // Method 3: Try full analysis with processed image
        const processedImage = await fileToBase64(file, 'processed');
        return await analyzeImageForProductListing(processedImage, userNotes);
        
      } catch (error3) {
        console.log('Method 3 failed, trying multiple models with different formats (Method 4)...', error3);
        
        try {
          // Method 4: Try different models with various formats
          const versions = await fileToBase64WithFallbacks(file);
          
          // Try processed version with different models
          return await analyzeImageFallback(versions.recommended, userNotes);
          
        } catch (error4) {
          console.error('All methods failed:', { error1, error2, error3, error4 });
          throw new Error(`Image analysis failed after trying all methods: ${error1 instanceof Error ? error1.message : 'Unknown error'}`);
        }
      }
    }
  }
};

export const analyzeImageWithFallback = async (
  base64Image: string,
  userNotes: string = ""
): Promise<ProductListing> => {
  // First test API connection
  const apiWorking = await testAPIConnection();
  if (!apiWorking) {
    throw new Error(
      "API connection failed. Please check your internet connection and API key."
    );
  }

  try {
    // Try simple method first (often more reliable)
    return await analyzeImageSimple(base64Image, userNotes);
  } catch (error) {
    console.log("Simple method failed, trying full analysis...", error);
    try {
      return await analyzeImageForProductListing(base64Image, userNotes);
    } catch (fullError) {
      console.log("Full analysis failed, trying other models...", fullError);
      try {
        return await analyzeImageFallback(base64Image, userNotes);
      } catch (fallbackError) {
        console.error("All methods failed:", fallbackError);
        throw new Error(
          `Image analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }
  }
};

/**
 * Mock function for testing UI without API calls
 */
export const mockAnalyzeImage = async (
  base64Image: string,
  userNotes: string = ""
): Promise<ProductListing> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    item_name: "iPhone 14 Pro Max 256GB Space Black",
    category: "Elektronik - Smartphone",
    description:
      "iPhone 14 Pro Max dalam kondisi sangat baik, layar 6.7 inch Super Retina XDR, kamera Pro 48MP, chip A16 Bionic. Cocok untuk fotografer dan content creator.",
    condition: "Excellent",
    listing_price: 18000000,
    target_price: 15300000,
    minimum_price: 12600000,
    selling_points:
      "• Kondisi mulus tanpa baret\n• Baterai masih 95% health\n• Lengkap dengan box dan charger original\n• Garansi resmi masih berlaku 3 bulan\n• Kamera berkualitas tinggi untuk photography",
    known_flaws: "Tidak ada kerusakan terlihat, kondisi sangat baik",
    reason_selling: "Upgrade ke model terbaru",
    delivery_info: "COD Jakarta/Bekasi atau kirim via JNE/GoSend",
  };
};

/**
 * Debug function to validate image data
 */
export const validateImageData = (base64Image: string): { valid: boolean; error?: string; info: any } => {
  try {
    if (!base64Image) {
      return { valid: false, error: 'Empty image data', info: {} };
    }

    if (!base64Image.startsWith('data:image/')) {
      return { valid: false, error: 'Missing data:image/ prefix', info: { prefix: base64Image.substring(0, 20) } };
    }

    const parts = base64Image.split(',');
    if (parts.length !== 2) {
      return { valid: false, error: 'Invalid data URL format', info: { parts: parts.length } };
    }

    const header = parts[0];
    const data = parts[1];
    
    if (!data || data.length === 0) {
      return { valid: false, error: 'Empty base64 data', info: { header } };
    }

    // Try to validate base64
    try {
      atob(data);
    } catch (e) {
      return { valid: false, error: 'Invalid base64 encoding', info: { header, dataLength: data.length } };
    }

    return {
      valid: true,
      info: {
        header,
        mimeType: header.split(';')[0],
        dataLength: data.length,
        totalLength: base64Image.length,
        estimatedSizeKB: Math.round(base64Image.length * 0.75 / 1024) // rough estimate
      }
    };
    
  } catch (error) {
    return { valid: false, error: `Validation error: ${error}`, info: {} };
  }
};

/**
 * Create a minimal test image for API testing (1x1 pixel PNG)
 */
export const createTestImage = (): string => {
  // 1x1 pixel red PNG in base64
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
};

/**
 * Test API with minimal image
 */
export const testImageAnalysis = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const testImage = createTestImage();
    const validation = validateImageData(testImage);
    
    if (!validation.valid) {
      return { success: false, error: `Test image validation failed: ${validation.error}` };
    }
    
    console.log('Testing with minimal image:', validation.info);
    
    // Try the simplest possible API call
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image briefly.",
            },
            {
              type: "image_url",
              image_url: {
                url: testImage,
                detail: "low",
              },
            },
          ],
        },
      ],
      max_tokens: 50,
    });

    console.log('Test API response:', response);
    return { success: true };
    
  } catch (error) {
    console.error('Test API call failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Test different image conversion methods with a single file
 */
export const testImageConversions = async (file: File): Promise<{
  file: { name: string; type: string; size: number };
  conversions: {
    direct: { success: boolean; size: number; error?: string };
    processed: { success: boolean; size: number; error?: string };
    validation: { success: boolean; error?: string; info?: any };
  };
  recommendations: string[];
}> => {
  const results = {
    file: {
      name: file.name,
      type: file.type,
      size: file.size
    },
    conversions: {
      direct: { success: false, size: 0, error: undefined as string | undefined },
      processed: { success: false, size: 0, error: undefined as string | undefined },
      validation: { success: false, error: undefined as string | undefined, info: undefined as any }
    },
    recommendations: [] as string[]
  };

  // Test direct conversion
  try {
    console.log('Testing direct conversion...');
    const direct = await fileToBase64(file, 'direct');
    results.conversions.direct = {
      success: true,
      size: direct.length,
      error: undefined
    };
    console.log('✅ Direct conversion successful');
  } catch (error) {
    results.conversions.direct = {
      success: false,
      size: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    console.log('❌ Direct conversion failed:', error);
  }

  // Test processed conversion
  try {
    console.log('Testing processed conversion...');
    const processed = await fileToBase64(file, 'processed');
    results.conversions.processed = {
      success: true,
      size: processed.length,
      error: undefined
    };
    console.log('✅ Processed conversion successful');
    
    // Test validation
    const validation = validateImageData(processed);
    results.conversions.validation = {
      success: validation.valid,
      error: validation.error,
      info: validation.info
    };
    
  } catch (error) {
    results.conversions.processed = {
      success: false,
      size: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    console.log('❌ Processed conversion failed:', error);
  }

  // Generate recommendations
  if (results.conversions.processed.success) {
    results.recommendations.push('Use processed conversion for better AI compatibility');
  }
  if (results.conversions.direct.success && results.conversions.direct.size < results.conversions.processed.size) {
    results.recommendations.push('Direct conversion produces smaller files');
  }
  if (!results.conversions.processed.success && !results.conversions.direct.success) {
    results.recommendations.push('Both conversions failed - check file format and size');
  }

  console.log('Image conversion test results:', results);
  return results;
};

/**
 * Quick image analysis test (just checks if AI can see the image)
 */
export const testImageVisibility = async (file: File): Promise<{ canSee: boolean; description?: string; error?: string }> => {
  try {
    console.log('Testing if AI can see the image...');
    
    // Use processed version for best compatibility
    const base64Image = await fileToBase64(file, 'processed');
    
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Can you see this image? If yes, describe what you see in one sentence.",
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
                detail: "low",
              },
            },
          ],
        },
      ],
      max_tokens: 100,
    });

    const description = response.choices[0]?.message?.content;
    
    if (description && description.toLowerCase().includes("i can")) {
      return { canSee: true, description };
    } else if (description) {
      return { canSee: true, description };
    } else {
      return { canSee: false, error: "No response from AI" };
    }
    
  } catch (error) {
    console.error('Image visibility test failed:', error);
    return { 
      canSee: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Get estimated credits cost for analysis
 */
export const getAnalysisCost = (): number => {
    return 10; // 10 credits as mentioned in the template
};
