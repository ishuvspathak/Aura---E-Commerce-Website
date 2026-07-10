import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize and load session
  useEffect(() => {
    // 1. Ensure default users exist in localStorage
    const existingUsers = localStorage.getItem('aura_registered_users');
    if (!existingUsers) {
      const defaultUsers = [
        {
          id: "u-1",
          username: "Admin User",
          email: "admin@aura.com",
          password: "adminpassword",
          role: "admin",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
          addresses: [
            { id: "a-1", type: "Home", name: "Admin Home", street: "123 Aura Blvd", city: "San Francisco", state: "CA", zip: "94103", country: "USA", phone: "+1 (555) 123-4567", isDefault: true }
          ],
          cards: [
            { id: "c-1", type: "Visa", number: "**** **** **** 4242", name: "ADMIN USER", expiry: "12/28", isDefault: true }
          ]
        },
        {
          id: "u-2",
          username: "Intern Candidate",
          email: "user@aura.com",
          password: "userpassword",
          role: "user",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop",
          addresses: [
            { id: "a-2", type: "Office", name: "Work Station", street: "456 Tech Park", city: "Seattle", state: "WA", zip: "98101", country: "USA", phone: "+1 (555) 987-6543", isDefault: true }
          ],
          cards: []
        }
      ];
      localStorage.setItem('aura_registered_users', JSON.stringify(defaultUsers));
    }

    // 2. Load active session
    const activeSession = localStorage.getItem('aura_user_session');
    if (activeSession) {
      const parsedUser = JSON.parse(activeSession);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('aura_registered_users') || '[]');
    const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (matchedUser) {
      setUser(matchedUser);
      setIsAuthenticated(true);
      localStorage.setItem('aura_user_session', JSON.stringify(matchedUser));
      return { success: true, user: matchedUser };
    }
    return { success: false, message: "Invalid email or password." };
  };

  const loginGoogle = () => {
    const mockGoogleUser = {
      id: "u-google",
      username: "Google Guest",
      email: "google.guest@gmail.com",
      role: "user",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      addresses: [],
      cards: []
    };
    
    // Check if google user exists in registry, else register them
    const users = JSON.parse(localStorage.getItem('aura_registered_users') || '[]');
    if (!users.find(u => u.id === mockGoogleUser.id)) {
      users.push(mockGoogleUser);
      localStorage.setItem('aura_registered_users', JSON.stringify(users));
    }

    setUser(mockGoogleUser);
    setIsAuthenticated(true);
    localStorage.setItem('aura_user_session', JSON.stringify(mockGoogleUser));
    return { success: true, user: mockGoogleUser };
  };

  const signup = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('aura_registered_users') || '[]');
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "Email is already registered." };
    }

    const newUser = {
      id: `u-${Date.now()}`,
      username,
      email,
      password,
      role: "user",
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(username)}`,
      addresses: [],
      cards: []
    };

    users.push(newUser);
    localStorage.setItem('aura_registered_users', JSON.stringify(users));
    
    // Automatically log in after registration
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('aura_user_session', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('aura_user_session');
  };

  const updateProfile = (updatedData) => {
    if (!user) return { success: false, message: "Not logged in." };
    
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('aura_user_session', JSON.stringify(updatedUser));

    // Update inside registry
    const users = JSON.parse(localStorage.getItem('aura_registered_users') || '[]');
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
      localStorage.setItem('aura_registered_users', JSON.stringify(users));
    }
    return { success: true, user: updatedUser };
  };

  const addAddress = (address) => {
    const newAddress = { ...address, id: `a-${Date.now()}` };
    let currentAddresses = user.addresses || [];
    if (address.isDefault) {
      currentAddresses = currentAddresses.map(addr => ({ ...addr, isDefault: false }));
    }
    const updatedAddresses = [...currentAddresses, newAddress];
    updateProfile({ addresses: updatedAddresses });
  };

  const deleteAddress = (addressId) => {
    const updatedAddresses = (user.addresses || []).filter(addr => addr.id !== addressId);
    updateProfile({ addresses: updatedAddresses });
  };

  const addCard = (card) => {
    const newCard = { ...card, id: `c-${Date.now()}` };
    let currentCards = user.cards || [];
    if (card.isDefault) {
      currentCards = currentCards.map(c => ({ ...c, isDefault: false }));
    }
    const updatedCards = [...currentCards, newCard];
    updateProfile({ cards: updatedCards });
  };

  const deleteCard = (cardId) => {
    const updatedCards = (user.cards || []).filter(c => c.id !== cardId);
    updateProfile({ cards: updatedCards });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      loginGoogle,
      signup,
      logout,
      updateProfile,
      addAddress,
      deleteAddress,
      addCard,
      deleteCard
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
