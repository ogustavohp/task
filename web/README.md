## WEB
**initial setup**
Vamos começar instalando o vite
vamos criar o projeto com react + typescript
```bash
npm create vite@latest
```
entrando na pasta vamos instalar as dependências com
```bash
npm i
```

No package.json vamos `remover` as dependências que utilizam o eslint

```bash
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "eslint": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "typescript-eslint": "^8.0.1",
}
```
e vamos rodar o `npm i` novamente para remover as dependências
Vamos remover a pasta `src>assets` o arquivo `src>App.css` vamos remover tudo de `src>index.css`
Remover todo o conteúdo dentro de `src>App.tsx` vamos trocar por um export nomeado e trocar o nome do arquivo para `app.tsx` e arrumar a importação no `src>main.tsx`

**install biome**
Vamos instalar o biome
```bash
npm i @biomejs/biome -D
```
Vamos criar o arquivo `biome.json`
```bash
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "organizeImports": {
    "enabled": true
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "arrowParentheses": "asNeeded",
      "jsxQuoteStyle": "double",
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "es5"
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "noNonNullAssertion": "off"
      }
    }
  },
  "files": {
    "ignore": [
      "node_modules"
    ]
  }
}
```

E adicionar em work space settings
```bash
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome"
}
```

**tailwind**
https://tailwindcss.com/docs/guides/vite
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

dentro do arquivo tailwind.config.js
```bash
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

dentro do `./src/index.css` 
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**project config**

dentro de `src>assets` vamos criar o arquivo `logo-task.svg` e `lets-start-illustration.svg`

existem duas formas de carregar imagens no react, primeiro importar
Esse é um carregamento preguiçoso, ele carrega depois que o usuário abriu a aplicação, isso pode causa layout shift
```bash
import logo from './assets/logo-task.svg'

export function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="task" />
    </div>
  )
}
```

A outra forma:
É transformar o vetor em um componente
Pegamos o código do svg e transformamos e vamos no transform tools (site)
e vamos em svg to jsx (É uma ótima estrategia para svg's pequenos)
```bash
export function TaskIcon() {
  return (
    <svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Task icon</title>
      <path
        d="M12 .5c-.936 0-1.847.107-2.72.31A12.016 12.016 0 00.31 9.78C.107 10.652 0 11.563 0 12.5c0 6.627 5.373 12 12 12 .936 0 1.847-.107 2.72-.31a12.017 12.017 0 008.97-8.968c.203-.875.31-1.786.31-2.722 0-6.627-5.373-12-12-12zm0 19.515a7.494 7.494 0 01-2.524-.435 7.535 7.535 0 01-4.556-4.555A7.515 7.515 0 1119.515 12.5 7.515 7.515 0 0112 20.015z"
        fill="url(#paint0_linear_84_261)"
      />
      <path
        d="M12 7.657a4.844 4.844 0 100 9.687 4.844 4.844 0 000-9.687zm0 7.772a2.929 2.929 0 110-5.858 2.929 2.929 0 010 5.858z"
        fill="#FEFCFE"
      />
      <path
        d="M14.524 5.42a7.515 7.515 0 00-9.604 9.605 7.423 7.423 0 01-2.63-1.702A7.408 7.408 0 01.31 9.78 12.016 12.016 0 019.28.81a7.409 7.409 0 013.543 1.98 7.423 7.423 0 011.701 2.63z"
        fill="url(#paint1_linear_84_261)"
      />
      <path
        d="M23.69 15.221a12.016 12.016 0 01-8.97 8.969 7.408 7.408 0 01-3.543-1.98 7.427 7.427 0 01-1.701-2.63 7.515 7.515 0 009.605-9.605c.958.362 1.857.93 2.629 1.702a7.41 7.41 0 011.98 3.544z"
        fill="url(#paint2_linear_84_261)"
      />
      <path
        d="M6.064 20.948a2.511 2.511 0 100-5.023 2.511 2.511 0 000 5.023z"
        fill="url(#paint3_linear_84_261)"
      />
      <path
        d="M17.958 9.054a2.511 2.511 0 100-5.023 2.511 2.511 0 000 5.023z"
        fill="url(#paint4_linear_84_261)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_84_261"
          x1={20.3704}
          y1={4.59058}
          x2={3.89023}
          y2={20.1635}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F38856" />
          <stop offset={0.23} stopColor="#F0625C" />
          <stop offset={1} stopColor="#5C3DAB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_84_261"
          x1={11.2405}
          y1={2.53429}
          x2={1.86657}
          y2={11.8578}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F67986" />
          <stop offset={1} stopColor="#8951BA" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_84_261"
          x1={21.9616}
          y1={13.3129}
          x2={12.5877}
          y2={22.6369}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F67986" />
          <stop offset={1} stopColor="#8951BA" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_84_261"
          x1={7.89781}
          y1={16.7204}
          x2={4.23025}
          y2={20.1519}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A267B9" />
          <stop offset={1} stopColor="#704BB4" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_84_261"
          x1={19.4846}
          y1={5.11331}
          x2={16.9808}
          y2={7.45646}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7A8A5" />
          <stop offset={0.97} stopColor="#D074C4" />
          <stop offset={1} stopColor="#CF76A9" />
        </linearGradient>
      </defs>
    </svg>
  )
}
```
Só importar esse componente


**lucide icons**
```bash
npm i lucide-react
npm i tailwind-merge
npm i tailwind-variants
npm i @radix-ui/react-radio-group
npm i @radix-ui/react-progress
npm i @radix-ui/react-dialog
```
Vamos usar o radix pq eles são acessíveis (a11y)
OBS RADIX:
Passamos asChild para n criar 2 buttons, com um dentro do outro
```bash
<DialogTrigger asChild>
  <Button>
    <Plus className="size-4" />
    Cadastrar meta
  </Button>
