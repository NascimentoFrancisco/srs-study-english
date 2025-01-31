import { HashLoader } from "react-spinners";

function Loading(){

    return (
        <div className="contailer_loading">
            <HashLoader color="#473FCE" />
            <span className="label_container">Por favor aguarde...</span>
        </div>
    );
}

export default Loading;
