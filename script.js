// متغيرات اللعبة
let selectedCategories = [];
let gameData = {
    name: '',
    team1: { name: '', members: 1, score: 0 },
    team2: { name: '', members: 1, score: 0 }
};

let currentQuestion = null;
let currentTeam = 1;
let timerInterval;
let timeLeft = 60;
let answeredQuestionsCount = 0;
const totalQuestions = 24; // 6 categories * 4 points

// بيانات الأسئلة لكل فئة
const questionsData = {
  // 1. خريف القلب
  'khalif-alqalb': {
    name: 'خريف القلب',
    image: 'logo.png',
    questions: {
      200: { question: 'من هو بطل مسلسل "خريف القلب"؟', answer: 'خالد' },
      300: { question: 'في أي مدينة تدور أحداث المسلسل؟', answer: 'الكويت' },
      500: { question: 'ما اسم زوجة خالد في المسلسل؟', answer: 'سارة' },
      800: { question: 'ما الحدث الرئيسي في الحلقة العاشرة؟', answer: 'وفاة والد خالد' }
    }
  },

  // 2. شباب البومب
  'shabab-albomb': {
    name: 'شباب البومب',
    image: 'logo.png',
    questions: {
      200: { question: 'من أشهر شخصيات "شباب البومب"؟', answer: 'عتيج' },
      300: { question: 'كم عدد أبطال "شباب البومب" في الموسم الأول؟', answer: '5' },
      500: { question: 'في أي حي يعيش أبطال المسلسل؟', answer: 'المنقف' },
      800: { question: 'ما المشكلة التي تواجه الفرقة في الموسم الثالث؟', answer: 'تفكك الفرقة' }
    }
  },

  // 3. دراما كويتية
  'kuwaiti-dramas': {
    name: 'دراما كويتية',
    image: 'logo.png',
    questions: {
      200: { question: 'ما أشهر مسلسل كويتي في العقد الماضي؟', answer: 'صباح الخير يا كويت' },
      300: { question: 'من هو ممثل مسلسل "الطريق إلى حيفا"؟', answer: 'يوسف المطيري' },
      500: { question: 'ما موضوع مسلسل "طوق البنات"؟', answer: 'تحديات البنات' },
      800: { question: 'من الكاتبة المعروفة في الدراما الكويتية؟', answer: 'إيمان محمد' }
    }
  },

  // 4. مسلسلات رمضان
  'ramadan-series': {
    name: 'مسلسلات رمضان',
    image: 'logo.png',
    questions: {
      200: { question: 'أي مسلسل رمضان كان الأكثر مشاهدة عام 2023؟', answer: 'الملك' },
      300: { question: 'ما الموضوع الشائع في مسلسلات رمضان؟', answer: 'الدراما الاجتماعية' },
      500: { question: 'من الممثل السعودي الشهير في مسلسلات رمضان؟', answer: 'ناصر القصبي' },
      800: { question: 'ما اسم المسلسل التاريخي في رمضان 2024؟', answer: 'الزعيم' }
    }
  },

  // 5. دراما خليجية
  'gulf-dramas': {
    name: 'دراما خليجية',
    image: 'logo.png',
    questions: {
      200: { question: 'أي دولة خليجية تنتج أكبر عدد من المسلسلات؟', answer: 'السعودية' },
      300: { question: 'من الممثل الإماراتي المشهور؟', answer: 'حسين الجسمي' },
      500: { question: 'ما اسم مسلسل خليجي يتناول موضوع القبائل؟', answer: 'القبيلة' },
      800: { question: 'أي مسلسل خليجي حقق أعلى مشاهدة في 2022؟', answer: 'بنات الملاكمة' }
    }
  },

  // 6. مسلسلات عربية
  'arabic-series': {
    name: 'مسلسلات عربية',
    image: 'logo.png',
    questions: {
      200: { question: 'أي مسلسل عربي كان الأكثر مشاهدة عام 2023؟', answer: 'الهيبة' },
      300: { question: 'من أين أنتج مسلسل "عروس بيروت"؟', answer: 'لبنان' },
      500: { question: 'من هو بطل مسلسل "الطاووس"؟', answer: 'جمال' },
      800: { question: 'ما اسم المسلسل العربي الذي يناقش القضايا الاجتماعية؟', answer: 'خمسة ونص' }
    }
  },

  // 7. دراما سعودية
  'saudi-series': {
    name: 'دراما سعودية',
    image: 'logo.png',
    questions: {
      200: { question: 'من أشهر الممثلين في الدراما السعودية؟', answer: 'ناصر القصبي' },
      300: { question: 'ما اسم مسلسل سعودي تناول قضية الأسرة؟', answer: 'طاش ما طاش' },
      500: { question: 'في أي عام بدأ عرض مسلسل "العاصوف"؟', answer: '2018' },
      800: { question: 'من كاتب مسلسل "العاصوف"؟', answer: 'محمد الحمد' }
    }
  },

  // 8. دراما كورية
  'korean-dramas': {
    name: 'دراما كورية',
    image: 'logo.png',
    questions: {
      200: { question: 'ما اسم أشهر مسلسل كوري عن الطب؟', answer: 'Hospital Playlist' },
      300: { question: 'من هو بطل مسلسل "Crash Landing on You"؟', answer: 'هيون بين' },
      500: { question: 'ما اسم المسلسل الذي يتحدث عن العالم الافتراضي؟', answer: 'Kingdom' },
      800: { question: 'أي مسلسل كوري رومانسي حقق شهرة كبيرة في 2020؟', answer: 'Itaewon Class' }
    }
  },

  // 9. مسلسلات تركية
  'turkish-series': {
    name: 'مسلسلات تركية',
    image: 'logo.png',
    questions: {
      200: { question: 'ما اسم المسلسل التركي الشهير عن العائلة؟', answer: 'نور' },
      300: { question: 'من هو بطل مسلسل "قيامة أرطغرل"؟', answer: 'إنجين ألتان' },
      500: { question: 'ما اسم المسلسل الذي تدور أحداثه حول الطب؟', answer: 'الطبيب المعجزة' },
      800: { question: 'أي مسلسل تركي حقق أعلى نسبة مشاهدة في 2022؟', answer: 'الميراث' }
    }
  },

  // 10. كرتون أطفال
  'kids-cartoons': {
    name: 'كرتون أطفال',
    image: 'logo.png',
    questions: {
      200: { question: 'ما اسم الشخصية الرئيسية في "توم وجيري"؟', answer: 'توم' },
      300: { question: 'في أي سنة بدأ عرض مسلسل "سوبر أصدقاء"؟', answer: '1973' },
      500: { question: 'ما اسم الكرتون الذي يتحدث عن ديناصورات؟', answer: 'ديناصور جوان' },
      800: { question: 'ما اسم الكرتون الذي يدور حول عالم البحار؟', answer: 'نيمو' }
    }
  },

  // 11. أنمي
  'anime': {
    name: 'أنمي',
    image: 'logo.png',
    questions: {
      200: { question: 'ما اسم أنمي الفتى الذي يمتلك قوة النار؟', answer: 'ناروتو' },
      300: { question: 'من هو بطل أنمي "ون بيس"؟', answer: 'لوفي' },
      500: { question: 'أي أنمي مشهور عن مدرسة السحر؟', answer: 'ماجي' },
      800: { question: 'ما اسم أنمي الفضاء الشهير "كابتن تسوباسا"؟', answer: 'كابتن ماجد' }
    }
  },

  // 12. كرة قدم
  'football': {
    name: 'كرة القدم',
    image: 'logo.png',
    questions: {
      200: { question: 'من هو اللاعب صاحب الرقم القياسي في تسجيل الأهداف؟', answer: 'ميسي' },
      300: { question: 'أي منتخب فاز بكأس العالم 2018؟', answer: 'فرنسا' },
      500: { question: 'من هو المدرب الحالي لمنتخب ألمانيا؟', answer: 'هانز فليك' },
      800: { question: 'أي فريق فاز بدوري أبطال أوروبا 2023؟', answer: 'مانشستر سيتي' }
    }
  },

  // 13. سيارات
  'cars': {
    name: 'السيارات',
    image: 'logo.png',
    questions: {
      200: { question: 'أي شركة صنعت سيارة "كورفيت"؟', answer: 'شيفروليه' },
      300: { question: 'ما هو نوع المحرك في سيارة "تسلا موديل S"؟', answer: 'كهربائي' },
      500: { question: 'أي سيارة تعتبر الأسرع في العالم؟', answer: 'بوجاتي تشيرون' },
      800: { question: 'ما معنى اختصار "SUV" في السيارات؟', answer: 'سيارة متعددة الاستخدامات' }
    }
  },

  // 14. تكنولوجيا
  'technology': {
    name: 'تكنولوجيا',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هو أشهر نظام تشغيل للهواتف الذكية؟', answer: 'أندرويد' },
      300: { question: 'من اخترع الإنترنت؟', answer: 'تيم برنرز لي' },
      500: { question: 'ما هو الذكاء الاصطناعي؟', answer: 'نظام يحاكي الذكاء البشري' },
      800: { question: 'ما اسم أول حاسوب في التاريخ؟', answer: 'ENIAC' }
    }
  },

  // 15. سوشال ميديا
  'social-media': {
    name: 'سوشال ميديا',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هو أشهر تطبيق لمشاركة الصور؟', answer: 'إنستغرام' },
      300: { question: 'من هو مؤسس تويتر؟', answer: 'جاك دورسي' },
      500: { question: 'ما هو التحدي الشهير في التيك توك؟', answer: 'تحدي الرقص' },
      800: { question: 'أي منصة اجتماعية تسمح بالبث المباشر فقط؟', answer: 'تويتش' }
    }
  },

  // 16. تاريخ
  'history': {
    name: 'تاريخ',
    image: 'logo.png',
    questions: {
      200: { question: 'في أي عام حدثت ثورة 1917 الروسية؟', answer: '1917' },
      300: { question: 'من كان أول رئيس للولايات المتحدة؟', answer: 'جورج واشنطن' },
      500: { question: 'ما اسم الحرب العالمية الثانية بالإنجليزي؟', answer: 'World War II' },
      800: { question: 'من هو الملك الذي حكم مصر قبل الثورة؟', answer: 'فاروق' }
    }
  },

  // 17. جغرافيا
  'geography': {
    name: 'جغرافيا',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هي عاصمة فرنسا؟', answer: 'باريس' },
      300: { question: 'أي دولة تحتوي على أكبر صحراء؟', answer: 'الجزائر' },
      500: { question: 'ما أطول نهر في العالم؟', answer: 'النيل' },
      800: { question: 'ما اسم أعلى جبل في العالم؟', answer: 'إيفرست' }
    }
  },

  // 18. موسيقى
  'music': {
    name: 'موسيقى',
    image: 'logo.png',
    questions: {
      200: { question: 'من هو ملك البوب؟', answer: 'مايكل جاكسون' },
      300: { question: 'ما اسم فرقة البيتلز؟', answer: 'The Beatles' },
      500: { question: 'أي آلة موسيقية تحتوي على مفاتيح بيضاء وسوداء؟', answer: 'البيانو' },
      800: { question: 'ما هو نوع موسيقى الريغي؟', answer: 'موسيقى جامايكية' }
    }
  },

  // 19. أفلام
  'movies': {
    name: 'أفلام',
    image: 'logo.png',
    questions: {
      200: { question: 'من هو مخرج فيلم "تيتانيك"؟', answer: 'جيمس كاميرون' },
      300: { question: 'ما اسم شخصية هاري بوتر؟', answer: 'هاري بوتر' },
      500: { question: 'أي فيلم فاز بأوسكار أفضل فيلم عام 2020؟', answer: 'باراسايت' },
      800: { question: 'من كان بطل فيلم "إنسبشن"؟', answer: 'ليوناردو دي كابريو' }
    }
  },

  // 20. طعام
  'food': {
    name: 'طعام',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هي الدولة التي تشتهر بالبيتزا؟', answer: 'إيطاليا' },
      300: { question: 'ما هو المكون الرئيسي للسوشي؟', answer: 'الأرز' },
      500: { question: 'ما اسم الطبق السعودي التقليدي من اللحم والأرز؟', answer: 'الكبسة' },
      800: { question: 'ما هي التوابل الرئيسية في الكاري الهندي؟', answer: 'الكركم والكمون' }
    }
  },

  // 21. موضة
  'fashion': {
    name: 'موضة',
    image: 'logo.png',
    questions: {
      200: { question: 'من هو مصمم الأزياء الشهير "كوكو شانيل"؟', answer: 'مصمم أزياء فرنسي' },
      300: { question: 'ما اسم الموضة التي تعتمد على الملابس الرياضية؟', answer: 'سبورتشيك' },
      500: { question: 'أي علامة تجارية شهيرة تستخدم شعار المثلث؟', answer: 'برادا' },
      800: { question: 'ما اسم مصمم الأزياء الإيطالي الشهير "جورجيو أرماني"؟', answer: 'مصمم أزياء' }
    }
  },

  // 22. كتب
  'books': {
    name: 'كتب',
    image: 'logo.png',
    questions: {
      200: { question: 'من هو مؤلف "ألف ليلة وليلة"؟', answer: 'غير معروف' },
      300: { question: 'من كتب رواية "مئة عام من العزلة"؟', answer: 'غابرييل غارسيا ماركيز' },
      500: { question: 'ما هو نوع كتاب "الحرب والسلام"؟', answer: 'رواية تاريخية' },
      800: { question: 'من هو الشاعر العربي المعروف بـ "أمير الشعراء"؟', answer: 'أحمد شوقي' }
    }
  },

  // 23. علوم
  'science': {
    name: 'علوم',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هو أكبر كوكب في المجموعة الشمسية؟', answer: 'المشتري' },
      300: { question: 'من اكتشف الجاذبية؟', answer: 'إسحاق نيوتن' },
      500: { question: 'ما هو عنصر الكيمياء الذي يرمز له بـ "O"؟', answer: 'الأكسجين' },
      800: { question: 'ما هو اسم نظرية التطور؟', answer: 'نظرية داروين' }
    }
  },

  // 24. أفلام كلاسيكية
  'movies-classics': {
    name: 'أفلام كلاسيكية',
    image: 'logo.png',
    questions: {
      200: { question: 'في أي عام صدر فيلم "ذهب مع الريح"؟', answer: '1939' },
      300: { question: 'من هو بطل فيلم "كازابلانكا"؟', answer: 'همفري بوجارت' },
      500: { question: 'ما اسم مخرج فيلم "المواطن كين"؟', answer: 'أورسن ويلز' },
      800: { question: 'أي فيلم يعتبر أول فيلم صوتي؟', answer: 'The Jazz Singer' }
    }
  },

  // 25. ألعاب فيديو
  'gaming': {
    name: 'ألعاب فيديو',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هي أشهر لعبة باتل رويال؟', answer: 'فورتنايت' },
      300: { question: 'من هو بطل لعبة "أساسنز كريد"؟', answer: 'إزيو' },
      500: { question: 'ما اسم شركة صنع لعبة "ماينكرافت"؟', answer: 'موجانج' },
      800: { question: 'ما هي أول لعبة فيديو تم إصدارها؟', answer: 'بونغ' }
    }
  },

  // 26. فضاء
  'space': {
    name: 'فضاء',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هو اسم أول إنسان مشى على سطح القمر؟', answer: 'نيل أرمسترونغ' },
      300: { question: 'ما هو كوكب المريخ المعروف بلونه؟', answer: 'الكوكب الأحمر' },
      500: { question: 'ما هو أكبر قمر لكوكب زحل؟', answer: 'تيتان' },
      800: { question: 'ما اسم المركبة التي هبطت على المريخ في 2021؟', answer: 'برسيفيرانس' }
    }
  },

  // 27. حيوانات
  'animals': {
    name: 'حيوانات',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هو الحيوان الذي يُعرف بـ "ملك الغابة"؟', answer: 'الأسد' },
      300: { question: 'أي حيوان يستطيع الطيران؟', answer: 'الخفاش' },
      500: { question: 'ما هو أسرع حيوان بري؟', answer: 'الفهد' },
      800: { question: 'ما اسم أكبر حيوان بحري؟', answer: 'الحوت الأزرق' }
    }
  },

  // 28. حيوانات أليفة
  'pets': {
    name: 'حيوانات أليفة',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هو الحيوان الأليف الأكثر شعبية؟', answer: 'القطط' },
      300: { question: 'كم عدد أسنان الكلب؟', answer: '42' },
      500: { question: 'ما نوع الطعام المناسب للقطط؟', answer: 'طعام خاص بالقطط' },
      800: { question: 'ما هي طريقة تدريب الكلاب على الطاعة؟', answer: 'التكرار والمكافأة' }
    }
  },

  // 29. تاريخ السيارات
  'cars-history': {
    name: 'تاريخ السيارات',
    image: 'logo.png',
    questions: {
      200: { question: 'من اخترع أول سيارة تعمل بالبخار؟', answer: 'نيكولاس جوزيف كوجنوت' },
      300: { question: 'في أي عام صنعت أول سيارة بمحرك احتراق داخلي؟', answer: '1886' },
      500: { question: 'من هو مؤسس شركة فورد؟', answer: 'هنري فورد' },
      800: { question: 'ما اسم أول سيارة كهربائية تجارية؟', answer: 'نيكولا' }
    }
  },

  // 30. مسلسلات مشهورة
  'popular-tv-shows': {
    name: 'مسلسلات مشهورة',
    image: 'logo.png',
    questions: {
      200: { question: 'ما اسم المسلسل الأمريكي "Game of Thrones" بالعربي؟', answer: 'صراع العروش' },
      300: { question: 'من هو بطل مسلسل "Breaking Bad"؟', answer: 'والتر وايت' },
      500: { question: 'ما اسم المسلسل الذي تدور أحداثه في السجن؟', answer: 'Prison Break' },
      800: { question: 'أي مسلسل كوميدي أمريكي يدور في مكتب؟', answer: 'The Office' }
    }
  },

  // 31. كوميكس
  'comics': {
    name: 'كوميكس',
    image: 'logo.png',
    questions: {
      200: { question: 'من هو بطل سوبرمان؟', answer: 'كلارك كينت' },
      300: { question: 'ما اسم العدو اللدود لباتمان؟', answer: 'الجوكر' },
      500: { question: 'في أي مجلة نُشرت قصص الرجل العنكبوت؟', answer: 'مارفل' },
      800: { question: 'من هو مؤلف "Watchmen"؟', answer: 'آلان مور' }
    }
  },

  // 32. أساطير
  'mythology': {
    name: 'أساطير',
    image: 'logo.png',
    questions: {
      200: { question: 'من هو إله الرعد في الأساطير الإسكندنافية؟', answer: 'ثور' },
      300: { question: 'ما اسم الإلهة اليونانية للحكمة؟', answer: 'أثينا' },
      500: { question: 'ما أسطورة أصل خلق العالم عند المصريين القدماء؟', answer: 'إله أتوم' },
      800: { question: 'ما اسم المخلوق الأسطوري نصف إنسان ونصف حصان؟', answer: 'السنتور' }
    }
  },

  // 33. لغات
  'languages': {
    name: 'لغات',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هي اللغة الرسمية في البرازيل؟', answer: 'البرتغالية' },
      300: { question: 'كم عدد حروف اللغة العربية؟', answer: '28' },
      500: { question: 'ما هي لغة البرمجة الأكثر استخداماً؟', answer: 'جافا سكريبت' },
      800: { question: 'ما أصل اللغة الإنجليزية؟', answer: 'اللغة الجرمانية' }
    }
  },

  // 34. جوائز الأفلام
  'movies-awards': {
    name: 'جوائز الأفلام',
    image: 'logo.png',
    questions: {
      200: { question: 'ما اسم جائزة الأوسكار؟', answer: 'الأكاديمية الأمريكية للعلوم والفنون السينمائية' },
      300: { question: 'أي فيلم حصل على أكبر عدد من جوائز الأوسكار؟', answer: 'تيتانيك' },
      500: { question: 'من هو أصغر مخرج يحصل على جائزة أوسكار؟', answer: 'داميان شازيل' },
      800: { question: 'في أي مدينة تقام جوائز الأوسكار؟', answer: 'لوس أنجلوس' }
    }
  },

  // 35. سفر
  'travel': {
    name: 'السفر',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هي عاصمة اليابان؟', answer: 'طوكيو' },
      300: { question: 'أي قارة تضم أكبر عدد من الدول؟', answer: 'أفريقيا' },
      500: { question: 'ما أشهر معلم سياحي في فرنسا؟', answer: 'برج إيفل' },
      800: { question: 'ما اسم أطول نهر في أمريكا الجنوبية؟', answer: 'الأمازون' }
    }
  },

  // 36. سباقات سيارات
  'cars-racing': {
    name: 'سباقات سيارات',
    image: 'logo.png',
    questions: {
      200: { question: 'ما اسم سباق الفورمولا 1 الأشهر؟', answer: 'جائزة موناكو الكبرى' },
      300: { question: 'من هو أسرع سائق في التاريخ؟', answer: 'لويس هاميلتون' },
      500: { question: 'ما اسم فريق سباقات فيراري؟', answer: 'Scuderia Ferrari' },
      800: { question: 'أي سباق يعتبر أطول سباق سيارات؟', answer: '24 ساعة لو مان' }
    }
  },

  // 37. طعام عالمي
  'world-food': {
    name: 'طعام عالمي',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هو الطعام الإيطالي الشهير؟', answer: 'البيتزا' },
      300: { question: 'ما هو الطبق الياباني التقليدي؟', answer: 'السوشي' },
      500: { question: 'ما هو الطبق المكسيكي الشهير؟', answer: 'التاكو' },
      800: { question: 'ما هي الأكلة الفرنسية الشهيرة؟', answer: 'الكروسان' }
    }
  },

  // 38. علوم الفضاء
  'space-science': {
    name: 'علوم الفضاء',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هو اسم الكوكب الأحمر؟', answer: 'المريخ' },
      300: { question: 'كم عدد كواكب المجموعة الشمسية؟', answer: '8' },
      500: { question: 'ما هو اسم التلسكوب الشهير في الفضاء؟', answer: 'هابل' },
      800: { question: 'ما هي سرعة الضوء؟', answer: '299792458 متر/ثانية' }
    }
  },

  // 39. تقنية معلومات
  'it-technology': {
    name: 'تقنية معلومات',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هو اختصار "HTTP"؟', answer: 'HyperText Transfer Protocol' },
      300: { question: 'ما هو نظام التشغيل الأكثر استخداماً في الحواسيب؟', answer: 'ويندوز' },
      500: { question: 'ما هو البرمجة الكائنية التوجه؟', answer: 'نمط برمجة يعتمد على الكائنات' },
      800: { question: 'ما هي لغة البرمجة التي تستخدم في تطوير تطبيقات أندرويد؟', answer: 'جافا' }
    }
  },

  // 40. سيارات رياضية
  'sports-cars': {
    name: 'سيارات رياضية',
    image: 'logo.png',
    questions: {
      200: { question: 'ما هي أشهر سيارة رياضية يابانية؟', answer: 'نيسان جي تي آر' },
      300: { question: 'ما هي قوة محرك كورفيت C6 ZR1؟', answer: '638 حصان' },
      500: { question: 'ما اسم شركة صناعة سيارة "فيراري"؟', answer: 'فيراري' },
      800: { question: 'ما هو نوع محرك سيارة "بوغاتي فيرون"؟', answer: 'محرك W16' }



        }
    }
};

