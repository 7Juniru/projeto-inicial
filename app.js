/**
 * FOODforLIFE - app.js
 * Frontend: Despensa, Favoritos, Voz, Foto OCR, Hub de Receitas
 */

/* ============================================================
   ESTADO GLOBAL
   ============================================================ */
let products = [];

/* ============================================================
   RECEITAS BASE
   ============================================================ */
const RECEITAS_SAUDAVEIS = [
  { 
    nome: "Salada de Atum com Legumes", 
    emoji: "🥗", 
    tags: ["healthy","low-carb"], 
    regiao: "Nacional",
    ingredientes: ["Hortifrúti","Carnes & Proteínas"],
    produtos: ["atum","cenoura","vagem","azeite","limão","sal"],
    tempo: "15 min",
    dificuldade: "Fácil",
    porcoes: 2,
    detalhesIngredientes: [
      { nome: "1 lata de atum light", cat: "Carnes & Proteínas" },
      { nome: "1 cenoura cozida ralada", cat: "Hortifrúti" },
      { nome: "100g de vagem cozida picada", cat: "Hortifrúti" },
      { nome: "Azeite, sal e limão a gosto", cat: "Outros" }
    ],
    passos: [
      "Abra a lata de atum e escorra o óleo ou água completamente.",
      "Em uma tigela grande, misture o atum escorrido com a cenoura ralada e a vagem picada.",
      "Tempere com um fio de azeite de oliva extra virgem, suco de limão e uma pitada de sal.",
      "Misture tudo delicadamente e sirva frio."
    ]
  },
  { 
    nome: "Iogurte com Frutas", 
    emoji: "🫐", 
    tags: ["healthy","sem glúten"], 
    regiao: "Nacional",
    ingredientes: ["Laticínios & Derivados","Hortifrúti"],
    produtos: ["iogurte","banana","morango","mel","aveia","frutas"],
    tempo: "5 min",
    dificuldade: "Fácil",
    porcoes: 1,
    detalhesIngredientes: [
      { nome: "200ml de iogurte natural desnatado", cat: "Laticínios & Derivados" },
      { nome: "1 banana fatiada ou morangos picados", cat: "Hortifrúti" },
      { nome: "1 colher de mel ou aveia (opcional)", cat: "Outros" }
    ],
    passos: [
      "Coloque o iogurte natural em uma taça ou tigela funda.",
      "Lave bem e corte as frutas selecionadas (banana, morangos ou mirtilos).",
      "Disponha as frutas cortadas por cima do iogurte.",
      "Finalize com mel ou sementes de chia a gosto e sirva imediatamente."
    ]
  },
  { 
    nome: "Sopa de Legumes Nutritiva", 
    emoji: "🥣", 
    tags: ["healthy","low-cal"], 
    regiao: "Nacional",
    ingredientes: ["Hortifrúti","Mercearia & Enlatados"],
    produtos: ["batata","cenoura","abobrinha","cebola","alho","caldo","legumes"],
    tempo: "35 min",
    dificuldade: "Médio",
    porcoes: 4,
    detalhesIngredientes: [
      { nome: "1 batata, 1 cenoura e 1 abobrinha", cat: "Hortifrúti" },
      { nome: "1 xícara de caldo de legumes natural", cat: "Mercearia & Enlatados" },
      { nome: "1 cebola picada e dentes de alho", cat: "Hortifrúti" },
      { nome: "Sal e ervas finas a gosto", cat: "Outros" }
    ],
    passos: [
      "Em uma panela grande, refogue a cebola picada e o alho com um fio de azeite.",
      "Adicione a batata, cenoura e abobrinha cortadas em cubos pequenos.",
      "Despeje o caldo de legumes e complete com água fervente até cobrir tudo.",
      "Deixe cozinhar em fogo médio por 25 minutos até os legumes ficarem macios.",
      "Ajuste o sal e sirva bem quente."
    ]
  },
  { 
    nome: "Wrap Integral de Frango", 
    emoji: "🌯", 
    tags: ["healthy","proteico"], 
    regiao: "Nacional",
    ingredientes: ["Carnes & Proteínas","Padaria & Confeitaria"],
    produtos: ["frango","wrap","alface","requeijão","peito"],
    tempo: "15 min",
    dificuldade: "Fácil",
    porcoes: 2,
    detalhesIngredientes: [
      { nome: "200g de peito de frango cozido e desfiado", cat: "Carnes & Proteínas" },
      { nome: "2 folhas de wrap integral (Rap10)", cat: "Padaria & Confeitaria" },
      { nome: "Folhas de alface fresquinhas", cat: "Hortifrúti" },
      { nome: "1 colher de requeijão light para untar", cat: "Laticínios & Derivados" }
    ],
    passos: [
      "Aqueça levemente os wraps em uma frigideira por 30 segundos de cada lado.",
      "Passe uma fina camada de requeijão light sobre cada wrap aquecido.",
      "Distribua as folhas de alface e adicione o frango desfiado temperado por cima.",
      "Enrole os wraps firmemente e corte ao meio antes de servir."
    ]
  },
  { 
    nome: "Smoothie Verde Detox", 
    emoji: "🥤", 
    tags: ["healthy","detox"], 
    regiao: "Nacional",
    ingredientes: ["Hortifrúti","Bebidas"],
    produtos: ["couve","maçã","limão","água de coco","hortelã","suco"],
    tempo: "5 min",
    dificuldade: "Fácil",
    porcoes: 1,
    detalhesIngredientes: [
      { nome: "2 folhas de couve manteiga lavadas", cat: "Hortifrúti" },
      { nome: "1 maçã com casca picada e suco de 1 limão", cat: "Hortifrúti" },
      { nome: "200ml de água de coco ou água mineral", cat: "Bebidas" },
      { nome: "Folhas de hortelã fresco a gosto", cat: "Hortifrúti" }
    ],
    passos: [
      "Lave muito bem as folhas de couve, a maçã e a hortelã.",
      "Pique a maçã em pedaços pequenos, removendo as sementes.",
      "Coloque todos os ingredientes no liquidificador, inclusive a água de coco gelada.",
      "Bata na potência máxima por 2 minutos até virar uma mistura homogênea e beba sem coar."
    ]
  },
  { 
    nome: "Omelete de Vegetais e Queijo", 
    emoji: "🍳", 
    tags: ["healthy","sem glúten"], 
    regiao: "Nacional",
    ingredientes: ["Hortifrúti","Laticínios & Derivados"],
    produtos: ["ovo","ovos","tomate","cebolinha","queijo","mussarela","minas"],
    tempo: "10 min",
    dificuldade: "Fácil",
    porcoes: 1,
    detalhesIngredientes: [
      { nome: "2 ovos caipiras batidos", cat: "Carnes & Proteínas" },
      { nome: "50g de tomate picado e cebolinha", cat: "Hortifrúti" },
      { nome: "30g de queijo mussarela ou minas ralado", cat: "Laticínios & Derivados" },
      { nome: "Uma pitada de orégano e sal", cat: "Outros" }
    ],
    passos: [
      "Bata os dois ovos vigorosamente em um recipiente até espumar.",
      "Misture o tomate picado, a cebolinha e o queijo ralado com os ovos batidos.",
      "Aqueça uma frigideira antiaderente untada com um pouco de manteiga.",
      "Despeje a omelete, tampe a panela e cozinhe em fogo baixo por 3 minutos de cada lado até dourar."
    ]
  },
  {
    nome: "Bowl de Açaí com Granola",
    emoji: "🍇",
    tags: ["healthy","energia"],
    regiao: "Norte",
    ingredientes: ["Hortifrúti","Mercearia & Enlatados"],
    produtos: ["açaí","banana","granola","mel","frutas"],
    tempo: "10 min",
    dificuldade: "Fácil",
    porcoes: 1,
    detalhesIngredientes: [
      { nome: "200g de polpa de açaí congelada", cat: "Hortifrúti" },
      { nome: "1 banana madura congelada", cat: "Hortifrúti" },
      { nome: "3 colheres de granola crocante", cat: "Mercearia & Enlatados" },
      { nome: "Mel e frutas frescas para decorar", cat: "Outros" }
    ],
    passos: [
      "Bata a polpa de açaí congelada com a banana no liquidificador até ficar cremoso.",
      "Despeje em uma tigela funda.",
      "Cubra com granola, fatias de banana e outras frutas frescas.",
      "Regue com mel a gosto e sirva imediatamente."
    ]
  },
  {
    nome: "Salmão Grelhado com Quinoa",
    emoji: "🐟",
    tags: ["healthy","ômega-3"],
    regiao: "Nacional",
    ingredientes: ["Carnes & Proteínas","Mercearia & Enlatados"],
    produtos: ["salmão","peixe","quinoa","limão","azeite","brócolis"],
    tempo: "25 min",
    dificuldade: "Médio",
    porcoes: 2,
    detalhesIngredientes: [
      { nome: "2 postas de salmão fresco (150g cada)", cat: "Carnes & Proteínas" },
      { nome: "1 xícara de quinoa lavada", cat: "Mercearia & Enlatados" },
      { nome: "Brócolis cozido al dente", cat: "Hortifrúti" },
      { nome: "Azeite, limão, sal e pimenta a gosto", cat: "Outros" }
    ],
    passos: [
      "Tempere o salmão com sal, pimenta e suco de limão. Deixe marinar por 10 minutos.",
      "Cozinhe a quinoa em água fervente por 15 minutos e escorra.",
      "Grelhe o salmão em uma frigideira quente com azeite por 4 minutos de cada lado.",
      "Monte o prato com a quinoa, salmão grelhado e brócolis. Finalize com azeite."
    ]
  },
  {
    nome: "Tapioca Fit de Frango",
    emoji: "🫓",
    tags: ["healthy","sem glúten"],
    regiao: "Nordeste",
    ingredientes: ["Mercearia & Enlatados","Carnes & Proteínas"],
    produtos: ["tapioca","goma","frango","tomate","alface"],
    tempo: "15 min",
    dificuldade: "Fácil",
    porcoes: 1,
    detalhesIngredientes: [
      { nome: "3 colheres de goma de tapioca hidratada", cat: "Mercearia & Enlatados" },
      { nome: "100g de frango desfiado temperado", cat: "Carnes & Proteínas" },
      { nome: "Tomate picado e folhas de alface", cat: "Hortifrúti" },
      { nome: "Cottage ou requeijão light", cat: "Laticínios & Derivados" }
    ],
    passos: [
      "Aqueça uma frigideira antiaderente em fogo médio.",
      "Peneire a goma de tapioca sobre a frigideira formando um disco uniforme.",
      "Quando a superfície estiver seca, vire e recheie com frango, tomate e alface.",
      "Dobre ao meio e sirva quente."
    ]
  },
  {
    nome: "Salada Caesar Light",
    emoji: "🥬",
    tags: ["healthy","proteico"],
    regiao: "Nacional",
    ingredientes: ["Hortifrúti","Carnes & Proteínas"],
    produtos: ["alface","frango","parmesão","crouton","limão"],
    tempo: "20 min",
    dificuldade: "Fácil",
    porcoes: 2,
    detalhesIngredientes: [
      { nome: "1 pé de alface americana lavado e picado", cat: "Hortifrúti" },
      { nome: "200g de peito de frango grelhado em tiras", cat: "Carnes & Proteínas" },
      { nome: "Queijo parmesão lascado a gosto", cat: "Laticínios & Derivados" },
      { nome: "Molho Caesar light e croutons integrais", cat: "Outros" }
    ],
    passos: [
      "Grelhe o peito de frango temperado e corte em tiras finas.",
      "Em uma saladeira, coloque a alface rasgada em pedaços.",
      "Adicione o frango grelhado por cima e as lascas de parmesão.",
      "Finalize com croutons integrais e regue com o molho Caesar light."
    ]
  }
];

