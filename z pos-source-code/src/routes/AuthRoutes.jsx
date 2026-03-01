import React from 'react';
import { Routes, Route } from 'react-router';
import Login from '../pages/common/Auth/Login';
import Signup from '../pages/common/Auth/Signup';
import ResetPassword from '../pages/common/Auth/ResetPassword';
import Onboarding from '../pages/onboarding/Onboarding';

// Placeholder for Auth pages
const ForgotPasswordPage = () => <div className="flex items-center justify-center h-screen text-2xl font-bold">Forgot Password Page</div>;

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPassword />} />
      {/* Add more auth-specific routes here */}
    </Routes>
  );
};

export default AuthRoutes;