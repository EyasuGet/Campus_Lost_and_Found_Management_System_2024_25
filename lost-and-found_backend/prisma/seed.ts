import{admins} from './admin'
import { PrismaClient } from '@prisma/client'
import * as argon from 'argon2'
const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string>{
    return argon.hash(password)
}

async function main() {
    for (let admin of admins){
    
        const hashpassword = await hashPassword(admin.passwordHash)
        await prisma.user.create({
            data: {
                ...admin,
                passwordHash: hashpassword
            }
                
        });
        console.log(`Admin ${admin.email} seeded successfully`)
        
    }
}

main().catch(e => {
    console.log('error seeding admins: ',e.message);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect()
})