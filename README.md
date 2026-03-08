# Lucca - AutoFind - Marketplace de Carros com Chatbot IA

Aplicação web para busca e comparação de veículos, com chatbot integrado alimentado por LLM (Google Gemini) para auxiliar o usuário na decisão de compra.

## Aplicação em produção

**Demo:** [https://carchallenge-klubi.onrender.com](https://carchallenge-klubi.onrender.com)

## Como Rodar

### Pré-requisitos

- Node.js 20+
- Conta gratuita no [Google AI Studio](https://aistudio.google.com/app/apikey) para obter uma API key

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/CarChallenge-Lucca.git
cd CarChallenge-Lucca

# Instale as dependências
npm install

# Configure a variável de ambiente
cp .env
# Edite .env e adicione sua GOOGLE_GENERATIVE_AI_API_KEY

# Rode o projeto
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Stack Técnica

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 16 + React 19 + TypeScript |
| Estilização | Tailwind CSS 4 |
| LLM | Google Gemini via AI SDK (streaming) |
| Deploy | Render |

## Funcionalidades

### Marketplace
- Grid responsivo de veículos com cards visuais
- Busca por nome/modelo com debounce
- Filtro por localidade (dropdown)
- Filtro por preço máximo (range slider)
- Skeleton loading durante carregamento
- Estado vazio com sugestão de usar o chat

### Chatbot IA (popup)
- Botão flutuante no canto inferior direito
- Chat com streaming em tempo real
- Contexto completo da base de dados injetado no prompt
- Tratamento inteligente dos 3 cenários de teste:
  - **Carro existe**: retorna os dados do veículo
  - **Preço abaixo**: mostra o preço real + alternativas no orçamento
  - **Outra localidade**: mostra onde está disponível + similares na cidade desejada
- Indicador de digitação animado
- Tratamento de erros com mensagem amigável

## Decisões Técnicas

**Por que Next.js?** App Router com API Routes permite ter frontend e backend no mesmo projeto, simplificando deploy e DX.

**Por que Gemini?** Tier gratuito no Google AI Studio, ótima latência e qualidade para respostas em português com modelos da família Gemini.

**Por que AI SDK?** Abstração unificada para streaming de LLM, hooks React prontos (`useChat`), suporte a múltiplos provedores.

**UX do chatbot**: Popup fixo que não interfere na navegação do marketplace. O usuário pode usar os filtros tradicionais OU o chat conforme preferir.

## Plano de Negócios

### 1. Modelo de Negócios

Marketplace B2B2C com três fontes de receita:

- **Comissão por lead qualificado**: Concessionárias pagam por cada lead gerado (contato, agendamento de test drive). Modelo CPA (custo por aquisição), estimado em R$ 50-150 por lead.
- **Assinatura premium para vendedores**: Plano mensal para concessionárias que querem destaque nos resultados, analytics avançados e integração com CRM (Plano futuro). Faixas de R$ 299-999/mês.
- **Anúncios patrocinados**: Cards destacados na grid de resultados e menções prioritárias no chatbot.

### 2. Estratégia de Aquisição

**Fase 1 - Orgânico (meses 1-3):**
- SEO em termos long-tail ("comprar BYD Dolphin São Paulo", "melhor SUV até 130 mil")
- Conteúdo comparativo (blog posts gerados com auxílio de IA)
- Presença em redes sociais automotivas

**Fase 2 - Pago (meses 3-6):**
- Google Ads em termos de intenção de compra
- Google Ads para leads concessionárias
- Meta Ads com retargeting para visitantes
- Parcerias com influenciadores automotivos

**Fase 3 - Viralidade (meses 6+):**
- Compartilhamento de comparativos gerados pelo chatbot
- Widget embeddable para blogs de carros
- API para parceiros

### 3. CAC (Custo de Aquisição de Cliente)

- **Orgânico**: R$ 15-30 (custo de produção de conteúdo / visitantes convertidos)
- **Pago**: R$ 80-150 (com otimização progressiva)
- **Meta CAC blended**: R$ 50-80 por usuário ativo

### 4. LTV (Lifetime Value)

- Usuário médio busca carro 1-2x ao ano
- Comissão média por transação: R$ 100
- Tempo médio de retenção: 3 anos
- **LTV estimado: R$ 300-600**
- **Relação LTV/CAC: 4-7x** (saudável)

**Maximização do LTV:**
- Alertas de queda de preço para carros favoritados
- Newsletter semanal com novidades do mercado
- Expansão para seguros, financiamento e acessórios

### 5. Monetização

| Canal | Modelo | Receita estimada |
|-------|--------|-----------------|
| Leads para concessionárias | CPA (R$ 50-150/lead) | 60% da receita |
| Assinatura premium | SaaS mensal | 25% da receita |
| Anúncios destacados | CPM/CPC | 15% da receita |

### 6. Retenção

- **Alertas de preço**: Notificação quando um carro favoritado baixar de preço
- **Histórico de buscas**: Salvar e retomar pesquisas anteriores
- **Comparativos salvos**: Permitir comparar carros e salvar para decisão futura
- **Chatbot personalizado**: IA que lembra preferências do usuário entre sessões
- **Conteúdo educativo**: Reviews, dicas de negociação, checklist de vistoria
- **Gamificação**: Badges para usuários ativos, programa de indicação

---

Desenvolvido como parte do desafio técnico.
