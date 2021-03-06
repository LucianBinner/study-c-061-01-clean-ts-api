import { SurveyResultModel } from "@/domain/models/survey-result"
import { mockSurveyResultModel } from "@/domain/test"
import { SaveSurveyResultParams } from "@/domain/usecases/survey-result/save-survey-result"
import { LoadSurveyResultRepository } from "../protocols/db/survey-result/load-survey-result-repository"
import { SaveSurveyResultRepository } from "../protocols/db/survey-result/save-survey-result-repository"

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultParams): Promise<void> {
      return 
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId(surveyId: string): Promise<SurveyResultModel | null> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}