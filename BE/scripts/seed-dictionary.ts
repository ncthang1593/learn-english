import * as dotenv from 'dotenv';
dotenv.config();

import { DictionaryService } from '../src/dictionary/dictionary.service';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const WORDS_TO_SEED = [
  'apple', 'banana', 'cat', 'dog', 'elephant', 'flower', 'guitar', 'happy',
  'island', 'journey', 'kite', 'lion', 'mountain', 'nature', 'ocean',
  'piano', 'quiet', 'river', 'sun', 'tree', 'umbrella', 'village', 'water',
  'yellow', 'zebra'
];

async function bootstrap() {
  console.log('🌱 Khởi động auto-fetch dictionary...');
  
  const dictionaryService = new DictionaryService();
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter } as any);


  const levelId = 'basic-1';
  const lessonId = 'lesson-1';

  // Dọn dẹp lesson cũ nếu có để seed lại
  await prisma.lessonContent.deleteMany({
    where: { lessonId }
  });

  console.log(`Bắt đầu lấy dữ liệu cho ${WORDS_TO_SEED.length} từ vựng...`);
  const vocabulary = [];

  for (let i = 0; i < WORDS_TO_SEED.length; i++) {
    const word = WORDS_TO_SEED[i];
    console.log(`[${i+1}/${WORDS_TO_SEED.length}] Đang tra từ: ${word}...`);
    try {
      const data = await dictionaryService.lookupWord(word);
      vocabulary.push({
        id: `${lessonId}-${word}`,
        ...data
      });
      // Delay 1 giây để tránh rate limit của Google Translate API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`❌ Lỗi khi lấy từ '${word}':`, err.message);
    }
  }

  console.log('✅ Đã lấy xong từ vựng. Đang lưu vào DB...');

  const lessonContent = await prisma.lessonContent.create({
    data: {
      lessonId,
      levelId,
      order: 1,
      title: 'Chào Hỏi Cơ Bản',
      titleVietnamese: 'Chào Hỏi Cơ Bản',
      description: 'Làm quen với các từ vựng tiếng Anh cơ bản nhất.',
      vocabulary: vocabulary,
    }
  });

  console.log('🎉 Seed hoàn tất!');
  await prisma.$disconnect();
}

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});
