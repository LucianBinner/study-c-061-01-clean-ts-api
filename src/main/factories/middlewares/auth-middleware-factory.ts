import { makeDbLoadAccountByToken } from "../usecases/account/load-account-by-token/db-load-account-by-token-factory";
import { AuthMiddleware } from "@/presentation/middlewares/auth-middleware";
import { MiddleWare } from "@/presentation/protocols";

export const makeAuthMiddleware = (role?: string): MiddleWare => {
    return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}