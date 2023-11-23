import { useEffect, useState } from "react";
import { AuthContext } from "./Authcontext";
import { UsersProps } from "../../../types/index";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UsersProps | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("authEmail");
      const alias = localStorage.getItem("authAlias");
      if (alias && token && email) {
        const data = await api.validateToken(alias, email, token);
        if (data && data.token) {
          setUser(data);
        }
      }
    };

    validateToken();
  }, []);

  const signin = async (alias: string, email: string, jtiToken: string) => {
    const data = await api.signin(alias, email, jtiToken);
    
    if (data.id && data.token) {
      setUser(data);
      setLocalStorage(data);
      return true;
    }
    return false;
  };
  const signout = async () => {
    let name = user?.alias ? user?.alias : "";
    let email = user?.mail ? user?.mail : "";
    await api.logout(name, email);
    setUser(null);
    localStorage.clear();
  };

  const setLocalStorage = (user: UsersProps) => {
    localStorage.setItem("authToken", user.token);
    localStorage.setItem("authEmail", user.mail);
    localStorage.setItem("authAlias", user.alias);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
