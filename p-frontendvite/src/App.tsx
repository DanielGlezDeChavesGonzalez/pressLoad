import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Routines from "./pages/Routines";
import Meals from "./pages/Meals";
import Settings from "./pages/Settings";
import "./styles/styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
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
        <Route
          path="/meals"
          element={<Meals />}
        />
        <Route
          path="/routines"
          element={<Routines />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
