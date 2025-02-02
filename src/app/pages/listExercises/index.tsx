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


function ListExercises() {

    const dispatch = useAppDispatch();

    const [showTooltip, setShowTooltip] = useState(false);
    const [loadingRequest, SetLoadingRequest] = useState(false);
    const [listExerciseUpdate, setListExerciseUpdate] = useState(false);
    const [allExercises, setAllExercises] = useState(Array<ExerciseResponse>);
    
    const navigate = useNavigate();
    const { handleGetAllExercisesByUser } = exerciseHooks();

    const handleListExerciseUpdate = async() => {

        if(!listExerciseUpdate){
            const request = await handleGetAllExercisesByUser();
            if(Array.isArray(request) && request.every(isExerciseResponse)){
                setAllExercises(request);
                console.log(allExercises);
                SetLoadingRequest(false);
                setListExerciseUpdate(true);
            } else {
                toast.error(`${request}`, {position: 'top-right'});
                SetLoadingRequest(false);
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
    
    useEffect(() => {
        handleListExerciseUpdate();
    }), [listExerciseUpdate];

    return (
        <main>
            <div className="header_list_all_exercises">
                <h4>Todos os exercícos do usuário</h4>
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
                                    <b>Texto em inglês:</b>
                                    <p>{exercise.text}</p>
                                </div>
                                <div className="values_exercise">
                                    <b>Texto em português:</b>
                                    <p>{exercise.translation}</p>
                                </div>
                                <div className="values_exercise">
                                    <b>Observações:</b>
                                    <p>{exercise.observation ? exercise.observation : "Sem observações"}</p>
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
                                        onMouseLeave={() => setShowTooltip(false)} onClick={() => navigate("/exercises")}
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
