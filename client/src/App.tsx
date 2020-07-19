import React from "react";
import { ToastProvider } from "react-toast-notifications";
// Pages
import { LandingPage } from "./pages";

function App() {
  return (
    <ToastProvider autoDismiss={true} placement="bottom-center">
      <LandingPage />
    </ToastProvider>
  );
}

export default App;
