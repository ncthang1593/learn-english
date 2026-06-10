import { Level } from '../core/models/lesson.model';

export const LEVELS_DATA: Level[] = [
  // ============================================================
  // LEVEL 1: FOUNDATION (A0)
  // ============================================================
  {
    id: 'foundation',
    name: 'Foundation',
    nameVietnamese: 'Nền Tảng',
    description: 'Xây dựng nền tảng tiếng Anh từ con số 0. Học chào hỏi, số đếm và những từ cơ bản nhất.',
    emoji: '🌱',
    colorClass: 'text-emerald-600',
    bgGradient: 'from-emerald-400 to-teal-500',
    order: 1,
    lessons: [
      // ----- Lesson 1.1: Greetings -----
      {
        id: 'f1',
        levelId: 'foundation',
        order: 1,
        title: 'Basic Greetings',
        titleVietnamese: 'Chào Hỏi Cơ Bản',
        description: 'Học cách chào hỏi và tự giới thiệu bằng tiếng Anh',
        emoji: '👋',
        estimatedMinutes: 10,
        xpReward: 30,
        difficulty: 'easy',
        theory: [
          {
            title: 'Các câu chào hỏi thông dụng',
            content: '<p>Trong tiếng Anh, có nhiều cách để chào nhau tùy theo thời điểm trong ngày và mức độ quen biết.</p>',
            tip: '💡 "Hello" và "Hi" có thể dùng bất kỳ lúc nào, còn "Good morning/afternoon/evening" chỉ dùng vào buổi sáng/chiều/tối.',
            examples: [
              { english: 'Hello! How are you?', vietnamese: 'Xin chào! Bạn khỏe không?' },
              { english: 'Good morning! Nice to meet you.', vietnamese: 'Chào buổi sáng! Rất vui được gặp bạn.' },
              { english: 'Hi! My name is Lan.', vietnamese: 'Xin chào! Tên tôi là Lan.' },
              { english: 'Goodbye! See you tomorrow.', vietnamese: 'Tạm biệt! Hẹn gặp lại ngày mai.' },
            ],
          },
        ],
        vocabulary: [
          { id: 'f1-v1', english: 'Hello', vietnamese: 'Xin chào', pronunciation: '/həˈloʊ/', example: 'Hello! How are you?', exampleVietnamese: 'Xin chào! Bạn khỏe không?', partOfSpeech: 'phrase' },
          { id: 'f1-v2', english: 'Goodbye', vietnamese: 'Tạm biệt', pronunciation: '/ˌɡʊdˈbaɪ/', example: 'Goodbye! See you later.', exampleVietnamese: 'Tạm biệt! Hẹn gặp lại.', partOfSpeech: 'phrase' },
          { id: 'f1-v3', english: 'Thank you', vietnamese: 'Cảm ơn', pronunciation: '/ˈθæŋk juː/', example: 'Thank you very much!', exampleVietnamese: 'Cảm ơn bạn rất nhiều!', partOfSpeech: 'phrase' },
          { id: 'f1-v4', english: 'Please', vietnamese: 'Làm ơn / Xin', pronunciation: '/pliːz/', example: 'Please help me.', exampleVietnamese: 'Làm ơn giúp tôi với.', partOfSpeech: 'adverb' },
          { id: 'f1-v5', english: 'Sorry', vietnamese: 'Xin lỗi', pronunciation: '/ˈsɒri/', example: 'Sorry, I am late.', exampleVietnamese: 'Xin lỗi, tôi bị trễ.', partOfSpeech: 'phrase' },
          { id: 'f1-v6', english: 'Yes', vietnamese: 'Có / Vâng', pronunciation: '/jes/', example: 'Yes, I understand.', exampleVietnamese: 'Vâng, tôi hiểu rồi.', partOfSpeech: 'adverb' },
          { id: 'f1-v7', english: 'No', vietnamese: 'Không', pronunciation: '/noʊ/', example: 'No, thank you.', exampleVietnamese: 'Không, cảm ơn bạn.', partOfSpeech: 'adverb' },
          { id: 'f1-v8', english: 'Nice to meet you', vietnamese: 'Rất vui được gặp bạn', pronunciation: '/naɪs tə miːt juː/', example: 'Nice to meet you, Peter!', exampleVietnamese: 'Rất vui được gặp bạn, Peter!', partOfSpeech: 'phrase' },
        ],
        exercises: [
          {
            type: 'mcq', id: 'f1-e1',
            question: '"Xin chào" trong tiếng Anh là gì?',
            options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'],
            correctIndex: 1,
            explanation: '"Hello" hoặc "Hi" đều có nghĩa là "Xin chào" trong tiếng Anh.',
          },
          {
            type: 'mcq', id: 'f1-e2',
            question: 'Bạn muốn nói "Cảm ơn" thì dùng câu nào?',
            options: ['Sorry', 'Please', 'Thank you', 'Goodbye'],
            correctIndex: 2,
            explanation: '"Thank you" là cách nói "Cảm ơn" phổ biến nhất trong tiếng Anh.',
          },
          {
            type: 'fill-blank', id: 'f1-e3',
            sentence: '___ to meet you! My name is Minh.',
            answer: 'Nice',
            hint: 'Bắt đầu bằng chữ N',
            explanation: '"Nice to meet you" = Rất vui được gặp bạn.',
          },
          {
            type: 'mcq', id: 'f1-e4',
            question: '"Good morning" được dùng vào lúc nào?',
            options: ['Buổi tối', 'Buổi trưa', 'Buổi sáng', 'Bất kỳ lúc nào'],
            correctIndex: 2,
            explanation: '"Good morning" = Chào buổi sáng, chỉ dùng vào buổi sáng (trước 12 giờ trưa).',
          },
          {
            type: 'ordering', id: 'f1-e5',
            instruction: 'Sắp xếp thành câu hoàn chỉnh:',
            words: ['is', 'My', 'name', 'Lan'],
            correctOrder: ['My', 'name', 'is', 'Lan'],
            vietnamese: 'Tên tôi là Lan.',
          },
        ],
        tags: ['greetings', 'basics', 'social'],
      },
      // ----- Lesson 1.2: Numbers -----
      {
        id: 'f2',
        levelId: 'foundation',
        order: 2,
        title: 'Numbers 1-20',
        titleVietnamese: 'Số Đếm 1-20',
        description: 'Học các con số từ 1 đến 20 bằng tiếng Anh',
        emoji: '🔢',
        estimatedMinutes: 12,
        xpReward: 30,
        difficulty: 'easy',
        theory: [
          {
            title: 'Số đếm trong tiếng Anh',
            content: '<p>Số đếm là nền tảng quan trọng. Từ 1-12 cần học thuộc lòng, từ 13-19 thêm đuôi <strong>"-teen"</strong>.</p>',
            tip: '💡 13 = thir<b>teen</b>, 14 = four<b>teen</b>... chú ý "thirteen" không phải "threeteen"!',
            examples: [
              { english: 'I have three cats.', vietnamese: 'Tôi có ba con mèo.' },
              { english: 'She is fifteen years old.', vietnamese: 'Cô ấy mười lăm tuổi.' },
            ],
          },
        ],
        vocabulary: [
          { id: 'f2-v1', english: 'One', vietnamese: 'Một (1)', pronunciation: '/wʌn/', example: 'I have one dog.', exampleVietnamese: 'Tôi có một con chó.', partOfSpeech: 'noun' },
          { id: 'f2-v2', english: 'Two', vietnamese: 'Hai (2)', pronunciation: '/tuː/', example: 'There are two cats.', exampleVietnamese: 'Có hai con mèo.', partOfSpeech: 'noun' },
          { id: 'f2-v3', english: 'Three', vietnamese: 'Ba (3)', pronunciation: '/θriː/', example: 'Three books on the table.', exampleVietnamese: 'Ba quyển sách trên bàn.', partOfSpeech: 'noun' },
          { id: 'f2-v4', english: 'Four', vietnamese: 'Bốn (4)', pronunciation: '/fɔːr/', example: 'Four chairs in the room.', exampleVietnamese: 'Bốn cái ghế trong phòng.', partOfSpeech: 'noun' },
          { id: 'f2-v5', english: 'Five', vietnamese: 'Năm (5)', pronunciation: '/faɪv/', example: 'Five fingers on each hand.', exampleVietnamese: 'Năm ngón tay trên mỗi bàn tay.', partOfSpeech: 'noun' },
          { id: 'f2-v6', english: 'Ten', vietnamese: 'Mười (10)', pronunciation: '/ten/', example: 'Ten students in class.', exampleVietnamese: 'Mười học sinh trong lớp.', partOfSpeech: 'noun' },
          { id: 'f2-v7', english: 'Fifteen', vietnamese: 'Mười lăm (15)', pronunciation: '/ˌfɪfˈtiːn/', example: 'She is fifteen years old.', exampleVietnamese: 'Cô ấy mười lăm tuổi.', partOfSpeech: 'noun' },
          { id: 'f2-v8', english: 'Twenty', vietnamese: 'Hai mươi (20)', pronunciation: '/ˈtwenti/', example: 'Twenty minutes to go.', exampleVietnamese: 'Còn hai mươi phút nữa.', partOfSpeech: 'noun' },
        ],
        exercises: [
          {
            type: 'mcq', id: 'f2-e1',
            question: '"Five" nghĩa là số mấy?',
            options: ['3', '4', '5', '6'],
            correctIndex: 2,
            explanation: '"Five" = 5 (năm). Nhớ phát âm: /faɪv/',
          },
          {
            type: 'matching', id: 'f2-e2',
            instruction: 'Nối số với chữ tiếng Anh tương ứng:',
            pairs: [
              { left: '1', right: 'One' },
              { left: '3', right: 'Three' },
              { left: '5', right: 'Five' },
              { left: '10', right: 'Ten' },
            ],
          },
          {
            type: 'fill-blank', id: 'f2-e3',
            sentence: 'I have ___ brothers: Tom, Jack, and Mike.',
            answer: 'three',
            hint: 'Tom, Jack, Mike = 3 người',
            explanation: 'Three = Ba. Tom + Jack + Mike = 3 anh em.',
          },
          {
            type: 'mcq', id: 'f2-e4',
            question: 'Số 15 viết bằng tiếng Anh là gì?',
            options: ['Fiveteen', 'Fifteen', 'Fifteeen', 'Fifeteen'],
            correctIndex: 1,
            explanation: '"Fifteen" là đúng. Chú ý: "five" → "fif" khi ghép với "-teen".',
          },
        ],
        tags: ['numbers', 'basics', 'counting'],
      },
      // ----- Lesson 1.3: Colors -----
      {
        id: 'f3',
        levelId: 'foundation',
        order: 3,
        title: 'Colors & Shapes',
        titleVietnamese: 'Màu Sắc & Hình Dạng',
        description: 'Học tên các màu sắc và hình dạng cơ bản',
        emoji: '🎨',
        estimatedMinutes: 10,
        xpReward: 35,
        difficulty: 'easy',
        theory: [
          {
            title: 'Màu sắc trong tiếng Anh',
            content: '<p>Màu sắc (colors) là tính từ trong tiếng Anh, thường đứng <strong>trước danh từ</strong>.</p>',
            tip: '💡 Trong tiếng Anh, tính từ đứng TRƯỚC danh từ: "a red car" (một chiếc xe đỏ), khác với tiếng Việt.',
            examples: [
              { english: 'I have a blue bag.', vietnamese: 'Tôi có một cái túi màu xanh dương.' },
              { english: 'The sky is light blue.', vietnamese: 'Bầu trời màu xanh nhạt.' },
            ],
          },
        ],
        vocabulary: [
          { id: 'f3-v1', english: 'Red', vietnamese: 'Đỏ', pronunciation: '/red/', example: 'I like red roses.', exampleVietnamese: 'Tôi thích hoa hồng đỏ.', partOfSpeech: 'adjective' },
          { id: 'f3-v2', english: 'Blue', vietnamese: 'Xanh dương', pronunciation: '/bluː/', example: 'The sky is blue.', exampleVietnamese: 'Bầu trời màu xanh dương.', partOfSpeech: 'adjective' },
          { id: 'f3-v3', english: 'Green', vietnamese: 'Xanh lá', pronunciation: '/ɡriːn/', example: 'Grass is green.', exampleVietnamese: 'Cỏ màu xanh lá.', partOfSpeech: 'adjective' },
          { id: 'f3-v4', english: 'Yellow', vietnamese: 'Vàng', pronunciation: '/ˈjeloʊ/', example: 'Bananas are yellow.', exampleVietnamese: 'Chuối màu vàng.', partOfSpeech: 'adjective' },
          { id: 'f3-v5', english: 'White', vietnamese: 'Trắng', pronunciation: '/waɪt/', example: 'Snow is white.', exampleVietnamese: 'Tuyết màu trắng.', partOfSpeech: 'adjective' },
          { id: 'f3-v6', english: 'Black', vietnamese: 'Đen', pronunciation: '/blæk/', example: 'The cat is black.', exampleVietnamese: 'Con mèo màu đen.', partOfSpeech: 'adjective' },
          { id: 'f3-v7', english: 'Circle', vietnamese: 'Hình tròn', pronunciation: '/ˈsɜːrkl/', example: 'A circle has no corners.', exampleVietnamese: 'Hình tròn không có góc.', partOfSpeech: 'noun' },
          { id: 'f3-v8', english: 'Square', vietnamese: 'Hình vuông', pronunciation: '/skwer/', example: 'A square has four equal sides.', exampleVietnamese: 'Hình vuông có bốn cạnh bằng nhau.', partOfSpeech: 'noun' },
        ],
        exercises: [
          {
            type: 'mcq', id: 'f3-e1',
            question: '"Màu xanh dương" trong tiếng Anh là gì?',
            options: ['Green', 'Blue', 'Black', 'Purple'],
            correctIndex: 1,
            explanation: '"Blue" = màu xanh dương. "Green" = màu xanh lá.',
          },
          {
            type: 'matching', id: 'f3-e2',
            instruction: 'Nối màu sắc với nghĩa tiếng Việt:',
            pairs: [
              { left: 'Red', right: 'Đỏ' },
              { left: 'Yellow', right: 'Vàng' },
              { left: 'White', right: 'Trắng' },
              { left: 'Black', right: 'Đen' },
            ],
          },
          {
            type: 'fill-blank', id: 'f3-e3',
            sentence: 'Bananas are ___.',
            answer: 'yellow',
            hint: 'Màu của chuối',
            explanation: '"Yellow" = màu vàng. Chuối (banana) có màu vàng.',
          },
          {
            type: 'ordering', id: 'f3-e4',
            instruction: 'Sắp xếp thành câu đúng:',
            words: ['car', 'a', 'red', 'have', 'I'],
            correctOrder: ['I', 'have', 'a', 'red', 'car'],
            vietnamese: 'Tôi có một chiếc xe màu đỏ.',
          },
        ],
        tags: ['colors', 'shapes', 'adjectives'],
      },
      // ----- Lesson 1.4: Pronouns -----
      {
        id: 'f4',
        levelId: 'foundation',
        order: 4,
        title: 'Personal Pronouns',
        titleVietnamese: 'Đại Từ Nhân Xưng',
        description: 'Học I, You, He, She, We, They và cách sử dụng',
        emoji: '👥',
        estimatedMinutes: 12,
        xpReward: 40,
        difficulty: 'easy',
        theory: [
          {
            title: 'Đại từ nhân xưng (Subject Pronouns)',
            content: `<p>Đại từ nhân xưng dùng làm <strong>chủ ngữ</strong> trong câu. Đây là nền tảng để xây dựng mọi câu tiếng Anh.</p>
            <table style="width:100%; border-collapse: collapse;">
              <tr><th>Số ít</th><th>Tiếng Việt</th><th>Số nhiều</th><th>Tiếng Việt</th></tr>
              <tr><td>I</td><td>Tôi</td><td>We</td><td>Chúng tôi/ta</td></tr>
              <tr><td>You</td><td>Bạn/Anh/Chị</td><td>You</td><td>Các bạn</td></tr>
              <tr><td>He/She/It</td><td>Anh ấy/Cô ấy/Nó</td><td>They</td><td>Họ/Chúng</td></tr>
            </table>`,
            tip: '💡 "You" dùng cho cả số ít và số nhiều trong tiếng Anh, khác với tiếng Việt.',
            examples: [
              { english: 'I am a student.', vietnamese: 'Tôi là học sinh.' },
              { english: 'She is my friend.', vietnamese: 'Cô ấy là bạn tôi.' },
              { english: 'They are from Vietnam.', vietnamese: 'Họ đến từ Việt Nam.' },
            ],
          },
        ],
        vocabulary: [
          { id: 'f4-v1', english: 'I', vietnamese: 'Tôi', pronunciation: '/aɪ/', example: 'I am happy.', exampleVietnamese: 'Tôi hạnh phúc.', partOfSpeech: 'noun' },
          { id: 'f4-v2', english: 'You', vietnamese: 'Bạn / Anh / Chị', pronunciation: '/juː/', example: 'You are my friend.', exampleVietnamese: 'Bạn là bạn của tôi.', partOfSpeech: 'noun' },
          { id: 'f4-v3', english: 'He', vietnamese: 'Anh ấy / Ông ấy', pronunciation: '/hiː/', example: 'He is a doctor.', exampleVietnamese: 'Anh ấy là bác sĩ.', partOfSpeech: 'noun' },
          { id: 'f4-v4', english: 'She', vietnamese: 'Cô ấy / Bà ấy', pronunciation: '/ʃiː/', example: 'She is a teacher.', exampleVietnamese: 'Cô ấy là giáo viên.', partOfSpeech: 'noun' },
          { id: 'f4-v5', english: 'We', vietnamese: 'Chúng tôi / Chúng ta', pronunciation: '/wiː/', example: 'We are students.', exampleVietnamese: 'Chúng tôi là học sinh.', partOfSpeech: 'noun' },
          { id: 'f4-v6', english: 'They', vietnamese: 'Họ / Chúng', pronunciation: '/ðeɪ/', example: 'They are from Hanoi.', exampleVietnamese: 'Họ đến từ Hà Nội.', partOfSpeech: 'noun' },
          { id: 'f4-v7', english: 'It', vietnamese: 'Nó (đồ vật/động vật)', pronunciation: '/ɪt/', example: 'It is a cat.', exampleVietnamese: 'Nó là một con mèo.', partOfSpeech: 'noun' },
          { id: 'f4-v8', english: 'My', vietnamese: 'Của tôi', pronunciation: '/maɪ/', example: 'This is my book.', exampleVietnamese: 'Đây là quyển sách của tôi.', partOfSpeech: 'adjective' },
        ],
        exercises: [
          {
            type: 'mcq', id: 'f4-e1',
            question: 'Để nói về một người con gái, dùng đại từ nào?',
            options: ['He', 'It', 'She', 'They'],
            correctIndex: 2,
            explanation: '"She" dùng để chỉ người con gái hoặc phụ nữ. "He" dùng cho nam giới.',
          },
          {
            type: 'fill-blank', id: 'f4-e2',
            sentence: '___ am a student from Vietnam.',
            answer: 'I',
            hint: '"Tôi là học sinh..." - dùng đại từ nào?',
            explanation: '"I" = Tôi. Luôn viết hoa chữ "I" dù ở vị trí nào trong câu.',
          },
          {
            type: 'matching', id: 'f4-e3',
            instruction: 'Nối đại từ với nghĩa tiếng Việt:',
            pairs: [
              { left: 'I', right: 'Tôi' },
              { left: 'We', right: 'Chúng tôi' },
              { left: 'He', right: 'Anh ấy' },
              { left: 'They', right: 'Họ' },
            ],
          },
          {
            type: 'ordering', id: 'f4-e4',
            instruction: 'Sắp xếp câu đúng:',
            words: ['a', 'teacher', 'is', 'She'],
            correctOrder: ['She', 'is', 'a', 'teacher'],
            vietnamese: 'Cô ấy là giáo viên.',
          },
        ],
        tags: ['pronouns', 'grammar', 'basics'],
      },
      // ----- Lesson 1.5: Family -----
      {
        id: 'f5',
        levelId: 'foundation',
        order: 5,
        title: 'My Family',
        titleVietnamese: 'Gia Đình Tôi',
        description: 'Học từ vựng về các thành viên trong gia đình',
        emoji: '👨‍👩‍👧‍👦',
        estimatedMinutes: 12,
        xpReward: 35,
        difficulty: 'easy',
        theory: [
          {
            title: 'Từ vựng về gia đình',
            content: '<p>Từ vựng về gia đình rất quan trọng trong giao tiếp hàng ngày. Dưới đây là các thành viên cơ bản trong gia đình.</p>',
            tip: '💡 "Parents" = cha mẹ (số nhiều), "Siblings" = anh chị em (số nhiều)',
            examples: [
              { english: 'My mother is a nurse.', vietnamese: 'Mẹ tôi là y tá.' },
              { english: 'I have two brothers and one sister.', vietnamese: 'Tôi có hai anh và một chị.' },
            ],
          },
        ],
        vocabulary: [
          { id: 'f5-v1', english: 'Father', vietnamese: 'Bố / Cha', pronunciation: '/ˈfɑːðər/', example: 'My father is a teacher.', exampleVietnamese: 'Bố tôi là giáo viên.', partOfSpeech: 'noun' },
          { id: 'f5-v2', english: 'Mother', vietnamese: 'Mẹ', pronunciation: '/ˈmʌðər/', example: 'My mother cooks well.', exampleVietnamese: 'Mẹ tôi nấu ăn ngon.', partOfSpeech: 'noun' },
          { id: 'f5-v3', english: 'Brother', vietnamese: 'Anh / Em trai', pronunciation: '/ˈbrʌðər/', example: 'I have one brother.', exampleVietnamese: 'Tôi có một người anh/em trai.', partOfSpeech: 'noun' },
          { id: 'f5-v4', english: 'Sister', vietnamese: 'Chị / Em gái', pronunciation: '/ˈsɪstər/', example: 'My sister is tall.', exampleVietnamese: 'Chị/em gái tôi cao.', partOfSpeech: 'noun' },
          { id: 'f5-v5', english: 'Grandfather', vietnamese: 'Ông nội/ngoại', pronunciation: '/ˈɡrænfɑːðər/', example: 'My grandfather is 70 years old.', exampleVietnamese: 'Ông tôi 70 tuổi.', partOfSpeech: 'noun' },
          { id: 'f5-v6', english: 'Grandmother', vietnamese: 'Bà nội/ngoại', pronunciation: '/ˈɡrænmʌðər/', example: 'My grandmother loves cooking.', exampleVietnamese: 'Bà tôi thích nấu ăn.', partOfSpeech: 'noun' },
          { id: 'f5-v7', english: 'Family', vietnamese: 'Gia đình', pronunciation: '/ˈfæməli/', example: 'I love my family.', exampleVietnamese: 'Tôi yêu gia đình tôi.', partOfSpeech: 'noun' },
          { id: 'f5-v8', english: 'Child / Children', vietnamese: 'Đứa trẻ / Trẻ em', pronunciation: '/tʃaɪld/ /ˈtʃɪldrən/', example: 'They have three children.', exampleVietnamese: 'Họ có ba đứa con.', partOfSpeech: 'noun' },
        ],
        exercises: [
          {
            type: 'mcq', id: 'f5-e1',
            question: '"Bố" trong tiếng Anh là gì?',
            options: ['Mother', 'Brother', 'Father', 'Sister'],
            correctIndex: 2,
            explanation: '"Father" = Bố/Cha. "Mother" = Mẹ.',
          },
          {
            type: 'fill-blank', id: 'f5-e2',
            sentence: 'I have one ___ and two sisters.',
            answer: 'brother',
            hint: 'Anh/em trai',
            explanation: '"Brother" = anh/em trai. "Sister" = chị/em gái.',
          },
          {
            type: 'matching', id: 'f5-e3',
            instruction: 'Nối từ với nghĩa tiếng Việt:',
            pairs: [
              { left: 'Father', right: 'Bố' },
              { left: 'Mother', right: 'Mẹ' },
              { left: 'Brother', right: 'Anh/Em trai' },
              { left: 'Sister', right: 'Chị/Em gái' },
            ],
          },
          {
            type: 'ordering', id: 'f5-e4',
            instruction: 'Sắp xếp thành câu đúng:',
            words: ['my', 'love', 'I', 'family'],
            correctOrder: ['I', 'love', 'my', 'family'],
            vietnamese: 'Tôi yêu gia đình tôi.',
          },
        ],
        tags: ['family', 'vocabulary', 'nouns'],
      },
    ],
  },

  // ============================================================
  // LEVEL 2: BUILDING (A1)
  // ============================================================
  {
    id: 'building',
    name: 'Building',
    nameVietnamese: 'Xây Dựng',
    description: 'Xây dựng nền tảng ngữ pháp. Học cấu trúc câu cơ bản và từ vựng thông dụng.',
    emoji: '🏗️',
    colorClass: 'text-blue-600',
    bgGradient: 'from-blue-400 to-indigo-500',
    order: 2,
    unlockRequirement: 'foundation',
    lessons: [
      {
        id: 'b1',
        levelId: 'building',
        order: 1,
        title: 'Present Simple (To Be)',
        titleVietnamese: 'Động Từ "To Be"',
        description: 'Học cách dùng am/is/are trong câu đơn giản',
        emoji: '⚡',
        estimatedMinutes: 15,
        xpReward: 50,
        difficulty: 'medium',
        theory: [
          {
            title: 'Động từ TO BE: am / is / are',
            content: `<p>Động từ "to be" là động từ quan trọng nhất trong tiếng Anh!</p>
            <table>
              <tr><th>Chủ ngữ</th><th>To Be</th><th>Ví dụ</th></tr>
              <tr><td>I</td><td><strong>am</strong></td><td>I am a student.</td></tr>
              <tr><td>He / She / It</td><td><strong>is</strong></td><td>She is tall.</td></tr>
              <tr><td>You / We / They</td><td><strong>are</strong></td><td>They are happy.</td></tr>
            </table>`,
            tip: '💡 Dạng phủ định: am not, is not (isn\'t), are not (aren\'t)',
            examples: [
              { english: 'I am a student.', vietnamese: 'Tôi là học sinh.' },
              { english: 'She is beautiful.', vietnamese: 'Cô ấy đẹp.' },
              { english: 'We are tired.', vietnamese: 'Chúng tôi mệt.' },
              { english: 'He is not hungry.', vietnamese: 'Anh ấy không đói.' },
            ],
          },
        ],
        vocabulary: [
          { id: 'b1-v1', english: 'Happy', vietnamese: 'Hạnh phúc / Vui vẻ', pronunciation: '/ˈhæpi/', example: 'I am very happy today.', exampleVietnamese: 'Hôm nay tôi rất vui.', partOfSpeech: 'adjective' },
          { id: 'b1-v2', english: 'Sad', vietnamese: 'Buồn', pronunciation: '/sæd/', example: 'She is sad because of the news.', exampleVietnamese: 'Cô ấy buồn vì tin tức đó.', partOfSpeech: 'adjective' },
          { id: 'b1-v3', english: 'Tired', vietnamese: 'Mệt mỏi', pronunciation: '/taɪərd/', example: 'I am tired after work.', exampleVietnamese: 'Tôi mệt sau khi làm việc.', partOfSpeech: 'adjective' },
          { id: 'b1-v4', english: 'Hungry', vietnamese: 'Đói', pronunciation: '/ˈhʌŋɡri/', example: 'Are you hungry?', exampleVietnamese: 'Bạn có đói không?', partOfSpeech: 'adjective' },
          { id: 'b1-v5', english: 'Tall', vietnamese: 'Cao', pronunciation: '/tɔːl/', example: 'My brother is tall.', exampleVietnamese: 'Anh tôi cao.', partOfSpeech: 'adjective' },
          { id: 'b1-v6', english: 'Short', vietnamese: 'Thấp / Ngắn', pronunciation: '/ʃɔːrt/', example: 'She is short but strong.', exampleVietnamese: 'Cô ấy thấp nhưng khỏe.', partOfSpeech: 'adjective' },
          { id: 'b1-v7', english: 'Student', vietnamese: 'Học sinh / Sinh viên', pronunciation: '/ˈstjuːdnt/', example: 'I am a student at university.', exampleVietnamese: 'Tôi là sinh viên đại học.', partOfSpeech: 'noun' },
          { id: 'b1-v8', english: 'Doctor', vietnamese: 'Bác sĩ', pronunciation: '/ˈdɒktər/', example: 'He is a doctor at the hospital.', exampleVietnamese: 'Anh ấy là bác sĩ ở bệnh viện.', partOfSpeech: 'noun' },
        ],
        exercises: [
          {
            type: 'mcq', id: 'b1-e1',
            question: 'Chọn dạng đúng của "to be": "She ___ a teacher."',
            options: ['am', 'are', 'is', 'be'],
            correctIndex: 2,
            explanation: 'Với "She" (số ít, ngôi 3), dùng "is". I → am, He/She/It → is, You/We/They → are.',
          },
          {
            type: 'fill-blank', id: 'b1-e2',
            sentence: 'They ___ students from Vietnam.',
            answer: 'are',
            hint: '"They" dùng với dạng nào của "to be"?',
            explanation: '"They" là chủ ngữ số nhiều → dùng "are".',
          },
          {
            type: 'mcq', id: 'b1-e3',
            question: '"I am not happy" nghĩa là gì?',
            options: ['Tôi rất vui', 'Tôi không vui', 'Tôi vui', 'Chúng tôi không vui'],
            correctIndex: 1,
            explanation: '"am not" = phủ định của "am" → "Tôi không..."',
          },
          {
            type: 'ordering', id: 'b1-e4',
            instruction: 'Sắp xếp thành câu đúng:',
            words: ['a', 'am', 'I', 'doctor'],
            correctOrder: ['I', 'am', 'a', 'doctor'],
            vietnamese: 'Tôi là bác sĩ.',
          },
          {
            type: 'fill-blank', id: 'b1-e5',
            sentence: 'We ___ very tired after the long trip.',
            answer: 'are',
            hint: '"We" → ?',
            explanation: '"We" là chủ ngữ số nhiều → dùng "are". "are tired" = mệt.',
          },
        ],
        tags: ['grammar', 'to-be', 'present-simple'],
      },
      {
        id: 'b2',
        levelId: 'building',
        order: 2,
        title: 'WH Questions',
        titleVietnamese: 'Câu Hỏi WH',
        description: 'Học cách đặt câu hỏi với What, Where, When, Who, Why, How',
        emoji: '❓',
        estimatedMinutes: 15,
        xpReward: 50,
        difficulty: 'medium',
        theory: [
          {
            title: 'Câu hỏi với từ để hỏi (WH Questions)',
            content: `<p>Câu hỏi WH bắt đầu bằng các từ: <strong>What, Where, When, Who, Why, How</strong></p>
            <p>Cấu trúc: <strong>WH word + to be/do + subject?</strong></p>`,
            tip: '💡 "How" không bắt đầu bằng W nhưng vẫn được gọi là WH question!',
            examples: [
              { english: 'What is your name?', vietnamese: 'Tên bạn là gì?' },
              { english: 'Where are you from?', vietnamese: 'Bạn đến từ đâu?' },
              { english: 'How old are you?', vietnamese: 'Bạn bao nhiêu tuổi?' },
              { english: 'Why are you late?', vietnamese: 'Tại sao bạn đến muộn?' },
            ],
          },
        ],
        vocabulary: [
          { id: 'b2-v1', english: 'What', vietnamese: 'Cái gì / Gì', pronunciation: '/wɒt/', example: 'What is your job?', exampleVietnamese: 'Công việc của bạn là gì?', partOfSpeech: 'noun' },
          { id: 'b2-v2', english: 'Where', vietnamese: 'Ở đâu', pronunciation: '/wer/', example: 'Where do you live?', exampleVietnamese: 'Bạn sống ở đâu?', partOfSpeech: 'adverb' },
          { id: 'b2-v3', english: 'When', vietnamese: 'Khi nào', pronunciation: '/wen/', example: 'When is your birthday?', exampleVietnamese: 'Sinh nhật bạn khi nào?', partOfSpeech: 'adverb' },
          { id: 'b2-v4', english: 'Who', vietnamese: 'Ai', pronunciation: '/huː/', example: 'Who is your teacher?', exampleVietnamese: 'Giáo viên của bạn là ai?', partOfSpeech: 'noun' },
          { id: 'b2-v5', english: 'Why', vietnamese: 'Tại sao', pronunciation: '/waɪ/', example: 'Why are you crying?', exampleVietnamese: 'Tại sao bạn khóc?', partOfSpeech: 'adverb' },
          { id: 'b2-v6', english: 'How', vietnamese: 'Như thế nào / Bao nhiêu', pronunciation: '/haʊ/', example: 'How are you?', exampleVietnamese: 'Bạn khỏe không?', partOfSpeech: 'adverb' },
          { id: 'b2-v7', english: 'Name', vietnamese: 'Tên', pronunciation: '/neɪm/', example: 'My name is Minh.', exampleVietnamese: 'Tên tôi là Minh.', partOfSpeech: 'noun' },
          { id: 'b2-v8', english: 'Age', vietnamese: 'Tuổi', pronunciation: '/eɪdʒ/', example: 'What is your age?', exampleVietnamese: 'Bạn bao nhiêu tuổi?', partOfSpeech: 'noun' },
        ],
        exercises: [
          {
            type: 'mcq', id: 'b2-e1',
            question: 'Để hỏi "Bạn đến từ đâu?", dùng từ nào?',
            options: ['What', 'Who', 'Where', 'When'],
            correctIndex: 2,
            explanation: '"Where" = Ở đâu. "Where are you from?" = Bạn đến từ đâu?',
          },
          {
            type: 'fill-blank', id: 'b2-e2',
            sentence: '___ is your name?',
            answer: 'What',
            hint: 'Hỏi về TÊN của ai đó',
            explanation: '"What is your name?" = Tên bạn là gì?',
          },
          {
            type: 'matching', id: 'b2-e3',
            instruction: 'Nối câu hỏi với nghĩa:',
            pairs: [
              { left: 'What?', right: 'Cái gì?' },
              { left: 'Where?', right: 'Ở đâu?' },
              { left: 'Why?', right: 'Tại sao?' },
              { left: 'How?', right: 'Như thế nào?' },
            ],
          },
          {
            type: 'ordering', id: 'b2-e4',
            instruction: 'Sắp xếp thành câu hỏi đúng:',
            words: ['old', 'you', 'are', 'How'],
            correctOrder: ['How', 'old', 'are', 'you'],
            vietnamese: 'Bạn bao nhiêu tuổi?',
          },
        ],
        tags: ['questions', 'grammar', 'wh-words'],
      },
    ],
  },

  // ============================================================
  // LEVEL 3: DEVELOPING (A2)
  // ============================================================
  {
    id: 'developing',
    name: 'Developing',
    nameVietnamese: 'Phát Triển',
    description: 'Phát triển kỹ năng đọc hiểu, các thì động từ và từ vựng nâng cao hơn.',
    emoji: '🚀',
    colorClass: 'text-violet-600',
    bgGradient: 'from-violet-400 to-purple-500',
    order: 3,
    unlockRequirement: 'building',
    lessons: [
      {
        id: 'd1',
        levelId: 'developing',
        order: 1,
        title: 'Present Continuous',
        titleVietnamese: 'Thì Hiện Tại Tiếp Diễn',
        description: 'Học cách diễn tả hành động đang xảy ra ngay lúc này',
        emoji: '▶️',
        estimatedMinutes: 18,
        xpReward: 60,
        difficulty: 'medium',
        theory: [
          {
            title: 'Thì Hiện Tại Tiếp Diễn (Present Continuous)',
            content: `<p>Dùng để diễn tả hành động <strong>đang xảy ra ngay lúc nói</strong>.</p>
            <p><strong>Cấu trúc:</strong> <code>Subject + am/is/are + V-ing</code></p>
            <p><strong>Dấu hiệu nhận biết:</strong> now, right now, at the moment, at present</p>`,
            tip: '💡 Quy tắc thêm -ing: stop → stopping (nhân đôi phụ âm cuối), make → making (bỏ e), study → studying',
            examples: [
              { english: 'I am reading a book right now.', vietnamese: 'Tôi đang đọc sách ngay lúc này.' },
              { english: 'She is cooking dinner.', vietnamese: 'Cô ấy đang nấu bữa tối.' },
              { english: 'They are playing football.', vietnamese: 'Họ đang chơi bóng đá.' },
              { english: 'Are you listening to me?', vietnamese: 'Bạn có đang nghe tôi không?' },
            ],
          },
        ],
        vocabulary: [
          { id: 'd1-v1', english: 'Running', vietnamese: 'Đang chạy', pronunciation: '/ˈrʌnɪŋ/', example: 'He is running in the park.', exampleVietnamese: 'Anh ấy đang chạy trong công viên.', partOfSpeech: 'verb' },
          { id: 'd1-v2', english: 'Eating', vietnamese: 'Đang ăn', pronunciation: '/ˈiːtɪŋ/', example: 'She is eating breakfast.', exampleVietnamese: 'Cô ấy đang ăn sáng.', partOfSpeech: 'verb' },
          { id: 'd1-v3', english: 'Sleeping', vietnamese: 'Đang ngủ', pronunciation: '/ˈsliːpɪŋ/', example: 'The baby is sleeping.', exampleVietnamese: 'Em bé đang ngủ.', partOfSpeech: 'verb' },
          { id: 'd1-v4', english: 'Working', vietnamese: 'Đang làm việc', pronunciation: '/ˈwɜːrkɪŋ/', example: 'Dad is working from home.', exampleVietnamese: 'Bố đang làm việc ở nhà.', partOfSpeech: 'verb' },
          { id: 'd1-v5', english: 'Studying', vietnamese: 'Đang học', pronunciation: '/ˈstʌdiɪŋ/', example: 'I am studying English.', exampleVietnamese: 'Tôi đang học tiếng Anh.', partOfSpeech: 'verb' },
          { id: 'd1-v6', english: 'Playing', vietnamese: 'Đang chơi', pronunciation: '/ˈpleɪɪŋ/', example: 'The children are playing outside.', exampleVietnamese: 'Bọn trẻ đang chơi ngoài trời.', partOfSpeech: 'verb' },
          { id: 'd1-v7', english: 'Now', vietnamese: 'Bây giờ / Ngay lúc này', pronunciation: '/naʊ/', example: 'I am busy now.', exampleVietnamese: 'Tôi đang bận ngay lúc này.', partOfSpeech: 'adverb' },
          { id: 'd1-v8', english: 'At the moment', vietnamese: 'Tại thời điểm này', pronunciation: '/æt ðə ˈmoʊmənt/', example: 'She is sleeping at the moment.', exampleVietnamese: 'Cô ấy đang ngủ lúc này.', partOfSpeech: 'phrase' },
        ],
        exercises: [
          {
            type: 'mcq', id: 'd1-e1',
            question: 'Câu nào đúng về thì hiện tại tiếp diễn?',
            options: ['I reading a book.', 'I am reading a book.', 'I am read a book.', 'I reads a book.'],
            correctIndex: 1,
            explanation: 'Công thức: S + am/is/are + V-ing. "I am reading" = Tôi đang đọc.',
          },
          {
            type: 'fill-blank', id: 'd1-e2',
            sentence: 'She ___ cooking dinner right now.',
            answer: 'is',
            hint: '"She" dùng với dạng nào của "to be"?',
            explanation: 'She → is. "She is cooking" = Cô ấy đang nấu.',
          },
          {
            type: 'ordering', id: 'd1-e3',
            instruction: 'Sắp xếp thành câu đúng:',
            words: ['playing', 'are', 'They', 'football'],
            correctOrder: ['They', 'are', 'playing', 'football'],
            vietnamese: 'Họ đang chơi bóng đá.',
          },
          {
            type: 'mcq', id: 'd1-e4',
            question: '"I am study English" - câu này có lỗi sai ở đâu?',
            options: ['Thiếu "the"', '"study" phải là "studying"', '"am" phải là "is"', 'Không có lỗi'],
            correctIndex: 1,
            explanation: 'Sau "am/is/are" phải dùng V-ing: "I am studying English."',
          },
        ],
        tags: ['grammar', 'present-continuous', 'tenses'],
      },
    ],
  },

  // ============================================================
  // LEVEL 4: ADVANCING (B1)
  // ============================================================
  {
    id: 'advancing',
    name: 'Advancing',
    nameVietnamese: 'Nâng Cao',
    description: 'Nâng cao kỹ năng toàn diện với câu điều kiện, thì hoàn thành và từ vựng phong phú.',
    emoji: '🏆',
    colorClass: 'text-amber-600',
    bgGradient: 'from-amber-400 to-orange-500',
    order: 4,
    unlockRequirement: 'developing',
    lessons: [
      {
        id: 'a1',
        levelId: 'advancing',
        order: 1,
        title: 'Present Perfect',
        titleVietnamese: 'Thì Hiện Tại Hoàn Thành',
        description: 'Học cách dùng thì hiện tại hoàn thành để nói về kinh nghiệm và hành động vừa xong',
        emoji: '✅',
        estimatedMinutes: 20,
        xpReward: 75,
        difficulty: 'hard',
        theory: [
          {
            title: 'Thì Hiện Tại Hoàn Thành (Present Perfect)',
            content: `<p>Dùng để diễn tả:</p>
            <ul>
              <li>Kinh nghiệm đã trải qua trong cuộc đời</li>
              <li>Hành động vừa mới kết thúc có kết quả ảnh hưởng đến hiện tại</li>
            </ul>
            <p><strong>Cấu trúc:</strong> <code>Subject + have/has + V3 (past participle)</code></p>
            <p><strong>Dấu hiệu:</strong> already, yet, just, ever, never, for, since</p>`,
            tip: '💡 I/You/We/They → have | He/She/It → has',
            examples: [
              { english: 'I have visited Hanoi three times.', vietnamese: 'Tôi đã đến Hà Nội ba lần.' },
              { english: 'She has just finished her homework.', vietnamese: 'Cô ấy vừa mới làm xong bài tập.' },
              { english: 'Have you ever eaten sushi?', vietnamese: 'Bạn đã từng ăn sushi chưa?' },
              { english: 'I have never been to Japan.', vietnamese: 'Tôi chưa bao giờ đến Nhật.' },
            ],
          },
        ],
        vocabulary: [
          { id: 'a1-v1', english: 'Already', vietnamese: 'Rồi / Đã rồi', pronunciation: '/ɔːlˈredi/', example: 'I have already eaten.', exampleVietnamese: 'Tôi đã ăn rồi.', partOfSpeech: 'adverb' },
          { id: 'a1-v2', english: 'Yet', vietnamese: 'Chưa / Vẫn chưa', pronunciation: '/jet/', example: 'Have you finished yet?', exampleVietnamese: 'Bạn đã xong chưa?', partOfSpeech: 'adverb' },
          { id: 'a1-v3', english: 'Just', vietnamese: 'Vừa mới', pronunciation: '/dʒʌst/', example: 'She has just arrived.', exampleVietnamese: 'Cô ấy vừa mới đến.', partOfSpeech: 'adverb' },
          { id: 'a1-v4', english: 'Ever', vietnamese: 'Đã từng', pronunciation: '/ˈevər/', example: 'Have you ever been to Paris?', exampleVietnamese: 'Bạn đã từng đến Paris chưa?', partOfSpeech: 'adverb' },
          { id: 'a1-v5', english: 'Never', vietnamese: 'Chưa bao giờ', pronunciation: '/ˈnevər/', example: 'I have never tried skydiving.', exampleVietnamese: 'Tôi chưa bao giờ nhảy dù.', partOfSpeech: 'adverb' },
          { id: 'a1-v6', english: 'Experience', vietnamese: 'Kinh nghiệm / Trải nghiệm', pronunciation: '/ɪkˈspɪriəns/', example: 'I have experience working abroad.', exampleVietnamese: 'Tôi có kinh nghiệm làm việc ở nước ngoài.', partOfSpeech: 'noun' },
          { id: 'a1-v7', english: 'Since', vietnamese: 'Từ khi / Kể từ', pronunciation: '/sɪns/', example: 'I have lived here since 2020.', exampleVietnamese: 'Tôi sống ở đây từ năm 2020.', partOfSpeech: 'preposition' },
          { id: 'a1-v8', english: 'For', vietnamese: 'Trong (khoảng thời gian)', pronunciation: '/fɔːr/', example: 'I have studied English for 2 years.', exampleVietnamese: 'Tôi đã học tiếng Anh được 2 năm.', partOfSpeech: 'preposition' },
        ],
        exercises: [
          {
            type: 'mcq', id: 'a1-e1',
            question: 'Câu nào đúng về thì hiện tại hoàn thành?',
            options: ['I have go to Paris.', 'I have been to Paris.', 'I has been to Paris.', 'I went to Paris have.'],
            correctIndex: 1,
            explanation: '"have been" = đã từng đến. "been" là V3 (quá khứ phân từ) của "be/go" (khi nói về địa điểm).',
          },
          {
            type: 'fill-blank', id: 'a1-e2',
            sentence: 'She ___ just finished her report.',
            answer: 'has',
            hint: '"She" → have hay has?',
            explanation: 'He/She/It → "has". "She has just finished" = Cô ấy vừa mới hoàn thành.',
          },
          {
            type: 'mcq', id: 'a1-e3',
            question: '"Have you ever eaten durian?" - Câu này hỏi về điều gì?',
            options: ['Hành động đang xảy ra', 'Kinh nghiệm trong quá khứ', 'Kế hoạch tương lai', 'Thói quen'],
            correctIndex: 1,
            explanation: '"ever" + present perfect → hỏi về kinh nghiệm đã từng trải qua trong cuộc đời.',
          },
          {
            type: 'ordering', id: 'a1-e4',
            instruction: 'Sắp xếp thành câu đúng:',
            words: ['never', 'I', 'sushi', 'eaten', 'have'],
            correctOrder: ['I', 'have', 'never', 'eaten', 'sushi'],
            vietnamese: 'Tôi chưa bao giờ ăn sushi.',
          },
        ],
        tags: ['grammar', 'present-perfect', 'tenses'],
      },
    ],
  },
];
