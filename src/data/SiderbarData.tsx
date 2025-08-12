// src/data/sidebarData.ts
import {
    LayoutDashboard,
    Users,
    Building2,
    FileText,
    List,
    User,
    ChevronDown,
    UserPlus,
    FolderOpen
} from 'lucide-react';

export interface MenuItem {
    icon?: React.ElementType;
    label?: string;
    path?: string;
    children?: Omit<MenuItem, 'children'>[];
    separator?: boolean; // Nueva propiedad para el separador
}

export const menuItems: MenuItem[] = [
    {
        icon: LayoutDashboard,
        label: 'Dashboard',
        path: '/dashboard'
    },
    { separator: true },
    {
        icon: Users,
        label: 'Reclutamiento',
        children: [
            {
                icon: FileText,
                label: 'Nueva Requisición',
                path: '/requisition'
            },
            { 
                icon: UserPlus, 
                label: 'Registro de CV', 
                path: '/cv-form' 
            },
            {
                icon: List,
                label: 'Solicitudes de requisición',
                path: '/requests'
            },
            { 
                icon: FolderOpen, 
                label: 'Perfiles Profesionales', 
                path: '/candidate-profiles' 
            },
        ]
    },
    //   ...(user?.role === 'admin' ? [{ icon: Users, label: 'Control de Acceso', path: '/users' }] : []),


];