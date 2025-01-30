import Header from "./app/shared/header"
import './App.css';
import MainRouters from "./app/routers/mainRouters";
import { ToastContainer } from "react-toastify";

function App() {
  

  return (
    <>
      <ToastContainer />
      <Header />
      <MainRouters />
    </>
  );
}

export default App
