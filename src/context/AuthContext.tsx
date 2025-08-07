import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    //Obtengo los usuarios de la base de datos
    const fetchDataUser = async () => {
      try{
        const response = await fetch('http://localhost:3000/users');

        if(!response.ok){
          throw new Error('Failed to fetch users');
        };

        const data = await response.json();
        setUsers(data);
      }catch(error){
        if(error instanceof Error){
          //Instancia de error
          console.log(error.message);
        } else if(typeof error === 'string'){
          //String de error
          console.log(error);
        } else{
          console.log('Unknown error');
        }
      }
    };
    fetchDataUser();
    //Verifico si el usuario está logueado
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = users.find(
      u => u.email === email && u.password === password && u.status === 1
    );
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser, password: '' };
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

//Hook para usar el AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};