import "./style.css";
import { useState } from "react";
import { isValidEmail } from "../../../validators/validators";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import CircularProgressIndicator from "../../components/circularProgressIndicator";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useHook } from "../../hooks/user";
import { toast } from "react-toastify";
import ModalConfirmation from "../modalConfirmation";


function AuthForm(){

    const auth = useAppSelector(state => state.auth);
    const { handleUpdateUser, handleDeleteUser } = useHook();
    const navigate = useNavigate();
        
    const [nameInput, setNameInput] = useState(auth.user?.name as string);
    const [nameError, setNameError] = useState(false);
    const [emailInput, setEmailInput] = useState(auth.user?.email as string);
    const [emailError, setEmailError] = useState(false);
    const [cliked, setClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [clikedModal, setClikedModal] = useState(false);

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

    const handleDeleteUserLogged = async () => {
        setClikedModal(true);
        const request = await handleDeleteUser();
        if (request === true){
            toast.success("Conta excluída com sucess!.. :(", {position: 'top-right'});
            setClikedModal(true);
            setShowModal(false);
        } else {
            setClikedModal(true);
            setShowModal(false);
            toast.error(`${request}`, {position: 'top-right'});
        }
        
    }

    const handleShowModal = () => {
        if(!clikedModal){
            setShowModal(false);
        }
    }

    const handleOnClik = async () => {
        if (!cliked && (nameInput && !nameError) && (emailInput && !emailError)){
            setClicked(true);
            const request = await handleUpdateUser(nameInput, emailInput);
            if(request === true){
                toast.success("Dados alterados com sucesso!", {position: 'top-right'});
                setClicked(false);
                navigate("/");
            } else {
                setClicked(false);
                toast.error(`${request}`, {position: 'top-right'});
            }
        } else {
            toast.info("Corrija os dados e tente novamente!", {position: 'top-right'})
            console.log("Aguarde..");
        }
    }

    return (
        <>
        <ModalConfirmation 
            title="Confirmação de exclusão de conta"
            text="Você tem certeza que deseja excluir sua conta?"
            show={showModal}
            cliked={clikedModal}
            position = 'absolute'
            handleShow={handleShowModal}
            action={handleDeleteUserLogged}
        />
        <div className="container">
            <div className="header_auth">
                <h4>Dados do usuário</h4>
                <span>Edite suas informações abaixo</span>
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

            <div className="delete_user">
                <button className="btn_delete_user" onClick={() => setShowModal(true)}>
                    Excluir conta
                </button>
            </div>
        </div>
        </>
    );
}

export default AuthForm;
