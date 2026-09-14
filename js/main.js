const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const yearTarget = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');
const hero = document.querySelector('.hero');
const heroBlob = document.querySelector('.hero-blob');
const heroName = document.querySelector('.hero-name');
const heroQuality = document.querySelector('#hero-quality');
const cards = document.querySelectorAll('.project-card');
const cursorDot = document.querySelector('.cursor-dot');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const languageStorageKey = 'portfolio-language';

const translations = {
  nl: {
    nav: {
      home: 'Home',
      projects: 'Projecten',
      about: 'Over mij',
      contact: 'Contact'
    },
    heroGreeting: 'Hallo! Ik ben',
    heroQualityDefault: 'Raak een letter aan voor mijn kwaliteit',
    aboutEyebrow: 'Over mij',
    aboutTitle: 'Over Mij',
    aboutSections: [
      {
        heading: 'Wie & Waar',
        text:
          '2e jaars CMD student @ Hanze Groningen. Gefascineerd door de psychologie achter UX en de toekomst van AI.'
      },
      {
        heading: "Mijn 'Waarom'",
        text:
          "Ik ontwerp niet alleen voor het oog. Ik ben analytisch, stel de 'waarom-vraag' en onderbouw de keuzes die ik maak. Details en reflectie maken voor mij het verschil tussen 'mooi' en iets wat echt klopt."
      },
      {
        heading: 'Creatieve Roots',
        text:
          'Vroeger was ik alleen maar aan het tekenen en schilderen. Nu gebruik ik die creativiteit voor schermen die er niet alleen goed uitzien, maar die je ook meteen snapt.'
      },
      {
        heading: 'De Match',
        text:
          'Ik krijg energie van een open sfeer, waar we gaan voor slimme oplossingen, maar waar ook zeker gelachen kan worden.'
      },
      {
        heading: 'Op zoek naar...',
        text:
          'Een stageplek waar ik kan ontdekken waar mijn plek precies ligt in dit vak. Ik heb er veel zin in om te laten zien wat ik kan en ondertussen heel veel nieuwe dingen te leren!'
      }
    ],
    aboutPs: 'P.S. Ik kijk enorm uit naar een uitdagende stage om dit alles in de praktijk te brengen!',
    contactEyebrow: 'Contact',
    contactTitle: 'Neem gerust contact op!',
    projectEyebrow: 'Selectie',
    projectTitle: 'Projecten',
    projectCards: [
      {
        title: 'Doppio Espresso UX Redesign',
        keywords: ['Onderzoek', 'Usability tests', 'UX/UI', 'Datagedreven', 'Heuristieken', 'Toegankelijkheid']
      },
      {
        title: 'Beslis Later – Gedragsontwerp tegen impulsaankopen',
        keywords: ['Behavioural Design', 'Interaction Design', 'Gamification', 'Prototyping', 'Heuristieken', 'Social Design']
      },
      {
        title: 'Silo’s doorbreken – Interactieve installatie voor Entrance',
        keywords: ['Usability tests', 'Interaction design', 'Prototyping', 'Audio-visuele-ervaring', 'Interviews', 'Concept development']
      },
      {
        title: 'Bloei Op! – Mentale hulp zichtbaar maken',
        keywords: ['Usability tests', 'Visueel ontwerp', 'Experience Design', 'Campagneconcept', 'Generative AI', 'Laagdrempeligheid']
      },
      {
        title: 'Spinnenheld – Angst overwinnen in een VR-wereld',
        keywords: ['VR-Prototyping', 'Interaction Design', 'Exposure Design', 'Lua Scripting', 'Child UX', 'Storytelling']
      }
    ]
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About me',
      contact: 'Contact'
    },
    heroGreeting: 'Hello! I am',
    heroQualityDefault: 'Hover on a letter to see my qualities',
    aboutEyebrow: 'About Me',
    aboutTitle: 'About Me',
    aboutSections: [
      {
        heading: 'Who & Where',
        text:
          'Second-year CMD student at Hanze Groningen. Fascinated by the psychology behind UX and the future of AI.'
      },
      {
        heading: 'My “Why”',
        text:
          'I don’t just design for visual appeal. I’m analytical, ask “why,” and justify the choices I make. For me, details and reflection make the difference between something that’s “pretty” and something that truly makes sense.'
      },
      {
        heading: 'Creative Roots',
        text:
          'I used to spend all my time drawing and painting. Now I channel that creativity into screens that not only look good but are also instantly understandable.'
      },
      {
        heading: 'The Match',
        text:
          'I thrive in an open atmosphere where we strive for smart solutions but also make sure to have a good laugh.'
      },
      {
        heading: 'Looking for...',
        text:
          'An internship where I can discover exactly where I fit in this field. I’m really looking forward to showing what I can do and learning lots of new things along the way!'
      }
    ],
    aboutPs: 'P.S. I’m really looking forward to a challenging internship where I can put all of this into practice!',
    contactEyebrow: 'Contact',
    contactTitle: 'Feel free to reach out!',
    projectEyebrow: 'Selection',
    projectTitle: 'Projects',
    projectCards: [
      {
        title: 'Doppio Espresso UX Redesign',
        keywords: ['Research', 'Usability tests', 'UX/UI', 'Data-driven', 'Heuristics', 'Accessibility']
      },
      {
        title: 'Decide Later – Behavioral Design to Prevent Impulse Purchases',
        keywords: ['Behavioral Design', 'Interaction Design', 'Gamification', 'Prototyping', 'Heuristics', 'Social Design']
      },
      {
        title: 'Breaking Down Silos – Interactive Installation for Entrance',
        keywords: ['Usability tests', 'Interaction Design', 'Prototyping', 'Audiovisual Experience', 'Interviews', 'Concept Development']
      },
      {
        title: 'Bloei Op! – Making Mental Health Support Visible',
        keywords: ['Usability tests', 'Visual Design', 'Experience Design', 'Campaign Concept', 'Generative AI', 'Accessibility']
      },
      {
        title: 'Spinnenheld – Overcoming Fear in a VR World',
        keywords: ['VR Prototyping', 'Interaction Design', 'Exposure Design', 'Lua Scripting', 'Child UX', 'Storytelling']
      }
    ]
  }
};

document.documentElement.classList.add('js');

const nameQualities = [
  { letter: 'A', quality: { nl: 'Analytisch', en: 'Analytical' } },
  { letter: 'T', quality: { nl: 'Tekenvaardig', en: 'Artistic' } },
  { letter: 'H', quality: { nl: 'Helder', en: 'Clear' } },
  { letter: 'A', quality: { nl: 'Authentiek', en: 'Authentic' } },
  { letter: 'N', quality: { nl: 'Nauwkeurig', en: 'Accurate' } },
  { letter: 'A', quality: { nl: 'AI-nieuwsgierig', en: 'Curious about AI' } },
  { letter: 'S', quality: { nl: 'Sociaal', en: 'Social' } },
  { letter: 'I', quality: { nl: 'Inventief', en: 'Inventive' } },
  { letter: 'A', quality: { nl: 'Aanpassingsvermogen', en: 'Adaptable' } },
  { letter: ' ', quality: { nl: '', en: '' } },
  { letter: 'D', quality: { nl: 'Detailgeorienteerd', en: 'Detail-oriented' } },
  { letter: 'R', quality: { nl: 'Reflectief', en: 'Reflective' } },
  { letter: 'A', quality: { nl: 'Ambitieus', en: 'Ambitious' } },
  { letter: 'K', quality: { nl: 'Kritisch', en: 'Critical' } },
  { letter: 'O', quality: { nl: 'Oplossingsgericht', en: 'Solution-oriented' } },
  { letter: 'P', quality: { nl: 'Psychologisch geinteresseerd', en: 'Interested in psychology' } },
  { letter: 'O', quality: { nl: 'Onderzoekend', en: 'Inquisitive' } },
  { letter: 'U', quality: { nl: 'User-empathie', en: 'User empathy' } },
  { letter: 'L', quality: { nl: 'Loyaal', en: 'Loyal' } },
  { letter: 'O', quality: { nl: 'Onderbouwend', en: 'Supportive' } },
  { letter: 'S', quality: { nl: 'Samenwerkend', en: 'Collaborative' } }
];

const getStoredLanguage = () => {
  const storedValue = window.localStorage.getItem(languageStorageKey);
  return storedValue === 'en' ? 'en' : 'nl';
};

const getQualityText = (qualityEntry, language) => {
  if (!qualityEntry || !qualityEntry.quality) return '';
  if (typeof qualityEntry.quality === 'string') return qualityEntry.quality;
  return qualityEntry.quality[language] || qualityEntry.quality.nl || '';
};

const updateNavLanguage = (language) => {
  if (!siteNav) return;

  const navLabels = translations[language].nav;
  siteNav.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href') || '';

    if (href.includes('#home')) {
      link.textContent = navLabels.home;
    } else if (href.includes('#projecten') || href.includes('#projects')) {
      link.textContent = navLabels.projects;
    } else if (href.includes('#over-mij') || href.includes('#about')) {
      link.textContent = navLabels.about;
    } else if (href.includes('#contact')) {
      link.textContent = navLabels.contact;
    }
  });
};

const updateHeroLanguage = (language) => {
  const heroGreeting = document.querySelector('.hero-greeting');
  if (heroGreeting) {
    heroGreeting.textContent = translations[language].heroGreeting;
  }

  const activeQualityText = heroQuality?.dataset.quality || '';
  if (heroQuality) {
    heroQuality.textContent = activeQualityText || translations[language].heroQualityDefault;
  }

  if (!heroName) return;

  const letters = Array.from(heroName.querySelectorAll('.name-letter:not(.space)'));
  letters.forEach((letter, index) => {
    const qualityEntry = nameQualities[index];
    const translatedQuality = getQualityText(qualityEntry, language);

    letter.dataset.quality = translatedQuality;
    letter.setAttribute(
      'aria-label',
      `${qualityEntry?.letter || letter.textContent} - ${translatedQuality}`
    );

    if (letter.classList.contains('is-active')) {
      heroQuality.textContent = translatedQuality;
    }
  });
};

const updateProjectCards = (language) => {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
    const title = card.querySelector('h3');
    const keywords = card.querySelectorAll('.project-keywords li');

    if (title) {
      const nextTitle = language === 'en' ? title.dataset.en : title.dataset.nl;
      if (nextTitle) title.textContent = nextTitle;
    }

    keywords.forEach((item) => {
      const nextKeyword = language === 'en' ? item.dataset.en : item.dataset.nl;
      if (nextKeyword) item.textContent = nextKeyword;
    });
  });
};

const isProjectOnePage = () =>
  window.location.pathname.endsWith('/project-1.html');

const isProjectTwoPage = () =>
  window.location.pathname.endsWith('/project-2.html');

const isProjectThreePage = () =>
  window.location.pathname.endsWith('/project-3.html');

const isProjectFourPage = () =>
  window.location.pathname.endsWith('/project-4.html');

const isProjectFivePage = () =>
  window.location.pathname.endsWith('/project-5.html');

