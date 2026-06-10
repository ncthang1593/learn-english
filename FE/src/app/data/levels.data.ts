import { Level } from '../core/models/lesson.model';

export const LEVELS_DATA: Level[] = [
  {
    id: 'basic-1',
    order: 1,
    title: 'Giao Tiếp Cơ Bản',
    titleVietnamese: 'Tiếng Anh Giao Tiếp Nhập Môn',
    description: 'Nắm vững những từ vựng và mẫu câu cơ bản nhất để bắt đầu hành trình chinh phục tiếng Anh.',
    isPremium: false,
    emoji: '🌱',
    bgGradient: 'from-primary-500 to-indigo-600',
    lessons: [
      {
        id: 'lesson-1',
        order: 1,
        title: 'Greetings & Essentials',
        titleVietnamese: 'Chào Hỏi & Cơ Bản',
        description: 'Các từ vựng tiếng Anh thông dụng nhất hàng ngày.',
        emoji: '👋',
        estimatedMinutes: 10,
        xpReward: 50,
        difficulty: 'easy',
        tags: ['basic', 'greetings', 'essential'],
        theory: [],
        exercises: [],
        vocabulary: [
          {
            id: 'lesson-1-hello',
            english: 'hello',
            vietnamese: 'xin chào',
            pronunciation: '/həˈləʊ/',
            example: 'Hello, how are you today?',
            exampleVietnamese: 'Xin chào, hôm nay bạn thế nào?',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3'
          },
          {
            id: 'lesson-1-world',
            english: 'world',
            vietnamese: 'thế giới',
            pronunciation: '/wɜːld/',
            example: 'He traveled around the world.',
            exampleVietnamese: 'Anh ấy đã đi du lịch vòng quanh thế giới.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/world-uk.mp3'
          },
          {
            id: 'lesson-1-apple',
            english: 'apple',
            vietnamese: 'quả táo',
            pronunciation: '/ˈæp.əl/',
            example: 'She is eating an apple.',
            exampleVietnamese: 'Cô ấy đang ăn một quả táo.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/apple-uk.mp3'
          },
          {
            id: 'lesson-1-water',
            english: 'water',
            vietnamese: 'nước',
            pronunciation: '/ˈwɔː.tər/',
            example: 'Please drink more water.',
            exampleVietnamese: 'Làm ơn hãy uống nhiều nước hơn.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/water-uk.mp3'
          },
          {
            id: 'lesson-1-sun',
            english: 'sun',
            vietnamese: 'mặt trời',
            pronunciation: '/sʌn/',
            example: 'The sun is shining brightly.',
            exampleVietnamese: 'Mặt trời đang chiếu sáng chói lọi.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/sun-uk.mp3'
          },
          {
            id: 'lesson-1-tree',
            english: 'tree',
            vietnamese: 'cây cối',
            pronunciation: '/triː/',
            example: 'There is a big tree in the garden.',
            exampleVietnamese: 'Có một cái cây lớn trong khu vườn.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/tree-uk.mp3'
          },
          {
            id: 'lesson-1-house',
            english: 'house',
            vietnamese: 'ngôi nhà',
            pronunciation: '/haʊs/',
            example: 'They live in a beautiful house.',
            exampleVietnamese: 'Họ sống trong một ngôi nhà đẹp.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/house-uk.mp3'
          },
          {
            id: 'lesson-1-book',
            english: 'book',
            vietnamese: 'quyển sách',
            pronunciation: '/bʊk/',
            example: 'I am reading a good book.',
            exampleVietnamese: 'Tôi đang đọc một cuốn sách hay.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/book-uk.mp3'
          },
          {
            id: 'lesson-1-time',
            english: 'time',
            vietnamese: 'thời gian',
            pronunciation: '/taɪm/',
            example: 'What time is it?',
            exampleVietnamese: 'Bây giờ là mấy giờ?',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/time-uk.mp3'
          },
          {
            id: 'lesson-1-friend',
            english: 'friend',
            vietnamese: 'bạn bè',
            pronunciation: '/frend/',
            example: 'She is my best friend.',
            exampleVietnamese: 'Cô ấy là bạn thân nhất của tôi.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/friend-uk.mp3'
          }
        ]
      },
      {
        id: 'lesson-2',
        order: 2,
        title: 'Animals & Nature',
        titleVietnamese: 'Động Vật & Thiên Nhiên',
        description: 'Mở rộng vốn từ về thế giới động vật và tự nhiên quanh ta.',
        emoji: '🦁',
        estimatedMinutes: 12,
        xpReward: 60,
        difficulty: 'medium',
        tags: ['animals', 'nature', 'intermediate'],
        theory: [],
        exercises: [],
        vocabulary: [
          {
            id: 'lesson-2-dog',
            english: 'dog',
            vietnamese: 'con chó',
            pronunciation: '/dɒɡ/',
            example: 'The dog is barking loudly.',
            exampleVietnamese: 'Con chó đang sủa ầm ĩ.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/dog-uk.mp3'
          },
          {
            id: 'lesson-2-cat',
            english: 'cat',
            vietnamese: 'con mèo',
            pronunciation: '/kæt/',
            example: 'The cat is sleeping on the sofa.',
            exampleVietnamese: 'Con mèo đang ngủ trên ghế sofa.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/cat-uk.mp3'
          },
          {
            id: 'lesson-2-bird',
            english: 'bird',
            vietnamese: 'con chim',
            pronunciation: '/bɜːd/',
            example: 'A little bird is singing in the tree.',
            exampleVietnamese: 'Một chú chim nhỏ đang hót trên cây.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/bird-uk.mp3'
          },
          {
            id: 'lesson-2-elephant',
            english: 'elephant',
            vietnamese: 'con voi',
            pronunciation: '/ˈel.ɪ.fənt/',
            example: 'Elephants are the largest land animals.',
            exampleVietnamese: 'Voi là loài động vật trên cạn lớn nhất.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/elephant-uk.mp3'
          },
          {
            id: 'lesson-2-lion',
            english: 'lion',
            vietnamese: 'con sư tử',
            pronunciation: '/ˈlaɪ.ən/',
            example: 'The lion is the king of the jungle.',
            exampleVietnamese: 'Sư tử là chúa tể rừng xanh.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/lion-uk.mp3'
          },
          {
            id: 'lesson-2-ocean',
            english: 'ocean',
            vietnamese: 'đại dương',
            pronunciation: '/ˈəʊ.ʃən/',
            example: 'The ocean is vast and deep.',
            exampleVietnamese: 'Đại dương thật rộng lớn và sâu thẳm.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/ocean-uk.mp3'
          },
          {
            id: 'lesson-2-mountain',
            english: 'mountain',
            vietnamese: 'ngọn núi',
            pronunciation: '/ˈmaʊn.tɪn/',
            example: 'They climbed the highest mountain.',
            exampleVietnamese: 'Họ đã leo lên ngọn núi cao nhất.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/mountain-uk.mp3'
          },
          {
            id: 'lesson-2-flower',
            english: 'flower',
            vietnamese: 'bông hoa',
            pronunciation: '/ˈflaʊ.ər/',
            example: 'She gave me a beautiful red flower.',
            exampleVietnamese: 'Cô ấy tặng tôi một bông hoa đỏ tuyệt đẹp.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/flower-uk.mp3'
          },
          {
            id: 'lesson-2-forest',
            english: 'forest',
            vietnamese: 'khu rừng',
            pronunciation: '/ˈfɒr.ɪst/',
            example: 'There are many wild animals in the forest.',
            exampleVietnamese: 'Có rất nhiều động vật hoang dã trong khu rừng.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/forest-uk.mp3'
          },
          {
            id: 'lesson-2-river',
            english: 'river',
            vietnamese: 'dòng sông',
            pronunciation: '/ˈrɪv.ər/',
            example: 'We went swimming in the river.',
            exampleVietnamese: 'Chúng tôi đã đi bơi ở dòng sông.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/river-uk.mp3'
          }
        ]
      },
      {
        id: 'lesson-3',
        order: 3,
        title: 'Food & Drinks',
        titleVietnamese: 'Đồ Ăn & Đồ Uống',
        description: 'Từ vựng tiếng Anh về chủ đề ẩm thực.',
        emoji: '🍔',
        estimatedMinutes: 15,
        xpReward: 70,
        difficulty: 'medium',
        tags: ['food', 'drinks', 'intermediate'],
        theory: [],
        exercises: [],
        vocabulary: [
          {
            id: 'lesson-3-bread',
            english: 'bread',
            vietnamese: 'bánh mì',
            pronunciation: '/bred/',
            example: 'I usually eat bread for breakfast.',
            exampleVietnamese: 'Tôi thường ăn bánh mì vào bữa sáng.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/bread-uk.mp3'
          },
          {
            id: 'lesson-3-milk',
            english: 'milk',
            vietnamese: 'sữa',
            pronunciation: '/mɪlk/',
            example: 'Do you want some milk with your coffee?',
            exampleVietnamese: 'Bạn có muốn dùng chút sữa với cà phê không?',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/milk-uk.mp3'
          },
          {
            id: 'lesson-3-coffee',
            english: 'coffee',
            vietnamese: 'cà phê',
            pronunciation: '/ˈkɒf.i/',
            example: 'I need a cup of coffee to wake up.',
            exampleVietnamese: 'Tôi cần một tách cà phê để tỉnh táo.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/coffee-uk.mp3'
          },
          {
            id: 'lesson-3-chicken',
            english: 'chicken',
            vietnamese: 'thịt gà',
            pronunciation: '/ˈtʃɪk.ɪn/',
            example: 'We had fried chicken for dinner.',
            exampleVietnamese: 'Chúng tôi đã ăn gà rán cho bữa tối.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/chicken-uk.mp3'
          },
          {
            id: 'lesson-3-rice',
            english: 'rice',
            vietnamese: 'gạo / cơm',
            pronunciation: '/raɪs/',
            example: 'Rice is a staple food in Asia.',
            exampleVietnamese: 'Gạo là lương thực chính ở châu Á.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/rice-uk.mp3'
          },
          {
            id: 'lesson-3-cheese',
            english: 'cheese',
            vietnamese: 'phô mai',
            pronunciation: '/tʃiːz/',
            example: 'This pizza has a lot of cheese.',
            exampleVietnamese: 'Chiếc bánh pizza này có rất nhiều phô mai.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/cheese-uk.mp3'
          },
          {
            id: 'lesson-3-sugar',
            english: 'sugar',
            vietnamese: 'đường',
            pronunciation: '/ˈʃʊɡ.ər/',
            example: 'Too much sugar is bad for your health.',
            exampleVietnamese: 'Quá nhiều đường không tốt cho sức khỏe của bạn.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/sugar-uk.mp3'
          },
          {
            id: 'lesson-3-salt',
            english: 'salt',
            vietnamese: 'muối',
            pronunciation: '/sɒlt/',
            example: 'Can you pass me the salt, please?',
            exampleVietnamese: 'Bạn có thể đưa cho tôi lọ muối được không?',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/salt-uk.mp3'
          },
          {
            id: 'lesson-3-beef',
            english: 'beef',
            vietnamese: 'thịt bò',
            pronunciation: '/biːf/',
            example: 'He ordered a medium-rare beef steak.',
            exampleVietnamese: 'Anh ấy đã gọi một phần bít tết bò chín vừa.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/beef-uk.mp3'
          },
          {
            id: 'lesson-3-egg',
            english: 'egg',
            vietnamese: 'trứng',
            pronunciation: '/eɡ/',
            example: 'She boiled an egg for her salad.',
            exampleVietnamese: 'Cô ấy đã luộc một quả trứng cho món salad của mình.',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/egg-uk.mp3'
          }
        ]
      }
    ]
  }
];
