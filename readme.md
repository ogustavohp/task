## Sobre o projeto
Vai ser um projeto sobre controle de metas pessoais
O projeto vai ser bem focado em SQL no lado do backend
E no frontend vai ser focado em fetch de dados e formulários

Vamos usar fastify, prisma, biome,

## Server
**setup Inicial**
Vamos criar a pasta server e entrar nela
```bash
mkdir server
cd server
```
Vamos iniciar o projeto node
```bash
npm init -y
```

Vamos instalar o typescript como dependência de desenvolvimento
```bash
npm i typescript -D
```

Agora vamos instalar o npx, ele é basicamente um atalho para executar scripts de bibliotecas instaladas
npx é para executar os scripts dentro da pasta node_modules/.bin
```bash
npx tsc --init
```
Para configurar o arquivo tsconfig.json vamos no google e procuramos por tsconfig bases https://github.com/tsconfig/bases
Abrimos na versão do node que estamos utilizando, copiamos a estrutura e substituímos na pasta tsconfig.json
Node 20
```bash
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "_version": "20.1.0",

  "compilerOptions": {
    "lib": ["es2023"],
    "module": "node16",
    "target": "es2022",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node16"
  }
}
```
Vamos instalar o @types/node para integrar o node com o typescript
E vamos instalar o tsx também, o tsx nos permite executar o projeto sem precisar converter antes para js
```bash
npm i @types/node tsx -D
```

Agora vamos criar a pasta `src/http/server.js` e vamos criar um script no arquivo `package.json` para executar esse arquivo
```bash
  "scripts": {
    "dev": "tsx watch --env-file .env src/http/server.ts",
  },
```

Agora vamos instalar o fastify
```bash
npm i fastify
```

No arquivo `server.ts`

```bash
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goals'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*', //change in production
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })


```


Vamos instalar o biome, ele é concorrente do eslint
https://biomejs.dev/pt-br/
```bash
npm install --save-dev --save-exact @biomejs/biome
```
Agora vamos criar um arquivo com nome de `biome.json` e colocar essa configuração no arquivo
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
      "recommended": true
    }
  },
  "files": {
    "ignore": [
      "node_modules"
    ]
  }
}
```
Vamos instalar a extensão do biome
Agora vamos em ctrl + shift + p > preferences: Open workspace settings (JSON) e vamos colar isso
```bash
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome"
}
```

Vamos configurar o PostgreSQL agora
Vamos instalar o docker desktop
E agora vamos criar um arquivo `docker-compose.yml`
vamos usar a imagem da bitnami
```bash
name: task-server

services:
  pg:
    image: bitnami/postgresql:13.16.0
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=task
```

Agora vamos rodar o banco digitando
```bash
docker compose up -d
```

obs docker:
```bash
docker ps -a      //Mostra todos os containers
docker logs {id}  //Mostra o log daquele container em especifico
```

Vamos usar o drizzle-orm como ORM para fazer as conexões com o banco de dados
```bash
npm i drizzle-orm
npm i drizzle-kit -D
```
Vamos criar um arquivo na raiz do projeto drizzle.config.ts e vamos configurar segundo a documentação do drizzle kit https://orm.drizzle.team/kit-docs/overview#overview

Agora vamos configurar a variável de ambiente, para isso vamos instalar o zod para validar se ela existe
```bash
npm i zod
```
e em `src` vamos criar um arquivo chamado env.ts
```bash
import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url()
})

export const env = envSchema.parse(process.env)
```

E no `drizzle.config.ts` vamos fazer o seguinte

```bash
import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials:{
    url: env.DATABASE_URL
  }
})
```

E vamos criar o arquivo `.env` na raiz do projeto com
```bash
DATABASE_URL="postgresql://docker:docker@localhost:5432/task"
```
Para os ids vamos usar o cuid2 que é um algorítimo bem conhecido de ids únicos
```bash
npm i @paralleldrive/cuid2
```

Agora dentro de `src/db/schema.ts`
Para criar as tabelas com o drizzle vamos usar funções que importamos do próprio drizzle

a key do objeto que é o segundo parâmetro de pgTable é como vamos nos referir no código, o nome dentro de text, timestamp, integer é o nome da tabela do banco
```bash
import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const goals = pgTable('goals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),

  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const goalCompletions = pgTable('goal_completions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),

  goalId: text('goal_id')
    .references(() => goals.id)
    .notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

```
Agora vamos executar e isso vai criar as migrations
```bash
npx drizzle-kit generate
```

Agora vamos instalar o postgres
```bash
npm i postgres
```

Agora vamos executar o drizzle e criar as tabelas
```bash
npx drizzle-kit migrate
```

E podemos ver o banco usando
```bash
npx drizzle-kit studio
```

Vamos criar a conexão com o banco de dados `src/db/index.ts`

```bash
import * as schema from './schema'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from '../env'

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema, logger: true })

```

Vamos usar o dayjs para controlar datas com javascript
```bash
npm i dayjs
```
Agora vamos criar um seed para popular o banco de dados
primeiro deletamos o goalCompletions porque não vamos conseguir deletar o goals pois o goalCompletions precisa dele e não estamos usando cascade

```bash
import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)
  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Me exercitar', desiredWeeklyFrequency: 3 },
      { title: 'Meditar', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
```


vamos criar o script no `package.json`
```bash
  "scripts": {
    "dev": "tsx watch --env-file .env src/http/server.ts",
    "seed": "tsx --env-file .env src/db/seed.ts"
  },
```

Como vamos precisar de validação em todas as rotas vamos usar o fastify type provider zod
```bash
npm i fastify-type-provider-zod
```

Vamos instalar o fastify cors
```bash
npm i @fastify/cors
```

vamos adicionar no arquivo `server.ts` logo apos `const app`

```bash
const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*', //change in production
})
```

## Construção do server
Vai ter 4 rotas
1. Cadastrar meta
2. Marcar uma meta como concluída
3. Retorna o resumo da semana
4. Retorna todas as metas da semana

Em `src/functions/create-goal.ts`
```bash
import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
```

Vamos criar a função de `src/functions/get-week-pending-goals.ts` que vai usar common table expressions
WITH queries

obs: leftJoin (pode ser que os registros não existam, mas vai continuar retornando a meta, mesmo que ele n tenha completado a meta)
innerJoin (iria retornar apenas as metas que ele completou pelo menos 1x)
Escrever mais sobre common table expressions
Basicamente executamos as duas queries de uma vez e retornamos em um obj só
```bash
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

dayjs.extend(weekOfYear)

export async function getWeekPendingGoals() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreatedUpToWeek, goalCompletionCounts)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      completionCount: sql /*sql*/`
        COALESCE(${goalCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalCompletionCounts,
      eq(goalCompletionCounts.goalId, goalsCreatedUpToWeek.id)
    )

  return { pendingGoals }
}

```

E agora vamos criar `src/functions/create-goal-completions.ts`