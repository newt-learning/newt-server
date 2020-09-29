import React, { useReducer, useContext } from "react";

export default (reducer, actions, defaultState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  function useData() {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error("useData must be used within a Provider");
    }

    return context;
  }

  return { Context, Provider, useData };
};
