import { ExerciseResponse } from "../exercise/exercise";
import { ChangePassword, LoginResponse, RequestResetPassword } from "../user/auth";
import { User } from "../user/user";

export type ApiSuccessResponse = {
    data: LoginResponse | User | ChangePassword | ExerciseResponse | Array<ExerciseResponse> | RequestResetPassword | {},
    status: number,
    endpoint: string
};
