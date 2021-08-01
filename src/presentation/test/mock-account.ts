import { AccountModel } from "@/domain/models/account"
import { mockAccountModel } from "@/domain/test"
import { AddAccount, AddAccountParams } from "@/domain/usecases/account/add-account"
import { Authentication, AuthenticationParams } from "@/domain/usecases/account/authentication"
import { LoadAccountByToken } from "@/domain/usecases/account/load-account-by-token"

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
      async add(account: AddAccountParams): Promise<AccountModel | null> {
          return Promise.resolve(mockAccountModel())
      }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
      auth(authentication: AuthenticationParams): Promise<string | null> {
          return Promise.resolve('any_token')
      }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = ():LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByTokenStub()
}