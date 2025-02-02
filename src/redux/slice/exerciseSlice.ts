import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseResponse } from "../../app/@types/exercise/exercise";

interface ExerciseUseState {
    exerciseUseState: ExerciseResponse | null
}

const initialState: ExerciseUseState = {
    exerciseUseState: null
}

export const exerciseUseSlice = createSlice({
    name: 'exerciseUse',
    initialState,
    reducers: {
        setExerciseUse: (state, action: PayloadAction<ExerciseUseState['exerciseUseState']>) => {
            state.exerciseUseState = action.payload;
        },
    }
});

export const { setExerciseUse } = exerciseUseSlice.actions;
export default exerciseUseSlice.reducer;
