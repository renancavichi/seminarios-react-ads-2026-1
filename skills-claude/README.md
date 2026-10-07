# Skills no Claude Code: boas práticas para React e Next.js

Apresentação interativa sobre **Skills no Claude Code**, com foco na skill [`vercel-react-best-practices`](https://github.com/vercel-labs/agent-skills). O material mostra como instruções especializadas podem orientar o Claude a considerar desempenho ao criar, revisar ou refatorar aplicações React e Next.js.

> Uma Skill não escreve código no lugar do Claude nem garante performance: ela fornece contexto e recomendações para ajudar o modelo a tomar decisões melhores. O código gerado ainda precisa ser revisado e testado.

## Sobre a apresentação

O deck percorre os seguintes tópicos:

1. Diferença entre o modelo Claude e o Claude Code.
2. O que são Skills e como elas orientam o agente.
3. Problemas de performance que podem passar despercebidos em código funcional.
4. Instalação e formas de usar uma Skill.
5. Categorias de recomendações da `vercel-react-best-practices`, organizadas por prioridade.
6. Demonstrações de paralelização de chamadas, redução de bundle e estabilidade de props em React.
7. Exemplos de recomendações também presentes na implementação desta apresentação.

O roteiro detalhado para acompanhar e ensaiar a fala está em [docs/roteiro-apresentacao.md](docs/roteiro-apresentacao.md).

## O que é uma Skill?

Uma Skill é um conjunto de instruções especializadas que dá ao Claude orientações para uma tarefa ou contexto. No Claude Code, ela pode ajudar durante a criação, revisão e refatoração de código. Pense nela como um guia reutilizável: destaca prioridades, padrões úteis e problemas a evitar, sem substituir conhecimento técnico, testes ou ferramentas de análise estática.

Na apresentação, a `vercel-react-best-practices` é usada para ilustrar recomendações relacionadas a React e Next.js, como:

- evitar waterfalls quando operações assíncronas independentes podem ocorrer em paralelo;
- reduzir JavaScript enviado ao navegador por meio de imports mais específicos quando apropriado;
- evitar recriar objetos e arrays estáveis que possam provocar renders desnecessários;
- considerar fetching de dados, trabalho no servidor e estratégias de renderização.

Essas otimizações dependem do contexto. Por exemplo, só se deve usar `Promise.all` quando as operações não dependem umas das outras, e nem todo objeto inline causa um problema relevante.

## Categorias abordadas

O deck apresenta oito grupos de recomendações, identificados pelos prefixos:

| Prefixo | Tema |
| --- | --- |
| `async-` | Eliminar waterfalls e bloqueios assíncronos evitáveis |
| `bundle-` | Reduzir o tamanho do bundle |
| `server-` | Performance no servidor |
| `client-` | Busca de dados no cliente |
| `rerender-` | Evitar renders desnecessários |
| `rendering-` | Performance de renderização |
| `js-` | Performance JavaScript |
| `advanced-` | Padrões avançados |

## Instalar a Skill demonstrada

Para adicionar a Skill a um projeto com Claude Code, execute o comando a seguir na raiz desse projeto:

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

Depois, confira a instalação em `.claude/skills/`. A apresentação recomenda instalar e versionar a Skill por projeto para que as pessoas do time compartilhem as mesmas instruções. Consulte a documentação do repositório de origem para detalhes atualizados sobre instalação e uso.

## Executar a apresentação

Este projeto usa React 18, Vite e JavaScript. Requer Node.js e npm instalados.

```bash
npm install
npm run dev
```

O Vite exibirá o endereço local no terminal. Para validar uma build de produção:

```bash
npm run build
npm run preview
```

### Navegação pelos slides

- `→`, `PageDown` ou espaço: próximo slide.
- `←` ou `PageUp`: slide anterior.
- `Home`: primeiro slide.
- `End`: último slide.

## Estrutura do projeto

- `src/slides/`: componentes dos slides e ordem da apresentação.
- `src/components/deck/`: navegação e estrutura do deck.
- `src/components/demo/`: exemplos de código das demonstrações.
- `src/data/presentation.js`: dados das categorias, modos de uso, instalação e meta-exemplos.
- `docs/roteiro-apresentacao.md`: objetivos, falas sugeridas, perguntas e roteiro de ensaio.

## Observação sobre as demonstrações

Os exemplos são didáticos e demonstram princípios, não garantias universais de ganho. O efeito de imports depende do pacote e do bundler; a memoização e a estabilidade de referências são úteis quando evitam trabalho significativo; e a execução paralela só é correta quando as chamadas são independentes. Meça e valide as mudanças no contexto da aplicação real.
