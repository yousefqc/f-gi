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
    // محافظات الكويت ومناطقها الرئيسية
    'capital-governorate': {
        name: 'محافظة العاصمة',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'ما هي عاصمة الكويت؟', answer: 'الكويت' },
            300: { question: 'في أي منطقة تقع أبراج الكويت؟', answer: 'مدينة الكويت' },
            500: { question: 'ما هو اسم المنطقة التي تضم قصر السيف؟', answer: 'المرقاب' },
            800: { question: 'ما هي المنطقة التي تشتهر بوجود العديد من السفارات؟', answer: 'الدعية' }
        }
    },
    'hawalli-governorate': {
        name: 'محافظة حولي',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'ما هي أكبر منطقة تجارية في محافظة حولي؟', answer: 'السالمية' },
            300: { question: 'ما هو اسم المجمع التجاري الشهير في حولي؟', answer: 'مجمع الأفنيوز' },
            500: { question: 'ما هو اسم المنطقة التي تضم العديد من المستشفيات الخاصة؟', answer: 'الجابرية' },
            800: { question: 'ما هو اسم المنطقة التي تشتهر بوجود العديد من السفارات؟', answer: 'بيان' }
        }
    },
    'farwaniya-governorate': {
        name: 'محافظة الفروانية',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'ما هي أكبر منطقة في محافظة الفروانية؟', answer: 'الفروانية' },
            300: { question: 'ما هو اسم المطار الدولي في الفروانية؟', answer: 'مطار الكويت الدولي' },
            500: { question: 'ما هو اسم المنطقة التي تشتهر بوجود العديد من الأسواق الشعبية؟', answer: 'خيطان' },
            800: { question: 'ما هو اسم المنطقة التي تضم جامعة الشدادية؟', answer: 'الشدادية' }
        }
    },
    'ahmadi-governorate': {
        name: 'محافظة الأحمدي',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'ما هي أكبر مدينة في محافظة الأحمدي؟', answer: 'الأحمدي' },
            300: { question: 'ما هو اسم الميناء النفطي في الأحمدي؟', answer: 'ميناء الأحمدي' },
            500: { question: 'ما هو اسم المنطقة التي تشتهر بوجود العديد من المخيمات الربيعية؟', answer: 'الوفرة' },
            800: { question: 'ما هو اسم المنطقة الساحلية التي تضم العديد من الشاليهات؟', answer: 'الخيران' }
        }
    },
    'jahra-governorate': {
        name: 'محافظة الجهراء',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'ما هي أكبر محافظة في الكويت من حيث المساحة؟', answer: 'الجهراء' },
            300: { question: 'ما هو اسم المنطقة التي تشتهر بوجود العديد من المزارع؟', answer: 'العبدلي' },
            500: { question: 'ما هو اسم المنطقة التي تضم محمية الجهراء الطبيعية؟', answer: 'الجهراء' },
            800: { question: 'ما هو اسم المنطقة التي تضم مشروع مدينة الحرير؟', answer: 'الصبية' }
        }
    },
    'mubarak-al-kabeer-governorate': {
        name: 'محافظة مبارك الكبير',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'ما هي أكبر منطقة في محافظة مبارك الكبير؟', answer: 'مبارك الكبير' },
            300: { question: 'ما هو اسم المنطقة التي تضم العديد من المجمعات التجارية؟', answer: 'أبو فطيرة' },
            500: { question: 'ما هو اسم المنطقة التي تشتهر بوجود العديد من المدارس؟', answer: 'العدان' },
            800: { question: 'ما هو اسم المنطقة التي تضم مستشفى مبارك الكبير؟', answer: 'صباح السالم' }
        }
    },
    // كرر السطر التالي لباقي الفئات:
    'kuwaiti-restaurants': {
        name: 'مطاعم الكويت',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'شنو أشهر مطعم يقدم مجابيس في الكويت؟', answer: 'فريج صويلح' },
            300: { question: 'مطعم "مغل محل" شنو يقدم من أكل؟', answer: 'هندي' },
            500: { question: 'اذكر اسم مطعم كويتي شعبي معروف؟', answer: 'ميس الغانم' },
            800: { question: 'شنو اسم المطعم اللي يشتهر بالريوق الكويتي؟', answer: 'ريوقنا' }
        }
    },

    'girls-stuff': {
        name: 'بنات وبس',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'شنو اسم أداة المكياج اللي تستخدم لتحديد العين؟', answer: 'كحل' },
            300: { question: 'شنو الماركة اللي تشتهر بشنطها الفاخرة؟', answer: 'هيرميس' },
            500: { question: 'شنو اسم التسريحة اللي تكون فيها الظفيرة على جنب؟', answer: 'الضفيرة الفرنسية' },
            800: { question: 'شنو اسم الحجر الكريم اللي لونه وردي؟', answer: 'كوارتز وردي' }
        }
    },
    'kuwaiti-football': {
        name: 'كورة كويتية',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'شنو لقب نادي القادسية؟', answer: 'الملكي' },
            300: { question: 'منو الهداف التاريخي للمنتخب الكويتي؟', answer: 'بشار عبدالله' },
            500: { question: 'أي نادي كويتي فاز بكأس آسيا للأندية أبطال الدوري؟', answer: 'القادسية' },
            800: { question: 'شنو اسم الملعب اللي يستضيف مباريات المنتخب الكويتي الرئيسية؟', answer: 'جابر الأحمد الدولي' }
        }
    },
    'kuwaiti-history': {
        name: 'تاريخ الكويت',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'منو أول حاكم للكويت من آل صباح؟', answer: 'صباح الأول' },
            300: { question: 'متى استقلت الكويت عن بريطانيا؟', answer: '1961' },
            500: { question: 'شنو اسم المعركة اللي صارت بين الكويت والدولة العثمانية؟', answer: 'الصريف' },
            800: { question: 'منو اللي بنى السور الثالث للكويت؟', answer: 'الشيخ سالم المبارك الصباح' }
        }
    },
    'kuwaiti-proverbs': {
        name: 'أمثال كويتية',
        image: 'https://www.raed.net/img?id=1394455',
        questions: {
            200: { question: 'شنو معنى مثل "يا بخت من وفق راسين بالحلال"؟', answer: 'التوفيق بين شخصين للزواج' },
            300: { question: 'كمل المثل: "اللي ما يعرف الصقر..."؟', answer: 'يشويه' },
            500: { question: 'شنو معنى مثل "إذا فات الفوت ما ينفع الصوت"؟', answer: 'الندم بعد فوات الأوان' },
            800: { question: 'اذكر مثل كويتي عن الكرم؟', answer: 'مد رجولك على قد لحافك' }
        }
    },
