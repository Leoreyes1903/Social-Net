export const signUp = async (username, email, password) => {
  try {
    const response = await fetch('https://social-network-v7j7.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    
    // Log response status and data for debugging
    console.log('Response Status:', response.status);
    console.log('Response Data:', data);

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.msg || data.message || 'Signup failed');
    }

    // Assuming you're using this token in your app for authentication
    console.log('Signup successful, token:', data.token);
    return data;
  } catch (error) {
    console.error('Signup error:', error.message);
    throw error;
  }
};
