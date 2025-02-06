import { RequestExercise, RequestUpdateExercise } from "../@types/exercise/exerciseRequest";
import { api } from "./api"

export const createExercise = async (requestExercise: RequestExercise) => {
    return api({
        endpoint: '/exercises/', method: 'POST', withAuth: true, data: requestExercise
    });
}

export const getPendingExercises = async () => {
    return api({
        endpoint: '/exercises/pending/', method: 'GET', withAuth: true
    });
}

export const getAllExercisesByUser = async () => {
    return api({
        endpoint: '/exercises/', method: 'GET', withAuth: true
    });
}

export const updateExercise = async (exerciseId: string, requestUpdateExercise: RequestUpdateExercise) => {
    return api({
        endpoint: `/exercises/${exerciseId}/`, method: 'PUT',
        withAuth: true,data: requestUpdateExercise
    });
}

export const updateLevelExercise = async (exerciseId: string, difficulty: string) => {
    return api({
        endpoint: `/exercises/update-difficult/${exerciseId}/`, method: 'PUT',
        withAuth: true,data: { difficulty }
    });
}

export const deleteExercise = async (exerciseId: string) => {
    return api({
        endpoint: `/exercises/${exerciseId}/`, method: 'DELETE', withAuth: true
    });
}