'kuwaiti-tourism': {
    name: 'سياحة الكويت',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'شنو اسم أشهر معلم سياحي في الكويت؟', answer: 'أبراج الكويت' },
        300: { question: 'شنو اسم أكبر حديقة حيوان في الكويت؟', answer: 'حديقة الحيوان' },
        500: { question: 'شنو اسم أشهر سوق شعبي في الكويت؟', answer: 'سوق المباركية' },
        800: { question: 'شنو اسم المنتزه المائي الشهير في الكويت؟', answer: 'الأكوابارك' }
    }
},

'world-countries': {
    name: 'دول العالم',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'ما هي عاصمة فرنسا؟', answer: 'باريس' },
        300: { question: 'أي دولة يمثل هذا العلم: أحمر وأبيض وأزرق أفقي؟', answer: 'روسيا' },
        500: { question: 'ما هي أكبر دولة في العالم من حيث المساحة؟', answer: 'روسيا' },
        800: { question: 'كم عدد الدول الأعضاء في الأمم المتحدة تقريباً؟', answer: '193' }
    }
},

'general-knowledge': {
    name: 'ثقافة عامة',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'ما معنى كلمة "استقلال"؟', answer: 'التحرر من السيطرة الأجنبية' },
        300: { question: 'ما هو مرادف كلمة "سعادة"؟', answer: 'فرح' },
        500: { question: 'ما هو ضد كلمة "شجاعة"؟', answer: 'جبن' },
        800: { question: 'ما أصل كلمة "ديمقراطية"؟', answer: 'يوناني' }
    }
},

