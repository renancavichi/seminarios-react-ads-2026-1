"use client";

import {
  Accordion,
  Checkbox,
  Dialog,
  Field,
  Input,
  NumberField,
  Popover,
  Progress,
  Select,
  Slider,
  Switch,
  Tabs,
  Tooltip,
} from "@base-ui/react";

const cards = [
  {
    eyebrow: "Exemplo 01",
    title: "Preferências do produto",
    description: "Tabs, select, switches e sliders em um modal de ajustes.",
    accent: "bg-emerald-500",
    trigger: "Abrir preferências",
  },
  {
    eyebrow: "Exemplo 02",
    title: "Cadastro inteligente",
    description: "Fields acessíveis, input, checkbox e number field.",
    accent: "bg-sky-500",
    trigger: "Abrir cadastro",
  },
  {
    eyebrow: "Exemplo 03",
    title: "Central de insights",
    description: "Accordion, tooltip, popover e progress para conteúdo rico.",
    accent: "bg-rose-500",
    trigger: "Abrir insights",
  },
];

const plans = {
  starter: "Starter",
  growth: "Growth",
  enterprise: "Enterprise",
};

export default function Home() {
  return (
    <Tooltip.Provider delay={120}>
      <main className="min-h-screen bg-[#f6f5f1] text-zinc-950">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-5 border-b border-zinc-300 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Base UI playground
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-normal text-zinc-950 sm:text-6xl">
                Alguns exemplos de componentes construídos a partir de Base UI Components.
              </h1>
            </div>
            <p className="max-w-md text-base leading-7 text-zinc-600">
              Cada card abre uma experiência diferente usando primitivas da
              Base UI com estilos próprios, estados acessíveis e interações
              compostas.
            </p>
          </header>

          <div className="grid gap-5 lg:grid-cols-3">
            <PreferenceDialog card={cards[0]} />
            <SignupDialog card={cards[1]} />
            <InsightsDialog card={cards[2]} />
          </div>
        </section>
      </main>
    </Tooltip.Provider>
  );
}

