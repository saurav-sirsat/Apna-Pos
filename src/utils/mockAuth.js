// Mock authentication service for production demo
export const mockSignup = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful signup response
  return {
    success: true,
    data: {
      jwt: 'mock-jwt-token-' + Date.now(),
      message: 'Register success',
      title: 'Welcome ' + userData.email,
      user: {
        id: Math.floor(Math.random() * 1000),
        email: userData.email,
        phone: userData.phone,
        fullName: userData.fullName,
        role: userData.role,
        storeId: null,
        branchId: null
      }
    }
  };
};

export const mockLogin = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful login response
  return {
    success: true,
    data: {
      jwt: 'mock-jwt-token-' + Date.now(),
      message: 'Login success',
      title: 'Welcome Back' + credentials.email,
      user: {
        id: Math.floor(Math.random() * 1000),
        email: credentials.email,
        fullName: 'Mock User',
        role: 'ROLE_BRANCH_CASHIER', // Assign cashier role for POS testing
        storeId: null,
        branchId: null
      }
    }
  };
};
