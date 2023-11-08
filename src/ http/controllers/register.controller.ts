import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { registerService } from '@/services/register';

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });
    //Validation
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        await registerService({
            name, 
            email,
            password
        });
    } catch (error) {
        return reply.status(409).send(error);
    }
    
    return reply.status(201).send();
}
