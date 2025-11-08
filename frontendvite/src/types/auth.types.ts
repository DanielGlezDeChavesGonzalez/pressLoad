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

export interface RoutineExercise {
  id?: number;
  exerciseId?: number;
  sets?: number;
  reps?: number;
  weigth?: number;
}

export interface Routine {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: string;
  exercises?: RoutineExercise[];
}

export interface User {
  username: string;
  email: string;
  routines: Routine[];
  role: Role;
}

export interface AuthError {
  status: number;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  error?: AuthError;
}
