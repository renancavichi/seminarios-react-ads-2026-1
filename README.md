# Base UI — Manual de Instalação

Aplicação Next.js + Base UI desenvolvida como uma página interativa para demonstrar
componentes headless da biblioteca `@base-ui/react`.


Para acessar os slides da apresentação: [Acesse aqui!](https://www.figma.com/deck/5cWk1IycF5fkdTFeOuIs8i/Base-UI---WEB3?node-id=0-1&t=Z0ZuH7PXy4oMUNvm-1)

A tela principal possui três cards, e cada card abre um
modal com exemplos diferentes de componentes e padrões de interação.

## Como executar

Pré-requisitos: [Node.js](https://nodejs.org) 16 ou superior instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Depois abra o endereço exibido no terminal, geralmente:

```bash
http://localhost:3000
```

## Build de produção

```bash
npm run build # gera a versão otimizada na pasta .next/
npm run start # serve a versão de produção localmente
```

No Next.js, a pasta equivalente à `dist/` de projetos Vite é a pasta `.next/`.
Ela é gerada automaticamente pelo comando `npm run build` e normalmente não deve
ser versionada no Git.

## Estrutura do projeto

```text
app/
  layout.tsx       # layout raiz, metadata e definição de idioma da página
  page.tsx         # página principal com os três cards e modais Base UI
  globals.css      # Tailwind CSS, tema global e ajustes básicos
  favicon.ico      # ícone da aplicação

public/
  file.svg         # assets estáticos gerados pelo template do Next.js
  globe.svg
  next.svg
  vercel.svg
  window.svg

next.config.ts     # configuração do Next.js e raiz do Turbopack
postcss.config.mjs # configuração do PostCSS usada pelo Tailwind CSS
eslint.config.mjs  # configuração do ESLint
tsconfig.json      # configuração do TypeScript
package.json       # scripts e dependências do projeto
package-lock.json  # lockfile das dependências instaladas
```

## Componentes demonstrados

```text
Card 1 — Preferências do produto
  Dialog         # modal acessível
  Tabs           # navegação interna por abas
  Select         # seletor customizado
  Switch         # controles booleanos
  Slider         # controle de intervalo
  Progress       # barra de progresso

Card 2 — Cadastro inteligente
  Field          # campo com label, descrição e validação
  Input          # input integrado ao Field
  NumberField    # campo numérico com incremento/decremento
  Checkbox       # checkbox acessível com input oculto

Card 3 — Central de insights
  Accordion      # seções expansíveis
  Popover        # conteúdo contextual
  Tooltip        # dica rápida ao interagir
```

## Tecnologias usadas

- Next.js 16
- React 19
- Base UI (`@base-ui/react`)
- Tailwind CSS 4
- TypeScript
- ESLint

## Observação

Este projeto contém apenas o código-fonte. A pasta `node_modules` não deve ser
incluída no repositório, pois é gerada pelo `npm install`.

Também não é necessário versionar a pasta `.next/`, já que ela é gerada pelo
`npm run build`.
