declare global {
    namespace Express {
        interface AuthInfo {}

        interface User extends Account {}

        interface Request {
            authInfo?: AuthInfo | undefined;
            user?: User | undefined;
        }
    }
}