import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[error,setError]=useState("");

  useEffect(() => {
    // Check local storage for user data on component mount
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Clear user data from state and local storage
    setUser(null);
    localStorage.removeItem('user');
  };

  const signin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8082/api/User/register', formData);
      if (response.status === 200) {
        login(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Email already exists");
      } else {
        setError("An error occurred during sign-in");
        console.log(err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,signin,error,setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};