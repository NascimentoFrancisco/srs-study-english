export type ExerciseResponse = {
    id: string,
    user_id: string,
    text: string,
    translation: string,
    difficulty: string,
    audio_url?: string,
    review_date: Date,
    observation?: string
}