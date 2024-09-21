import { Account } from "@/domain/entities/account"
import { IAccountRepository } from "../account-repository"
import { CreateAccountDTO } from "../../dtos/create-account-dto"

export class InMemoryAccountRepository  implements IAccountRepository {
    async create(input: CreateAccountDTO) {
        return new Account({...input, id: 123, createdAt: '', updatedAt: ''})
    }
}
