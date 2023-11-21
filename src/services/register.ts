import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterServiceRequest {
  name: string;
  email: string; 
  password: string;
}

//D ⇒ Dependency Inversion Principle

export class RegisterService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private userRepository: UsersRepository) {}

    async execute({name, email, password}: RegisterServiceRequest) {
        const password_hash = await hash(password, 6); //rounds = 6

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        // const prismaUserRepository = new PrismaUserRepository();

        await this.userRepository.create({
            name,
            email,
            password_hash
        });
    }
}