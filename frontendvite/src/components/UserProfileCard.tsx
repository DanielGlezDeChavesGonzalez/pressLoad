import { User } from "../types/auth.types";

interface UserProfileCardProps {
  user: User;
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.username}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600 font-medium">Rol</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {user.role?.name || "Usuario"}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600 font-medium">Total Rutinas</span>
          <span className="text-gray-800 font-semibold">
            {user.routines?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
