import { SurveyResultModel } from "@/domain/models/survey-result"
import { mockSurveyResultModel } from "@/domain/test"
import { LoadSurveyResult } from "@/domain/usecases/survey-result/load-survey-result"
import { SaveSurveyResult, SaveSurveyResultParams } from "@/domain/usecases/survey-result/save-survey-result"

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    save(data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SaveSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load(surveyId: string): Promise<SurveyResultModel | null> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultStub()
}