const RECEITAS_FAMOSAS = [
  { 
    nome: "Macarrão à Carbonara", 
    emoji: "🍝", 
    tags: ["popular","italiano"], 
    regiao: "Internacional",
    ingredientes: ["Laticínios & Derivados","Carnes & Proteínas"],
    produtos: ["macarrão","espaguete","bacon","ovo","ovos","queijo","parmesão","pecorino"],
    tempo: "20 min",
    dificuldade: "Médio",
    porcoes: 2,
    detalhesIngredientes: [
      { nome: "200g de espaguete", cat: "Mercearia & Enlatados" },
      { nome: "100g de bacon picado", cat: "Carnes & Proteínas" },
      { nome: "2 gemas de ovo e 1 ovo inteiro", cat: "Carnes & Proteínas" },
      { nome: "50g de queijo pecorino ou parmesão ralado", cat: "Laticínios & Derivados" }
    ],
    passos: [
      "Cozinhe o espaguete em abundante água salgada até ficar al dente.",
      "Enquanto isso, frite o bacon picado em fogo médio até ficar bem dourado e crocante.",
      "Em uma tigela, bata as gemas, o ovo inteiro e o queijo ralado com bastante pimenta-do-reino.",
      "Escorra o macarrão, reservando meia concha da água do cozimento.",
      "Misture o macarrão quente na frigideira do bacon, desligue o fogo, despeje o creme de ovos e misture rápido até ficar cremoso."
    ]
  },
  { 
    nome: "Frango Grelhado com Arroz", 
    emoji: "🍗", 
    tags: ["popular","caseiro"], 
    regiao: "Nacional",
    ingredientes: ["Carnes & Proteínas","Mercearia & Enlatados"],
    produtos: ["frango","peito de frango","arroz","alho","limão","azeite"],
    tempo: "25 min",
    dificuldade: "Fácil",
    porcoes: 2,
    detalhesIngredientes: [
      { nome: "300g de peito de frango em bifes", cat: "Carnes & Proteínas" },
      { nome: "1 xícara de arroz branco ou integral", cat: "Mercearia & Enlatados" },
      { nome: "2 dentes de alho amassados para tempero", cat: "Hortifrúti" },
      { nome: "Sal, limão e azeite a gosto", cat: "Outros" }
    ],
    passos: [
      "Tempere os bifes de frango com o alho amassado, suco de limão e uma pitada de sal.",
      "Em uma panela pequena, prepare o arroz refogando com um dente de alho e sal, e deixe cozinhar.",
      "Grelhe o frango em uma frigideira bem quente com um fio de azeite por 4 minutos de cada lado.",
      "Sirva o frango suculento ao lado do arroz soltinho e salada."
    ]
  },
  { 
    nome: "Pão Caseiro de Liquidificador", 
    emoji: "🍞", 
    tags: ["popular","forno"], 
    regiao: "Nacional",
    ingredientes: ["Padaria & Confeitaria","Laticínios & Derivados"],
    produtos: ["farinha","trigo","leite","ovo","ovos","fermento"],
    tempo: "50 min",
    dificuldade: "Médio",
    porcoes: 6,
    detalhesIngredientes: [
      { nome: "3 xícaras de farinha de trigo", cat: "Mercearia & Enlatados" },
      { nome: "1 xícara de leite integral morno", cat: "Laticínios & Derivados" },
      { nome: "2 ovos médios inteiros", cat: "Carnes & Proteínas" },
      { nome: "1 envelope (10g) de fermento biológico seco", cat: "Outros" }
    ],
    passos: [
      "Bata no liquidificador o leite morno, os ovos, o fermento e o óleo por 2 minutos.",
      "Despeje em uma vasilha e adicione a farinha aos poucos, mexendo com uma colher até homogeneizar.",
      "Coloque a massa em uma forma de bolo inglês untada e deixe crescer por 30 minutos.",
      "Leve ao forno pré-aquecido a 180°C por cerca de 30 minutos até dourar a casca."
    ]
  },
  { 
    nome: "Bolo de Cenoura com Chocolate", 
    emoji: "🎂", 
    tags: ["popular","doce"], 
    regiao: "Nacional",
    ingredientes: ["Hortifrúti","Padaria & Confeitaria"],
    produtos: ["cenoura","farinha","açúcar","ovo","ovos","óleo","chocolate","fermento"],
    tempo: "45 min",
    dificuldade: "Médio",
    porcoes: 8,
    detalhesIngredientes: [
      { nome: "3 cenouras médias picadas", cat: "Hortifrúti" },
      { nome: "2 xícaras de farinha e 1 xícara de açúcar", cat: "Mercearia & Enlatados" },
      { nome: "3 ovos e 1/2 xícara de óleo de soja", cat: "Carnes & Proteínas" },
      { nome: "1 colher de fermento químico e chocolate em pó", cat: "Outros" }
    ],
    passos: [
      "Bata no liquidificador as cenouras, os ovos e o óleo até obter um creme liso.",
      "Transfira para uma tigela grande e incorpore a farinha e o açúcar peneirados.",
      "Misture o fermento delicadamente e asse em forno médio (180°C) por 35 minutos.",
      "Faça uma calda com chocolate em pó, leite e açúcar no fogo e jogue sobre o bolo quente."
    ]
  },
  { 
    nome: "Caldo Verde Tradicional", 
    emoji: "🍵", 
    tags: ["popular","inverno"], 
    regiao: "Sul",
    ingredientes: ["Hortifrúti","Carnes & Proteínas"],
    produtos: ["batata","couve","linguiça","calabresa","paio","água"],
    tempo: "30 min",
    dificuldade: "Fácil",
    porcoes: 3,
    detalhesIngredientes: [
      { nome: "4 batatas médias descascadas em rodelas", cat: "Hortifrúti" },
      { nome: "1 maço de couve fatiada bem fininha", cat: "Hortifrúti" },
      { nome: "1 gomo de linguiça calabresa ou paio fatiado", cat: "Carnes & Proteínas" },
      { nome: "1 litro de água para o cozimento", cat: "Bebidas" }
    ],
    passos: [
      "Cozinhe as batatas na água salgada até ficarem extremamente macias.",
      "Bata as batatas cozidas com a própria água no liquidificador até virar um creme homogêneo.",
      "Frite a calabresa fatiada em uma panela e adicione o creme de batatas batido.",
      "Quando ferver, adicione a couve bem fininha, deixe cozinhar por 3 minutos e finalize com azeite."
    ]
  },
  { 
    nome: "Coxinha de Frango Prática", 
    emoji: "🍗", 
    tags: ["popular","salgadinho"], 
    regiao: "Sudeste",
    ingredientes: ["Carnes & Proteínas","Padaria & Confeitaria"],
    produtos: ["frango","peito de frango","farinha","trigo","ovo","farinha de rosca"],
    tempo: "40 min",
    dificuldade: "Difícil",
    porcoes: 6,
    detalhesIngredientes: [
      { nome: "3 xícaras de farinha de trigo", cat: "Mercearia & Enlatados" },
      { nome: "2 xícaras de caldo de cozimento do frango", cat: "Outros" },
      { nome: "250g de peito de frango cozido, desfiado e refogado", cat: "Carnes & Proteínas" },
      { nome: "Farinha de rosca e 1 ovo batido para empanar", cat: "Padaria & Confeitaria" }
    ],
    passos: [
      "Ferva o caldo de frango com manteiga e sal, jogue a farinha de uma vez e mexa até desgrudar da panela.",
      "Sove a massa morna até ficar lisa.",
      "Abra pequenas porções da massa nas mãos, recheie com o frango desfiado tempo e molde em formato de coxinha.",
      "Passe no ovo batido, na farinha de rosca e frite em óleo quente até dourar."
    ]
  },
  { 
    nome: "Brigadeiro Gourmet Caseiro", 
    emoji: "🍫", 
    tags: ["popular","doce"], 
    regiao: "Nacional",
    ingredientes: ["Laticínios & Derivados"],
    produtos: ["leite condensado","chocolate","manteiga","granulado"],
    tempo: "15 min",
    dificuldade: "Fácil",
    porcoes: 4,
    detalhesIngredientes: [
      { nome: "1 lata de leite condensado integral", cat: "Laticínios & Derivados" },
      { nome: "3 colheres de chocolate em pó 50%", cat: "Outros" },
      { nome: "1 colher de manteiga sem sal", cat: "Laticínios & Derivados" },
      { nome: "Granulado de chocolate de qualidade para enrolar", cat: "Padaria & Confeitaria" }
    ],
    passos: [
      "Em uma panela de fundo grosso, junte o leite condensado, o chocolate em pó e a manteiga.",
      "Leve ao fogo baixo mexendo sempre sem parar para não grudar no fundo.",
      "Cozinhe até a massa desgrudar totalmente do fundo da panela (ponto de enrolar).",
      "Deixe esfriar em um prato untado com manteiga, faça bolinhas e passe no granulado."
    ]
  },
  { 
    nome: "Feijão Tropeiro Mineiro", 
    emoji: "🫘", 
    tags: ["popular","mineiro"], 
    regiao: "Sudeste",
    ingredientes: ["Mercearia & Enlatados","Carnes & Proteínas"],
    produtos: ["feijão","bacon","calabresa","farinha de mandioca","ovo","ovos","couve"],
    tempo: "30 min",
    dificuldade: "Médio",
    porcoes: 4,
    detalhesIngredientes: [
      { nome: "2 xícaras de feijão cozido escorrido", cat: "Mercearia & Enlatados" },
      { nome: "100g de bacon e 100g de calabresa picados", cat: "Carnes & Proteínas" },
      { nome: "1 xícara de farinha de mandioca torrada", cat: "Mercearia & Enlatados" },
      { nome: "2 ovos mexidos e couve cortada fina", cat: "Carnes & Proteínas" }
    ],
    passos: [
      "Frite o bacon e a calabresa até dourarem na panela e reserve.",
      "Na gordura que restou, doure a cebola e o alho picados.",
      "Adicione o feijão cozido sem caldo e misture bem.",
      "Incorpore a farinha de mandioca aos poucos, acrescente os ovos mexidos, a calabresa, o bacon e a couve, mexendo até aquecer tudo."
    ]
  },
  {
    nome: "Feijoada Completa",
    emoji: "🍖",
    tags: ["popular","tradicional"],
    regiao: "Sudeste",
    ingredientes: ["Mercearia & Enlatados","Carnes & Proteínas"],
    produtos: ["feijão preto","feijão","linguiça","paio","carne seca","costela","bacon","arroz"],
    tempo: "3h",
    dificuldade: "Difícil",
    porcoes: 8,
    detalhesIngredientes: [
      { nome: "500g de feijão preto (demolhado de véspera)", cat: "Mercearia & Enlatados" },
      { nome: "200g de carne seca dessalgada + 200g de costelinha", cat: "Carnes & Proteínas" },
      { nome: "1 linguiça calabresa e 1 paio inteiros", cat: "Carnes & Proteínas" },
      { nome: "100g de bacon defumado em cubos", cat: "Carnes & Proteínas" }
    ],
    passos: [
      "Deixe o feijão de molho por 8 horas. Escorra e cozinhe em panela de pressão por 25 min.",
      "Em outra panela, refogue as carnes cortadas com alho, cebola e louro.",
      "Junte tudo com o caldo do feijão e cozinhe em fogo baixo por 1h30 até engrossar.",
      "Sirva com arroz branco, couve refogada, farofa e laranja fatiada."
    ]
  },
  {
    nome: "Acarajé Baiano",
    emoji: "🫓",
    tags: ["popular","baiano"],
    regiao: "Nordeste",
    ingredientes: ["Mercearia & Enlatados","Carnes & Proteínas"],
    produtos: ["feijão fradinho","camarão","cebola","dendê","vatapá","azeite"],
    tempo: "1h",
    dificuldade: "Difícil",
    porcoes: 6,
    detalhesIngredientes: [
      { nome: "500g de feijão fradinho descascado", cat: "Mercearia & Enlatados" },
      { nome: "200g de camarão seco limpo", cat: "Carnes & Proteínas" },
      { nome: "1 cebola grande ralada", cat: "Hortifrúti" },
      { nome: "Azeite de dendê para fritar", cat: "Outros" }
    ],
    passos: [
      "Deixe o feijão fradinho de molho, descasque e triture até obter uma massa lisa.",
      "Tempere com cebola ralada e sal. Bata bastante até a massa ficar aerada.",
      "Modele em bolinhas e frite no azeite de dendê bem quente até dourar.",
      "Abra o acarajé ao meio e recheie com vatapá, caruru e camarão."
    ]
  },
  {
    nome: "Pão de Queijo Mineiro",
    emoji: "🧀",
    tags: ["popular","mineiro"],
    regiao: "Sudeste",
    ingredientes: ["Laticínios & Derivados","Mercearia & Enlatados"],
    produtos: ["polvilho","queijo","leite","ovo","ovos","óleo"],
    tempo: "35 min",
    dificuldade: "Fácil",
    porcoes: 20,
    detalhesIngredientes: [
      { nome: "500g de polvilho azedo", cat: "Mercearia & Enlatados" },
      { nome: "200g de queijo minas meia cura ralado", cat: "Laticínios & Derivados" },
      { nome: "1 xícara de leite + 1/2 xícara de óleo", cat: "Laticínios & Derivados" },
      { nome: "2 ovos inteiros", cat: "Carnes & Proteínas" }
    ],
    passos: [
      "Ferva o leite com o óleo e o sal. Escalde o polvilho com essa mistura quente.",
      "Misture bem e espere esfriar um pouco. Adicione os ovos um a um.",
      "Incorpore o queijo ralado e amasse até ficar homogêneo.",
      "Faça bolinhas e asse em forno a 180°C por 20-25 minutos até dourar."
    ]
  },
  {
    nome: "Tacacá Paraense",
    emoji: "🍲",
    tags: ["popular","amazônico"],
    regiao: "Norte",
    ingredientes: ["Carnes & Proteínas","Mercearia & Enlatados"],
    produtos: ["camarão","tucupi","jambu","goma","tapioca"],
    tempo: "40 min",
    dificuldade: "Médio",
    porcoes: 4,
    detalhesIngredientes: [
      { nome: "1L de tucupi fervido (cuidado com o veneno cru!)", cat: "Outros" },
      { nome: "200g de camarão seco limpo", cat: "Carnes & Proteínas" },
      { nome: "1 maço de jambu lavado e escaldado", cat: "Hortifrúti" },
      { nome: "Goma de tapioca cozida (gelatinosa)", cat: "Mercearia & Enlatados" }
    ],
    passos: [
      "Ferva o tucupi com chicória, alho e sal por pelo menos 20 minutos (ESSENCIAL para remover toxinas).",
      "Escalde o jambu em água fervente por 3 minutos e escorra.",
      "Cozinhe a goma de tapioca em água até ficar translúcida.",
      "Monte em cuias: coloque a goma, camarão e jambu, despeje o tucupi quente por cima."
    ]
  },
  {
    nome: "Churrasco Gaúcho Completo",
    emoji: "🥩",
    tags: ["popular","gaúcho"],
    regiao: "Sul",
    ingredientes: ["Carnes & Proteínas"],
    produtos: ["picanha","costela","linguiça","sal grosso","carne"],
    tempo: "2h",
    dificuldade: "Médio",
    porcoes: 8,
    detalhesIngredientes: [
      { nome: "1kg de picanha com capa de gordura", cat: "Carnes & Proteínas" },
      { nome: "500g de costela bovina em tiras", cat: "Carnes & Proteínas" },
      { nome: "4 linguiças toscanas frescas", cat: "Carnes & Proteínas" },
      { nome: "Sal grosso em abundância", cat: "Outros" }
    ],
    passos: [
      "Tempere todas as carnes generosamente com sal grosso pelo menos 40 minutos antes.",
      "Inicie com a costela na parte alta da grelha (fogo mais brando) por cerca de 1h30.",
      "Coloque a picanha na brasa forte, selando 5 minutos de cada lado para manter o suco.",
      "Asse a linguiça por último, furando levemente para liberar a gordura. Sirva com farofa e vinagrete."
    ]
  }
];

