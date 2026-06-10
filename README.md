# 🛒 PantryGuard

> Uma aplicação web inteligente para gestão de despensa doméstica, controle de validade de produtos e combate ao desperdício desenvolvida em Java.
---
## 💡 Sobre o Projeto
O **PantryGuard** nasce para resolver um problema real e diário: o desperdício de alimentos, cosméticos e produtos de limpeza devido ao esquecimento das datas de validade. 

A plataforma funciona como uma despensa virtual inteligente. O utilizador pode cadastrar os seus produtos, organizá-los de acordo com o ambiente onde estão guardados (Geladeira, Armário da Cozinha, Banheiro) e monitorizar os prazos de expiração. O ecossistema robusto do Java no Back-end garante um processamento seguro de datas, persistência eficiente e regras de negócio sólidas para os alertas de vencimento.
---
## 🚀 Principais Funcionalidades/
- **Despensa Virtual Organizada:** Cadastro de produtos associados a ambientes específicos para saber sempre onde cada item está.
- **Painel de Status Dinâmico (Alertas Visuais):**
  - 🔴 **Crítico:** Produtos já vencidos ou que vencem nos próximos 3 dias.
  - 🟡 **Atenção:** Produtos com vencimento próximo (entre 4 e 14 dias).
  - 🟢 **Seguro:** Produtos com margem confortável de validade (mais de 14 dias).
- **Filtros e Motores de Busca:** Filtre a sua despensa por divisão da casa (ex: ver apenas itens da Geladeira) ou ordene pela proximidade de vencimento usando Streams do Java.
- **Tratamento Seguro de Datas:** Uso da API `java.time` (`LocalDate`) para evitar problemas com fusos horários e garantir cálculos exatos de dias restantes.

---

