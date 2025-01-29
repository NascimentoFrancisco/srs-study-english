
type ErrorContext = {
    reason: string;
    [key: string]: any;
};

type ApiErrorDetail = {
    type: string;
    loc: string[];
    msg: string;
    input?: string;
    ctx?: ErrorContext;
};

export type ApiErrorResponse = {
    detail: ApiErrorDetail[];
};
