import { createContext, useContext, useEffect, useState } from "react";
import { CandidateProfile } from "../types";

interface CandidateProfileContext{
    candidateProfiles: CandidateProfile[];
    addCandidateProfile: (profile: Omit<CandidateProfile, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateCandidateProfile: (id: string, profile: Partial<CandidateProfile>) => void;
    deleteCandidateProfile: (id: string) => void;
}

//creo el contexto
const CandidateProfileContext = createContext<CandidateProfileContext | undefined>(undefined);

//creo el provider
export const CandidateProfileprovider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [candidateProfiles, setCandidateProfiles] = useState<CandidateProfile[]>([]);

    useEffect(() => {
        const fetchCandidateProfiles = async () => {
            try {
                const response = await fetch('http://localhost:3000/candidateProfiles');
                if (!response.ok) {
                    throw new Error('Failed to fetch candidate profiles');
                }
                const data = await response.json();
                setCandidateProfiles(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCandidateProfiles();
    });

    const addCandidateProfile = async (profile: Omit<CandidateProfile, 'id' | 'createdAt' | 'updatedAt'>) => {

    }

    const updateCandidateProfile = async (id: string, profile: Partial<CandidateProfile>) => {
        try {
            const response = await fetch(`http://localhost:3000/candidateProfiles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (!response.ok) {
                throw new Error('Failed to update candidate profile');
            }

            const updatedProfile = await response.json();
            setCandidateProfiles(prev => prev.map(p => p.id === id ? updatedProfile : p));
        } catch (error) {
            console.error(error);
        }
    };
    const deleteCandidateProfile = async (id: string) => {}

    return (
        <CandidateProfileContext.Provider value={{
            candidateProfiles,
            addCandidateProfile,
            updateCandidateProfile,
            deleteCandidateProfile,
        }}>
            {children}
        </CandidateProfileContext.Provider>
    );
};

export const useCandidateProfile = () => {
    const context = useContext(CandidateProfileContext);
    if (context === undefined) {
        throw new Error('useCandidateProfile must be used within a CandidateProfileProvider');
    }
    return context;

};