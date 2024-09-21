import { container } from "tsyringe";
import { PrismaAccountRepository } from "./modules/account/repositories/implementations/prisma-account-repository";

container.register("IAccountRepository", {
    useClass: PrismaAccountRepository
})