/* ============================================================
   RECEITAS DE FILMES & DESENHOS
   ============================================================ */
const RECEITAS_FILMES_DESENHOS = [
  {
    nome: "Ratatouille (do filme Ratatouille)",
    emoji: "🐀",
    tags: ["filme","disney","francês"],
    regiao: "Internacional",
    ingredientes: ["Hortifrúti"],
    produtos: ["abobrinha","berinjela","tomate","pimentão","cebola","alho","azeite"],
    tempo: "1h",
    dificuldade: "Médio",
    porcoes: 4,
    fonte: "🎬 Ratatouille (2007) - Pixar/Disney",
    detalhesIngredientes: [
      { nome: "1 abobrinha italiana fatiada fina", cat: "Hortifrúti" },
      { nome: "1 berinjela fatiada em rodelas finas", cat: "Hortifrúti" },
      { nome: "3 tomates maduros fatiados", cat: "Hortifrúti" },
      { nome: "Molho de tomate com alho, cebola e ervas de provence", cat: "Outros" }
    ],
    passos: [
      "Prepare o molho refogando cebola, alho e pimentão com tomates triturados e ervas.",
      "Espalhe o molho no fundo de uma travessa refratária.",
      "Alterne as fatias de abobrinha, berinjela e tomate em fileiras sobrepostas.",
      "Regue com azeite, cubra com papel alumínio e asse a 190°C por 45 minutos.",
      "Retire o alumínio nos últimos 10 minutos para dourar. Sirva como no filme do Remy!"
    ]
  },
  {
    nome: "Espaguete com Almôndegas (Dama e Vagabundo)",
    emoji: "🍝",
    tags: ["filme","disney","italiano"],
    regiao: "Internacional",
    ingredientes: ["Carnes & Proteínas","Mercearia & Enlatados"],
    produtos: ["macarrão","espaguete","carne moída","tomate","molho","queijo","parmesão"],
    tempo: "40 min",
    dificuldade: "Médio",
    porcoes: 4,
    fonte: "🎬 A Dama e o Vagabundo (1955) - Disney",
    detalhesIngredientes: [
      { nome: "400g de espaguete", cat: "Mercearia & Enlatados" },
      { nome: "500g de carne moída (mista boi e porco)", cat: "Carnes & Proteínas" },
      { nome: "500ml de molho de tomate caseiro", cat: "Mercearia & Enlatados" },
      { nome: "Queijo parmesão ralado e manjericão fresco", cat: "Laticínios & Derivados" }
    ],
    passos: [
      "Misture a carne moída com ovo, farinha de rosca, alho, sal e salsinha. Forme bolinhas.",
      "Frite as almôndegas em azeite até dourar por todos os lados.",
      "Em uma panela, aqueça o molho de tomate com manjericão e adicione as almôndegas.",
      "Cozinhe o espaguete al dente, escorra e sirva coberto com molho e almôndegas.",
      "Polvilhe parmesão por cima — cena clássica do jantar romântico! 🐕❤️🐕"
    ]
  },
  {
    nome: "Ramen do Naruto (Ichiraku Ramen)",
    emoji: "🍜",
    tags: ["anime","japonês","naruto"],
    regiao: "Internacional",
    ingredientes: ["Carnes & Proteínas","Mercearia & Enlatados"],
    produtos: ["macarrão","lámen","ovo","ovos","carne","porco","cebolinha","nori"],
    tempo: "45 min",
    dificuldade: "Médio",
    porcoes: 2,
    fonte: "🎌 Naruto Shippuden - Ichiraku Ramen",
    detalhesIngredientes: [
      { nome: "200g de macarrão para ramen (ou lámen instantâneo)", cat: "Mercearia & Enlatados" },
      { nome: "200g de barriga de porco fatiada (chashu)", cat: "Carnes & Proteínas" },
      { nome: "2 ovos cozidos mollets (gema cremosa)", cat: "Carnes & Proteínas" },
      { nome: "Cebolinha, nori e caldo dashi/shoyu", cat: "Outros" }
    ],
    passos: [
      "Prepare o caldo fervendo ossos de porco com gengibre, alho e shoyu por 2h (ou use caldo concentrado).",
      "Marine a barriga de porco em shoyu, mirin e açúcar. Asse a 160°C por 1h30, fatie fino.",
      "Cozinhe os ovos por 6 minutos (gema cremosa). Descasque e corte ao meio.",
      "Cozinhe o macarrão separadamente, escorra e coloque nas tigelas.",
      "Despeje o caldo quente, adicione o chashu, ovos, cebolinha e nori. Itadakimasu! 🍥"
    ]
  },
  {
    nome: "Torta de Maçã da Branca de Neve",
    emoji: "🍎",
    tags: ["filme","disney","doce"],
    regiao: "Internacional",
    ingredientes: ["Hortifrúti","Padaria & Confeitaria"],
    produtos: ["maçã","farinha","manteiga","açúcar","canela","limão"],
    tempo: "1h",
    dificuldade: "Médio",
    porcoes: 8,
    fonte: "🎬 Branca de Neve e os Sete Anões (1937) - Disney",
    detalhesIngredientes: [
      { nome: "6 maçãs Fuji descascadas e fatiadas", cat: "Hortifrúti" },
      { nome: "2 xícaras de farinha de trigo + 100g de manteiga", cat: "Padaria & Confeitaria" },
      { nome: "3/4 xícara de açúcar + canela em pó", cat: "Mercearia & Enlatados" },
      { nome: "Suco de 1 limão e 1 pitada de sal", cat: "Outros" }
    ],
    passos: [
      "Prepare a massa misturando farinha, manteiga gelada, açúcar e sal até formar farofas. Adicione água gelada até dar liga.",
      "Forre uma forma de torta com 2/3 da massa e leve à geladeira por 30 min.",
      "Misture as maçãs fatiadas com açúcar, canela e limão para o recheio.",
      "Coloque o recheio na massa e cubra com o restante da massa, fazendo furinhos.",
      "Pincele com ovo batido e asse a 180°C por 40-45 minutos até dourar. Não ofereça para bruxas! 🧙‍♀️"
    ]
  },
  {
    nome: "Waffles do Shrek",
    emoji: "🧇",
    tags: ["filme","dreamworks","café"],
    regiao: "Internacional",
    ingredientes: ["Padaria & Confeitaria","Laticínios & Derivados"],
    produtos: ["farinha","leite","ovo","ovos","manteiga","açúcar","mel","fermento"],
    tempo: "20 min",
    dificuldade: "Fácil",
    porcoes: 4,
    fonte: "🎬 Shrek (2001) - DreamWorks — Receita favorita do Burro",
    detalhesIngredientes: [
      { nome: "2 xícaras de farinha de trigo", cat: "Mercearia & Enlatados" },
      { nome: "1 xícara de leite morno + 2 ovos", cat: "Laticínios & Derivados" },
      { nome: "3 colheres de manteiga derretida", cat: "Laticínios & Derivados" },
      { nome: "2 colheres de açúcar + fermento em pó", cat: "Outros" }
    ],
    passos: [
      "Misture os ingredientes secos (farinha, açúcar, fermento, sal) em uma tigela.",
      "Em outra tigela, bata os ovos com o leite e a manteiga derretida.",
      "Combine as duas misturas mexendo apenas até incorporar (pequenos grumos são OK!).",
      "Aqueça a máquina de waffles e despeje uma concha da massa. Cozinhe até dourar.",
      "Sirva com mel, frutas e manteiga. Como o Burro diria: 'Eu faço waffles!' 🫏"
    ]
  },
  {
    nome: "Arroz de Festa do Kung Fu Panda",
    emoji: "🍚",
    tags: ["filme","dreamworks","chinês"],
    regiao: "Internacional",
    ingredientes: ["Mercearia & Enlatados","Carnes & Proteínas"],
    produtos: ["arroz","ovo","ovos","cebolinha","cenoura","shoyu","molho de soja","óleo"],
    tempo: "15 min",
    dificuldade: "Fácil",
    porcoes: 2,
    fonte: "🎬 Kung Fu Panda (2008) - DreamWorks — Receita secreta do Sr. Ping",
    detalhesIngredientes: [
      { nome: "3 xícaras de arroz cozido (de preferência do dia anterior)", cat: "Mercearia & Enlatados" },
      { nome: "2 ovos batidos", cat: "Carnes & Proteínas" },
      { nome: "Cebolinha, cenoura e ervilhas", cat: "Hortifrúti" },
      { nome: "Molho shoyu e óleo de gergelim", cat: "Outros" }
    ],
    passos: [
      "Aqueça uma wok ou frigideira grande com óleo em fogo alto.",
      "Despeje os ovos batidos e mexa rapidamente até cozinhar em flocos.",
      "Adicione os legumes picados (cenoura e ervilha) e refogue por 2 minutos.",
      "Junte o arroz frio e mexa vigorosamente por 3-4 minutos.",
      "Finalize com shoyu e óleo de gergelim. O ingrediente secreto? Não tem nenhum! 🐼"
    ]
  },
  {
    nome: "Onigiri do Dragon Ball",
    emoji: "🍙",
    tags: ["anime","japonês","dragon ball"],
    regiao: "Internacional",
    ingredientes: ["Mercearia & Enlatados","Carnes & Proteínas"],
    produtos: ["arroz","nori","alga","salmão","atum","sal"],
    tempo: "20 min",
    dificuldade: "Fácil",
    porcoes: 6,
    fonte: "🎌 Dragon Ball — Comida favorita do Goku",
    detalhesIngredientes: [
      { nome: "3 xícaras de arroz japonês cozido e temperado", cat: "Mercearia & Enlatados" },
      { nome: "Recheio: salmão grelhado desfiado ou atum", cat: "Carnes & Proteínas" },
      { nome: "Folhas de nori cortadas em tiras", cat: "Outros" },
      { nome: "Sal e umeboshi (ameixa japonesa) a gosto", cat: "Outros" }
    ],
    passos: [
      "Cozinhe o arroz japonês e deixe esfriar um pouco (deve estar morno e pegajoso).",
      "Molhe as mãos em água salgada para não grudar.",
      "Coloque uma porção de arroz na mão, faça um buraco no centro e adicione o recheio.",
      "Modele em formato triangular apertando levemente e envolva com uma tira de nori.",
      "Perfeito para levar em aventuras como o Goku! 🐉"
    ]
  },
  {
    nome: "Cookies do Bob Esponja",
    emoji: "🍪",
    tags: ["desenho","nickelodeon","doce"],
    regiao: "Internacional",
    ingredientes: ["Padaria & Confeitaria","Laticínios & Derivados"],
    produtos: ["farinha","manteiga","açúcar","chocolate","ovo","ovos","baunilha"],
    tempo: "30 min",
    dificuldade: "Fácil",
    porcoes: 20,
    fonte: "📺 Bob Esponja Calça Quadrada — Biscoitos da Fenda do Biquíni",
    detalhesIngredientes: [
      { nome: "2 xícaras de farinha de trigo", cat: "Mercearia & Enlatados" },
      { nome: "100g de manteiga em temperatura ambiente", cat: "Laticínios & Derivados" },
      { nome: "3/4 xícara de açúcar mascavo + gotas de chocolate", cat: "Padaria & Confeitaria" },
      { nome: "1 ovo + essência de baunilha", cat: "Outros" }
    ],
    passos: [
      "Bata a manteiga com os açúcares até ficar cremoso e fofo.",
      "Adicione o ovo e a baunilha, misture bem.",
      "Incorpore a farinha peneirada com bicarbonato e sal. Adicione as gotas de chocolate.",
      "Faça bolinhas e coloque numa assadeira forrada com papel manteiga (espaçadas).",
      "Asse a 180°C por 10-12 minutos até dourar nas bordas. Eu estou pronto! 🧽"
    ]
  }
];

