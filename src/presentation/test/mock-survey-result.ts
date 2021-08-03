import { SurveyResultModel } from "@/domain/models/survey-result"
import { mockSurveyResultModel } from "@/domain/test"
import { SaveSurveyResult, SaveSurveyResultParams } from "@/domain/usecases/survey-result/save-survey-result"

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    save(data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SaveSurveyResultStub()
}