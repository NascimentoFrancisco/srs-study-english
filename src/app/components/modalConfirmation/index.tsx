import CircularProgressIndicator from "../circularProgressIndicator";
import "./style.css";
import { GoAlertFill } from "react-icons/go";


type Props = {
    show: boolean,
    title: string,
    text: string,
    cliked: boolean,
    action: () => void,
    handleShow: () => void,
}

function ModalConfirmation({show, title, text, cliked, action, handleShow}: Props) {
    
    return (
        <div className="modal" style={{ display: show ? 'flex' : 'none'}}>
            <div className="container_modal">
                <div className="icon_modal">
                    <GoAlertFill size={34}/>
                </div>
                <div className="container_header_modal">
                    <h4>{title}</h4>
                    <p>{text}</p>
                </div>

                <div className="actions_modal">
                    <button className="cancel_modal" onClick={handleShow}>
                        Cancelar
                    </button>
                    <button className="confirm_modal" onClick={action}>
                        Confirmar
                        {cliked && <CircularProgressIndicator/>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmation;