const projectOneTranslations = {
  nl: {
    caseTitle: 'Doppio Espresso – UX Redesign & Usabilitytest',
    caseSideTitle: 'Case navigatie',
    sideLinks: ['Het probleem', 'Mijn aanpak', 'Belangrijkste aanpassingen', 'Resultaat & reflectie'],
    introHeading: 'In het kort',
    introQuestion: 'Waarom is een zak koffiebonen bestellen zo\'n zoektocht?',
    introText:
      'Tijdens dit project heb ik de mobiele website van Doppio Espresso onderzocht. Uit mijn <strong>usabilitytests</strong> bleek dat gebruikers vaak vastliepen bij taken die eigenlijk heel simpel zouden moeten zijn, zoals het vinden van allergenen of het bestellen van koffiebonen. Door deze testdata te analyseren, heb ik een redesign gemaakt dat de website gebruiksvriendelijker en commercieel sterker maakt.',
    toolsHeading: 'Tools',
    problemHeading: 'Het probleem',
    problemOverview:
      'De informatie op de mobiele site was er wel, maar de navigatie zat in de weg. Tijdens mijn onderzoek merkte ik dat mensen gefrustreerd raakten, omdat ze hun doel niet snel konden bereiken.',
    problemIntro: 'De grootste knelpunten waren:',
    problemList: [
      'Het lastig kunnen vinden van een fysieke vestiging.',
      'Menukaarten en allergenenlijsten die als onleesbare PDF\'s werden getoond.',
      'De onduidelijke route naar de webshop.'
    ],
    metricsHint: 'Swipe om de resultaten van het onderzoek te bekijken.',
    improvementsIntro: 'Ik heb me gefocust op de grootste pijnpunten van de gebruiker.',
    approachHeading: 'Mijn aanpak',
    approachText1:
      'Dit was een <strong>individueel project</strong> waarbij ik verantwoordelijk was voor het volledige proces. Ik ben begonnen met usabilitytests om te zien waar het in de praktijk misging. Om mijn conclusies sterker te maken, heb ik mijn resultaten gecombineerd met de data van een medestudent. Hierdoor zag ik duidelijke patronen ontstaan, wat een <strong>betrouwbare basis</strong> gaf voor mijn ontwerpkeuzes.',
    approachText2:
      'Ik heb alle feedback geanalyseerd en de problemen geprioriteerd op ernst (<span class="severity severity-low">laag</span>, <span class="severity severity-medium">middelmatig</span>, <span class="severity severity-high">hoog</span>), zodat ik wist welke aanpassingen de meeste impact zouden hebben op de klantbeleving.',
    severityLabels: { low: 'laag', medium: 'middelmatig', high: 'hoog' },
    improvementHeadings: [
      '1. Verzendkosten en levertijd zichtbaar maken',
      '2. Webshop beter vindbaar maken',
      '3. Duidelijkere feedback bij bestellen',
      '4. Allergenenlijst duidelijker maken',
      '5. Mobielvriendelijke menukaart'
    ],
    improvementCopies: [
      [
        'Slechts 1 van de 9 deelnemers vond de verzendkosten. Deze stonden verborgen in de footer.',
        'Ik heb de verzendinformatie van de footer naar de plek onder het product verplaatst, zodat de klant alle info op een plek heeft voor het bestellen. Door de vertraging een rood klokje te geven tussen de groene vinkjes, valt de drukte direct op en leest de klant er niet overheen. Dit voorkomt dat mensen later in de checkout verrast worden en alsnog afhaken.'
      ],
      [
        'De webshop was onvindbaar in het menu, waardoor gebruikers niet doorhadden dat ze ook online konden bestellen.',
        'Ik heb op meerdere plekken (menu, footer en accordions) een opvallende knop toegevoegd, omdat mensen in de tests hier vaak overheen keken. Ik heb de tekst veranderd naar "Onze webshop - bestel voor thuis" in plaats van alleen "Webshop". Dit maakt direct duidelijk dat je de producten van Doppio ook online kunt kopen, wat de drempel om door te klikken een stuk lager maakt.'
      ],
      [
        'Gebruikers merkten vaak niet dat een product was toegevoegd, omdat de feedbackmelding te klein en onopvallend was.',
        'Ik heb een grotere melding ontworpen met contrasterende kleuren en duidelijke knoppen. Hierdoor krijgen gebruikers direct feedback op hun actie. Dit sluit aan bij de heuristiek "zichtbaarheid van de systeemstatus".'
      ],
      [
        'De allergenenlijst was een PDF-schema met kleine vakjes. Tijdens de tests zag ik dat gebruikers hierdoor echt vastliepen. Ze moesten steeds inzoomen en van links naar rechts schuiven om te zien welk kruisje bij welk gerecht hoorde, wat ook de kans vergroot op leesfouten die gevaarlijk kunnen zijn.',
        'Ik heb dit schema vervangen door een interactieve pagina met filters en duidelijke iconen. Mijn doel was veiligheid verhogen en snellere vindbaarheid: door simpelweg aan te vinken wat je niet mag eten, krijg je direct een overzicht dat past bij jouw dieet.'
      ],
      [
        'De menukaart werd weergegeven als een PDF. Tijdens de tests merkte ik dat vooral ouderen hier moeite mee hadden. De tekst was veel te klein en ze moesten steeds inzoomen.',
        'Ik heb een interactieve menupagina ontworpen met zoek- en filteropties, zodat ook oudere gebruikers niet meer hoeven in te zoomen om de tekst te kunnen lezen. Mijn gedachte achter de zoek- en filteropties was dat mensen vaak met een specifiek doel kijken. Door deze filters toe te voegen hoeven ze niet meer de hele lijst te scannen, maar vinden ze direct wat ze zoeken. Dit maakt het menu voor iedereen een stuk toegankelijker en sneller in gebruik.'
      ]
    ],
    reflectionHeading: 'Resultaat & reflectie',
    reflectionText:
      'Het resultaat is een website die voor iedereen (van jong tot oud) een stuk makkelijker werkt. Door informatie logischer in te delen en onhandige PDF-bestanden te vervangen, kunnen gebruikers nu zonder frustratie vinden wat ze zoeken. Dit zorgt voor een fijner proces en een grotere kans op bestellingen in de webshop.',
    learningHeading: 'Wat ik heb geleerd:',
    learningItems: [
      '<strong>Testen geeft duidelijkheid:</strong> Soms vul je zelf in wat logisch is, maar testen laat zien hoe het echt zit. Tijdens de tests zag ik pas dat de PDF-menukaart nog onhandiger was dan ik dacht.',
      '<strong>Niet twijfelen, maar doen:</strong> Toen de website van Doppio midden in mijn project veranderde, heb ik geleerd om niet te blijven hangen. Ik zag snel welke delen van mijn onderzoek ik kon houden en wat ik echt moest aanpassen. Hierdoor kon ik zonder tijd te verliezen gelijk door met mijn ontwerp.',
      '<strong>Samen sta je sterker:</strong> Door mijn resultaten te combineren met die van een medestudent, wist ik zeker dat mijn conclusies betrouwbaar waren. Dit gaf me een sterke basis voor mijn keuzes.',
      '<strong>Toegankelijkheid is erg belangrijk:</strong> Een ontwerp is pas geslaagd als het voor iedereen werkt. Of het nu gaat om een leesbaar menu of een duidelijke melding: de gebruiker moet zich geholpen voelen.'
    ],
    prevProject: 'Vorig project',
    backOverview: 'Terug naar overzicht',
    nextProject: 'Volgend project'
  },
  en: {
    caseTitle: 'Doppio Espresso – UX Redesign & Usability Test',
    caseSideTitle: 'CASE NAVIGATION',
    sideLinks: ['The Problem', 'My Approach', 'Key Changes', 'Results & Reflection'],
    introHeading: 'In Short',
    introQuestion: 'Why is ordering a bag of coffee beans such a challenge?',
    introText:
      'During this project, I analyzed Doppio Espresso’s mobile website. My <strong>usability tests</strong> revealed that users often got stuck on tasks that should actually be very simple, such as finding allergens or ordering coffee beans. By analyzing this test data, I created a redesign that makes the website more user-friendly and commercially stronger.',
    toolsHeading: 'Tools',
    problemHeading: 'The Problem',
    problemOverview:
      'The information on the mobile site was there, but the navigation got in the way. During my research, I noticed that people became frustrated because they couldn’t reach their goal quickly.',
    problemIntro: 'The biggest pain points were:',
    problemList: [
      'Difficulty finding a physical location.',
      'Menus and allergen lists displayed as unreadable PDFs.',
      'The unclear path to the online store.'
    ],
    metricsHint: 'Swipe to view the research results.',
    improvementsIntro: "I focused on the user's biggest pain points.",
    approachHeading: 'My Approach',
    approachText1:
      'This was an <strong>individual project</strong> in which I was responsible for the entire process. I started with usability tests to see where things went wrong in practice. To strengthen my conclusions, I combined my results with data from a fellow student. This allowed me to identify clear patterns, which provided a <strong>reliable basis</strong> for my design choices.',
    approachText2:
      'I analyzed all the feedback and prioritized the issues by severity (<span class="severity severity-low">low</span>, <span class="severity severity-medium">medium</span>, <span class="severity severity-high">high</span>), so I knew which changes would have the greatest impact on the customer experience.',
    severityLabels: { low: 'low', medium: 'medium', high: 'high' },
    improvementHeadings: [
      '1. Make shipping costs and delivery time visible',
      '2. Make the online store easier to find',
      '3. Clearer feedback during checkout',
      '4. Make the allergen list clearer',
      '5. Mobile-friendly menu'
    ],
    improvementCopies: [
      [
        'Only 1 out of 9 participants found the shipping costs. They were hidden in the footer.',
        'I moved the shipping information from the footer to the area below the product, so customers have all the information in one place before placing an order. By adding a red clock icon between the green checkmarks to indicate the delay, the busy layout immediately stands out, and customers don’t overlook it. This prevents people from being surprised later in the checkout process and abandoning their cart.'
      ],
      [
        'The online store was hard to find in the menu, so users didn’t realize they could also order online.',
        'I added an eye-catching button in multiple places (menu, footer, and accordions) because people often overlooked it during testing. I changed the text to “Our online store—order for home delivery” instead of just “Online Store.” This immediately makes it clear that you can also buy Doppio products online, which significantly lowers the barrier to clicking through.'
      ],
      [
        'Users often didn’t notice that a product had been added because the feedback message was too small and inconspicuous.',
        'I designed a larger message with contrasting colors and clear buttons. This gives users immediate feedback on their action. This aligns with the “visibility of system status” heuristic.'
      ],
      [
        'The allergen list was a PDF table with small boxes. During testing, I noticed that users really got stuck here. They constantly had to zoom in and scroll from left to right to see which checkmark belonged to which dish, which also increases the risk of reading errors that could be dangerous.',
        'I replaced this table with an interactive page featuring filters and clear icons. My goal was to improve safety and make it easier to find information quickly: by simply checking off what you can’t eat, you immediately get an overview tailored to your diet.'
      ],
      [
        'The menu was displayed as a PDF. During testing, I noticed that older users in particular had difficulty with this. The text was much too small, and they constantly had to zoom in.',
        'I designed an interactive menu page with search and filter options, so that even older users no longer have to zoom in to read the text. My reasoning behind the search and filter options was that people often browse with a specific goal in mind. By adding these filters, they no longer have to scan the entire list but can find exactly what they’re looking for right away. This makes the menu much more accessible and faster to use for everyone.'
      ]
    ],
    reflectionHeading: 'Results & Reflection',
    reflectionText:
      'The result is a website that’s much easier to use for everyone (young and old). By organizing information more logically and replacing cumbersome PDF files, users can now find what they’re looking for without frustration. This makes for a smoother experience and increases the likelihood of orders in the online store.',
    learningHeading: 'What I learned:',
    learningItems: [
      '<strong>Testing provides clarity:</strong> Sometimes you assume what makes sense, but testing reveals the reality. It wasn’t until the tests that I realized the PDF menu was even more cumbersome than I thought.',
      '<strong>Don’t hesitate—just do it:</strong> When Doppio’s website changed in the middle of my project, I learned not to get bogged down. I quickly identified which parts of my research I could keep and what I really needed to adjust. This allowed me to continue with my design right away without wasting any time.',
      '<strong>Together we’re stronger:</strong> By combining my results with those of a fellow student, I knew for sure that my conclusions were reliable. This gave me a strong foundation for my decisions.',
      '<strong>Accessibility is very important:</strong> A design is only successful if it works for everyone. Whether it’s a readable menu or a clear notification, the user must feel supported.'
    ],
    prevProject: 'Previous project',
    backOverview: 'Back to overview',
    nextProject: 'Next project'
  }
};

