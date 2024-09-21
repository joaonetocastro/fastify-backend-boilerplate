import { Account } from "@/domain/entities/account"

describe('Account', () => {
    it('should return new account', async () => {
        const response = new Account({
            id: 1,
            accountNumber: '',
            balance: 1,
            currency: 'BRL',
            userId: 2,
            createdAt: '',
            updatedAt: '',
        })
        
        expect(response).toHaveProperty('id')
    })
    it('should throw if currency is not BRL', async () => {
        const response = () => new Account({
            id: 1,
            accountNumber: '',
            balance: 1,
            currency: 'USD' as any,
            userId: 2,
            createdAt: '',
            updatedAt: '',
        })
        
        expect(response).toThrow()
    })
})