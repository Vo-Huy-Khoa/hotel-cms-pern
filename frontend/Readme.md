# Setup Frontend:

You can do this by following these steps:
<br/><br/>

### 1. cd project:

<br/>

```bash
 cd frontend
```

<br/>

### 2. Init NPM project:

```bash
 npm init -y
```

<br/>

### 3. Install Typescript:

```bash
npm i @types/react @types/react-dom typescript
```

<br/>

### 4. Create file config typescript:

```bash
 npx tsc --init
```

<br/>

### 5. Change config typescript:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "preserve",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

<br/>

### 6. Create vite.config.ts in root folder:

```ts
import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
};
```

<br/>

### 7. Install Tailwind Css:

```bash
npm install --save-dev tailwindcss @tailwindcss/forms @tailwindcss/typography
```

<br/>

### 8. Create vite.config.ts in root folder:

```ts
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default {
  plugins: [react(), tailwindcss()],
};
```

<br/>

### 9. Install dependencies:

```bash
npm install --save-dev vite react react-dom @vitejs/plugin-react
```

<br/>

### 10. Run project:

```bash
npm run dev
```

<br/>
