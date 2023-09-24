import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState(null);

  // useEffect(() => console.log("user", user), [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
