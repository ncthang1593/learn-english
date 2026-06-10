import { Level } from '../core/models/lesson.model';

export const LEVELS_DATA: Level[] = [
  {
  "id": "basic-1",
  "order": 1,
  "name": "Giao Tiếp Cơ Bản",
  "nameVietnamese": "Tiếng Anh Giao Tiếp Nhập Môn",
  "description": "Nắm vững 100 từ vựng và mẫu câu cơ bản nhất được tổng hợp từ 10 chủ đề quan trọng.",
  "colorClass": "text-primary-600",
  "emoji": "🌱",
  "bgGradient": "from-primary-500 to-primary-600",
  "lessons": [
    {
      "id": "lesson-1",
      "levelId": "basic-1",
      "order": 1,
      "title": "Greetings & Basics",
      "titleVietnamese": "Chào Hỏi & Cơ Bản",
      "description": "Mở rộng vốn từ vựng về chủ đề Chào Hỏi & Cơ Bản.",
      "emoji": "👋",
      "estimatedMinutes": 14,
      "xpReward": 50,
      "difficulty": "easy",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-1-hello",
          "english": "hello",
          "vietnamese": "xin chào",
          "pronunciation": "/həˈləʊ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-1-goodbye",
          "english": "goodbye",
          "vietnamese": "tạm biệt",
          "pronunciation": "/ɡədˈbaɪ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/goodbye-us.mp3",
          "example": "They made their good-byes.",
          "exampleVietnamese": "Họ đã nói lời tạm biệt."
        },
        {
          "id": "lesson-1-please",
          "english": "please",
          "vietnamese": "xin vui lòng",
          "pronunciation": "/pliːz/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/please-uk.mp3",
          "example": "Her presentation pleased the executives.",
          "exampleVietnamese": "Bài thuyết trình của cô làm hài lòng các giám đốc điều hành."
        },
        {
          "id": "lesson-1-thank",
          "english": "thank",
          "vietnamese": "cám ơn",
          "pronunciation": "[t̪eɪ̯ŋk]",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/thank-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-1-sorry",
          "english": "sorry",
          "vietnamese": "xin lỗi",
          "pronunciation": "/ˈsɔɹi/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/sorry-ca.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-1-excuse",
          "english": "excuse",
          "vietnamese": "thứ lỗi",
          "pronunciation": "",
          "audioUrl": "",
          "example": "Tell me why you were late – and I don't want to hear any excuses!",
          "exampleVietnamese": "Hãy cho tôi biết lý do bạn đến muộn - và tôi không muốn nghe bất kỳ lời bào chữa nào!"
        },
        {
          "id": "lesson-1-good",
          "english": "good",
          "vietnamese": "tốt",
          "pronunciation": "/ɡʊ(d)/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/good-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-1-bad",
          "english": "bad",
          "vietnamese": "xấu",
          "pronunciation": "/bæd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/bad-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-1-yes",
          "english": "yes",
          "vietnamese": "đúng",
          "pronunciation": "/jɛs/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/yes.mp3",
          "example": "Was that a yes?",
          "exampleVietnamese": "Đó có phải là có không?"
        },
        {
          "id": "lesson-1-no",
          "english": "no",
          "vietnamese": "không",
          "pronunciation": "/nəʊ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/no-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        }
      ]
    },
    {
      "id": "lesson-2",
      "levelId": "basic-1",
      "order": 2,
      "title": "Family & People",
      "titleVietnamese": "Gia Đình & Con Người",
      "description": "Mở rộng vốn từ vựng về chủ đề Gia Đình & Con Người.",
      "emoji": "👨‍👩‍👧‍👦",
      "estimatedMinutes": 11,
      "xpReward": 60,
      "difficulty": "easy",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-2-family",
          "english": "family",
          "vietnamese": "gia đình",
          "pronunciation": "/ˈfæm(ɪ)li/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/family-uk.mp3",
          "example": "Our family lives in town.",
          "exampleVietnamese": "Gia đình chúng tôi sống ở thị trấn."
        },
        {
          "id": "lesson-2-mother",
          "english": "mother",
          "vietnamese": "mẹ",
          "pronunciation": "/ˈmʌðə(ɹ)/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/mother-uk.mp3",
          "example": "He had something of his mother in him.",
          "exampleVietnamese": "Anh có cái gì đó của mẹ anh trong người."
        },
        {
          "id": "lesson-2-father",
          "english": "father",
          "vietnamese": "bố",
          "pronunciation": "/ˈfɑːðə(ɹ)/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/father-uk.mp3",
          "example": "My father was a strong influence on me.",
          "exampleVietnamese": "Cha tôi là người có ảnh hưởng mạnh mẽ tới tôi."
        },
        {
          "id": "lesson-2-sister",
          "english": "sister",
          "vietnamese": "em gái",
          "pronunciation": "/ˈsɪs.tə/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/sister-uk.mp3",
          "example": "My sister is always driving me crazy.",
          "exampleVietnamese": "Chị tôi luôn làm tôi phát điên."
        },
        {
          "id": "lesson-2-brother",
          "english": "brother",
          "vietnamese": "anh trai",
          "pronunciation": "/ˈbɹʌðə(ɹ)/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/brother-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-2-child",
          "english": "child",
          "vietnamese": "đứa trẻ",
          "pronunciation": "/t͡ʃaɪld/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/child-uk.mp3",
          "example": "Go easy on him: he is but a child.",
          "exampleVietnamese": "Hãy nhẹ nhàng với anh ấy: anh ấy chỉ là một đứa trẻ."
        },
        {
          "id": "lesson-2-friend",
          "english": "friend",
          "vietnamese": "người bạn",
          "pronunciation": "/fɹɛnd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/friend-uk.mp3",
          "example": "John and I have been friends ever since we were roommates at college.   Trust is important between friends.   I used to find it hard to make friends when I was shy.",
          "exampleVietnamese": "John và tôi đã là bạn kể từ khi chúng tôi còn là bạn cùng phòng ở trường đại học.   Sự tin tưởng là quan trọng giữa bạn bè.   Tôi từng thấy khó kết bạn khi tôi còn nhút nhát."
        },
        {
          "id": "lesson-2-boy",
          "english": "boy",
          "vietnamese": "con trai",
          "pronunciation": "/bɔːə/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/boy-us.mp3",
          "example": "Kate is dating a boy named Jim.",
          "exampleVietnamese": "Kate đang hẹn hò với một chàng trai tên Jim."
        },
        {
          "id": "lesson-2-girl",
          "english": "girl",
          "vietnamese": "con gái",
          "pronunciation": "/ɡɝl/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/girl-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-2-man",
          "english": "man",
          "vietnamese": "người đàn ông",
          "pronunciation": "/mæn/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/man-uk.mp3",
          "example": "The show is especially popular with middle-aged men.",
          "exampleVietnamese": "Chương trình đặc biệt được yêu thích bởi những người đàn ông trung niên."
        }
      ]
    },
    {
      "id": "lesson-3",
      "levelId": "basic-1",
      "order": 3,
      "title": "Colors & Shapes",
      "titleVietnamese": "Màu Sắc & Hình Khối",
      "description": "Mở rộng vốn từ vựng về chủ đề Màu Sắc & Hình Khối.",
      "emoji": "🎨",
      "estimatedMinutes": 11,
      "xpReward": 70,
      "difficulty": "easy",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-3-red",
          "english": "red",
          "vietnamese": "màu đỏ",
          "pronunciation": "/ɹɛd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/red-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-3-blue",
          "english": "blue",
          "vietnamese": "màu xanh da trời",
          "pronunciation": "/bluː/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/blue-au.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-3-green",
          "english": "green",
          "vietnamese": "màu xanh lá",
          "pronunciation": "/ɡɹiːn/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/green-au.mp3",
          "example": "The former flag of Libya is fully green.",
          "exampleVietnamese": "Quốc kỳ cũ của Libya có màu xanh hoàn toàn."
        },
        {
          "id": "lesson-3-yellow",
          "english": "yellow",
          "vietnamese": "màu vàng",
          "pronunciation": "/jɛlə/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/yellow-au.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-3-black",
          "english": "black",
          "vietnamese": "đen",
          "pronunciation": "/blak/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/black-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-3-white",
          "english": "white",
          "vietnamese": "trắng",
          "pronunciation": "/waɪt/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/white-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-3-circle",
          "english": "circle",
          "vietnamese": "vòng tròn",
          "pronunciation": "/ˈsɜɹkəl/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/circle-au.mp3",
          "example": "The set of all points (x, y) such that (x − 1)2 + y2 = r2 is a circle of radius r around the point (1, 0).",
          "exampleVietnamese": "Tập hợp tất cả các điểm (x, y) sao cho (x − 1)2 + y2 = r2 là một đường tròn bán kính r quanh điểm (1, 0)."
        },
        {
          "id": "lesson-3-square",
          "english": "square",
          "vietnamese": "quảng trường",
          "pronunciation": "/skwɛɚ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/square-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-3-color",
          "english": "color",
          "vietnamese": "màu sắc",
          "pronunciation": "/ˈkʌl.ɚ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/color-us.mp3",
          "example": "Humans and birds can perceive color.",
          "exampleVietnamese": "Con người và các loài chim có thể cảm nhận được màu sắc."
        },
        {
          "id": "lesson-3-shape",
          "english": "shape",
          "vietnamese": "hình dạng",
          "pronunciation": "/ʃeɪp/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/shape-us.mp3",
          "example": "The used bookshop wouldn't offer much due to the poor shape of the book.",
          "exampleVietnamese": "Hiệu sách cũ sẽ không bán được nhiều sách do hình dạng của cuốn sách quá xấu."
        }
      ]
    },
    {
      "id": "lesson-4",
      "levelId": "basic-1",
      "order": 4,
      "title": "Animals & Pets",
      "titleVietnamese": "Động Vật & Thú Cưng",
      "description": "Mở rộng vốn từ vựng về chủ đề Động Vật & Thú Cưng.",
      "emoji": "🐶",
      "estimatedMinutes": 11,
      "xpReward": 80,
      "difficulty": "medium",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-4-dog",
          "english": "dog",
          "vietnamese": "chó",
          "pronunciation": "/dɒɡ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/dog-uk.mp3",
          "example": "The dog barked all night long.",
          "exampleVietnamese": "Con chó sủa suốt đêm."
        },
        {
          "id": "lesson-4-cat",
          "english": "cat",
          "vietnamese": "con mèo",
          "pronunciation": "/kat/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/cat-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-4-bird",
          "english": "bird",
          "vietnamese": "chim",
          "pronunciation": "/bɝd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/bird-us.mp3",
          "example": "Ducks and sparrows are birds.",
          "exampleVietnamese": "Vịt và chim sẻ là loài chim."
        },
        {
          "id": "lesson-4-fish",
          "english": "fish",
          "vietnamese": "cá",
          "pronunciation": "/fɪʃ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/fish-au.mp3",
          "example": "Salmon is a fish.",
          "exampleVietnamese": "Cá hồi là một loại cá."
        },
        {
          "id": "lesson-4-mouse",
          "english": "mouse",
          "vietnamese": "chuột",
          "pronunciation": "",
          "audioUrl": "",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-4-horse",
          "english": "horse",
          "vietnamese": "ngựa",
          "pronunciation": "/hɔɹs/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/horse-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-4-cow",
          "english": "cow",
          "vietnamese": "con bò",
          "pronunciation": "/kaʊ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/cow-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-4-pig",
          "english": "pig",
          "vietnamese": "con lợn",
          "pronunciation": "/ˈpɪɡ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/pig-1-au.mp3",
          "example": "The man kept a pen with two pigs that he fed from carrots to cabbage.",
          "exampleVietnamese": "Người đàn ông nuôi hai con lợn từ cà rốt đến bắp cải."
        },
        {
          "id": "lesson-4-lion",
          "english": "lion",
          "vietnamese": "con sư tử",
          "pronunciation": "/ˈlaɪən/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/lion-us.mp3",
          "example": "Tigers and lions share a common ancestor from a few million years ago.",
          "exampleVietnamese": "Hổ và sư tử có chung tổ tiên từ vài triệu năm trước."
        },
        {
          "id": "lesson-4-tiger",
          "english": "tiger",
          "vietnamese": "con hổ",
          "pronunciation": "/ˈtaɪɡɚ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/tiger-1-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        }
      ]
    },
    {
      "id": "lesson-5",
      "levelId": "basic-1",
      "order": 5,
      "title": "Food & Drinks",
      "titleVietnamese": "Đồ Ăn & Thức Uống",
      "description": "Mở rộng vốn từ vựng về chủ đề Đồ Ăn & Thức Uống.",
      "emoji": "🍔",
      "estimatedMinutes": 12,
      "xpReward": 90,
      "difficulty": "medium",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-5-water",
          "english": "water",
          "vietnamese": "nước",
          "pronunciation": "/ˈwɔːtə/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/water-uk.mp3",
          "example": "By the action of electricity, the water was resolved into its two parts, oxygen and hydrogen.",
          "exampleVietnamese": "Nhờ tác động của điện, nước được phân giải thành hai phần là oxy và hydro."
        },
        {
          "id": "lesson-5-food",
          "english": "food",
          "vietnamese": "đồ ăn",
          "pronunciation": "/fuːd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/food-uk.mp3",
          "example": "The innkeeper brought them food and drink.",
          "exampleVietnamese": "Người chủ quán mang đồ ăn thức uống đến cho họ."
        },
        {
          "id": "lesson-5-bread",
          "english": "bread",
          "vietnamese": "bánh mỳ",
          "pronunciation": "/bɹɛd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/bread-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-5-milk",
          "english": "milk",
          "vietnamese": "sữa",
          "pronunciation": "/mɪlk/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/milk-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-5-coffee",
          "english": "coffee",
          "vietnamese": "cà phê",
          "pronunciation": "/ˈkɒ.fi/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/coffee-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-5-tea",
          "english": "tea",
          "vietnamese": "trà",
          "pronunciation": "/tiː/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/tea-1-uk.mp3",
          "example": "After smoking a bowl of that fine marijuana, they ate some brownies.",
          "exampleVietnamese": "Sau khi hút một bát cần sa hảo hạng, họ ăn một ít bánh hạnh nhân."
        },
        {
          "id": "lesson-5-apple",
          "english": "apple",
          "vietnamese": "quả táo",
          "pronunciation": "/ˈæp.əl/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/apple-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-5-banana",
          "english": "banana",
          "vietnamese": "chuối",
          "pronunciation": "/bəˈnɑːnə/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/banana-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-5-meat",
          "english": "meat",
          "vietnamese": "thịt",
          "pronunciation": "/miːt/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/meat-uk.mp3",
          "example": "A large portion of domestic meat production comes from animals raised on factory farms.",
          "exampleVietnamese": "Phần lớn sản lượng thịt trong nước đến từ động vật được nuôi trong các trang trại công nghiệp."
        },
        {
          "id": "lesson-5-rice",
          "english": "rice",
          "vietnamese": "cơm",
          "pronunciation": "/ɹaɪs/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/rice-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        }
      ]
    },
    {
      "id": "lesson-6",
      "levelId": "basic-1",
      "order": 6,
      "title": "Home & Furniture",
      "titleVietnamese": "Nhà Cửa & Nội Thất",
      "description": "Mở rộng vốn từ vựng về chủ đề Nhà Cửa & Nội Thất.",
      "emoji": "🏠",
      "estimatedMinutes": 14,
      "xpReward": 100,
      "difficulty": "medium",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-6-house",
          "english": "house",
          "vietnamese": "căn nhà",
          "pronunciation": "/hʌʊs/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/house-1-ca.mp3",
          "example": "This is my house and my family's ancestral home.",
          "exampleVietnamese": "Đây là ngôi nhà của tôi và là quê hương của gia đình tôi."
        },
        {
          "id": "lesson-6-room",
          "english": "room",
          "vietnamese": "phòng",
          "pronunciation": "/ɹuːm/",
          "audioUrl": "",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-6-door",
          "english": "door",
          "vietnamese": "cửa",
          "pronunciation": "/dɔː/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/door-uk.mp3",
          "example": "I knocked on the vice president's door",
          "exampleVietnamese": "Tôi gõ cửa phòng phó chủ tịch"
        },
        {
          "id": "lesson-6-window",
          "english": "window",
          "vietnamese": "cửa sổ",
          "pronunciation": "/ˈwɪndəʊ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/window-uk.mp3",
          "example": "To separate out the chaff, early cultures tossed baskets of grain into the air and let the wind blow away the lighter chaff.",
          "exampleVietnamese": "Để tách trấu ra, các nền văn hóa ban đầu đã ném những giỏ ngũ cốc lên không trung và để gió thổi bay những trấu nhẹ hơn."
        },
        {
          "id": "lesson-6-table",
          "english": "table",
          "vietnamese": "bàn",
          "pronunciation": "/ˈteɪbəl/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/table-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-6-chair",
          "english": "chair",
          "vietnamese": "cái ghế",
          "pronunciation": "/t͡ʃɛə(ɹ)/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/chair-uk.mp3",
          "example": "All I need to weather a snowstorm is hot coffee, a warm fire, a good book and a comfortable chair.",
          "exampleVietnamese": "Tất cả những gì tôi cần để vượt qua cơn bão tuyết là cà phê nóng, lửa ấm, một cuốn sách hay và một chiếc ghế êm ái."
        },
        {
          "id": "lesson-6-bed",
          "english": "bed",
          "vietnamese": "giường",
          "pronunciation": "/bɛd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/bed-uk.mp3",
          "example": "My cat often sleeps on my bed.\nI keep a glass of water next to my bed when I sleep.",
          "exampleVietnamese": "Con mèo của tôi thường ngủ trên giường của tôi.\nTôi để một cốc nước cạnh giường khi ngủ."
        },
        {
          "id": "lesson-6-kitchen",
          "english": "kitchen",
          "vietnamese": "phòng bếp",
          "pronunciation": "/ˈkɪt͡ʃən/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/kitchen-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-6-bathroom",
          "english": "bathroom",
          "vietnamese": "phòng tắm",
          "pronunciation": "/ˈbæθ.ɹuːm/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/bathroom-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-6-garden",
          "english": "garden",
          "vietnamese": "vườn",
          "pronunciation": "/ˈɡɑːdn̩/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/garden-uk.mp3",
          "example": "a vegetable garden  a flower garden",
          "exampleVietnamese": "vườn rau, vườn hoa"
        }
      ]
    },
    {
      "id": "lesson-7",
      "levelId": "basic-1",
      "order": 7,
      "title": "Body & Health",
      "titleVietnamese": "Cơ Thể & Sức Khỏe",
      "description": "Mở rộng vốn từ vựng về chủ đề Cơ Thể & Sức Khỏe.",
      "emoji": "💪",
      "estimatedMinutes": 10,
      "xpReward": 110,
      "difficulty": "medium",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-7-head",
          "english": "head",
          "vietnamese": "cái đầu",
          "pronunciation": "/hɛd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/head-uk.mp3",
          "example": "Be careful when you pet that dog on the head; it may bite.",
          "exampleVietnamese": "Hãy cẩn thận khi bạn vuốt ve đầu con chó đó; nó có thể cắn."
        },
        {
          "id": "lesson-7-eye",
          "english": "eye",
          "vietnamese": "mắt ",
          "pronunciation": "/aɪ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/eye-us.mp3",
          "example": "Bright lights really hurt my eyes.",
          "exampleVietnamese": "Ánh đèn sáng thực sự làm tôi đau mắt."
        },
        {
          "id": "lesson-7-ear",
          "english": "ear",
          "vietnamese": "tai",
          "pronunciation": "/ɪə̯/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/ear-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-7-nose",
          "english": "nose",
          "vietnamese": "mũi",
          "pronunciation": "/nəʊz/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/nose-uk.mp3",
          "example": "She has a cold in the nose.",
          "exampleVietnamese": "Cô ấy bị cảm lạnh ở mũi."
        },
        {
          "id": "lesson-7-mouth",
          "english": "mouth",
          "vietnamese": "miệng",
          "pronunciation": "/maʊθ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/mouth-uk.mp3",
          "example": "\"Open your mouth and say 'aah',\" directed the doctor.",
          "exampleVietnamese": "\"Mở miệng ra và nói 'aah',\" bác sĩ hướng dẫn."
        },
        {
          "id": "lesson-7-hand",
          "english": "hand",
          "vietnamese": "tay",
          "pronunciation": "/hænd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/hand-uk.mp3",
          "example": "Her hands are really strong.",
          "exampleVietnamese": "Bàn tay của cô ấy thực sự rất khỏe."
        },
        {
          "id": "lesson-7-foot",
          "english": "foot",
          "vietnamese": "chân",
          "pronunciation": "[fɵʔt]",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/foot-uk.mp3",
          "example": "A spider has eight feet.",
          "exampleVietnamese": "Một con nhện có tám chân."
        },
        {
          "id": "lesson-7-hair",
          "english": "hair",
          "vietnamese": "tóc",
          "pronunciation": "/hɛə/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/hair-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-7-body",
          "english": "body",
          "vietnamese": "thân hình",
          "pronunciation": "/ˈbɒdi/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/body-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-7-health",
          "english": "health",
          "vietnamese": "sức khỏe",
          "pronunciation": "/hɛlθ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/health-1-uk.mp3",
          "example": "Her mental health is really affected by stressful environments.",
          "exampleVietnamese": "Sức khỏe tinh thần của cô thực sự bị ảnh hưởng bởi môi trường căng thẳng."
        }
      ]
    },
    {
      "id": "lesson-8",
      "levelId": "basic-1",
      "order": 8,
      "title": "Time & Calendar",
      "titleVietnamese": "Thời Gian & Lịch",
      "description": "Mở rộng vốn từ vựng về chủ đề Thời Gian & Lịch.",
      "emoji": "📅",
      "estimatedMinutes": 12,
      "xpReward": 120,
      "difficulty": "hard",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-8-time",
          "english": "time",
          "vietnamese": "thời gian",
          "pronunciation": "/tɑem/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/time-au.mp3",
          "example": "Time stops for nobody.   the ebb and flow of time",
          "exampleVietnamese": "Thời gian dừng lại không cho ai cả.   sự lên xuống của thời gian"
        },
        {
          "id": "lesson-8-day",
          "english": "day",
          "vietnamese": "ngày",
          "pronunciation": "/deɪ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/day-us.mp3",
          "example": "I've been here for two days and a bit.",
          "exampleVietnamese": "Tôi đã ở đây được hai ngày rưỡi rồi."
        },
        {
          "id": "lesson-8-week",
          "english": "week",
          "vietnamese": "tuần",
          "pronunciation": "/wiːk/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/week-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-8-month",
          "english": "month",
          "vietnamese": "tháng",
          "pronunciation": "/mʌnθ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/month-uk.mp3",
          "example": "July is my favourite month.",
          "exampleVietnamese": "Tháng bảy là tháng yêu thích của tôi."
        },
        {
          "id": "lesson-8-year",
          "english": "year",
          "vietnamese": "năm",
          "pronunciation": "/jɪə/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/year-1-uk.mp3",
          "example": "we moved to this town a year ago;  I quit smoking exactly one year ago",
          "exampleVietnamese": "chúng tôi chuyển đến thị trấn này một năm trước;  Tôi đã bỏ thuốc lá đúng một năm trước"
        },
        {
          "id": "lesson-8-morning",
          "english": "morning",
          "vietnamese": "buổi sáng",
          "pronunciation": "/ˈmɔːnɪŋ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/morning-uk.mp3",
          "example": "I'll see you tomorrow morning.",
          "exampleVietnamese": "Tôi sẽ gặp bạn vào sáng mai."
        },
        {
          "id": "lesson-8-evening",
          "english": "evening",
          "vietnamese": "buổi tối",
          "pronunciation": "/ˈivnɪŋ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/evening-1-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-8-night",
          "english": "night",
          "vietnamese": "đêm",
          "pronunciation": "/naɪt/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/night-uk.mp3",
          "example": "How do you sleep at night when you attack your kids like that!?",
          "exampleVietnamese": "Làm sao bạn có thể ngủ vào ban đêm khi bạn tấn công con bạn như vậy!?"
        },
        {
          "id": "lesson-8-today",
          "english": "today",
          "vietnamese": "hôm nay",
          "pronunciation": "/təˈdeɪ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/today-uk.mp3",
          "example": "Today is the day we'll fix this once and for all.",
          "exampleVietnamese": "Hôm nay là ngày chúng ta sẽ khắc phục điều này một lần và mãi mãi."
        },
        {
          "id": "lesson-8-tomorrow",
          "english": "tomorrow",
          "vietnamese": "ngày mai",
          "pronunciation": "/təˈmɒɹəʊ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/tomorrow-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        }
      ]
    },
    {
      "id": "lesson-9",
      "levelId": "basic-1",
      "order": 9,
      "title": "Work & School",
      "titleVietnamese": "Công Việc & Trường Học",
      "description": "Mở rộng vốn từ vựng về chủ đề Công Việc & Trường Học.",
      "emoji": "💼",
      "estimatedMinutes": 13,
      "xpReward": 130,
      "difficulty": "hard",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-9-school",
          "english": "school",
          "vietnamese": "trường học",
          "pronunciation": "/skuːl/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/school-uk.mp3",
          "example": "The divers encountered a huge school of mackerel.",
          "exampleVietnamese": "Các thợ lặn gặp phải một đàn cá thu khổng lồ."
        },
        {
          "id": "lesson-9-teacher",
          "english": "teacher",
          "vietnamese": "giáo viên",
          "pronunciation": "/ˈtiːt͡ʃə/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/teacher-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-9-student",
          "english": "student",
          "vietnamese": "học sinh",
          "pronunciation": "/ˈstjuː.dənt/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/student-uk.mp3",
          "example": "He is a student of life.",
          "exampleVietnamese": "Anh ấy là một sinh viên của cuộc sống."
        },
        {
          "id": "lesson-9-book",
          "english": "book",
          "vietnamese": "sách",
          "pronunciation": "/buːk/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/book-uk.mp3",
          "example": "He was frustrated because he couldn't find anything about dinosaurs in the book.",
          "exampleVietnamese": "Anh ấy thất vọng vì không thể tìm thấy bất cứ điều gì về khủng long trong cuốn sách."
        },
        {
          "id": "lesson-9-pen",
          "english": "pen",
          "vietnamese": "cái bút",
          "pronunciation": "/pɛn/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/pen.mp3",
          "example": "There are two steers in the third pen.",
          "exampleVietnamese": "Có hai con bò ở chuồng thứ ba."
        },
        {
          "id": "lesson-9-work",
          "english": "work",
          "vietnamese": "công việc",
          "pronunciation": "/wɜːk/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/work-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-9-job",
          "english": "job",
          "vietnamese": "công việc",
          "pronunciation": "/d͡ʒɒb/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/job-uk.mp3",
          "example": "A job half done is hardly done at all.",
          "exampleVietnamese": "Một công việc được thực hiện một nửa hầu như không được thực hiện."
        },
        {
          "id": "lesson-9-office",
          "english": "office",
          "vietnamese": "văn phòng",
          "pronunciation": "/ˈɔfɪs/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/office-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-9-computer",
          "english": "computer",
          "vietnamese": "máy tính",
          "pronunciation": "/kəmˈpjuːtə/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/computer-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-9-desk",
          "english": "desk",
          "vietnamese": "bàn làm việc",
          "pronunciation": "/dɛsk/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/desk-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        }
      ]
    },
    {
      "id": "lesson-10",
      "levelId": "basic-1",
      "order": 10,
      "title": "Travel & Transport",
      "titleVietnamese": "Du Lịch & Phương Tiện",
      "description": "Mở rộng vốn từ vựng về chủ đề Du Lịch & Phương Tiện.",
      "emoji": "✈️",
      "estimatedMinutes": 12,
      "xpReward": 140,
      "difficulty": "hard",
      "tags": [
        "vocabulary",
        "basic"
      ],
      "theory": [],
      "exercises": [],
      "vocabulary": [
        {
          "id": "lesson-10-car",
          "english": "car",
          "vietnamese": "xe hơi",
          "pronunciation": "/kɑː/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/car-uk.mp3",
          "example": "She drove her car to the mall.",
          "exampleVietnamese": "Cô lái xe đến trung tâm thương mại."
        },
        {
          "id": "lesson-10-bus",
          "english": "bus",
          "vietnamese": "xe buýt",
          "pronunciation": "/bɐs/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/bus-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-10-train",
          "english": "train",
          "vietnamese": "xe lửa",
          "pronunciation": "/tɹeɪn/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/train-1-au.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-10-plane",
          "english": "plane",
          "vietnamese": "máy bay",
          "pronunciation": "/pleɪn/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/plane-us.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-10-bicycle",
          "english": "bicycle",
          "vietnamese": "xe đạp",
          "pronunciation": "/ˈbaɪsɪkl̩/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/bicycle-au.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-10-street",
          "english": "street",
          "vietnamese": "đường phố",
          "pronunciation": "/stɹiːt/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/street-uk.mp3",
          "example": "Walk down the street until you see a hotel on the right.",
          "exampleVietnamese": "Đi xuống phố cho đến khi bạn nhìn thấy một khách sạn ở bên phải."
        },
        {
          "id": "lesson-10-road",
          "english": "road",
          "vietnamese": "đường",
          "pronunciation": "/ɹəʊd/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/road-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-10-city",
          "english": "city",
          "vietnamese": "thành phố",
          "pronunciation": "/sɪtɪ/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/city-au.mp3",
          "example": "São Paulo is the largest city in South America.",
          "exampleVietnamese": "São Paulo là thành phố lớn nhất ở Nam Mỹ."
        },
        {
          "id": "lesson-10-country",
          "english": "country",
          "vietnamese": "quốc gia",
          "pronunciation": "/ˈkʌntɹi/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/country-uk.mp3",
          "example": "",
          "exampleVietnamese": ""
        },
        {
          "id": "lesson-10-world",
          "english": "world",
          "vietnamese": "thế giới",
          "pronunciation": "/wɝld/",
          "audioUrl": "https://api.dictionaryapi.dev/media/pronunciations/en/world-ca.mp3",
          "example": "There will always be lovers, till the world’s end.",
          "exampleVietnamese": "Sẽ luôn có những người yêu nhau, cho đến ngày tận thế."
        }
      ]
    }
  ]
}
];
