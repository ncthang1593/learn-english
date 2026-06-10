import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);



async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@englishup.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      username: 'admin',
      displayName: 'EnglishUp Admin',
      passwordHash,
      role: 'ADMIN',
      progress: { create: {} },
    },
  });

  console.log(`✅ Admin user: ${admin.email}`);
  console.log('✅ Seed completed!');
  console.log('\n📌 Next steps:');
  console.log('   1. Copy .env.example → .env and fill in your values');
  console.log('   2. Run: npx prisma migrate dev --name init');
  console.log('   3. Run: npx ts-node prisma/seed.ts');
  console.log('   4. Run: npm run start:dev');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
