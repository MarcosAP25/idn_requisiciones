import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Requisition } from '../types';

//creacion del contexto

const DataContext = createContext<DataContextType | undefined>(undefined);

//Creacion del provider

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(()=> {
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
            setError(error.message);
          } else if(typeof error === 'string'){
            //String de error
            setError(error);
          } else{
            setError('Unknown error');
          }
      }finally{
        setIsLoading(false);
      }
    };

    //Ejecuto mis funciones
    fetchDataUser();
  }, []);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const addRequisition = (reqData: Omit<Requisition, 'id' | 'number' | 'createdAt'>) => {
    const newRequisition: Requisition = {
      ...reqData,
      id: Date.now().toString(),
      number: `REQ-2024-${String(requisitions.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };
    setRequisitions(prev => [...prev, newRequisition]);
  };

  const updateRequisition = (id: string, reqData: Partial<Requisition>) => {
    setRequisitions(prev => prev.map(req => 
      req.id === id ? { ...req, ...reqData } : req
    ));
  };

  const deleteRequisition = (id: string) => {
    setRequisitions(prev => prev.filter(req => req.id !== id));
  };

  return (
    <DataContext.Provider value={{
      users,
      requisitions,
      addUser,
      updateUser,
      deleteUser,
      addRequisition,
      updateRequisition,
      deleteRequisition,
    }}>
      {children}
    </DataContext.Provider>
  );
};

//Creacion del hook


export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

//Tipos internos

interface DataContextType {
  users: User[];
  requisitions: Requisition[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRequisition: (requisition: Omit<Requisition, 'id' | 'number' | 'createdAt'>) => void;
  updateRequisition: (id: string, requisition: Partial<Requisition>) => void;
  deleteRequisition: (id: string) => void;
}