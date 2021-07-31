import { LoginController } from "./login-controller";
import { Authentication, HttpRequest } from "./login-controller-protocols";
import { Validation } from "../signup/signup-controller-protocols";
import { MissingParamError } from "@/presentation/errors";
import { badRequest, ok, serverError, unauthorizedError } from "@/presentation/helpers/http/http-helper";
import { AuthenticationModel } from "@/domain/usecases/account/authentication";

const makeAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        auth(authentication: AuthenticationModel): Promise<string | null> {
            return new Promise(resolve => resolve('any_token'))
        }
    }
    return new AuthenticationStub()
}

const makeValidation = (): Validation => {
    class validationStub implements Validation {
        validate(input: any): Error | void {
            return
        }
    }
    return new validationStub()
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        email: 'any_email@email.com',
        password: 'any_password'
    }
})

type SutTypes = {
    sut: LoginController
    authenticationStub: Authentication
    validationStub: Validation
}

const makeSut = (): SutTypes => {
    const authenticationStub = makeAuthentication()
    const validationStub = makeValidation()
    const sut = new LoginController(authenticationStub, validationStub)
    return {
        sut,
        authenticationStub,
        validationStub
    }
}

describe('Login Controller', () => {
    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationStub } = makeSut()
        const authSpy = jest.spyOn(authenticationStub, 'auth')
        await sut.handle(makeFakeRequest())
        expect(authSpy).toHaveBeenCalledWith({
            email: 'any_email@email.com', 
            password: 'any_password'
        })
    })

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticationStub } = makeSut()
        jest
            .spyOn(authenticationStub, 'auth')
            .mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(unauthorizedError())
    })

    test('Should return 500 if Authenticantion throws', async () => {
        const { sut, authenticationStub } = makeSut()
        jest
            .spyOn(authenticationStub, 'auth')
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
    })

    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
})