import * as yup from 'yup'

const CreateAccountDTOValidator = yup.object({
    accountNumber: yup.string().required(),
    balance: yup.number().integer().required(),
    currency: yup.mixed().oneOf(['BRL']),
    userId: yup.number().integer().required()
})

export class CreateAccountDTO {
    accountNumber: string
    balance: number
    currency: 'BRL'
    userId: number

    constructor (input: Omit<CreateAccountDTO, 'constructor'>) {
        CreateAccountDTOValidator.validateSync(input, { abortEarly: false })
        this.accountNumber = input.accountNumber
        this.balance = input.balance
        this.currency = input.currency
        this.userId = input.userId
    }
}