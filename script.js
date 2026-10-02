// Master Interactive Script for Youssef Naggar Portfolio
// Theme Manager, Multilingual (EN/AR) Engine, RTL, Lightbox Gallery & Utilities

document.addEventListener('DOMContentLoaded', function() {
    initThemeManager();
    initLanguageManager();
    initProfileImageTilt();
    initSmoothNavigation();
    initCollapsibleSections();
    initLightboxManager();
});

/* ==========================================================================
   THEME MANAGER (LIGHT / DARK MODE)
   ========================================================================== */
function initThemeManager() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
        if (icon) icon.className = 'fas fa-moon';
    } else {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        if (icon) icon.className = 'fas fa-sun';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark-mode');
            document.documentElement.classList.toggle('dark-mode', isDark);
            const themeVal = isDark ? 'dark' : 'light';
            localStorage.setItem('portfolio-theme', themeVal);

            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }
}

/* ==========================================================================
   MULTILINGUAL (EN/AR) & RTL MANAGER
   ========================================================================== */
const translations = {
    en: {
        page_title: "Youssef Naggar - AI Engineer Portfolio",
        page_desc: "Portfolio of Youssef Naggar, 4th-Year AI Engineering Student at Cairo University, Ex-NBE & CIB Intern. Specializing in Deep Learning, Scalable ML Pipelines, and RAG Systems.",
        "hero.name": "Youssef Naggar",
        "hero.headline": "AI Engineer || Ex-NBE & CIB Intern || Excellent Grade AI Student @ FCAI Cairo University",
        "hero.btn_resume": "Download Resume",
        "hero.btn_contact": "Contact Me",
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.education": "Education",
        "nav.skills": "Skills",
        "nav.projects": "Projects",
        "nav.certificates": "Certificate",
        "nav.contact": "Contact",
        "about.title": "About Me",
        "about.bio1": "I am a Senior AI student at Cairo University (Faculty of Computers and Artificial Intelligence) specializing in building scalable ML pipelines and production RAG systems. Experienced in corporate infrastructure through NBE and CIB internships, I am focused on moving generative AI and deep learning architectures to production.",
        "about.bio2": "I empower small businesses and entrepreneurs to scale by analyzing their data to build the exact automation or ML pipeline, translating corporate infrastructure experience into resilient business solutions that fit their needs.",
        "about.lang_en": `<i class="fas fa-globe" style="color: var(--theme-primary);"></i> <span><strong>English:</strong> B2 Professional</span>`,
        "about.lang_ar": `<i class="fas fa-language" style="color: var(--theme-primary);"></i> <span><strong>Arabic:</strong> Native</span>`,
        "experience.title": "Enterprise Experience & Internships",
        "experience.depi_role": "Data Analyst Intern",
        "experience.depi_date": "July 2026 - Present",
        "experience.depi_org": `Digital Egypt Pioneers Initiative (DEPI) &bull; <span class="exp-loc">Cairo, Egypt</span>`,
        "experience.depi_b1": "Extracting, cleaning, and preparing multi-source datasets to conduct descriptive analysis and deliver actionable business insights.",
        "experience.depi_b2": "Building interactive data visualization dashboards and reporting pipelines to empower executive decision-making.",
        "experience.depi_b3": "Applying modern data analytics frameworks, statistical techniques, and ETL processes aligned with industry demands.",
        "experience.nbe_role": "IT Infrastructure intern",
        "experience.nbe_date": "July 2026",
        "experience.nbe_org": `National Bank of Egypt (NBE) &bull; <span class="exp-loc">Cairo, Egypt</span>`,
        "experience.nbe_b1": "Designed disaster recovery plans for critical data centers and core banking services.",
        "experience.nbe_b2": "Contributed to the IT automation and disaster recovery sector to ensure the resilience of enterprise infrastructure.",
        "experience.elevvo_role": "AI/ML Trainee",
        "experience.elevvo_date": "September 2025",
        "experience.elevvo_org": `Elevvo Internship Program &bull; <span class="exp-loc">Cairo, Egypt</span>`,
        "experience.elevvo_b1": "Developed 5 end-to-end ML pipelines across regression, classification, and time-series forecasting tasks using Python, Scikit-learn, and XGBoost, delivering production-ready models with documented results",
        "experience.elevvo_b2": "Evaluated and compared diverse machine learning models to identify the optimal architecture for each regression, classification, and forecasting task",
        "experience.cib_role": "Summer Intern",
        "experience.cib_date": "August 2025",
        "experience.cib_org": `Commercial International Bank (CIB) &bull; <span class="exp-loc">Cairo, Egypt</span>`,
        "experience.cib_b1": "Completed CIB’s competitive “The Green Leap” program, analyzing ESG data and digital transformation frameworks across Egyptian corporate case studies",
        "experience.cib_b2": "Conducted quantitative research on corporate governance and cybersecurity risk models, presenting findings to senior banking leaders",
        "education.title": "Education",
        "education.degree": "Bachelor of Science in Computer Science",
        "education.school": "Faculty of Computers and Artificial Intelligence, Cairo University",
        "education.badge_year": `<i class="fas fa-calendar-check"></i> Expected 2027 (Currently 4th Year)`,
        "education.badge_gpa": `<i class="fas fa-bolt"></i> GPA: 3.58 / 4.0 - Excellent`,
        "education.badge_rank": `<i class="fas fa-award"></i> Ranked Top 10 in Cohort`,
        "education.badge_major": `<i class="fas fa-microchip"></i> AI Major`,
        "skills.title": "Skills Matrix",
        "skills.lang_title": `<i class="fas fa-terminal"></i> Programming Languages`,
        "skills.ml_title": `<i class="fas fa-brain"></i> ML / AI & Libraries`,
        "skills.tools_title": `<i class="fas fa-server"></i> Tools & Infrastructure`,
        "projects.title": "Featured Projects",
        "projects.specs_title": "System Specifications:",
        "projects.finding_title": "Key Finding:",
        "projects.view_github": "View GitHub Repository",
        "projects.btn_more": "Show More Projects",
        "projects.btn_less": "Show Less Projects",
        "projects.p1_title": "Email Fraud Detection Pipeline",
        "projects.p1_subtitle": "Tri-Stream Stacking Ensemble + Deep Autoencoder",
        "projects.p1_badge": "F2: 0.8842 | 90.5% Recall | ROC-AUC: 0.999",
        "projects.p1_desc": "An end-to-end fraud classification architecture built on 447K Enron emails to resolve an extreme 192:1 class imbalance. Incorporates a custom PyTorch Deep Autoencoder to compress 384-dimensional MiniLM embeddings into 64-dimensional latents and derive unsupervised anomaly reconstruction error signals, stacked with a Tri-Stream Level-1 GBDT ensemble and an ElasticNet meta-learner.",
        "projects.p1_s1": "PyTorch Autoencoder: 384-d MiniLM compressed into 64-d latents + unsupervised anomaly MSE reconstruction signal.",
        "projects.p1_s2": "Tri-Stream Level-1 Models: Stream A (GPU XGBoost), Stream B (CatBoost with native text dictionaries), Stream C (LightGBM on TF-IDF n-grams).",
        "projects.p1_s3": "Level-2 Stacking Meta-Learner: ElasticNet meta-learner in logit space with 12 skip-connection domain features (VADER polarity, stylometry, sender velocity).",
        "projects.p1_s4": "Dynamic Threshold Tuning: tau* = 0.050 achieving 0.8842 F2-score, 90.5% recall, 80.8% precision, and 0.999 ROC-AUC.",
        "projects.p2_title": "Weather Wizard 3000",
        "projects.p2_subtitle": "Vectorless RAG + LiteLLM Multi-Modal Engine",
        "projects.p2_badge": "LiteLLM + Vectorless RAG",
        "projects.p2_desc": "A personalized AI outfit recommendation assistant leveraging Vectorless RAG and LiteLLM for SDK-agnostic model routing. Synthesizes 5-day real-time OpenWeatherMap forecasts with structured multimodal closet inventories and user preferences to generate grounded, weather-appropriate wardrobe suggestions with virtual avatar rendering.",
        "projects.p2_s1": "Multimodal Closet Synthesizer: Processes clothing photos via Vision LLM into structured metadata stored in closet.json.",
        "projects.p2_s2": "Grounded LLM Weather Wizard: Filters real-time weather forecasts and dynamically matches seasonal attributes with available wardrobe items.",
        "projects.p2_s3": "Virtual Avatar Drawer: Generates personalized visual demo previews combining user avatar and recommended outfit items.",
        "projects.p2_s4": "Employs LiteLLM for seamless SDK-agnostic model switching and automated IP/GPS geolocation detection.",
        "projects.p3_title": "Dog Breed Classifier (ConvNeXt-V2)",
        "projects.p3_subtitle": "Computer Vision Fine-Tuning Pipeline",
        "projects.p3_badge": "90.5% Test Accuracy (120 Breeds)",
        "projects.p3_desc": "A deep learning computer vision pipeline trained on the Stanford Dogs dataset across 120 breeds. Features automated bounding-box image preprocessing to isolate subjects, MixUp data augmentation for cross-class generalization, and fine-tuning of ConvNeXt-V2 in PyTorch with customized learning rate scheduling.",
        "projects.p3_s1": "Architecture: ConvNeXt-V2 with 7x7 depthwise convs, inverted bottleneck blocks, and Global Response Normalization (GRN).",
        "projects.p3_s2": "Preprocessing: Automated bounding-box image cropping to normalize training data and eliminate background noise.",
        "projects.p3_s3": "Generalization: MixUp augmentation and cosine annealing learning rate scheduler in PyTorch.",
        "projects.p4_title": "MicroGrad - Custom Neural Network Engine",
        "projects.p4_subtitle": "Vectorized Backpropagation Engine + GPU Acceleration",
        "projects.p4_badge": "84% EMNIST Match (CuPy GPU)",
        "projects.p4_desc": "A ground-up implementation of a neural network engine in Python with vectorized backpropagation, Momentum SGD, and GPU acceleration via CuPy. Matches PyTorch benchmark performance (84% test accuracy on EMNIST) without relying on external deep learning frameworks.",
        "projects.p4_s1": "Forward & Backward Engine: Pure Python matrix calculus with vectorized derivatives for ReLU, Sigmoid, and Tanh.",
        "projects.p4_s2": "Optimization: Momentum SGD optimizer with He and Xavier weight initialization schemes.",
        "projects.p4_s3": "Hardware Acceleration: CuPy integration for high-throughput GPU matrix operations with automatic CPU fallback.",
        "projects.p5_title": "UltraTube - Asynchronous TUI Media Downloader",
        "projects.p5_subtitle": "Textual Terminal UI + Pytest Suite",
        "projects.p5_badge": "Textual TUI + AsyncIO",
        "projects.p5_desc": "A high-performance, multi-tab asynchronous Terminal User Interface (TUI) application built with Python's Textual framework and yt-dlp. Features parallel queue processing, live download progress bars, metadata processing (merging audio tracks, thumbnails, and dual subtitles), and comprehensive test coverage following Dependency Inversion.",
        "projects.p6_title": "Wordle Combination Finder",
        "projects.p6_subtitle": "Information Gain Optimization Algorithm",
        "projects.p6_badge": "+8% Heuristic Superiority",
        "projects.p6_desc": "An algorithmic search system identifying optimal 4-word starting combinations for Wordle using letter position frequency analysis, a custom Trie data structure, and parallel backtracking with multiprocessing.",
        "projects.p6_s1": `Optimal 4-word combination: <code>['HOWFS', 'IXTLE', 'JUMBY', 'KRANG']</code> with a score of 2659, outperforming commonly cited combinations by 8%.`,
        "projects.p7_title": "Monster Wrangler Game",
        "projects.p7_subtitle": "2D Arcade Game Engine",
        "projects.p7_badge": "Pygame OOP",
        "projects.p7_desc": "A fast-paced 2D arcade game built with Pygame featuring object-oriented game state management, sprite animation, dynamic collision handling, and progressive difficulty.",
        "certs.title": "Verified Certifications",
        "certs.verify": "Verify Credential",
        "certs.btn_more": "Show More Certifications",
        "certs.btn_less": "Show Less Certifications",
        "certs.c1_title": "MCP Advanced Topics",
        "certs.c1_desc": "Advanced architectures for building and deploying MCP servers, connecting LLMs with external tools and agentic tool pipelines.",
        "certs.c1_issuer": `<i class="fas fa-cube"></i> Anthropic Academy`,
        "certs.c2_title": "Introduction to MCP",
        "certs.c2_desc": "Building MCP servers to connect LLMs with custom external tools, database systems, and agentic workflows.",
        "certs.c2_issuer": `<i class="fas fa-cube"></i> Anthropic Academy`,
        "certs.c3_title": "Building RAG Agents with LLMs",
        "certs.c3_desc": "Designing scalable Retrieval-Augmented Generation pipelines using vector embeddings, LangChain, and high-throughput LLMs.",
        "certs.c3_issuer": `<i class="fas fa-microchip"></i> NVIDIA DLI`,
        "certs.c4_title": "IBM Data Science Professional",
        "certs.c4_desc": "End-to-end data science workflows covering Python, machine learning modeling, data visualization, and SQL on real datasets.",
        "certs.c4_issuer": `<i class="fas fa-database"></i> IBM via Coursera`,
        "certs.c5_title": "CS50's Intro to Databases with SQL",
        "certs.c5_desc": "Relational database design, schema normalization, query optimization, indexing, and transactions with SQLite and PostgreSQL.",
        "certs.c5_issuer": `<i class="fas fa-server"></i> Harvard University`,
        "certs.c6_title": "Mathematics for Machine Learning",
        "certs.c6_desc": "Linear algebra, multivariate calculus, and PCA foundations underpinning modern deep learning algorithms.",
        "certs.c6_issuer": `<i class="fas fa-calculator"></i> Imperial College`,
        "contact.title": "Contact Me",
        "contact.email_label": "Email",
        "contact.linkedin_label": "LinkedIn",
        "contact.github_label": "GitHub",
        "contact.location_label": "Location",
        "contact.location_val": "Cairo, Egypt"
    },
    ar: {
        page_title: "يوسف نجار - سابقة أعمال مهندس ذكاء اصطناعي",
        page_desc: "سابقة أعمال يوسف نجار، طالب بالسنة النهائية في تخصص الذكاء الاصطناعي بجامعة القاهرة ومتدرب سابق في NBE و CIB. متخصص في التعلم العميق، بناء خطوط تعلم الآلة، وأنظمة الـ RAG.",
        "hero.name": "يوسف نجار",
        "hero.headline": "مهندس ذكاء اصطناعي || متدرب سابق في البنك الأهلي المصري (NBE) والبنك التجاري الدولي (CIB) || طالب بتقدير امتياز في الذكاء الاصطناعي بحاسبات القاهرة",
        "hero.btn_resume": "تحميل السيرة الذاتية (CV)",
        "hero.btn_contact": "تواصل معي",
        "nav.about": "نبذة عني",
        "nav.experience": "الخبرات والتدريب",
        "nav.education": "التعليم",
        "nav.skills": "المهارات",
        "nav.projects": "المشاريع",
        "nav.certificates": "الشهادات",
        "nav.contact": "تواصل معي",
        "about.title": "نبذة عني",
        "about.bio1": "أنا طالب بالسنة النهائية في تخصص الذكاء الاصطناعي بكلية الحاسبات والذكاء الاصطناعي بجامعة القاهرة، متخصص في بناء خطوط معالجة تعلم الآلة القابلة للتوسع، أتمتة مسارات العمل، وأنظمة الـ RAG الموجهة لبيئات الإنتاج. بفضل خبرتي في البنية التحتية للمؤسسات من خلال فترات التدريب في البنك الأهلي المصري (NBE) والبنك التجاري الدولي (CIB)، أركز على نقل حلول الذكاء الاصطناعي التوليدي، لوحات البيانات التفاعلية، والأنظمة السحابية إلى بيئة العمل الفعلية.",
        "about.bio2": "أساعد الشركات الصغيرة ورواد الأعمال على التوسع عبر تحويل عملياتهم التشغيلية بالكامل إلى أنظمة مؤتمتة وقائمة على البيانات، مع ترجمة خبرات البنية التحتية المصرفية إلى حلول أعمال مرنة ومستضافة بتكلفة سحابية مجانية تماماً لتلائم احتياجاتهم بدقة.",
        "about.lang_en": `<i class="fas fa-globe" style="color: var(--theme-primary);"></i> <span><strong>الإنجليزية:</strong> مستوى متقدم للعمل (B2 Professional)</span>`,
        "about.lang_ar": `<i class="fas fa-language" style="color: var(--theme-primary);"></i> <span><strong>العربية:</strong> اللغة الأم (Native)</span>`,
        "experience.title": "الخبرات المهنية وفترات التدريب",
        "experience.depi_role": "متدرب تحليل بيانات (Data Analyst Intern)",
        "experience.depi_date": "يوليو 2026 - حتى الآن",
        "experience.depi_org": `مبادرة رواد تكنولوجيا مصر (DEPI) &bull; <span class="exp-loc">القاهرة، مصر</span>`,
        "experience.depi_b1": "استخراج وتنظيف وتجهيز البيانات من مصادر متعددة لإجراء تحليلات وصفية واستخراج رؤى دقيقة تدعم القرارات التشغيلية والتجارية.",
        "experience.depi_b2": "بناء لوحات بيانات تفاعلية (Dashboards) وخطوط تقارير مؤتمتة لمساعدة متخذي القرار على متابعة الأداء في الوقت الفعلي.",
        "experience.depi_b3": "تطبيق أحدث منهجيات تحليل البيانات، الأساليب الإحصائية، وعمليات الـ ETL المتوافقة مع معايير سوق العمل.",
        "experience.nbe_role": "متدرب بنية تحتية لتكنولوجيا المعلومات (IT Infrastructure)",
        "experience.nbe_date": "يوليو 2026",
        "experience.nbe_org": `البنك الأهلي المصري (NBE) &bull; <span class="exp-loc">القاهرة، مصر</span>`,
        "experience.nbe_b1": "المساهمة في تصميم خطط التعافي من الكوارث (Disaster Recovery) لمراكز البيانات والخدمات المصرفية الأساسية فائقة الأهمية.",
        "experience.nbe_b2": "المشاركة في قطاع أتمتة البنية التحتية للـ IT لضمان استمرارية الخدمات ومرونة الأنظمة ضد أي توقف.",
        "experience.elevvo_role": "متدرب ذكاء اصطناعي وتعلم آلة (AI/ML Trainee)",
        "experience.elevvo_date": "سبتمبر 2025",
        "experience.elevvo_org": `برنامج تدريب إيليفو (Elevvo) &bull; <span class="exp-loc">القاهرة، مصر</span>`,
        "experience.elevvo_b1": "بناء وتطوير 5 خطوط تعلم آلة متكاملة (End-to-End) لمهام التنبؤ والتصنيف والسلاسل الزمنية باستخدام Python وScikit-learn وXGBoost ونماذج جاهزة للإنتاج بنتائج موثقة.",
        "experience.elevvo_b2": "تقييم ومقارنة نماذج تعلم الآلة المختلفة لاختيار البنية المعمارية الأنسب والأعلى كفاءة لكل مهمة تنبؤ وتصنيف.",
        "experience.cib_role": "متدرب صيفي (Summer Intern)",
        "experience.cib_date": "أغسطس 2025",
        "experience.cib_org": `البنك التجاري الدولي (CIB) &bull; <span class="exp-loc">القاهرة، مصر</span>`,
        "experience.cib_b1": "إتمام برنامج 'The Green Leap' التنافسي بالبنك، وتحليل بيانات الحوكمة البيئية والاجتماعية (ESG) وأطر التحول الرقمي عبر دراسات حالة للشركات المصرية.",
        "experience.cib_b2": "إجراء أبحاث كمية حول نماذج إدارة المخاطر المؤسسية والأمن السيبراني وعرض النتائج والتوصيات على قيادات مصرفية بالبنك.",
        "education.title": "التعليم والمؤهلات الأكاديمية",
        "education.degree": "بكالوريوس في علوم الحاسب (B.Sc. in Computer Science)",
        "education.school": "كلية الحاسبات والذكاء الاصطناعي، جامعة القاهرة",
        "education.badge_year": `<i class="fas fa-calendar-check"></i> متوقع التخرج 2027 (حالياً بالفرقة الرابعة)`,
        "education.badge_gpa": `<i class="fas fa-bolt"></i> المعدل التراكمي: 3.58 / 4.0 - تقدير امتياز`,
        "education.badge_rank": `<i class="fas fa-award"></i> ضمن أفضل 10 طلاب على مستوى الدفعة`,
        "education.badge_major": `<i class="fas fa-microchip"></i> تخصص رئيسي: الذكاء الاصطناعي (AI Major)`,
        "skills.title": "مصفوفة المهارات التقنية",
        "skills.lang_title": `<i class="fas fa-terminal"></i> لغات البرمجة`,
        "skills.ml_title": `<i class="fas fa-brain"></i> الذكاء الاصطناعي ومكتبات تعلم الآلة`,
        "skills.tools_title": `<i class="fas fa-server"></i> الأدوات والبنية التحتية`,
        "projects.title": "أبرز المشاريع",
        "projects.specs_title": "المواصفات التقنية للنظام:",
        "projects.finding_title": "النتيجة الخوارزمية الأساسية:",
        "projects.view_github": "عرض المشروع على GitHub",
        "projects.btn_more": "عرض المزيد من المشاريع",
        "projects.btn_less": "عرض مشاريع أقل",
        "projects.p1_title": "نظام كشف الاحتيال في البريد الإلكتروني",
        "projects.p1_subtitle": "نموذج تجميع ثلاثي المسارات (Tri-Stream) + Autoencoder عميق",
        "projects.p1_badge": "F2: 0.8842 | 90.5% Recall | ROC-AUC: 0.999",
        "projects.p1_desc": "معمارية متكاملة لتصنيف الاحتيال تم تدريبها على 447 ألف إيميل من بيانات Enron لحل مشكلة اختلال الفئات الحاد (192:1). تتضمن Deep Autoencoder مخصص بـ PyTorch لضغط تضمينات MiniLM من 384 بُعد إلى 64 بُعد واستخلاص إشارات كشف الشذوذ، مدمجة مع نموذج تجميع متقدم من نماذج GBDT ومُعلِّم فائق مبني بـ ElasticNet.",
        "projects.p1_s1": "Autoencoder بـ PyTorch: ضغط تضمينات MiniLM مع توليد إشارة خطأ إعادة البناء (MSE) لكشف الأنماط الشاذة بدون إشراف.",
        "projects.p1_s2": "نماذج المستوى الأول الثلاثية: مسار A (XGBoost على كارت الشاشة)، مسار B (CatBoost بقواميس نصوص مدمجة)، ومسار C (LightGBM على n-grams).",
        "projects.p1_s3": "مُعلِّم فائق بـ ElasticNet في المستوى الثاني: في فضاء الـ logit مع 12 ميزة مستخلصة من المجال (نبرة النص، أسلوب الكتابة، ومعدل الإرسال).",
        "projects.p1_s4": "ضبط العتبة الديناميكية: عتبة مثالية 0.050 محققة مقياس F2 بنسبة 0.8842، واسترجاع 90.5%، ودقة 80.8%، و0.999 ROC-AUC.",
        "projects.p2_title": "Weather Wizard 3000",
        "projects.p2_subtitle": "محرك متعدد الوسائط بنظام Vectorless RAG و LiteLLM",
        "projects.p2_badge": "LiteLLM + Vectorless RAG",
        "projects.p2_desc": "مساعد ذكاء اصطناعي لاقتراح تنسيقات ملابس يومية وفقاً لحالة الطقس بالاعتماد على تقنية Vectorless RAG ومكتبة LiteLLM للتوجيه المرن بين النماذج. يربط بين توقعات الطقس لخمسة أيام من OpenWeatherMap ومحتويات خزانة الملابس المصورة للمستخدم لتقديم ترشيحات دقيقة مدعومة بأفاتار افتراضي واقعي.",
        "projects.p2_s1": "محلل الخزانة متعدد الوسائط: معالجة صور الملابس بنماذج الرؤية الحاسوبية (Vision LLM) وتحويلها لبيانات وصفية منظمة داخل closet.json.",
        "projects.p2_s2": "محرك الاقتراحات المعتمد على الطقس: فلترة توقعات الطقس الحية وربط معايير الجو تلقائياً بقطع الملابس المتاحة.",
        "projects.p2_s3": "رسام الأفاتار الافتراضي: توليد معاينات بصرية تجمع بين أفاتار المستخدم والملابس المقترحة.",
        "projects.p2_s4": "توظيف LiteLLM للتبديل السلس بين نماذج الذكاء الاصطناعي وتحديد الموقع الجغرافي التلقائي عبر الـ IP/GPS.",
        "projects.p3_title": "مصنف سلالات الكلاب (ConvNeXt-V2)",
        "projects.p3_subtitle": "خط معالجة وضبط دقيق لنماذج الرؤية الحاسوبية",
        "projects.p3_badge": "دقة اختبار 90.5% عبر 120 سلالة",
        "projects.p3_desc": "خط رؤية حاسوبية مدرب على مجموعة بيانات Stanford Dogs لـ 120 سلالة. يشمل قصاً تلقائياً لمربعات الإحاطة (Bounding Boxes) لعزل الموضوعات بدقة، مع تقنية MixUp لتعزيز التعميم، وضبط دقيق لمعمارية ConvNeXt-V2 في PyTorch مع جدولة ديناميكية لمعدل التعلم.",
        "projects.p3_s1": "المعمارية: ConvNeXt-V2 مع التواءات 7x7 عميقة، وبلوكات Inverted Bottleneck، وتطبيع الاستجابة العامة (GRN).",
        "projects.p3_s2": "المعالجة المسبقة: قص تلقائي بمربعات الإحاطة لتوحيد أبعاد صور التدريب وإزالة التشويش في الخلفيات.",
        "projects.p3_s3": "تعزيز التعميم: تضخيم البيانات بـ MixUp وجدولة معدل التعلم بـ Cosine Annealing في PyTorch.",
        "projects.p4_title": "محرك الشبكات العصبية المخصص (MicroGrad)",
        "projects.p4_subtitle": "محرك انتشار خلفي موجه مدعوم بتسريع كارت الشاشة (GPU)",
        "projects.p4_badge": "دقة 84% على بيانات EMNIST باستخدام CuPy GPU",
        "projects.p4_desc": "بناء كامل لمحرك شبكات عصبية من الصفر بلغة Python مع حساب التفاضل والتكامل المصفوفي وحساب الانتشار الخلفي الموجه (Vectorized Backprop)، ومحسن Momentum SGD، وتسريع عالي عبر GPU باستخدام CuPy لمطابقة أداء PyTorch القياسي بدون أطر عمل خارجية.",
        "projects.p4_s1": "محرك التمرير الأمامي والخلفي: حساب مصفوفي نقي بمشتقات موجهة لدوال ReLU و Sigmoid و Tanh.",
        "projects.p4_s2": "التحسين: محسن Momentum SGD مع تهيئة أوزان He و Xavier المتقدمة.",
        "projects.p4_s3": "تسريع العتاد: تكامل CuPy للعمليات المصفوفية فائقة السرعة على كروت الشاشة مع تحويل تلقائي للـ CPU عند الحاجة.",
        "projects.p5_title": "UltraTube - تحميل الوسائط عبر الطرفية",
        "projects.p5_subtitle": "واجهة طرفية تفاعلية بـ Textual مع اختبارات Pytest شاملة",
        "projects.p5_badge": "Textual TUI + AsyncIO",
        "projects.p5_desc": "تطبيق عالي الأداء لتحميل الوسائط بواجهة طرفية متعددة النوافذ (TUI) مبني بإطار عمل Textual في Python وyt-dlp. يتميز بمعالجة متوازية لطابور التحميلات، وأشرطة تقدم حية، ودمج المسارات الصوتية والصور المصغرة والترجمات المزدوجة، مع تغطية اختبارات شاملة بتطبيق مبدأ Dependency Inversion.",
        "projects.p6_title": "خوارزمية أفضل توليفات كلمات لعبة Wordle",
        "projects.p6_subtitle": "خوارزمية تعظيم اكتساب المعلومات",
        "projects.p6_badge": "تفوق بنسبة +8% على التوليفات الشائعة",
        "projects.p6_desc": "نظام بحث خوارزمي لتحديد أفضل توليفة من 4 كلمات لبدء لعبة Wordle باستخدام تحليل تكرار مواضع الحروف، وبنية بيانات Trie مخصصة، وخوارزمية Backtracking متوازية بمعالجة متعددة (Multiprocessing).",
        "projects.p6_s1": `التوليفة الرباعية المثالية: <code>['HOWFS', 'IXTLE', 'JUMBY', 'KRANG']</code> بنتيجة 2659، متفوقة بنسبة 8% على التركيبات المتداولة عالمياً.`,
        "projects.p7_title": "لعبة Monster Wrangler ثنائية الأبعاد",
        "projects.p7_subtitle": "محرك ألعاب أركيد ثنائية الأبعاد",
        "projects.p7_badge": "Pygame OOP",
        "projects.p7_desc": "لعبة أركيد سريعة ثنائية الأبعاد مبنية بـ Pygame، تعتمد على بنية كائنية التوجه (OOP) لإدارة حالة اللعبة، وتحريك الـ Sprites، والتعامل الديناميكي مع الاصطدامات وتصاعد الصعوبة.",
        "certs.title": "الشهادات المهنية المعتمدة",
        "certs.verify": "التحقق من الاعتماد",
        "certs.btn_more": "عرض المزيد من الشهادات",
        "certs.btn_less": "عرض شهادات أقل",
        "certs.c1_title": "موضوعات متقدمة في بروتوكول سياق النموذج (MCP)",
        "certs.c1_desc": "معماريات متقدمة لبناء ونشر خوادم بروتوكول MCP، وربط نماذج الذكاء الاصطناعي مع الأدوات البرمجية الخارجية وخطوط عمل الوكلاء الأذكياء (Agentic AI).",
        "certs.c1_issuer": `<i class="fas fa-cube"></i> أكاديمية أنثروبيك (Anthropic Academy)`,
        "certs.c2_title": "مقدمة في بروتوكول سياق النموذج (Intro to MCP)",
        "certs.c2_desc": "بناء خوادم MCP لربط نماذج اللغة الكبيرة (LLMs) بالأدوات البرمجية وقواعد البيانات ومسارات العمل المؤتمتة.",
        "certs.c2_issuer": `<i class="fas fa-cube"></i> أكاديمية أنثروبيك (Anthropic Academy)`,
        "certs.c3_title": "بناء وكلاء RAG باستخدام نماذج اللغة الكبيرة",
        "certs.c3_desc": "تصميم خطوط استرجاع وتوليد معزز (RAG) قابلة للتوسع باستخدام التضمينات المتجهة (Vector Embeddings)، وLangChain، ونماذج فائقة الأداء.",
        "certs.c3_issuer": `<i class="fas fa-microchip"></i> معهد التعلم العميق من إنفيديا (NVIDIA DLI)`,
        "certs.c4_title": "الاحتراف في علم البيانات من IBM",
        "certs.c4_desc": "مسارات علم بيانات متكاملة تغطي بايثون، نمذجة تعلم الآلة، تمثيل البيانات، واستعلامات SQL المتقدمة على مجموعات بيانات واقعية.",
        "certs.c4_issuer": `<i class="fas fa-database"></i> IBM عبر Coursera`,
        "certs.c5_title": "مقدمة قواعد البيانات باستخدام SQL (CS50)",
        "certs.c5_desc": "تصميم قواعد البيانات العلائقية، التطبيع (Normalization)، تحسين الاستعلامات، الفهرسة، والعمليات التبادلية (Transactions) باستخدام SQLite وPostgreSQL.",
        "certs.c5_issuer": `<i class="fas fa-server"></i> جامعة هارفارد (Harvard University)`,
        "certs.c6_title": "الرياضيات لتعلم الآلة (Mathematics for ML)",
        "certs.c6_desc": "الجبر الخطي، التفاضل والتكامل متعدد المتغيرات، وأسس تحليل المكونات الرئيسية (PCA) التي تقوم عليها خوارزميات التعلم العميق الحديثة.",
        "certs.c6_issuer": `<i class="fas fa-calculator"></i> إمبريال كوليدج لندن (Imperial College)`,
        "contact.title": "تواصل معي",
        "contact.email_label": "البريد الإلكتروني",
        "contact.linkedin_label": "لينكد إن",
        "contact.github_label": "جيت هاب",
        "contact.location_label": "الموقع الجغرافي",
        "contact.location_val": "القاهرة، مصر"
    }
};

