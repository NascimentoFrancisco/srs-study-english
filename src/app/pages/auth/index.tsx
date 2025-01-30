import './style.css';
import TextInput from "../../components/TextInput";
import { useState } from "react";
import { isValidEmail, isValidPassword } from "../../../validators/validators";
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordInput(value);

    if (type === 'create'){
      setPasswordError(!isValidPassword(value));
      setErrorMessagePassword("Senha inválida, pois é muito fraca.")
    }
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
    const conditionCreate = (!nameInput || !emailInput || !passwordInput || !passwordConfirmInput) || (nameError || emailError || passwordError)
    
    if(type === 'login' && (!emailInput || !passwordInput) || (emailError || passwordError)){
      setClicked(false);
      toast.info("Prenha todos os campos com dados válidos.", {position:'top-right'});
      return;
    }

    if(type === 'create' && conditionCreate){
      toast.info("Prenha todos os campos com dados válidos.", {position:'top-right'});
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
        toast.success("cadastro realizado com sucesso.", {position: 'top-right'});
      }
    } else {
      setClicked(false);
      toast.error(`${request}`, {position: 'top-right'});
    }
  }

  return (
      <main>
        <div className="container">
          
          <div className="header_auth">
            <h4> {type === 'login' ? "Enter na sua conta" : "Crie sua conta"}</h4>
            <span>Insira as informações necessárias</span>
          </div>
          
          { type === 'create' &&
            <TextInput 
              label="Nome:"
              value={nameInput}
              onChange={handleNameChange}
              type="text"
              placeholder="Digite seu nome..."
              error={nameError}
              errorMessage={nameError ? "Este campo é obrigatório" : ""}
            />
          }

          <TextInput 
            label="Email:"
            value={emailInput}
            onChange={handleEmailChange}
            type="email"
            placeholder="exemplo@exemplo.com"
            error={emailError}
            errorMessage={emailError ? "Email invĺido" : ""}
          />

          <TextInput 
            label="Senha:"
            value={passwordInput}
            onChange={handlePasswordChange}
            type="password"
            placeholder=""
            error={passwordError}
            errorMessage={passwordError ? errorMessagePassword : ""}
          />

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

          <div className='footer_auth'>
            { type === 'create' 
              ? <Link to="/login">Se já possi conta, clique aqui para entrar</Link>
              : <Link to="/create">Não possi conta? Clique aqui para crair uma</Link>
            }

          </div>
        </div>
      </main>
  );
}

export default Auth;