</DialogTrigger>
```

O StrictMode do react faz carregar duas vezes em desenvolvimento


Para fetch de dados nos vamos usar o TanStack query

```bash
npm i @tanstack/react-query
```

```bash
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
```

```bash
import { useEffect, useState } from 'react'
import { CreateGoal } from './components/create-goal'
import { EmptyGoals } from './components/empty-goals'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60 //60seconds
  })

  return (
    <Dialog>
      {data && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
```
```bash
export type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
}

export async function getSummary(): Promise<SummaryResponse> {
  const response = await fetch('http://localhost:3333/summary')
  const data = await response.json()

  return data.summary
}
```

Instalar o dayjs
e deixar ele me pt-br
```bash
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)
```
para refazer as queries fazemos o seguinte, logo quando eu realizar a query para completar a meta, ele refazer a quey de summary e pending-goals e isso vai atualizar os dados
```bash
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, //60seconds
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }
```

## Form
Vamos usar o react-hook-form
```bash
npm i react-hook-form @hookform/resolvers zod
```
```bash
const createGoalForm = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar.'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

export function CreateGoal() {
  const { register, control } = useForm({
    resolver: zodResolver(createGoalForm),
  })
  return (
    <Input
      id="title"
      autoFocus
      placeholder="Praticar exercícios, meditar, etc..."
      {...register('title')}
    />
  )
```
Para inputs que não são nativos como o radio group do radix
```bash
<Controller
  control={control}
  name="desiredWeeklyFrequency"
  render={({ field }) => {
    return (
      <RadioGroup
        onValueChange={field.onChange}
        value={field.value}
      >
        <RadioGroupItem value="1">
          <RadioGroupIndicator />
          <span className="text-zinc-300 text-sm font-medium leading-none">
            1x na semana
          </span>
          <span className="text-lg leading-none">🥱</span>
        </RadioGroupItem>

        <RadioGroupItem value="2">
          <RadioGroupIndicator />
          <span className="text-zinc-300 text-sm font-medium leading-none">
            2x na semana
          </span>
          <span className="text-lg leading-none">🙂</span>
        </RadioGroupItem>

        <RadioGroupItem value="3">
          <RadioGroupIndicator />
          <span className="text-zinc-300 text-sm font-medium leading-none">
            3x na semana
          </span>
          <span className="text-lg leading-none">😎</span>
        </RadioGroupItem>

        <RadioGroupItem value="4">
          <RadioGroupIndicator />
          <span className="text-zinc-300 text-sm font-medium leading-none">
            4x na semana
          </span>
          <span className="text-lg leading-none">😜</span>
        </RadioGroupItem>

        <RadioGroupItem value="5">
          <RadioGroupIndicator />
          <span className="text-zinc-300 text-sm font-medium leading-none">
            5x na semana
          </span>
          <span className="text-lg leading-none">🤨</span>
        </RadioGroupItem>

        <RadioGroupItem value="6">
          <RadioGroupIndicator />
          <span className="text-zinc-300 text-sm font-medium leading-none">
            6x na semana
          </span>
          <span className="text-lg leading-none">🤯</span>
        </RadioGroupItem>

        <RadioGroupItem value="7">
          <RadioGroupIndicator />
          <span className="text-zinc-300 text-sm font-medium leading-none">
            Todos dias da semana
          </span>
          <span className="text-lg leading-none">🔥</span>
        </RadioGroupItem>
      </RadioGroup>
    )
  }}
/>
```

componente completo
```bash
import { X } from 'lucide-react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createGoal } from '../http/create-goal'
import { useQueryClient } from '@tanstack/react-query'

const createGoalForm = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar.'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalForm = z.infer<typeof createGoalForm>

export function CreateGoal() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalForm),
    })

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    reset()
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            <p>
              Adicione atividades que te fazem bem e que você quer continuar
              praticando toda semana.
            </p>
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-col flex-1 justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register('title')}
              />
              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="radio_input_group">
                Quantas vezes na semana?
              </Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={3}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          1x na semana
                        </span>
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          2x na semana
                        </span>
                        <span className="text-lg leading-none">🙂</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          3x na semana
                        </span>
                        <span className="text-lg leading-none">😎</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          4x na semana
                        </span>
                        <span className="text-lg leading-none">😜</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          5x na semana
                        </span>
                        <span className="text-lg leading-none">🤨</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          6x na semana
                        </span>
                        <span className="text-lg leading-none">🤯</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          Todos dias da semana
                        </span>
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}

```