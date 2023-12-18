
export const authenticateUser = async (email, password) => {
    const response = await fetch('https://auth-server-f8cr.onrender.com/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      return data.token; 
    } else {
      throw new Error('Authentication failed');
    }
  };
  