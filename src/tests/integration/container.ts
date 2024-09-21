import { InMemoryAccountRepository } from "@/modules/account/repositories/implementations/in-memory-account-repository";
import { container } from "tsyringe";

container.register("IAccountRepository", {
    useClass: InMemoryAccountRepository
})
