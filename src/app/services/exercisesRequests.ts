import { ExerciseResponse } from "../@types/exercise/exercise"
import { RequestExercise } from "../@types/exercise/exerciseRequest";
import { api } from "./api"

export const createExercise = async (requestExercise: RequestExercise) => {
    return api<ExerciseResponse>({
        endpoint: '/exercises/', method: 'POST', withAuth: true, data: requestExercise
    });
}

export const getPendingExercises = async () => {
    return api<ExerciseResponse[]>({
        endpoint: '/pending-exercises/', method: 'GET', withAuth: true
    });
}