// وظائف التنقل بين الصفحات
function showHomePage() {
    hideAllPages();
    document.getElementById('home-page').classList.add('active');
    resetGame();
}

function showCategorySelection() {
    hideAllPages();
    document.getElementById('category-page').classList.add('active');
    selectedCategories = [];
    updateCategorySelection();
}

function showGameSetup() {
    if (selectedCategories.length !== 6) {
        alert('يجب اختيار 6 فئات بالضبط');
        return;
    }
    hideAllPages();
    document.getElementById('setup-page').classList.add('active');
}

function startGame() {
    // جمع بيانات الإعداد
    gameData.name = document.getElementById('game-name').value || 'لعبة إختبرهم';
    gameData.team1.name = document.getElementById('team1-name').value || 'الفريق الأول';
    gameData.team2.name = document.getElementById('team2-name').value || 'الفريق الثاني';
    gameData.team1.members = parseInt(document.getElementById('team1-members').value) || 1;
    gameData.team2.members = parseInt(document.getElementById('team2-members').value) || 1;
    gameData.team1.score = 0;
    gameData.team2.score = 0;

    hideAllPages();
    document.getElementById('game-page').classList.add('active');
    setupGameBoard();
    updateGameDisplay();
}

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
}

// وظائف اختيار الفئات
function setupCategorySelection() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            toggleCategory(category, this);
        });
    });
}