/* ============================================================
   REGIÕES PARA FILTRO
   ============================================================ */
const REGIOES_BRASIL = [
  { id: "todas", nome: "Todas as Regiões", emoji: "🌎" },
  { id: "Norte", nome: "Norte", emoji: "🌿" },
  { id: "Nordeste", nome: "Nordeste", emoji: "☀️" },
  { id: "Centro-Oeste", nome: "Centro-Oeste", emoji: "🌾" },
  { id: "Sudeste", nome: "Sudeste", emoji: "🏙️" },
  { id: "Sul", nome: "Sul", emoji: "❄️" },
  { id: "Nacional", nome: "Nacional", emoji: "🇧🇷" },
  { id: "Internacional", nome: "Internacional", emoji: "🌍" },
];

// Estado do filtro regional
let _currentRegionFilter = 'todas';


/* ============================================================
   DOM REFERENCES
   ============================================================ */
const productForm    = document.getElementById('add-product-form');
const nameInput      = document.getElementById('prod-name');
const categoryInput  = document.getElementById('prod-category');
const quantityInput  = document.getElementById('prod-quantity');
const expiryInput    = document.getElementById('prod-expiry');
const listCritico    = document.getElementById('list-critico');
const listAlerta     = document.getElementById('list-alerta');
const listSeguro     = document.getElementById('list-seguro');
const countCritico   = document.getElementById('count-critico');
const countAlerta    = document.getElementById('count-alerta');
const countSeguro    = document.getElementById('count-seguro');

