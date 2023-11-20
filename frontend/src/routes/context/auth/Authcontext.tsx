import { createContext } from 'react';
import { UsersProps } from '../../../types/index';

export type AuthContextType = {
    user: UsersProps | null;
    signin: (email: string, jtiToken: string) => Promise<boolean>;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);