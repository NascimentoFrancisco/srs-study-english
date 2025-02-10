import './style.css';
import TextInput from "../../components/TextInput";
import { useState } from "react";
import { isValidEmail} from "../../../validators/validators";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import CircularProgressIndicator from '../../components/circularProgressIndicator';
import { useAuth } from '../../hooks/auth';
import { useHook } from '../../hooks/user';
import { toast } from 'react-toastify';

type Props = {
    type: 'login' | 'create'
}

function Auth({type}: Props) {

  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const [passwordValid, setPasswordValid] = useState({
    eightCharacters: false,
    oneNumber: false,
    oneSpecialCharacter: false
  });

  const [cliked, setClicked] = useState(false);

  const { handleLogin } = useAuth();
  const { handleCreateUser } = useHook();

  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameInput(value);
    setNameError(value.length < 8);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailInput(value);
    setEmailError(!isValidEmail(value));
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

  const clearInputs = () => {
    setNameInput("");
    setEmailInput("");
    setPasswordInput("");
    setPasswordConfirmInput("");
  }

  const handleOnClik = async () => {
    setClicked(true)

    const conditionCreateInputs = (!nameInput || !emailInput || !passwordInput || !passwordConfirmInput);
    const conditionCreateErros = (nameError || emailError || passwordError);
    const conditionPasswordError = (!passwordValid.eightCharacters || !passwordValid.oneNumber || !passwordValid.oneSpecialCharacter);

    if(type === 'login' && (!emailInput || !passwordInput) || (emailError || passwordError)){
      setClicked(false);
      toast.info("Prencha todos os campos com dados válidos.", {position:'top-right'});
      return;
    }

    if(type === 'create' && (conditionCreateInputs || conditionCreateErros || conditionPasswordError)){
      toast.info("Prencha todos os campos com dados válidos.", {position:'top-right'});
      setClicked(false);
      return;

    }
  
    const request = await ( type === 'login' ? handleLogin(emailInput, passwordInput) : handleCreateUser(nameInput, emailInput, passwordInput));
    if (request === true){
      clearInputs();
      setClicked(false);
      navigate('/');
      if (type === 'login') {
        toast.success("Seja bem vindo!", {position:'top-right'})
      } else {
        toast.success("Cadastro realizado com sucesso.", {position: 'top-right'});
      }
    } else {
      setClicked(false);
      toast.error(`${request}`, {position: 'top-right'});
    }
  }

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordInput(value);

    if (type === 'create'){

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
        setErrorMessagePassword("") 
      }
    }
  }

  return (
      <main>
        <div className="container_auth">
          
          <div className="header_auth">
            <h4> {type === 'login' ? "Entrar na minha conta" : "Criar minha conta"}</h4>
            <span>Insira as informações necessárias</span>
          </div>
          
          { type === 'create' &&
            <TextInput 
              label="Nome completo:"
              value={nameInput}
              onChange={handleNameChange}
              type="text"
              placeholder="Digite seu nome completo..."
              error={nameError}
              errorMessage={nameError ? "Nome curto, por favor adicione o nome completo." : ""}
            />
          }

          <TextInput 
            label="Email:"
            value={emailInput}
            onChange={handleEmailChange}
            type="email"
            placeholder="exemplo@exemplo.com"
            error={emailError}
            errorMessage={emailError ? "Email inválido" : ""}
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

          { type === 'create' &&
            <div className="valid_password">
              <ul>
                <li className={passwordValid.eightCharacters ? "valid" : "invalid"}>8 carcteres</li>
                <li className={passwordValid.oneNumber ? "valid" : "invalid"}>Um número</li>
                <li className={passwordValid.oneSpecialCharacter ? "valid" : "invalid"}>Um caractere especial: !@#$%^&*(),.?":{}|<></></li>
              </ul>
            </div>
          }

          { type === 'create' &&
            <TextInput 
              label="Repita sua senha:"
              value={passwordConfirmInput}
              onChange={handlePasswordConfirmChange}
              type="password"
              placeholder=""
              error={passwordError}
              errorMessage={passwordError && passwordConfirmInput ? errorMessagePassword : ""}
            />
          }

          <Button onClick={handleOnClik}>
            {type === 'create' ? "Registrar-se" : "Entrar"}
            {cliked && <CircularProgressIndicator/>}
          </Button>
          
          { type == 'login' &&
            <div className="forgot_password">
              <Link to="/password-recovery">Esqueci minha senha.</Link>
            </div>
          }

          <div className='footer_auth'>   
            { type === 'create' 
              ? <Link to="/login">Se já possui conta, clique aqui para entrar.</Link>
              : <Link to="/create">Não possui conta? Clique aqui para criar uma.</Link>
            }

          </div>
        </div>
      </main>
  );
}

export default Auth;