'history': {
    name: 'التاريخ',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'متى حدثت الحرب العالمية الثانية؟', answer: '1939' },
        300: { question: 'من هو أول إنسان سار على القمر؟', answer: 'نيل أرمسترونغ' },
        500: { question: 'ما هو اسم أقدم حضارة في التاريخ؟', answer: 'السومرية' },
        800: { question: 'من هو مؤسس الدولة العثمانية؟', answer: 'عثمان الأول' }
    }
},

'sports': {
    name: 'الرياضة العالمية',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'كم عدد اللاعبين في فريق كرة القدم؟', answer: '11' },
        300: { question: 'في أي مدينة أقيمت أولمبياد 2020؟', answer: 'طوكيو' },
        500: { question: 'من هو أفضل لاعب كرة قدم في العالم حالياً؟', answer: 'ليونيل ميسي' },
        800: { question: 'كم عدد الألعاب في الأولمبياد الصيفي؟', answer: '33' }
    }
},

'science': {
    name: 'العلوم',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'ما هو الرمز الكيميائي للذهب؟', answer: 'Au' },
        300: { question: 'كم عدد الكواكب في النظام الشمسي؟', answer: '8' },
        500: { question: 'من اكتشف قانون الجاذبية؟', answer: 'إسحاق نيوتن' },
        800: { question: 'ما هو أصغر جسيم في الذرة؟', answer: 'الكوارك' }
    }
},

'technology': {
    name: 'التكنولوجيا',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'ما هو اختصار "الشبكة العنكبوتية العالمية"؟', answer: 'WWW' },
        300: { question: 'ما هو اسم أول نظام تشغيل رسومي؟', answer: 'ماكنتوش' },
        500: { question: 'ما هو اسم العملة الرقمية الأكثر شهرة؟', answer: 'بيتكوين' },
        800: { question: 'ما هو اسم أول لغة برمجة عالية المستوى؟', answer: 'فورتران' }
    }
},

'food': {
    name: 'الأطعمة العالمية',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'ما هي الدولة التي تشتهر بالبيتزا؟', answer: 'إيطاليا' },
        300: { question: 'ما هو المكون الرئيسي للسوشي؟', answer: 'الأرز' },
        500: { question: 'ما هو اسم الطبق المكسيكي الذي يتكون من التورتيلا واللحم؟', answer: 'تاكو' },
        800: { question: 'ما هو اسم الحلوى الفرنسية التي تتكون من طبقات من الكريمة والمعجنات؟', answer: 'ميل فوي' }
    }
},

'movies': {
    name: 'الأفلام العالمية',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'من هو الممثل الرئيسي في فيلم "تيتانيك"؟', answer: 'ليوناردو دي كابريو' },
        300: { question: 'ما هو اسم المخرج الذي أخرج فيلم "إنسبشن"؟', answer: 'كريستوفر نولان' },
        500: { question: 'ما هو اسم الفيلم الذي فاز بجائزة الأوسكار لأفضل فيلم في عام 2020؟', answer: 'طفيلي' },
        800: { question: 'ما هو اسم السلسلة السينمائية التي تدور أحداثها في عالم السحرة؟', answer: 'هاري بوتر' }
    }
},

'flags': {
    name: 'أعلام الدول',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'ما هو لون العلم الياباني؟', answer: 'أبيض وأحمر' },
        300: { question: 'ما هو العلم الذي يحتوي على نجمة وهلال؟', answer: 'تركيا' },
        500: { question: 'ما هو العلم الذي يحتوي على صليب أحمر على خلفية بيضاء؟', answer: 'سويسرا' },
        800: { question: 'ما هو العلم الذي يحتوي على ثلاثة ألوان أفقية: أسود، أحمر، ذهبي؟', answer: 'ألمانيا' }
    }
},

'tourism': {
    name: 'السياحة العالمية',
    image: 'https://www.raed.net/img?id=1394455',
    questions: {
        200: { question: 'ما هي المدينة التي تشتهر ببرج إيفل؟', answer: 'باريس' },
        300: { question: 'ما هو اسم الهرم الأكبر في مصر؟', answer: 'هرم خوفو' },
        500: { question: 'ما هو اسم الجدار العظيم في الصين؟', answer: 'سور الصين العظيم' },
        800: { question: 'ما هو اسم المدينة التي تشتهر بقنواتها المائية؟', answer: 'البندقية' }


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