function initLanguageManager() {
    const langToggleBtn = document.getElementById('lang-toggle');
    const savedLang = localStorage.getItem('portfolio-language') || 'en';

    function setLanguage(lang) {
        const isAr = (lang === 'ar');
        document.documentElement.lang = lang;
        document.documentElement.dir = isAr ? 'rtl' : 'ltr';

        const dict = translations[lang] || translations.en;

        // Update Page Title and Meta Description
        if (dict.page_title) document.title = dict.page_title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && dict.page_desc) metaDesc.setAttribute('content', dict.page_desc);

        // Update Text Elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Update HTML Elements
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        // Update Collapsible Buttons State
        updateCollapsibleButtonsState(lang);

        // Update Floating Language Switcher Button Display
        if (langToggleBtn) {
            const icon = isAr ? 'fas fa-globe' : 'fas fa-language';
            const label = isAr ? 'EN' : 'عربي';
            const title = isAr ? 'Switch Language to English' : 'تغيير اللغة إلى العربية';
            langToggleBtn.innerHTML = `<i class="${icon}"></i> <span class="lang-toggle-text">${label}</span>`;
            langToggleBtn.setAttribute('title', title);
            langToggleBtn.setAttribute('aria-label', title);
        }

        localStorage.setItem('portfolio-language', lang);
    }

    // Initialize with saved language
    setLanguage(savedLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function() {
            const currentLang = document.documentElement.lang || 'en';
            const nextLang = (currentLang === 'en') ? 'ar' : 'en';
            setLanguage(nextLang);
        });
    }
}

