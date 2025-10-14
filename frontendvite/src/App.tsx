import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Routines from "./pages/Routines";
// import Meals from "./pages/Meals";
import Settings from "./pages/Settings";
import "./styles/styles.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        index
        element={<Home />}
      />
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      {/* <Route
        path="/meals" 
        element={
          <ProtectedRoute>
            <Meals />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/routines"
        element={
          <ProtectedRoute>
            <Routines />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
