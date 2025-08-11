import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Requisition, CandidateProfile } from '../types';
import toast from 'react-hot-toast';

//creacion del contexto

const DataContext = createContext<DataContextType | undefined>(undefined);

//Creacion del provider

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  


  useEffect(()=> {

    //Obtengo los usuarios guardados
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

    //Obtengo las requisiones guardadas
    const fecthDataRequisition = async () => {
      try{
        const response = await fetch('http://localhost:3000/requisitions');

        if(!response.ok){
          throw new Error('Failed to fetch requisitions');
        };

        const data = await response.json();
        setRequisitions(data);

      }catch(error){
          if(error instanceof Error){
            //Instancia de error
            setError(error.message);
            toast.error(error.message);
          } else if(typeof error === 'string'){
            //String de error
            setError(error);
            toast.error(error);
          } else{
            setError('Unknown error');
            toast.error('Ha ocurrido un error al obtener las requisiones.');
          }
      }finally{
        setIsLoading(false);
      }
    }
    //Ejecuto mis funciones
    fetchDataUser();
    fecthDataRequisition();
  }, []);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {

    fetch("http://localhost:3000/users",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {
      setUsers((prev) => [...prev, data]);
      toast.success('Usuario creado correctamente.');
    }).catch((error) => {
      toast.error('Error al crear el usuario.');
    })


  };

  const updateUser = (id: string, userData: Partial<User>) => {
    // setUsers(prev => prev.map(user => 
    //   user.id === id ? { ...user, ...userData } : user
    // ));

    fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {
      setUsers((prev) => prev.map((user) => (user.id === id ? data : user)));
      toast.success('Usuario actualizado correctamente.');
    }).catch((error) => {
      toast.error('Error al actualizar el usuario.');
    });
  };

  const deleteUser = (id: string) => {
    // setUsers(prev => prev.filter(user => user.id !== id));

    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success('Usuario eliminado correctamente.');
    }).catch((error) => {
      toast.error('Error al eliminar el usuario.');
    });

  };

  const addRequisition = (reqData: Omit<Requisition, 'id' | 'number' | 'createdAt'>) => {
    const newRequisition: Requisition = {
      ...reqData,
      id: Date.now().toString(),
      number: `REQ-2025-${String(requisitions.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };

    fetch("http://localhost:3000/requisitions",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequisition),
    })
    .then((response) => response.json())
    .then((data) => {
      setRequisitions((prev) => [...prev, data]);
      toast.success('Requisición creada correctamente.');
    }).catch((error) => {
      toast.error('Error al crear el usuario.');
    })

    
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