const projectTwoTranslations = {
  nl: {
    caseTitle: 'Beslis Later – Gedragsontwerp tegen impulsaankopen',
    caseSideTitle: 'Case navigatie',
    sideLinks: ['Het probleem', 'Mijn aanpak', 'Het ontwerp', 'Resultaat & reflectie'],
    introHeading: 'In het kort',
    introQuestion: 'Waarom kopen we spullen die we eigenlijk niet nodig hebben?',
    introText:
      'Voor het vak <strong>Ontwerpen voor Gedragsbeïnvloeding</strong> ontwierp ik Beslis Later: een app die jongeren helpt om het pauzemoment tussen “impuls” en “aankoop” terug te pakken. Door UX-design te combineren met psychologische principes, stuur ik gedrag aan zonder iets te verbieden.',
    toolsHeading: 'Tools',
    problemHeading: 'Het probleem',
    problemText:
      'Jongeren worden constant geprikkeld om te kopen. Door sociale media en snelle betaalmethodes gebeurt dit vaak onbewust vanuit emotie (stress of verveling), met spijt achteraf. De uitdaging was om een tool te maken die helpt een aankoop uit te stellen en slimmere keuzes te maken, zonder dat de app als een “strenge ouder” voelt.',
    focusHeading: 'De focuspunten',
    focusItems: [
      'Het creëren van een rustmoment tussen de impuls en de betaling.',
      'Inzicht geven in besparingen en sociale steun van vrienden.',
      'Gedrag sturen via bewezen psychologische principes.'
    ],
    approachHeading: 'Mijn aanpak',
    approachIntro:
      'Ik was verantwoordelijk voor het volledige proces. Ik wou mijn app baseren op wetenschappelijke onderbouwing.',
    researchText:
      '<strong>Onderzoek:</strong> Uit mijn deskresearch bleek dat een 24-uurs regel de meest effectieve manier is om impulsaankopen te verminderen. Dit werd een belangrijk punt in mijn concept.',
    ideationText:
      '<strong>Ideatie:</strong> Met de Crazy Eight methode heb ik mezelf gedwongen om verder te kijken dan het eerste logische idee. De COCD-box hielp me daarna om de beste ideeën uit te kiezen.',
    validationText:
      '<strong>Validatie:</strong> Ik heb een volledige storymap en customer journey uitgewerkt om te checken of de psychologische principes (biases en heuristieken) op de juiste momenten in de klantreis naar voren kwamen.',
    designHeading: 'Het ontwerp',
    designIntro:
      'Ik heb schermen ontworpen die de gebruiker motivatie geven door gedragspsychologie in te zetten. Hiervoor heb ik mijn persona Lisa in gedachten gehouden.',
    dashboardHeading: '1. Het dashboard',
    dashboardText:
      '<strong>Motivatie door voortgang:</strong> Ik heb hier het Goal Gradient Effect toegepast. De voortgangsbalk stopt vlak voor een mijlpaal, waardoor Lisa sneller gemotiveerd raakt om door te sparen als ze ziet dat ze er “bijna” is.',
    waitingListHeading: '2. De wachtlijst',
    waitingListText:
      'Dit scherm draait om het Delay Effect. Door een timer van 24 uur toe te voegen, dwing ik een rustmoment af. Ik heb hier ook Social Proof toegevoegd (“90% van je spaarvrienden volgde vandaag hun spaardoel”) om het gevoel te geven dat bewust kiezen de norm is.',
    skipHeading: '3. Skip: De menselijke assistent (Antropomorfisme)',
    skipText:
      'Door de AI-assistent Skip een gezicht en persoonlijkheid te geven, voelt de hulp minder streng. Skip oordeelt niet, maar stelt kritische vragen die de gebruiker aan het denken zetten. Dit maakt de drempel om hulp te accepteren een stuk lager.',
    socialHeading: '4. Sociale steun en motivatie',
    socialText:
      'Ik heb sparen leuker gemaakt door gamification toe te voegen, zoals badges en gezamenlijke challenges met vrienden. Door Lisa samen met haar vrienden een spaardoel te laten kiezen, gebruik ik sociale steun om het volhouden makkelijker te maken. In het sociale overzicht versterk ik dit met social proof: door te laten zien dat ook anderen hun aankopen uitstellen, wordt bewust kiezen de nieuwe norm. Dit zorgt ervoor dat gebruikers gemotiveerd blijven zonder dat het voelt als een verplichting.',
    authorityHeading: '5. Autoriteit inzetten (Authority Bias)',
    authorityText:
      'Door experts zoals Erik Scherder te tonen, wordt de boodschap van de app geloofwaardiger. Mensen nemen advies sneller aan van iemand met status en kennis, wat de overtuigingskracht van de app versterkt.',
    interactionHeading: 'Interactie in beeld: Samen een challenge starten',
    interactionText:
      'In deze flow zie je hoe Lisa een challenge start en haar vriend Mark uitnodigt om mee te doen. Mijn gedachte hierachter was dat sociale controle het sparen een stuk makkelijker en leuker maakt. Door de interactie tussen beide telefoons uit te werken, laat ik zien hoe zij elkaar in de app motiveren om een aankoop uit te stellen.',
    metricsHint: 'Swipe horizontaal op mobiel om de volledige interactie-flow te bekijken.',
    guerrillaHeading: 'Guerilla marketing',
    guerrillaText:
      'Om jongeren naar de app te trekken, heb ik een guerilla-concept bedacht met een glazen bol vol geldbriefjes. Het doel is om mensen op een onverwachte plek nieuwsgierig te maken en het bespaarde geld direct tastbaar te maken. Deze actie dient als de eerste prikkel om de app via de QR-code te downloaden, waardoor de gedragsbeïnvloeding eigenlijk al op straat begint.',
    reflectionHeading: 'Resultaat & reflectie',
    reflectionIntro:
      'Het is leuk om te zien hoe je met wat psychologische kennis iemand even stil laat staan. Door op het juiste moment een pauzeknop in te drukken help ik jongeren om niet direct te kopen, maar eerst even rustig na te denken.',
    reflectionText:
      'Ik heb het ontwerp nu goed staan, maar ik zou het heel graag nog willen testen met de doelgroep. Ik ben benieuwd of jongeren na die dag inderdaad vaker nee zeggen, of dat de verleiding dan alsnog te groot is. Dat is voor mij de volgende stap om het ontwerp echt te verbeteren.',
    learningHeading: 'Wat ik heb geleerd:',
    learningItems: [
      '<strong>Mensen kijken naar elkaar:</strong> Ik zag hoe belangrijk social proof is. Als je ziet dat je vrienden ook hun aankopen uitstellen, is het veel makkelijker om zelf ook nee te zeggen.',
      '<strong>Het begint al op straat:</strong> Alleen focussen op de app is niet genoeg. De actie met de glazen bol leerde me dat je iemand eerst in de juiste mindset moet krijgen voordat ze de app überhaupt downloaden.',
      '<strong>Stapje voor stapje:</strong> Ik dacht dat er een ingewikkelde oplossing nodig was, maar een simpele timer kan al genoeg zijn om iemand te laten twijfelen. Je hoeft niet altijd alles tot in de puntjes uit te zoeken om een waardevolle eerste stap te zetten.'
    ],
    prevProject: 'Vorig project',
    backOverview: 'Terug naar overzicht',
    nextProject: 'Volgend project'
  },
  en: {
    caseTitle: 'Decide Later – Behavioral Design to Combat Impulse Purchases',
    caseSideTitle: 'CASE NAVIGATION',
    sideLinks: ['The problem', 'My approach', 'The design', 'Results & reflection'],
    introHeading: 'In short',
    introQuestion: 'Why do we buy things we don’t really need?',
    introText:
      'For the course <strong>Designing to Influence Behavior</strong>, I designed “Decide Later”: an app that helps young people reclaim that moment of pause between “impulse” and “purchase.” By combining UX design with psychological principles, I guide behavior without prohibiting anything.',
    toolsHeading: 'Tools',
    problemHeading: 'The problem',
    problemText:
      'Young people are constantly being tempted to buy. Due to social media and fast payment methods, this often happens subconsciously based on emotion (stress or boredom), leading to regret afterward. The challenge was to create a tool that helps users postpone a purchase and make smarter choices, without the app feeling like a “strict parent.”',
    focusHeading: 'Key focus areas',
    focusItems: [
      'Creating a moment of pause between the impulse and the payment.',
      'Providing insight into savings and social support from friends.',
      'Guiding behavior through proven psychological principles.'
    ],
    approachHeading: 'My approach',
    approachIntro:
      'I was responsible for the entire process. I wanted to base my app on scientific evidence.',
    researchText:
      '<strong>Research:</strong> My desk research showed that a 24-hour rule is the most effective way to reduce impulse purchases. This became a key element of my concept.',
    ideationText:
      '<strong>Ideation:</strong> Using the Crazy Eight method, I forced myself to look beyond the first logical idea. The COCD box then helped me select the best ideas.',
    validationText:
      '<strong>Validation:</strong> I developed a complete story map and customer journey to verify that the psychological principles (biases and heuristics) emerged at the right moments in the customer journey.',
    designHeading: 'The design',
    designIntro:
      'I designed screens that motivate the user by applying behavioral psychology. To do this, I kept my persona, Lisa, in mind.',
    dashboardHeading: '1. The dashboard',
    dashboardText:
      '<strong>Motivation through progress:</strong> Here, I applied the Goal Gradient Effect. The progress bar stops just before a milestone, which motivates Lisa to keep saving faster when she sees she’s “almost” there.',
    waitingListHeading: '2. The waiting list',
    waitingListText:
      'This screen revolves around the Delay Effect. By adding a 24-hour timer, I encourage a moment of reflection. I’ve also included Social Proof (“90% of your savings buddies met their savings goal today”) to convey that making a conscious choice is the norm.',
    skipHeading: '3. Skip: the human assistant (anthropomorphism)',
    skipText:
      'By giving the AI assistant Skip a face and personality, the help feels less strict. Skip doesn’t judge, but asks critical questions that make the user think. This significantly lowers the barrier to accepting help.',
    socialHeading: '4. Social support and motivation',
    socialText:
      'I’ve made saving more fun by adding gamification elements, such as badges and group challenges with friends. By having Lisa choose a savings goal together with her friends, I use social support to make it easier to stick with it. In the social overview, I reinforce this with social proof: by showing that others are also delaying their purchases, making conscious choices becomes the new norm. This ensures that users stay motivated without it feeling like an obligation.',
    authorityHeading: '5. Leveraging authority (authority bias)',
    authorityText:
      'By featuring experts like Erik Scherder, the app’s message becomes more credible. People are more likely to accept advice from someone with status and knowledge, which strengthens the app’s persuasive power.',
    interactionHeading: 'Interaction in action: starting a challenge together',
    interactionText:
      'In this flow, you can see how Lisa starts a challenge and invites her friend Mark to join. My idea behind this was that social accountability makes saving a lot easier and more fun. By detailing the interaction between their two phones, I show how they motivate each other within the app to postpone a purchase.',
    metricsHint: 'Swipe horizontally on your mobile device to view the full interaction flow.',
    guerrillaHeading: 'Guerrilla marketing',
    guerrillaText:
      'To attract young people to the app, I came up with a guerrilla marketing concept featuring a glass ball filled with bills. The goal is to pique people’s curiosity in an unexpected place and make the money they’ve saved immediately tangible. This campaign serves as the initial incentive to download the app via the QR code, meaning that influencing behavior actually begins right on the street.',
    reflectionHeading: 'Results & reflection',
    reflectionIntro:
      'It’s fun to see how a little psychological knowledge can make someone pause for a moment. By pressing a “pause” button at the right moment, I help young people avoid buying immediately and instead take a moment to think things through calmly.',
    reflectionText:
      'I’ve got the design figured out now, but I’d really like to test it with the target audience. I’m curious to see if young people do indeed say “no” more often after that day, or if the temptation is still too great. For me, that’s the next step in truly improving the design.',
    learningHeading: 'What I’ve learned:',
    learningItems: [
      '<strong>People look to each other:</strong> I saw how important social proof is. When you see that your friends are also putting off their purchases, it’s much easier to say no yourself.',
      '<strong>It starts right on the street:</strong> Focusing solely on the app isn’t enough. The crystal ball campaign taught me that you first have to get someone in the right mindset before they even download the app.',
      '<strong>Step by step:</strong> I thought a complicated solution was needed, but a simple timer can be enough to make someone hesitate. You don’t always have to figure everything out down to the last detail to take a valuable first step.'
    ],
    prevProject: 'Previous project',
    backOverview: 'Back to overview',
    nextProject: 'Next project'
  }
};

