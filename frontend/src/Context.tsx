import { useEffect, useState, createContext } from "react";
import { AxiosResponse } from "axios";
import api from './services/api';

export const myContext: any = createContext({});

export default function Context({ children }: any) {
  const [userObject, setUserObject] = useState<any>();

  useEffect(() => {
    api
      .get("/getuser", { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.data) {
          setUserObject(res.data);
          console.log("data", res.data);
        }
      })
      .catch((e) => console.log("Catch", e))
      .finally(function () {
        console.log("finally");
      });
  }, []);
  return <myContext.Provider value={userObject}>{children}</myContext.Provider>;
}
