import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { idlFactory, canisterId } from "../declarations";

// Canister ID with multiple fallback options
const getCanisterId = (): string => {
  // Try environment variables first
  if (canisterId) return canisterId;
  if (process.env.CANISTER_ID_ADOL_BACKEND) return process.env.CANISTER_ID_ADOL_BACKEND;
  if (process.env.NEXT_PUBLIC_CANISTER_ID_ADOL_BACKEND) return process.env.NEXT_PUBLIC_CANISTER_ID_ADOL_BACKEND;
  
  // Check if we're in browser environment and what network we should use
  const isClient = typeof window !== 'undefined';
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // For development, prefer local canister if available
  if (isDevelopment && !process.env.NEXT_PUBLIC_DFX_NETWORK) {
    // Try local development first
    return process.env.CANISTER_ID_ADOL_BACKEND || "rrkah-fqaaa-aaaaa-aaaaq-cai"; // Local development fallback
  }
  
  // Fallback for IC network
  if (process.env.DFX_NETWORK === "ic" || process.env.NEXT_PUBLIC_DFX_NETWORK === "ic") {
    return "ujk5g-liaaa-aaaam-aeocq-cai";
  }
  
  // Default fallback
  return "ujk5g-liaaa-aaaam-aeocq-cai";
};

// Network detection helper
const getNetworkHost = (): string => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isIC = process.env.DFX_NETWORK === "ic" || process.env.NEXT_PUBLIC_DFX_NETWORK === "ic";
  
  if (isIC) {
    return "https://ic0.app";
  }
  
  // For development, use IC mainnet since no local backend is deployed
  // TODO: Set up local backend canister for full local development
  return "https://ic0.app";
};

// Types from the backend
export interface Product {
  id: string;
  name: string;
  description: string;
  price: bigint;
  stock: bigint;
  imageBase64?: [] | [string]; // Backend uses imageBase64
  status?: any; // Flexible type since actual format may vary
  categoryId: bigint; // Backend uses bigint for categoryId
  condition: string;
  createdAt: bigint;
  createdBy: string; // Principal as string
  keySellingPoints: string[];
  knownFlaws: string;
  minimumPrice?: [] | [bigint]; // Optional with array format
  pickupDeliveryInfo: string;
  reasonForSelling: string;
  targetPrice?: [] | [bigint]; // Optional with array format
  updatedAt: bigint;
}

// Status type for the backend
export type ProductStatus = { active: null } | { sold: null } | { draft: null };

export interface ProductInput {
  categoryId: bigint; // Backend expects bigint, not string
  status: [] | [ProductStatus]; // Optional variant format
  keySellingPoints: string[];
  name: string;
  minimumPrice: [] | [bigint]; // Candid optional format
  reasonForSelling: string;
  targetPrice: [] | [bigint]; // Candid optional format
  description: string;
  stock: bigint;
  imageBase64: [] | [string]; // Backend expects imageBase64
  pickupDeliveryInfo: string;
  knownFlaws: string;
  price: bigint;
  condition: string;
}

export interface ProductUpdate {
  name?: [] | [string];
  description?: [] | [string];
  price?: [] | [bigint];
  stock?: [] | [bigint];
  imageBase64?: [] | [string];
  categoryId?: [] | [bigint];
  condition?: [] | [string];
  keySellingPoints?: [] | [string[]];
  knownFlaws?: [] | [string];
  minimumPrice?: [] | [bigint];
  pickupDeliveryInfo?: [] | [string];
  reasonForSelling?: [] | [string];
  targetPrice?: [] | [bigint];
  status?: [] | [ProductStatus];
}

export interface Category {
  id: bigint; // Backend uses bigint for CategoryId
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: bigint;
}

// Result types
type Result<T, E> = { ok: T } | { err: E };

export class AdolService {
  private actor: any = null;
  private authClient: AuthClient | null = null;

  async initialize(): Promise<void> {
    try {
      this.authClient = await AuthClient.create();
      await this.createActor();
    } catch (error) {
      console.error("Failed to initialize AdolService:", error);
      throw error;
    }
  }

