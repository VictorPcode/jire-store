import { createContext } from 'react';

// Definir el tipo de tus props/contexto según tus necesidades
type ContextProps = {
  name: string;
};

export const Context = createContext<ContextProps | undefined>(undefined);