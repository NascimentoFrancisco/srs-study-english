import Header from "./app/shared/header"
import './App.css';
import MainRouters from "./app/routers/mainRouters";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAuth } from "./app/hooks/auth";

function App() {

  const { handleAuthenticateUser } = useAuth();
  
  useEffect(() => {
    handleAuthenticateUser();
  });

  return (
    <>
      <ToastContainer />
      <Header />
      <MainRouters />
    </>
  );
}

export default App
