import { AuthProvider } from "./AuthContext";
import { CandidateProfileprovider } from "./CandidateProfileContext";
import { DataProvider } from "./DataContext";


interface Props{
    children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
    return (
        <AuthProvider>
            <DataProvider>
                <CandidateProfileprovider>
                    {children}
                </CandidateProfileprovider>
            </DataProvider>
        </AuthProvider>
    );
}