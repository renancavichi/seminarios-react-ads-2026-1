import { useEffect, useState } from "react";
import { Check, ChevronRight, Copy, Sparkles, Atom, Zap, Wind, Layers } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FlipCard } from "@/components/ui/flip-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Carousel as PresentationCarousel,
  CarouselContent as PresentationCarouselContent,
  CarouselItem as PresentationCarouselItem,
  CarouselNext as PresentationCarouselNext,
  CarouselPrevious as PresentationCarouselPrevious,
} from "@/components/ui/presentation-carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const stacks = [
  {
    name: "React",
    icon: Atom,
    color: "text-sky-400"

  },
  {
    name: "Vite",
    icon: Zap,
    color: "text-amber-400"
  },
  {
    name: "Tailwind CSS",
    icon: Wind,
    color: "text-cyan-400"
  },
  {
    name: "Radix UI & Shadcn",
    icon: Layers,
    color: "text-purple-400"
  },
  {
    name: "Lucide React",
    icon: Layers,
    color: "text-pink-400",
  }
]

const techStack = [
  {
    name: "React",
    role: "estrutura",
    stage: 1,
    description: "Os componentes são escritos como componentes React comuns.",
    example: "<Button />",
  },
  {
    name: "Tailwind CSS",
    role: "estilo",
    stage: 2,
    description: "Define o visual usando classes utilitárias direto nos componentes.",
    example: "rounded-md px-4 py-2",
  },
  {
    name: "Radix UI",
    role: "comportamento",
    stage: 3,
    description: "Base de omponentes interativos como Dialog, Select e Dropdown.",
    example: "Dialog, Select, Popover",
  },
  {
    name: "Lucide React",
    role: "ícones",
    stage: 4,
    description: "Fornece ícones leves e consistentes para usar nos componentes.",
    example: "<Copy />",
  },
  {
    name: "CVA",
    role: "variantes",
    stage: 5,
    description: "Organiza variações de estilo, como default, outline e destructive.",
    example: 'variant="outline"',
  },
  {
    name: "CLI do shadcn",
    role: "instalação",
    stage: 6,
    description: "Adiciona os componentes como arquivos dentro do projeto.",
    example: "npx shadcn@latest add button",
  },
];

const techRows = [techStack.slice(0, 3), techStack.slice(3, 6)];

const repeatedInterfaceBlocks = [
  "Button",
  "Input",
  "Card",
  "Modal",
  "Table",
  "Menu",
  "Form",
];

const manualComponentSteps = [
  "criar arquivo",
  "montar componente",
  "definir props",
  "aplicar Tailwind",
  "exportar",
  "repetir em outra tela",
];

const noPatternProblems = [
  "código duplicado",
  "visual inconsistente",
  "manutenção difícil",
  "comportamento diferente",
];

const shadcnBenefits = [
  "base pronta",
  "código no projeto",
  "customização livre",
  "padrão visual",
];

const slide11Advantages = [
  "rápido",
  "moderno",
  "bonito",
  "customizável",
  "acessível",
  "bom para design system",
  "funciona bem com IA",
];

const slide11Limitations = [
  "exige React",
  "exige Tailwind",
  "manutenção fica com a equipe",
  "pode virar bagunça sem padrão",
  "não é ideal para quem só quer copiar sem entender",
];

const slide11GoodFit = [
];

const slide11Requirements = [
];

const stackCompositionSteps = [
  "React monta o componente.",
  "Lucide entra com os ícones da interface.",
  "Radix cuida do comportamento e da acessibilidade.",
  "Tailwind + CVA organizam o visual e as variantes.",
  "A CLI copia o componente para dentro do projeto.",
];

const stackCompositionSnippet = `// Exemplo de uso no React
<Button variant="destructive" className="gap-2">
  <Copy className="size-4" />
  Copiar
</Button>

// O visual vem das variantes
// A estrutura continua sendo React
// O código fica em components/ui/button.jsx`;


const promptText =
  "Crie uma tela de dashboard em React usando Shadcn/UI com Card, Button, Table e Dialog. Use Tailwind CSS e organize uma tabela de usuários.";

const loginSnippet = `import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Entrar no sistema</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" type="password" />
          <Button className="w-full">Entrar</Button>
        </CardContent>
      </Card>
    </main>
  );
}`;

const setupCommandCards = [
  {
    id: "init",
    command: "npx shadcn@latest init",
    eyebrow: "base do projeto",
    title: "Prepara a estrutura inicial do Shadcn",
    console: `$ npx shadcn@latest init
[ok] Checking project
[ok] Detecting framework: Vite
[ok] Validating Tailwind CSS
[ok] Writing components.json
[ok] Creating src/lib/utils.js
[ok] Creating src/components/ui
[ok] Updating src/index.css`,
    created: [
      "src/components/ui/ para receber os componentes",
      "src/lib/utils.js com a função cn()",
      "components.json com aliases, estilo e paths",
      "CSS global com variáveis de tema",
    ],
    structure: `src/
  components/
    ui/
  lib/
    utils.js
  index.css
components.json`
  },
  {
    id: "button",
    command: "npx shadcn@latest add button",
    eyebrow: "acao primaria",
    title: "Adiciona o componente Button ao projeto",
    console: `$ npx shadcn@latest add button
[ok] Checking registry
[ok] Resolving dependencies
[ok] Created 1 file:
  - src/components/ui/button.jsx`,
    created: [
      "src/components/ui/button.jsx com variantes do componente",
      "import pronto para usar em qualquer tela React",
      "base para ações como salvar, enviar e confirmar",
    ],
    structure: `src/
  components/
    ui/
      button.jsx`,
  },
  {
    id: "card",
    command: "npx shadcn@latest add card",
    eyebrow: "bloco de conteudo",
    title: "Cria o componente Card para estruturar conteúdo",
    console: `$ npx shadcn@latest add card
[ok] Checking registry
[ok] Resolving dependencies
[ok] Created 1 file:
  - src/components/ui/card.jsx`,
    created: [
      "src/components/ui/card.jsx com Card, Header, Title e Content",
      "estrutura reutilizável para painéis e seções da interface",
      "import agrupado para montar blocos visuais rapidamente",
    ],
    structure: `src/
  components/
    ui/
      card.jsx`
  },
  {
    id: "input",
    command: "npx shadcn@latest add input",
    eyebrow: "entrada de dados",
    title: "Adiciona o Input para formulários",
    console: `$ npx shadcn@latest add input
[ok] Checking registry
[ok] Resolving dependencies
[ok] Created 1 file:
  - src/components/ui/input.jsx`,
    created: [
      "src/components/ui/input.jsx com estilos base do campo",
      "componente pronto para formulários, busca e filtros",
      "uso simples com placeholder, type e classes extras",
    ],
    structure: `src/
  components/
    ui/
      input.jsx`
  },
  {
    id: "dialog",
    command: "npx shadcn@latest add dialog",
    eyebrow: "modal interativa",
    title: "Cria o Dialog para modais e confirmações",
    console: `$ npx shadcn@latest add dialog
[ok] Checking registry
[ok] Resolving dependencies
[ok] Created 1 file:
  - src/components/ui/dialog.jsx`,
    created: [
      "src/components/ui/dialog.jsx com Dialog, Trigger e Content",
      "base acessível para modal, confirmação e detalhes",
      "composição pronta para combinar com Button e Card",
    ],
    structure: `src/
  components/
    ui/
      dialog.jsx`
  },
];