function toggleCategory(category, cardElement) {
    if (selectedCategories.includes(category)) {
        // إلغاء الاختيار
        selectedCategories = selectedCategories.filter(c => c !== category);
        cardElement.classList.remove('selected');
    } else {
        // إضافة الاختيار
        if (selectedCategories.length < 6) {
            selectedCategories.push(category);
            cardElement.classList.add('selected');
        } else {
            showNotification('لا يمكن اختيار أكثر من 6 فئات');
        }
    }
    
    updateCategorySelection();
}

function updateCategorySelection() {
    document.getElementById('selected-count').textContent = selectedCategories.length;
    
    const continueBtn = document.querySelector('.continue-btn');
    continueBtn.disabled = selectedCategories.length !== 6;
}

// إعداد لوحة اللعب
function setupGameBoard() {
    const board = document.getElementById('categories-board');
    board.innerHTML = '';
    
    selectedCategories.forEach(categoryId => {
        const categoryData = questionsData[categoryId];
        if (!categoryData) return;
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'game-category';
        categoryElement.innerHTML = `
            <img src="${categoryData.image}" alt="${categoryData.name}" class="category-header-image">
            <h3>${categoryData.name}</h3>
            <div class="points-grid">
                <button class="point-card" onclick="showQuestion(\'${categoryId}\', 200, this)">200</button>
                <button class="point-card" onclick="showQuestion(\'${categoryId}\', 300, this)">300</button>
                <button class="point-card" onclick="showQuestion(\'${categoryId}\', 500, this)">500</button>
                <button class="point-card" onclick="showQuestion(\'${categoryId}\', 800, this)">800</button>
            </div>
        `;
        
        board.appendChild(categoryElement);
    });
}

