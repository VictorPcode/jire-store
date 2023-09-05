import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Context } from './components/Context';

const container = document.getElementById('root');
const root = createRoot(container!);

const ContextProps = {
 name:'Victor Perozo'
};

root.render(
  <Context.Provider value={ContextProps}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Context.Provider>
);