function updateCollapsibleButtonsState(lang) {
    const isAr = (lang === 'ar');
    
    // Projects button
    const projectsHidden = document.getElementById('projects-hidden');
    const projectsBtn = document.getElementById('projects-toggle-btn');
    if (projectsHidden && projectsBtn) {
        const isOpen = projectsHidden.style.display === 'flex' || projectsHidden.style.display === 'block';
        const label = isOpen 
            ? (isAr ? 'عرض مشاريع أقل' : 'Show Less Projects')
            : (isAr ? 'عرض المزيد من المشاريع' : 'Show More Projects');
        const icon = isOpen ? 'fa-chevron-up' : 'fa-chevron-down';
        projectsBtn.innerHTML = `<i class="fas ${icon}"></i> <span>${label}</span>`;
    }

    // Certs button
    const certsHidden = document.getElementById('certs-hidden');
    const certsBtn = document.getElementById('certs-toggle-btn');
    if (certsHidden && certsBtn) {
        const isOpen = certsHidden.style.display === 'grid' || certsHidden.style.display === 'block';
        const label = isOpen 
            ? (isAr ? 'عرض شهادات أقل' : 'Show Less Certifications')
            : (isAr ? 'عرض المزيد من الشهادات' : 'Show More Certifications');
        const icon = isOpen ? 'fa-chevron-up' : 'fa-chevron-down';
        certsBtn.innerHTML = `<i class="fas ${icon}"></i> <span>${label}</span>`;
    }
}