const componentShowcases = [
  {
    id: "button",
    label: "Button",
    eyebrow: "ação primária",
    description: "Botões prontos para salvar, confirmar, cancelar ou seguir fluxos da interface.",
    useCase: "É um dos componentes mais usados do Shadcn porque já vem com variantes e estados visuais consistentes.",
    code: `import { Button } from "@/components/ui/button";

<Button variant="outline">Ver detalhes</Button>`,
  },
  {
    id: "input",
    label: "Input",
    eyebrow: "entrada de dados",
    description: "Campos de texto usados em login, filtros, buscas e formulários em geral.",
    useCase: "Ajuda a manter o padrão visual dos campos sem precisar estilizar input por input.",
    code: `import { Input } from "@/components/ui/input";

<Input placeholder="voce@empresa.com" type="email" />`,
  },
  {
    id: "card",
    label: "Card",
    eyebrow: "bloco de conteúdo",
    description: "Organiza seções da tela como resumos, listas rápidas e painéis de dashboard.",
    useCase: "É a base visual para agrupar informações com header, conteúdo e ações no mesmo padrão.",
    code: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Plano Pro</CardTitle>
    <CardDescription>Mais usado em dashboards</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Inclui métricas, formulários e tabelas.</p>
  </CardContent>
</Card>`,
  },
  {
    id: "dialog",
    label: "Dialog",
    eyebrow: "modal",
    description: "Usado para confirmações, formulários rápidos, detalhes e ações críticas.",
    useCase: "Como vem baseado em Radix, já entrega estrutura acessível para modais e overlays.",
    code: `import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Abrir dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogDescription>Atualize as informações e salve as alterações.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Salvar alterações</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  {
    id: "table",
    label: "Table",
    eyebrow: "listagem",
    description: "Mostra dados tabulares como usuários, pedidos, relatórios e histórico.",
    useCase: "É útil quando a aplicação precisa listar muita informação de forma legível e escaneável.",
    code: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Cargo</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ana Souza</TableCell>
      <TableCell>Front-end</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  {
    id: "select",
    label: "Select",
    eyebrow: "escolha controlada",
    description: "Permite escolher uma opção dentro de listas pequenas ou médias com bom feedback visual.",
    useCase: "Funciona bem para status, plano, categoria e qualquer campo de seleção única.",
    code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select defaultValue="pro">
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Selecione um plano" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="basic">Básico</SelectItem>
    <SelectItem value="pro">Profissional</SelectItem>
    <SelectItem value="enterprise">Enterprise</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    id: "dropdown",
    label: "Dropdown",
    eyebrow: "menu contextual",
    description: "Agrupa ações secundárias sem poluir a tela principal com muitos botões.",
    useCase: "É muito usado em tabelas, cards de usuário e barras de ações com comandos extras.",
    code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Ações</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Editar perfil</DropdownMenuItem>
    <DropdownMenuItem>Duplicar acesso</DropdownMenuItem>
    <DropdownMenuItem>Desativar conta</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  {
    id: "tabs",
    label: "Tabs",
    eyebrow: "troca de contexto",
    description: "Separa áreas de conteúdo em seções rápidas sem sair da mesma tela.",
    useCase: "É uma boa solução quando a página tem vários blocos relacionados, mas não cabe tudo ao mesmo tempo.",
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs className="w-full" defaultValue="overview">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="overview">Visão geral</TabsTrigger>
    <TabsTrigger value="reports">Relatórios</TabsTrigger>
    <TabsTrigger value="team">Equipe</TabsTrigger>
  </TabsList>
  <TabsContent className="rounded-md border p-4 text-sm" value="overview">
    Resumo geral da tela
  </TabsContent>
  <TabsContent className="rounded-md border p-4 text-sm" value="reports">
    Indicadores e relatórios
  </TabsContent>
  <TabsContent className="rounded-md border p-4 text-sm" value="team">
    Membros e permissões
  </TabsContent>
</Tabs>`,
  },
  {
    id: "form",
    label: "Form",
    eyebrow: "validação",
    description: "Combina campos, mensagens e validação em uma estrutura mais previsível.",
    useCase: "Ajuda bastante quando a tela precisa de feedback claro para cadastro, edição e onboarding.",
    code: `import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="preview-email">E-mail</Label>
    <Input id="preview-email" placeholder="voce@empresa.com" />
  </div>
  <div className="flex items-center gap-3">
    <Checkbox id="preview-terms" />
    <Label htmlFor="preview-terms">Aceito os termos</Label>
  </div>
  <Button className="w-full">Criar conta</Button>
</form>`,
  },
  {
    id: "toast",
    label: "Toast / Sonner",
    eyebrow: "feedback imediato",
    description: "Exibe sucesso, erro e avisos curtos sem tirar o usuário do fluxo atual.",
    useCase: "Ótimo para confirmar ações rápidas como salvar, copiar, excluir ou atualizar algo.",
    code: `import { Button } from "@/components/ui/button";
import { toast } from "sonner";

<Button onClick={() => toast.success("Usuário salvo com sucesso")}>
  Mostrar toast
</Button>`,
  },
];

const mainComponents = componentShowcases.map((item) => item.label);

function CodeBlock({ className, code, copyText = code }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success("Código copiado");
    } catch {
      toast.error("Não consegui copiar o código");
    }
  }

  return (
    <div className={cn("relative overflow-hidden rounded-[24px] border border-white/10 bg-[#09120f] shadow-inner", className)}>
      <div className="absolute left-4 top-4 flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
      </div>
      <Button
        className="absolute right-4 top-3 h-9 rounded-full px-3 text-emerald-50 hover:bg-white/8 hover:text-emerald-50"
        size="sm"
        variant="ghost"
        onClick={handleCopy}
      >
        <Copy className="size-4" />
        Copiar
      </Button>
      <pre className="overflow-x-auto p-6 pt-14 text-sm leading-7 text-emerald-50">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SlideShell({ slide, children }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>{slide.category}</Badge>
      </div>
      {children}
    </div>
  );
}

function ComponentSnippetCard({ label, code }) {
  return (
    <div className="h-full overflow-hidden rounded-[24px] border border-white/10 bg-[#09120f] shadow-inner">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>
        <Badge className="bg-white/8 text-white" variant="outline">
          {label}
        </Badge>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-7 text-emerald-50 md:text-[0.95rem]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ComponentPreview({ showcaseId }) {
  switch (showcaseId) {
    case "button":
      return (
        <Button variant="outline">Ver detalhes</Button>
      );
    case "input":
      return <Input placeholder="voce@empresa.com" type="email" />;
    case "card":
      return (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Plano Pro</CardTitle>
            <CardDescription>Mais usado em dashboards</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Inclui métricas, formulários e tabelas.</p>
          </CardContent>
        </Card>
      );
    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Abrir dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar perfil</DialogTitle>
              <DialogDescription>Atualize as informações e salve as alterações.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Salvar alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    case "table":
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ana Souza</TableCell>
              <TableCell>Front-end</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    case "select":
      return (
        <Select defaultValue="pro">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um plano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Básico</SelectItem>
            <SelectItem value="pro">Profissional</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      );
    case "dropdown":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Ações</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Editar perfil</DropdownMenuItem>
            <DropdownMenuItem>Duplicar acesso</DropdownMenuItem>
            <DropdownMenuItem>Desativar conta</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    case "tabs":
      return (
        <Tabs className="w-full" defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão geral</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="rounded-md border p-4 text-sm">
            Resumo geral da tela
          </TabsContent>
          <TabsContent value="reports" className="rounded-md border p-4 text-sm">
            Indicadores e relatórios
          </TabsContent>
          <TabsContent value="team" className="rounded-md border p-4 text-sm">
            Membros e permissões
          </TabsContent>
        </Tabs>
      );
    case "form":
      return (
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preview-email">E-mail</Label>
            <Input id="preview-email" placeholder="voce@empresa.com" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="preview-terms" />
            <Label htmlFor="preview-terms">Aceito os termos</Label>
          </div>
          <Button className="w-full">Criar conta</Button>
        </form>
      );
    case "toast":
      return (
        <Button onClick={() => toast.success("Usuário salvo com sucesso")}>Mostrar toast</Button>
      );
    default:
      return null;
  }
}

export function SlideRenderer({ case3VisibleCards = 0, case5VisibleStages = 0, case11VisibleCards = 0, slide }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginMessage, setLoginMessage] = useState("Demo funcional com o fluxo representado em React.");
  const [variant, setVariant] = useState("default");
  const [activeSetupCommand, setActiveSetupCommand] = useState(setupCommandCards[0].id);
  const [componentsCarouselApi, setComponentsCarouselApi] = useState(null);
  const [activeMainComponent, setActiveMainComponent] = useState(0);

  const activeSetupCard = setupCommandCards.find((item) => item.id === activeSetupCommand) ?? setupCommandCards[0];
  const activeShowcase = componentShowcases[activeMainComponent] ?? componentShowcases[0];

  useEffect(() => {
    if (!componentsCarouselApi) return;

    const syncSelectedSlide = () => {
      setActiveMainComponent(componentsCarouselApi.selectedScrollSnap());
    };

    syncSelectedSlide();
    componentsCarouselApi.on("select", syncSelectedSlide);
    componentsCarouselApi.on("reInit", syncSelectedSlide);

    return () => {
      componentsCarouselApi.off("select", syncSelectedSlide);
      componentsCarouselApi.off("reInit", syncSelectedSlide);
    };
  }, [componentsCarouselApi]);

  function runLoginDemo() {
    if (!loginEmail) {
      setLoginMessage("Digite um e-mail para testar a interação.");
      toast.error("Campo obrigatório: e-mail");
      return;
    }

    setLoginMessage(`Login demo enviado para ${loginEmail}`);
    toast.success("Login demo executado");
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(promptText);
      toast.success("Prompt copiado");
    } catch {
      toast.error("Não consegui copiar o prompt");
    }
  }

  switch (slide.id) {
    case 1:
      return (
        <SlideShell slide={slide}>
          <Card className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(170,255,47,0.22),_transparent_28%),linear-gradient(135deg,#052824_0%,#0a3b35_45%,#082925_100%)] text-white">
            <CardContent className="grid min-h-[70vh] place-items-center px-10 py-16">
              <div className="flex max-w-4xl flex-col items-center gap-6 text-center">
                <div className="presentation-mark" />
                <Badge className="bg-white/10 text-white">Shadcn/UI</Badge>
                <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
                  Componentes de UI modernos para projetos React
                </h1>
                <p className="max-w-3xl text-lg text-white/78 md:text-2xl">
                  Entender o que é, por que usar, como funciona na prática e como a IA pode ajudar a construir telas mais rapidamente.
                </p>
                <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/8 px-6 py-5 text-center backdrop-blur">
                  <span>Hoje vamos sair do conceito para a prática.</span>
                  <span>Cada slide agora é uma página React usando componentes no estilo Shadcn.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );
    case 2:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">O que é Shadcn/UI?</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Uma coleção de componentes para React muito usada com Next.js, Vite e Tailwind CSS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 text-base leading-7 text-[var(--muted-foreground)] md:text-lg">
                <p>O ponto mais importante é que ele não funciona como uma biblioteca tradicional escondida no projeto.</p>
                <p>Quando você adiciona um componente, o código entra na base da aplicação e passa a ser responsabilidade da owner.</p>
                <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-5 text-foreground">
                  <strong>Ideia-chave:</strong> o componente vira código do próprio projeto, o que dá mais controle para alterar visual, estrutura e comportamento.
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col">
              <CodeBlock code={`npx shadcn@latest init && npx shadcn@latest add button`} />
              <div className="w-[100%]  flex-col mx-auto">
                <CardHeader className="px-0">
                  <CardTitle className="text-left text-2xl tracking-[-0.05em]">Stacks</CardTitle>
                </CardHeader>
                <div className="flex justify-center relative">
                  <Carousel className="w-[100%]">
                    <CarouselContent>
                      {stacks.map((stack, index) => {
                        const Icon = stack.icon
                        return (
                          <CarouselItem key={index}>
                            <Card className="bg-zinc-950 border-zinc-800 text-zinc-50 overflow-hidden">
                              <CardContent className="flex flex-col p-6 gap-4">
                                {/* Cabeçalho da Stack com Ícone */}
                                <div className="flex items-center gap-3">
                                  <Icon className={`h-8 w-8 ${stack.color} animate-pulse`} />
                                  <span className="font-semibold text-lg tracking-tight">{stack.name}</span>
                                </div>


                              </CardContent>
                            </Card>
                          </CarouselItem>
                        )
                      })}
                    </CarouselContent>

                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </SlideShell>
      );
    case 3:
      return (
        <SlideShell slide={slide}>
          <Card>
            <CardHeader className="max-w-5xl pb-4">
              <CardTitle className="text-3xl tracking-[-0.05em] md:text-4xl">
                Problema das interfaces repetitivas
              </CardTitle>

              <CardDescription className="text-sm md:text-base"></CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 h-full">
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1fr_1fr]">
                <FlipCard
                  back={
                    <Card className="h-full overflow-hidden bg-[var(--surface-2)] text-foreground shadow-none">
                      <CardHeader className="p-5 pb-2">
                        <CardTitle className="text-lg">Fluxo comum</CardTitle>
                        <CardDescription className="text-xs leading-5">
                          O trabalho repetitivo antes de criar a regra real da tela.
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-1.5 px-3 pb-4 text-[30px] leading-10">
                        {manualComponentSteps.map((step, index) => (
                          <div
                            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5"
                            key={step}
                          >
                            <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-400 text-[10px] leading-none font-semibold text-emerald-950">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  }
                  className="h-[600px]"
                  flipped={case3VisibleCards >= 1}
                  front={
                    <Card className="grid h-full place-items-center overflow-hidden bg-[var(--surface-2)] p-5 text-center text-foreground shadow-none">
                      <CardTitle className="text-2xl tracking-[-0.04em] md:text-3xl">
                        Fluxo comum
                      </CardTitle>
                    </Card>
                  }
                />

                <FlipCard
                  back={
                    <Card className="h-full overflow-hidden bg-rose-300/92 text-rose-950 shadow-none">
                      <CardHeader className="p-5 pb-2">
                        <CardTitle className="text-lg">Sem padronização</CardTitle>
                        <CardDescription className="text-xs leading-5 text-rose-950/80">
                          Cada componente nasce de um jeito.
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-1.5 px-3 pb-4 text-[30px] leading-10">
                        <div className="rounded-xl bg-rose-950/10 px-3 py-2 font-mono text-[30px]">
                          Button ≠ Button ≠ Button
                        </div>

                        <div className="grid gap-2">
                          {noPatternProblems.map((problem) => (
                            <div className="rounded-xl bg-rose-950/10 px-3 py-2" key={problem}>
                              {problem}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-1 text-lg font-semibold">
                        A interface funciona, mas fica mais difícil evoluir sem quebrar padrão.
                      </CardFooter>
                    </Card>
                  }
                  className="h-[600px]"
                  flipped={case3VisibleCards >= 2}
                  front={
                    <Card className="grid h-full place-items-center overflow-hidden bg-rose-300/92 p-5 text-center text-rose-950 shadow-none">
                      <CardTitle className="text-2xl tracking-[-0.04em] md:text-3xl">
                        Sem padronização
                      </CardTitle>
                    </Card>
                  }
                />

                <FlipCard
                  back={
                    <Card className="h-full overflow-hidden bg-emerald-400/90 text-emerald-950 shadow-none">
                      <CardHeader className="p-5 pb-2">
                        <CardTitle className="text-lg">Com shadcn/ui</CardTitle>
                        <CardDescription className="text-xs leading-5 text-emerald-950/80">
                          Você parte de uma base pronta e editável.
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-1.5 px-3 pb-4 text-[30px] leading-10">
                        <div className="rounded-xl bg-emerald-950/10 px-3 py-2 font-mono text-[30px]">
                          npx shadcn@latest add button
                        </div>

                        <div className="grid gap-2">
                          {shadcnBenefits.map((benefit) => (
                            <div className="rounded-xl bg-emerald-950/10 px-3 py-2" key={benefit}>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="text-lg font-semibold">
                        Menos repetição. Mais padrão. Mais controle.
                      </CardFooter>
                    </Card>
                  }
                  className="h-[600px]"
                  flipped={case3VisibleCards >= 3}
                  front={
                    <Card className="grid h-full place-items-center overflow-hidden bg-emerald-400/90 p-5 text-center text-emerald-950 shadow-none">
                      <CardTitle className="text-2xl tracking-[-0.04em] md:text-3xl">
                        Com shadcn
                      </CardTitle>
                    </Card>
                  }
                />
              </div>

              <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-[20px] leading-6 text-[var(--muted-foreground)]">
                <strong className="text-foreground">Ideia central:</strong>{" "}
                o shadcn/ui não resolve a regra de negócio. Ele reduz o trabalho repetitivo da interface, entregando uma base visual pronta para o desenvolvedor adaptar.
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );

    case 4:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] w-full min-w-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Como ele funciona</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  "Inicializa o projeto com a CLI.",
                  "Configura aliases no jsconfig/tsconfig para definir onde os componentes ficarão.",
                  "Adiciona componentes individualmente.",
                  "Customiza e mantém esses componentes no projeto.",
                ].map((step, index) => (
                  <div
                    className="flex items-start gap-4 rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-5"
                    key={step}
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-400 font-semibold text-emerald-950">
                      {index + 1}
                    </div>

                    <p className="text-base leading-7 text-[var(--muted-foreground)] md:text-lg">
                      {step}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex flex-col justify-center relative bg-[var(--surface-1)] w-full max-w-full min-w-0 overflow-hidden">
              <Carousel className="w-full min-w-0">
                <CarouselContent className="w-full min-w-0">
                  <CarouselItem className="w-full min-w-0">
                    <div className="flex flex-col gap-2 p-2 w-full min-w-0">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <span>Passo 1: Inicializar CLI</span>
                      </div>
                      <div className="w-full min-w-0 overflow-x-auto">
                        <CodeBlock
                          code={`$ npx shadcn@latest init\n\n# Perguntas de inicialização da CLI:\n✔ Which style would you like to use? › Default\n✔ Which color would you like to use as the base color? › Zinc\n✔ Would you like to use CSS variables for colors? › Yes\n✔ Where is your global CSS file? › app/globals.css\n✔ Do you want to use Tailwind v4.0? › Yes\n✔ Where is your tailwind.config.js located? › tailwind.config.ts\n✔ Configure the import alias for components: › @/components\n✔ Configure the import alias for utils: › @/lib/utils\n✔ Write configuration to components.json? › Yes`}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="w-full min-w-0">
                    <div className="flex flex-col gap-2 p-2 w-full min-w-0">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <span>Passo 2: Configurar Alias (jsconfig/tsconfig)</span>
                      </div>

                      <div className="w-full min-w-0 overflow-x-auto">
                        <CodeBlock
                          code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"]
    }
  }
}`}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="w-full min-w-0">
                    <div className="flex flex-col gap-2 p-2 w-full min-w-0">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <span>Passo 3: Baixar Componente</span>
                      </div>
                      <div className="w-full min-w-0 overflow-x-auto">
                        <CodeBlock
                          code={`$ npx shadcn@latest add button\n\n--Componente vai aparecer em:\ncomponents/ui/button.tsx`}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="w-full min-w-0">
                    <div className="flex flex-col gap-2 p-2 w-full min-w-0">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <span>Passo 3: Customizar (components/ui/button.tsx)</span>
                      </div>
                      <div className="w-full min-w-0 overflow-x-auto">
                        <CodeBlock
                          code={`const buttonVariants = cva(\n  "inline-flex items-center justify-center...",\n  {\n    variants: {\n      variant: {\n        default: "bg-emerald-500 text-white hover:bg-emerald-600", \n        outline: "border border-input bg-background",\n        personalizada: "{cololo oque eu quiser aqui}",\n      }\n    }\n  }\n)`}
                        />
                      </div>
                    </div>
                  </CarouselItem>

                  <CarouselItem className="w-full min-w-0">
                    <div className="flex flex-col gap-2 p-2 w-full min-w-0">
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <span>Passo 4: Usar no App (app/page.tsx)</span>
                      </div>
                      <div className="w-full min-w-0 overflow-x-auto">
                        <CodeBlock
                          code={`import { Button } from "@/components/ui/button"\n\nexport default function Page() {\n  return (\n    <div className="p-4">\n      <Button variant="default">Clique Aqui</Button>\n    </div>\n  )\n}`}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>

                <CarouselPrevious className="bg-white text-black hover:bg-zinc-200 -left-6 hidden sm:inline-flex" />
                <CarouselNext className="bg-white text-black hover:bg-zinc-200 -right-6 hidden sm:inline-flex" />
              </Carousel>
            </div>
          </div>
        </SlideShell>
      )


    case 5:
      return (
        <SlideShell slide={slide}>
          <Card>
            <CardHeader className="max-w-5xl pb-4">
              <CardTitle className="text-3xl tracking-[-0.05em] md:text-3xl">
                Tecnologias usadas
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {techRows.map((row, rowIndex) => (
                  <div className="grid gap-4 lg:grid-cols-3" key={rowIndex}>
                    {row.map((tech) => (
                      <FlipCard
                        back={
                          <Card className="h-full overflow-hidden bg-[var(--surface-2)] shadow-none">
                            <CardHeader className="p-5 pb-3">
                              <div className="flex items-center justify-between gap-3">
                                <CardTitle className="text-[20px]">{tech.name}</CardTitle>
                                <Badge variant="muted">{tech.role}</Badge>
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-3 px-5 pb-5">
                              <p className="text-lg leading-7 text-[var(--muted-foreground)]">
                                {tech.description}
                              </p>

                              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-mono text-xs text-[var(--muted-foreground)]">
                                {tech.example}
                              </div>
                            </CardContent>
                          </Card>
                        }
                        className="h-[180px]"
                        flipped={case5VisibleStages >= tech.stage}
                        front={
                          <Card className="grid h-full place-items-center bg-[var(--surface-2)] p-5 text-center shadow-none">
                            <div className="space-y-3">
                              <Badge variant="outline">{tech.role}</Badge>
                              <CardTitle className="text-2xl tracking-[-0.04em]">{tech.name}</CardTitle>
                            </div>
                          </Card>
                        }
                        key={tech.name}
                      />
                    ))}
                  </div>
                ))}

                <div className="grid gap-4 lg:grid-cols-2">
                  <FlipCard
                    back={
                      <Card className="h-full overflow-hidden bg-[var(--surface-2)] shadow-none">
                        <CardHeader className="p-5 pb-3">
                          <CardTitle className="text-xl">Como as peças se encaixam</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3 px-5 pb-5 text-[20px] leading-6 text-[var(--muted-foreground)]">
                          {stackCompositionSteps.map((step) => (
                            <div className="rounded-xl bg-[var(--surface)] px-4 py-3" key={step}>
                              {step}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    }
                    className="h-[370px]"
                    flipped={case5VisibleStages >= 7}
                    front={
                      <Card className="grid h-full place-items-center bg-[var(--surface-2)] p-5 text-center shadow-none">
                        <div className="space-y-3">
                          <Badge variant="outline">Fluxo</Badge>
                          <CardTitle className="text-2xl tracking-[-0.04em]">
                            Como as peças se encaixam
                          </CardTitle>
                        </div>
                      </Card>
                    }
                  />

                  <FlipCard
                    back={<CodeBlock className="h-full " code={stackCompositionSnippet} />}
                    className="h-[370px]"
                    flipped={case5VisibleStages >= 7}
                    front={
                      <Card className="grid h-full place-items-center border-white/10 bg-[#09120f] p-5 text-center text-emerald-50 shadow-none">
                        <div className="space-y-3">
                          <Badge className="border-white/10 bg-white/8 text-white">Código</Badge>
                          <CardTitle className="text-2xl tracking-[-0.04em] text-emerald-50">
                            Exemplo em código
                          </CardTitle>
                        </div>
                      </Card>
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );
    case 6:
      return (
        <SlideShell slide={slide}>
          <Card>
            <CardHeader className="space-y-4">
              <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">
                Comparação com Bootstrap e Material UI
              </CardTitle>

              <p className="max-w-3xl text-base leading-7 text-[var(--muted-foreground)] md:text-lg">
                Cada ferramenta resolve um problema diferente. Algumas focam em velocidade e componentes prontos,
                enquanto outras priorizam liberdade total de customização.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="overflow-hidden rounded-[28px] border border-[var(--border)]">
                <div className="grid grid-cols-4 bg-[#072823] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  <span>Ferramenta</span>
                  <span>Como funciona</span>
                  <span>Melhor caso</span>
                  <span>Controle</span>
                </div>

                {[
                  {
                    name: "Bootstrap",
                    model: "Classes CSS prontas",
                    use: "Projetos rápidos e simples",
                    control: "Médio",
                    desc: "Mais tradicional e simples de começar.",
                    highlight: false,
                  },
                  {
                    name: "Material UI",
                    model: "Biblioteca de componentes React",
                    use: "Dashboards e sistemas corporativos",
                    control: "Médio",
                    desc: "Grande ecossistema e produtividade alta.",
                    highlight: false,
                  },
                  {
                    name: "Shadcn/UI ",
                    model: "Copia os componentes para o projeto",
                    use: "Interfaces modernas e customizadas ( com Tawilnd)",
                    control: "Alto",
                    desc: "Mais nativo ao projeto e totalmente editável.",
                    highlight: true,
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`grid grid-cols-4 gap-4 border-t border-[var(--border)] px-6 py-5 ${item.highlight
                      ? "bg-emerald-400/90 text-emerald-950"
                      : "bg-[var(--surface)] text-[var(--muted-foreground)]"
                      }`}
                  >
                    <div className="space-y-1">
                      <p
                        className={`font-semibold ${item.highlight ? "text-emerald-950" : "text-foreground"
                          }`}
                      >
                        {item.name}
                      </p>

                      <p className="text-sm leading-6 opacity-80">
                        {item.desc}
                      </p>
                    </div>

                    <div className="text-sm leading-6">
                      {item.model}
                    </div>

                    <div className="text-sm leading-6">
                      {item.use}
                    </div>

                    <div className="font-medium">
                      {item.control}
                    </div>
                  </div>
                ))}
              </div>



              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-5 text-base leading-7 text-[var(--muted-foreground)] md:text-lg">
                Enquanto Bootstrap e Material UI funcionam como bibliotecas externas,
                o Shadcn/UI entrega os componentes diretamente no projeto.
                Na prática, isso significa menos dependência visual e mais liberdade para adaptar a interface ao design da aplicação.
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );
    case 7:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Instalação e estrutura</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {setupCommandCards.map((item, index) => {
                    const isActive = item.id === activeSetupCard.id;

                    return (
                      <Button
                        className={cn(
                          "h-auto items-start justify-between rounded-[24px] border px-4 py-4 text-left transition-all md:px-5",
                          isActive
                            ? "border-emerald-300/35 bg-emerald-300/10 text-foreground shadow-[0_0_0_1px_rgba(110,231,183,0.18)]"
                            : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted-foreground)] hover:bg-[var(--surface)]",
                        )}
                        key={item.id}
                        onClick={() => setActiveSetupCommand(item.id)}
                        variant="ghost"
                      >
                        <div className="grid gap-2">
                          <span className="text-[0.80rem] uppercase tracking-[0.28em] text-current opacity-70">Passo 0{index + 1}</span>
                          <code className="font-mono text-lg text-current md:text-[20px] font-bold ">{item.command}</code>
                        </div>
                        <div className="flex items-center gap-2 pl-4 text-[0.68rem] uppercase tracking-[0.24em] text-current opacity-70">
                          <span>{isActive ? "ativo" : item.eyebrow}</span>
                          <ChevronRight className={cn("size-4 transition-transform", isActive && "translate-x-1")} />
                        </div>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
            <Card className="overflow-hidden bg-[#09120f] text-emerald-50">
              <CardHeader className="border-b border-white/10 pb-6">
                <CardTitle className="text-4xl md:text-3xl">{activeSetupCard.title}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 p-6">
                <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#06100d]">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
                    <span className="text-[0.68rem] uppercase tracking-[0.28em] text-emerald-300">Console</span>
                    <code className="text-xs text-emerald-50/60">{activeSetupCard.command}</code>
                  </div>
                  <pre className="overflow-x-auto p-5 text-sm leading-7 text-emerald-50 md:text-[0.95rem]">
                    <code>{activeSetupCard.console}</code>
                  </pre>
                </div>
                <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
                  <div className="rounded-[24px] border border-white/10 bg-[#06100d] p-5">
                    <span className="text-[0.68rem] uppercase tracking-[0.28em] text-emerald-300">O que ele cria</span>
                    <div className="mt-4 grid gap-3 text-sm leading-6 text-emerald-50/82 md:text-base">
                      {activeSetupCard.created.map((item) => (
                        <div className="flex items-start gap-3" key={item}>
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-[#06100d] p-5">
                    <span className="text-[0.68rem] uppercase tracking-[0.28em] text-emerald-300">Estrutura afetada</span>
                    <pre className="mt-4 overflow-x-auto text-sm leading-7 text-emerald-50 md:text-base">
                      <code>{activeSetupCard.structure}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideShell>
      );
    case 8:
      return (
        <SlideShell slide={slide}>
          <Card>
            <CardHeader className="gap-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-4xl space-y-2">
                  <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Componentes principais</CardTitle>
                </div>
                <div className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)]">
                  {String(activeMainComponent + 1).padStart(2, "0")} / {String(componentShowcases.length).padStart(2, "0")}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {mainComponents.map((item, index) => (
                  <button
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
                      index === activeMainComponent
                        ? "border-transparent bg-emerald-400 text-emerald-950"
                        : "border-[var(--border)] bg-transparent text-foreground hover:bg-[var(--surface-2)]",
                    )}
                    key={item}
                    onClick={() => componentsCarouselApi?.scrollTo(index)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <PresentationCarousel className="w-full" opts={{ align: "start" }} setApi={setComponentsCarouselApi}>
                <PresentationCarouselContent>
                  {componentShowcases.map((item, index) => (
                    <PresentationCarouselItem key={item.id}>
                      <div className="grid gap-5 xl:grid-cols-[0.96fr_1.04fr]">
                        <ComponentSnippetCard code={item.code} label={item.label} />
                        <Card className="h-full bg-[var(--surface-2)] shadow-none">
                          <CardHeader className="gap-1 border-b border-[var(--border)]">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div className="space-y-2">
                                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-emerald-600">
                                  {item.eyebrow}
                                </span>
                                <CardTitle className="text-2xl md:text-[2rem]">{item.label}</CardTitle>
                              </div>
                              <div className="rounded-full border border-[var(--border)] bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                                Face {String(index + 1).padStart(2, "0")}
                              </div>
                            </div>
                            <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="grid h-[50%] gap-5 p-6">
                            <div className="rounded-[24px] border border-[var(--border)] bg-background p-4">
                              <ComponentPreview showcaseId={item.id} />
                            </div>
                            <p className="text-sm leading-7 text-[var(--muted-foreground)]">{item.useCase}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </PresentationCarouselItem>
                  ))}
                </PresentationCarouselContent>
                <div className="mt-5 flex flex-col gap-4 border-t border-[var(--border)] pt-5 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{activeShowcase.label}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Use os labels acima ou as setas para navegar pelos componentes básicos do ecossistema Shadcn.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PresentationCarouselPrevious className="static left-auto top-auto translate-y-0" />
                    <PresentationCarouselNext className="static right-auto top-auto translate-y-0" />
                  </div>
                </div>
              </PresentationCarousel>
            </CardContent>
          </Card>
        </SlideShell>
      );
    case 9:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card>
              <CardHeader className="space-y-4">
                <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">
                  Estilização e Customização
                </CardTitle>

                <CardDescription className="text-base leading-7 md:text-lg">
                  O grande diferencial do Shadcn/UI é que os componentes pertencem ao projeto.
                  Isso significa que a customização acontece diretamente no código-fonte do componente,
                  sem depender de overrides complexos ou estilos escondidos de bibliotecas externas.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => setVariant("default")}>
                      Default
                    </Button>

                    <Button
                      onClick={() => setVariant("outline")}
                      variant="outline"
                    >
                      Outline
                    </Button>

                    <Button
                      onClick={() => setVariant("destructive")}
                      variant="destructive"
                    >
                      Destructive
                    </Button>

                    <Button
                      onClick={() => setVariant("secondary")}
                      variant="secondary"
                    >
                      Secondary
                    </Button>

                  </div>

                  <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 mb-3">
                      Variante Atual
                    </p>

                    <Button
                      onClick={() => setVariant("minhaVariante")}
                      variant="minhaVariante"
                    >
                      MinhaVariante
                    </Button>

                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      Cada variante altera o visual utilizando classes Tailwind
                      definidas diretamente no componente.
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-5 text-base leading-7 text-[var(--muted-foreground)]">
                  Em bibliotecas tradicionais, normalmente você customiza componentes através de temas,
                  sobrescritas de CSS ou propriedades específicas da biblioteca.
                  No Shadcn/UI, a estilização acontece diretamente no componente React.
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 px-5 py-4">
                <p className="text-sm uppercase tracking-[0.18em] text-emerald-700">
                  components/ui/button.tsx
                </p>

                <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                  Veja o exemplo desse exato projeto: O botão pode ser alterado diretamente na origem.
                  Qualquer mudança feita aqui afeta automaticamente toda a aplicação.
                </p>
              </div>

              <CodeBlock
                code={`// components/ui/button.tsx

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-500 text-white hover:bg-emerald-600",

        destructive:
          "bg-red-500 text-white hover:bg-red-600",

        outline:
          "border border-border bg-transparent hover:bg-accent",

        secondary:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",

         minhaVariante:
          "bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-lime-400 text-black borde
           border-white/20 shadow-[0_0_25px_rgba(168,85,247,0.6)]",
      },
      }
    }
  }
)`}
              />

              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-5">
                <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                  Em vez de “configurar uma biblioteca”, o Shadcn/UI permite editar o componente como qualquer outro arquivo React do projeto.
                  Isso deixa a experiência mais previsível, nativa e flexível.
                </p>
              </div>
            </div>
          </div>
        </SlideShell>
      );
    case 10:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">
                  IA + Shadcn/UI
                </CardTitle>

                <CardDescription className="text-base md:text-lg">
                  O Shadcn/UI funciona muito bem com IA porque segue um padrão consistente,
                  previsível e “legível por máquina”, já que os componentes estão dentro do projeto
                  e não escondidos em uma biblioteca fechada.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <Textarea readOnly value={promptText} />
              </CardContent>
            </Card>

            <Card className="bg-[var(--surface-2)] shadow-none">
              <CardHeader>
                <CardTitle className="text-3xl tracking-[-0.03em]">
                  Por que IA funciona melhor com Shadcn
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3">
                {[
                  "Componentes seguem padrão consistente (variants, sizes, props claras)",
                  "Código está dentro do projeto (sem abstração escondida)",
                  "Tailwind deixa o estilo explícito e previsível",
                  "Estrutura simples facilita geração automática de UI",
                  "Menos conflito entre estilo e lógica",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-[var(--surface)] px-4 py-3"
                  >
                    <div className="mt-1 size-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-[var(--muted-foreground)]">{item}</span>
                  </div>
                ))}

                <Separator className="my-2" />

                <div className="rounded-[20px] border border-emerald-400/30 bg-emerald-400/10 p-4 text-[var(--muted-foreground)]">
                  <strong className="text-emerald-700">Insight real:</strong>{" "}
                  não é coincidência plataformas como a Lovable conseguirem gerar interfaces tão boas,
                  elas se beneficiam exatamente desse padrão previsível do Shadcn/UI.
                </div>

                <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--muted-foreground)]">
                  Quando o código é limpo, modular e consistente, a IA deixa de “chutar” e passa a
                  realmente compor interfaces de forma estruturada.
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideShell>
      );
    case 11:
      return (
        <SlideShell slide={slide}>
          <Card>
            <CardHeader className="max-w-5xl pb-4">
              <CardTitle className="text-3xl tracking-[-0.05em] md:text-4xl">Vantagens e limitações</CardTitle>
              <CardDescription className="text-sm md:text-base">
                O Shadcn acelera muito a construção da interface, mas cobra maturidade técnica da equipe para manter padrão e organização.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <FlipCard
                  back={
                    <Card className="h-full overflow-hidden bg-emerald-400/90 text-emerald-950 shadow-none">
                      <CardHeader className="p-5 pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <CardTitle className="text-xl">Vantagens</CardTitle>
                          <Badge className="bg-emerald-950/10 text-emerald-950" variant="muted">
                            pontos fortes
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="grid gap-2 px-5 pb-5 text-sm leading-5 md:text-[15px]">
                        {slide11Advantages.map((item) => (
                          <div className="flex items-start gap-3 rounded-xl bg-emerald-950/10 px-3 py-2" key={item}>
                            <Check className="mt-0.5 size-4 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  }
                  className="h-[500px]"
                  flipped={case11VisibleCards >= 1}
                  front={
                    <Card className="grid h-full place-items-center overflow-hidden bg-emerald-400/90 p-5 text-center text-emerald-950 shadow-none">
                      <div className="space-y-3">
                        <Badge className="bg-emerald-950/10 text-emerald-950" variant="muted">
                          pontos fortes
                        </Badge>
                        <CardTitle className="text-2xl tracking-[-0.04em] md:text-3xl">Vantagens</CardTitle>
                      </div>
                    </Card>
                  }
                />

                <FlipCard
                  back={
                    <Card className="h-full overflow-hidden bg-rose-300/92 text-rose-950 shadow-none">
                      <CardHeader className="p-5 pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <CardTitle className="text-xl">Limitações</CardTitle>
                          <Badge className="bg-rose-950/10 text-rose-950" variant="muted">
                            trade-offs
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="grid gap-2 px-5 pb-5 text-sm leading-5 md:text-[15px]">
                        {slide11Limitations.map((item) => (
                          <div className="flex items-start gap-3 rounded-xl bg-rose-950/10 px-3 py-2" key={item}>
                            <ChevronRight className="mt-0.5 size-4 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  }
                  className="h-[500px]"
                  flipped={case11VisibleCards >= 2}
                  front={
                    <Card className="grid h-full place-items-center overflow-hidden bg-rose-300/92 p-5 text-center text-rose-950 shadow-none">
                      <div className="space-y-3">
                        <Badge className="bg-rose-950/10 text-rose-950" variant="muted">
                          trade-offs
                        </Badge>
                        <CardTitle className="text-2xl tracking-[-0.04em] md:text-3xl">Limitações</CardTitle>
                      </div>
                    </Card>
                  }
                />
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );
    case 12:
      return (
        <SlideShell slide={slide}>
          <Card className="overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(242,239,120,0.18),_transparent_32%),linear-gradient(135deg,#052824_0%,#0a3b35_45%,#082925_100%)] text-white">
            <CardContent className="grid min-h-[70vh] place-items-center px-10 py-16">
              <div className="flex max-w-4xl flex-col items-center gap-6 text-center">
                <div className="presentation-mark" />
                <h2 className="text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Conclusão</h2>
                <p className="max-w-3xl text-lg text-white/78 md:text-2xl">
                  Shadcn/UI é uma forma moderna de construir interfaces em React com componentes prontos, mas sem prender o projeto em uma biblioteca fechada.
                </p>
                <div className="max-w-3xl rounded-[28px] border border-white/10 bg-emerald-400 px-8 py-6 text-xl font-semibold text-emerald-950 md:text-3xl">
                  Ele não substitui conhecimento de frontend. Ele acelera quem já sabe o que está fazendo.
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );
    default:
      return null;
  }
}
