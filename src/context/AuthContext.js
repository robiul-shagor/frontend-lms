import api from "@/lib/api";
import axios from "axios";

const { createContext, useContext, useEffect, useState } = require("react");

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await api.get(`/api/users/user`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUser(res.data);
      } else {
        setUser(null);
      }
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