const applyProjectOneTranslations = (language) => {
  if (!isProjectOnePage()) return;

  const t = projectOneTranslations[language];

  const caseTitle = document.querySelector('#case-title');
  if (caseTitle) caseTitle.textContent = t.caseTitle;

  const sideTitle = document.querySelector('.case-side-title');
  if (sideTitle) sideTitle.textContent = t.caseSideTitle;

  const sideLinks = document.querySelectorAll('.case-side-nav a');
  sideLinks.forEach((link, index) => {
    if (t.sideLinks[index]) link.textContent = t.sideLinks[index];
  });

  const introHeading = document.querySelector('#probleem h2');
  if (introHeading) introHeading.textContent = t.introHeading;

  const introQuestion = document.querySelector('#probleem > p:first-of-type');
  if (introQuestion) introQuestion.textContent = t.introQuestion;

  const introParagraph = document.querySelectorAll('#probleem > p')[1];
  if (introParagraph) introParagraph.innerHTML = t.introText;

  const problemHeadings = document.querySelectorAll('#probleem h3');
  if (problemHeadings[0]) problemHeadings[0].textContent = t.toolsHeading;
  if (problemHeadings[1]) problemHeadings[1].textContent = t.problemHeading;

  const problemOverview = document.querySelectorAll('#probleem > p')[2];
  if (problemOverview) problemOverview.textContent = t.problemOverview;

  const problemIntro = document.querySelectorAll('#probleem > p')[3];
  if (problemIntro) problemIntro.textContent = t.problemIntro;

  const problemListItems = document.querySelectorAll('#probleem > ul li');
  problemListItems.forEach((item, index) => {
    if (t.problemList[index]) item.textContent = t.problemList[index];
  });

  const metricsHint = document.querySelector('.metrics-strip__hint');
  if (metricsHint) metricsHint.textContent = t.metricsHint;

  const approachHeading = document.querySelector('#aanpak h2');
  if (approachHeading) approachHeading.textContent = t.approachHeading;

  const approachParagraphs = document.querySelectorAll('#aanpak > p');
  if (approachParagraphs[0]) approachParagraphs[0].innerHTML = t.approachText1;
  if (approachParagraphs[1]) approachParagraphs[1].innerHTML = t.approachText2;

  const improvementsIntro = document.querySelector('#verbeteringen > p');
  if (improvementsIntro) improvementsIntro.textContent = t.improvementsIntro;

  const improvements = document.querySelectorAll('#verbeteringen .improvement');
  improvements.forEach((improvement, index) => {
    const heading = improvement.querySelector('h3');
    if (heading) {
      const severity = heading.querySelector('.severity');
      const className = severity?.classList.contains('severity-low')
        ? 'low'
        : severity?.classList.contains('severity-medium')
          ? 'medium'
          : 'high';

      if (severity) {
        severity.textContent = t.severityLabels[className];
      }

      const firstTextNode = Array.from(heading.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      );

      if (firstTextNode) {
        firstTextNode.textContent = `${t.improvementHeadings[index]} `;
      } else {
        heading.insertBefore(document.createTextNode(`${t.improvementHeadings[index]} `), severity);
      }
    }

    const copies = improvement.querySelectorAll('.comparison-copy');
    copies.forEach((copy, copyIndex) => {
      if (t.improvementCopies[index] && t.improvementCopies[index][copyIndex]) {
        copy.textContent = t.improvementCopies[index][copyIndex];
      }
    });

    const comparisonLabels = improvement.querySelectorAll('.comparison-label strong');
    if (comparisonLabels.length >= 2) {
      comparisonLabels[0].textContent = language === 'en' ? 'Before' : 'Voor';
      comparisonLabels[1].textContent = language === 'en' ? 'After' : 'Na';
    }
  });

  const reflectionHeading = document.querySelector('#reflectie h2');
  if (reflectionHeading) reflectionHeading.textContent = t.reflectionHeading;

  const reflectionParagraphs = document.querySelectorAll('#reflectie > p');
  if (reflectionParagraphs[0]) reflectionParagraphs[0].innerHTML = t.reflectionText;

  const learningHeading = document.querySelector('#reflectie h3');
  if (learningHeading) learningHeading.textContent = t.learningHeading;

  const learningItems = document.querySelectorAll('#reflectie > ul li');
  learningItems.forEach((item, index) => {
    if (t.learningItems[index]) item.innerHTML = t.learningItems[index];
  });

  const footerLinks = document.querySelectorAll('.case-nav-bottom a');
  if (footerLinks[0]) footerLinks[0].textContent = t.prevProject;
  if (footerLinks[1]) footerLinks[1].textContent = t.backOverview;
  if (footerLinks[2]) footerLinks[2].textContent = t.nextProject;
};

const applyProjectTwoTranslations = (language) => {
  if (!isProjectTwoPage()) return;

  const t = projectTwoTranslations[language];

  const caseTitle = document.querySelector('#case-title');
  if (caseTitle) caseTitle.textContent = t.caseTitle;

  const sideTitle = document.querySelector('.case-side-title');
  if (sideTitle) sideTitle.textContent = t.caseSideTitle;

  const sideLinks = document.querySelectorAll('.case-side-nav a');
  sideLinks.forEach((link, index) => {
    if (t.sideLinks[index]) link.textContent = t.sideLinks[index];
  });

  const introSection = document.querySelector('.case-content > section:first-of-type');
  if (introSection) {
    const introHeading = introSection.querySelector('h2');
    if (introHeading) introHeading.textContent = t.introHeading;

    const introParagraphs = introSection.querySelectorAll('p');
    if (introParagraphs[0]) introParagraphs[0].textContent = t.introQuestion;
    if (introParagraphs[1]) introParagraphs[1].innerHTML = t.introText;

    const toolsHeading = introSection.querySelector('h3');
    if (toolsHeading) toolsHeading.textContent = t.toolsHeading;
  }

  const problemSection = document.querySelector('#probleem');
  if (problemSection) {
    const problemHeading = problemSection.querySelector('h2');
    if (problemHeading) problemHeading.textContent = t.problemHeading;

    const problemParagraph = problemSection.querySelector('p');
    if (problemParagraph) problemParagraph.innerHTML = t.problemText;

    const focusHeading = problemSection.querySelector('h3');
    if (focusHeading) focusHeading.textContent = t.focusHeading;

    const focusItems = problemSection.querySelectorAll('li');
    focusItems.forEach((item, index) => {
      if (t.focusItems[index]) item.textContent = t.focusItems[index];
    });
  }

  const approachSection = document.querySelector('#aanpak');
  if (approachSection) {
    const approachHeading = approachSection.querySelector('h2');
    if (approachHeading) approachHeading.textContent = t.approachHeading;

    const approachIntro = approachSection.querySelectorAll('p')[0];
    if (approachIntro) approachIntro.textContent = t.approachIntro;

    const approachParagraphs = approachSection.querySelectorAll('p');
    if (approachParagraphs[1]) approachParagraphs[1].innerHTML = t.researchText;
    if (approachParagraphs[2]) approachParagraphs[2].innerHTML = t.ideationText;
    if (approachParagraphs[3]) approachParagraphs[3].innerHTML = t.validationText;
  }

  const designSection = document.querySelector('#oplossing');
  if (designSection) {
    const designHeading = designSection.querySelector('h2');
    if (designHeading) designHeading.textContent = t.designHeading;

    const designParagraphs = designSection.querySelectorAll('p');
    if (designParagraphs[0]) designParagraphs[0].innerHTML = t.designIntro;
    if (designParagraphs[1]) designParagraphs[1].innerHTML = t.dashboardText;
    if (designParagraphs[2]) designParagraphs[2].innerHTML = t.waitingListText;
    if (designParagraphs[3]) designParagraphs[3].innerHTML = t.skipText;
    if (designParagraphs[4]) designParagraphs[4].innerHTML = t.socialText;
    if (designParagraphs[5]) designParagraphs[5].innerHTML = t.authorityText;
    if (designParagraphs[6]) designParagraphs[6].innerHTML = t.interactionText;
    if (designParagraphs[7]) designParagraphs[7].innerHTML = t.guerrillaText;

    const designHeadings = designSection.querySelectorAll('h3');
    if (designHeadings[0]) designHeadings[0].textContent = t.dashboardHeading;
    if (designHeadings[1]) designHeadings[1].textContent = t.waitingListHeading;
    if (designHeadings[2]) designHeadings[2].textContent = t.skipHeading;
    if (designHeadings[3]) designHeadings[3].textContent = t.socialHeading;
    if (designHeadings[4]) designHeadings[4].textContent = t.authorityHeading;
    if (designHeadings[5]) designHeadings[5].textContent = t.interactionHeading;
    if (designHeadings[6]) designHeadings[6].textContent = t.guerrillaHeading;

    const hint = designSection.querySelector('.metrics-strip__hint');
    if (hint) hint.textContent = t.metricsHint;
  }

  const reflectionSection = document.querySelector('#reflectie');
  if (reflectionSection) {
    const reflectionHeading = reflectionSection.querySelector('h2');
    if (reflectionHeading) reflectionHeading.textContent = t.reflectionHeading;

    const reflectionParagraphs = reflectionSection.querySelectorAll('p');
    if (reflectionParagraphs[0]) reflectionParagraphs[0].innerHTML = t.reflectionIntro;
    if (reflectionParagraphs[1]) reflectionParagraphs[1].innerHTML = t.reflectionText;

    const learningHeading = reflectionSection.querySelector('h3');
    if (learningHeading) learningHeading.textContent = t.learningHeading;

    const learningItems = reflectionSection.querySelectorAll('li');
    learningItems.forEach((item, index) => {
      if (t.learningItems[index]) item.innerHTML = t.learningItems[index];
    });
  }

  const footerLinks = document.querySelectorAll('.case-nav-bottom a');
  if (footerLinks[0]) footerLinks[0].textContent = t.prevProject;
  if (footerLinks[1]) footerLinks[1].textContent = t.backOverview;
  if (footerLinks[2]) footerLinks[2].textContent = t.nextProject;
};

