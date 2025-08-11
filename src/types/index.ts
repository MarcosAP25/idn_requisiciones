export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  status: 1 | 0;
  createdAt: string;
}

export interface Requisition {
  id: string;
  number: string;
  requestDate: string;
  receptionDate: string;
  department: string;
  section: string;
  unit: string;
  position: string;
  quantity: number;
  recruitmentType: 'military' | 'civil';
  recruitmentCause: string;
  substitutes: string;
  internalCandidate: string;
  schedule: string;
  academicLevel: string;
  specialStudies: string;
  workExperience: string;
  languages: string;
  softwareSkills: string;
  otherKnowledge: string;
  positionObjective: string;
  dependentPositions: string;
  requiredEquipment: string;
  createdBy: string;
  status: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface CandidateProfile {
  id: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
    nationality: string;
    maritalStatus: string;
    idNumber: string;
  };
  professionalSummary: string;
  workExperience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    isCurrentJob: boolean;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  skills: {
    technical: string[];
    languages: {
      language: string;
      level: string;
    }[];
    soft: string[];
  };
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
  }[];
  references: {
    id: string;
    name: string;
    position: string;
    company: string;
    phone: string;
    email: string;
  }[];
  createdBy: string;
  status: 'active' | 'inactive' | 'employed' | 'archived' | 'rejected';
  createdAt: string;
  updatedAt: string;
}