/**
 * PantryGuard - Controle de Validade Doméstico
 * Lógica da aplicação frontend usando vanilla JavaScript e localStorage.
 */

// Estado da Aplicação
let products = [];

// Elementos do DOM
const productForm = document.getElementById('add-product-form');
const nameInput = document.getElementById('prod-name');
const categoryInput = document.getElementById('prod-category');
const quantityInput = document.getElementById('prod-quantity');
const expiryInput = document.getElementById('prod-expiry');

// Listas de Destino
const listCritico = document.getElementById('list-critico');
const listAlerta = document.getElementById('list-alerta');
const listSeguro = document.getElementById('list-seguro');

// Elementos de Contagem
const countCritico = document.getElementById('count-critico');
const countAlerta = document.getElementById('count-alerta');
const countSeguro = document.getElementById('count-seguro');

// Elementos do Dashboard de Estatísticas
const statTotalVal = document.getElementById('stat-total-val');
const statCriticoVal = document.getElementById('stat-critico-val');
const statAlertaVal = document.getElementById('stat-alerta-val');
const statSeguroVal = document.getElementById('stat-seguro-val');

// Dicionário de Ícones e Emojis para categorias
const categoryMeta = {
  'Laticínios & Derivados': { icon: '🥛', label: 'Laticínios' },
  'Carnes & Proteínas': { icon: '🥩', label: 'Carnes / Frios' },
  'Hortifrúti': { icon: '🥦', label: 'Hortifrúti' },
  'Padaria & Confeitaria': { icon: '🍞', label: 'Padaria' },
  'Mercearia & Enlatados': { icon: '🥫', label: 'Mercearia' },
  'Bebidas': { icon: '🥤', label: 'Bebidas' },
  'Limpeza & Higiene': { icon: '🧼', label: 'Limpeza/Higiene' },
  'Medicamentos': { icon: '💊', label: 'Medicamentos' },
  'Outros': { icon: '🧩', label: 'Outros' }
};

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
  // Carrega produtos do localStorage
  loadProducts();
  
  // Define a data mínima do calendário como hoje para facilitar,
  // mas permite datas retroativas (pois o item pode já estar vencido no cadastro)
  // Configura Ouvintes de Eventos
  productForm.addEventListener('submit', handleFormSubmit);
  
  // Ouvintes para limpar erros ao digitar/mudar campos
  [nameInput, categoryInput, quantityInput, expiryInput].forEach(input => {
    input.addEventListener('input', () => clearInputError(input));
  });
});

// --- LÓGICA DE PERSISTÊNCIA (localStorage) ---
function loadProducts() {
  const stored = localStorage.getItem('pantryguard_products');
  if (stored) {
    try {
      products = JSON.parse(stored);
    } catch (e) {
      console.error("Erro ao ler dados do localStorage:", e);
      products = [];
    }
  } else {
    products = [];
  }
  render();
}

function saveProducts() {
  localStorage.setItem('pantryguard_products', JSON.stringify(products));
}

// --- CONTROLE DE ERROS DE VALIDAÇÃO ---
function showInputError(inputElement, errorId) {
  inputElement.classList.add('is-invalid');
  const errorSpan = document.getElementById(errorId);
  if (errorSpan) {
    errorSpan.style.display = 'block';
  }
}

function clearInputError(inputElement) {
  inputElement.classList.remove('is-invalid');
  const errorId = inputElement.id.replace('prod-', '') + '-error';
  const errorSpan = document.getElementById(errorId);
  if (errorSpan) {
    errorSpan.style.display = 'none';
  }
}

function clearAllErrors() {
  [nameInput, categoryInput, quantityInput, expiryInput].forEach(input => clearInputError(input));
}

