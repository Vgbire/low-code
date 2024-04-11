import React, { ReactNode, useEffect, useState } from 'react';

const CommonContext = React.createContext<
  | {
      user: any;
      saveUser: (value: any) => void;
    }
  | undefined
>(undefined);

CommonContext.displayName = 'CommonContext';

export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(undefined);
  const saveUser = (value: any) => {
    setUser(value);
  };

  return (
    <CommonContext.Provider value={{ user, saveUser }}>
      {children}
    </CommonContext.Provider>
  );
};

export const useCommon = () => {
  const context = React.useContext(CommonContext);

  if (!context) {
    throw new Error('useCommon必须在AppProvider中使用');
  }

  return context;
};
