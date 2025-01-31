import "./style.css"
import { useEffect, useState } from "react";
import { Exercise } from "../../@types/exercise/exercise";
import TextInput from "../../components/TextInput";
import CircularProgressIndicator from "../../components/circularProgressIndicator";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Props = {
    type: 'create' | 'edit'
    exercise?: Exercise,
}

function Exircises({type, exercise}: Props){

    const [textInput, setTextInput] = useState("");
    const [textError, setTextError] = useState(false);
    const [translationInput, setTranslationInput] = useState("");
    const [translationError, setTranslationError] = useState(false);
    const [observationInput, setObservationInput] = useState("");
    const [cliked, setClicked] = useState(false);

    const navigate = useNavigate();

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTextInput(value);
        setTextError(value.length < 8);
    };

    const handleTranslationtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTranslationInput(value);
        setTranslationError(value.length < 8);
    };

    const handleObservationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setObservationInput(value);
    };

    const handleOnClik = () => {
        setClicked(!cliked);

        if (type === 'create'){        
            const now = new Date();
            const brNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
            const formattedDate = brNow.toISOString().split("T")[0];

            const data = {
                text: textInput,
                translation: translationInput,
                difficulty: "very_difficult",
                audio_url: "",
                review_date: formattedDate,
                observation: observationInput  
            }

            console.log(data);
        } else {
            const data = {
                text: textInput,
                translation: translationInput,
                audio_url: "",
                observation: observationInput 
            }

            console.log(data);
        }

    }

    useEffect(() => {
        if(type === 'edit' && exercise){
            setTextInput(exercise.text);
            setTranslationInput(exercise.translation);
            setObservationInput(exercise.observation ? exercise.observation : "")
        }
        if(type === 'edit' && !exercise){
            navigate('/');
        }
    });

    return (
        <main>
            <div className="container">
                { type === 'create' 
                    ? 
                        <div className="header_auth">
                            <h4>Cadastro de exercício</h4>
                            <span>Insira as informações do novo exrcício abaixo</span>
                        </div>
                    :
                        <div className="header_auth">
                            <h4>Alteração de exercício</h4>
                            <span>Edite seu exercício inserindo as novas informações</span>
                        </div>
                }

                <TextInput 
                    label="Texto em inglês: *"
                    value={textInput}
                    onChange={handleTextChange}
                    type="text"
                    placeholder="Texto em inglês..."
                    error={textError}
                    errorMessage={textError ? "Este campo é obrigatório" : ""}
                />

                <TextInput 
                    label="Texto em português: *"
                    value={translationInput}
                    onChange={handleTranslationtChange}
                    type="text"
                    placeholder="Texto em português..."
                    error={translationError}
                    errorMessage={translationError ? "Este campo é obrigatório" : ""}
                />

                <TextInput
                    label="Observaçõs:"
                    value={observationInput}
                    onChange={handleObservationChange}
                    type="text"
                    placeholder="Oservações, caso tenha alguma..."
                    error={false}
                />

                <div className="container_button">
                    <Button onClick={handleOnClik} width="100%">
                        Salvar
                        {cliked && <CircularProgressIndicator/>}
                    </Button>
                </div>

                <div className='footer_exercise'>
                    <Link to="/">Voltar para lista de exercícios</Link>
                </div>
            </div>
        </main>
    );
}

export default Exircises;
