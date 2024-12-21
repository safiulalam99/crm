import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLoggedInUserDetails } from 'src/contexts/AuthContext';

// Update the UserType to match the structure of your user details
type UserType = {
  id: string;
  // Add other user properties as needed
  // For example: name: string; email: string;
};

// Define the type for the context
type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

// Create the user context with an initial null value
export const UserContext = createContext<UserContextType | null>(null);

// Component type for the provider
type UserProviderProps = {
  children: ReactNode;
};

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getLoggedInUserDetails();
      if (userDetails) {
        setUser(userDetails); // Set the entire userDetails object
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
