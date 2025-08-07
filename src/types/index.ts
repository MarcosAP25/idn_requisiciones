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
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}