import { ExerciseResponse } from "../@types/exercise/exercise"
import { RequestExercise, RequestUpdateExercise } from "../@types/exercise/exerciseRequest";
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

export const getAllExercisesByUser = async () => {
    return api<ExerciseResponse[]>({
        endpoint: '/exercises/', method: 'GET', withAuth: true
    });
}

export const updateExercise = async (exerciseId: string, requestUpdateExercise: RequestUpdateExercise) => {
    return api<ExerciseResponse>({
        endpoint: `/exercises/${exerciseId}/`, method: 'PATCH',
        withAuth: true,data: requestUpdateExercise
    });
}

export const updateLevelExercise = async (exerciseId: string, difficulty: string) => {
    return api<ExerciseResponse>({
        endpoint: `/exercises/${exerciseId}/`, method: 'PUT',
        withAuth: true,data: { difficulty }
    });
}

export const deleteExercise = async (exerciseId: string) => {
    return api<{}>({
        endpoint: `/exercises/${exerciseId}/`, method: 'DELETE', withAuth: true
    });
}
