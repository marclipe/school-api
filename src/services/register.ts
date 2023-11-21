import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';

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
            throw new Error('E-mail already exists!');
        }

        // const prismaUserRepository = new PrismaUserRepository();

        await this.userRepository.create({
            name,
            email,
            password_hash
        });
    }
}