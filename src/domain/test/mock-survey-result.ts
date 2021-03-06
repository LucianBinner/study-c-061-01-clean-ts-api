import { SaveSurveyResultParams, SurveyResultModel } from "@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols"

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 0,
    percent: 0,
  }, {
    answer: 'other_answer',
    image: 'other_image',
    count: 0,
    percent: 0,
  }],
  date: new Date()
})

export const mockSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})
