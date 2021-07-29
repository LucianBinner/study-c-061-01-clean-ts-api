import { 
    CompareFieldsValidation, 
    EmailValidation, 
    RequiredFieldValidation, 
    ValidationComposite 
} from "../../../../../validation/validators";
import { Validation } from "../../../../../presentation/protocols/validation";
import { EmailValidator } from "../../../../../validation/protocols/email-validator";
import { makeSignValidation } from "./signup-validation-factory";

jest.mock('../../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: String): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('SignUp Validation', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeSignValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
    });
});