  private async createActor(): Promise<void> {
    try {
      // Get canister ID and network configuration
      const effectiveCanisterId = getCanisterId();
      const host = getNetworkHost();
      const isIC = host.includes("ic0.app");

      console.log("Creating actor with:", { effectiveCanisterId, host, isIC });

      let identity: Identity | undefined;
      
      if (this.authClient) {
        const isAuthenticated = await this.authClient.isAuthenticated();
        if (isAuthenticated) {
          identity = this.authClient.getIdentity();
        }
      }

      const agent = new HttpAgent({
        identity,
        host,
      });

      // Fetch root key for certificate validation during development
      // Skip root key fetching for IC mainnet (it's not needed and will fail)
      if (!isIC && host.includes("localhost")) {
        try {
          await agent.fetchRootKey();
          console.log("Successfully fetched root key for local development");
        } catch (err) {
          console.warn("Unable to fetch root key for local replica:", err);
        }
      } else {
        console.log("Connecting to IC mainnet - no root key needed");
      }

      this.actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: effectiveCanisterId,
      });

      console.log("Actor created successfully");
    } catch (error) {
      console.error("Failed to create actor:", error);
      throw error;
    }
  }

  private async ensureActor(): Promise<void> {
    if (!this.actor) {
      await this.createActor();
    }
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    try {
      await this.ensureActor();
      const result = await this.actor.getAllProducts();
      return result || [];
    } catch (error) {
      console.error("Failed to get all products:", error);
      return [];
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      await this.ensureActor();
      const result = await this.actor.getProducts();
      console.log("Products fetched:", result);
      return result || [];
    } catch (error) {
      console.error("Failed to get products:", error);
      return [];
    }
  }

  // Get products created by the current authenticated user
  async getMyProducts(): Promise<Product[]> {
    try {
      await this.ensureActor();
      
      // Check if user is authenticated
      const isAuth = await this.isAuthenticated();
      if (!isAuth || !this.authClient) {
        console.warn("User not authenticated, cannot get user's products");
        return [];
      }

      // Get the user's principal ID
      const identity = this.authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();
      const userPrincipalString = userPrincipal.toString();
      console.log("Getting products for user principal:", userPrincipalString);

      // Get all products and filter by current user's principal
      const allProducts = await this.actor.getProducts();
      console.log("All products:", allProducts.length);
      
      const userProducts = allProducts.filter((product: Product) => {
        // Convert createdBy to string for comparison
        let createdByString: string;
        if (typeof product.createdBy === 'string') {
          createdByString = product.createdBy;
        } else {
          // Handle case where createdBy might be a Principal object
          createdByString = String(product.createdBy);
        }
        
        const isUserProduct = createdByString === userPrincipalString;
        if (isUserProduct) {
          console.log(`Found user product: ${product.name} (${product.id})`);
        }
        return isUserProduct;
      });
      
      console.log(`Found ${userProducts.length} products for user ${userPrincipalString}`);
      return userProducts;
    } catch (error) {
      console.error("Failed to get user's products:", error);
      return [];
    }
  }

  async getProduct(productId: string): Promise<Product | null> {
    try {
      await this.ensureActor();
      const result: Result<Product, any> = await this.actor.getProduct(productId);
      
      if ('ok' in result) {
        return result.ok;
      } else {
        console.error("Product not found:", result.err);
        return null;
      }
    } catch (error) {
      console.error("Failed to get product:", error);
      return null;
    }
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      await this.ensureActor();
      const result = await this.actor.getProductsByCategory(categoryId);
      return result || [];
    } catch (error) {
      console.error("Failed to get products by category:", error);
      return [];
    }
  }

  // Get user's draft products
  async getDraftProducts(): Promise<Product[]> {
    try {
      await this.ensureActor();
      
      // Check if user is authenticated
      const isAuth = await this.isAuthenticated();
      if (!isAuth || !this.authClient) {
        console.warn("User not authenticated, cannot get draft products");
        return [];
      }

      // Get the user's principal ID
      const identity = this.authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();
      const userPrincipalString = userPrincipal.toString();
      console.log("Getting draft products for user principal:", userPrincipalString);

      // Get all products and filter by current user's principal and draft status
      const allProducts = await this.actor.getDraftProducts();
      console.log("Total products available:", allProducts.length);
      
      const userDraftProducts = allProducts.filter((product: Product) => {
        // Convert createdBy to string for comparison
        let createdByString: string;
        if (typeof product.createdBy === 'string') {
          createdByString = product.createdBy;
        } else {
          createdByString = String(product.createdBy);
        }
        
        const isUserProduct = createdByString === userPrincipalString;
        if (!isUserProduct) return false;

        // Debug: Log the product status
        console.log(`Checking product ${product.name} status:`, product.status);
        console.log("Status type:", typeof product.status);
        console.log("Status is array:", Array.isArray(product.status));

        // Check if product status is draft
        const status = product.status;
        if (Array.isArray(status) && status.length > 0) {
          const statusVariant = status[0];
          console.log("Status variant:", statusVariant);
          const isDraft = statusVariant && typeof statusVariant === 'object' && 'draft' in statusVariant;
          console.log("Is draft:", isDraft);
          return isDraft;
        }
        if (typeof status === 'object' && status && 'draft' in status) {
          console.log("Direct object draft status found");
          return true;
        }
        
        console.log("Product is not draft status");
        return false;
      });
      
      console.log(`Found ${userDraftProducts.length} draft products for user ${userPrincipalString}`);
      return userDraftProducts;
    } catch (error) {
      console.error("Failed to get user's draft products:", error);
      return [];
    }
  }

  // Get user's sold products
  async getSoldProducts(): Promise<Product[]> {
    try {
      await this.ensureActor();
      
      // Check if user is authenticated
      const isAuth = await this.isAuthenticated();
      if (!isAuth || !this.authClient) {
        console.warn("User not authenticated, cannot get sold products");
        return [];
      }

      // Get the user's principal ID
      const identity = this.authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();
      const userPrincipalString = userPrincipal.toString();
      console.log("Getting sold products for user principal:", userPrincipalString);

      // Get all products and filter by current user's principal and sold status
      const allProducts = await this.actor.getSoldProducts();
      console.log("Total products available:", allProducts.length);
      
      const userSoldProducts = allProducts.filter((product: Product) => {
        // Convert createdBy to string for comparison
        let createdByString: string;
        if (typeof product.createdBy === 'string') {
          createdByString = product.createdBy;
        } else {
          createdByString = String(product.createdBy);
        }
        
        const isUserProduct = createdByString === userPrincipalString;
        if (!isUserProduct) return false;

        // Debug: Log the product status
        console.log(`Checking product ${product.name} status:`, product.status);
        console.log("Status type:", typeof product.status);
        console.log("Status is array:", Array.isArray(product.status));

        // Check if product status is sold
        const status = product.status;
        if (Array.isArray(status) && status.length > 0) {
          const statusVariant = status[0];
          console.log("Status variant:", statusVariant);
          const isSold = statusVariant && typeof statusVariant === 'object' && 'sold' in statusVariant;
          console.log("Is sold:", isSold);
          return isSold;
        }
        if (typeof status === 'object' && status && 'sold' in status) {
          console.log("Direct object sold status found");
          return true;
        }
        
        console.log("Product is not sold status");
        return false;
      });
      
      console.log(`Found ${userSoldProducts.length} sold products for user ${userPrincipalString}`);
      return userSoldProducts;
    } catch (error) {
      console.error("Failed to get user's sold products:", error);
      return [];
    }
  }

  // Helper method to create a test product with specific status (for testing)
  async createTestProduct(status: "active" | "draft" | "sold" = "active"): Promise<Product | null> {
    try {
      const statusVariant = { [status]: null } as ProductStatus;
      
      const testProduct: ProductInput = {
        categoryId: BigInt(1), // Assuming category 1 exists
        status: [statusVariant],
        keySellingPoints: ["Test product", "For testing purposes"],
        name: `Test Product - ${status.toUpperCase()}`,
        minimumPrice: [BigInt(50)],
        reasonForSelling: "Testing purposes",
        targetPrice: [BigInt(100)],
        description: `This is a test product with ${status} status`,
        stock: BigInt(1),
        imageBase64: [],
        pickupDeliveryInfo: "Test location",
        knownFlaws: "None",
        price: BigInt(75),
        condition: "new"
      };

      console.log(`Creating test product with ${status} status:`, testProduct);
      return await this.createProduct(testProduct);
    } catch (error) {
      console.error("Failed to create test product:", error);
      return null;
    }
  }

  async createProduct(input: ProductInput): Promise<Product | null> {
    try {
      await this.ensureActor();
      
      // Check if user is authenticated
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        console.error("User not authenticated for product creation");
        throw new Error("Please log in again to create products");
      }

      // Log the input data being sent to backend
      console.log("Sending product data to backend:", input);
      console.log("Status field specifically:", input.status);
      console.log("Status field type:", typeof input.status);
      console.log("Status field is array:", Array.isArray(input.status));
      console.log("Status field length:", input.status?.length);
      console.log("Status field content:", JSON.stringify(input.status));
      console.log("Actor instance:", this.actor);
      
      // Check if user has seller profile (may be required for creating products)
      try {
        const sellerProfile = await this.actor.getSellerProfile?.();
        console.log("User seller profile:", sellerProfile);
      } catch (profileError) {
        console.log("No seller profile or error getting profile:", profileError);
      }

      const result: Result<Product, any> = await this.actor.createProduct(input);
      console.log("Backend response:", result);
      
      if ('ok' in result) {
        console.log("Product created successfully:", result.ok);
        return result.ok;
      } else {
        console.error("Backend returned error:", result.err);
        console.error("Error type:", typeof result.err);
        console.error("Error keys:", Object.keys(result.err || {}));
        
        // Handle specific ProductError types
        if (result.err) {
          if ('Unauthorized' in result.err) {
            console.error("User is not authorized to create products. May need seller profile or authentication.");
          } else if ('CategoryNotFound' in result.err) {
            const availableCategories = await this.getCategories();
            console.error("Category not found in backend. Available categories:");
            console.table(availableCategories);
            console.log("Category IDs available:", availableCategories.map(c => ({ id: c.id, name: c.name })));
          } else if ('InvalidInput' in result.err) {
            console.error("Invalid input provided:", result.err.InvalidInput);
          }
        }
        
        return null;
      }
    } catch (error) {
      console.error("Exception during createProduct:", error);
      console.error("Error type:", typeof error);
      console.error("Error message:", error instanceof Error ? error.message : 'Unknown error');
      
      // Check if this is a signature verification error
      if (error instanceof Error && error.message.includes('Invalid signature')) {
        console.error("Authentication signature is invalid. User needs to re-authenticate.");
        // Force re-authentication on next request
        this.authClient = null;
        this.actor = null;
        throw new Error("Your session has expired. Please log in again.");
      }
      
      return null;
    }
  }

  async updateProduct(productId: string, update: ProductUpdate): Promise<Product | null> {
    try {
      await this.ensureActor();
      
      // Log the update data being sent to backend
      console.log("Updating product:", productId, "with data:", update);
      
      // Check if user is authenticated
      const isAuth = await this.isAuthenticated();
      console.log("User authenticated:", isAuth);
      
      const result: Result<Product, any> = await this.actor.updateProduct(productId, update);
      console.log("Backend update response:", result);
      
      if ('ok' in result) {
        console.log("Product updated successfully:", result.ok);
        return result.ok;
      } else {
        console.error("Backend returned error:", result.err);
        console.error("Error type:", typeof result.err);
        console.error("Error keys:", Object.keys(result.err || {}));
        
        // Handle specific ProductError types
        if (result.err) {
          if ('Unauthorized' in result.err) {
            console.error("User is not authorized to update this product.");
          } else if ('ProductNotFound' in result.err) {
            console.error("Product not found.");
          } else if ('CategoryNotFound' in result.err) {
            console.error("Category not found.");
          } else if ('InvalidInput' in result.err) {
            console.error("Invalid input provided:", result.err.InvalidInput);
          }
        }
        
        return null;
      }
    } catch (error) {
      console.error("Exception during updateProduct:", error);
      console.error("Error type:", typeof error);
      console.error("Error message:", error instanceof Error ? error.message : 'Unknown error');
      return null;
    }
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    try {
      await this.ensureActor();
      const result = await this.actor.getCategories();
      return result || [];
    } catch (error) {
      console.error("Failed to get categories:", error);
      return [];
    }
  }

  // User balance methods
  async getBalance(): Promise<bigint | null> {
    try {
      await this.ensureActor();
      const result: Result<bigint, any> = await this.actor.getBalance();
      
      if ('ok' in result) {
        return result.ok;
      } else {
        console.error("Failed to get balance:", result.err);
        return null;
      }
    } catch (error) {
      console.error("Failed to get balance:", error);
      return null;
    }
  }

  // Utility method to check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    if (!this.authClient) {
      return false;
    }
    return await this.authClient.isAuthenticated();
  }

  // Method to login (refresh actor with authenticated identity)
  async login(): Promise<void> {
    await this.createActor();
  }

  // Create a basic seller profile if user doesn't have one
  async createBasicSellerProfile(): Promise<any> {
    try {
      await this.ensureActor();
      const sellerProfileInput = {
        businessName: "My Business", // Default name
        description: "Created via AI Product Creator",
        contactEmail: "", // User can update later
        contactPhone: [],
        location: []
      };
      
      console.log("Creating seller profile:", sellerProfileInput);
      const result = await this.actor.createSellerProfile(sellerProfileInput);
      console.log("Seller profile created:", result);
      return result;
    } catch (error) {
      console.error("Failed to create seller profile:", error);
      return null;
    }
  }

  // Get category ID by name, create if doesn't exist
  async getCategoryIdByName(categoryName: string): Promise<bigint> {
    try {
      await this.ensureActor();
      const categories = await this.getCategories();
      console.log("Available categories:", categories);
      
      // Try to find existing category by name (case-insensitive)
      const normalizedName = categoryName.toLowerCase().trim();
      const existingCategory = categories.find(cat => 
        cat.name.toLowerCase() === normalizedName
      );
      
      if (existingCategory) {
        console.log(`Found existing category "${categoryName}" with ID:`, existingCategory.id);
        return existingCategory.id; // Already bigint from backend
      }
      
      // If category doesn't exist, try to create it
      console.log(`Category "${categoryName}" not found, attempting to create it...`);
      
      try {
        const categoryInput = {
          name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1), // Capitalize first letter
          description: `Category for ${categoryName} products`,
          code: normalizedName.replace(/\s+/g, '_')
        };
        
        const newCategory = await this.actor.createCategory(categoryInput);
        console.log("Created new category:", newCategory);
        return newCategory.id; // Already bigint from backend
      } catch (createError) {
        console.warn("Failed to create category, using general category:", createError);
        
        // Fallback to first available category or create "general"
        if (categories.length > 0) {
          console.log("Using first available category as fallback:", categories[0]);
          return categories[0].id; // Already bigint from backend
        } else {
          // If no categories exist at all, create general category
          const generalCategory = await this.actor.createCategory({
            name: "General",
            description: "General category for all products",
            code: "general"
          });
          return generalCategory.id; // Already bigint from backend
        }
      }
    } catch (error) {
      console.error("Error in getCategoryIdByName:", error);
      // Ultimate fallback - use 1 as default
      return BigInt(1);
    }
  }
}

// Singleton instance
let adolServiceInstance: AdolService | null = null;

export const getAdolService = async (): Promise<AdolService> => {
  if (!adolServiceInstance) {
    adolServiceInstance = new AdolService();
    await adolServiceInstance.initialize();
  }
  return adolServiceInstance;
};

export default AdolService;
