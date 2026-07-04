import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const RegistrationContext = createContext(null);

/**
 * Global registration modal state. Any component can call `openRegistration()`
 * (optionally passing a program name to pre-select) to launch the modal —
 * this is what wires up every "Register" / "Enter orbit" / "Deploy" button
 * across the site to one real, functional registration flow.
 */
export function RegistrationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetProgram, setPresetProgram] = useState('');

  const openRegistration = useCallback((program = '') => {
    setPresetProgram(program);
    setIsOpen(true);
  }, []);

  const closeRegistration = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, presetProgram, openRegistration, closeRegistration }),
    [isOpen, presetProgram, openRegistration, closeRegistration]
  );

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>;
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return ctx;
}
