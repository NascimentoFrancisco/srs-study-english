import { useEffect, useState } from "react";
import "./style.css"
import { FiMenu } from "react-icons/fi";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import ModalConfirmation from "../../components/modalConfirmation";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const auth = useAppSelector(state => state.auth);
    const { handleLogout } = useAuth();
    
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {

        if(auth.authStatus === 'authenticated'){
            console.log(auth.authStatus);
            handleLogout();
            navigate("/login");
        } else {
            console.log(auth.authStatus);
            navigate("/login");
        }
        setShowModal(false);
    }

    const handleNavigateAccount = () => {
        if (auth.authStatus === 'authenticated'){
            navigate("/user")
        } else if(auth.authStatus === 'not_authenticated') {
            navigate("/create");
        } else{
            return
        }
    }

    useEffect(() => {

        const menu = document.getElementById("menu_mobile");
        if (menu) {
            if (menuOpen) {
                menu.style.display = "flex";
                menu.style.left = `${menu.offsetWidth * -1}px`;
                setTimeout(() => {
                    menu.style.opacity = "1";
                    menu.style.left = "0";
                }, 10);
            } else {
                menu.style.opacity = "0";
                menu.style.left = `${menu.offsetWidth * -1}px`;
                setTimeout(() => {
                    menu.removeAttribute("style");
                }, 300);
            }
        }
    }, [menuOpen]);

    return (
        <>
        <ModalConfirmation 
            title="Confirmação de logout"
            text="Você realmente deseja sair do sistema agora?"
            show={showModal}
            cliked={false}
            position = 'fixed'
            handleShow={ () => setShowModal(false)}
            action={handleNavigateToLogin}
        />
        <div id="menu_mobile">
            <div className="menu-mobile-logo">
                <img src="./new_logo.png" alt="logo"/>
            </div>
            { auth.authStatus === 'authenticated' 
            ?   
                <>
                    <a href="#">Minha conta</a>
                    <a onClick={ () => setShowModal(true)}>Sair</a>
                    <a href="#">Sobre</a>
                </>
            :
                <>
                    <a href="#">Cria conta</a>
                    <a onClick={handleNavigateToLogin}>Entrar</a>
                    <a href="#">Sobre</a>
                </>
            }
            <a href="#" id="closedMenu" onClick={() => setMenuOpen(false)}>X</a>
        </div>
        
        <header>
            <div className="header-logo">
                <img src="./new_logo.png" alt="logo" />
            </div>

            <div className="header-options">
                { auth.authStatus === 'authenticated' 
                ?   
                    <>
                        <a onClick={handleNavigateAccount}>Minha conta</a>
                        <a onClick={() => setShowModal(true)}>Sair</a>
                        <a href="#">Sobre</a>
                    </>
                :
                    <>
                        <a onClick={handleNavigateAccount}>Cria conta</a>
                        <a onClick={handleNavigateToLogin}>Entrar</a>
                        <a href="#">Sobre</a>
                    </>
                }
            </div>

            <div className="menu-button">
                <button id="openMenu" onClick={() => setMenuOpen(true)}>
                    <FiMenu size={34} color="#F7F8FD"/>
                </button>
            </div>
        </header>
    </>
    );
}

export default Header;
