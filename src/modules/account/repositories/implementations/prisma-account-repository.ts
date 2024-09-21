import { Account } from "@/domain/entities/account"
import { IAccountRepository } from "../account-repository"
import { CreateAccountDTO } from "../../dtos/create-account-dto"
import { db } from "@/db"

export class PrismaAccountRepository  implements IAccountRepository {
    async create(input: CreateAccountDTO) {
        const response = await db.bankAccount.create({data: {
            accountNumber: input.accountNumber,
            userId: input.userId,
            balance: 0,
            currency: input.currency
        }})

        return new Account({
            id: response.id,
            accountNumber: response.accountNumber,
            balance: response.balance,
            createdAt: response.createdAt.toISOString(),
            updatedAt: response.updatedAt.toISOString(),
            currency: response.currency,
            userId: response.userId
        })
    }
}
