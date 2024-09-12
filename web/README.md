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

```bash
```


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