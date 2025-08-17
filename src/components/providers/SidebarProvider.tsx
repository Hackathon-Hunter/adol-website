"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  collapsed: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebar-collapsed");
    if (savedCollapsed !== null) {
      setCollapsed(JSON.parse(savedCollapsed));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
    }
  }, [collapsed, isLoaded]);

  const toggle = () => setCollapsed((prev) => !prev);

  if (!isLoaded) {
    return null;
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};