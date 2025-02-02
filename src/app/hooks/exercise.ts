import { createExercise, getPendingExercises, getAllExercisesByUser, updateExercise , updateLevelExercise, deleteExercise} from "../services/exercisesRequests";
import { RequestExercise, RequestUpdateExercise } from "../@types/exercise/exerciseRequest";


export const exerciseHooks = () => {

    const handleCreateExercise = async (
        text: string, translation: string,
        audio_url: string, observation: string
    ) => {
        const now = new Date();
        const dateOnly = now.toISOString().split("T")[0]

        const exerciseRequest: RequestExercise = {
            text: text,
            translation: translation,
            difficulty: "very_difficult",
            audio_url: audio_url,
            review_date: dateOnly,
            observation: observation
        }

        const request = await createExercise(exerciseRequest);
        if (request.data){
            console.log(request.data);
            return true;
        }
        return request.messages
    }

    const handleGetPendingExercises = async () => {

        const request = await getPendingExercises();
        if (request.data){
            //console.log(request.data);
            return request.data;
        }
        return request.messages
    }

    const handleGetAllExercisesByUser = async () => {

        const request = await getAllExercisesByUser();
        if (request.data){
            //console.log(request.data);
            return request.data;
        }
        return request.messages
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
        if (request.data){
            console.log(request.data);
            return true;
        }
        return request.messages

    }

    const handleUpdateLevelExercise = async (exerciseId: string, difficulty: string) => {
        const request = await updateLevelExercise(exerciseId, difficulty);
        if (request.data){
            return true;
        }
        return request.messages
    }

    const handldeleteExercise = async (exerciseId: string) => {
        const request = await deleteExercise(exerciseId);
        if (request.data){
            return true;
        }
        return request.messages
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
