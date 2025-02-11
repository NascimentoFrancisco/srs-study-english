import { useState } from "react";
import "./style.css";
import { isValidEmail } from "../../../validators/validators";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import CircularProgressIndicator from "../../components/circularProgressIndicator";
import { useAuth } from "../../hooks/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function PasswordRecovery(){

    const [emailRequest, setEmailRequest] = useState(true);

    const [emailInput, setEmailInput] = useState("");
    const [emailError, setEmailError] = useState(false);
    
    const [cliked, setClicked] = useState(false);

    const [tokenInput, setTokenInput] = useState("");
    const [tokenError, setTokenError] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [passwordValid, setPasswordValid] = useState({
        eightCharacters: false,
        oneNumber: false,
        oneSpecialCharacter: false
    });

    const { handleRequestPasswordReset, handlePasswordReset } = useAuth();
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailInput(value);
        setEmailError(!isValidEmail(value));
    };

    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTokenInput(value);
        setTokenError(value.length < 8);
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

    const handleOnClikRequest = async () =>{
        if (!cliked && !emailError && emailInput){
            setClicked(true);
            const request = await handleRequestPasswordReset(emailInput)

            if (request === true){
                setEmailRequest(true);
                setClicked(false);
                toast.success("Token enviado no email.", {position: 'top-right'});
            }else{
                setClicked(false);
                toast.error(`${request}`, {position: 'top-right'})
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

    const handleOnClikResetPassword = async () => {
        let condition = (passwordValid.eightCharacters && passwordValid.oneNumber && passwordValid.oneSpecialCharacter);
        if(!cliked && (passwordInput && !passwordError) && passwordConfirmInput && tokenInput && condition){
            setClicked(true);
            const request = await handlePasswordReset(tokenInput, passwordInput, passwordConfirmInput);
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
        <main className="main_password_recovery">
            <div className="container_password_recovery">
                <div className="header_password_recovery">
                    <h4>Recuperação de senha</h4>
                    {  emailRequest === false
                    ?
                        <span>Insira seu email abaixo para enviarmos um token de validação para redefinição de sua senha.</span>
                    : 
                        <span>Insira o token que foi enviado no seu email sua nova senha</span>
                    }
                </div>
                
                { !emailRequest  &&
                    <>
                    <TextInput 
                        label="Email:"
                        value={emailInput}
                        onChange={handleEmailChange}
                        type="email"
                        placeholder="exemplo@exemplo.com"
                        error={emailError}
                        errorMessage={emailError ? "Email invĺido" : ""}
                    />

                    <div className="action_password_recovery">
                        <Button onClick={handleOnClikRequest} width="140px">
                            {"Enviar"}
                            {cliked && <CircularProgressIndicator/>}
                        </Button>
                    </div>
                    </>
                }

                { emailRequest  &&
                    <>
                    <TextInput 
                        label="Token:"
                        value={tokenInput}
                        onChange={handleTokenChange}
                        type="text"
                        placeholder="Insira o token..."
                        error={tokenError}
                        errorMessage={tokenError ? "Este campo é obrigatório" : ""}
                    />
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
                    <div className="action_password_recovery">
                        <Button onClick={handleOnClikResetPassword} width="140px">
                            Salvar
                            {cliked && <CircularProgressIndicator/>}
                        </Button>
                    </div>
                    </>
                }
                <div className="foother_password_recovery">
                    <Link to="/">Voltar para o início</Link>
                </div>
            </div>
        </main>
    )
}

export default PasswordRecovery;
