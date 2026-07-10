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
    ingredientes: ["Hortifrúti","Carnes & Proteínas"],
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
    ingredientes: ["Laticínios & Derivados","Hortifrúti"],
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
    ingredientes: ["Hortifrúti","Mercearia & Enlatados"],
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
    ingredientes: ["Carnes & Proteínas","Padaria & Confeitaria"],
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
    ingredientes: ["Hortifrúti","Bebidas"],
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
    ingredientes: ["Hortifrúti","Laticínios & Derivados"],
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
  }
];

const RECEITAS_FAMOSAS = [
  { 
    nome: "Macarrão à Carbonara", 
    emoji: "🍝", 
    tags: ["popular","italiano"], 
    ingredientes: ["Laticínios & Derivados","Carnes & Proteínas"],
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
    ingredientes: ["Carnes & Proteínas","Mercearia & Enlatados"],
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
    ingredientes: ["Padaria & Confeitaria","Laticínios & Derivados"],
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
    ingredientes: ["Hortifrúti","Padaria & Confeitaria"],
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
    ingredientes: ["Hortifrúti","Carnes & Proteínas"],
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
    ingredientes: ["Carnes & Proteínas","Padaria & Confeitaria"],
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
    ingredientes: ["Laticínios & Derivados"],
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
    ingredientes: ["Mercearia & Enlatados","Carnes & Proteínas"],
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
  }
];

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

function renderRecipes() {
  const favCategories = [...new Set(products.filter(p => p.favorito).map(p => p.categoria))];
  const allCategories  = [...new Set(products.map(p => p.categoria))];

  // Receitas com Favoritos
  const gridFav = document.getElementById('grid-favoritos');
  if (gridFav) {
    if (favCategories.length === 0) {
      gridFav.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i data-lucide="star"></i><p>Favorita produtos para ver receitas personalizadas aqui!</p></div>`;
    } else {
      const matches = [...RECEITAS_SAUDAVEIS, ...RECEITAS_FAMOSAS].filter(r =>
        r.ingredientes.some(i => favCategories.includes(i))
      );
      const list = matches.length ? matches : RECEITAS_FAMOSAS.slice(0, 4);
      gridFav.innerHTML = list.map(r => recipeCardHTML(r, favCategories, 'match')).join('');
    }
  }

  // Receitas Saudáveis
  const gridSau = document.getElementById('grid-saudaveis');
  if (gridSau) {
    gridSau.innerHTML = RECEITAS_SAUDAVEIS.map(r => recipeCardHTML(r, allCategories, 'healthy')).join('');
  }

  // Receitas Famosas
  const gridFam = document.getElementById('grid-famosas');
  if (gridFam) {
    gridFam.innerHTML = RECEITAS_FAMOSAS.map(r => recipeCardHTML(r, allCategories, 'popular')).join('');
  }

  if (window.lucide) lucide.createIcons();
}

function recipeCardHTML(r, userCategories, tagClass) {
  const hasIngredients = r.ingredientes.some(i => userCategories.includes(i));
  const tagHTML = [...r.tags.map(t => `<span class="recipe-tag ${tagClass}">${t}</span>`),
    hasIngredients ? `<span class="recipe-tag match">📦 tenho os ingredientes</span>` : ''
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
  const recipe = [...RECEITAS_SAUDAVEIS, ...RECEITAS_FAMOSAS].find(r => r.nome === name);
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

    // Render ingredients and cross-check pantry stock
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
   VOICE (WEB SPEECH API)
   ============================================================ */
function setupVoiceModal() {
  const overlay   = document.getElementById('voice-modal-overlay');
  const btnOpen   = document.getElementById('btn-open-voice');
  const btnClose  = document.getElementById('btn-close-voice');
  const btnStart  = document.getElementById('btn-start-voice');
  const statusDiv = document.getElementById('voice-status');
  const transcript= document.getElementById('voice-transcript');

  if (btnOpen)  btnOpen.addEventListener('click',  () => { overlay.classList.add('open'); if(window.lucide) lucide.createIcons(); });
  if (btnClose) btnClose.addEventListener('click', () => { overlay.classList.remove('open'); statusDiv.classList.remove('active'); });

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
    transcript.textContent = 'Ouvindo...';
    btnStart.disabled = true;

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      transcript.textContent = `"${text}"`;
      if (event.results[0].isFinal) { 
        parseVoiceCommand(text); 
        recognition.stop(); // Desabilita microfone/para reconhecimento imediatamente após fala
      }
    };

    recognition.onerror = (event) => {
      transcript.textContent = `Erro: ${event.error}. Tente novamente.`;
      btnStart.disabled = false;
      recognition.stop();
    };

    recognition.onend = () => {
      btnStart.disabled = false;
      setTimeout(() => { statusDiv.classList.remove('active'); overlay.classList.remove('open'); }, 1500);
    };

    recognition.start();
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
