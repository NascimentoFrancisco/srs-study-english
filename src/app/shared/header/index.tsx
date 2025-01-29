import { useEffect, useState } from "react";
import "./style.css"
import { FiMenu } from "react-icons/fi";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

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
        <div id="menu_mobile">
            <div className="menu-mobile-logo">
                <img src="./new_logo.png" alt="logo"/>
            </div>

            <a href="#">Minha conta</a>
            <a href="#">Sair</a>
            <a href="#">Sobre</a>
            <a href="#" id="closedMenu" onClick={() => setMenuOpen(false)}>X</a>
        </div>
        
        <header>
            <div className="header-logo">
                <img src="./new_logo.png" alt="logo" />
            </div>

            <div className="header-options">
                <a href="#">Minha conta</a>
                <a href="#">Sair</a>
                <a href="#">Sobre</a>
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
