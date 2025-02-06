import { ExerciseResponse } from "../exercise/exercise";
import { ChangePassword, LoginResponse } from "../user/auth";
import { User } from "../user/user";

export type ApiSuccessResponse = {
    data: LoginResponse | User | ChangePassword | ExerciseResponse | Array<ExerciseResponse> | {},
    status: number,
    endpoint: string
};
