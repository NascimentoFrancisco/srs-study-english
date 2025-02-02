import { useNavigate } from 'react-router-dom';
import Exercise from '../exercise';
import { ExerciseResponse } from "../../@types/exercise/exercise";
import './style.css';
import { IoMdAddCircle } from "react-icons/io";
import { FaListOl } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { exerciseHooks } from '../../hooks/exercise';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import IsEmpty from '../../components/isEmpty';

function Home(){

    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState(false);
    const [loadingRequest, SetLoadingRequest] = useState(true);
    const [updatedExercises, setUpdatedExercises] = useState(false);
    const [exercises, setExercises] = useState(Array<ExerciseResponse>);
    const { handleGetPendingExercises } = exerciseHooks();
    
    const handleExercises = async () => {

        if (!updatedExercises){
            const request = await handleGetPendingExercises();
            if(Array.isArray(request) && request.every(isExerciseResponse)){
                setExercises(request);
                console.log(exercises);
                SetLoadingRequest(false);
                setUpdatedExercises(true);
            } else {
                toast.error(`${request}`, {position: 'top-right'});
                SetLoadingRequest(false);
                setUpdatedExercises(true);
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

    const handleExercisesUpdate = () => {
        setUpdatedExercises(false);
        SetLoadingRequest(true);
        setExercises([]);
    }

    useEffect(() => { 
        handleExercises();
    }, [updatedExercises]);

    return (
        <main>
            <div className="header_home">
                <h3>Exercícios pendentes</h3>
            <div className="actions_header_home">
                <div 
                    className='add_icon_container' onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)} onClick={() => navigate("/exercises-list")}
                >
                    <FaListOl size={30} className="add_icon" />
                    {showTooltip && <span className="tooltip">listar todos os exercícios</span>}
                </div>

                <div 
                    className='add_icon_container' onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)} onClick={() => navigate("/exercises")}
                >
                    <IoMdAddCircle size={30} className="add_icon" />
                    {showTooltip && <span className="tooltip">Adicionar exercício</span>}
                </div>
            </div>
            </div>

            {loadingRequest &&
                <Loading />
            }

            {!loadingRequest &&
                <>
                    { exercises.length > 0 
                    ?
                        <div className="container_list_exercises">
                            {exercises.map((exercise, index) => (
                                    <Exercise 
                                        textToAadio={exercise.text} 
                                        exerciseId={exercise.id}
                                        haandleExercisesUpdate={handleExercisesUpdate} 
                                        key={index}
                                    />
                            ))}
                        </div>
                    :
                        <IsEmpty 
                            title='Sem Exercícios pendentes' 
                            subtitle='Clique no botão abaixo e cadastre novos exercícios.'
                            redirect={() => navigate("/exercises")}
                        />
                    }
                </>
            }
            
        </main>
    )
}

export default Home;