const categoryMeta = {
  'Laticínios & Derivados':  { icon: '🥛', label: 'Laticínios' },
  'Carnes & Proteínas':      { icon: '🥩', label: 'Carnes/Frios' },
  'Hortifrúti':              { icon: '🥦', label: 'Hortifrúti' },
  'Padaria & Confeitaria':   { icon: '🍞', label: 'Padaria' },
  'Mercearia & Enlatados':   { icon: '🥫', label: 'Mercearia' },
  'Bebidas':                 { icon: '🥤', label: 'Bebidas' },
  'Limpeza & Higiene':       { icon: '🧼', label: 'Limpeza' },
  'Medicamentos':            { icon: '💊', label: 'Medicamentos' },
  'Outros':                  { icon: '🧩', label: 'Outros' },
};

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadProductsFromAPI();

  productForm.addEventListener('submit', handleFormSubmit);

  [nameInput, categoryInput, quantityInput, expiryInput].forEach(input => {
    if (input) input.addEventListener('input', () => clearInputError(input));
  });

  setupTabs();
  setupRecipeTabs();
  setupVoiceModal();
  setupPhotoModal();
  setupThemeToggle();
});

// Listener acionado quando auth.js injeta um novo usuário
window.addEventListener('user:ready', (e) => {
  console.log('User logado detectado:', e.detail);
  loadProductsFromAPI();
});

/* ============================================================
   API — PRODUTOS
   ============================================================ */
// --- HYBRID DATA LAYER ---
let isUsingLocalFallback = false;

/** Obtém o userId (email) do usuário logado */
function getCurrentUserId() {
  try {
    const stored = localStorage.getItem('foodforlife_user');
    if (stored) {
      const user = JSON.parse(stored);
      return user.email || user.id || null;
    }
  } catch (_) {}
  return null;
}

/** Chave do localStorage específica por usuário */
function getLocalStorageKey() {
  // Agora usa o namespacing definido em auth.js
  if (typeof window.userStorageKey === 'function') {
    return window.userStorageKey('products');
  }
  // Fallback caso auth.js não carregue
  return 'pantryguard_products_guest';
}

async function loadProductsFromAPI() {
  const userId = getCurrentUserId();
  try {
    const url = userId ? `/api/produtos?userId=${encodeURIComponent(userId)}` : '/api/produtos';
    const res = await fetch(url);
    if (res.ok) {
      products = await res.json();
      isUsingLocalFallback = false;
      render();
      return;
    }
  } catch (e) {
    console.warn('API /api/produtos offline. Usando fallback de localStorage.', e);
  }
  // Fallback to user-specific local storage
  isUsingLocalFallback = true;
  const stored = localStorage.getItem(getLocalStorageKey());
  products = stored ? JSON.parse(stored) : [];
  render();
}

async function saveProductToAPI(product) {
  const userId = getCurrentUserId();
  // Sempre injeta o userId no produto para garantir a posse
  const productWithUser = userId ? { ...product, userId } : product;
  
  const idx = products.findIndex(p => p.id === product.id);
  if (idx !== -1) products[idx] = productWithUser; else products.push(productWithUser);
  
  if (isUsingLocalFallback) {
    localStorage.setItem(getLocalStorageKey(), JSON.stringify(products));
    render();
    return;
  }
  
  try {
    const res = await fetch('/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productWithUser),
    });
    if (res.ok) {
      const saved = await res.json();
      const savedIdx = products.findIndex(p => p.id === saved.id);
      if (savedIdx !== -1) products[savedIdx] = saved;
      render();
    } else {
      console.error('Erro ao salvar produto na API, salvando localmente:', res.status);
      localStorage.setItem(getLocalStorageKey(), JSON.stringify(products));
    }
  } catch (e) {
    console.error('Erro de rede ao salvar produto, salvando localmente:', e);
    localStorage.setItem(getLocalStorageKey(), JSON.stringify(products));
  }
}

async function deleteProductFromAPI(id) {
  const userId = getCurrentUserId();
  products = products.filter(p => p.id !== id);
  if (isUsingLocalFallback) {
    localStorage.setItem(getLocalStorageKey(), JSON.stringify(products));
    render();
    return;
  }
  
  try {
    const url = userId
      ? `/api/produtos/${id}?userId=${encodeURIComponent(userId)}`
      : `/api/produtos/${id}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) {
      console.error('Erro ao excluir produto na API, salvando localmente.');
      localStorage.setItem(getLocalStorageKey(), JSON.stringify(products));
    }
  } catch (e) {
    console.error('Erro ao excluir produto, salvando localmente:', e);
    localStorage.setItem(getLocalStorageKey(), JSON.stringify(products));
  }
}

async function toggleFavorite(productId) {
  const idx = products.findIndex(p => p.id === productId);
  if (idx === -1) return;
  const updated = { ...products[idx], favorito: !products[idx].favorito };
  await saveProductToAPI(updated);
}

// Handles star click with pop animation (optimistic UI) before saving
window.handleStarClick = function(btn, productId) {
  // Play pop animation immediately
  const icon = btn.querySelector('i');
  if (icon) {
    icon.classList.remove('pop'); // reset if already animating
    // Force reflow to restart animation
    void icon.offsetWidth;
    icon.classList.add('pop');
    icon.addEventListener('animationend', () => icon.classList.remove('pop'), { once: true });
  }
  toggleFavorite(productId);
};

/* ============================================================
   VALIDAÇÃO E FORM SUBMIT
   ============================================================ */
function showInputError(el, errorId) {
  el.classList.add('is-invalid');
  const span = document.getElementById(errorId);
  if (span) span.style.display = 'block';
}

function clearInputError(el) {
  el.classList.remove('is-invalid');
  const idMap = { 'prod-name': 'name-error', 'prod-category': 'category-error', 'prod-quantity': 'quantity-error', 'prod-expiry': 'expiry-error' };
  const span = document.getElementById(idMap[el.id]);
  if (span) span.style.display = 'none';
}

function clearAllErrors() {
  [nameInput, categoryInput, quantityInput, expiryInput].forEach(clearInputError);
}

function handleFormSubmit(e) {
  e.preventDefault();
  clearAllErrors();
  let valid = true;
  if (!nameInput.value.trim())                              { showInputError(nameInput,     'name-error');     valid = false; }
  if (!categoryInput.value)                                 { showInputError(categoryInput, 'category-error'); valid = false; }
  const qty = parseInt(quantityInput.value, 10);
  if (isNaN(qty) || qty < 1)                               { showInputError(quantityInput, 'quantity-error'); valid = false; }
  if (!expiryInput.value)                                   { showInputError(expiryInput,   'expiry-error');   valid = false; }
  if (!valid) return;

  const newProduct = {
    id: 'prod_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36),
    nome: nameInput.value.trim(),
    categoria: categoryInput.value,
    quantidade: qty,
    data_validade: expiryInput.value,
    criado_em: new Date().toISOString(),
    favorito: false,
  };
  saveProductToAPI(newProduct);
  productForm.reset();
}

/* ============================================================
   RENDERIZAÇÃO
   ============================================================ */
function calculateDaysRemaining(dateStr) {
  const expiry = new Date(dateStr + 'T00:00:00');
  const today  = new Date(); today.setHours(0,0,0,0);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function render() {
  listCritico.innerHTML = ''; listAlerta.innerHTML = ''; listSeguro.innerHTML = '';
  let crit = 0, alr = 0, seg = 0, total = 0, fav = 0;

  const sorted = [...products].sort((a, b) => new Date(a.data_validade) - new Date(b.data_validade));

  sorted.forEach(product => {
    const days = calculateDaysRemaining(product.data_validade);
    const card = buildCard(product, days);
    total += product.quantidade;
    if (product.favorito) fav++;
    if      (days <= 3)  { listCritico.appendChild(card); crit++; }
    else if (days <= 7)  { listAlerta.appendChild(card);  alr++;  }
    else                 { listSeguro.appendChild(card);  seg++;  }
  });

  renderEmpty(listCritico, 'smile',         'Nenhum item crítico!');
  renderEmpty(listAlerta,  'info',          'Sem alertas nos próximos 7 dias.');
  renderEmpty(listSeguro,  'package-check', 'Nenhum produto seguro cadastrado.');

  countCritico.textContent = crit; countAlerta.textContent = alr; countSeguro.textContent = seg;

  const sv = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  sv('stat-total-val', total); sv('stat-critico-val', crit); sv('stat-alerta-val', alr); sv('stat-seguro-val', seg); sv('stat-fav-val', fav);

  if (window.lucide) lucide.createIcons();
  renderRecipes();
}

function renderEmpty(container, icon, msg) {
  if (container.children.length === 0) {
    const d = document.createElement('div');
    d.className = 'empty-state';
    d.innerHTML = `<i data-lucide="${icon}"></i><p>${msg}</p>`;
    container.appendChild(d);
  }
}

function buildCard(product, days) {
  const el = document.createElement('div');
  el.className = product.favorito ? 'product-card is-favorited' : 'product-card';
  el.dataset.id = product.id;

  let daysText = '';
  if      (days < 0)  daysText = `Vencido há ${Math.abs(days)} ${Math.abs(days)===1?'dia':'dias'}!`;
  else if (days === 0) daysText = 'Vence hoje! ⚠️';
  else if (days === 1) daysText = 'Vence amanhã!';
  else                 daysText = `Vence em ${days} dias`;

  const catInfo = categoryMeta[product.categoria] || { icon: '🧩', label: product.categoria };
  const isFav   = product.favorito;

  el.innerHTML = `
    <div class="product-header">
      <span class="product-category-tag">${catInfo.icon} ${catInfo.label}</span>
      <div class="product-header-actions">
        <button class="btn-star ${isFav ? 'favorited' : ''}" onclick="handleStarClick(this, '${product.id}')" title="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}" aria-label="favoritar">
          <i data-lucide="star"></i>
        </button>
        <button class="product-delete-btn" onclick="animateAndDelete('${product.id}')" title="Excluir produto">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    </div>
    <h3 class="product-title">
      ${product.nome}
      ${isFav ? '<span class="fav-badge" aria-hidden="true">★</span>' : ''}
    </h3>
    <div class="product-date-info">
      <i data-lucide="calendar"></i>
      <span>Validade: <strong>${formatDate(product.data_validade)}</strong></span>
    </div>
    <div class="days-badge">${daysText}</div>
    <div class="product-actions">
      <div class="qty-control">
        <button class="qty-btn" onclick="decreaseQuantity('${product.id}')" title="Diminuir"><i data-lucide="minus"></i></button>
        <span class="qty-val">${product.quantidade}x</span>
        <button class="qty-btn" onclick="increaseQuantity('${product.id}')" title="Aumentar"><i data-lucide="plus"></i></button>
      </div>
    </div>
  `;
  return el;
}

/* ============================================================
   QUANTIDADE E EXCLUSÃO
   ============================================================ */
window.decreaseQuantity = function(id) {
  const p = products.find(p => p.id === id); if (!p) return;
  if (p.quantidade > 1) saveProductToAPI({ ...p, quantidade: p.quantidade - 1 });
  else animateAndDelete(id);
};

window.increaseQuantity = function(id) {
  const p = products.find(p => p.id === id); if (!p) return;
  saveProductToAPI({ ...p, quantidade: p.quantidade + 1 });
};

window.animateAndDelete = function(id) {
  const card = document.querySelector(`.product-card[data-id="${id}"]`);
  if (card) { card.classList.add('card-fade-out'); setTimeout(() => deleteProductFromAPI(id), 250); }
  else deleteProductFromAPI(id);
};

window.toggleFavorite = toggleFavorite;

/* ============================================================
   TABS NAVIGATION
   ============================================================ */
function setupTabs() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('content-' + tab.dataset.tab);
      if (target) target.classList.add('active');
      if (tab.dataset.tab === 'receitas') renderRecipes();
    });
  });
}

/* ============================================================
   RECIPES HUB
   ============================================================ */
function setupRecipeTabs() {
  document.querySelectorAll('.recipe-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.recipe-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.recipe-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      const sec = document.getElementById('rsec-' + btn.dataset.rtab);
      if (sec) sec.classList.add('active');
    });
  });

  // Fechar o modal de detalhes de receita
  const recipeOverlay = document.getElementById('recipe-modal-overlay');
  const btnCloseRecipe = document.getElementById('btn-close-recipe');
  if (recipeOverlay && btnCloseRecipe) {
    const closeRecipeModal = () => { recipeOverlay.classList.remove('open'); };
    btnCloseRecipe.addEventListener('click', closeRecipeModal);
    recipeOverlay.addEventListener('click', (e) => {
      if (e.target === recipeOverlay) closeRecipeModal();
    });
  }
}

/**
 * Verifica se um produto favoritado faz match com alguma keyword da receita.
 * Compara o nome do produto (normalizado) com cada item do array `produtos` da receita.
 */
function productMatchesRecipe(productName, recipe) {
  if (!recipe.produtos || !recipe.produtos.length) return false;
  const norm = productName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return recipe.produtos.some(keyword => {
    const kw = keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return norm.includes(kw) || kw.includes(norm);
  });
}

function renderRecipes() {
  const favProducts = products.filter(p => p.favorito);
  const favProductNames = favProducts.map(p => p.nome);
  const allCategories  = [...new Set(products.map(p => p.categoria))];

  // Helper: filtro de região
  function applyRegionFilter(list) {
    if (_currentRegionFilter === 'todas') return list;
    return list.filter(r => r.regiao === _currentRegionFilter);
  }

  // Receitas com Favoritos
  const gridFav = document.getElementById('grid-favoritos');
  if (gridFav) {
    if (favProducts.length === 0) {
      gridFav.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i data-lucide="star"></i><p>Favorita produtos para ver receitas personalizadas aqui!</p></div>`;
    } else {
      const allRecipes = [...RECEITAS_SAUDAVEIS, ...RECEITAS_FAMOSAS, ...RECEITAS_FILMES_DESENHOS];
      const matches = applyRegionFilter(allRecipes.filter(r =>
        favProductNames.some(prodName => productMatchesRecipe(prodName, r))
      ));
      if (matches.length === 0) {
        gridFav.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i data-lucide="search"></i><p>Nenhuma receita encontrada com seus produtos favoritados. Tente favoritar outros itens!</p></div>`;
      } else {
        gridFav.innerHTML = matches.map(r => recipeCardHTML(r, allCategories, 'match', favProductNames)).join('');
      }
    }
  }

  // Receitas Saudáveis
  const gridSau = document.getElementById('grid-saudaveis');
  if (gridSau) {
    const filtered = applyRegionFilter(RECEITAS_SAUDAVEIS);
    if (filtered.length === 0) {
      gridSau.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i data-lucide="filter-x"></i><p>Nenhuma receita saudável para esta região.</p></div>`;
    } else {
      gridSau.innerHTML = filtered.map(r => recipeCardHTML(r, allCategories, 'healthy')).join('');
    }
  }

  // Receitas Famosas
  const gridFam = document.getElementById('grid-famosas');
  if (gridFam) {
    const filtered = applyRegionFilter(RECEITAS_FAMOSAS);
    if (filtered.length === 0) {
      gridFam.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i data-lucide="filter-x"></i><p>Nenhuma receita famosa para esta região.</p></div>`;
    } else {
      gridFam.innerHTML = filtered.map(r => recipeCardHTML(r, allCategories, 'popular')).join('');
    }
  }

  // Receitas de Filmes & Desenhos
  const gridFilmes = document.getElementById('grid-filmes');
  if (gridFilmes) {
    const filtered = applyRegionFilter(RECEITAS_FILMES_DESENHOS);
    if (filtered.length === 0) {
      gridFilmes.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i data-lucide="filter-x"></i><p>Nenhuma receita de filme para esta região.</p></div>`;
    } else {
      gridFilmes.innerHTML = filtered.map(r => recipeCardHTML(r, allCategories, 'filme')).join('');
    }
  }

  // Render filtro regional
  renderRegionFilter();

  if (window.lucide) lucide.createIcons();
}

