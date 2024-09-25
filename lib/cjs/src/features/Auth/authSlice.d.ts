interface User {
    username: string;
    password: string;
}
interface AuthState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
export declare const login: import("@reduxjs/toolkit").AsyncThunk<User, User, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const authSlice: import("@reduxjs/toolkit").Slice<AuthState, {}, "auth", "auth", import("@reduxjs/toolkit").SliceSelectors<AuthState>>;
declare const _default: import("redux").Reducer<AuthState, import("redux").UnknownAction, AuthState>;
export default _default;
