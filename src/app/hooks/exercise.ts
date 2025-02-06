import { createExercise, getPendingExercises, getAllExercisesByUser, updateExercise , updateLevelExercise, deleteExercise} from "../services/exercisesRequests";
import { RequestExercise, RequestUpdateExercise } from "../@types/exercise/exerciseRequest";
import { useAppDispatch } from "../../redux/hooks";
import { setAuthStatus, setAuthToken, setUser} from "../../redux/slice/authSlice";
import { ApiErrorResponse } from "../@types/errors/errorResponse";
import { ApiSuccessResponse } from "../@types/response/apiResponse";
import { ExerciseResponse } from "../@types/exercise/exercise";


export const exerciseHooks = () => {

    const dispatch = useAppDispatch();
    
    const handleNotAuthenticated = () => {
        dispatch(setAuthStatus('not_authenticated'));
        dispatch(setAuthToken(null));
        dispatch(setUser(null));
        localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN);
    }

    const handleCreateExercise = async (
        text: string, translation: string,
        audio_url: string, observation: string
    ) => {
        const exerciseRequest: RequestExercise = {
            text: text,
            translation: translation,
            audio_url: audio_url,
            observation: observation
        }

        const request = await createExercise(exerciseRequest);
        if (request.status === 201){
            return true;
        }

        if(request.status === 401){
            handleNotAuthenticated();
        }

        const response = request as ApiErrorResponse;
        return response.detail;
    }

    const handleGetPendingExercises = async () => {

        const request = await getPendingExercises();
        if (request.status === 200){
            let response = request as ApiSuccessResponse
            return response.data as Array<ExerciseResponse>;
        }

        if(request.status === 401){
            handleNotAuthenticated();
        }

        const response = request as ApiErrorResponse;
        return response.detail;
    }

    const handleGetAllExercisesByUser = async () => {

        const request = await getAllExercisesByUser();
        if (request.status === 200){
            let data = request as ApiSuccessResponse
            return data.data as Array<ExerciseResponse>;
        }

        if(request.status && request.status === 401){
            handleNotAuthenticated();
        }
    
        const response = request as ApiErrorResponse;
        return response.detail;
    }

    const handleUpdateExercise = async (
        exerciseId: string, text: string, translation: string, observation: string
    ) => {
        const requestUpdateExercise: RequestUpdateExercise = {
            text: text,
            translation: translation,
            observation: observation
        }

        const request = await updateExercise(exerciseId, requestUpdateExercise);
        if (request.status === 200){
            return true;
        }

        if(request.status === 401){
            handleNotAuthenticated();
        }

        const response = request as ApiErrorResponse;
        return response.detail;

    }

    const handleUpdateLevelExercise = async (exerciseId: string, difficulty: string) => {
        const request = await updateLevelExercise(exerciseId, difficulty);
        if (request.status === 200){
            return true;
        }

        if(request.status === 401){
            handleNotAuthenticated();
        }

        const response = request as ApiErrorResponse;
        return response.detail;
    }

    const handldeleteExercise = async (exerciseId: string) => {
        const request = await deleteExercise(exerciseId);
        if (request.status === 204){
            return true;
        }

        if(request.status === 401){
            handleNotAuthenticated();
        }
        
        const response = request as ApiErrorResponse;
        return response.detail;
    }

    return {
        handleCreateExercise,
        handleGetPendingExercises,
        handleGetAllExercisesByUser,
        handleUpdateExercise,
        handleUpdateLevelExercise,
        handldeleteExercise
    }
}
