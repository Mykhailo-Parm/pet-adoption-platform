import { createContext, useContext, useState } from 'react';
import { DEMO_USERS } from '../constants/demoUsers';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(DEMO_USERS[0].role);
  const currentUser = DEMO_USERS.find((u) => u.role === currentRole) ?? DEMO_USERS[0];

  return (
    <UserContext.Provider value={{ currentUser, setCurrentRole, users: DEMO_USERS }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
