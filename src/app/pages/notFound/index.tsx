import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./style.css";
import { TbError404 } from "react-icons/tb";

function NotFound(){
    const navigate = useNavigate();

    return (
        <main className="main_not_fount">
            <div className="container_not_found">
                <TbError404  size={100}/>
                
                <div className="title_not_found">
                    <h4>Ops, página não encontrada :(</h4>
                </div>

                <Button 
                    children="Voltar ao início"
                    onClick={() => navigate("/")}
                />
            </div>
        </main>
    );
}

export default NotFound;
