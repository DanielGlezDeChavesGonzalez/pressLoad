// services/api.ts
const API_BASE_URL = 'http://localhost:8080';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface MacroData {
  proteins: number;
  carbohydrates: number;
  fats: number;
  totalCalories: number;
}

export interface WorkoutDayData {
  day: string;
  sets: number;
}

export interface WeeklyWorkoutData {
  workoutDays: WorkoutDayData[];
}

export interface UserStats {
  name: string;
  email: string;
  contacts: number;
  activeStreak: number;
}

export interface DashboardData {
  macroData: MacroData;
  weeklyWorkouts: WeeklyWorkoutData;
  userStats: UserStats;
}

export interface Meal {
  id: number;
  name: string;
  date: string;
  time: string;
  notes?: string;
  totalCalories?: number;
  totalProteins?: number;
  totalCarbohydrates?: number;
  totalFats?: number;
  mealFoods?: MealFood[];
  // Propiedades compatibles con el frontend existente
  calories?: number;
  proteins?: number;
  carbohydrates?: number;
  fats?: number;
}

export interface MealFood {
  id: number;
  food: Food;
  quantity: number;
  unit: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
}

export interface Food {
  id: number;
  name: string;
  caloriesPer100g: number;
  proteinsPer100g: number;
  carbohydratesPer100g: number;
  fatsPer100g: number;
  description?: string;
}

export interface Routine {
  id: number;
  name: string;
  date: string;
  notes?: string;
  exercises?: Exercise[];
  // Propiedades adicionales para compatibilidad con frontend
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  lastUsed?: string;
}

export interface Exercise {
  id: number;
  name: string;
  sets: number | ExerciseSet[]; // Permite tanto el formato del backend como del frontend
  reps: number;
  weight?: number;
  notes?: string;
  // Propiedades adicionales para compatibilidad con frontend
  order?: number;
  detailedSets?: ExerciseSet[];
}

export interface ExerciseSet {
  id: number;
  reps: number;
  weight: number;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        throw new Error('Sesión expirada');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<DashboardData>(response);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Devolver datos de ejemplo en caso de error
      return this.getMockDashboardData();
    }
  }

  async getMacroData(date?: string): Promise<MacroData> {
    try {
      const url = new URL(`${API_BASE_URL}/api/dashboard/macros`);
      if (date) {
        url.searchParams.append('date', date);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<MacroData>(response);
    } catch (error) {
      console.error('Error fetching macro data:', error);
      // Devolver datos de ejemplo en caso de error
      return {
        proteins: 120,
        carbohydrates: 280,
        fats: 65,
        totalCalories: 2100
      };
    }
  }

  async getWeeklyWorkouts(): Promise<WeeklyWorkoutData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/workouts/weekly`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<WeeklyWorkoutData>(response);
    } catch (error) {
      console.error('Error fetching workout data:', error);
      // Devolver datos de ejemplo en caso de error
      return {
        workoutDays: [
          { day: "Lun", sets: 12 },
          { day: "Mar", sets: 0 },
          { day: "Mié", sets: 15 },
          { day: "Jue", sets: 8 },
          { day: "Vie", sets: 18 },
          { day: "Sáb", sets: 0 },
          { day: "Dom", sets: 10 },
        ]
      };
    }
  }
  private getMockDashboardData(): DashboardData {
    return {
      macroData: {
        proteins: 120,
        carbohydrates: 280,
        fats: 65,
        totalCalories: 2100
      },
      weeklyWorkouts: {
        workoutDays: [
          { day: "Lun", sets: 12 },
          { day: "Mar", sets: 0 },
          { day: "Mié", sets: 15 },
          { day: "Jue", sets: 8 },
          { day: "Vie", sets: 18 },
          { day: "Sáb", sets: 0 },
          { day: "Dom", sets: 10 },
        ]
      },
      userStats: {
        name: "John Doe",
        email: "john.doe@example.com",
        contacts: 24,
        activeStreak: 7
      }
    };
  }

  // Métodos para comidas
  async getUserMeals(): Promise<Meal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/meals`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Meal[]>(response);
    } catch (error) {
      console.error('Error fetching meals:', error);
      return [];
    }
  }

  async getMealsByDate(date: string): Promise<Meal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/meals/date/${date}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Meal[]>(response);
    } catch (error) {
      console.error('Error fetching meals by date:', error);
      return [];
    }
  }

  async createMeal(meal: { name: string; date: string; time: string; notes?: string }): Promise<Meal> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/meals`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(meal),
      });
      return this.handleResponse<Meal>(response);
    } catch (error) {
      console.error('Error creating meal:', error);
      throw error;
    }
  }

  async updateMeal(id: number, meal: Partial<Meal>): Promise<Meal> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/meals/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(meal),
      });
      return this.handleResponse<Meal>(response);
    } catch (error) {
      console.error('Error updating meal:', error);
      throw error;
    }
  }

  async deleteMeal(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/meals/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      await this.handleResponse<void>(response);
    } catch (error) {
      console.error('Error deleting meal:', error);
      throw error;
    }
  }

  // Métodos para alimentos
  async getFoods(): Promise<Food[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/foods`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Food[]>(response);
    } catch (error) {
      console.error('Error fetching foods:', error);
      return [];
    }
  }

  async searchFoods(query: string): Promise<Food[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/foods/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Food[]>(response);
    } catch (error) {
      console.error('Error searching foods:', error);
      return [];
    }
  }

  // Métodos para rutinas
  async getUserRoutines(): Promise<Routine[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/routines`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Routine[]>(response);
    } catch (error) {
      console.error('Error fetching routines:', error);
      return [];
    }
  }

  async getRoutinesByDate(date: string): Promise<Routine[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/routines/date/${date}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Routine[]>(response);
    } catch (error) {
      console.error('Error fetching routines by date:', error);
      return [];
    }
  }

  async createRoutine(routine: { name: string; date: string; notes?: string }): Promise<Routine> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/routines`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(routine),
      });
      return this.handleResponse<Routine>(response);
    } catch (error) {
      console.error('Error creating routine:', error);
      throw error;
    }
  }

  async updateRoutine(id: number, routine: Partial<Routine>): Promise<Routine> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/routines/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(routine),
      });
      return this.handleResponse<Routine>(response);
    } catch (error) {
      console.error('Error updating routine:', error);
      throw error;
    }
  }

  async deleteRoutine(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/routines/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      await this.handleResponse<void>(response);
    } catch (error) {
      console.error('Error deleting routine:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
