import { Account } from "@/domain/entities/account"
import { IAccountRepository } from "../repositories/account-repository"
import { CreateAccountUseCase } from "./create-account"

describe('CreateAccountUseCase', () => {
    it('should return new account', async () => {
        const account = new Account({
            id: 1,
            accountNumber: '',
            balance: 1,
            currency: 'BRL',
            userId: 2,
            createdAt: '',
            updatedAt: '',
        })
        const repository: IAccountRepository = {
            create: jest.fn(() => new Promise(resolve => resolve(account)))
        }
        const usecase = new CreateAccountUseCase(repository)
        const response = await usecase.execute({
            accountNumber: '',
            balance: 1,
            currency: 'BRL',
            userId: 2,
        })

        expect(response).toHaveProperty('id')
    })
})