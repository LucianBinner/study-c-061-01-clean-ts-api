import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols';
import { DbAddSurvey } from './db-add-survey'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyModel): Promise<void> {
      return
    }
  }
  return new AddSurveyRepositoryStub()
}

interface SutTypes {
  sut: DbAddSurvey,
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const fakeSurveyData = makeFakeSurveyData()
    await sut.add(fakeSurveyData)
    expect(addSpy).toHaveBeenCalledWith(fakeSurveyData)
  })

  test('Should throw if Hasher throws', async () => {
      const { sut, addSurveyRepositoryStub } = makeSut()
      jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(new Promise(
          (_, reject) =>
              reject(new Error())
      ))
      const promise = sut.add(makeFakeSurveyData())
      await expect(promise).rejects.toThrow()
  })
})