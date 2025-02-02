import { IoMdAddCircle } from "react-icons/io";
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string,
    subtitle: string,
    redirect?: () => void,
}

function IsEmpty({title, subtitle, redirect}: Props){

    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="container_isEmpty">
            <div className="header">
                <h4>{ title }</h4>
                <p>{ subtitle }</p>
            </div>
            { redirect && 
                <div className="add_new">
                    <div 
                        className='add_icon_container' onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)} onClick={() => navigate("/exercises")}
                    >
                        <IoMdAddCircle size={50} className="add_icon" />
                        {showTooltip && <span className="tooltip">Criar exercício</span>}
                    </div>
                </div>
            }
        </div>
    );
}

export default IsEmpty;