function updateGameDisplay() {
    document.getElementById('current-game-name').textContent = gameData.name;
    document.getElementById('team1-display').textContent = `${gameData.team1.name} (${gameData.team1.members})`;
    document.getElementById('team2-display').textContent = `${gameData.team2.name} (${gameData.team2.members})`;
    document.getElementById('team1-score').textContent = gameData.team1.score;
    document.getElementById('team2-score').textContent = gameData.team2.score;
}

// وظائف الأسئلة
function showQuestion(categoryId, points, clickedButton) {
    const categoryData = questionsData[categoryId];
    if (!categoryData || !categoryData.questions[points]) return;
    
    currentQuestion = {
        category: categoryId,
        categoryName: categoryData.name,
        points: points,
        text: categoryData.questions[points].question,
        answer: categoryData.questions[points].answer,
        button: clickedButton
    };
    
    document.getElementById('question-category').textContent = categoryData.name;
    document.getElementById('question-points').textContent = points;
    document.getElementById('question-text').textContent = currentQuestion.text;
    document.getElementById('question-category-image').src = categoryData.image;

    document.getElementById('question-modal').style.display = 'block';
    
    // تعطيل الزر
    clickedButton.disabled = true;
    clickedButton.style.background = '#ccc';

    startTimer();
}

function closeQuestion() {
    document.getElementById('question-modal').style.display = 'none';
    currentQuestion = null;
    stopTimer();
}

