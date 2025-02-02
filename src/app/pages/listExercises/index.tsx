import { useEffect, useState } from "react";
import "./style.css";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ExerciseResponse } from "../../@types/exercise/exercise";
import { exerciseHooks } from "../../hooks/exercise";
import { toast } from "react-toastify";
import Loading from "../../components/loading";
import IsEmpty from "../../components/isEmpty";
import { useAppDispatch } from "../../../redux/hooks";
import { setExerciseUse } from "../../../redux/slice/exerciseSlice";
import ModalConfirmation from "../../components/modalConfirmation";
import Button from "../../components/Button";


function ListExercises() {

    const dispatch = useAppDispatch();

    const [showTooltip, setShowTooltip] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [listExerciseUpdate, setListExerciseUpdate] = useState(false);
    const [allExercises, setAllExercises] = useState(Array<ExerciseResponse>);
    const [showModal, setShowModal] = useState(false);
    const [clickeModal, setClickeModal ] = useState(false);
    const [exerciseIdDel, setExerciseIdDel] = useState("");
    
    const navigate = useNavigate();
    const { handleGetAllExercisesByUser, handldeleteExercise } = exerciseHooks();

    const handleListExerciseUpdate = async() => {

        if(!listExerciseUpdate){
            const request = await handleGetAllExercisesByUser();
            if(Array.isArray(request) && request.every(isExerciseResponse)){
                setAllExercises(request);
                setLoadingRequest(false);
                setListExerciseUpdate(true);
            } else {
                toast.error(`${request}`, {position: 'top-right'});
                setLoadingRequest(false);
                setListExerciseUpdate(true);
            }

        }

    }

    function isExerciseResponse(item: any): item is ExerciseResponse {
        return (
            typeof item === "object" &&
            item !== null &&
            "id" in item &&
            "text" in item 
        );
    }

    const handleSelectExercise = (exercise: ExerciseResponse) => {
        dispatch(setExerciseUse(exercise));
        navigate("/exercises-edit");
    }

    const handleShowModal = (exerciseId: string) => {
        setShowModal(true)
        setExerciseIdDel(exerciseId);
    }

    const handleClosedModal = () => {
        if(clickeModal) return

        setClickeModal(false);
        setShowModal(!showModal)
    }

    const handleDeleteExercise = async () => {
        if(clickeModal) return
        setClickeModal(true);

        const request = await handldeleteExercise(exerciseIdDel);
        if(request === true){
            toast.success("Exercício excluído com sucesso!", {position: 'top-right'});
            setListExerciseUpdate(false);
            setAllExercises([]);
            setLoadingRequest(true);
            setClickeModal(false);
            setShowModal(false);
        } else {
            setClickeModal(false);
            toast.error(`${request}`, {position: 'top-right'});
        }
    }
    
    useEffect(() => {
        handleListExerciseUpdate();
    }), [listExerciseUpdate];

    return (
        <main>
            <ModalConfirmation 
                title="Confirmação de exclusão de exercíco."
                text="Você realmente deseja excluir o exercício selecionado."
                show={showModal}
                cliked={clickeModal}
                position='absolute'
                handleShow={handleClosedModal}
                action={handleDeleteExercise}
            />
            <div className="header_list_all_exercises">
                <h4>Todos os exercícos do usuário</h4>
                <Button children="Exercícios pendnetes" onClick={()=> navigate("/")}/>
            </div>

            {loadingRequest &&
                <Loading />
            }

            {!loadingRequest &&
            <>
                {allExercises.length > 0 
                ?   
                    <div className="container_list_all_exercises">
                        {allExercises.map((exercise, index) => (
                            <div className="exercise_of_list" key={index}>
                                <div className="values_exercise">
                                    <p><b>Texto em inglês: </b> {exercise.text}</p>
                                </div>
                                <div className="values_exercise">
                                    <p><b>Texto em português: </b>{exercise.translation}</p>
                                </div>
                                <div className="values_exercise">
                                    <p><b>Observações: </b>{exercise.observation ? exercise.observation : "Sem observações"}</p>
                                </div>
                                <div className="actions_of_exercise_of_list">
                                    <div 
                                        className='action_exercise_container' onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)} 
                                        onClick={() => handleSelectExercise(exercise)}
                                    >
                                        <MdEditSquare size={30} className="action_exercise_icon" />
                                        {showTooltip && <span className="action_tooltip">Editar exercício</span>}
                                    </div>
                                    <div 
                                        className='action_exercise_container' onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)} onClick={() => handleShowModal(exercise.id)}
                                    >
                                        <MdDeleteForever size={30} className="action_exercise_icon" />
                                        {showTooltip && <span className="action_tooltip">Excluir exercício</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> 
                :
                    <IsEmpty 
                        title='Sem Exercícios' 
                        subtitle='Clique no botão abaixo e cadastre seus exercícios.'
                        redirect={() => navigate("/exercises")}
                    />
                }
                
            </>
            }
        </main>
    );
}

export default ListExercises;