const projectThreeTranslations = {
  nl: {
    caseTitle: 'Silo’s doorbreken – Interactieve installatie voor Entrance',
    caseSideTitle: 'Case navigatie',
    sideLinks: ['Het probleem', 'Mijn aanpak', 'De oplossing', 'Resultaat & reflectie'],
    introHeading: 'In het kort',
    introQuestion: 'Hoe breng je een hal vol technische innovatie tot leven?',
    introText:
      'Bij Entrance (het energie-innovatiecentrum van de Hanze) wordt veel samengewerkt, maar de verschillende lectoraten weten vaak niet van elkaar waar ze precies mee bezig zijn. In opdracht van Strawberry Fields ontwierp ik samen met mijn team een interactieve installatie die deze verbindingen letterlijk laat groeien en verhalen tussen de afdelingen deelt.',
    toolsHeading: 'Tools',
    problemHeading: 'Het probleem',
    problemText:
      'Binnen Entrance gebeurt ontzettend veel, maar de cultuur is de laatste tijd technocratisch en bureaucratisch geworden. Lectoraten werken vaak op hun eigen eiland, waardoor onderzoeken en samenwerkingen onzichtbaar blijven voor de rest van het gebouw. Er ontbreekt een overzicht en mensen ervaren het grotere geheel van Entrance niet meer, terwijl multidisciplinair samenwerken juist de kern is.',
    approachHeading: 'Mijn aanpak',
    approachIntro:
      'Dit project draaide om het doorbreken van het werken in silo\'s en het terugbrengen van serendipiteit (onverwachte ontdekkingen).',
    researchHeading: 'Onderzoek',
    researchText:
      'Uit interviews bleek dat mensen sneller geprikkeld worden door interactie dan door veel tekst lezen. We moesten dus iets maken dat echt uitnodigt tot ontdekken.',
    ideationHeading: 'Ideatie',
    ideationText:
      'Via Crazy Eights kwamen we op de boom als metafoor voor groei en innovatie. Binnen het team was ik samen met Janine verantwoordelijk voor de vormgeving, de grootte en de stabiliteit van de fysieke boom.',
    iterationHeading: 'Iteratie',
    iterationText:
      'Mijn taak was om abstracte ideeën om te zetten in een werkend model. Door constante feedback binnen het team en tussentijdse tests hebben we het prototype steeds verder verbeterd, zodat de boom ook echt uit de dagelijkse werksfeer van de locatie springt.',
    solutionHeading: 'De oplossing: De appels liggen niet ver van de boom',
    solutionIntro:
      'De installatie nodigt bezoekers, studenten en medewerkers uit om op een speelse manier naar innovatie te kijken, geïnspireerd door het verhaal van Isaac Newton.',
    pickingHeading: '1. Plukken om te verbinden',
    pickingText:
      'Wanneer een bezoeker een felrode appel plukt door deze naar beneden te trekken, start de interactie. De appel opent in twee helften: in de ene helft zie je een beeld van een medewerker en in de andere helft hoor je via een speaker hun persoonlijke verhaal over een onderzoek. Mijn gedachte hierachter was om informatie fysiek te laten ontdekken in plaats van het passief van een scherm te lezen.',
    serendipityHeading: '2. Serendipiteit stimuleren',
    serendipityText:
      'In plaats van lange teksten, creëren we ruimte voor nieuwsgierigheid. Onder de boom zit een figuur van Newton met een korte call-to-action. Dit helpt om de drempel te verlagen. De handeling van het openen maakt de ervaring laagdrempelig en omdat de appels en verhalen makkelijk te vervangen zijn, blijft de installatie steeds verrassen. Dit zorgt ervoor dat mensen elke keer opnieuw komen kijken en weer met elkaar in gesprek gaan over het grotere geheel van Entrance.',
    reflectionHeading: 'Resultaat & reflectie',
    reflectionText:
      'De installatie maakt complexe informatie begrijpelijk en stimuleert nieuwsgierigheid. Het versterkt ook het communitygevoel doordat medewerkers hun eigen werk erin herkennen. Entrance was ontzettend enthousiast over het concept, waardoor we nu bezig zijn met het uitbreiden van de installatie naar een complete ervaring in de ruimte, inclusief banken, muziek, een muurschildering en workshops.',
    learningHeading: 'Wat ik heb geleerd:',
    learningItems: [
      '<strong>Mensen samenbrengen:</strong> Ik heb geleerd hoe je met een ontwerp echt voor een wij-gevoel zorgt. Door mensen uit hun eigen bubbel te halen en ze met elkaar te laten praten, zie je pas wat een goed ontwerp voor een groep kan betekenen.',
      '<strong>Impact door je zintuigen:</strong> Ik heb geleerd dat een verhaal veel beter binnenkomt als je mensen niet alleen tekst laat lezen, maar ook echt iets laat horen of doen. Door die interactie trek je mensen echt even uit hun werkdag. Het maakt het hele verhaal een stuk levendiger en persoonlijker.',
      '<strong>Itereren tot het staat:</strong> In de praktijk is het bouwen van een boom wel even iets anders dan een ontwerp op je scherm. Ik heb nagedacht over de stabiliteit, zodat de boom stevig blijft staan als mensen de appels openen. Door te blijven itereren, ontdekte ik precies welke materialen nodig waren om de installatie veilig en makkelijk bruikbaar te houden.'
    ],
    prevProject: 'Vorig project',
    backOverview: 'Terug naar overzicht',
    nextProject: 'Volgend project'
  },
  en: {
    caseTitle: 'Breaking through Silos – Interactive installation for Entrance',
    caseSideTitle: 'CASE NAVIGATION',
    sideLinks: ['The problem', 'My approach', 'The solution', 'Results & reflection'],
    introHeading: 'In short',
    introQuestion: 'How do you bring a hall full of technical innovation to life?',
    introText:
      'At Entrance (Hanze University’s energy innovation center), there’s a lot of collaboration, but the various research groups often don’t know exactly what the others are working on. Commissioned by Strawberry Fields, my team and I designed an interactive installation that literally lets these connections grow and shares stories across departments.',
    toolsHeading: 'Tools',
    problemHeading: 'The problem',
    problemText:
      'There’s a tremendous amount going on at Entrance, but the culture has recently become technocratic and bureaucratic. Research groups often operate in isolation, which means that research projects and collaborations remain invisible to the rest of the building. There’s a lack of an overall view, and people no longer perceive the bigger picture at Entrance, even though multidisciplinary collaboration is at its core.',
    approachHeading: 'My approach',
    approachIntro:
      'This was an individual project in which I was responsible for the entire process. I started with usability tests to see where things went wrong in practice. To strengthen my conclusions, I combined my results with data from a fellow student. This allowed me to identify clear patterns, which provided a reliable basis for my design choices.',
    researchHeading: 'Research',
    researchText:
      'I analyzed all the feedback and prioritized the issues by severity (low, medium, high), so I knew which adjustments would have the greatest impact on the customer experience.',
    ideationHeading: 'Ideation',
    ideationText:
      'Through Crazy Eights, we arrived at the tree as a metaphor for growth and innovation. Within the team, Janine and I were responsible for the design, size, and stability of the physical tree.',
    iterationHeading: 'Iteration',
    iterationText:
      'My task was to turn abstract ideas into a working model. Through constant feedback within the team and interim testing, we continuously improved the prototype so that the tree truly stands out from the location’s everyday work environment.',
    solutionHeading: 'The solution: The apples aren’t far from the tree',
    solutionIntro:
      'The installation invites visitors, students, and staff to view innovation in a playful way, inspired by the story of Isaac Newton.',
    pickingHeading: '1. Picking to connect',
    pickingText:
      'When a visitor picks a bright red apple by pulling it down, the interaction begins. The apple opens into two halves: in one half, you see an image of a staff member, and in the other half, you hear their personal story about a research project through a speaker. My idea behind this was to let people physically discover information rather than passively reading it on a screen.',
    serendipityHeading: '2. Encouraging serendipity',
    serendipityText:
      'Instead of long texts, we create space for curiosity. Under the tree is a figure of Newton with a brief call to action. This helps lower the barrier to entry. The act of opening the box makes the experience accessible, and because the apples and stories are easy to replace, the installation continues to surprise visitors. This encourages people to come back again and again and engage in conversation with one another about the bigger picture of Entrance.',
    reflectionHeading: 'Results & reflection',
    reflectionText:
      'The installation makes complex information easy to understand and sparks curiosity. It also strengthens the sense of community because employees recognize their own work in it. Entrance was incredibly enthusiastic about the concept, so we’re now working on expanding the installation into a complete experience within the space, including benches, music, a mural, and workshops.',
    learningHeading: 'What I’ve learned:',
    learningItems: [
      '<strong>Bringing people together:</strong> I’ve learned how a design can truly foster a sense of togetherness. By taking people out of their own bubbles and getting them to talk to one another, you realize just what a good design can mean for a group.',
      '<strong>Impact through the senses:</strong> I’ve learned that a story resonates much more deeply when you don’t just have people read text, but also let them actually hear or do something. That interaction truly pulls people away from their workday for a moment. It makes the whole story a lot more vivid and personal.',
      '<strong>Iterating until it’s right:</strong> In practice, building a tree is quite different from designing one on a screen. I thought carefully about stability, so the tree would remain sturdy when people opened the apples. By continuing to iterate, I discovered exactly which materials were needed to keep the installation safe and easy to use.'
    ],
    prevProject: 'Previous project',
    backOverview: 'Back to overview',
    nextProject: 'Next project'
  }
};

const applyProjectThreeTranslations = (language) => {
  if (!isProjectThreePage()) return;

  const t = projectThreeTranslations[language];

  const caseTitle = document.querySelector('#case-title');
  if (caseTitle) caseTitle.textContent = t.caseTitle;

  const sideTitle = document.querySelector('.case-side-title');
  if (sideTitle) sideTitle.textContent = t.caseSideTitle;

  const sideLinks = document.querySelectorAll('.case-side-nav a');
  sideLinks.forEach((link, index) => {
    if (t.sideLinks[index]) link.textContent = t.sideLinks[index];
  });

  const introSection = document.querySelector('.case-content > section:first-of-type');
  if (introSection) {
    const introHeading = introSection.querySelector('h2');
    if (introHeading) introHeading.textContent = t.introHeading;

    const introParagraphs = introSection.querySelectorAll('p');
    if (introParagraphs[0]) introParagraphs[0].textContent = t.introQuestion;
    if (introParagraphs[1]) introParagraphs[1].innerHTML = t.introText;

    const toolsHeading = introSection.querySelector('h3');
    if (toolsHeading) toolsHeading.textContent = t.toolsHeading;
  }

  const problemSection = document.querySelector('#probleem');
  if (problemSection) {
    const problemHeading = problemSection.querySelector('h2');
    if (problemHeading) problemHeading.textContent = t.problemHeading;

    const firstParagraph = problemSection.querySelector('p');
    if (firstParagraph) firstParagraph.innerHTML = t.problemText;
  }

  const approachSection = document.querySelector('#aanpak');
  if (approachSection) {
    const approachHeading = approachSection.querySelector('h2');
    if (approachHeading) approachHeading.textContent = t.approachHeading;

    const approachIntro = approachSection.querySelector('p');
    if (approachIntro) approachIntro.textContent = t.approachIntro;

    const headings = approachSection.querySelectorAll('h3');
    if (headings[0]) headings[0].textContent = t.researchHeading;
    if (headings[1]) headings[1].textContent = t.ideationHeading;
    if (headings[2]) headings[2].textContent = t.iterationHeading;

    const paragraphs = approachSection.querySelectorAll('p');
    if (paragraphs[1]) paragraphs[1].innerHTML = t.researchText;
    if (paragraphs[2]) paragraphs[2].innerHTML = t.ideationText;
    if (paragraphs[3]) paragraphs[3].innerHTML = t.iterationText;
  }

  const solutionSection = document.querySelector('#oplossing');
  if (solutionSection) {
    const solutionHeading = solutionSection.querySelector('h2');
    if (solutionHeading) solutionHeading.textContent = t.solutionHeading;

    const solutionIntro = solutionSection.querySelector('p');
    if (solutionIntro) solutionIntro.textContent = t.solutionIntro;

    const headings = solutionSection.querySelectorAll('h3');
    if (headings[0]) headings[0].textContent = t.pickingHeading;
    if (headings[1]) headings[1].textContent = t.serendipityHeading;

    const paragraphs = solutionSection.querySelectorAll('p');
    if (paragraphs[1]) paragraphs[1].innerHTML = t.pickingText;
    if (paragraphs[2]) paragraphs[2].innerHTML = t.serendipityText;
  }

  const reflectionSection = document.querySelector('#reflectie');
  if (reflectionSection) {
    const reflectionHeading = reflectionSection.querySelector('h2');
    if (reflectionHeading) reflectionHeading.textContent = t.reflectionHeading;

    const reflectionParagraph = reflectionSection.querySelector('p');
    if (reflectionParagraph) reflectionParagraph.innerHTML = t.reflectionText;

    const learningHeading = reflectionSection.querySelector('h3');
    if (learningHeading) learningHeading.textContent = t.learningHeading;

    const learningItems = reflectionSection.querySelectorAll('li');
    learningItems.forEach((item, index) => {
      if (t.learningItems[index]) item.innerHTML = t.learningItems[index];
    });
  }

  const footerLinks = document.querySelectorAll('.case-nav-bottom a');
  if (footerLinks[0]) footerLinks[0].textContent = t.prevProject;
  if (footerLinks[1]) footerLinks[1].textContent = t.backOverview;
  if (footerLinks[2]) footerLinks[2].textContent = t.nextProject;
};