function markCorrect() {
    if (!currentQuestion) return;
    
    const currentTeamData = currentTeam === 1 ? gameData.team1 : gameData.team2;
    currentTeamData.score += currentQuestion.points;
    
    updateGameDisplay();
    showNotification(`إجابة صحيحة! +${currentQuestion.points} نقطة لـ ${currentTeamData.name}`);
    
    answeredQuestionsCount++;
    checkGameEnd();
    closeQuestion();
    
    // تبديل الدور
    currentTeam = currentTeam === 1 ? 2 : 1;
}

function markWrong() {
    if (!currentQuestion) return;
    
    const currentTeamData = currentTeam === 1 ? gameData.team1 : gameData.team2;
    showNotification(`إجابة خاطئة! لا توجد نقاط لـ ${currentTeamData.name}`);
    
    answeredQuestionsCount++;
    checkGameEnd();
    closeQuestion();
    
    // تبديل الدور
    currentTeam = currentTeam === 1 ? 2 : 1;
}

function startTimer() {
    timeLeft = 60;
    document.getElementById('question-timer').textContent = '01:00';
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('question-timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showNotification('انتهى الوقت!');
            markWrong(); // اعتبارها إجابة خاطئة عند انتهاء الوقت
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function showHelpOptions() {
    alert('وسائل المساعدة: \n1. اتصال بصديق (غير متوفر حالياً)\n2. بحث في الإنترنت (غير متوفر حالياً)');
}

function showAnswer() {
    if (!currentQuestion) return;
    
    // إظهار الإجابة في نافذة اختيار الفائز
    document.getElementById('correct-answer-text').textContent = currentQuestion.answer;
    document.getElementById('answer-display').style.display = 'block';
    
    // تحديث أسماء الفرق في أزرار الاختيار
    document.getElementById('team1-winner-btn').textContent = gameData.team1.name;
    document.getElementById('team2-winner-btn').textContent = gameData.team2.name;
    
    // إخفاء نافذة السؤال وإظهار نافذة اختيار الفائز
    document.getElementById('question-modal').style.display = 'none';
    document.getElementById('winner-selection-modal').style.display = 'block';
    
    stopTimer();
}

function selectWinner(teamNumber) {
    if (!currentQuestion) return;
    
    let winnerTeam = null;
    let message = '';
    
    if (teamNumber === 1) {
        winnerTeam = gameData.team1;
        gameData.team1.score += currentQuestion.points;
        message = `إجابة صحيحة! +${currentQuestion.points} نقطة لـ ${gameData.team1.name}`;
    } else if (teamNumber === 2) {
        winnerTeam = gameData.team2;
        gameData.team2.score += currentQuestion.points;
        message = `إجابة صحيحة! +${currentQuestion.points} نقطة لـ ${gameData.team2.name}`;
    } else {
        message = 'لا توجد نقاط لأي فريق';
    }
    
    // إخفاء نافذة اختيار الفائز
    document.getElementById('winner-selection-modal').style.display = 'none';
    document.getElementById('answer-display').style.display = 'none';
    
    // تحديث العرض
    updateGameDisplay();
    showNotification(message);
    
    // إنهاء السؤال الحالي
    answeredQuestionsCount++;
    checkGameEnd();
    currentQuestion = null;
    
    // تبديل الدور
    currentTeam = currentTeam === 1 ? 2 : 1;
}

function checkGameEnd() {
    // فحص إذا وصل أحد الفرق إلى 3000 نقطة
    if (gameData.team1.score >= 3000 || gameData.team2.score >= 3000) {
        showWinner();
        return;
    }
    
    // فحص إذا انتهت جميع الأسئلة
    if (answeredQuestionsCount === totalQuestions) {
        showWinner();
    }
}

function showWinner() {
    hideAllPages();
    document.getElementById('winner-modal').classList.add('active');

    let winnerText = '';
    let finalScoresText = `الفريق الأول: ${gameData.team1.score} نقطة\nالفريق الثاني: ${gameData.team2.score} نقطة`;

    // فحص إذا وصل أحد الفرق إلى 3000 نقطة
    if (gameData.team1.score >= 3000 && gameData.team2.score >= 3000) {
        // إذا وصل كلا الفريقين إلى 3000، الفائز هو صاحب النقاط الأعلى
        if (gameData.team1.score > gameData.team2.score) {
            winnerText = `🎉 الفريق الفائز هو: ${gameData.team1.name}!\nوصل إلى ${gameData.team1.score} نقطة!`;
        } else if (gameData.team2.score > gameData.team1.score) {
            winnerText = `🎉 الفريق الفائز هو: ${gameData.team2.name}!\nوصل إلى ${gameData.team2.score} نقطة!`;
        } else {
            winnerText = '🤝 تعادل مثالي! كلا الفريقين وصل إلى 3000 نقطة!';
        }
    } else if (gameData.team1.score >= 3000) {
        winnerText = `🎉 الفريق الفائز هو: ${gameData.team1.name}!\nوصل إلى ${gameData.team1.score} نقطة أولاً!`;
    } else if (gameData.team2.score >= 3000) {
        winnerText = `🎉 الفريق الفائز هو: ${gameData.team2.name}!\nوصل إلى ${gameData.team2.score} نقطة أولاً!`;
    } else {
        // انتهت الأسئلة بدون وصول أحد إلى 3000
        if (gameData.team1.score > gameData.team2.score) {
            winnerText = `الفريق الفائز هو: ${gameData.team1.name}!`;
        } else if (gameData.team2.score > gameData.team1.score) {
            winnerText = `الفريق الفائز هو: ${gameData.team2.name}!`;
        } else {
            winnerText = 'تعادل! لا يوجد فائز.';
        }
    }

    document.getElementById('winner-text').textContent = winnerText;
    document.getElementById('final-scores').textContent = finalScoresText;
}

function closeWinnerModal() {
    document.getElementById('winner-modal').classList.remove('active');
    showHomePage();
}

function resetGame() {
    gameData.team1.score = 0;
    gameData.team2.score = 0;
    currentTeam = 1;
    answeredQuestionsCount = 0;
    updateGameDisplay();
    
    // إعادة تفعيل جميع الأزرار
    document.querySelectorAll('.point-card').forEach(btn => {
        btn.disabled = false;
        btn.style.background = '';
    });
    
    showNotification('تم إعادة تعيين النقاط');
}

// وظائف مساعدة
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #28a745, #20c997);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
        z-index: 10000;
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// إضافة مستمعي الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setupCategorySelection();
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('question-modal');
        if (event.target === modal) {
            closeQuestion();
        }
    });
    
    // تأثيرات بصرية إضافية
    addVisualEffects();
});

function addVisualEffects() {
    // تأثير الجسيمات في الخلفية
    createParticles();
    
    // تأثير التمرير السلس
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

function createParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        document.body.appendChild(particle);
    }
}

// إضافة CSS للحركة
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

