
export class Account {
    id: number
    accountNumber: string
    balance: number
    currency: 'BRL'
    userId: number
    createdAt: string
    updatedAt: string

    constructor(input: Omit<Account, 'constructor'>) {
        if(input.currency !== 'BRL') {
            throw new Error('invalid')
        }
        
        this.id = input.id
        this.accountNumber = input.accountNumber
        this.balance = input.balance
        this.currency = input.currency
        this.userId = input.userId
        this.createdAt = input.createdAt
        this.updatedAt = input.updatedAt
    }
}