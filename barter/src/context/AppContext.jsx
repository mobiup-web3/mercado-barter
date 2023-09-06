import { createContext, useContext } from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const globalState = {
    username: 'User 01',
  };

  return (
    <AppContext.Provider value={globalState}>
      {children}
    </AppContext.Provider>
  );
};

// Adicione a validação de tipo para a propriedade children
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useApp = () => useContext(AppContext);