const projectFourTranslations = {
  nl: {
    caseTitle: 'Bloei Op! – Mentale hulp zichtbaar maken',
    caseSideTitle: 'Case navigatie',
    sideLinks: ['Het probleem', 'Mijn aanpak', 'De oplossing', 'Resultaat & reflectie'],
    introHeading: 'In het kort',
    introText:
      'Waarom is de drempel naar mentale hulp voor jongeren zo hoog? In samenwerking met Kenniswerkplaats Onbegrepen Gedrag Groningen ontwierp ik samen met mijn team "Bloei Op!": een transmediale campagne die herstelinitiatieven zichtbaar maakt. Dit zijn vrije inloopplekken in de wijk waar je gewoon binnenstapt voor een praatje, een activiteit of steun van ervaringsdeskundigen. Met de Bloeibus brengen we informatie over herstelinitiatieven naar de plek waar jongeren al zijn, zoals bij scholen of in de binnenstad. Het is een veilige en herkenbare plek die uitnodigt om even binnen te stappen.',
    toolsHeading: 'Tools',
    problemHeading: 'Het probleem',
    problemText:
      'Veel jongeren worstelen met stress of eenzaamheid, maar de stap naar officiële hulpverlening voelt vaak te groot of te formeel. Bestaande initiatieven zijn er wel, maar ze worden niet gevonden of stralen niet de juiste energie uit. De uitdaging was om een veilige “tussenstap” te creëren die de drempel verlaagt.',
    approachHeading: 'Mijn aanpak',
    approachIntro:
      'Ik was binnen het team verantwoordelijk voor het onderzoek, de conceptontwikkeling, de naamgeving en de visuele en ruimtelijke uitwerking van het prototype.',
    focusHeading: 'Doelgroep centraal',
    focusText:
      'Uit ons onderzoek bleek dat jongeren behoefte hebben aan herkenning en verhalen van mensen in dezelfde situatie. Op basis hiervan heb ik een persona en ontwerpvoorwaarden opgesteld. Dit hielp mij om tijdens het ontwerpen duidelijke keuzes te maken. Alles wat ik tekende voor de bus moest direct bijdragen aan dat gevoel van veiligheid en herkenning.',
    aiHeading: 'Snel visualiseren met AI',
    aiText:
      'Om te testen welke uitstraling het beste werkte, heb ik Generative AI gebruikt om mijn verschillende bus-schetsen uit te werken tot een volledige visualisatie. Hiermee kon ik heel snel bij de doelgroep testen welke versie “veilig” en “laagdrempelig” aanvoelde en welke juist te koud aanvoelde.',
    journeyHeading: 'Van schets naar beleving',
    journeyText:
      'Via Crazy Eights kwamen we op het idee voor de bus. Ik heb de indeling binnenin helemaal uitgetekend, waarbij ik vooral heb gelet op de “reis” van binnenkomst tot aan het gesprek. Mijn doel was om een fijne, open sfeer neer te zetten. Een bus is natuurlijk maar een kleine ruimte, dus ik heb goed gekeken hoe ik dit kon inrichten zonder dat het te spannend zou aanvoelen voor de jongeren.',
    solutionHeading: 'De oplossing: Van herstel naar hoop',
    solutionIntro:
      'De campagne gebruikt de Bloeibus als een fysiek centraal punt, terwijl onze online kanalen jongeren daar stap voor stap naartoe leiden.',
    busHeading: '1. De Bloeibus: Een route naar herstel',
    busText:
      'Ik heb de binnenkant van de bus zo ontworpen dat je echt een verhalende route loopt. De bus is natuurlijk klein, dus ik wilde dat het binnen rustig voelt, maar niet te krap. Jongeren lopen letterlijk door een proces: ze beginnen bij herkenning door verhalen van anderen en eindigen bij een stap naar hulp. Zo laten we zien dat herstel iets is wat echt kan en voelt het minder spannend om die eerste stap te zetten.',
    transmediaHeading: '2. Transmediale zichtbaarheid',
    transmediaText:
      'De bus staat niet op zichzelf. Via de social media, livestreams, posters, stickers en de agenda die mijn teamgenoten hebben gemaakt, maken jongeren al op een laagdrempelige manier kennis met het project. In de bus heb ik deze zachte en toegankelijke sfeer aangehouden, zodat de drempel om naar binnen te stappen zo laag mogelijk blijft.',
    reflectionHeading: 'Resultaat & reflectie',
    reflectionText:
      'Het resultaat is een concept dat herstel zichtbaar maakt op de plekken waar jongeren zelf komen. Door beleving centraal te stellen, verandert de boodschap van "ik heb een probleem" naar "ik mag opbloeien". Onze opdrachtgever was dan ook erg enthousiast over de campagne en hoe we dit zware onderwerp laagdrempelig hebben gemaakt.',
    learningHeading: 'Wat ik heb geleerd:',
    learningItems: [
      '<strong>AI als hulpmiddel:</strong> Door te oefenen met de juiste prompts, hielp AI me om mijn ideeën supersnel visueel te maken. Ik kon hiermee direct de juiste sfeer neerzetten, wat met een normale schets veel langer duurt. Dit hielp het team om sneller te begrijpen welke kant we op moesten. In de toekomst wil ik dit vaker gebruiken om verschillende versies direct te kunnen testen bij de doelgroep.',
      '<strong>Van zwaar naar laagdrempelig:</strong> Mentale gezondheid is een lastig onderwerp om over te praten. Ik heb geleerd hoe je zo\'n zwaar thema luchtiger en toegankelijker kunt maken, zonder de kern te verliezen. Door in gesprek te gaan met een ervaringsdeskundige, ontdekte ik precies welke toon we moesten aanslaan.',
      '<strong>Duidelijke afspraken:</strong> In het begin liep de afstemming niet soepel door een misverstand over de planning. We hadden vaak les op de momenten dat zij wilden afspreken. Door zelf het initiatief te nemen en dit bespreekbaar te maken, kwamen we er samen toch goed uit en werd het een geslaagd project. Dit was een goede les voor mij: je moet vanaf de start heel duidelijk zijn over je eigen proces en agenda. Zeker bij een ingewikkeld onderwerp als herstelinitiatieven is het belangrijk om te blijven doorvragen tot het doel voor iedereen echt hetzelfde is.'
    ],
    prevProject: 'Vorig project',
    backOverview: 'Terug naar overzicht',
    nextProject: 'Volgend project'
  },
  en: {
    caseTitle: 'Bloei Op! – Making Mental Health Support Visible',
    caseSideTitle: 'CASE NAVIGATION',
    sideLinks: ['The problem', 'My approach', 'The solution', 'Results & Reflection'],
    introHeading: 'In short',
    introText:
      'Why is the barrier to seeking mental health support so high for young people? In collaboration with Kenniswerkplaats Onbegrepen Gedrag Groningen, my team and I designed “Bloei Op!”: a transmedia campaign that raises awareness of recovery initiatives. These are drop-in centers in the neighborhood where you can simply walk in for a chat, an activity, or support from peer experts. With the “Bloeibus,” we bring information about recovery initiatives to the places where young people already are, such as schools or downtown. It’s a safe and familiar space that invites people to pop in for a moment.',
    toolsHeading: 'Tools',
    problemHeading: 'The problem',
    problemText:
      'Many young people struggle with stress or loneliness, but taking the step toward formal support often feels too daunting or too formal. Existing initiatives do exist, but they’re either hard to find or don’t convey the right vibe. The challenge was to create a safe “intermediate step” that lowers the barrier to entry.',
    approachHeading: 'My approach',
    approachIntro:
      'Within the team, I was responsible for the research, concept development, naming, and the visual and spatial design of the prototype.',
    focusHeading: 'Focus on the target audience',
    focusText:
      'Our research showed that young people need a sense of recognition and stories from people in the same situation. Based on this, I developed a persona and design criteria. This helped me make clear choices during the design process. Everything I drew for the bus had to directly contribute to that sense of safety and recognition.',
    aiHeading: 'Quick visualization with AI',
    aiText:
      'To test which aesthetic worked best, I used Generative AI to develop my various bus sketches into a complete visualization. This allowed me to quickly test with the target audience which version felt “safe” and “accessible” and which one felt too cold.',
    journeyHeading: 'From Sketch to Experience',
    journeyText:
      'We came up with the idea for the bus through Crazy Eights. I drew out the entire interior layout, paying particular attention to the “journey” from the moment of entry through to the conversation. My goal was to create a pleasant, open atmosphere. Of course, a bus is just a small space, so I carefully considered how to design it without making it feel too intimidating for the young people.',
    solutionHeading: 'The solution: From recovery to hope',
    solutionIntro:
      'The campaign uses the Bloeibus as a physical focal point, while our online channels guide young people there step by step.',
    busHeading: '1. The Bloeibus: A path to recovery',
    busText:
      'I designed the interior of the bus so that you literally walk through a narrative journey. The bus is small, of course, so I wanted the interior to feel calm but not too cramped. Young people literally walk through a process: they start by recognizing their own experiences through others’ stories and end by taking a step toward getting help. This way, we show that recovery is truly possible and make it feel less intimidating to take that first step.',
    transmediaHeading: '2. Transmedia visibility',
    transmediaText:
      'The bus doesn’t stand alone. Through social media, livestreams, posters, stickers, and the calendar my teammates created, young people are already being introduced to the project in an accessible way. Inside the bus, I’ve maintained this gentle and welcoming atmosphere so that the barrier to stepping inside remains as low as possible.',
    reflectionHeading: 'Results & reflection',
    reflectionText:
      'The result is a concept that makes recovery visible in the places where young people naturally gather. By putting the experience at the center, the message shifts from “I have a problem” to “I can thrive.” Our client was therefore very enthusiastic about the campaign and how we made this difficult topic accessible.',
    learningHeading: 'What I learned:',
    learningItems: [
      '<strong>AI as a tool:</strong> By practicing with the right prompts, AI helped me visualize my ideas very quickly. This allowed me to immediately capture the right atmosphere, which takes much longer with a traditional sketch. This helped the team understand more quickly which direction we should take. In the future, I want to use this more often to test different versions directly with the target audience.',
      '<strong>From heavy to accessible:</strong> Mental health is a difficult topic to talk about. I learned how to make such a heavy theme lighter and more accessible without losing its essence. By talking with someone who has personal experience with the issue, I discovered exactly what tone we needed to strike.',
      '<strong>Clear agreements:</strong> At first, coordination didn’t go smoothly due to a misunderstanding about the schedule. We often had classes at the times they wanted to meet. By taking the initiative and bringing this up for discussion, we were able to work it out together after all, and the project turned out to be a success. This was a valuable lesson for me: you have to be very clear about your own process and schedule from the very beginning. Especially with a complex topic like restorative initiatives, it’s important to keep asking questions until everyone truly shares the same goal.'
    ],
    prevProject: 'Previous project',
    backOverview: 'Back to overview',
    nextProject: 'Next project'
  }
};