function renderRegionFilter() {
  const container = document.getElementById('region-filter-container');
  if (!container) return;
  container.innerHTML = REGIOES_BRASIL.map(r => `
    <button class="region-filter-btn ${_currentRegionFilter === r.id ? 'active' : ''}" 
            onclick="setRegionFilter('${r.id}')" 
            title="Filtrar por ${r.nome}">
      ${r.emoji} ${r.nome}
    </button>
  `).join('');
}

window.setRegionFilter = function(regionId) {
  _currentRegionFilter = regionId;
  renderRecipes();
};


function recipeCardHTML(r, userCategories, tagClass, favProductNames) {
  const hasIngredients = r.ingredientes && r.ingredientes.some(i => userCategories.includes(i));
  let matchedProducts = [];
  if (favProductNames && favProductNames.length > 0) {
    matchedProducts = favProductNames.filter(pn => productMatchesRecipe(pn, r));
  }
  const regionBadge = r.regiao ? `<span class="recipe-tag region-tag">${r.regiao}</span>` : '';
  const fonteBadge = r.fonte ? `<span class="recipe-tag fonte-tag">${r.fonte}</span>` : '';
  const tagHTML = [
    ...r.tags.map(t => `<span class="recipe-tag ${tagClass}">${t}</span>`),
    regionBadge,
    fonteBadge,
    hasIngredients ? `<span class="recipe-tag match">📦 tenho ingredientes</span>` : '',
    ...matchedProducts.map(pn => `<span class="recipe-tag match">⭐ ${pn}</span>`)
  ].join('');
  return `
    <div class="recipe-card" onclick="openRecipeDetails('${r.nome.replace(/'/g, "\\'")}')">  
      <div class="recipe-img">${r.emoji}</div>
      <div class="recipe-body">
        <div class="recipe-name">${r.nome}</div>
        <div class="recipe-tags">${tagHTML}</div>
      </div>
    </div>
  `;
}


window.openRecipeDetails = function(name) {
  const allRecipes = [...RECEITAS_SAUDAVEIS, ...RECEITAS_FAMOSAS, ...RECEITAS_FILMES_DESENHOS];
  const recipe = allRecipes.find(r => r.nome === name);
  if (!recipe) return;

  const overlay = document.getElementById('recipe-modal-overlay');
  const emojiEl = document.getElementById('recipe-detail-emoji');
  const titleEl = document.getElementById('recipe-modal-title');
  const timeEl = document.getElementById('recipe-detail-time');
  const diffEl = document.getElementById('recipe-detail-diff');
  const ingredientsList = document.getElementById('recipe-ingredients-list');
  const stepsList = document.getElementById('recipe-steps-list');

  if (overlay) {
    overlay.classList.add('open');
    if (emojiEl) emojiEl.textContent = recipe.emoji;
    if (titleEl) titleEl.textContent = recipe.nome;
    if (timeEl) timeEl.innerHTML = `<i data-lucide="clock" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> ${recipe.tempo || '20 min'}`;
    if (diffEl) diffEl.innerHTML = `<i data-lucide="smile" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:2px;margin-left:6px;"></i> ${recipe.dificuldade || 'Fácil'} | <i data-lucide="users" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:2px;margin-left:6px;"></i> ${recipe.porcoes || 2} porções`;

    // Fonte (filmes/desenhos)
    const fonteEl = document.getElementById('recipe-detail-fonte');
    if (fonteEl) {
      if (recipe.fonte) {
        fonteEl.textContent = recipe.fonte;
        fonteEl.style.display = 'block';
      } else {
        fonteEl.style.display = 'none';
      }
    }

    if (ingredientsList) {
      ingredientsList.innerHTML = '';
      if (recipe.detalhesIngredientes) {
        recipe.detalhesIngredientes.forEach(ing => {
          const li = document.createElement('li');
          // Check if category has any products in user's pantry
          const inStock = products.some(p => p.categoria === ing.cat && p.quantidade > 0);
          li.className = inStock ? 'available' : 'missing';
          
          // Get specific products in stock for this category to show as help text
          const matchingProducts = products.filter(p => p.categoria === ing.cat && p.quantidade > 0);
          const helpText = matchingProducts.length > 0 ? ` (${matchingProducts.map(p => p.nome).join(', ')})` : '';
          
          li.innerHTML = `<span><strong>${ing.nome}</strong><br><small style="color:var(--text-secondary);font-size:0.75rem;">(Categoria: ${ing.cat})${helpText}</small></span>`;
          ingredientsList.appendChild(li);
        });
      }
    }

    // Render steps
    if (stepsList) {
      stepsList.innerHTML = '';
      if (recipe.passos) {
        recipe.passos.forEach(step => {
          const li = document.createElement('li');
          li.textContent = step;
          stepsList.appendChild(li);
        });
      }
    }

    if (window.lucide) lucide.createIcons();
  }
};

