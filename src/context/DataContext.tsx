import React, { createContext, useContext, useState } from 'react';
import { User, Requisition } from '../types';

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

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'admin@dni.gov.do',
    password: 'admin123',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@dni.gov.do',
    password: 'user123',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos@dni.gov.do',
    password: 'user123',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
  }
];

const mockRequisitions: Requisition[] = [
  {
    id: '1',
    number: 'REQ-2024-001',
    requestDate: '2024-01-15',
    receptionDate: '2024-01-16',
    department: 'Recursos Humanos',
    section: 'Reclutamiento',
    unit: 'Selección',
    position: 'Analista de RRHH',
    quantity: 1,
    recruitmentType: 'civil',
    recruitmentCause: 'Creacion',
    substitutes: 'N/A',
    internalCandidate: 'Ninguno',
    schedule: '8:00 AM - 5:00 PM',
    academicLevel: 'Licenciatura en Psicología o afín',
    specialStudies: 'Especialización en RRHH',
    workExperience: '2 años en reclutamiento',
    languages: 'Español, Inglés intermedio',
    softwareSkills: 'MS Office, HRIS',
    otherKnowledge: 'Conocimiento en legislación laboral',
    positionObjective: 'Gestionar procesos de reclutamiento y selección',
    dependentPositions: 'Asistente de RRHH',
    requiredEquipment: 'Computadora, teléfono, impresora',
    createdBy: '1',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    number: 'REQ-2024-002',
    requestDate: '2024-02-01',
    receptionDate: '2024-02-02',
    department: 'Tecnología',
    section: 'Desarrollo',
    unit: 'Backend',
    position: 'Desarrollador Senior',
    quantity: 2,
    recruitmentType: 'civil',
    recruitmentCause: 'Incremento de labores',
    substitutes: 'N/A',
    internalCandidate: 'Ninguno',
    schedule: '9:00 AM - 6:00 PM',
    academicLevel: 'Ingeniería en Sistemas',
    specialStudies: 'Certificaciones en tecnologías web',
    workExperience: '5 años en desarrollo web',
    languages: 'Español, Inglés avanzado',
    softwareSkills: 'Java, Spring Boot, PostgreSQL',
    otherKnowledge: 'Metodologías ágiles, DevOps',
    positionObjective: 'Desarrollar y mantener aplicaciones backend',
    dependentPositions: 'Desarrollador Junior',
    requiredEquipment: 'Laptop, monitor adicional',
    createdBy: '2',
    status: 'approved',
    createdAt: '2024-02-01T14:20:00Z',
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [requisitions, setRequisitions] = useState<Requisition[]>(mockRequisitions);

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