const projectFiveTranslations = {
  nl: {
    caseTitle: 'Spinnenheld – Angst overwinnen in een VR-wereld',
    caseSideTitle: 'Case navigatie',
    sideLinks: ['Het probleem', 'Mijn aanpak', 'De oplossing', 'Resultaat & reflectie'],
    introHeading: 'In het kort',
    introQuestion: 'Van spinnenfobie naar Spinnenheld: hoe doe je dat in VR?',
    introText:
      'Voor dit project ontwierp ik in een duo Spinnenheld: een VR-experience die kinderen stap voor stap laat wennen aan spinnen. Door storytelling te combineren met <strong>exposure therapy</strong>, veranderen we de angst in zelfvertrouwen en controle.',
    toolsHeading: 'Tools',
    problemHeading: 'Het probleem',
    problemText:
      'Veel kinderen zijn bang voor spinnen, wat vaak komt door negatieve verhalen of onbekendheid. Gewoon uitleggen dat een spin ongevaarlijk is, werkt meestal niet. De uitdaging was daarom om een veilige omgeving te ontwerpen waarin een kind zelf de leiding neemt en op een speelse manier de confrontatie durft aan te gaan.',
    approachHeading: 'Mijn aanpak',
    approachIntro:
      'Ik was verantwoordelijk voor het onderzoek naar gedragspsychologie en de conceptontwikkeling, waarbij mijn focus lag op de visuele stijl, het storyboard en het uitwerken van de <strong>interacties</strong> in de scripttaal Lua.',
    exposureHeading: 'Stapsgewijze blootstelling',
    exposureText:
      'Uit mijn onderzoek naar <strong>exposure therapy</strong> bleek dat angst pas echt afneemt als je de drempel heel laag houdt. Daarom hebben we een VR-ervaring ontworpen waarin het kind zelf de controle heeft. Door dit te combineren met mijn vrolijke moodboard, sluit de hele omgeving aan op de belevingswereld van het kind en voelt het direct veilig.',
    moodboardCaption: 'Moodboard',
    designHeading: 'Interactie ontwerpen',
    designText:
      'In Figma heb ik de hele dialoog en de flowchart uitgewerkt. Het was mijn doel om de spin niet zomaar als een object te zien, maar echt als een karakter waar het kind een band mee opbouwt. Daarna heb ik de flowchart vertaald naar een storyboard met verschillende versies. Hierdoor kreeg ik een goed beeld van hoe het verhaal liep en zag ik precies waar ik nog dingen moest aanpassen.',
    flowchartCaption: 'Flowchart',
    storyboardCaption: 'Storyboard',
    storyboardTwoCaption: 'Storyboard 2',
    robloxCaption: 'Bezig in Roblox studio',
    buildHeading: 'Bouwen in Roblox',
    buildText:
      'Ik heb het <strong>prototype</strong> zelf gebouwd in Roblox Studio. Omdat ik Lua nog niet kende, heb ik ChatGPT gebruikt om de scripts voor de <strong>interacties</strong> te schrijven. Hierdoor voelt de ervaring voor het kind heel echt aan, omdat de spin nu direct op hun gedrag reageert.',
    environmentCaption: 'Omgeving Spinnenheld',
    designRequirementsCaption: 'Ontwerpvoorwaarden',
    solutionHeading: 'De oplossing',
    solutionIntro:
      'Van schrik naar vriendschap: de experience is opgebouwd als een verhaal waarbij de spin steeds een klein beetje echter wordt.',
    controlHeading: '1. Controle en veiligheid',
    controlText:
      'De ervaring begint in een vrolijke, kleurrijke ruimte die helemaal niet eng aanvoelt, omdat we het kind eerst wilden laten wennen aan de omgeving. Door de spin eerst klein en vriendelijk voor te stellen, krijgt het kind een gevoel van controle voordat de echte interactie begint.',
    storyHeading: '2. Interactieve storytelling',
    storyText:
      'Naarmate de experience verder gaat, wordt de spin realistischer, maar de band die het kind heeft opgebouwd zorgt ervoor dat de angst afneemt. In plaats van alleen te kijken, moet het kind de spin uiteindelijk ook echt gaan helpen. Door een echte spinnenheld te worden, krijgen ze meer zelfvertrouwen. Door directe <strong>feedback</strong> te geven op elke <strong>interactie</strong>, voelt de VR-wereld echt en betrouwbaar aan.',
    videoCaption: 'Deze video laat de interactie zien tussen de spin en het kind',
    reflectionHeading: 'Resultaat & reflectie',
    reflectionText:
      'Het resultaat is een laagdrempelige game die als middel dient om emoties en gedrag te beïnvloeden. Voor de doelgroep voelt het als een spel, terwijl ze onbewust hun grenzen verleggen.',
    learningHeading: 'Wat ik heb geleerd',
    learningItems: [
      '<strong>Kinderen helpen met VR:</strong> Ik heb gezien dat je met VR een plek kunt maken waar iemand zich veilig voelt. Als je het stap voor stap opbouwt, help je iemand over een drempel heen zonder dat het eng wordt.',
      '<strong>Gebruikmaken van tools:</strong> Ik heb het <strong>prototype</strong> zelf gebouwd in Roblox Studio. Omdat ik de taal Lua niet ken, heb ik ChatGPT gebruikt om de scripts voor de <strong>interacties</strong> te schrijven. Ik heb ChatGPT precies aangestuurd met wat de spin moest doen en die code vervolgens in de game geplaatst. Hierdoor kon ik ondanks deze beperking toch een werkend product neerzetten waar de focus ligt op de ervaring van het kind.',
      '<strong>Leren door te doen:</strong> Het was superleuk om zelf iets in VR te bouwen, maar ik heb vooral geleerd hoe belangrijk <strong>iteraties</strong>, <strong>prototyping</strong> en vroeg testen zijn. We konden de VR-brillen pas laat lenen, waardoor we er op het laatste moment achter kwamen dat de ervaring in de bril heel anders is dan op een scherm. Een goede les voor de volgende keer: zo snel mogelijk alles regelen en vaker testen.'
    ],
    prevProject: 'Vorig project',
    backOverview: 'Terug naar overzicht',
    nextProject: 'Volgend project'
  },
  en: {
    caseTitle: 'Spider Hero – Overcoming fear in a VR world',
    caseSideTitle: 'CASE NAVIGATION',
    sideLinks: ['The problem', 'My approach', 'The solution', 'Results & reflection'],
    introHeading: 'In short',
    introQuestion: 'From spider phobia to Spider Hero: How do you do that in VR?',
    introText:
      'For this project, I co-designed Spider Hero: a VR experience that helps children get used to spiders step by step. By combining storytelling with <strong>exposure therapy</strong>, we transform fear into self-confidence and a sense of control.',
    toolsHeading: 'Tools',
    problemHeading: 'The problem',
    problemText:
      'Many children are afraid of spiders, often due to negative stories or unfamiliarity. Simply explaining that a spider is harmless usually doesn’t work. The challenge, therefore, was to design a safe environment in which a child takes the lead and dares to face their fear in a playful way.',
    approachHeading: 'My approach',
    approachIntro:
      'I was responsible for the behavioral psychology research and concept development, focusing on the visual style, the storyboard, and implementing the interactions in the Lua scripting language.',
    exposureHeading: 'Gradual exposure',
    exposureText:
      'My research into <strong>exposure therapy</strong> showed that fear only truly diminishes when you keep the threshold very low. That’s why we designed a VR experience in which the child is in control. By combining this with my cheerful mood board, the entire environment aligns with the child’s perception of the world, making them feel safe right away.',
    moodboardCaption: 'Moodboard',
    designHeading: 'Designing interaction',
    designText:
      'In Figma, I worked out the entire dialogue and flowchart. My goal was to view the spider not merely as an object, but truly as a character with whom the child builds a connection. I then translated the flowchart into a storyboard with different versions. This gave me a clear picture of how the story unfolded and allowed me to see exactly where I still needed to make adjustments.',
    flowchartCaption: 'Flowchart',
    storyboardCaption: 'Storyboard',
    storyboardTwoCaption: 'Storyboard 2',
    robloxCaption: 'Working in Roblox Studio',
    buildHeading: 'Building in Roblox',
    buildText:
      'I built the prototype myself in Roblox Studio. Since I wasn’t familiar with Lua yet, I used ChatGPT to write the scripts for the interactions. This makes the experience feel very real to the child, because the spider now reacts directly to their behavior.',
    environmentCaption: 'Spider Hero environment',
    designRequirementsCaption: 'Design requirements',
    solutionHeading: 'The solution',
    solutionIntro:
      'From fear to friendship: the experience is structured as a story in which the spider gradually becomes a little more real.',
    controlHeading: '1. Control and safety',
    controlText:
      'The experience begins in a cheerful, colorful space that doesn’t feel scary at all, because we wanted the child to get used to the environment first. By introducing the spider as small and friendly at first, the child gains a sense of control before the real interaction begins.',
    storyHeading: '2. Interactive storytelling',
    storyText:
      'As the experience progresses, the spider becomes more realistic, but the bond the child has built helps alleviate their fear. Instead of just watching, the child eventually has to actually help the spider. By becoming a true spider hero, they gain more self-confidence. Providing immediate feedback on every interaction makes the VR world feel real and trustworthy.',
    videoCaption: 'This video shows the interaction between the spider and the child',
    reflectionHeading: 'Results & reflection',
    reflectionText:
      'The result is an accessible game that serves as a tool to influence emotions and behavior. For the target audience, it feels like a game, while they are unconsciously pushing their boundaries.',
    learningHeading: 'What I’ve learned',
    learningItems: [
      '<strong>Helping children with VR:</strong> I’ve seen that VR can create a space where someone feels safe. If you build it up step by step, you help someone overcome a barrier without it becoming scary.',
      '<strong>Using tools:</strong> I built the prototype myself in Roblox Studio. Since I don’t know the Lua programming language, I used ChatGPT to write the scripts for the interactions. I gave ChatGPT precise instructions on what the spider needed to do and then placed that code into the game. This allowed me to create a working product that focuses on the child’s experience, despite this limitation.',
      '<strong>Learning by doing:</strong> It was a lot of fun to build something in VR myself, but above all, I learned how important iteration, prototyping, and early testing are. We weren’t able to borrow the VR headsets until late in the process, so we realized at the last minute that the experience through the headset is very different from what you see on a screen. A good lesson for next time: arrange everything as early as possible and test more often.'
    ],
    prevProject: 'Previous project',
    backOverview: 'Back to overview',
    nextProject: 'Next project'
  }
};

const applyProjectFiveTranslations = (language) => {
  if (!isProjectFivePage()) return;

  const t = projectFiveTranslations[language];

  const caseTitle = document.querySelector('#case-title');
  if (caseTitle) caseTitle.textContent = t.caseTitle;

  const sideTitle = document.querySelector('.case-side-title');
  if (sideTitle) sideTitle.textContent = t.caseSideTitle;

  const sideLinks = document.querySelectorAll('.case-side-nav a');
  sideLinks.forEach((link, index) => {
    if (t.sideLinks[index]) link.textContent = t.sideLinks[index];
  });

  const introSection = document.querySelector('.case-content > section:first-of-type');
  if (introSection) {
    const introHeading = introSection.querySelector('h2');
    if (introHeading) introHeading.textContent = t.introHeading;

    const introParagraphs = introSection.querySelectorAll('p');
    if (introParagraphs[0]) introParagraphs[0].textContent = t.introQuestion;
    if (introParagraphs[1]) introParagraphs[1].innerHTML = t.introText;

    const toolsHeading = introSection.querySelector('h3');
    if (toolsHeading) toolsHeading.textContent = t.toolsHeading;
  }

  const problemSection = document.querySelector('#probleem');
  if (problemSection) {
    const problemHeading = problemSection.querySelector('h2');
    if (problemHeading) problemHeading.textContent = t.problemHeading;

    const problemParagraph = problemSection.querySelector('p');
    if (problemParagraph) problemParagraph.innerHTML = t.problemText;

    const designRequirementsCaption = problemSection.querySelector('figcaption');
    if (designRequirementsCaption) designRequirementsCaption.textContent = t.designRequirementsCaption;
  }

  const approachSection = document.querySelector('#aanpak');
  if (approachSection) {
    const approachHeading = approachSection.querySelector('h2');
    if (approachHeading) approachHeading.textContent = t.approachHeading;

    const approachIntro = approachSection.querySelector('p');
    if (approachIntro) approachIntro.innerHTML = t.approachIntro;

    const headings = approachSection.querySelectorAll('h3');
    if (headings[0]) headings[0].textContent = t.exposureHeading;
    if (headings[1]) headings[1].textContent = t.designHeading;
    if (headings[2]) headings[2].textContent = t.buildHeading;

    const paragraphs = approachSection.querySelectorAll('p');
    if (paragraphs[1]) paragraphs[1].innerHTML = t.exposureText;
    if (paragraphs[2]) paragraphs[2].innerHTML = t.designText;
    if (paragraphs[3]) paragraphs[3].innerHTML = t.buildText;

    const figcaptions = approachSection.querySelectorAll('figcaption');
    if (figcaptions[0]) figcaptions[0].textContent = t.moodboardCaption;
    if (figcaptions[1]) figcaptions[1].textContent = t.flowchartCaption;
    if (figcaptions[2]) figcaptions[2].textContent = t.storyboardCaption;
    if (figcaptions[3]) figcaptions[3].textContent = t.storyboardTwoCaption;
    if (figcaptions[4]) figcaptions[4].textContent = t.robloxCaption;
    if (figcaptions[5]) figcaptions[5].textContent = t.environmentCaption;
  }

  const solutionSection = document.querySelector('#oplossing');
  if (solutionSection) {
    const solutionHeading = solutionSection.querySelector('h2');
    if (solutionHeading) solutionHeading.textContent = t.solutionHeading;

    const solutionIntro = solutionSection.querySelector('p');
    if (solutionIntro) solutionIntro.textContent = t.solutionIntro;

    const headings = solutionSection.querySelectorAll('h3');
    if (headings[0]) headings[0].textContent = t.controlHeading;
    if (headings[1]) headings[1].textContent = t.storyHeading;

    const paragraphs = solutionSection.querySelectorAll('p');
    if (paragraphs[1]) paragraphs[1].innerHTML = t.controlText;
    if (paragraphs[2]) paragraphs[2].innerHTML = t.storyText;

    const videoCaption = solutionSection.querySelector('.case-video figcaption');
    if (videoCaption) videoCaption.textContent = t.videoCaption;

    const environmentLabel = solutionSection.querySelector('.comparison-label');
    if (environmentLabel) environmentLabel.textContent = t.environmentCaption;
  }

  const reflectionSection = document.querySelector('#reflectie');
  if (reflectionSection) {
    const reflectionHeading = reflectionSection.querySelector('h2');
    if (reflectionHeading) reflectionHeading.textContent = t.reflectionHeading;

    const reflectionParagraph = reflectionSection.querySelector('p');
    if (reflectionParagraph) reflectionParagraph.innerHTML = t.reflectionText;

    const learningHeading = reflectionSection.querySelector('h3');
    if (learningHeading) learningHeading.textContent = t.learningHeading;

    const learningItems = reflectionSection.querySelectorAll('li');
    learningItems.forEach((item, index) => {
      if (t.learningItems[index]) item.innerHTML = t.learningItems[index];
    });
  }

  const footerLinks = document.querySelectorAll('.case-nav-bottom a');
  if (footerLinks[0]) footerLinks[0].textContent = t.prevProject;
  if (footerLinks[1]) footerLinks[1].textContent = t.backOverview;
  if (footerLinks[2]) footerLinks[2].textContent = t.nextProject;
};

