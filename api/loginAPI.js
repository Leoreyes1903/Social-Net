export const login = async (email, password) => {
  try {
    const response = await fetch('https://social-network-v7j7.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Assuming the response contains a token
    return data;
  } catch (error) {
    throw error;
  }
};
