import { badRequest, ok, serverError, unauthorizedError } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation, Authentication } from "./login-controller-protocols";

export class LoginController implements Controller {
    private readonly authentication: Authentication
    private readonly validation: Validation
    constructor(authentication: Authentication, validation: Validation) {
        this.authentication = authentication
        this.validation = validation
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { email, password } = httpRequest.body
            const accessToken = await this.authentication.auth({ email, password })
            if (!accessToken) {
                return unauthorizedError()
            }
            return ok({ accessToken })
        } catch (error) {
            return serverError(error)
        }
    }
}