const applyProjectFourTranslations = (language) => {
  if (!isProjectFourPage()) return;

  const t = projectFourTranslations[language];

  const caseTitle = document.querySelector('#case-title');
  if (caseTitle) caseTitle.textContent = t.caseTitle;

  const sideTitle = document.querySelector('.case-side-title');
  if (sideTitle) sideTitle.textContent = t.caseSideTitle;

  const sideLinks = document.querySelectorAll('.case-side-nav a');
  sideLinks.forEach((link, index) => {
    if (t.sideLinks[index]) link.textContent = t.sideLinks[index];
  });

  const introSection = document.querySelector('.case-content > section:first-of-type');
  if (introSection) {
    const introHeading = introSection.querySelector('h2');
    if (introHeading) introHeading.textContent = t.introHeading;

    const introParagraph = introSection.querySelector('p');
    if (introParagraph) introParagraph.innerHTML = t.introText;

    const toolsHeading = introSection.querySelector('h3');
    if (toolsHeading) toolsHeading.textContent = t.toolsHeading;
  }

  const problemSection = document.querySelector('#probleem');
  if (problemSection) {
    const problemHeading = problemSection.querySelector('h2');
    if (problemHeading) problemHeading.textContent = t.problemHeading;

    const problemParagraph = problemSection.querySelector('p');
    if (problemParagraph) problemParagraph.innerHTML = t.problemText;
  }

  const approachSection = document.querySelector('#aanpak');
  if (approachSection) {
    const approachHeading = approachSection.querySelector('h2');
    if (approachHeading) approachHeading.textContent = t.approachHeading;

    const introParagraph = approachSection.querySelector('p');
    if (introParagraph) introParagraph.textContent = t.approachIntro;

    const headings = approachSection.querySelectorAll('h3');
    if (headings[0]) headings[0].textContent = t.focusHeading;
    if (headings[1]) headings[1].textContent = t.aiHeading;
    if (headings[2]) headings[2].textContent = t.journeyHeading;

    const paragraphs = approachSection.querySelectorAll('p');
    if (paragraphs[1]) paragraphs[1].innerHTML = t.focusText;
    if (paragraphs[2]) paragraphs[2].innerHTML = t.aiText;
    if (paragraphs[3]) paragraphs[3].innerHTML = t.journeyText;
  }

  const solutionSection = document.querySelector('#oplossing');
  if (solutionSection) {
    const solutionHeading = solutionSection.querySelector('h2');
    if (solutionHeading) solutionHeading.textContent = t.solutionHeading;

    const solutionParagraph = solutionSection.querySelector('p');
    if (solutionParagraph) solutionParagraph.textContent = t.solutionIntro;

    const headings = solutionSection.querySelectorAll('h3');
    if (headings[0]) headings[0].textContent = t.busHeading;
    if (headings[1]) headings[1].textContent = t.transmediaHeading;

    const paragraphs = solutionSection.querySelectorAll('p');
    if (paragraphs[1]) paragraphs[1].innerHTML = t.busText;
    if (paragraphs[2]) paragraphs[2].innerHTML = t.transmediaText;
  }

  const reflectionSection = document.querySelector('#reflectie');
  if (reflectionSection) {
    const reflectionHeading = reflectionSection.querySelector('h2');
    if (reflectionHeading) reflectionHeading.textContent = t.reflectionHeading;

    const reflectionParagraph = reflectionSection.querySelector('p');
    if (reflectionParagraph) reflectionParagraph.innerHTML = t.reflectionText;

    const learningHeading = reflectionSection.querySelector('h3');
    if (learningHeading) learningHeading.textContent = t.learningHeading;

    const learningItems = reflectionSection.querySelectorAll('li');
    learningItems.forEach((item, index) => {
      if (t.learningItems[index]) item.innerHTML = t.learningItems[index];
    });
  }

  const footerLinks = document.querySelectorAll('.case-nav-bottom a');
  if (footerLinks[0]) footerLinks[0].textContent = t.prevProject;
  if (footerLinks[1]) footerLinks[1].textContent = t.backOverview;
  if (footerLinks[2]) footerLinks[2].textContent = t.nextProject;
};

const updatePageLanguage = (language) => {
  updateNavLanguage(language);

  const projectEyebrow = document.querySelector('.projects .eyebrow');
  const projectTitle = document.querySelector('#projects-title');
  const aboutEyebrow = document.querySelector('.about .eyebrow');
  const aboutTitle = document.querySelector('#about-title');
  const contactEyebrow = document.querySelector('#contact .eyebrow');
  const contactTitle = document.querySelector('#contact-title');
  const aboutSectionHeadings = document.querySelectorAll('.about-copy h3');
  const aboutSectionParagraphs = document.querySelectorAll('.about-copy p:not(.about-ps)');
  const aboutPostScript = document.querySelector('.about-ps');

  if (projectEyebrow) projectEyebrow.textContent = translations[language].projectEyebrow;
  if (projectTitle) projectTitle.textContent = translations[language].projectTitle;
  if (aboutEyebrow) aboutEyebrow.textContent = translations[language].aboutEyebrow;
  if (aboutTitle) aboutTitle.textContent = translations[language].aboutTitle;
  if (contactEyebrow) contactEyebrow.textContent = translations[language].contactEyebrow;
  if (contactTitle) contactTitle.textContent = translations[language].contactTitle;

  aboutSectionHeadings.forEach((heading, index) => {
    const translation = translations[language].aboutSections[index];
    if (translation) heading.textContent = translation.heading;
  });

  aboutSectionParagraphs.forEach((paragraph, index) => {
    const translation = translations[language].aboutSections[index];
    if (translation) paragraph.textContent = translation.text;
  });

  if (aboutPostScript) {
    aboutPostScript.textContent = translations[language].aboutPs;
  }

  if (isProjectOnePage()) {
    applyProjectOneTranslations(language);
  }

  if (isProjectTwoPage()) {
    applyProjectTwoTranslations(language);
  }

  if (isProjectThreePage()) {
    applyProjectThreeTranslations(language);
  }

  if (isProjectFourPage()) {
    applyProjectFourTranslations(language);
  }

  if (isProjectFivePage()) {
    applyProjectFiveTranslations(language);
  }

  updateProjectCards(language);
  updateHeroLanguage(language);
  document.documentElement.lang = language === 'en' ? 'en' : 'nl';
};

const createLanguageSwitcher = () => {
  if (!siteNav || siteNav.querySelector('.lang-switcher')) return;

  const switcher = document.createElement('button');
  switcher.type = 'button';
  switcher.className = 'lang-switcher';
  switcher.setAttribute('aria-label', 'Switch language');
  switcher.setAttribute('aria-pressed', 'false');
  switcher.innerHTML = `
    <span class="lang-option is-active">NL</span>
    <span class="lang-divider" aria-hidden="true">/</span>
    <span class="lang-option">EN</span>
  `;

  switcher.addEventListener('click', () => {
    const nextLanguage = getStoredLanguage() === 'en' ? 'nl' : 'en';
    window.localStorage.setItem(languageStorageKey, nextLanguage);
    updateLanguageUI(nextLanguage);
  });

  siteNav.appendChild(switcher);
};

const updateLanguageUI = (language) => {
  const switcher = document.querySelector('.lang-switcher');
  if (switcher) {
    const options = switcher.querySelectorAll('.lang-option');
    options.forEach((option) => {
      const isActive = option.textContent.trim() === language.toUpperCase();
      option.classList.toggle('is-active', isActive);
    });
    switcher.setAttribute('aria-pressed', String(language === 'en'));
    switcher.setAttribute('aria-label', language === 'en' ? 'Switch to Dutch' : 'Switch to English');
  }

  updatePageLanguage(language);
};

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

createLanguageSwitcher();

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open', !expanded);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    });
  });
}

updateLanguageUI(getStoredLanguage());

window.addEventListener(
  'scroll',
  () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
  },
  { passive: true }
);

// Smooth scrolling for in-page anchors.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();
    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  });
});

if (revealItems.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // Safety net: never leave content hidden if observer callbacks are delayed.
  window.setTimeout(() => {
    revealItems.forEach((item) => {
      if (!item.classList.contains('in-view')) {
        item.classList.add('in-view');
      }
    });
  }, 900);
} else if (revealItems.length) {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

if (heroName) {
  const text = heroName.dataset.name || heroName.textContent.trim();
  const fragment = document.createDocumentFragment();

  text.split('').forEach((char, index) => {
    const qualityEntry = nameQualities[index];

    if (!qualityEntry || qualityEntry.letter.toLowerCase() !== char.toLowerCase()) {
      return;
    }

    const letterElement = document.createElement('button');
    letterElement.type = 'button';
    letterElement.className = 'name-letter';

    if (char === ' ') {
      letterElement.classList.add('space');
      letterElement.tabIndex = -1;
      letterElement.setAttribute('aria-hidden', 'true');
      letterElement.textContent = '\u00A0';
      fragment.appendChild(letterElement);
      return;
    }

    const initialQuality = getQualityText(qualityEntry, getStoredLanguage());
    letterElement.textContent = char;
    letterElement.dataset.quality = initialQuality;
    letterElement.setAttribute('aria-label', `${char} - ${initialQuality}`);
    fragment.appendChild(letterElement);
  });

  heroName.textContent = '';
  heroName.appendChild(fragment);

  const letters = Array.from(heroName.querySelectorAll('.name-letter:not(.space)'));
  const setHeroQualityText = (quality) => {
    if (heroQuality) {
      const resolvedQuality = typeof quality === 'string' ? quality : '';
      heroQuality.textContent = resolvedQuality || 'Raak een letter aan voor mijn kwaliteit';
    }
  };
  const clearActiveLetters = () => {
    letters.forEach((letter) => letter.classList.remove('is-active'));
  };
  const activateLetter = (letter, persist = false) => {
    window.clearTimeout(letter._activeTimer);
    clearActiveLetters();
    letter.classList.add('is-active');
    setHeroQualityText(letter.dataset.quality);
    if (!persist) {
      letter._activeTimer = window.setTimeout(() => {
        letter.classList.remove('is-active');
      }, 1200);
    }
  };

  letters.forEach((letter) => {
    letter.addEventListener('mouseenter', () => {
      activateLetter(letter, true);
    });

    letter.addEventListener('focus', () => {
      activateLetter(letter, true);
    });

    letter.addEventListener('mouseleave', () => {
      if (document.activeElement !== letter) {
        letter.classList.remove('is-active');
        setHeroQualityText('');
      }
    });

    letter.addEventListener('blur', () => {
      letter.classList.remove('is-active');
      setHeroQualityText('');
    });

    letter.addEventListener('touchstart', () => {
      activateLetter(letter);
    });

    letter.addEventListener('click', () => {
      activateLetter(letter);
    });
  });

  if (hero) {
    hero.addEventListener('mouseleave', () => {
      clearActiveLetters();
      setHeroQualityText('');
    });
  }
}

cards.forEach((card) => {
  card.addEventListener('touchstart', () => {
    cards.forEach((other) => {
      if (other !== card) {
        other.classList.remove('is-tapped');
      }
    });

    card.classList.add('is-tapped');

    window.setTimeout(() => {
      card.classList.remove('is-tapped');
    }, 1300);
  });
});

if (cursorDot && !prefersReducedMotion) {
  window.addEventListener(
    'mousemove',
    (event) => {
      cursorDot.style.left = `${event.clientX}px`;
      cursorDot.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );
}
