import React, { useState } from "react";
import { SignedOutFlow } from './pages/SignedOutFlow';
import "./assets/css/App.css";
import { BodyContentContainer, GlobalStyle } from "./GlobalStyle";
import { SignedInFlow } from './pages/SignedInFlow';
import { useAuthContext, AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
          <Root />
    </AuthProvider>
  );
}

function Root() {
  const [navbarCollapsed, setNavbarCollapsed] = useState<boolean>(false);
  const auth = useAuthContext();
  const childProps = {
    navbarCollapsed,
    setNavbarCollapsed
  };

  return (
    <>
      <BodyContentContainer>
        {auth.isAuthenticated ? <SignedInFlow {...childProps} /> : <SignedOutFlow {...childProps} /> }
      </BodyContentContainer>
      <GlobalStyle />
    </>
  );
}

export default App;
