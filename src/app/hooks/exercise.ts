import { createExercise, getPendingExercises } from "../services/exercisesRequests";
import { RequestExercise } from "../@types/exercise/exerciseRequest";


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

    return {
        handleCreateExercise,
        handleGetPendingExercises
    }
}
