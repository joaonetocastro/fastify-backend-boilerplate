import { Account } from "@/domain/entities/account";
import { IAccountRepository } from "../repositories/account-repository";
import { autoInjectable } from "tsyringe";
import { CreateAccountDTO } from "../dtos/create-account-dto";

@autoInjectable()
export class CreateAccountUseCase {
    constructor(
        private readonly repository: IAccountRepository
    ) { }

    async execute(input: CreateAccountDTO): Promise<Account> {
        return this.repository.create(input)
    }
}