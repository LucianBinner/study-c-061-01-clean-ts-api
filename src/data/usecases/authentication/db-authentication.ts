import { Authentication, AuthenticationModel } from "../../../domain/usecases/authentication";
import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { TokenGenerator } from "../../protocols/criptography/token-generator";
import { UpdateAccessTokenRepository } from "../../protocols/criptography/update-access-token-repository";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-by-email-repository";

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly hashComparer: HashComparer
    private readonly tokenGenerator: TokenGenerator
    private readonly updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
    constructor (
        loadAccountByEmailRepository: LoadAccountByEmailRepository, 
        hashComparer: HashComparer,
        tokenGenerator: TokenGenerator,
        updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
    ) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
        this.hashComparer = hashComparer
        this.tokenGenerator = tokenGenerator
        this.updateAccessTokenRepositoryStub = updateAccessTokenRepositoryStub
    }
    async auth(authentication: AuthenticationModel): Promise<string | null> {
        const account = await this.loadAccountByEmailRepository.load(authentication.email)
        if(account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password)
            if(isValid) {
                const accessToken = await this.tokenGenerator.generate(account.id)
                await this.updateAccessTokenRepositoryStub.update(account.id, accessToken)
                return accessToken
            }
        }
        return new Promise(resolve => resolve(null))
    }
}