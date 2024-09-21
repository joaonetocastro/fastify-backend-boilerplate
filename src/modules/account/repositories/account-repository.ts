import { Account } from "@/domain/entities/account"
import { CreateAccountDTO } from "../dtos/create-account-dto"

export interface IAccountRepository {
    create(input: CreateAccountDTO): Promise<Account>
}
