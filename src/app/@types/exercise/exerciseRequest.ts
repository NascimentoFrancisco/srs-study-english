export type RequestExercise = {
    text: string,
    translation: string,
    difficulty?: string,
    audio_url: string,
    review_date?: string,
    observation: string
}

export type RequestUpdateExercise = {
    text: string,
    translation: string,
    observation: string
}
