# Material UI — Projeto de Apresentação

Aplicação desenvolvida com React, Vite e Material UI para demonstrar os principais recursos e componentes da biblioteca.

## Como executar

### Pré-requisitos

* Node.js 18 ou superior
* npm instalado

### Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

### Executando em modo de desenvolvimento

```bash
npm run dev
```

Após iniciar o servidor, abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

## Build de produção

Para gerar a versão otimizada da aplicação:

```bash
npm run build
```

Os arquivos gerados ficarão disponíveis na pasta `dist/`.

Para visualizar a build localmente:

```bash
npm run preview
```

## Verificação de código

Executa a análise de código utilizando ESLint:

```bash
npm run lint
```

## Tecnologias utilizadas

* React 19
* Material UI (MUI)
* Emotion
* Vite
* ESLint

## Principais dependências

```text
@mui/material
@mui/icons-material
@emotion/react
@emotion/styled
react
react-dom
```

## Estrutura básica do projeto

```text
src/
public/
package.json
vite.config.js
eslint.config.js
```

## Observação

Este projeto contém apenas o código-fonte. As dependências não são enviadas para o repositório e devem ser instaladas através do comando:

```bash
npm install
```

Caso ocorram erros relacionados a dependências, remova a pasta `node_modules` e o arquivo `package-lock.json` e execute novamente:

```bash
npm install
```