/* ============================================================
   VOICE (WEB SPEECH API) — com timeout de 30s e botão parar
   ============================================================ */
function setupVoiceModal() {
  const overlay    = document.getElementById('voice-modal-overlay');
  const btnOpen    = document.getElementById('btn-open-voice');
  const btnClose   = document.getElementById('btn-close-voice');
  const btnStart   = document.getElementById('btn-start-voice');
  const btnStop    = document.getElementById('btn-stop-voice');
  const statusDiv  = document.getElementById('voice-status');
  const transcript = document.getElementById('voice-transcript');
  const timerEl    = document.getElementById('voice-timer');

  let recognitionInstance = null;
  let voiceTimeout = null;
  let timerInterval = null;
  const MAX_VOICE_SECONDS = 30; // 30 segundos máximo

  function stopRecognition(reason) {
    if (recognitionInstance) {
      try { recognitionInstance.stop(); } catch(e) {}
      recognitionInstance = null;
    }
    clearTimeout(voiceTimeout);
    clearInterval(timerInterval);
    if (btnStart) { btnStart.disabled = false; btnStart.style.display = 'flex'; }
    if (btnStop)  btnStop.style.display = 'none';
    if (timerEl)  timerEl.style.display = 'none';
    if (reason === 'timeout') {
      if (transcript) transcript.innerHTML = '<span style="color:var(--alerta)">⏱️ Tempo esgotado. Nenhum comando detectado.</span>';
      setTimeout(() => { statusDiv.classList.remove('active'); }, 2000);
    }
  }

  if (btnOpen)  btnOpen.addEventListener('click', () => { overlay.classList.add('open'); if(window.lucide) lucide.createIcons(); });
  if (btnClose) btnClose.addEventListener('click', () => { overlay.classList.remove('open'); statusDiv.classList.remove('active'); stopRecognition('close'); });
  if (btnStop)  btnStop.addEventListener('click', () => { stopRecognition('manual'); statusDiv.classList.remove('active'); });

  // Exemplo clicável para teste imediato
  const voiceExample = document.querySelector('.voice-example');
  if (voiceExample) {
    voiceExample.style.cursor = 'pointer';
    voiceExample.style.transition = 'background-color 0.2s';
    voiceExample.addEventListener('mouseenter', () => { voiceExample.style.background = 'rgba(124, 58, 237, 0.15)'; });
    voiceExample.addEventListener('mouseleave', () => { voiceExample.style.background = 'rgba(124, 58, 237, 0.08)'; });
    voiceExample.title = 'Clique para simular este comando de exemplo!';
    voiceExample.addEventListener('click', () => {
      const demoText = "Cadastrar Leite Integral, três unidades, categoria laticínios, validade dez de julho";
      statusDiv.classList.add('active');
      transcript.innerHTML = `<span style="color:var(--primary)">[Simulação]</span> "${demoText}"`;
      parseVoiceCommand(demoText);
      setTimeout(() => {
        statusDiv.classList.remove('active');
        overlay.classList.remove('open');
      }, 2000);
    });
  }

  if (!btnStart) return;
  btnStart.addEventListener('click', () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('Seu navegador não suporta reconhecimento de voz. Tente o Google Chrome.'); return; }

    statusDiv.classList.add('active');
    transcript.textContent = 'Ouvindo... Fale agora!';
    btnStart.disabled = true;
    btnStart.style.display = 'none';
    if (btnStop) btnStop.style.display = 'flex';

    // Timer visual — conta regressiva de 30s
    let secondsLeft = MAX_VOICE_SECONDS;
    if (timerEl) {
      timerEl.style.display = 'flex';
      timerEl.textContent = `⏱️ ${secondsLeft}s`;
      timerInterval = setInterval(() => {
        secondsLeft--;
        if (timerEl) timerEl.textContent = `⏱️ ${secondsLeft}s`;
        if (secondsLeft <= 5 && timerEl) timerEl.style.color = 'var(--critico)';
        if (secondsLeft <= 0) clearInterval(timerInterval);
      }, 1000);
    }

    recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'pt-BR';
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;

    // Timeout máximo de 30 segundos
    voiceTimeout = setTimeout(() => {
      stopRecognition('timeout');
    }, MAX_VOICE_SECONDS * 1000);

    recognitionInstance.onresult = (event) => {
      const text = event.results[0][0].transcript;
      transcript.textContent = `"${text}"`;
      if (event.results[0].isFinal) {
        clearTimeout(voiceTimeout);
        parseVoiceCommand(text);
        stopRecognition('done');
        setTimeout(() => { statusDiv.classList.remove('active'); overlay.classList.remove('open'); }, 1500);
      }
    };

    recognitionInstance.onerror = (event) => {
      transcript.textContent = `Erro: ${event.error}. Tente novamente.`;
      stopRecognition('error');
    };

    recognitionInstance.onend = () => {
      // Só fecha se não foi timeout e ainda não processou
      if (recognitionInstance) {
        stopRecognition('end');
        setTimeout(() => { statusDiv.classList.remove('active'); overlay.classList.remove('open'); }, 1500);
      }
    };

    recognitionInstance.start();
  });
}


function pulseInput(inputEl) {
  if (!inputEl) return;
  inputEl.classList.remove('pulse-input-confirm');
  void inputEl.offsetWidth; // Trigger reflow
  inputEl.classList.add('pulse-input-confirm');
  setTimeout(() => inputEl.classList.remove('pulse-input-confirm'), 1500);
}

