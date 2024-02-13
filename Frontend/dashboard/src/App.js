import "./App.css";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword"
import CreateAccount from "./Components/CreateAccount/CreateAccount";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { ProtectedRoute } from "./Components/Helper/ProtectedRoute";
import { AuthProvider } from "./Hooks/useAuth";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="createAccount" element={<CreateAccount />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