/* ==========================================================================
   LIGHTBOX MODAL GALLERY (PROJECTS & CERTIFICATIONS FULLSCREEN PREVIEW)
   ========================================================================== */
function initLightboxManager() {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const closeBtn = document.getElementById('lightboxClose');
    const counter = document.getElementById('lightboxCounter');

    if (!modal || !modalImg) return;

    let currentGallery = [];
    let currentIndex = 0;

    // 1. UltraTube Gallery Group
    const ultratubeSlides = document.querySelectorAll('.ultratube-carousel:not(.monster-gallery) .carousel-slide img');
    const ultratubeImgs = Array.from(ultratubeSlides).map(img => img.src);

    ultratubeSlides.forEach((img, idx) => {
        img.addEventListener('click', () => {
            openLightbox(ultratubeImgs, idx);
        });
    });

    // 2. Monster Wrangler Gallery Group
    const monsterSlides = document.querySelectorAll('.monster-gallery .carousel-slide img');
    const monsterImgs = Array.from(monsterSlides).map(img => img.src);

    monsterSlides.forEach((img, idx) => {
        img.addEventListener('click', () => {
            openLightbox(monsterImgs, idx);
        });
    });

    // 3. Verified Certifications Gallery Group (All 6 Certifications)
    const certWrappers = document.querySelectorAll('.cert-img-wrapper');
    const certImgs = Array.from(certWrappers).map(wrapper => {
        const img = wrapper.querySelector('img');
        return img ? img.src : '';
    }).filter(src => src !== '');

    certWrappers.forEach((wrapper, idx) => {
        wrapper.addEventListener('click', (e) => {
            // Avoid triggering if clicking any nested link
            if (e.target.tagName.toLowerCase() === 'a') return;
            openLightbox(certImgs, idx);
        });
    });

    function openLightbox(imagesList, index) {
        if (!imagesList || imagesList.length === 0) return;
        currentGallery = imagesList;
        currentIndex = index;
        updateModalContent();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateModalContent() {
        modalImg.src = currentGallery[currentIndex];
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
        }
    }

    function showPrev() {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateModalContent();
    }

    function showNext() {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateModalContent();
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

/* ==========================================================================
   COLLAPSIBLE SECTIONS (SHOW MORE / SHOW LESS WITH DYNAMIC I18N SUPPORT)
   ========================================================================== */
function initCollapsibleSections() {
    window.toggleSection = function(hiddenId, btnId, moreText, lessText) {
        const hiddenEl = document.getElementById(hiddenId);
        const btn = document.getElementById(btnId);
        if (!hiddenEl || !btn) return;

        const isHidden = hiddenEl.style.display === 'none' || hiddenEl.style.display === '';
        const currentLang = document.documentElement.lang || 'en';
        const isAr = (currentLang === 'ar');

        let dynamicMore = moreText;
        let dynamicLess = lessText;

        if (hiddenId === 'projects-hidden') {
            dynamicMore = isAr ? 'عرض المزيد من المشاريع' : 'Show More Projects';
            dynamicLess = isAr ? 'عرض مشاريع أقل' : 'Show Less Projects';
        } else if (hiddenId === 'certs-hidden') {
            dynamicMore = isAr ? 'عرض المزيد من الشهادات' : 'Show More Certifications';
            dynamicLess = isAr ? 'عرض شهادات أقل' : 'Show Less Certifications';
        }

        if (isHidden) {
            hiddenEl.style.display = (hiddenId === 'projects-hidden') ? 'flex' : 'grid';
            btn.innerHTML = `<i class="fas fa-chevron-up"></i> <span>${dynamicLess}</span>`;
        } else {
            hiddenEl.style.display = 'none';
            btn.innerHTML = `<i class="fas fa-chevron-down"></i> <span>${dynamicMore}</span>`;
        }
    };
}

/* ==========================================================================
   COVER PORTRAIT 3D MOUSE TILT EFFECT
   ========================================================================== */
function initProfileImageTilt() {
    const profileContainer = document.querySelector('.profile-image-container');
    const profileImage = document.querySelector('.profile-image');

    if (!profileContainer || !profileImage) return;

    const maxRotation = 14;
    let isAnimating = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let raf;

    function handleMouseMove(e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        if (!isAnimating) {
            isAnimating = true;
            raf = requestAnimationFrame(animateTransform);
        }
    }

    function animateTransform() {
        const rect = profileContainer.getBoundingClientRect();
        const mouseX = lastMouseX - rect.left - rect.width / 2;
        const mouseY = lastMouseY - rect.top - rect.height / 2;

        const rotateY = (mouseX / rect.width) * maxRotation * 2;
        const rotateX = -(mouseY / rect.height) * maxRotation * 2;

        profileImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        isAnimating = false;
    }

    function resetTransform() {
        isAnimating = false;
        cancelAnimationFrame(raf);
        profileImage.style.transition = 'transform 0.5s ease';
        profileImage.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        setTimeout(() => {
            profileImage.style.transition = '';
        }, 500);
    }

    profileContainer.addEventListener('mousemove', handleMouseMove);
    profileContainer.addEventListener('mouseleave', resetTransform);
}

/* ==========================================================================
   SMOOTH NAVIGATION WITH NAVBAR OFFSET
   ========================================================================== */
function initSmoothNavigation() {
    document.querySelectorAll('nav.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const nav = document.querySelector('nav.main-nav');
                    const navHeight = nav ? nav.offsetHeight : 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - 16;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}