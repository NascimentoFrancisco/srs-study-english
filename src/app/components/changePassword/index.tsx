import "./style.css";
import { useState } from "react";
import { isValidPassword } from "../../../validators/validators";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import CircularProgressIndicator from "../../components/circularProgressIndicator";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/auth';
import { toast } from "react-toastify";

function ChangePassword(){
    
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [cliked, setClicked] = useState(false);
    
    const navigate = useNavigate();
    const { handleChangePassword } = useAuth();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordInput(value);
    
        setPasswordError(!isValidPassword(value));
        setErrorMessagePassword("Senha inválida, pois é muito fraca.")
        
      };
    
    const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordConfirmInput(value);
        if (passwordInput !== value){
          setPasswordError(true);
          setErrorMessagePassword("As senhas não coincidem.")
        } else {
          setPasswordError(false);
        }
    };

    const handleOnClik = async () => {
        if(!cliked && (passwordInput && !passwordError) && passwordConfirmInput){
            setClicked(true);
            const request = await handleChangePassword(passwordInput, passwordConfirmInput);
            if(request === true){
                toast.success("Senha alterada com sucesso!", {position: 'top-right'});
                setClicked(false);
                navigate("/");
            } else {
                setClicked(false);
                toast.error(`${request}`, {position: 'top-right'});
            }
        }else{
            toast.info("Corrija os dados e tente novamente!", {position: 'top-right'})
        }
    }

    return (
        <div className="container">
            <div className="header_auth">
                <h4>Alteração de senha</h4>
                <span>Edite sua senha abaixo</span>
            </div>
            <TextInput 
                label="Senha:"
                value={passwordInput}
                onChange={handlePasswordChange}
                type="password"
                placeholder=""
                error={passwordError}
                errorMessage={passwordError ? errorMessagePassword : ""}
            />
            <TextInput 
                label="Repita sua senha:"
                value={passwordConfirmInput}
                onChange={handlePasswordConfirmChange}
                type="password"
                placeholder=""
                error={passwordError}
                errorMessage={passwordError && passwordConfirmInput ? errorMessagePassword : ""}
            />
            <div className="container_button">
                <Button onClick={handleOnClik} width="100%">
                    Salvar
                    {cliked && <CircularProgressIndicator/>}
                </Button>
            </div>

            <div className='footer_auth'>
                <Link to="/">Voltar para lista de exercícios</Link>
            </div>
        </div>
    );
}

export default ChangePassword;
