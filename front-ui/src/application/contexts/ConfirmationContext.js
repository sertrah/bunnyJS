import React, { useState, createContext } from "react";
import { isNil } from "lodash";
import { ConfirmationModal } from "application/components";

const ConfirmationContext = createContext(null);

function ConfirmationProvider({ children }) {
  const [state, setState] = useState(null);

  const handleConfirm = () => {
    if (state && state.yes) {
      state.yes();
    }
    setState(null);
  };

  const handleCancel = () => {
    if (state && state.no) {
      state.no();
    }
    setState(null);
  };

  return (
    <>
      <ConfirmationContext.Provider value={setState}>
        {children}
      </ConfirmationContext.Provider>
      <ConfirmationModal
        isOpen={!isNil(state)}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        {...state}
      />
    </>
  );
}

export { ConfirmationContext, ConfirmationProvider };
