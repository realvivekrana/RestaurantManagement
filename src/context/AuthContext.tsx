import React, { createContext, useContext, useState, useCallback } from "react";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  label: string; // "Home", "Work", "Other"
  fullAddress: string;
  isPrimary: boolean;
}

interface AuthContextType {
  user: MockUser | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  loginAsAdmin: () => void;
  updateUser: (updates: Partial<MockUser>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setPrimaryAddress: (id: string) => void;
}

const mockUser: MockUser = {
  id: "u1",
  name: "Rahul Sharma",
  email: "rahul.sharma@gmail.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  role: "user",
  phone: "+91 98765 43210",
  addresses: [
    {
      id: "addr1",
      label: "Home",
      fullAddress: "123, MG Road, Bangalore, Karnataka - 560001",
      isPrimary: true,
    },
    {
      id: "addr2",
      label: "Work",
      fullAddress: "456, Tech Park, Whitefield, Bangalore - 560066",
      isPrimary: false,
    },
  ],
};

const mockAdmin: MockUser = {
  id: "a1",
  name: "Admin Chef",
  email: "admin@spicegarden.in",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  role: "admin",
  phone: "+91 99999 00000",
  addresses: [],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);

  const login = useCallback(() => setUser(mockUser), []);
  const loginAsAdmin = useCallback(() => setUser(mockAdmin), []);
  const logout = useCallback(() => setUser(null), []);

  const updateUser = useCallback((updates: Partial<MockUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const addAddress = useCallback((address: Omit<Address, "id">) => {
    setUser((prev) => {
      if (!prev) return null;
      const newAddress: Address = {
        ...address,
        id: `addr${Date.now()}`,
        isPrimary: address.isPrimary && prev.addresses ? false : address.isPrimary,
      };
      
      let addresses = prev.addresses || [];
      
      // If this is set as primary, unset others
      if (newAddress.isPrimary) {
        addresses = addresses.map((a) => ({ ...a, isPrimary: false }));
      }
      
      return { ...prev, addresses: [...addresses, newAddress] };
    });
  }, []);

  const updateAddress = useCallback((id: string, updates: Partial<Address>) => {
    setUser((prev) => {
      if (!prev || !prev.addresses) return prev;
      
      let addresses = prev.addresses.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      );
      
      // If setting as primary, unset others
      if (updates.isPrimary) {
        addresses = addresses.map((a) =>
          a.id === id ? { ...a, isPrimary: true } : { ...a, isPrimary: false }
        );
      }
      
      return { ...prev, addresses };
    });
  }, []);

  const deleteAddress = useCallback((id: string) => {
    setUser((prev) => {
      if (!prev || !prev.addresses) return prev;
      const addresses = prev.addresses.filter((a) => a.id !== id);
      
      // If deleted address was primary and there are other addresses, make first one primary
      const hadPrimary = prev.addresses.find((a) => a.id === id)?.isPrimary;
      if (hadPrimary && addresses.length > 0) {
        addresses[0].isPrimary = true;
      }
      
      return { ...prev, addresses };
    });
  }, []);

  const setPrimaryAddress = useCallback((id: string) => {
    setUser((prev) => {
      if (!prev || !prev.addresses) return prev;
      const addresses = prev.addresses.map((a) => ({
        ...a,
        isPrimary: a.id === id,
      }));
      return { ...prev, addresses };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        loginAsAdmin,
        updateUser,
        addAddress,
        updateAddress,
        deleteAddress,
        setPrimaryAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