// --- SUBMISSÃO DO FORMULÁRIO ---
function handleFormSubmit(event) {
  event.preventDefault();
  clearAllErrors();
  
  let isValid = true;
  
  // Validações individuais
  if (!nameInput.value.trim()) {
    showInputError(nameInput, 'name-error');
    isValid = false;
  }
  
  if (!categoryInput.value) {
    showInputError(categoryInput, 'category-error');
    isValid = false;
  }
  
  const qtyValue = parseInt(quantityInput.value, 10);
  if (isNaN(qtyValue) || qtyValue < 1) {
    showInputError(quantityInput, 'quantity-error');
    isValid = false;
  }
  
  if (!expiryInput.value) {
    showInputError(expiryInput, 'expiry-error');
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Criar novo produto
  const newProduct = {
    id: generateUUID(),
    nome: nameInput.value.trim(),
    categoria: categoryInput.value,
    quantidade: qtyValue,
    data_validade: expiryInput.value, // YYYY-MM-DD
    criado_em: new Date().toISOString()
  };
  
  products.push(newProduct);
  saveProducts();
  render();
  
  // Resetar formulário
  productForm.reset();
}

// Auxiliar para gerar ID único no frontend
function generateUUID() {
  return 'prod_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

// --- CÁLCULO E CLASSIFICAÇÃO DE VALIDADE ---
function calculateDaysRemaining(expiryDateStr) {
  // Ajuste do fuso horário para bater com a data local selecionada
  // Usando 'T00:00:00' faz o parser ler na timezone local do navegador do usuário
  const expiry = new Date(expiryDateStr + 'T00:00:00');
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

// Formatar data de YYYY-MM-DD para DD/MM/YYYY
function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// --- RENDERIZAÇÃO DA TELA ---
function render() {
  // Limpa as listas antes de repopular
  listCritico.innerHTML = '';
  listAlerta.innerHTML = '';
  listSeguro.innerHTML = '';
  
  let countCrit = 0;
  let countAlr = 0;
  let countSeg = 0;
  let totalItemsCount = 0;

  // Ordena os produtos pela proximidade da data de vencimento
  const sortedProducts = [...products].sort((a, b) => {
    return new Date(a.data_validade) - new Date(b.data_validade);
  });

  // Iterar e renderizar produtos nas colunas corretas
  sortedProducts.forEach(product => {
    const daysRemaining = calculateDaysRemaining(product.data_validade);
    const card = createProductCardHTML(product, daysRemaining);
    
    totalItemsCount += product.quantidade;

    if (daysRemaining <= 3) {
      listCritico.appendChild(card);
      countCrit++;
    } else if (daysRemaining <= 7) {
      listAlerta.appendChild(card);
      countAlr++;
    } else {
      listSeguro.appendChild(card);
      countSeg++;
    }
  });

  // Renderizar estados vazios caso necessário
  renderEmptyStateIfEmpty(listCritico, 'smile', 'Nenhum item crítico!');
  renderEmptyStateIfEmpty(listAlerta, 'info', 'Sem alertas para os próximos 7 dias.');
  renderEmptyStateIfEmpty(listSeguro, 'package-check', 'Nenhum produto seguro cadastrado.');

  // Atualiza contadores nas colunas
  countCritico.textContent = countCrit;
  countAlerta.textContent = countAlr;
  countSeguro.textContent = countSeg;

  // Atualiza painel superior de estatísticas
  statTotalVal.textContent = totalItemsCount;
  statCriticoVal.textContent = countCrit;
  statAlertaVal.textContent = countAlr;
  statSeguroVal.textContent = countSeg;

  // Atualiza ícones Lucide gerados dinamicamente
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Função auxiliar para renderizar placeholders de lista vazia
function renderEmptyStateIfEmpty(listContainer, iconName, messageText) {
  if (listContainer.children.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-state';
    emptyDiv.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <p>${messageText}</p>
    `;
    listContainer.appendChild(emptyDiv);
  }
}

// Criação do elemento de cartão do produto
function createProductCardHTML(product, daysRemaining) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'product-card';
  cardDiv.dataset.id = product.id;
  
  // Informações de texto de validade
  let daysText = '';
  if (daysRemaining < 0) {
    const absDays = Math.abs(daysRemaining);
    daysText = `Vencido há ${absDays} ${absDays === 1 ? 'dia' : 'dias'}!`;
  } else if (daysRemaining === 0) {
    daysText = 'Vence hoje! ⚠️';
  } else if (daysRemaining === 1) {
    daysText = 'Vence amanhã!';
  } else {
    daysText = `Vence em ${daysRemaining} dias`;
  }
  
  const categoryInfo = categoryMeta[product.categoria] || { icon: '🧩', label: product.categoria };

  cardDiv.innerHTML = `
    <div class="product-header">
      <span class="product-category-tag">${categoryInfo.icon} ${categoryInfo.label}</span>
      <button class="product-delete-btn" onclick="animateAndDeleteProduct('${product.id}')" title="Excluir produto">
        <i data-lucide="trash-2"></i>
      </button>
    </div>
    <h3 class="product-title">${product.nome}</h3>
    <div class="product-date-info">
      <i data-lucide="calendar"></i>
      <span>Validade: <strong>${formatDate(product.data_validade)}</strong></span>
    </div>
    <div class="days-badge">
      ${daysText}
    </div>
    <div class="product-actions">
      <div class="qty-control">
        <button class="qty-btn" onclick="decreaseQuantity('${product.id}')" title="Diminuir quantidade">
          <i data-lucide="minus"></i>
        </button>
        <span class="qty-val">${product.quantidade}x</span>
        <button class="qty-btn" onclick="increaseQuantity('${product.id}')" title="Aumentar quantidade">
          <i data-lucide="plus"></i>
        </button>
      </div>
    </div>
  `;
  
  return cardDiv;
}

// --- FUNÇÕES DE INTERAÇÃO (AÇÕES DO PRODUTO) ---

// Diminuir quantidade
window.decreaseQuantity = function(productId) {
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) return;
  
  if (products[index].quantidade > 1) {
    products[index].quantidade--;
    saveProducts();
    render();
  } else {
    // Se for 1, remove completamente
    animateAndDeleteProduct(productId);
  }
};

// Aumentar quantidade
window.increaseQuantity = function(productId) {
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) return;
  
  products[index].quantidade++;
  saveProducts();
  render();
};

// Remover com animação
window.animateAndDeleteProduct = function(productId) {
  const cardElement = document.querySelector(`.product-card[data-id="${productId}"]`);
  
  if (cardElement) {
    // Adiciona classe de animação fade out
    cardElement.classList.add('card-fade-out');
    
    // Aguarda o término da animação do CSS (250ms) para atualizar o estado e re-renderizar
    setTimeout(() => {
      deleteProduct(productId);
    }, 250);
  } else {
    deleteProduct(productId);
  }
};

// Lógica de exclusão do array
function deleteProduct(productId) {
  products = products.filter(p => p.id !== productId);
  saveProducts();
  render();
}