function parseVoiceCommand(text) {
  const t = text.toLowerCase();

  // Nome: tudo após "cadastrar" ou "adicionar" até a primeira vírgula ou delimitadores
  let nome = '';
  const matchNome = t.match(/(?:cadastrar|adicionar)\s+([^,]+?)(?:,|\s+(?:categoria|validade|vence|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez|\d))/i);
  if (matchNome) {
    nome = capitalize(matchNome[1].trim());
  } else {
    // Fallback: se não achar a palavra cadastrar/adicionar, pega o início até termos comuns
    const matchSimple = t.match(/^([^,]+?)(?:,|\s+(?:categoria|validade|vence|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez|\d))/i);
    if (matchSimple) nome = capitalize(matchSimple[1].trim());
  }

  // Quantidade
  const numWords = { 
    um:1, uma:1, dois:2, duas:2, três:3, tres:3, quatro:4, cinco:5, 
    seis:6, sete:7, oito:8, nove:9, dez:10, onze:11, doze:12, treze:13, 
    quatorze:14, quinze:15, vinte:20, trinta:30 
  };
  let qty = 1;
  const matchQty = t.match(/(\d+|um|uma|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|quinze|vinte|trinta)\s*(?:unidades?|itens?|unidade|item|x)?/i);
  if (matchQty) {
    const val = matchQty[1].toLowerCase();
    qty = numWords[val] !== undefined ? numWords[val] : (parseInt(val, 10) || 1);
  }

  // Categoria inteligente
  const catMap = {
    'latic':  'Laticínios & Derivados', 'leite': 'Laticínios & Derivados', 'queijo':'Laticínios & Derivados', 'iogurte':'Laticínios & Derivados', 'cream':'Laticínios & Derivados', 'requei':'Laticínios & Derivados', 'manteiga':'Laticínios & Derivados',
    'carne':  'Carnes & Proteínas', 'frango':'Carnes & Proteínas', 'peixe':'Carnes & Proteínas', 'presunto':'Carnes & Proteínas', 'salame':'Carnes & Proteínas', 'bacon':'Carnes & Proteínas', 'salsi':'Carnes & Proteínas', 'lingui':'Carnes & Proteínas',
    'horti':  'Hortifrúti', 'fruta':'Hortifrúti', 'legume':'Hortifrúti', 'verdura':'Hortifrúti', 'alface':'Hortifrúti', 'tomate':'Hortifrúti', 'cenoura':'Hortifrúti', 'cebola':'Hortifrúti', 'maçã':'Hortifrúti', 'banana':'Hortifrúti',
    'padaria':'Padaria & Confeitaria', 'pão':'Padaria & Confeitaria', 'bolo':'Padaria & Confeitaria', 'biscoito':'Padaria & Confeitaria', 'bolacha':'Padaria & Confeitaria',
    'mercear':'Mercearia & Enlatados', 'enlatado':'Mercearia & Enlatados', 'arroz':'Mercearia & Enlatados', 'feijão':'Mercearia & Enlatados', 'feijao':'Mercearia & Enlatados', 'óleo':'Mercearia & Enlatados', 'macarrão':'Mercearia & Enlatados',
    'bebida': 'Bebidas', 'suco':'Bebidas', 'água':'Bebidas', 'agua':'Bebidas', 'refrigerante':'Bebidas', 'cerveja':'Bebidas', 'vinho':'Bebidas',
    'limpeza':'Limpeza & Higiene', 'higiene':'Limpeza & Higiene', 'sabão':'Limpeza & Higiene', 'detergente':'Limpeza & Higiene',
    'medicamento':'Medicamentos', 'remédio':'Medicamentos', 'remedio':'Medicamentos', 'comprimido':'Medicamentos',
  };
  let categoria = 'Outros';
  for (const [key, val] of Object.entries(catMap)) {
    if (t.includes(key)) { categoria = val; break; }
  }

  // Validade absoluta
  let dataValidade = '';
  const meses = {
    janeiro:'01', fevereiro:'02', março:'03', marco:'03', abril:'04', maio:'05', junho:'06',
    julho:'07', agosto:'08', setembro:'09', outubro:'10', novembro:'11', dezembro:'12'
  };
  const matchData = t.match(/(?:validade|vence|vencimento).*?(\d+)\s*(?:de\s*)?(janeiro|fevereiro|março|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i);
  if (matchData) {
    const diaVal = matchData[1];
    const mesStr = matchData[2].toLowerCase();
    const mesVal = meses[mesStr];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    
    // Se o dia/mês já passou no ano corrente, assume o próximo ano
    let year = currentYear;
    if (parseInt(mesVal, 10) < currentMonth || (parseInt(mesVal, 10) === currentMonth && parseInt(diaVal, 10) < currentDay)) {
      year = currentYear + 1;
    }
    dataValidade = `${year}-${mesVal}-${String(diaVal).padStart(2,'0')}`;
  }

  // Validade relativa: "em X dias"
  const matchDias = t.match(/(?:validade|vence|vencimento)\s*(?:em|de)?\s*(\d+|um|dois|três|tres|quatro|cinco|seis|sete|oito|nove|dez)\s*dias?/i);
  if (matchDias && !dataValidade) {
    const word = matchDias[1].toLowerCase();
    const n = numWords[word] !== undefined ? numWords[word] : (parseInt(word, 10) || 0);
    const d = new Date(); d.setDate(d.getDate() + n);
    dataValidade = d.toISOString().split('T')[0];
  }
  
  if (t.includes('amanhã') && !dataValidade) {
    const d = new Date(); d.setDate(d.getDate() + 1); 
    dataValidade = d.toISOString().split('T')[0];
  }

  // Preencher campos e animar feedback visual
  if (nome && nameInput) { nameInput.value = nome; pulseInput(nameInput); }
  if (categoryInput) { categoryInput.value = categoria; pulseInput(categoryInput); }
  if (quantityInput) { quantityInput.value = qty; pulseInput(quantityInput); }
  if (dataValidade && expiryInput) { expiryInput.value = dataValidade; pulseInput(expiryInput); }
}

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

/* ============================================================
   PHOTO OCR (Tesseract.js)
   ============================================================ */
function setupPhotoModal() {
  const overlay     = document.getElementById('photo-modal-overlay');
  const btnOpen     = document.getElementById('btn-open-photo');
  const btnClose    = document.getElementById('btn-close-photo');
  const btnConfirm  = document.getElementById('btn-confirm-photo');
  const photoInput  = document.getElementById('photo-input');
  const uploadArea  = document.getElementById('photo-upload-area');
  const preview     = document.getElementById('photo-preview');
  const spinner     = document.getElementById('ocr-spinner');
  const ocrResult   = document.getElementById('ocr-result');
  const btnDemo     = document.getElementById('btn-photo-demo');
  let extractedData = {};

  if (btnOpen)  btnOpen.addEventListener('click',  () => { overlay.classList.add('open'); if(window.lucide) lucide.createIcons(); });
  if (btnClose) btnClose.addEventListener('click', () => { overlay.classList.remove('open'); resetPhotoModal(); });

  if (uploadArea) uploadArea.addEventListener('click', (e) => {
    // Evita abrir upload de arquivo se clicou no botão demo
    if (e.target.closest('#btn-photo-demo')) return;
    if (photoInput) photoInput.click();
  });

  if (btnDemo) {
    btnDemo.addEventListener('click', (e) => {
      e.stopPropagation();
      resetPhotoModal();
      // Mostra uma visualização e inicia simulação
      preview.src = 'dashboard_mockup.png';
      preview.style.display = 'block';
      spinner.style.display = 'flex';
      
      setTimeout(() => {
        spinner.style.display = 'none';
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 15);
        const dateStr = futureDate.toISOString().split('T')[0];
        
        extractedData = {
          nome: "Leite Integral Parmalat",
          categoria: "Laticínios & Derivados",
          quantidade: 2,
          data_validade: dateStr
        };
        
        showOCREditForm();
      }, 1200);
    });
  }

  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        preview.src = ev.target.result;
        preview.style.display = 'block';
        runOCR(ev.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  async function runOCR(imageData) {
    spinner.style.display = 'flex';
    ocrResult.style.display = 'none';
    if (btnConfirm) btnConfirm.style.display = 'none';

    try {
      const { data: { text } } = await Tesseract.recognize(imageData, 'por', { logger: () => {} });
      const parsed = parseOCRText(text);
      extractedData = {
        nome: parsed.nome || '',
        categoria: parsed.categoria || 'Outros',
        quantidade: 1,
        data_validade: parsed.data_validade || ''
      };
      showOCREditForm();
    } catch (err) {
      ocrResult.style.display = 'block';
      ocrResult.textContent = 'Não foi possível analisar a imagem. Tente outra foto com melhor iluminação.';
    }
    spinner.style.display = 'none';
  }

  function showOCREditForm() {
    ocrResult.style.display = 'block';
    ocrResult.innerHTML = `
      <div class="ocr-edit-form">
        <h4 style="margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--primary);">✓ Dados Identificados pelo OCR</h4>
        <div class="form-group">
          <label for="ocr-edit-name">Nome do Produto</label>
          <input type="text" id="ocr-edit-name" value="${extractedData.nome || ''}" required />
        </div>
        <div class="form-row" style="display: grid; grid-template-columns: 1fr 90px; gap: 0.75rem; margin-bottom: 0.5rem;">
          <div class="form-group">
            <label for="ocr-edit-category">Categoria</label>
            <select id="ocr-edit-category">
              <option value="Laticínios & Derivados" ${extractedData.categoria === 'Laticínios & Derivados' ? 'selected' : ''}>🥛 Laticínios</option>
              <option value="Carnes & Proteínas" ${extractedData.categoria === 'Carnes & Proteínas' ? 'selected' : ''}>🥩 Carnes / Frios</option>
              <option value="Hortifrúti" ${extractedData.categoria === 'Hortifrúti' ? 'selected' : ''}>🥦 Hortifrúti</option>
              <option value="Padaria & Confeitaria" ${extractedData.categoria === 'Padaria & Confeitaria' ? 'selected' : ''}>🍞 Padaria</option>
              <option value="Mercearia & Enlatados" ${extractedData.categoria === 'Mercearia & Enlatados' ? 'selected' : ''}>🥫 Mercearia</option>
              <option value="Bebidas" ${extractedData.categoria === 'Bebidas' ? 'selected' : ''}>🥤 Bebidas</option>
              <option value="Limpeza & Higiene" ${extractedData.categoria === 'Limpeza & Higiene' ? 'selected' : ''}>🧼 Limpeza/Higiene</option>
              <option value="Medicamentos" ${extractedData.categoria === 'Medicamentos' ? 'selected' : ''}>💊 Medicamentos</option>
              <option value="Outros" ${extractedData.categoria === 'Outros' ? 'selected' : ''}>🧩 Outros</option>
            </select>
          </div>
          <div class="form-group">
            <label for="ocr-edit-qty">Qtd.</label>
            <input type="number" id="ocr-edit-qty" min="1" value="${extractedData.quantidade || 1}" />
          </div>
        </div>
        <div class="form-group">
          <label for="ocr-edit-expiry">Data de Validade</label>
          <input type="date" id="ocr-edit-expiry" value="${extractedData.data_validade || ''}" required />
        </div>
      </div>
    `;
    if (btnConfirm) btnConfirm.style.display = 'flex';
  }

  function parseOCRText(text) {
    const result = {};
    const t = text.toLowerCase();
    
    // Detectar data de validade (DD/MM/YYYY ou DD/MM/YY)
    const dateMatch = text.match(/\b(\d{2})[\/\-\.](\d{2})[\/\-\.](\d{2,4})\b/);
    if (dateMatch) {
      let year = dateMatch[3]; if (year.length === 2) year = '20' + year;
      result.data_validade = `${year}-${dateMatch[2]}-${dateMatch[1]}`;
    }
    
    // Detectar categoria com base em palavras chave
    const catMap = {
      'leite': 'Laticínios & Derivados', 'queijo': 'Laticínios & Derivados', 'iogurte': 'Laticínios & Derivados',
      'frango': 'Carnes & Proteínas', 'carne': 'Carnes & Proteínas', 'presunto': 'Carnes & Proteínas',
      'pão': 'Padaria & Confeitaria', 'bolo': 'Padaria & Confeitaria', 'biscoito': 'Padaria & Confeitaria',
      'refrigerante': 'Bebidas', 'suco': 'Bebidas', 'cerveja': 'Bebidas',
      'shampoo': 'Limpeza & Higiene', 'sabão': 'Limpeza & Higiene', 'detergente': 'Limpeza & Higiene',
      'paracetamol': 'Medicamentos', 'comprimidos': 'Medicamentos'
    };
    for (const [key, val] of Object.entries(catMap)) {
      if (t.includes(key)) { result.categoria = val; break; }
    }

    // Tentar capturar nome: primeira linha significativa com >3 caracteres
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 3);
    if (lines.length > 0) result.nome = lines[0].substring(0, 50);
    return result;
  }

  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      const editName = document.getElementById('ocr-edit-name');
      const editCategory = document.getElementById('ocr-edit-category');
      const editQty = document.getElementById('ocr-edit-qty');
      const editExpiry = document.getElementById('ocr-edit-expiry');

      if (!editName || !editName.value.trim()) { alert('Preencha o nome do produto.'); return; }
      if (!editExpiry || !editExpiry.value) { alert('Preencha a data de validade.'); return; }

      const newProduct = {
        id: 'prod_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36),
        nome: editName.value.trim(),
        categoria: editCategory ? editCategory.value : 'Outros',
        quantidade: editQty ? parseInt(editQty.value, 10) || 1 : 1,
        data_validade: editExpiry.value,
        criado_em: new Date().toISOString(),
        favorito: false,
      };

      saveProductToAPI(newProduct);
      overlay.classList.remove('open');
      resetPhotoModal();
    });
  }

  function resetPhotoModal() {
    if (preview)    { preview.style.display = 'none'; preview.src = ''; }
    if (ocrResult)  { ocrResult.style.display = 'none'; ocrResult.innerHTML = ''; }
    if (spinner)    spinner.style.display = 'none';
    if (btnConfirm) btnConfirm.style.display = 'none';
    if (photoInput) photoInput.value = '';
    extractedData = {};
  }
}

/* ============================================================
   THEME TOGGLE (LIGHT / DARK MODE)
   ============================================================ */
function setupThemeToggle() {
  // Aplica tema salvo
  const saved = localStorage.getItem('foodforlife_theme') || 'dark';
  applyTheme(saved);

  // Ouve o toggle
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('change', () => {
      const newTheme = toggle.checked ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('foodforlife_theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  const toggle = document.getElementById('theme-toggle');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggle) toggle.checked = true;
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (toggle) toggle.checked = false;
  }
}

// Expõe para ser chamado de fora (ex: auth.js ao mostrar dashboard)
window.applyTheme = applyTheme;