function PreferenceDialog({ card }: { card: (typeof cards)[number] }) {
  return (
    <Dialog.Root>
      <DemoCard card={card} />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-zinc-950/45 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 max-h-[92vh] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[8px] bg-white p-5 shadow-2xl outline outline-1 outline-zinc-200 transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 sm:p-6">
          <ModalHeader
            eyebrow="Preferências"
            title="Mesa de controle do produto"
            description="Um Dialog com Tabs internas para organizar estados, seletores e controles de densidade."
          />

          <Tabs.Root defaultValue="visual" className="mt-6">
            <Tabs.List className="relative grid grid-cols-3 rounded-[8px] border border-zinc-200 bg-zinc-100 p-1">
              <Tabs.Tab
                value="visual"
                className="relative z-10 h-10 rounded-[6px] px-3 text-sm font-semibold text-zinc-600 outline-none transition-colors data-[selected]:text-zinc-950"
              >
                Visual
              </Tabs.Tab>
              <Tabs.Tab
                value="fluxo"
                className="relative z-10 h-10 rounded-[6px] px-3 text-sm font-semibold text-zinc-600 outline-none transition-colors data-[selected]:text-zinc-950"
              >
                Fluxo
              </Tabs.Tab>
              <Tabs.Tab
                value="alertas"
                className="relative z-10 h-10 rounded-[6px] px-3 text-sm font-semibold text-zinc-600 outline-none transition-colors data-[selected]:text-zinc-950"
              >
                Alertas
              </Tabs.Tab>
              <Tabs.Indicator className="absolute left-[var(--active-tab-left)] top-[var(--active-tab-top)] h-[var(--active-tab-height)] w-[var(--active-tab-width)] rounded-[6px] bg-white shadow-sm transition-all duration-200" />
            </Tabs.List>

            <Tabs.Panel value="visual" className="pt-6 outline-none">
              <div className="grid gap-5 md:grid-cols-[1fr_220px]">
                <div className="space-y-5">
                  <Select.Root defaultValue="growth" items={plans}>
                    <Select.Label className="text-sm font-semibold text-zinc-700">
                      Plano ativo
                    </Select.Label>
                    <Select.Trigger className="mt-2 flex h-12 w-full items-center justify-between rounded-[8px] border border-zinc-300 bg-white px-4 text-left font-medium outline-none transition focus-visible:border-zinc-950">
                      <Select.Value />
                      <Select.Icon className="text-zinc-500">⌄</Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner sideOffset={8}>
                        <Select.Popup className="w-[var(--anchor-width)] rounded-[8px] border border-zinc-200 bg-white p-1 shadow-xl outline-none">
                          {Object.entries(plans).map(([value, label]) => (
                            <Select.Item
                              key={value}
                              value={value}
                              className="flex h-10 cursor-default items-center justify-between rounded-[6px] px-3 text-sm outline-none data-[highlighted]:bg-zinc-100"
                            >
                              <Select.ItemText>{label}</Select.ItemText>
                              <Select.ItemIndicator>✓</Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <ToggleRow label="Modo compacto" defaultChecked />
                    <ToggleRow label="Contraste elevado" />
                  </div>
                </div>

                <div className="rounded-[8px] border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-semibold text-zinc-800">
                    Saúde da interface
                  </p>
                  <Progress.Root value={72} className="mt-4">
                    <div className="flex items-center justify-between text-sm text-zinc-600">
                      <Progress.Label>Entrega</Progress.Label>
                      <Progress.Value />
                    </div>
                    <Progress.Track className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200">
                      <Progress.Indicator className="h-full w-[72%] rounded-full bg-emerald-500" />
                    </Progress.Track>
                  </Progress.Root>
                </div>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="fluxo" className="pt-6 outline-none">
              <Slider.Root
                defaultValue={[18, 78]}
                min={0}
                max={100}
                step={1}
                minStepsBetweenValues={8}
                className="grid gap-4"
              >
                <div className="flex items-center justify-between">
                  <Slider.Label className="text-sm font-semibold text-zinc-700">
                    Janela de revisão
                  </Slider.Label>
                  <Slider.Value className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700" />
                </div>
                <Slider.Control className="relative flex h-8 touch-none items-center">
                  <Slider.Track className="relative h-2 w-full rounded-full bg-zinc-200">
                    <Slider.Indicator className="absolute h-full rounded-full bg-emerald-500" />
                    <Slider.Thumb
                      index={0}
                      className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-zinc-950 shadow outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                    />
                    <Slider.Thumb
                      index={1}
                      className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-zinc-950 shadow outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                    />
                  </Slider.Track>
                </Slider.Control>
              </Slider.Root>
            </Tabs.Panel>

            <Tabs.Panel value="alertas" className="pt-6 outline-none">
              <div className="grid gap-3">
                <ToggleRow label="Enviar resumo diário" defaultChecked />
                <ToggleRow label="Avisar em anomalias" defaultChecked />
                <ToggleRow label="Pausar notificações em foco" />
              </div>
            </Tabs.Panel>
          </Tabs.Root>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SignupDialog({ card }: { card: (typeof cards)[number] }) {
  return (
    <Dialog.Root>
      <DemoCard card={card} />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-zinc-950/45 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 max-h-[92vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[8px] bg-white p-5 shadow-2xl outline outline-1 outline-zinc-200 transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 sm:p-6">
          <ModalHeader
            eyebrow="Formulário"
            title="Cadastro com campos compostos"
            description="Field conecta label, descrição, validação nativa e controles sem impor visual."
          />

          <form className="mt-6 grid gap-5">
            <Field.Root name="project" className="grid gap-2">
              <Field.Label className="text-sm font-semibold text-zinc-700">
                Nome do workspace
              </Field.Label>
              <Input
                required
                className="h-12 rounded-[8px] border border-zinc-300 px-4 outline-none transition placeholder:text-zinc-400 focus:border-sky-600"
                placeholder="Base UI Lab"
              />
              <Field.Description className="text-sm text-zinc-500">
                Use um nome curto para aparecer nos menus e relatórios.
              </Field.Description>
              <Field.Error className="text-sm font-medium text-rose-600" />
            </Field.Root>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field.Root name="members" className="grid gap-2">
                <Field.Label className="text-sm font-semibold text-zinc-700">
                  Assentos iniciais
                </Field.Label>
                <NumberField.Root
                  defaultValue={8}
                  min={1}
                  max={80}
                  className="grid gap-2"
                >
                  <NumberField.Group className="flex h-12 overflow-hidden rounded-[8px] border border-zinc-300 bg-white focus-within:border-sky-600">
                    <NumberField.Decrement className="w-12 border-r border-zinc-200 text-lg font-semibold text-zinc-600">
                      -
                    </NumberField.Decrement>
                    <NumberField.Input className="min-w-0 flex-1 text-center font-semibold outline-none" />
                    <NumberField.Increment className="w-12 border-l border-zinc-200 text-lg font-semibold text-zinc-600">
                      +
                    </NumberField.Increment>
                  </NumberField.Group>
                </NumberField.Root>
              </Field.Root>

              <Field.Root name="budget" className="grid gap-2">
                <Field.Label className="text-sm font-semibold text-zinc-700">
                  Orçamento mensal
                </Field.Label>
                <NumberField.Root
                  defaultValue={1200}
                  min={100}
                  step={100}
                  format={{ style: "currency", currency: "BRL" }}
                >
                  <NumberField.Group className="flex h-12 overflow-hidden rounded-[8px] border border-zinc-300 bg-white focus-within:border-sky-600">
                    <NumberField.Decrement className="w-12 border-r border-zinc-200 text-lg font-semibold text-zinc-600">
                      -
                    </NumberField.Decrement>
                    <NumberField.Input className="min-w-0 flex-1 text-center font-semibold outline-none" />
                    <NumberField.Increment className="w-12 border-l border-zinc-200 text-lg font-semibold text-zinc-600">
                      +
                    </NumberField.Increment>
                  </NumberField.Group>
                </NumberField.Root>
              </Field.Root>
            </div>

            <label className="flex items-start gap-3 rounded-[8px] border border-zinc-200 bg-zinc-50 p-4">
              <Checkbox.Root
                defaultChecked
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[5px] border border-zinc-400 bg-white outline-none data-[checked]:border-sky-600 data-[checked]:bg-sky-600 focus-visible:ring-4 focus-visible:ring-sky-200"
              >
                <Checkbox.Indicator className="text-sm font-bold text-white">
                  ✓
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span>
                <span className="block text-sm font-semibold text-zinc-800">
                  Criar trilha de onboarding
                </span>
                <span className="mt-1 block text-sm leading-6 text-zinc-500">
                  O checkbox usa input oculto para submissão de formulário e
                  estado acessível.
                </span>
              </span>
            </label>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function InsightsDialog({ card }: { card: (typeof cards)[number] }) {
  return (
    <Dialog.Root>
      <DemoCard card={card} />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-zinc-950/45 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 max-h-[92vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[8px] bg-white p-5 shadow-2xl outline outline-1 outline-zinc-200 transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 sm:p-6">
          <ModalHeader
            eyebrow="Conteúdo"
            title="Insights com camadas contextuais"
            description="Accordion organiza seções; Popover e Tooltip adicionam contexto sem tirar o usuário do fluxo."
          />

          <div className="mt-6 rounded-[8px] border border-zinc-200">
            <Accordion.Root multiple defaultValue={["retencao"]}>
              {[
                ["retencao", "Retenção subiu 12%", "Usuários que ativaram alertas voltaram mais vezes na primeira semana."],
                ["ativacao", "Ativação está estável", "O caminho com três passos manteve baixa fricção em telas pequenas."],
                ["risco", "Risco em contas sem dono", "Workspaces sem responsável definido acumulam mais tarefas pendentes."],
              ].map(([value, title, body]) => (
                <Accordion.Item
                  key={value}
                  value={value}
                  className="border-b border-zinc-200 last:border-b-0"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-4 text-left font-semibold outline-none hover:bg-zinc-50 focus-visible:bg-zinc-50">
                      {title}
                      <span className="text-xl leading-none text-zinc-400">+</span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className="px-4 pb-4 text-sm leading-6 text-zinc-600">
                    {body}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Popover.Root>
              <Popover.Trigger className="rounded-[8px] border border-zinc-300 px-4 py-3 text-left font-semibold outline-none transition hover:bg-zinc-50 focus-visible:ring-4 focus-visible:ring-rose-200">
                Ver critério de score
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Positioner sideOffset={10}>
                  <Popover.Popup className="max-w-xs rounded-[8px] border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-600 shadow-xl outline-none">
                    <Popover.Arrow className="fill-white" />
                    <Popover.Title className="font-semibold text-zinc-950">
                      Score operacional
                    </Popover.Title>
                    <Popover.Description className="mt-1">
                      Calculado com retenção, ativação, pendências e sinais de
                      engajamento nos últimos 30 dias.
                    </Popover.Description>
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>

            <Tooltip.Root>
              <Tooltip.Trigger className="rounded-[8px] border border-zinc-300 px-4 py-3 text-left font-semibold outline-none transition hover:bg-zinc-50 focus-visible:ring-4 focus-visible:ring-rose-200">
                Indicador com tooltip
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner sideOffset={8}>
                  <Tooltip.Popup className="rounded-[6px] bg-zinc-950 px-3 py-2 text-sm font-medium text-white shadow-xl">
                    Tooltip gerenciado pela Base UI
                    <Tooltip.Arrow className="fill-zinc-950" />
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DemoCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <article className="group flex min-h-[310px] flex-col justify-between rounded-[8px] border border-zinc-300 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className={`mb-6 h-2 w-20 rounded-full ${card.accent}`} />
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
          {card.eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
          {card.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          {card.description}
        </p>
      </div>
      <Dialog.Trigger className="mt-8 inline-flex h-11 items-center justify-center rounded-[8px] bg-zinc-950 px-4 text-sm font-semibold text-white outline-none transition hover:bg-zinc-800 focus-visible:ring-4 focus-visible:ring-red-500">
        {card.trigger}
      </Dialog.Trigger>
    </article>
  );
}

function ModalHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
          {eyebrow}
        </p>
        <Dialog.Title className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
          {title}
        </Dialog.Title>
        <Dialog.Description className="mt-2 text-sm leading-6 text-zinc-600 sm:text-base">
          {description}
        </Dialog.Description>
      </div>
      <Dialog.Close className="flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-zinc-300 text-xl leading-none text-zinc-500 outline-none transition hover:bg-zinc-100 focus-visible:ring-4 focus-visible:ring-zinc-200">
        ×
      </Dialog.Close>
    </div>
  );
}

function ToggleRow({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-[8px] border border-zinc-200 bg-white p-4">
      <span className="text-sm font-semibold text-zinc-800">{label}</span>
      <Switch.Root
        defaultChecked={defaultChecked}
        className="flex h-7 w-12 items-center rounded-full bg-zinc-300 p-1 outline-none transition data-[checked]:bg-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-200"
      >
        <Switch.Thumb className="size-5 rounded-full bg-white shadow transition-transform data-[checked]:translate-x-5" />
      </Switch.Root>
    </label>
  );
}
