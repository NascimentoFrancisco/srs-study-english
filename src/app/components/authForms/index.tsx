import "./style.css";
import { useState } from "react";
import { isValidEmail } from "../../../validators/validators";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import CircularProgressIndicator from "../../components/circularProgressIndicator";
import { Link } from "react-router-dom";

function AuthForm(){

    const [nameInput, setNameInput] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [cliked, setClicked] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameInput(value);
        setNameError(value.length < 8);
    };
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailInput(value);
        setEmailError(!isValidEmail(value));
    }

    const handleOnClik = () => {
        setClicked(!cliked);
    }

    return (
        <div className="container">
            <div className="header_auth">
                <h4>Dados do usuário</h4>
                <span>Edite seus dados abaixo, se prciso</span>
            </div>
            <TextInput 
                label="Nome:"
                value={nameInput}
                onChange={handleNameChange}
                type="text"
                placeholder="Digite seu nome..."
                error={nameError}
                errorMessage={nameError ? "Este campo é obrigatório" : ""}
            />

            <TextInput 
                label="Email:"
                value={emailInput}
                onChange={handleEmailChange}
                type="email"
                placeholder="exemplo@exemplo.com"
                error={emailError}
                errorMessage={emailError ? "Email invĺido" : ""}
            />
            <div className="container_button">
                <Button onClick={handleOnClik} width="100%">
                    Salvar
                    {cliked && <CircularProgressIndicator/>}
                </Button>
            </div>

            <div className='footer_auth'>
                <Link to="/change-password">Editar senha</Link>
            </div>
        </div>
    );
}

export default AuthForm;
