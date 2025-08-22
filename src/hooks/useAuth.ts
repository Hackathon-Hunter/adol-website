"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

// Mock service interface - replace with your actual canister interface
interface _SERVICE {
  greet: (name: string) => Promise<string>;
}

// Mock IDL factory - replace with your actual canister IDL
const idlFactory = ({ IDL }: any) => {
  return IDL.Service({
    greet: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
  });
};

interface AuthContextType {
  isAuthenticated: boolean;
  principal: Principal | null;
  actor: ActorSubclass<_SERVICE> | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  authClient: AuthClient | null;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  principal: null,
  actor: null,
  login: async () => { },
  logout: async () => { },
  isLoading: true,
  authClient: null,
  isInitialized: false,
});

// Replace with your actual canister ID when you have one deployed
// For now, we'll use a valid example canister ID or make it optional
// To use your own canister:
// 1. Deploy your canister to IC network
// 2. Replace CANISTER_ID with your canister's Principal ID
// 3. Replace idlFactory with your canister's IDL factory
// 4. Replace _SERVICE interface with your canister's service interface
const CANISTER_ID = "rrkah-fqaaa-aaaaa-aaaaq-cai"; // Internet Identity canister ID (valid example)

const getIdentityProviderUrl = () => {
  return "https://identity.ic0.app";
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [actor, setActor] = useState<ActorSubclass<_SERVICE> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const client = await AuthClient.create({
          idleOptions: {
            disableIdle: true,
            disableDefaultIdleCallback: true,
          },
        });

        setAuthClient(client);

        const isAuth = await client.isAuthenticated();

        if (isAuth) {
          const identity = client.getIdentity();
          const userPrincipal = identity.getPrincipal();

          setIsAuthenticated(true);
          setPrincipal(userPrincipal);

          // Try to create actor, but don't fail authentication if it fails
          try {
            await createActor(identity);
          } catch (actorError) {
            console.warn("⚠️ Could not create actor (this is normal if you don't have a canister deployed yet):", actorError);
          }
        } else {
          setIsAuthenticated(false);
          setPrincipal(null);
          setActor(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setPrincipal(null);
        setActor(null);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  const createActor = async (identity: Identity) => {
    try {
      const agent = new HttpAgent({
        identity,
        host: "https://ic0.app",
      });

      // Only fetch root key in development
      if (process.env.NODE_ENV !== "production") {
        await agent.fetchRootKey();
      }

      // Validate canister ID before creating actor
      try {
        Principal.fromText(CANISTER_ID);
      } catch (principalError) {
        throw new Error(`Invalid canister ID: ${CANISTER_ID}`);
      }

      const newActor = Actor.createActor<_SERVICE>(idlFactory, {
        agent,
        canisterId: CANISTER_ID,
      });

      setActor(newActor);

      return newActor;
    } catch (error) {
      console.error("❌ Error creating actor:", error);
      throw error;
    }
  };

  const login = async () => {
    if (!authClient) {
      throw new Error("Auth client not initialized");
    }

    try {
      setIsLoading(true);

      const identityProviderUrl = getIdentityProviderUrl();

      await new Promise<void>((resolve, reject) => {
        authClient.login({
          identityProvider: identityProviderUrl,
          maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days
          onSuccess: () => {
            resolve();
          },
          onError: (error) => {
            console.error("❌ Login failed:", error);
            reject(error);
          },
        });
      });

      const identity = authClient.getIdentity();
      const userPrincipal = identity.getPrincipal();

      setIsAuthenticated(true);
      setPrincipal(userPrincipal);

      // Try to create actor, but don't fail authentication if it fails
      try {
        await createActor(identity);
      } catch (actorError) {
        console.warn("⚠️ Could not create actor (this is normal if you don't have a canister deployed yet):", actorError);
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setIsAuthenticated(false);
      setPrincipal(null);
      setActor(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!authClient) return;

    try {
      await authClient.logout();

      setIsAuthenticated(false);
      setPrincipal(null);
      setActor(null);
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    principal,
    actor,
    login,
    logout,
    isLoading,
    authClient,
    isInitialized,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
