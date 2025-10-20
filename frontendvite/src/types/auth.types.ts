export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

export interface Role {
  id?: number;
  name?: string;
}

export interface Routine {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: string;
  // Agrega más campos según tu modelo
}

export interface User {
  username: string;
  email: string;
  routines: Routine[];
  role: Role;
}
