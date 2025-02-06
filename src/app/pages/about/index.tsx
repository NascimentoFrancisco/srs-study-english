import { useNavigate } from "react-router-dom";
import "./style.css";

function About(){

    const navigate = useNavigate();
    
    return (
        <main className="main_about">
            <h2>MemorizeEnglish</h2>

            <div className="content_about">
                <div className="about_app">
                    O MemorizeEnglish é uma aplicação que utiliza a técnica de repetição espaçada para potencializar o aprendizado da língua inglesa. O usuário pode cadastrar exercícios contendo textos em inglês, juntamente com informações adicionais. Posteriormente, ele recebe esses textos acompanhados de áudios, nos quais precisa transcrever o que ouviu.
                </div>
            </div>

            <div className="content_about">
                <div className="about_app">
                    Além disso, o aplicativo incentiva a prática da pronúncia ao solicitar que o usuário repita o texto três vezes. Dessa forma, o MemorizeEnglish promove um aprendizado mais eficiente e dinâmico, combinando leitura, escuta e fala para reforçar a memorização e fluência no idioma.
                </div>
            </div>

            <div className="finish_about">
                <div className="logo_about" onClick={() => navigate("/")}>
                    <img src="./logo_black.png" alt="logo" />
                </div>
                <div className="dev_app">
                    <small>@Copyright 2025 - 2025 Francisco-ADS</small>
                    <span><b>Desevolvido por:</b> <a href="https://www.linkedin.com/in/francisco-leite-nascimento/" target="_blank" >Francisco Leite</a></span>
                </div>
            </div>
        </main>
    );
}

export default About;
