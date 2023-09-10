import { FC, ReactNode, createContext } from 'react';

export const InjectedStateContext = createContext({
  injected: false,
  metanit: false,
});

interface InjectedStateProviderProps {
  injected: boolean;
  metanit: boolean;
  children: ReactNode;
}

export const InjectedStateProvider: FC<InjectedStateProviderProps> = ({
  injected,
  metanit,
  children,
}) => (
  <InjectedStateContext.Provider value={{ injected, metanit }}>
    {children}
  </InjectedStateContext.Provider>
);
