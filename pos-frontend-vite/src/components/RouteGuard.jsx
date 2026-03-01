import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const RouteGuard = ({ children, allowedRoles, fallback = '/auth/login' }) => {
  const { userProfile } = useSelector((state) => state.user);
  
  // Check if user is logged in
  if (!userProfile) {
    return <Navigate to={fallback} replace />;
  }
  
  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userProfile.role)) {
    // Redirect based on user's actual role
    const roleRedirects = {
      'ROLE_ADMIN': '/super-admin',
      'ROLE_BRANCH_CASHIER': '/cashier',
      'ROLE_STORE_ADMIN': '/store',
      'ROLE_STORE_MANAGER': '/store',
      'ROLE_BRANCH_MANAGER': '/branch',
      'ROLE_BRANCH_ADMIN': '/branch'
    };
    
    const redirectPath = roleRedirects[userProfile.role] || '/auth/login';
    return <Navigate to={redirectPath} replace />;
  }
  
  return children;
};

export default RouteGuard;
