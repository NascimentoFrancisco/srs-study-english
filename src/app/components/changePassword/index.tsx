import "./style.css";
import { useState } from "react";
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

    const [passwordValid, setPasswordValid] = useState({
        eightCharacters: false,
        oneNumber: false,
        oneSpecialCharacter: false
    });
    
    const navigate = useNavigate();
    const { handleChangePassword } = useAuth();
    
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
        let condition = (passwordValid.eightCharacters && passwordValid.oneNumber && passwordValid.oneSpecialCharacter);
        if(!cliked && (passwordInput && !passwordError) && passwordConfirmInput && condition){
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

    const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordInput(value);
        
        let eightCharacters = passwordValid.eightCharacters; 
        let oneNumber = passwordValid.oneNumber;
        let oneSpecialCharacter = passwordValid.oneSpecialCharacter;
    
        eightCharacters =  value.length > 8 ? true : false;
        oneNumber =  /\d/.test(value) ? true : false;
        oneSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value) ? true : false;
          
        setPasswordValid({
            eightCharacters: eightCharacters,
            oneNumber: oneNumber,
            oneSpecialCharacter: oneSpecialCharacter
        });
    
        if (passwordConfirmInput && value != passwordConfirmInput){
            setPasswordError(true);
            setErrorMessagePassword("As senhas não coincidem.") 
        } else if (passwordConfirmInput && value === passwordConfirmInput){
            setPasswordError(false);
            setErrorMessagePassword("");
        }
    }

    return (
        <div className="container">
            <div className="header_auth">
                <h4>Alteração de senha</h4>
                <span>Digite sua senha abaixo</span>
            </div>
            <TextInput 
                label="Senha:"
                value={passwordInput}
                onChange={validatePassword}
                type="password"
                placeholder=""
                error={passwordError}
                errorMessage={passwordError ? errorMessagePassword : ""}
            />
            <div className="valid_password">
                <ul>
                    <li className={passwordValid.eightCharacters ? "valid" : "invalid"}>8 carcteres</li>
                    <li className={passwordValid.oneNumber ? "valid" : "invalid"}>Um número</li>
                    <li className={passwordValid.oneSpecialCharacter ? "valid" : "invalid"}>Um caractere especial: !@#$%^&*(),.?":{}|<></></li>
                </ul>
            </div>
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
