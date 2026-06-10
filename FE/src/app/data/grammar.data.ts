import { GrammarCategory } from '../core/models/grammar.model';

export const GRAMMAR_CATEGORIES: GrammarCategory[] = [
  // ═══════════════════════════════════════════
  // CATEGORY 1: CÁC THÌ (TENSES)
  // ═══════════════════════════════════════════
  {
    id: 'tenses',
    name: 'Tenses',
    nameVietnamese: 'Các Thì',
    emoji: '🕐',
    description: 'Nắm vững 6 thì cơ bản và quan trọng nhất trong tiếng Anh',
    colorClass: 'text-blue-600',
    bgGradient: 'from-blue-500 to-indigo-600',
    topics: [
      // ── TOPIC 1: Present Simple ──
      {
        id: 'present-simple',
        categoryId: 'tenses',
        title: 'Present Simple',
        titleVietnamese: 'Thì Hiện Tại Đơn',
        description: 'Diễn tả thói quen, sự thật hiển nhiên, lịch trình cố định',
        difficulty: 'easy',
        emoji: '🔄',
        order: 1,
        whenToUse: [
          { description: 'Thói quen, hành động lặp đi lặp lại', example: 'I drink coffee every morning.' },
          { description: 'Sự thật hiển nhiên, chân lý', example: 'The sun rises in the east.' },
          { description: 'Lịch trình, thời gian biểu cố định', example: 'The train leaves at 8 AM.' },
          { description: 'Sở thích, cảm xúc, trạng thái', example: 'She loves music.' },
        ],
        formulas: [
          { type: 'affirmative', label: 'Khẳng định', formula: 'S + V(s/es) + O', note: 'Thêm -s/-es với chủ ngữ He/She/It' },
          { type: 'negative', label: 'Phủ định', formula: 'S + do/does + not + V(nguyên thể) + O', note: "don't (I/You/We/They) · doesn't (He/She/It)" },
          { type: 'question', label: 'Nghi vấn', formula: 'Do/Does + S + V(nguyên thể) + O?', note: 'Do → I/You/We/They · Does → He/She/It' },
        ],
        signalWords: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day/week/month/year', 'on Mondays', 'in the morning', 'twice a week'],
        examples: [
          { type: 'affirmative', english: 'I go to school every day.', vietnamese: 'Tôi đi học mỗi ngày.', highlight: 'go' },
          { type: 'affirmative', english: 'She speaks English very well.', vietnamese: 'Cô ấy nói tiếng Anh rất giỏi.', highlight: 'speaks' },
          { type: 'affirmative', english: 'We live in Ho Chi Minh City.', vietnamese: 'Chúng tôi sống ở Thành phố Hồ Chí Minh.', highlight: 'live' },
          { type: 'negative', english: "He doesn't like coffee.", vietnamese: 'Anh ấy không thích cà phê.', highlight: "doesn't like" },
          { type: 'negative', english: "They don't work on Sundays.", vietnamese: 'Họ không làm việc vào Chủ nhật.', highlight: "don't work" },
          { type: 'question', english: 'Do you speak Vietnamese?', vietnamese: 'Bạn có nói tiếng Việt không?', highlight: 'Do' },
          { type: 'question', english: 'Does she live in Hanoi?', vietnamese: 'Cô ấy có sống ở Hà Nội không?', highlight: 'Does' },
        ],
        commonMistakes: [
          { wrong: 'He go to school.', correct: 'He goes to school.', explanation: 'Với chủ ngữ ngôi 3 số ít (He/She/It), động từ phải thêm -s/-es.' },
          { wrong: "She don't like fish.", correct: "She doesn't like fish.", explanation: "Với He/She/It, phải dùng 'doesn't', không dùng 'don't'." },
          { wrong: 'Does he goes to work?', correct: 'Does he go to work?', explanation: "Sau 'Does', động từ phải ở dạng nguyên thể (không thêm -s)." },
          { wrong: 'I am go to school.', correct: 'I go to school.', explanation: "Không dùng 'am/is/are' trước động từ thường. 'Am/is/are' chỉ dùng trước tính từ, danh từ, hoặc V-ing." },
        ],
        comparison: {
          title: 'Present Simple vs Present Continuous',
          headers: ['Present Simple', 'Present Continuous'],
          rows: [
            { left: 'Thói quen, lặp đi lặp lại', right: 'Đang xảy ra ngay lúc nói' },
            { left: 'I drink coffee every day.', right: 'I am drinking coffee now.' },
            { left: 'always, usually, often', right: 'now, right now, at the moment' },
            { left: 'S + V(s/es)', right: 'S + am/is/are + V-ing' },
          ],
        },
        tips: [
          '🎯 Mẹo nhớ -s/-es: "He, She, It → thêm s fit!" (phải thêm s cho vừa)',
          '💡 Nhớ "does" đã mang -es rồi, nên động từ sau nó KHÔNG thêm -s nữa',
          '📝 Dấu hiệu dễ nhất: thấy "every" → dùng Present Simple',
        ],
        exercises: [
          { type: 'mcq', question: 'She ___ to work by bus every day.', options: ['go', 'goes', 'going', 'is go'], correctIndex: 1, explanation: 'She là ngôi 3 số ít → động từ thêm -es: goes' },
          { type: 'mcq', question: '___ they live in Hanoi?', options: ['Does', 'Do', 'Is', 'Are'], correctIndex: 1, explanation: 'They là ngôi nhiều → dùng "Do"' },
          { type: 'fill-blank', sentence: 'He ___ (not/like) spicy food.', answer: "doesn't like", hint: "Phủ định với He", explanation: "He + doesn't + V nguyên thể" },
          { type: 'mcq', question: 'Water ___ at 100 degrees Celsius.', options: ['boil', 'boils', 'is boiling', 'boiled'], correctIndex: 1, explanation: 'Sự thật khoa học → Present Simple, Water là ngôi 3 số ít → boils' },
          { type: 'fill-blank', sentence: 'My mother ___ (cook) dinner every evening.', answer: 'cooks', hint: 'My mother = She', explanation: 'She + V-s: cooks' },
        ],
      },

      // ── TOPIC 2: Present Continuous ──
      {
        id: 'present-continuous',
        categoryId: 'tenses',
        title: 'Present Continuous',
        titleVietnamese: 'Thì Hiện Tại Tiếp Diễn',
        description: 'Diễn tả hành động đang xảy ra ngay lúc nói hoặc kế hoạch tương lai gần',
        difficulty: 'easy',
        emoji: '⏳',
        order: 2,
        whenToUse: [
          { description: 'Hành động đang xảy ra ngay lúc nói', example: 'I am studying English now.' },
          { description: 'Kế hoạch đã được sắp xếp trong tương lai gần', example: 'We are meeting tomorrow.' },
          { description: 'Tình huống tạm thời', example: 'He is staying at a hotel this week.' },
          { description: 'Phàn nàn với "always"', example: 'She is always losing her keys!' },
        ],
        formulas: [
          { type: 'affirmative', label: 'Khẳng định', formula: 'S + am/is/are + V-ing + O', note: 'am (I) · is (He/She/It) · are (You/We/They)' },
          { type: 'negative', label: 'Phủ định', formula: 'S + am/is/are + not + V-ing + O' },
          { type: 'question', label: 'Nghi vấn', formula: 'Am/Is/Are + S + V-ing + O?' },
        ],
        signalWords: ['now', 'right now', 'at the moment', 'at present', 'currently', 'today', 'this week/month', 'Look!', 'Listen!'],
        examples: [
          { type: 'affirmative', english: 'I am learning English right now.', vietnamese: 'Tôi đang học tiếng Anh ngay lúc này.', highlight: 'am learning' },
          { type: 'affirmative', english: 'She is cooking dinner.', vietnamese: 'Cô ấy đang nấu bữa tối.', highlight: 'is cooking' },
          { type: 'affirmative', english: 'They are playing football in the park.', vietnamese: 'Họ đang chơi bóng đá trong công viên.', highlight: 'are playing' },
          { type: 'negative', english: "He isn't watching TV.", vietnamese: 'Anh ấy không đang xem TV.', highlight: "isn't watching" },
          { type: 'negative', english: "We aren't sleeping.", vietnamese: 'Chúng tôi không đang ngủ.', highlight: "aren't sleeping" },
          { type: 'question', english: 'Are you listening to me?', vietnamese: 'Bạn có đang nghe tôi nói không?', highlight: 'Are' },
          { type: 'question', english: 'Is it raining outside?', vietnamese: 'Trời có đang mưa bên ngoài không?', highlight: 'Is' },
        ],
        commonMistakes: [
          { wrong: 'I studying English now.', correct: 'I am studying English now.', explanation: "Thiếu 'am/is/are' trước V-ing. Phải có: S + am/is/are + V-ing." },
          { wrong: 'She is study English.', correct: 'She is studying English.', explanation: "Phải thêm '-ing' vào sau động từ khi dùng thì HTTD." },
          { wrong: 'I am knowing the answer.', correct: 'I know the answer.', explanation: "'Know' là động từ trạng thái (stative verb), không dùng với thì tiếp diễn." },
        ],
        tips: [
          '🎯 Thấy "Look!", "Listen!", "now" → dùng Present Continuous',
          '💡 Một số động từ KHÔNG dùng tiếp diễn: know, want, need, love, like, hate, believe, understand',
          '📝 Quy tắc thêm -ing: bỏ -e rồi thêm -ing (make → making), nhân đôi phụ âm cuối (run → running)',
        ],
        exercises: [
          { type: 'mcq', question: 'Look! The children ___ in the garden.', options: ['play', 'plays', 'are playing', 'is playing'], correctIndex: 2, explanation: '"Look!" → dùng Present Continuous. The children (they) → are playing' },
          { type: 'fill-blank', sentence: 'She ___ (read) a book at the moment.', answer: 'is reading', hint: 'She + is + V-ing', explanation: 'She + is + V-ing: is reading' },
          { type: 'mcq', question: 'I ___ the answer to this question.', options: ['am knowing', 'know', 'knowing', 'am know'], correctIndex: 1, explanation: '"know" là stative verb → dùng Present Simple, không dùng tiếp diễn' },
          { type: 'fill-blank', sentence: 'They ___ (not/work) today. It is a holiday.', answer: "aren't working", hint: 'They + are not + V-ing', explanation: "They + aren't + V-ing: aren't working" },
        ],
      },

      // ── TOPIC 3: Past Simple ──
      {
        id: 'past-simple',
        categoryId: 'tenses',
        title: 'Past Simple',
        titleVietnamese: 'Thì Quá Khứ Đơn',
        description: 'Diễn tả hành động đã xảy ra và kết thúc trong quá khứ',
        difficulty: 'medium',
        emoji: '⏪',
        order: 3,
        whenToUse: [
          { description: 'Hành động đã xảy ra và kết thúc trong quá khứ', example: 'I visited Da Nang last summer.' },
          { description: 'Một chuỗi hành động trong quá khứ', example: 'She woke up, brushed her teeth, and went to school.' },
          { description: 'Thói quen trong quá khứ (không còn nữa)', example: 'When I was young, I played soccer every day.' },
        ],
        formulas: [
          { type: 'affirmative', label: 'Khẳng định', formula: 'S + V(ed/V2) + O', note: 'Động từ có quy tắc: thêm -ed. Bất quy tắc: học thuộc (go→went, eat→ate)' },
          { type: 'negative', label: 'Phủ định', formula: "S + did not (didn't) + V(nguyên thể) + O" },
          { type: 'question', label: 'Nghi vấn', formula: 'Did + S + V(nguyên thể) + O?' },
        ],
        signalWords: ['yesterday', 'last week/month/year', 'ago', 'in 2020', 'when I was young', 'this morning (đã qua)'],
        examples: [
          { type: 'affirmative', english: 'I watched a movie yesterday.', vietnamese: 'Tôi đã xem một bộ phim hôm qua.', highlight: 'watched' },
          { type: 'affirmative', english: 'She went to Japan last year.', vietnamese: 'Cô ấy đã đi Nhật Bản năm ngoái.', highlight: 'went' },
          { type: 'affirmative', english: 'They ate pho for breakfast.', vietnamese: 'Họ đã ăn phở vào bữa sáng.', highlight: 'ate' },
          { type: 'negative', english: "I didn't go to school yesterday.", vietnamese: 'Tôi đã không đi học hôm qua.', highlight: "didn't go" },
          { type: 'negative', english: "He didn't call me.", vietnamese: 'Anh ấy đã không gọi cho tôi.', highlight: "didn't call" },
          { type: 'question', english: 'Did you eat breakfast this morning?', vietnamese: 'Bạn đã ăn sáng sáng nay chưa?', highlight: 'Did' },
          { type: 'question', english: 'Did she pass the exam?', vietnamese: 'Cô ấy có đậu kỳ thi không?', highlight: 'Did' },
        ],
        commonMistakes: [
          { wrong: 'I goed to school yesterday.', correct: 'I went to school yesterday.', explanation: '"Go" là động từ bất quy tắc: go → went (không thêm -ed).' },
          { wrong: "She didn't went home.", correct: "She didn't go home.", explanation: "Sau 'didn't', động từ phải ở dạng nguyên thể." },
          { wrong: 'Did you went to the party?', correct: 'Did you go to the party?', explanation: "Sau 'Did', động từ phải ở dạng nguyên thể." },
          { wrong: 'I was watch TV last night.', correct: 'I watched TV last night.', explanation: "Không dùng 'was/were' trước động từ thường ở thì Past Simple." },
        ],
        tips: [
          '🎯 Quy tắc thêm -ed: play → played, stop → stopped, study → studied',
          '💡 20 động từ bất quy tắc phổ biến nhất nên học thuộc: go-went, eat-ate, see-saw, do-did, have-had, make-made, get-got, come-came, take-took, give-gave',
          '📝 Mẹo nhớ: "did" đã mang ý quá khứ → động từ sau giữ nguyên thể',
        ],
        exercises: [
          { type: 'mcq', question: 'She ___ to the market yesterday.', options: ['go', 'goes', 'went', 'going'], correctIndex: 2, explanation: 'Yesterday → Past Simple. Go → went (bất quy tắc)' },
          { type: 'fill-blank', sentence: "They ___ (not/come) to the party last night.", answer: "didn't come", hint: "Phủ định QKĐ", explanation: "didn't + V nguyên thể: didn't come" },
          { type: 'mcq', question: '___ you finish your homework?', options: ['Do', 'Does', 'Did', 'Are'], correctIndex: 2, explanation: 'Câu hỏi quá khứ → dùng "Did"' },
          { type: 'fill-blank', sentence: 'I ___ (buy) a new phone last week.', answer: 'bought', hint: 'buy là động từ bất quy tắc', explanation: 'buy → bought (bất quy tắc)' },
        ],
      },

      // ── TOPIC 4: Past Continuous ──
      {
        id: 'past-continuous',
        categoryId: 'tenses',
        title: 'Past Continuous',
        titleVietnamese: 'Thì Quá Khứ Tiếp Diễn',
        description: 'Diễn tả hành động đang xảy ra tại một thời điểm trong quá khứ',
        difficulty: 'medium',
        emoji: '⏳',
        order: 4,
        whenToUse: [
          { description: 'Hành động đang xảy ra tại một thời điểm cụ thể trong quá khứ', example: 'At 8 PM last night, I was studying.' },
          { description: 'Một hành động đang xảy ra thì bị ngắt bởi hành động khác', example: 'I was cooking when the phone rang.' },
          { description: 'Hai hành động xảy ra đồng thời trong quá khứ', example: 'While she was reading, he was watching TV.' },
        ],
        formulas: [
          { type: 'affirmative', label: 'Khẳng định', formula: 'S + was/were + V-ing + O', note: 'was (I/He/She/It) · were (You/We/They)' },
          { type: 'negative', label: 'Phủ định', formula: 'S + was/were + not + V-ing + O' },
          { type: 'question', label: 'Nghi vấn', formula: 'Was/Were + S + V-ing + O?' },
        ],
        signalWords: ['at that time', 'at 8 PM last night', 'when', 'while', 'as', 'all day yesterday'],
        examples: [
          { type: 'affirmative', english: 'I was sleeping at 10 PM last night.', vietnamese: 'Tôi đang ngủ lúc 10 giờ tối qua.', highlight: 'was sleeping' },
          { type: 'affirmative', english: 'They were playing games when Mom came home.', vietnamese: 'Họ đang chơi game khi mẹ về nhà.', highlight: 'were playing' },
          { type: 'negative', english: "She wasn't listening to the teacher.", vietnamese: 'Cô ấy không đang nghe giáo viên.', highlight: "wasn't listening" },
          { type: 'question', english: 'Were you studying at 9 PM?', vietnamese: 'Bạn có đang học lúc 9 giờ tối không?', highlight: 'Were' },
          { type: 'question', english: 'What were they doing when you arrived?', vietnamese: 'Họ đang làm gì khi bạn đến?', highlight: 'were' },
        ],
        commonMistakes: [
          { wrong: 'I was sleep when you called.', correct: 'I was sleeping when you called.', explanation: 'Phải dùng V-ing sau was/were.' },
          { wrong: 'While I was cooking, the phone was rang.', correct: 'While I was cooking, the phone rang.', explanation: 'Hành động ngắt (ngắn) dùng Past Simple, không dùng tiếp diễn.' },
        ],
        comparison: {
          title: 'Past Simple vs Past Continuous',
          headers: ['Past Simple', 'Past Continuous'],
          rows: [
            { left: 'Hành động đã hoàn thành', right: 'Hành động đang diễn ra' },
            { left: 'I ate dinner.', right: 'I was eating dinner (when...)' },
            { left: 'yesterday, last week, ago', right: 'when, while, at that time' },
            { left: 'S + V-ed/V2', right: 'S + was/were + V-ing' },
          ],
        },
        tips: [
          '🎯 Cấu trúc thường gặp: "When + Past Simple, Past Continuous" hoặc "While + Past Continuous, Past Simple"',
          '💡 "When" → hành động ngắn (Past Simple). "While" → hành động dài (Past Continuous)',
        ],
        exercises: [
          { type: 'mcq', question: 'I ___ TV when the electricity went off.', options: ['watched', 'was watching', 'am watching', 'watch'], correctIndex: 1, explanation: 'Hành động đang diễn ra thì bị ngắt → Past Continuous' },
          { type: 'fill-blank', sentence: 'While she ___ (sleep), someone knocked on the door.', answer: 'was sleeping', hint: 'While + Past Continuous', explanation: 'While + S + was/were + V-ing' },
          { type: 'mcq', question: 'What ___ you doing at 3 PM yesterday?', options: ['was', 'were', 'did', 'are'], correctIndex: 1, explanation: 'You → were + V-ing' },
        ],
      },

      // ── TOPIC 5: Present Perfect ──
      {
        id: 'present-perfect',
        categoryId: 'tenses',
        title: 'Present Perfect',
        titleVietnamese: 'Thì Hiện Tại Hoàn Thành',
        description: 'Diễn tả hành động đã xảy ra trong quá khứ nhưng có liên hệ đến hiện tại',
        difficulty: 'hard',
        emoji: '✅',
        order: 5,
        whenToUse: [
          { description: 'Hành động xảy ra trong quá khứ, không rõ thời điểm cụ thể', example: 'I have visited Da Nang.' },
          { description: 'Hành động bắt đầu trong quá khứ và kéo dài đến hiện tại', example: 'She has lived here for 5 years.' },
          { description: 'Trải nghiệm, kinh nghiệm', example: 'Have you ever eaten sushi?' },
          { description: 'Hành động vừa mới xảy ra', example: 'I have just finished my homework.' },
        ],
        formulas: [
          { type: 'affirmative', label: 'Khẳng định', formula: 'S + have/has + V3 (past participle) + O', note: 'have (I/You/We/They) · has (He/She/It)' },
          { type: 'negative', label: 'Phủ định', formula: "S + have/has + not + V3 + O", note: "haven't / hasn't" },
          { type: 'question', label: 'Nghi vấn', formula: 'Have/Has + S + V3 + O?' },
        ],
        signalWords: ['already', 'just', 'yet', 'ever', 'never', 'since', 'for', 'so far', 'up to now', 'recently', 'lately'],
        examples: [
          { type: 'affirmative', english: 'I have already eaten lunch.', vietnamese: 'Tôi đã ăn trưa rồi.', highlight: 'have eaten' },
          { type: 'affirmative', english: 'She has lived in Saigon since 2019.', vietnamese: 'Cô ấy đã sống ở Sài Gòn từ năm 2019.', highlight: 'has lived' },
          { type: 'affirmative', english: 'They have just arrived.', vietnamese: 'Họ vừa mới đến.', highlight: 'have just arrived' },
          { type: 'negative', english: "I haven't finished my homework yet.", vietnamese: 'Tôi chưa hoàn thành bài tập về nhà.', highlight: "haven't finished" },
          { type: 'question', english: 'Have you ever been to Japan?', vietnamese: 'Bạn đã từng đến Nhật Bản chưa?', highlight: 'Have' },
          { type: 'question', english: 'Has she called you?', vietnamese: 'Cô ấy đã gọi cho bạn chưa?', highlight: 'Has' },
        ],
        commonMistakes: [
          { wrong: 'I have went to Da Nang.', correct: 'I have gone/been to Da Nang.', explanation: "Sau have/has phải dùng V3 (past participle): go → gone/been." },
          { wrong: 'She has live here for 5 years.', correct: 'She has lived here for 5 years.', explanation: "Phải dùng V3: live → lived." },
          { wrong: 'I have visited Da Nang yesterday.', correct: 'I visited Da Nang yesterday.', explanation: "Có thời gian cụ thể (yesterday) → dùng Past Simple, KHÔNG dùng Present Perfect." },
        ],
        comparison: {
          title: 'Present Perfect vs Past Simple',
          headers: ['Present Perfect', 'Past Simple'],
          rows: [
            { left: 'Không rõ thời điểm', right: 'Thời điểm rõ ràng' },
            { left: "I've been to Japan.", right: 'I went to Japan last year.' },
            { left: 'already, yet, ever, never, since, for', right: 'yesterday, last week, ago, in 2020' },
            { left: 'S + have/has + V3', right: 'S + V-ed/V2' },
          ],
        },
        tips: [
          '🎯 "since" + mốc thời gian (since 2020). "for" + khoảng thời gian (for 5 years)',
          '💡 "already" → khẳng định. "yet" → phủ định/nghi vấn',
          '📝 V3 có quy tắc = V-ed. V3 bất quy tắc phải học thuộc (eat-ate-eaten, go-went-gone)',
        ],
        exercises: [
          { type: 'mcq', question: 'She ___ here since 2018.', options: ['lives', 'lived', 'has lived', 'is living'], correctIndex: 2, explanation: '"since 2018" → Present Perfect: has lived' },
          { type: 'fill-blank', sentence: 'I ___ (never/eat) sushi before.', answer: 'have never eaten', hint: 'Trải nghiệm chưa từng', explanation: 'I + have never + V3: have never eaten' },
          { type: 'mcq', question: '___ you ever been to Paris?', options: ['Did', 'Do', 'Have', 'Were'], correctIndex: 2, explanation: '"ever" → Present Perfect → Have' },
          { type: 'fill-blank', sentence: 'They ___ (just/finish) their project.', answer: 'have just finished', hint: 'Vừa mới hoàn thành', explanation: 'They + have just + V3: have just finished' },
        ],
      },

      // ── TOPIC 6: Future Simple ──
      {
        id: 'future-simple',
        categoryId: 'tenses',
        title: 'Future Simple',
        titleVietnamese: 'Thì Tương Lai Đơn',
        description: 'Diễn tả hành động sẽ xảy ra trong tương lai, dự đoán, quyết định tức thì',
        difficulty: 'medium',
        emoji: '🚀',
        order: 6,
        whenToUse: [
          { description: 'Dự đoán (không có bằng chứng cụ thể)', example: 'I think it will rain tomorrow.' },
          { description: 'Quyết định tức thì (ngay lúc nói)', example: "I'll help you with that." },
          { description: 'Lời hứa, đề nghị', example: "I'll call you tonight." },
          { description: 'Kế hoạch đã lên sẵn (be going to)', example: 'We are going to travel to Da Lat next week.' },
          { description: 'Dự đoán có bằng chứng (be going to)', example: 'Look at those clouds. It is going to rain.' },
        ],
        formulas: [
          { type: 'affirmative', label: 'will - Khẳng định', formula: "S + will + V(nguyên thể) + O", note: "Viết tắt: I'll, She'll, They'll" },
          { type: 'negative', label: 'will - Phủ định', formula: "S + will not (won't) + V(nguyên thể) + O" },
          { type: 'question', label: 'will - Nghi vấn', formula: 'Will + S + V(nguyên thể) + O?' },
          { type: 'affirmative', label: 'going to - Khẳng định', formula: 'S + am/is/are + going to + V(nguyên thể) + O' },
        ],
        signalWords: ['tomorrow', 'next week/month/year', 'in the future', 'soon', 'I think...', 'I promise...', 'probably'],
        examples: [
          { type: 'affirmative', english: 'I will study harder next semester.', vietnamese: 'Tôi sẽ học chăm hơn kỳ tới.', highlight: 'will study' },
          { type: 'affirmative', english: "Don't worry, I'll help you.", vietnamese: 'Đừng lo, tôi sẽ giúp bạn.', highlight: "I'll help" },
          { type: 'affirmative', english: 'We are going to visit grandma this weekend.', vietnamese: 'Chúng tôi sẽ đi thăm bà cuối tuần này.', highlight: 'are going to visit' },
          { type: 'negative', english: "I won't be late again.", vietnamese: 'Tôi sẽ không trễ nữa.', highlight: "won't be" },
          { type: 'question', english: 'Will you come to the party?', vietnamese: 'Bạn sẽ đến bữa tiệc chứ?', highlight: 'Will' },
        ],
        commonMistakes: [
          { wrong: 'I will to go home.', correct: 'I will go home.', explanation: "Sau 'will' dùng V nguyên thể, KHÔNG có 'to'." },
          { wrong: 'She wills help us.', correct: 'She will help us.', explanation: "'Will' không thay đổi theo chủ ngữ (không thêm -s)." },
        ],
        comparison: {
          title: 'Will vs Be Going To',
          headers: ['Will', 'Be Going To'],
          rows: [
            { left: 'Quyết định tức thì', right: 'Kế hoạch đã có sẵn' },
            { left: "OK, I'll buy it now.", right: "I'm going to buy a car next month." },
            { left: 'Dự đoán (ý kiến cá nhân)', right: 'Dự đoán (có bằng chứng)' },
            { left: 'I think she will pass.', right: 'Look! It is going to rain.' },
          ],
        },
        tips: [
          '🎯 "will" = quyết định ngay lúc nói. "going to" = đã lên kế hoạch trước',
          '💡 Sau "will" → V nguyên thể (không to, không -s, không -ed, không -ing)',
        ],
        exercises: [
          { type: 'mcq', question: 'I think she ___ the exam.', options: ['passes', 'will pass', 'is going to pass', 'passed'], correctIndex: 1, explanation: '"I think" → dự đoán cá nhân → will' },
          { type: 'fill-blank', sentence: "Don't worry. I ___ (help) you.", answer: 'will help', hint: 'Quyết định tức thì', explanation: "Quyết định ngay lúc nói → will + V: will help" },
          { type: 'mcq', question: 'Look at those dark clouds! It ___ rain.', options: ['will', 'is going to', 'is', 'does'], correctIndex: 1, explanation: 'Có bằng chứng (dark clouds) → "is going to"' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // CATEGORY 2: CẤU TRÚC CÂU
  // ═══════════════════════════════════════════
  {
    id: 'sentence-structure',
    name: 'Sentence Structure',
    nameVietnamese: 'Cấu Trúc Câu',
    emoji: '🏗️',
    description: 'Học cách đặt câu hỏi, so sánh, câu điều kiện',
    colorClass: 'text-emerald-600',
    bgGradient: 'from-emerald-500 to-teal-600',
    topics: [
      // ── TOPIC 7: Questions ──
      {
        id: 'questions',
        categoryId: 'sentence-structure',
        title: 'Yes/No & WH Questions',
        titleVietnamese: 'Câu Hỏi Yes/No & WH',
        description: 'Cách đặt câu hỏi đúng chuẩn trong tiếng Anh',
        difficulty: 'easy',
        emoji: '❓',
        order: 1,
        whenToUse: [
          { description: 'Câu hỏi Yes/No: hỏi để xác nhận (trả lời Yes hoặc No)', example: 'Do you like coffee? – Yes, I do.' },
          { description: 'Câu hỏi WH: hỏi thông tin cụ thể (What, Where, When, Who, Why, How)', example: 'Where do you live? – I live in Saigon.' },
        ],
        formulas: [
          { type: 'question', label: 'Yes/No (thì hiện tại)', formula: 'Do/Does + S + V + O?', note: 'Trả lời: Yes, S + do/does. No, S + don\'t/doesn\'t.' },
          { type: 'question', label: 'Yes/No (với to be)', formula: 'Am/Is/Are + S + ...?', note: 'Trả lời: Yes, S + am/is/are. No, S + am not/isn\'t/aren\'t.' },
          { type: 'question', label: 'WH Questions', formula: 'WH + do/does/did/am/is/are + S + V + O?', note: 'What (cái gì), Where (ở đâu), When (khi nào), Who (ai), Why (tại sao), How (như thế nào)' },
        ],
        signalWords: ['What', 'Where', 'When', 'Who', 'Why', 'How', 'How many', 'How much', 'How often', 'How old'],
        examples: [
          { type: 'question', english: 'Do you speak English?', vietnamese: 'Bạn có nói tiếng Anh không?', highlight: 'Do' },
          { type: 'question', english: 'Is she a teacher?', vietnamese: 'Cô ấy có phải là giáo viên không?', highlight: 'Is' },
          { type: 'question', english: 'What is your name?', vietnamese: 'Bạn tên là gì?', highlight: 'What' },
          { type: 'question', english: 'Where do you live?', vietnamese: 'Bạn sống ở đâu?', highlight: 'Where do' },
          { type: 'question', english: 'When did you arrive?', vietnamese: 'Bạn đến khi nào?', highlight: 'When did' },
          { type: 'question', english: 'How old are you?', vietnamese: 'Bạn bao nhiêu tuổi?', highlight: 'How old' },
        ],
        commonMistakes: [
          { wrong: 'Where you live?', correct: 'Where do you live?', explanation: "Câu hỏi WH cần trợ động từ 'do/does/did'." },
          { wrong: 'What does she likes?', correct: 'What does she like?', explanation: "Sau 'does', động từ giữ nguyên thể." },
          { wrong: 'Why you are sad?', correct: 'Why are you sad?', explanation: "Đảo 'are' lên trước chủ ngữ 'you' trong câu hỏi." },
        ],
        tips: [
          '🎯 Câu hỏi = đảo trợ động từ lên trước chủ ngữ',
          '💡 "Who" làm chủ ngữ không cần trợ động từ: "Who called you?" (KHÔNG: "Who did call you?")',
          '📝 "How many" + danh từ đếm được. "How much" + danh từ không đếm được',
        ],
        exercises: [
          { type: 'mcq', question: '___ do you go to school?', options: ['What', 'How', 'Where', 'Who'], correctIndex: 1, explanation: 'Hỏi phương tiện/cách thức → How' },
          { type: 'fill-blank', sentence: '___ is your birthday?', answer: 'When', hint: 'Hỏi thời gian', explanation: 'Hỏi thời gian → When' },
          { type: 'mcq', question: '___ she a student?', options: ['Do', 'Does', 'Is', 'Are'], correctIndex: 2, explanation: 'She + tính từ/danh từ → dùng "Is"' },
        ],
      },

      // ── TOPIC 8: Comparatives & Superlatives ──
      {
        id: 'comparatives',
        categoryId: 'sentence-structure',
        title: 'Comparatives & Superlatives',
        titleVietnamese: 'So Sánh Hơn & So Sánh Nhất',
        description: 'So sánh giữa hai hoặc nhiều đối tượng',
        difficulty: 'medium',
        emoji: '⚖️',
        order: 2,
        whenToUse: [
          { description: 'So sánh hơn: so sánh 2 đối tượng', example: 'This book is more interesting than that one.' },
          { description: 'So sánh nhất: so sánh 1 đối tượng với tất cả còn lại', example: 'She is the tallest girl in the class.' },
          { description: 'So sánh bằng: 2 đối tượng ngang nhau', example: 'He is as tall as his brother.' },
        ],
        formulas: [
          { type: 'affirmative', label: 'So sánh hơn (tính từ ngắn)', formula: 'S + be + adj-er + than + O', note: 'Tính từ 1 âm tiết: thêm -er (tall → taller)' },
          { type: 'affirmative', label: 'So sánh hơn (tính từ dài)', formula: 'S + be + more + adj + than + O', note: 'Tính từ 2+ âm tiết: thêm more (beautiful → more beautiful)' },
          { type: 'affirmative', label: 'So sánh nhất (tính từ ngắn)', formula: 'S + be + the + adj-est + (in/of)', note: 'tall → the tallest' },
          { type: 'affirmative', label: 'So sánh nhất (tính từ dài)', formula: 'S + be + the most + adj + (in/of)', note: 'beautiful → the most beautiful' },
        ],
        signalWords: ['than', 'the most', 'the -est', 'as...as', 'in the class', 'of all'],
        examples: [
          { type: 'affirmative', english: 'Hanoi is bigger than Da Nang.', vietnamese: 'Hà Nội lớn hơn Đà Nẵng.', highlight: 'bigger than' },
          { type: 'affirmative', english: 'English is more useful than French.', vietnamese: 'Tiếng Anh hữu ích hơn tiếng Pháp.', highlight: 'more useful than' },
          { type: 'affirmative', english: 'Mount Everest is the highest mountain in the world.', vietnamese: 'Everest là ngọn núi cao nhất thế giới.', highlight: 'the highest' },
          { type: 'affirmative', english: 'She is as smart as her sister.', vietnamese: 'Cô ấy thông minh bằng chị gái.', highlight: 'as smart as' },
        ],
        commonMistakes: [
          { wrong: 'She is more taller than me.', correct: 'She is taller than me.', explanation: 'Tính từ ngắn (tall) → thêm -er, KHÔNG dùng "more".' },
          { wrong: 'He is the most tall.', correct: 'He is the tallest.', explanation: 'Tính từ ngắn → dùng -est, không dùng "the most".' },
          { wrong: 'good → gooder', correct: 'good → better', explanation: '"Good" là tính từ bất quy tắc: good → better → the best.' },
        ],
        tips: [
          '🎯 Tính từ 1 âm tiết → -er/-est. Tính từ 2+ âm tiết → more/the most',
          '💡 Bất quy tắc cần nhớ: good→better→best, bad→worse→worst, far→farther→farthest',
          '📝 Tính từ 2 âm tiết kết thúc bằng -y → bỏ y, thêm -ier/-iest: happy → happier → happiest',
        ],
        exercises: [
          { type: 'mcq', question: 'This phone is ___ than that one.', options: ['expensive', 'expensiver', 'more expensive', 'most expensive'], correctIndex: 2, explanation: '"expensive" là tính từ dài → more expensive' },
          { type: 'fill-blank', sentence: 'She is the ___ (smart) student in our class.', answer: 'smartest', hint: 'So sánh nhất, tính từ ngắn', explanation: 'smart → smartest (1 âm tiết → thêm -est)' },
          { type: 'mcq', question: 'My house is ___ yours.', options: ['as big as', 'as bigger as', 'more big as', 'as big than'], correctIndex: 0, explanation: 'So sánh bằng: as + adj + as' },
        ],
      },

      // ── TOPIC 9: Conditionals ──
      {
        id: 'conditionals',
        categoryId: 'sentence-structure',
        title: 'Conditionals (0, 1, 2)',
        titleVietnamese: 'Câu Điều Kiện Loại 0, 1, 2',
        description: 'Diễn tả điều kiện và kết quả, từ thực tế đến giả định',
        difficulty: 'hard',
        emoji: '🔀',
        order: 3,
        whenToUse: [
          { description: 'Loại 0: Sự thật, chân lý', example: 'If you heat water to 100°C, it boils.' },
          { description: 'Loại 1: Điều kiện có thể xảy ra ở hiện tại/tương lai', example: 'If it rains tomorrow, I will stay home.' },
          { description: 'Loại 2: Điều kiện không có thật ở hiện tại (giả định)', example: 'If I were rich, I would travel the world.' },
        ],
        formulas: [
          { type: 'affirmative', label: 'Loại 0', formula: 'If + S + V(hiện tại đơn), S + V(hiện tại đơn)', note: 'Sự thật, quy luật tự nhiên' },
          { type: 'affirmative', label: 'Loại 1', formula: 'If + S + V(hiện tại đơn), S + will + V(nguyên thể)', note: 'Điều kiện có thể xảy ra' },
          { type: 'affirmative', label: 'Loại 2', formula: 'If + S + V(quá khứ đơn), S + would + V(nguyên thể)', note: 'Giả định không thật. "If I were..." (không dùng "was")' },
        ],
        signalWords: ['if', 'unless', 'when (loại 0)', 'in case', 'provided that'],
        examples: [
          { type: 'affirmative', english: 'If you mix red and blue, you get purple.', vietnamese: 'Nếu bạn trộn đỏ và xanh, bạn được tím. (Loại 0)', highlight: 'If...mix...get' },
          { type: 'affirmative', english: 'If I study hard, I will pass the exam.', vietnamese: 'Nếu tôi học chăm, tôi sẽ đậu kỳ thi. (Loại 1)', highlight: 'If...study...will pass' },
          { type: 'affirmative', english: 'If I had more time, I would learn Japanese.', vietnamese: 'Nếu tôi có thêm thời gian, tôi sẽ học tiếng Nhật. (Loại 2 - giả định)', highlight: 'If...had...would learn' },
          { type: 'affirmative', english: 'If I were you, I would study abroad.', vietnamese: 'Nếu tôi là bạn, tôi sẽ du học. (Loại 2)', highlight: 'If...were...would study' },
        ],
        commonMistakes: [
          { wrong: 'If I will study hard, I will pass.', correct: 'If I study hard, I will pass.', explanation: "Mệnh đề IF không dùng 'will'. Dùng Present Simple trong mệnh đề IF." },
          { wrong: 'If I was you, I would go.', correct: 'If I were you, I would go.', explanation: "Trong câu ĐK loại 2, dùng 'were' cho tất cả chủ ngữ (I were, he were...)." },
        ],
        comparison: {
          title: 'So sánh 3 loại câu điều kiện',
          headers: ['Mệnh đề IF', 'Mệnh đề chính'],
          rows: [
            { left: 'Loại 0: If + Present Simple', right: 'Present Simple' },
            { left: 'Loại 1: If + Present Simple', right: 'will + V' },
            { left: 'Loại 2: If + Past Simple', right: 'would + V' },
          ],
        },
        tips: [
          '🎯 Loại 0 = luôn đúng. Loại 1 = có thể xảy ra. Loại 2 = không thật',
          '💡 Mệnh đề IF KHÔNG BAO GIỜ dùng "will" (trừ trường hợp đặc biệt)',
          '📝 Mẹo nhớ: "If I were..." = "Giá mà tôi..." (giả định)',
        ],
        exercises: [
          { type: 'mcq', question: 'If it ___ tomorrow, we will cancel the picnic.', options: ['will rain', 'rains', 'rained', 'rain'], correctIndex: 1, explanation: 'Câu ĐK loại 1: If + Present Simple → rains' },
          { type: 'fill-blank', sentence: 'If I ___ (be) you, I would apologize.', answer: 'were', hint: 'Câu ĐK loại 2', explanation: 'Loại 2: If + Past Simple. "I were" (không dùng "was")' },
          { type: 'mcq', question: 'If you heat ice, it ___.', options: ['melts', 'will melt', 'melted', 'would melt'], correctIndex: 0, explanation: 'Sự thật khoa học → Câu ĐK loại 0: Present Simple ở cả 2 mệnh đề' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // CATEGORY 3: TỪ LOẠI
  // ═══════════════════════════════════════════
  {
    id: 'parts-of-speech',
    name: 'Parts of Speech',
    nameVietnamese: 'Từ Loại',
    emoji: '🧩',
    description: 'Hiểu cách dùng mạo từ, tính từ, giới từ, động từ khuyết thiếu',
    colorClass: 'text-violet-600',
    bgGradient: 'from-violet-500 to-purple-600',
    topics: [
      // ── TOPIC 10: Articles ──
      {
        id: 'articles',
        categoryId: 'parts-of-speech',
        title: 'Articles: a, an, the',
        titleVietnamese: 'Mạo Từ: a, an, the',
        description: 'Khi nào dùng a/an/the và khi nào không dùng mạo từ',
        difficulty: 'easy',
        emoji: '📰',
        order: 1,
        whenToUse: [
          { description: '"a" - trước danh từ số ít bắt đầu bằng phụ âm, chưa xác định', example: 'I have a book.' },
          { description: '"an" - trước danh từ số ít bắt đầu bằng nguyên âm (a, e, i, o, u), chưa xác định', example: 'She is an engineer.' },
          { description: '"the" - trước danh từ đã xác định, duy nhất, hoặc đã đề cập trước đó', example: 'The sun is very hot today.' },
          { description: 'Không dùng mạo từ (zero article) trước tên riêng, quốc gia, bữa ăn, môn thể thao', example: 'I play soccer. She lives in Vietnam.' },
        ],
        formulas: [
          { type: 'affirmative', label: 'a / an', formula: 'a + danh từ bắt đầu bằng phụ âm | an + danh từ bắt đầu bằng nguyên âm', note: 'Chỉ dùng cho danh từ số ít, đếm được, chưa xác định' },
          { type: 'affirmative', label: 'the', formula: 'the + danh từ đã xác định (số ít hoặc số nhiều)', note: 'Người nghe biết ta đang nói về cái nào' },
        ],
        signalWords: ['a', 'an', 'the', 'Ø (zero article)'],
        examples: [
          { type: 'affirmative', english: 'I saw a dog in the park.', vietnamese: 'Tôi thấy một con chó trong công viên. (chưa xác định)', highlight: 'a dog' },
          { type: 'affirmative', english: 'She is an artist.', vietnamese: 'Cô ấy là một nghệ sĩ. (bắt đầu bằng nguyên âm)', highlight: 'an artist' },
          { type: 'affirmative', english: 'The dog is very friendly.', vietnamese: 'Con chó (mà ta đã biết) rất thân thiện.', highlight: 'The dog' },
          { type: 'affirmative', english: 'The earth goes around the sun.', vietnamese: 'Trái đất quay quanh mặt trời. (duy nhất)', highlight: 'The earth...the sun' },
          { type: 'affirmative', english: 'I love music.', vietnamese: 'Tôi yêu âm nhạc. (không dùng mạo từ - danh từ chung)', highlight: 'music' },
        ],
        commonMistakes: [
          { wrong: 'She is a engineer.', correct: 'She is an engineer.', explanation: '"Engineer" bắt đầu bằng âm nguyên âm /e/ → dùng "an".' },
          { wrong: 'I like the music.', correct: 'I like music.', explanation: 'Nói chung về âm nhạc → không dùng "the". Chỉ dùng "the" khi nói về bài nhạc cụ thể.' },
          { wrong: 'a hour', correct: 'an hour', explanation: '"Hour" bắt đầu bằng âm nguyên âm /aʊ/ (h câm) → dùng "an".' },
          { wrong: 'an university', correct: 'a university', explanation: '"University" bắt đầu bằng âm phụ âm /juː/ → dùng "a".' },
        ],
        tips: [
          '🎯 "a/an" → nói LẦN ĐẦU. "the" → người nghe ĐÃ BIẾT đang nói về cái nào',
          '💡 a/an dựa vào ÂM, không dựa vào CHỮ CÁI: an hour (h câm), a university (/juː/)',
          '📝 Không dùng mạo từ trước: tên người, tên nước (ngoại trừ the USA, the UK), môn thể thao, bữa ăn',
        ],
        exercises: [
          { type: 'mcq', question: 'She is ___ honest person.', options: ['a', 'an', 'the', 'Ø (không dùng)'], correctIndex: 1, explanation: '"Honest" bắt đầu bằng âm nguyên âm (h câm /ˈɒnɪst/) → an' },
          { type: 'fill-blank', sentence: 'I bought ___ new phone yesterday. ___ phone is very fast.', answer: 'a, The', hint: 'Lần đầu nhắc → ?, Nhắc lại → ?', explanation: 'Lần đầu nhắc đến → a. Nhắc lại (đã biết) → The' },
          { type: 'mcq', question: '___ sun rises in ___ east.', options: ['A/an', 'The/the', 'A/the', 'The/an'], correctIndex: 1, explanation: 'Mặt trời và phương hướng là duy nhất → The/the' },
        ],
      },

      // ── TOPIC 11: Prepositions ──
      {
        id: 'prepositions',
        categoryId: 'parts-of-speech',
        title: 'Prepositions: in, on, at',
        titleVietnamese: 'Giới Từ: in, on, at',
        description: 'Cách dùng đúng giới từ chỉ thời gian và địa điểm',
        difficulty: 'medium',
        emoji: '📍',
        order: 2,
        whenToUse: [
          { description: '"in" - tháng, năm, mùa, thế kỷ; trong không gian kín', example: 'in January, in 2024, in the room' },
          { description: '"on" - ngày, ngày tháng, thứ; trên bề mặt', example: 'on Monday, on July 4th, on the table' },
          { description: '"at" - giờ, điểm thời gian cụ thể; địa chỉ cụ thể', example: 'at 8 AM, at night, at 123 Main St' },
        ],
        formulas: [
          { type: 'affirmative', label: 'Thời gian', formula: 'at + giờ/điểm | on + ngày/thứ | in + tháng/năm/mùa', note: 'Nhỏ→Lớn: at (giờ) → on (ngày) → in (tháng/năm)' },
          { type: 'affirmative', label: 'Địa điểm', formula: 'at + địa chỉ/điểm | on + bề mặt | in + không gian kín/lớn', note: 'at the bus stop, on the wall, in the city' },
        ],
        signalWords: ['in', 'on', 'at'],
        examples: [
          { type: 'affirmative', english: 'I wake up at 6 AM every day.', vietnamese: 'Tôi thức dậy lúc 6 giờ sáng mỗi ngày.', highlight: 'at 6 AM' },
          { type: 'affirmative', english: 'The meeting is on Monday.', vietnamese: 'Cuộc họp vào thứ Hai.', highlight: 'on Monday' },
          { type: 'affirmative', english: 'She was born in 1995.', vietnamese: 'Cô ấy sinh năm 1995.', highlight: 'in 1995' },
          { type: 'affirmative', english: 'The book is on the table.', vietnamese: 'Cuốn sách ở trên bàn.', highlight: 'on the table' },
          { type: 'affirmative', english: 'He lives in Ho Chi Minh City.', vietnamese: 'Anh ấy sống ở Thành phố Hồ Chí Minh.', highlight: 'in Ho Chi Minh City' },
          { type: 'affirmative', english: "I'll meet you at the coffee shop.", vietnamese: 'Tôi sẽ gặp bạn ở quán cà phê.', highlight: 'at the coffee shop' },
        ],
        commonMistakes: [
          { wrong: 'I was born on 1995.', correct: 'I was born in 1995.', explanation: "Năm → dùng 'in', không dùng 'on'." },
          { wrong: 'The class starts in 8 AM.', correct: 'The class starts at 8 AM.', explanation: "Giờ cụ thể → dùng 'at'." },
          { wrong: 'See you in Monday.', correct: 'See you on Monday.', explanation: "Ngày trong tuần → dùng 'on'." },
        ],
        tips: [
          '🎯 Mẹo nhớ AT-ON-IN theo kích thước: AT (nhỏ nhất: giờ, điểm) → ON (vừa: ngày, bề mặt) → IN (lớn nhất: tháng, năm, không gian)',
          '💡 Ngoại lệ: at night, at the weekend (UK), on the weekend (US)',
          '📝 Không dùng giới từ trước: today, tomorrow, yesterday, this/next/last + thời gian',
        ],
        exercises: [
          { type: 'mcq', question: 'I have a meeting ___ 3 PM.', options: ['in', 'on', 'at', 'by'], correctIndex: 2, explanation: 'Giờ cụ thể → at' },
          { type: 'fill-blank', sentence: 'She was born ___ March 15th, 1990.', answer: 'on', hint: 'Ngày cụ thể', explanation: 'Ngày tháng cụ thể → on' },
          { type: 'mcq', question: 'We live ___ a small apartment ___ the city center.', options: ['in/in', 'on/in', 'at/on', 'in/at'], correctIndex: 0, explanation: 'Apartment (không gian kín) → in. City center (khu vực lớn) → in' },
        ],
      },

      // ── TOPIC 12: Modal Verbs ──
      {
        id: 'modal-verbs',
        categoryId: 'parts-of-speech',
        title: 'Modal Verbs',
        titleVietnamese: 'Động Từ Khuyết Thiếu: can, should, must',
        description: 'Diễn tả khả năng, lời khuyên, sự bắt buộc',
        difficulty: 'medium',
        emoji: '💪',
        order: 3,
        whenToUse: [
          { description: '"can" - khả năng, sự cho phép, yêu cầu lịch sự', example: 'I can swim. Can I help you?' },
          { description: '"should" - lời khuyên, điều nên làm', example: 'You should study harder.' },
          { description: '"must" - sự bắt buộc, suy luận chắc chắn', example: 'You must wear a helmet. She must be tired.' },
          { description: '"could" - khả năng trong quá khứ, yêu cầu lịch sự hơn can', example: 'I could swim when I was 5. Could you help me?' },
          { description: '"have to" - sự bắt buộc từ bên ngoài', example: 'I have to finish this report by Friday.' },
        ],
        formulas: [
          { type: 'affirmative', label: 'Khẳng định', formula: 'S + modal + V(nguyên thể) + O', note: 'Modal verbs không thay đổi theo chủ ngữ (không thêm -s)' },
          { type: 'negative', label: 'Phủ định', formula: 'S + modal + not + V(nguyên thể) + O', note: "can't, shouldn't, mustn't" },
          { type: 'question', label: 'Nghi vấn', formula: 'Modal + S + V(nguyên thể) + O?' },
        ],
        signalWords: ['can', "can't", 'could', 'should', "shouldn't", 'must', "mustn't", 'have to', "don't have to"],
        examples: [
          { type: 'affirmative', english: 'I can speak three languages.', vietnamese: 'Tôi có thể nói ba ngôn ngữ. (khả năng)', highlight: 'can speak' },
          { type: 'affirmative', english: 'You should see a doctor.', vietnamese: 'Bạn nên đi khám bác sĩ. (lời khuyên)', highlight: 'should see' },
          { type: 'affirmative', english: 'You must stop at a red light.', vietnamese: 'Bạn phải dừng khi đèn đỏ. (bắt buộc)', highlight: 'must stop' },
          { type: 'negative', english: "You mustn't use your phone in class.", vietnamese: 'Bạn không được dùng điện thoại trong lớp. (cấm)', highlight: "mustn't use" },
          { type: 'negative', english: "You don't have to come if you're busy.", vietnamese: 'Bạn không cần phải đến nếu bận. (không bắt buộc)', highlight: "don't have to" },
          { type: 'question', english: 'Can you help me with this?', vietnamese: 'Bạn có thể giúp tôi được không?', highlight: 'Can' },
        ],
        commonMistakes: [
          { wrong: 'She can speaks English.', correct: 'She can speak English.', explanation: "Sau modal verb, dùng V nguyên thể. KHÔNG thêm -s/-es/-ed/-ing." },
          { wrong: 'I must to go now.', correct: 'I must go now.', explanation: "Sau 'must' KHÔNG dùng 'to'. Nhưng 'have to' thì CÓ 'to'." },
          { wrong: "You mustn't come. (ý: không cần)", correct: "You don't have to come.", explanation: "mustn't = KHÔNG ĐƯỢC (cấm). don't have to = KHÔNG CẦN (không bắt buộc)." },
        ],
        comparison: {
          title: 'must vs have to vs should',
          headers: ['Từ', 'Ý nghĩa'],
          rows: [
            { left: 'must', right: 'Bắt buộc (từ người nói) / Cấm (must not)' },
            { left: 'have to', right: 'Bắt buộc (từ quy định bên ngoài)' },
            { left: "don't have to", right: 'Không cần thiết (tùy chọn)' },
            { left: 'should', right: 'Nên (lời khuyên, không bắt buộc)' },
            { left: "mustn't", right: 'Cấm, không được phép' },
          ],
        },
        tips: [
          '🎯 Modal verbs KHÔNG BAO GIỜ thêm -s, -ed, -ing, và KHÔNG dùng "to" sau nó',
          '💡 must = bắt buộc từ BẢN THÂN. have to = bắt buộc từ QUY ĐỊNH',
          '📝 mustn\'t ≠ don\'t have to! "mustn\'t" = CẤM. "don\'t have to" = KHÔNG CẦN',
        ],
        exercises: [
          { type: 'mcq', question: 'You ___ drive without a license. It is illegal.', options: ['should', "don't have to", "mustn't", "shouldn't"], correctIndex: 2, explanation: 'Illegal (bất hợp pháp) = cấm → mustn\'t' },
          { type: 'fill-blank', sentence: 'You look tired. You ___ (should/go) to bed early.', answer: 'should go', hint: 'Lời khuyên', explanation: 'Lời khuyên → should + V nguyên thể' },
          { type: 'mcq', question: 'She ___ swim when she was 4 years old.', options: ['can', 'could', 'must', 'should'], correctIndex: 1, explanation: 'Khả năng trong quá khứ → could' },
          { type: 'fill-blank', sentence: 'You ___ (not/have to) wear a suit. It is a casual party.', answer: "don't have to", hint: 'Không bắt buộc', explanation: "Không bắt buộc → don't have to" },
        ],
      },
    ],
  },
];
