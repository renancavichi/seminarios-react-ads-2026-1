# React Game Engine Demo

Jogo demonstrativo em **React** com **react-game-engine**, desenvolvido em JavaScript e executado no navegador com Vite. O objetivo é coletar moedas para acumular pontos, evitando os obstáculos espalhados pela arena.

O projeto mostra como separar os dados do jogo (**entidades**), as regras executadas a cada atualização (**sistemas**) e os componentes que desenham a interface (**renderizadores**). Os elementos são componentes React com posicionamento absoluto no DOM; o jogo não utiliza canvas nem um motor de física separado.

## Sumário

- [Como jogar](#como-jogar)
- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Comandos disponíveis](#comandos-disponíveis)
- [Build e publicação](#build-e-publicação)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como o jogo funciona](#como-o-jogo-funciona)
- [Como personalizar](#como-personalizar)
- [Validação das alterações](#validação-das-alterações)
- [Limitações atuais](#limitações-atuais)
- [Solução de problemas](#solução-de-problemas)

## Como jogar

1. Abra a aplicação no navegador.
2. Clique dentro da área cinza para posicionar o jogador azul no local do clique.
3. Encoste na moeda amarela para ganhar **1 ponto**.
4. Evite os três obstáculos circulares com borda laranja. Colidir com qualquer um encerra a partida.
5. Ao perder, recarregue a página para começar novamente com zero pontos.

O deslocamento é instantâneo: o jogador vai diretamente para o ponto clicado. Não há animação de caminhada nem verificação de colisões ao longo do caminho entre a posição anterior e a nova.

A moeda e todos os obstáculos recebem novas posições:

- Na primeira atualização da partida.
- Sempre que uma moeda é coletada.
- A cada **90 atualizações do sistema**, mesmo sem interação.

Esse intervalo é medido em frames, não em segundos. Em uma execução de aproximadamente 60 atualizações por segundo, ele corresponde a cerca de 1,5 segundo; o tempo real varia conforme a frequência de atualização.

## Tecnologias

| Tecnologia | Versão declarada no `package.json` | Papel no projeto |
| --- | --- | --- |
| React e React DOM | `^19.2.6` | Componentes visuais e montagem da aplicação no navegador |
| react-game-engine | `^1.2.0` | Execução dos sistemas, entidades e eventos de entrada |
| regenerator-runtime | `^0.14.1` | Runtime importado antes da aplicação para suporte a código transpilado que depende dele |
| Vite | `^8.0.12` | Servidor de desenvolvimento e geração do build |
| @vitejs/plugin-react | `^6.0.1` | Integração do React com o Vite |
| ESLint | `^10.3.0` | Análise estática de JavaScript e JSX |

O `package-lock.json` registra as versões resolvidas das dependências. As faixas acima permitem atualizações compatíveis; use `npm ci` para instalar as versões registradas no lockfile.

## Requisitos

- **Node.js 22.13 ou superior da linha 22, ou Node.js 24 ou superior**, para atender aos requisitos combinados do Vite e do ESLint presentes no lockfile. A linha 20 também é aceita a partir da versão 20.19.
- **npm**, utilizado nos comandos deste documento.
- Um navegador com suporte a JavaScript moderno.
- Git, caso você vá obter o projeto por clonagem.

Confira as ferramentas instaladas:

```bash
node --version
npm --version
```

Não é necessário configurar banco de dados, API, autenticação ou variáveis de ambiente para executar a versão atual.

## Instalação e execução

Se ainda não tiver o projeto, clone este repositório usando sua URL ou baixe e extraia seus arquivos. No terminal, entre na pasta do projeto:

```bash
cd react-game-engine-demo
```

Instale as dependências usando o lockfile:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra a URL exibida no terminal pelo Vite. Na configuração padrão, ela costuma ser `http://localhost:5173`; se a porta estiver ocupada, consulte a porta efetivamente informada.

Durante o desenvolvimento, as alterações nos arquivos são refletidas pelo Vite no navegador. Para encerrar o servidor, pressione `Ctrl+C` no terminal.

Ao adicionar ou atualizar dependências intencionalmente, utilize `npm install` e mantenha `package.json` e `package-lock.json` sincronizados.

## Comandos disponíveis

Execute os comandos na pasta que contém o `package.json`.

| Comando | O que faz |
| --- | --- |
| `npm ci` | Instala as dependências conforme o lockfile; substitui uma instalação existente em `node_modules` |
| `npm run dev` | Inicia o Vite para desenvolvimento |
| `npm run build` | Gera os arquivos de produção na pasta `dist/` |
| `npm run preview` | Serve localmente o build já gerado para conferência |
| `npm run lint` | Executa o ESLint no projeto |

Não há script `npm test` configurado atualmente.

## Build e publicação

Gere o build e confira o resultado localmente:

```bash
npm run build
npm run preview
```

Abra o endereço informado pelo comando de preview. Execute novamente o build para que novas alterações sejam incluídas nessa prévia.

Para publicar, configure sua hospedagem de arquivos estáticos com:

| Configuração | Valor |
| --- | --- |
| Instalação | `npm ci` |
| Comando de build | `npm run build` |
| Diretório de saída | `dist` |

O comando `preview` serve para conferir o build localmente. A publicação consiste em disponibilizar o conteúdo de `dist/` na hospedagem escolhida.

Se a aplicação for hospedada em um subdiretório, configure a opção `base` em [vite.config.js](vite.config.js) conforme o caminho de publicação antes de gerar o build.

## Estrutura do projeto

```text
react-game-engine-demo/
├── public/               # Arquivos estáticos públicos, incluindo o favicon
├── src/
│   ├── assets/           # Imagens e SVGs; não são usados pela cena atual
│   ├── App.jsx           # Arena, registro do sistema e entidades iniciais
│   ├── main.jsx          # Importação do runtime, CSS e montagem do React
│   ├── renderers.jsx     # Aparência do jogador, moeda, obstáculos e mensagens
│   ├── style.css         # Layout da página e estilo da arena
│   └── systems.js        # Movimento, colisões, pontuação e reposicionamento
├── .gitignore            # Exclusões como node_modules/ e dist/
├── eslint.config.js      # Regras de análise estática
├── index.html            # Documento HTML e elemento raiz da aplicação
├── package.json          # Dependências e scripts
├── package-lock.json     # Versões resolvidas das dependências
├── README.md             # Documentação do projeto
└── vite.config.js        # Configuração do Vite e plugin React
```

## Como o jogo funciona

### 1. Inicialização

[src/main.jsx](src/main.jsx) importa `regenerator-runtime/runtime`, carrega o CSS global e monta `<App />` no elemento `root` de `index.html`.

[src/App.jsx](src/App.jsx) cria o `GameEngine` com uma arena de **800 × 500 pixels**, registra o sistema `MoveAndCollect` e fornece as entidades iniciais.

### 2. Entidades: os dados da partida

| Entidade | Dados principais | Responsabilidade |
| --- | --- | --- |
| `game` | `width`, `height`, `isGameOver`, `hasSpawnedInitialObjects` | Dimensões e controle da partida |
| `player` | `x`, `y`, `size`, `renderer` | Jogador azul; começa em `(100, 100)` com tamanho 50 |
| `coin` | `x`, `y`, `size`, `frameCounter`, `moveIntervalFrames`, `renderer` | Moeda de tamanho 40 e contador para reposicionamento |
| `danger1`, `danger2`, `danger3` | `x`, `y`, `size`, `renderer` | Obstáculos de tamanho 40 |
| `score` | `value`, `renderer` | Pontuação, inicialmente zero |
| `status` | `visible`, `message`, `renderer` | Mensagem de fim de partida |

As coordenadas `x` e `y` representam o **centro** de cada objeto. Os renderizadores subtraem metade de `size` para calcular `left` e `top`.

As posições da moeda e dos obstáculos declaradas em `App.jsx` são substituídas pelo sorteio da primeira atualização.

### 3. Sistema: as regras a cada atualização

A função `MoveAndCollect`, em [src/systems.js](src/systems.js), recebe as entidades e os eventos de entrada. Ela modifica os dados e retorna as entidades ao motor.

A ordem de execução é:

1. Sortear as posições iniciais da moeda e dos obstáculos, se necessário.
2. Retornar imediatamente se a partida já terminou.
3. Procurar o primeiro evento `onMouseDown` da atualização e mover o jogador para a posição correspondente dentro da arena.
4. Verificar colisão com os obstáculos; em caso de colisão, marcar a derrota, exibir a mensagem e encerrar essa atualização.
5. Verificar colisão com a moeda; em caso de coleta, somar um ponto e reposicionar moeda e obstáculos.
6. Incrementar o contador de frames e reposicionar os objetos quando ele atingir `moveIntervalFrames`.

A colisão com obstáculos tem prioridade sobre a coleta da moeda. Após a derrota, o sistema deixa de processar movimento, pontuação e reposicionamento; não há uma chamada explícita para desligar o loop do motor.

### 4. Colisões

O cálculo usa a distância entre os centros dos objetos:

```text
distância = √((xA - xB)² + (yA - yB)²)
raioA = tamanhoA / 2
raioB = tamanhoB / 2
colisão = distância < raioA + raioB
```

Todos os objetos são tratados como círculos nesse cálculo, inclusive o jogador, que visualmente é um quadrado com cantos arredondados. O contato exato entre as bordas, sem sobreposição, não conta como colisão porque a comparação usa `<`.

### 5. Sorteio de posições

`generateRandomPosition` gera coordenadas com margem padrão de **70 pixels** em relação às dimensões da arena.

`generateSafePosition` tenta encontrar uma posição sem colisão até **100 vezes**:

- A moeda evita a posição do jogador.
- Cada obstáculo evita o jogador, a moeda e os obstáculos já reposicionados naquela rodada.

Se nenhuma tentativa funcionar, a função retorna uma posição aleatória sem garantir ausência de colisões. Essa limitação fica especialmente relevante ao aumentar a quantidade ou o tamanho dos objetos, ou reduzir a arena.

### 6. Renderização

[src/renderers.jsx](src/renderers.jsx) contém cinco componentes:

- `Player`: jogador azul.
- `Coin`: moeda amarela.
- `OrangeCircle`: obstáculos com borda laranja e preenchimento `#d0aa12`.
- `Score`: placar no canto superior esquerdo.
- `StatusMessage`: mensagem central exibida ao perder.

Os elementos usam `pointerEvents: "none"`, permitindo que a arena receba os cliques sobre eles. A aparência dos objetos fica nos estilos inline dos renderizadores; o layout da página e a moldura da arena ficam em `style.css`.

## Como personalizar

| Alteração desejada | Onde alterar | Observação |
| --- | --- | --- |
| Dimensões da arena | `GAME_WIDTH` e `GAME_HEIGHT` em `src/App.jsx` | Ajuste também a largura de `.presentation` em `src/style.css` para manter o alinhamento |
| Posição e tamanho do jogador | Entidade `player` em `src/App.jsx` | `x` e `y` são o centro; `size` também afeta as colisões |
| Tamanho da moeda e dos obstáculos | `size` nas entidades de `src/App.jsx` | O mesmo valor controla tamanho visual e raio de colisão |
| Frequência de reposicionamento | `coin.moveIntervalFrames` em `src/App.jsx` | Valores menores fazem os objetos mudarem mais frequentemente |
| Quantidade de obstáculos | Objeto `entities` em `src/App.jsx` | Novos obstáculos devem ter uma chave iniciada por `danger` |
| Pontos por moeda | `checkCoinCollision` em `src/systems.js` | Altere o incremento de `entities.score.value` |
| Margem do sorteio | Parâmetro `margin` de `generateRandomPosition` em `src/systems.js` | Mantenha largura e altura maiores que duas vezes a margem |
| Cores, bordas e aparência dos objetos | `src/renderers.jsx` | Os estilos dos objetos são definidos inline |
| Layout e fundo da página | `src/style.css` | A arena possui dimensões fixadas em `App.jsx` |
| Texto de derrota | `checkDangerCollision` e `StatusMessage` | A mensagem e o título são definidos em arquivos diferentes |

Por exemplo, para adicionar um quarto obstáculo, acrescente uma entidade ao objeto `entities` do `GameEngine` em `App.jsx`:

```jsx
danger4: {
  x: 600,
  y: 300,
  size: 40,
  renderer: <OrangeCircle />,
},
```

O sistema identifica automaticamente as chaves iniciadas por `danger`, incluindo o novo objeto no sorteio e na detecção de colisões. As coordenadas desse exemplo também serão substituídas no primeiro sorteio.

## Validação das alterações

Após alterar o código, execute:

```bash
npm run lint
npm run build
```

O lint verifica regras estáticas e o build verifica a geração dos arquivos de produção. Eles não substituem a conferência das interações no navegador, e não há testes automatizados configurados no projeto.

Roteiro de conferência manual:

1. Abra a aplicação e confirme que o placar começa em zero.
2. Clique em uma área livre e verifique se o jogador muda de posição.
3. Clique na moeda e confirme o acréscimo de um ponto e o reposicionamento dos objetos.
4. Aguarde sem clicar e confirme que a moeda e os obstáculos mudam de posição periodicamente.
5. Clique em um obstáculo e confirme que a mensagem de derrota aparece.
6. Após a derrota, confirme que novos cliques não movem o jogador e que os objetos param de mudar de posição.
7. Recarregue a página e confirme o início de uma nova partida.

## Limitações atuais

- A arena tem tamanho fixo de 800 × 500 pixels e pode ultrapassar a largura de telas pequenas.
- A entrada é implementada com `onMouseDown`; não há controles específicos de teclado ou toque.
- O jogador muda de posição instantaneamente, sem colisões durante o trajeto.
- Não existe ajuste explícito da posição para manter o jogador inteiro dentro da arena. Próximo às bordas, parte dele pode ficar cortada pelo `overflow: hidden`.
- O intervalo de mudança dos objetos depende da quantidade de atualizações, sem compensação pelo tempo decorrido.
- O sorteio tem um número limitado de tentativas e não garante posições livres após esgotá-las.
- O placar fica apenas em memória e é perdido ao recarregar a página.
- Não há botão de reinício, pausa, níveis, sons, ranking, backend ou persistência.

## Solução de problemas

| Situação | O que verificar |
| --- | --- |
| `node` ou `npm` não é reconhecido | Confira a instalação do Node.js e a disponibilidade dos executáveis no `PATH`; reabra o terminal após instalar |
| Erro de versão do Node.js ou `EBADENGINE` | Compare `node --version` com os requisitos deste documento e das dependências |
| `npm ci` informa divergência entre manifesto e lockfile | Se você alterou dependências intencionalmente, execute `npm install` para sincronizar os arquivos e revise o diff |
| A porta esperada está ocupada | Use a URL exibida pelo Vite ou escolha outra porta com `npm run dev -- --port 5174` |
| O preview não encontra o build ou mostra uma versão antiga | Execute `npm run build` antes de `npm run preview` |
| O jogador não se move após uma colisão | A partida terminou; recarregue a página para reiniciar |
| O jogador fica parcialmente cortado nas bordas | Esse comportamento decorre do posicionamento pelo centro, sem limitação explícita às bordas |
| A arena não cabe na tela | O layout atual usa uma arena fixa; para suporte responsivo, adapte as dimensões e o tratamento de coordenadas |
| O navegador informa ausência de `regeneratorRuntime` | Confira se a importação de `regenerator-runtime/runtime` continua no início de `src/main.jsx` e se as dependências foram instaladas |
