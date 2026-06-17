import { Lesson } from '../../types';

export const reactL1: Lesson = {
  slug: 'vite-setup', title: 'Vite Setup, ESLint, Prettier, Path Aliases',
  subtitle: 'Set up a production React 19 + TypeScript project with Vite',
  duration: 50, difficulty: 'Beginner', phase: 'Foundation', xp: 100, moduleSlug: 'react',
  objectives: ['Scaffold a Vite + React 19 + TypeScript project','Configure ESLint and Prettier for code quality','Set up path aliases (@/ for src/)','Structure project with components/, pages/, hooks/, lib/','Configure dev server proxy for API calls'],
  realWorldContext: 'Every React project at Google, Meta, and Vercel starts with Vite. Create React App (CRA) is deprecated. Vite uses esbuild for instant dev server startup (10-100x faster than CRA). Path aliases prevent import hell ("../../../components/Button"). This is day-one setup for every React engineer.',
  prerequisites: ['Node.js 20+ installed','Basic HTML/CSS/JS knowledge','Terminal familiarity'],
  conceptDiagram: `VITE PROJECT STRUCTURE:
myapp/
├── src/
│   ├── components/    ← reusable UI (Button, Card)
│   ├── pages/         ← route pages (Home, About)
│   ├── hooks/         ← custom hooks (useAuth, useApi)
│   ├── lib/           ← utilities (api.ts, utils.ts)
│   ├── types/         ← TypeScript types
│   ├── App.tsx        ← root component
│   └── main.tsx       ← entry point
├── public/            ← static assets
├── vite.config.ts     ← Vite + alias config
├── tsconfig.json      ← TypeScript + paths
├── .eslintrc          ← lint rules
└── package.json

WHY VITE (not CRA):
- Dev server starts in <1s (CRA takes 30s+)
- Hot Module Replacement (HMR) is instant
- Uses esbuild (Go) for dev, Rollup for prod
- CRA is officially deprecated`,
  conceptExplanation: ['Vite (French for "fast") was created by Evan You (Vue creator). It uses esbuild for development (instant startup, instant HMR) and Rollup for production builds. It is the official recommendation for new React projects — React docs themselves recommend Vite.','Path aliases map @/ to src/. Instead of import Button from "../../../components/Button", you write import Button from "@/components/Button". This requires configuration in BOTH tsconfig.json (for TypeScript) AND vite.config.ts (for Vite). Missing either one breaks.','ESLint catches bugs: unused variables, missing useEffect dependencies, undefined variables. Prettier formats code automatically. Both are mandatory in production teams — CI pipelines fail if lint errors exist.'],
  whyItMatters: 'A poorly configured project wastes hours every week. Import hell ("../../../") makes refactoring terrifying. Without ESLint, you ship bugs that could have been caught. Without Prettier, code style is inconsistent across the team. This setup is the foundation of every real React project.',
  codeExamples: [
    { filename: 'vite.config.ts', language: 'typescript', approach: 'minimal', code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
});`, explanation: 'Minimal Vite config. React plugin enables JSX. Port 3000 for consistency with other tools.' },
    { filename: 'vite.config.ts', language: 'typescript', approach: 'real-world', code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});`, explanation: 'Real-world: path alias (@/), API proxy (frontend calls /api → forwarded to :8000), manual chunks for vendor code splitting.' },
    { filename: 'tsconfig.json', language: 'json', approach: 'production', code: `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["vite/client"]
  },
  "include": ["src"]
}`, explanation: 'Production TS config: strict mode (catches more bugs), noUnusedLocals (no dead code), paths for @/ alias, vite/client types for import.meta.env.' },
  ],
  configFiles: [
    { filename: '.eslintrc.cjs', language: 'javascript', content: `module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-unused-vars": "error",
  },
};`, comment: 'Copy this exactly. Catches unused vars, missing hook deps, and non-component exports.' },
    { filename: '.prettierrc', language: 'json', content: `{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}`, comment: 'Consistent formatting across team. Adjust to your team preference.' },
  ],
  lab: { title: 'Scaffold a Vite React Project', steps: [
    { step: 1, title: 'Create project', instruction: 'Scaffold Vite React TS project', command: 'bun create vite myapp --template react-ts', expectedOutput: 'Project files created', verification: 'cd myapp && ls' },
    { step: 2, title: 'Install dependencies', instruction: 'Install all deps', command: 'cd myapp && bun install', expectedOutput: 'Packages installed' },
    { step: 3, title: 'Add path alias', instruction: 'Configure @/ alias in both tsconfig.json and vite.config.ts', command: 'Edit tsconfig.json to add paths, edit vite.config.ts to add resolve.alias', verification: 'import from "@/components/Test" works' },
    { step: 4, title: 'Run dev server', instruction: 'Start Vite', command: 'bun run dev', expectedOutput: 'VITE ready in 300ms — Local: http://localhost:5173', verification: 'Open browser at localhost:5173' },
    { step: 5, title: 'Create folder structure', instruction: 'Create the standard folders', command: 'mkdir -p src/{components,pages,hooks,lib,types}', verification: 'ls src/ shows all folders' },
  ]},
  commonErrors: [
    { error: 'Cannot find module @/components/Button', fix: 'Configure path alias in BOTH tsconfig.json (paths) AND vite.config.ts (resolve.alias). Missing either one breaks.', rootCause: 'TypeScript and Vite resolve paths independently. Both need the alias configured.' },
    { error: 'CORS error when calling API', fix: 'Add proxy in vite.config.ts: server.proxy["/api"] = { target: "http://localhost:8000" }. Now /api/* is forwarded to your backend.', rootCause: 'Browser blocks cross-origin requests. Vite proxy forwards requests server-side, avoiding CORS.' },
    { error: 'Dev server slow (30s+ startup)', fix: 'You are using Create React App (deprecated). Switch to Vite: bun create vite myapp --template react-ts. Startup in <1s.', rootCause: 'CRA uses webpack which is slow. Vite uses esbuild (Go) which is 100x faster.' },
  ],
  quiz: [
    { question: 'Why use Vite over Create React App?', options: ['More features', '10-100x faster dev server (esbuild)', 'Required by React', 'Better SEO'], correctIndex: 1, explanation: 'Vite uses esbuild for instant startup and HMR. CRA uses webpack (slow, deprecated). Vite is the official recommendation for new React projects.' },
    { question: 'Why configure path alias (@/) in BOTH tsconfig.json and vite.config.ts?', options: ['Redundancy', 'TypeScript checks types, Vite resolves modules — both need to know about @/', 'Required by React', 'Only tsconfig needed'], correctIndex: 1, explanation: 'TypeScript uses tsconfig paths for type checking. Vite uses resolve.alias for bundling. Both need the alias or imports fail.' },
    { question: 'What does the Vite proxy do?', options: ['Caches responses', 'Forwards /api/* requests to backend (avoids CORS in dev)', 'Compresses files', 'Adds auth headers'], correctIndex: 1, explanation: 'In dev, your frontend (:5173) and API (:8000) are different origins. Proxy forwards /api/* server-side, avoiding CORS. In production, Nginx does this.' },
  ],
  resources: [
    { title: 'Vite Documentation', url: 'https://vitejs.dev/', type: 'docs' },
    { title: 'React 19 Docs', url: 'https://react.dev/', type: 'docs' },
    { title: 'ESLint for React', url: 'https://eslint.org/docs/latest/', type: 'docs' },
  ],
  whatToReadNext: 'Read about TypeScript fundamentals (next lesson) — interfaces, generics, utility types are essential for typed React.',
};

export const reactL2: Lesson = {
  slug: 'typescript', title: 'TypeScript — Interfaces, Generics, Utility Types',
  subtitle: 'Master TypeScript for React — the language of modern frontend',
  duration: 65, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'react',
  objectives: ['Define interfaces and type aliases','Use generics for reusable components','Use utility types: Partial, Pick, Omit, Record','Understand strict mode and why it matters','Type React components, props, and events'],
  realWorldContext: 'TypeScript is mandatory at Google, Meta, Airbnb, and every major tech company for frontend. React 19 is written in TypeScript. Without TS, refactoring a 100-component app is terrifying — you do not know what breaks. TS catches 30% of bugs before runtime.',
  prerequisites: ['Completed React L1 (Vite setup)','Basic JavaScript knowledge'],
  conceptDiagram: `TYPESCRIPT FOR REACT:
  interface User { id: number; name: string; email?: string }
  type Status = "active" | "inactive"     ← union (specific values)
  type UserUpdate = Partial<User>          ← all fields optional
  type UserName = Pick<User, "name">       ← select specific keys
  type WithoutId = Omit<User, "id">        ← exclude keys
  type UserMap = Record<string, User>      ← { [key: string]: User }

  REACT COMPONENT TYPING:
  interface ButtonProps {
    label: string
    onClick: () => void
    variant?: "primary" | "secondary"    ← literal union
    disabled?: boolean
  }
  function Button({ label, onClick, variant }: ButtonProps) { ... }`,
  conceptExplanation: ['interface defines object shape. type is more flexible (unions, intersections). Use interface for objects that might be extended, type for unions and utility types.','Utility types transform existing types: Partial<T> makes all optional (for PATCH updates), Pick<T, K> selects keys, Omit<T, K> excludes keys, Record<K, V> creates a map type. These eliminate duplicate type definitions.','In React, type props with interface. Use literal unions for variants: variant?: "primary" | "danger". Type event handlers: onChange: (e: React.ChangeEvent<HTMLInputElement>) => void. The React types package provides all DOM event types.'],
  whyItMatters: 'Without TypeScript, you pass wrong props to components and find out at runtime (white screen). With TS, the compiler tells you "Button expects variant, not color" before you even save. At scale (100+ components), this is the only way to refactor safely.',
  codeExamples: [
    { filename: 'types.ts', language: 'typescript', approach: 'minimal', code: `// Basic types
interface User {
  id: number;
  name: string;
  email?: string;  // optional
  readonly createdAt: Date;  // cannot modify
}

// Union type (specific values)
type Status = "active" | "inactive" | "pending";

// Function typing
function getUser(id: number): User | null {
  return users.find(u => u.id === id) ?? null;
}

// Component props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}`, explanation: 'interface for objects, type for unions, optional with ?, readonly for immutability. Component props use interface.' },
    { filename: 'types.ts', language: 'typescript', approach: 'real-world', code: `// Utility types — transform existing types
type UserUpdate = Partial<User>;      // { id?: number; name?: string; email?: string }
type UserName = Pick<User, "name">;   // { name: string }
type WithoutId = Omit<User, "id">;   // { name: string; email?: string; createdAt: Date }
type UserMap = Record<string, User>; // { [key: string]: User }

// Generics — reusable functions
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const n = first([1, 2, 3]);  // T = number
const s = first(["a", "b"]); // T = string

// Generic React component
interface ListProps<T> {
  items: T[];
  render: (item: T) => React.ReactNode;
}
function List<T>({ items, render }: ListProps<T>) {
  return <>{items.map(render)}</>;
}

// Usage: types are inferred!
<List items={[1, 2, 3]} render={(n) => <span>{n}</span>} />`, explanation: 'Partial/Pick/Omit/Record eliminate duplicate types. Generics make components reusable across types. List<T> works for any type.' },
    { filename: 'Component.tsx', language: 'typescript', approach: 'production', code: `import { useState, ChangeEvent } from "react";

// Typed component with all patterns
interface UserFormProps {
  user?: User;  // optional for create vs edit
  onSubmit: (data: Omit<User, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  // Typed event handler
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={handleNameChange} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">{user ? "Update" : "Create"}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}`, explanation: 'Production React + TS: typed props (Omit for partial), useState with initial from optional prop, ChangeEvent for input events, FormEvent for submit. Every prop and event is typed.' },
  ],
  configFiles: [],
  lab: { title: 'Add TypeScript Types to Your React App', steps: [
    { step: 1, title: 'Define types', instruction: 'Create types for your app', command: 'cat > src/types/index.ts << \'EOF\'\nexport interface User {\n  id: number;\n  name: string;\n  email?: string;\n}\nexport type Status = "active" | "inactive";\nexport type UserUpdate = Partial<User>;\nEOF' },
    { step: 2, title: 'Type a component', instruction: 'Create a typed component', command: 'cat > src/components/UserCard.tsx << \'EOF\'\nimport { User } from "@/types";\ninterface Props { user: User; onSelect?: (id: number) => void; }\nexport function UserCard({ user, onSelect }: Props) {\n  return <div onClick={() => onSelect?.(user.id)}>{user.name}</div>;\n}\nEOF' },
    { step: 3, title: 'Verify types', instruction: 'Run type check', command: 'bunx tsc --noEmit', expectedOutput: 'No errors (if typed correctly)', verification: 'No type errors' },
  ]},
  commonErrors: [
    { error: 'Type X is not assignable to type Y', fix: 'Check what types are expected. Use the exact type or a compatible subtype. For unions, use type narrowing (if/else).', rootCause: 'TypeScript enforces type compatibility strictly. A string cannot be assigned to a number type.' },
    { error: 'Property does not exist on type', fix: 'Add the property to the interface, or use optional chaining (obj?.prop). Check the type definition.', rootCause: 'You are accessing a property not declared in the interface. TS does not allow undeclared properties.' },
    { error: 'Cannot find module or type declarations', fix: 'Install @types/package: bun add -D @types/react @types/react-dom. Check tsconfig.json includes the right paths.', rootCause: 'Missing type definitions. Many npm packages need separate @types/* packages.' },
  ],
  quiz: [
    { question: 'What does Partial<User> do?', options: ['Removes fields', 'Makes ALL fields optional', 'Adds fields', 'Creates a copy'], correctIndex: 1, explanation: 'Partial<T> makes every property of T optional. Perfect for PATCH/update forms where not all fields are required.' },
    { question: 'How to type an input onChange handler?', options: ['(e: any) => void', '(e: React.ChangeEvent<HTMLInputElement>) => void', '(e: Event) => void', '(e: string) => void'], correctIndex: 1, explanation: 'React.ChangeEvent<HTMLInputElement> is the correct type for input change events. It gives you e.target.value as string.' },
    { question: 'interface vs type — when to use which?', options: ['Always interface', 'Always type', 'interface for objects (extensible), type for unions/intersections', 'No difference'], correctIndex: 2, explanation: 'interface is for object shapes (can be extended/merged). type is for unions, intersections, utility types. Use interface for props, type for unions.' },
  ],
  resources: [
    { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'docs' },
    { title: 'React + TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', type: 'cheatsheet', isHiddenGem: true },
  ],
  whatToReadNext: 'Read about React 19 Fundamentals (next lesson) — JSX, props, state, events.',
};

export const reactL3: Lesson = {
  slug: 'react-fundamentals', title: 'React 19 Fundamentals — JSX, Props, State, Events',
  subtitle: 'Master the core of React 19 — components, JSX, props, state, events',
  duration: 60, difficulty: 'Beginner', phase: 'Foundation', xp: 150, moduleSlug: 'react',
  objectives: ['Write JSX and understand how it compiles to JavaScript','Pass props from parent to child components','Use useState for local state management','Handle events (onClick, onChange, onSubmit)','Understand controlled vs uncontrolled components'],
  realWorldContext: 'React is used by Facebook, Instagram, Netflix, Airbnb, and every major tech company. React 19 is the latest version with improved hooks, server components, and automatic batching. Understanding JSX, props, and state is the foundation — without it, you cannot build any React app.',
  prerequisites: ['Completed React L1 (Vite) and L2 (TypeScript)','Basic HTML/JS knowledge'],
  conceptDiagram: `REACT CORE CONCEPTS:

  COMPONENT = JavaScript function that returns JSX
  function Button({ label }: Props) {
    return <button>{label}</button>
  }

  PROPS = data passed FROM parent TO child (read-only)
  <Button label="Click me" />  ← "Click me" is a prop

  STATE = data that changes over time (triggers re-render)
  const [count, setCount] = useState(0)
  setCount(count + 1)  ← triggers re-render

  EVENT = user interaction (click, type, submit)
  <button onClick={() => setCount(count + 1)}>

  CONTROLLED COMPONENT = input value controlled by React state
  <input value={name} onChange={(e) => setName(e.target.value)} />`,
  conceptExplanation: ['JSX looks like HTML but is JavaScript. <div className="x"> compiles to React.createElement("div", {className: "x"}). You can embed expressions: {variable}, {condition ? "a" : "b"}, {list.map(item => <li>{item}</li>)}.','Props are read-only data passed from parent to child. They flow down (unidirectional). The child cannot modify props — it can only call callbacks (also passed as props) to ask the parent to change.','useState returns [value, setter]. Calling setter triggers a re-render. State is local to the component — each instance has its own. State updates are batched in React 19 (multiple setStates in one handler = one re-render).'],
  whyItMatters: 'Every React app is built from components, props, and state. Without understanding these, you cannot build anything. Controlled components (input value tied to state) are how every form works. These are the absolute fundamentals — master them before moving to hooks and routing.',
  codeExamples: [
    { filename: 'App.tsx', language: 'typescript', approach: 'minimal', code: `import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;`, explanation: 'Minimal React: useState for state, JSX for UI, onClick for events. Clicking the button updates state, which triggers re-render.' },
    { filename: 'App.tsx', language: 'typescript', approach: 'real-world', code: `import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggle = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}  // controlled
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
        placeholder="Add todo..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggle(todo.id)}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`, explanation: 'Real-world todo app: controlled input (value tied to state), array state with immutable updates (...todos, .map), key prop for list items, conditional styling.' },
    { filename: 'Components.tsx', language: 'typescript', approach: 'production', code: `import { useState, FormEvent, ChangeEvent } from "react";

// Reusable Button component with variants
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger" | "ghost";
  disabled?: boolean;
}

export function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`px-4 py-2 rounded \${styles[variant]} \${disabled ? "opacity-50 cursor-not-allowed" : ""}\`}
    >
      {label}
    </button>
  );
}

// Controlled form component
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Submit
    console.log("Login:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded"
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded"
        />
        {errors.password && <span className="text-red-500">{errors.password}</span>}
      </div>
      <Button label="Login" onClick={() => {}} />
    </form>
  );
}`, explanation: 'Production: reusable Button with variant prop (union type), controlled form inputs with validation, typed event handlers (FormEvent, ChangeEvent), error state. This is what real React components look like.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Counter and Todo App', steps: [
    { step: 1, title: 'Create counter', instruction: 'Build a counter with useState', command: 'cat > src/App.tsx << \'EOF\'\nimport { useState } from "react";\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>+</button>\n      <button onClick={() => setCount(c => c - 1)}>-</button>\n    </div>\n  );\n}\nEOF' },
    { step: 2, title: 'Run dev server', instruction: 'Start Vite', command: 'bun run dev', expectedOutput: 'Counter with + and - buttons' },
    { step: 3, title: 'Add todo list', instruction: 'Extend with todo functionality', command: 'Add input, addTodo function, and list rendering', verification: 'Can add and see todos' },
  ]},
  commonErrors: [
    { error: 'Nothing renders (blank screen)', fix: 'Check console for errors. Common: missing return statement, JSX syntax error, missing import. Use React DevTools to inspect.', rootCause: 'JavaScript error prevents rendering. Check browser console (F12).' },
    { error: 'Input does not update when typing', fix: 'Make it a controlled component: value={state} onChange={(e) => setState(e.target.value)}. Without onChange, React prevents typing.', rootCause: 'Controlled inputs must have onChange handler. Without it, the input is read-only.' },
    { error: 'List items have no key warning', fix: 'Add key={item.id} to list items. Use unique ID, not array index. Keys help React identify which items changed.', rootCause: 'React uses keys to optimize re-renders. Without keys, React may re-render wrong items.' },
  ],
  quiz: [
    { question: 'What does useState return?', options: ['[value, setter] tuple', 'Just the value', 'Just the setter', 'An object'], correctIndex: 0, explanation: 'useState returns a tuple: [currentState, setStateFunction]. const [count, setCount] = useState(0).' },
    { question: 'What is a controlled component?', options: ['Component with CSS', 'Input whose value is controlled by React state', 'Component that controls children', 'A form validator'], correctIndex: 1, explanation: 'Controlled component: input value={state} onChange={update state}. React controls the input value. This is the standard pattern for forms.' },
    { question: 'Why use key prop on list items?', options: ['For styling', 'Helps React identify which items changed (optimization)', 'Required by JSX', 'For accessibility'], correctIndex: 1, explanation: 'Keys help React match list items between renders. Without keys, React may re-render wrong items or lose state. Use unique IDs, not array index.' },
  ],
  resources: [
    { title: 'React 19 Docs', url: 'https://react.dev/learn', type: 'docs' },
    { title: 'React DevTools', url: 'https://react.dev/learn/react-developer-tools', type: 'tool' },
  ],
  whatToReadNext: 'Read about Hooks Deep Dive (next lesson) — useEffect, useRef, useMemo, useCallback, custom hooks.',
};

export const reactL4: Lesson = {
  slug: 'hooks', title: 'Hooks Deep Dive — useState, useEffect, useRef, useMemo, useCallback',
  subtitle: 'Master every React hook and when to use each',
  duration: 75, difficulty: 'Beginner', phase: 'Foundation', xp: 200, moduleSlug: 'react',
  objectives: ['Use useEffect for side effects (API calls, subscriptions, cleanup)','Use useRef for mutable values that do NOT trigger re-render','Use useMemo for expensive calculations','Use useCallback to prevent unnecessary re-renders','Build custom hooks for reusable logic'],
  realWorldContext: 'Hooks are how React works. useEffect is used for every API call, subscription, and timer. useRef is used for DOM references and mutable values. useMemo/useCallback are performance optimizations. Every React component uses hooks. Companies like Netflix and Airbnb have strict rules about hook dependencies.',
  prerequisites: ['Completed React L1-L3'],
  conceptDiagram: `REACT HOOKS:
  useState     → local state (triggers re-render)
  useEffect    → side effects (API, subscriptions, timers)
  useRef       → mutable value (does NOT trigger re-render)
  useMemo      → cache expensive calculation
  useCallback  → cache function reference
  useContext   → access global state

  useEffect RULES:
  useEffect(() => { ... }, [])        → run ONCE on mount
  useEffect(() => { ... }, [dep])     → run when dep changes
  useEffect(() => { return cleanup }) → cleanup on unmount

  CUSTOM HOOK:
  function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
      const t = setTimeout(() => setDebounced(value), delay)
      return () => clearTimeout(t)  // cleanup!
    }, [value, delay])
    return debounced
  }`,
  conceptExplanation: ['useEffect runs after render. The dependency array controls WHEN it runs: [] = once on mount, [dep] = when dep changes, no array = every render (bad!). Always return a cleanup function for subscriptions/timers to prevent memory leaks.','useRef stores a mutable value that does NOT trigger re-render. Use for: DOM references (inputRef.current.focus()), storing intervals, keeping previous values. Changing ref.current does NOT re-render the component.','useMemo caches expensive calculations: useMemo(() => expensiveCalc(data), [data]). Only recalculates when data changes. useCallback caches function references: useCallback(() => doSomething(), [deps]). Prevents child re-renders when passing callbacks as props.'],
  whyItMatters: 'useEffect with wrong dependencies is the #1 React bug. Missing cleanup in useEffect causes memory leaks. Unnecessary re-renders from missing useMemo/useCallback make apps slow. Custom hooks are how senior engineers reuse logic across components.',
  codeExamples: [
    { filename: 'Hooks.tsx', language: 'typescript', approach: 'minimal', code: `import { useState, useEffect, useRef } from "react";

function App() {
  const [data, setData] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Run once on mount (fetch data)
  useEffect(() => {
    fetch("/api/users")
      .then(r => r.json())
      .then(setData);
  }, []);  // empty array = once

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} placeholder="Auto-focused" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`, explanation: 'useEffect with [] runs once on mount. useRef for DOM access (focus). Fetch API data on mount.' },
    { filename: 'Hooks.tsx', language: 'typescript', approach: 'real-world', code: `import { useState, useEffect, useMemo, useCallback, useRef } from "react";

// useDebounce — custom hook (reusable!)
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);  // cleanup!
  }, [value, delay]);
  return debounced;
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 500);  // 500ms debounce

  // Fetch when debounced query changes
  useEffect(() => {
    if (!debouncedQuery) return;
    fetch(\`/api/search?q=\${debouncedQuery}\`)
      .then(r => r.json())
      .then(setResults);
  }, [debouncedQuery]);  // depends on debounced value

  // Memoize expensive calculation
  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => b.score - a.score);
  }, [results]);  // only re-sort when results change

  // Stable callback (does not change on re-render)
  const handleSelect = useCallback((id: number) => {
    console.log("Selected:", id);
  }, []);  // stable reference

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {sortedResults.map(r => (
          <li key={r.id} onClick={() => handleSelect(r.id)}>
            {r.title}
          </li>
        ))}
      </ul>
    </div>
  );
}`, explanation: 'Custom hook useDebounce (reusable). useEffect with dependency (debouncedQuery). useMemo for sorting (cache). useCallback for stable handler. This is production React.' },
    { filename: 'useApi.ts', language: 'typescript', approach: 'production', code: `import { useState, useEffect, useCallback, useRef } from "react";

// Production custom hook: fetch with loading/error/abort
interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApi<T>(url: string) {
  const [state, setState] = useState<State<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Abort previous request (race condition prevention)
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      const data = await res.json();
      setState({ data, loading: false, error: null });
    } catch (e) {
      if (e instanceof AbortError) return;  // ignore aborts
      setState({ data: null, loading: false, error: (e as Error).message });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();  // cleanup on unmount
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

// Usage:
// const { data, loading, error, refetch } = useApi<User[]>("/api/users");
// if (loading) return <Spinner />;
// if (error) return <Error message={error} />;
// return <UserList users={data} />;`, explanation: 'Production hook: loading/error states, AbortController for race conditions (cancel previous request), cleanup on unmount, refetch function. This is what senior engineers build.' },
  ],
  configFiles: [],
  lab: { title: 'Build Custom Hooks', steps: [
    { step: 1, title: 'Create useDebounce', instruction: 'Write the debounce hook', command: 'cat > src/hooks/useDebounce.ts << \'EOF\'\nimport { useState, useEffect } from "react";\nexport function useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n  return debounced;\n}\nEOF' },
    { step: 2, title: 'Create useApi', instruction: 'Write the API hook', command: 'Create src/hooks/useApi.ts with loading/error/abort' },
    { step: 3, title: 'Use hooks', instruction: 'Use in a component', command: 'Create a Search component that uses useDebounce + useApi', verification: 'Search debounces API calls' },
  ]},
  commonErrors: [
    { error: 'useEffect runs infinitely (infinite loop)', fix: 'Check dependency array. If you call setState in useEffect without [] or [specific deps], it runs every render → setState → re-render → useEffect → infinite loop.', rootCause: 'Missing or wrong dependency array. setState triggers re-render, which re-runs useEffect, which calls setState...' },
    { error: 'Memory leak: setState on unmounted component', fix: 'Add cleanup in useEffect: return () => controller.abort() or setIsMounted(false). Cancel pending requests on unmount.', rootCause: 'Async operation completes after component unmounts. setState on unmounted component is a memory leak.' },
    { error: 'ESLint warning: missing useEffect dependency', fix: 'Add ALL variables used inside useEffect to the dependency array. Or use useRef for values that should not trigger re-run.', rootCause: 'React Hooks ESLint plugin detects missing deps. Missing deps cause stale closures (using old state values).' },
  ],
  quiz: [
    { question: 'What does useEffect with [] (empty array) do?', options: ['Runs every render', 'Runs ONCE on mount', 'Never runs', 'Runs on unmount'], correctIndex: 1, explanation: 'Empty dependency array = run once on mount. Used for initial data fetching, event subscriptions. Cleanup runs on unmount.' },
    { question: 'When to use useRef vs useState?', options: ['Always useRef', 'useRef for values that should NOT trigger re-render, useState for values that should', 'Same thing', 'Always useState'], correctIndex: 1, explanation: 'useRef: changing value does NOT re-render (DOM refs, intervals, previous values). useState: changing value triggers re-render (UI data).' },
    { question: 'What does useCallback do?', options: ['Caches data', 'Caches function reference (prevents re-creation on every render)', 'Calls function', 'Nothing useful'], correctIndex: 1, explanation: 'useCallback returns the same function reference across renders (unless deps change). Prevents unnecessary re-renders of child components that receive the function as prop.' },
  ],
  resources: [
    { title: 'React Hooks Docs', url: 'https://react.dev/reference/react', type: 'docs' },
    { title: 'useEffect Guide', url: 'https://react.dev/learn/synchronizing-with-effects', type: 'article' },
    { title: 'Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', type: 'article' },
  ],
  whatToReadNext: 'Read about Component Patterns (next lesson) — composition, compound components, render props.',
};

export const reactL5: Lesson = {
  slug: 'component-patterns', title: 'Component Patterns — Composition, Compound, HOC',
  subtitle: 'Learn when to use each component pattern for reusable UI',
  duration: 70, difficulty: 'Intermediate', phase: 'Foundation', xp: 150, moduleSlug: 'react',
  objectives: ['Use composition (children prop) for flexible layouts','Build compound components (Select + Option)','Understand render props pattern','Know when to use HOC vs hooks vs composition','Apply the right pattern for each situation'],
  realWorldContext: 'At companies like Stripe and Linear, component libraries use these patterns. shadcn/ui uses composition. Radix UI uses compound components. Understanding patterns makes your code reusable and maintainable — you do not reinvent the wheel for every component.',
  prerequisites: ['Completed React L1-L4'],
  conceptDiagram: `COMPONENT PATTERNS:

  1. COMPOSITION (children prop) — most common
     <Card><Card.Header/><Card.Body/></Card>
     
  2. COMPOUND COMPONENTS — related components that share state
     <Select>
       <Select.Trigger/>
       <Select.Option value="a"/>
     </Select>
     
  3. RENDER PROPS — function as prop
     <List items={data} render={(item) => <Item {...item}/>} />
     
  4. HOC (Higher-Order Component) — function that takes a component
     withAuth(Component) → wrapped component with auth check`,
  conceptExplanation: ['Composition is the most common pattern. Use children prop: <Card>{children}</Card>. Flexible — parent decides what goes inside. This is how Layout, Modal, Card work.','Compound components share state via Context. <Select> manages state, <Select.Option> accesses it via context. Like native <select><option>. This is how Radix UI and shadcn/ui work.','Render props pass a function as prop: <DataLoader render={(data) => <Chart data={data} />} />. Less common now (hooks replaced most use cases), but still useful for dynamic rendering.'],
  whyItMatters: 'Without patterns, you copy-paste components and modify them — unmaintainable. With patterns, you build reusable building blocks. Compound components give you API like native HTML (<select><option>). This is how professional UI libraries are built.',
  codeExamples: [
    { filename: 'Patterns.tsx', language: 'typescript', approach: 'real-world', code: `import { createContext, useContext, useState, ReactNode } from "react";

// 1. COMPOSITION — children prop
function Card({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold">{title}</h3>
      {children}
    </div>
  );
}
// Usage: <Card title="Profile"><Avatar/><Bio/></Card>

// 2. COMPOUND COMPONENTS — shared state via context
const TabsContext = createContext<{ active: number; setActive: (n: number) => void } | null>(null);

function Tabs({ children, defaultIndex = 0 }: { children: ReactNode; defaultIndex?: number }) {
  const [active, setActive] = useState(defaultIndex);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

Tabs.List = function List({ children }: { children: ReactNode }) {
  return <div className="flex gap-2">{children}</div>;
};

Tabs.Tab = function Tab({ index, children }: { index: number; children: ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      onClick={() => ctx.setActive(index)}
      className={ctx.active === index ? "bg-blue-500 text-white" : "bg-gray-200"}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ index, children }: { index: number; children: ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return ctx.active === index ? <div>{children}</div> : null;
};

// Usage:
// <Tabs>
//   <Tabs.List>
//     <Tabs.Tab index={0}>Profile</Tabs.Tab>
//     <Tabs.Tab index={1}>Settings</Tabs.Tab>
//   </Tabs.List>
//   <Tabs.Panel index={0}><Profile/></Tabs.Panel>
//   <Tabs.Panel index={1}><Settings/></Tabs.Panel>
// </Tabs>`, explanation: 'Composition: children prop. Compound: context + dot notation (Tabs.Tab). Compound components share state via context — like native HTML elements.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Compound Component', steps: [
    { step: 1, title: 'Create Tabs', instruction: 'Build compound Tabs component', command: 'Create Tabs with Tabs.List, Tabs.Tab, Tabs.Panel using context' },
    { step: 2, title: 'Use it', instruction: 'Use in your app', command: 'Add Tabs with 2 panels to App.tsx', verification: 'Clicking tabs switches panels' },
  ]},
  commonErrors: [{ error: 'Context is null', fix: 'Add null check: const ctx = useContext(MyContext); if (!ctx) throw new Error("Must be used within Provider");', rootCause: 'Component used outside its Provider. Context returns null when no Provider is found.' }],
  quiz: [{ question: 'When to use compound components?', options: ['Always', 'When components share state and are used together (Tabs, Select, Accordion)', 'Never', 'Only for forms'], correctIndex: 1, explanation: 'Compound components share state via context. Like <select><option>, they work together. Use for Tabs, Accordion, Select, Menu.' }],
  resources: [{ title: 'Compound Components', url: 'https://react.dev/learn/passing-data-deeply-with-context', type: 'docs' }],
  whatToReadNext: 'Read about React Router (next lesson) — routing, nested routes, loaders, actions.',
};

// L6-L18 with real content (condensed but specific)
export const reactL6: Lesson = {
  slug: 'react-router', title: 'React Router v6 — Nested Routes, Loaders, Actions',
  subtitle: 'Build multi-page React apps with client-side routing',
  duration: 65, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'react',
  objectives: ['Set up React Router v6 with createBrowserRouter','Create nested routes with Outlet','Use loaders for data fetching before render','Use actions for form submissions','Add error boundaries and lazy loading'],
  realWorldContext: 'Every multi-page React app uses React Router. Companies like Vercel, Linear, and Notion use it for client-side routing. Loaders (new in v6.4+) fetch data BEFORE the page renders — no more loading spinners on navigation.',
  prerequisites: ['Completed React L1-L5'],
  conceptDiagram: `REACT ROUTER v6:
  createBrowserRouter([
    { path: "/", element: <Layout/>,
      children: [
        { index: true, element: <Home/> },
        { path: "users/:id", loader: userLoader, element: <UserProfile/> },
        { path: "settings", element: <Settings/> },
      ]
    }
  ])
  
  <Layout> uses <Outlet/> to render child routes
  Loaders: fetch data before render (no spinner!)
  Actions: handle form POST (like Remix)`,
  conceptExplanation: ['React Router v6.4+ uses createBrowserRouter (data router). Loaders fetch data before the page renders — the user sees content immediately, not a loading spinner. Actions handle form submissions.','Nested routes use <Outlet/> — the parent renders common UI (nav, sidebar), the outlet renders the child route. This prevents re-rendering the layout on navigation.','Lazy loading: const About = lazy(() => import("./About")). Reduces initial bundle size — only loads the page when visited. Wrap in <Suspense> for fallback.'],
  whyItMatters: 'Without routing, your app is a single page. Without loaders, every navigation shows a spinner. Without lazy loading, your initial bundle is huge (slow first load). These are essential for any real React app.',
  codeExamples: [
    { filename: 'router.tsx', language: 'typescript', approach: 'real-world', code: `import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load pages (smaller initial bundle)
const Home = lazy(() => import("./pages/Home"));
const Users = lazy(() => import("./pages/Users"));

// Layout with navigation
function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />  {/* child route renders here */}
      </Suspense>
    </div>
  );
}

// Loader: fetch data BEFORE render
async function usersLoader() {
  const res = await fetch("/api/users");
  return res.json();
}

const router = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  errorElement: <ErrorBoundary />,
  children: [
    { index: true, element: <Home /> },
    { path: "users", loader: usersLoader, element: <Users /> },
    { path: "users/:id", element: <UserProfile /> },
  ],
}]);

export default function App() {
  return <RouterProvider router={router} />;
}`, explanation: 'createBrowserRouter with nested routes, lazy loading, loaders (fetch before render), Outlet for child routes, error boundary.' },
  ],
  configFiles: [],
  lab: { title: 'Add Routing', steps: [
    { step: 1, title: 'Install', instruction: 'Install React Router', command: 'bun add react-router-dom' },
    { step: 2, title: 'Create router', instruction: 'Set up routes', command: 'Create router.tsx with createBrowserRouter' },
    { step: 3, title: 'Add pages', instruction: 'Create Home and Users pages', command: 'Create src/pages/Home.tsx and Users.tsx', verification: 'Navigation works between pages' },
  ]},
  commonErrors: [{ error: 'Blank page on navigation', fix: 'Check that you have <Outlet/> in the layout. Without Outlet, child routes have nowhere to render.', rootCause: 'Outlet is the placeholder where child route content renders.' }],
  quiz: [{ question: 'What does a loader do?', options: ['Shows spinner', 'Fetches data BEFORE the page renders (no spinner)', 'Loads CSS', 'Authenticates'], correctIndex: 1, explanation: 'Loaders run before the route renders. Data is available immediately — no loading spinner. This is the modern pattern (React Router v6.4+).' }],
  resources: [{ title: 'React Router v6', url: 'https://reactrouter.com/', type: 'docs' }],
  whatToReadNext: 'Read about State Management (next lesson) — Context, Zustand, Jotai.',
};

// L7-L18 — real specific content
export const reactL7: Lesson = {
  slug: 'state-management', title: 'State Management — Context, Zustand, Jotai',
  subtitle: 'Choose the right state management for your app',
  duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'react',
  objectives: ['Use Context + useReducer for global state','Use Zustand for simple stores','Use Jotai for atomic state','Choose between Context, Zustand, Jotai, Redux'],
  realWorldContext: 'Every app needs state management beyond useState. Context is built-in (good for auth, theme). Zustand is the most popular external library (simple, no boilerplate). Companies like Vercel use Zustand. Choosing the right one prevents over-engineering.',
  prerequisites: ['Completed React L1-L6'],
  conceptDiagram: `STATE MANAGEMENT OPTIONS:
  useState       → local component state
  Context        → global state (auth, theme) — built-in, no deps
  Zustand        → simple store (most popular) — minimal boilerplate
  Jotai          → atomic state (fine-grained) — for complex interactions
  Redux Toolkit  → large apps with complex flows — most boilerplate

  WHEN TO USE:
  Small app (1-5 components): useState + props
  Medium app: Context (auth/theme) + Zustand (data)
  Large app: Zustand or Redux Toolkit`,
  conceptExplanation: ['Context is built-in React. Good for low-frequency updates (auth, theme, locale). Bad for high-frequency (counters, real-time data) — it re-renders ALL consumers on every change.','Zustand is a tiny (1KB) library. Create a store with create(), use anywhere. No Provider needed. Selectors prevent unnecessary re-renders. This is what most new projects use.','Jotai uses atoms — each piece of state is independent. Good for fine-grained updates (only components using that atom re-render). Best for complex interdependent state.'],
  whyItMatters: 'Over-engineering state management (Redux for a small app) adds unnecessary complexity. Under-engineering (prop drilling everywhere) makes code unmaintainable. The right choice depends on app size and complexity.',
  codeExamples: [
    { filename: 'store.ts', language: 'typescript', approach: 'real-world', code: `// Zustand — simplest state management
import { create } from "zustand";

interface UserStore {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: async (email, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const user = await res.json();
    set({ user });
  },
  logout: () => set({ user: null }),
}));

// Usage in ANY component (no Provider needed!):
// const user = useUserStore(s => s.user);  // selector = no unnecessary re-renders
// const login = useUserStore(s => s.login);
// const { user, login } = useUserStore();  // re-renders on ANY change (avoid)`, explanation: 'Zustand: create() makes a store. Use anywhere without Provider. Selectors (s => s.user) prevent unnecessary re-renders.' },
  ],
  configFiles: [],
  lab: { title: 'Add State Management', steps: [{ step: 1, title: 'Install Zustand', instruction: 'Install', command: 'bun add zustand' }, { step: 2, title: 'Create store', instruction: 'Create auth store', command: 'Create src/store/auth.ts with login/logout' }, { step: 3, title: 'Use in components', instruction: 'Access store', command: 'Use useUserStore in components', verification: 'Login/logout works across components' }] },
  commonErrors: [{ error: 'Context causes re-renders everywhere', fix: 'Use Zustand instead for high-frequency updates. Or split Context into multiple providers. Use selectors with Zustand to only re-render when specific state changes.', rootCause: 'Context re-renders ALL consumers on any state change. High-frequency updates cause performance issues.' }],
  quiz: [{ question: 'When to use Zustand over Context?', options: ['Always', 'For high-frequency state changes (Context re-renders all consumers)', 'Never', 'Only for auth'], correctIndex: 1, explanation: 'Context re-renders ALL consumers on every state change. Zustand with selectors only re-renders components that use the changed state.' }],
  resources: [{ title: 'Zustand', url: 'https://github.com/pmndrs/zustand', type: 'docs' }],
  whatToReadNext: 'Read about TanStack Query (next lesson) — server state management (caching, invalidation).',
};

export const reactL8: Lesson = {
  slug: 'tanstack-query', title: 'TanStack Query — useQuery, useMutation, Cache',
  subtitle: 'The best way to fetch data in React — caching, invalidation, optimistic updates',
  duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'react',
  objectives: ['Use useQuery for data fetching with caching','Use useMutation for POST/PUT/DELETE','Invalidate queries to refetch','Implement optimistic updates','Configure stale time and cache time'],
  realWorldContext: 'TanStack Query (formerly React Query) is used by Vercel, Linear, and most modern React apps. It handles caching, deduplication, background refetching, and optimistic updates — all things you would build manually otherwise. It is THE standard for server state in React.',
  prerequisites: ['Completed React L1-L7'],
  conceptDiagram: `TANSTACK QUERY:
  useQuery: GET data (caching, refetch, loading/error states)
    const { data, isLoading, error } = useQuery({
      queryKey: ["users"],
      queryFn: () => fetch("/api/users").then(r => r.json()),
    })

  useMutation: POST/PUT/DELETE (with invalidation)
    const mutation = useMutation({
      mutationFn: (newUser) => fetch("/api/users", { method: "POST", body: ... }),
      onSuccess: () => queryClient.invalidateQueries(["users"]),
    })

  CACHE:
  - Same queryKey = deduplicated (one request)
  - staleTime: how long data is fresh (default: 0 = always refetch)
  - gcTime: how long to keep unused data (default: 5 min)`,
  conceptExplanation: ['useQuery handles GET requests. It caches by queryKey — if two components use the same key, only ONE request is made. It auto-refetches on window focus (configurable). Gives isLoading, error, data states automatically.','useMutation handles POST/PUT/DELETE. After success, call queryClient.invalidateQueries(["users"]) to refetch the list. This is the pattern: mutate → invalidate → UI updates automatically.','Optimistic updates: update the UI BEFORE the server responds. If server fails, rollback. This makes the app feel instant. TanStack Query has onMutate for this.'],
  whyItMatters: 'Without TanStack Query, you build: loading states, error handling, caching, refetching, race condition handling, deduplication — all manually. TanStack Query does ALL of this in 5 lines. It is the biggest productivity boost in React.',
  codeExamples: [
    { filename: 'api.tsx', language: 'typescript', approach: 'real-world', code: `import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// GET — fetch users (cached, deduplicated, auto-refetch)
function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then(r => r.json()),
    staleTime: 60000,  // fresh for 60s (no refetch)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return users.map(u => <div key={u.id}>{u.name}</div>);
}

// POST — create user (with cache invalidation)
function CreateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newUser: User) =>
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }).then(r => r.json()),
    onSuccess: () => {
      // Refetch users list — UI updates automatically!
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "Alice" })}>
      {mutation.isPending ? "Creating..." : "Create User"}
    </button>
  );
}`, explanation: 'useQuery: GET with caching (staleTime), loading/error states. useMutation: POST with invalidation (refetch list on success). This replaces ALL manual fetch logic.' },
  ],
  configFiles: [],
  lab: { title: 'Add TanStack Query', steps: [
    { step: 1, title: 'Install', instruction: 'Install TanStack Query', command: 'bun add @tanstack/react-query' },
    { step: 2, title: 'Set up provider', instruction: 'Wrap app in QueryClientProvider', command: 'Create QueryClient and wrap App' },
    { step: 3, title: 'Use useQuery', instruction: 'Fetch data with caching', command: 'Replace fetch+useEffect with useQuery', verification: 'Data loads with loading/error states, cached across navigations' },
  ]},
  commonErrors: [{ error: 'Data refetches too often', fix: 'Set staleTime: 60000 (1 minute). Default staleTime is 0 (always refetch on mount/focus). Adjust based on data freshness needs.', rootCause: 'Default staleTime=0 means data is immediately stale. TanStack Query refetches on mount, window focus, reconnect.' }],
  quiz: [{ question: 'What does queryClient.invalidateQueries do?', options: ['Deletes cache', 'Marks queries as stale → triggers refetch (UI updates automatically)', 'Pauses queries', 'Shows error'], correctIndex: 1, explanation: 'Invalidation marks queries as stale. If the query is active (component is mounted), it refetches immediately. UI updates with new data.' }],
  resources: [{ title: 'TanStack Query', url: 'https://tanstack.com/query/latest', type: 'docs' }],
  whatToReadNext: 'Read about Forms (next lesson) — React Hook Form + Zod validation.',
};

// L9-L18 — each with specific real content
export const reactL9: Lesson = {
  slug: 'forms', title: 'Forms — React Hook Form + Zod Validation',
  subtitle: 'Build production forms with validation',
  duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'react',
  objectives: ['Use React Hook Form for performant forms','Validate with Zod schemas','Handle multi-step forms','Show field-level and form-level errors','Submit form data to API'],
  realWorldContext: 'Forms are how users interact with your app — registration, checkout, settings. React Hook Form is the standard (used by Vercel, Linear). It is 10x more performant than controlled forms because it does NOT re-render on every keystroke. Zod provides type-safe validation.',
  prerequisites: ['Completed React L1-L8'],
  conceptDiagram: `REACT HOOK FORM + ZOD:
  1. Define Zod schema (validation rules)
  2. Use useForm with zodResolver
  3. Register fields with {...register("name")}
  4. Show errors with errors.name?.message
  5. Submit with handleSubmit(onSubmit)

  WHY RHF (not controlled forms):
  - Does NOT re-render on every keystroke (uncontrolled)
  - 10x faster for large forms
  - Built-in validation, dirty checking, submit loading`,
  conceptExplanation: ['React Hook Form uses uncontrolled inputs — it does NOT update React state on every keystroke. This means no re-render per character typed. 10x faster than controlled forms for large forms (20+ fields).','Zod defines validation schemas: z.object({ email: z.string().email(), password: z.string().min(8) }). The schema is also a TypeScript type: type FormData = z.infer<typeof schema>. One source of truth for validation AND types.'],
  whyItMatters: 'Controlled forms (value={state} onChange={setState}) re-render on every keystroke. For a 20-field form, that is 20 re-renders per character. React Hook Form avoids this. Zod gives you validation + TypeScript types from one schema — no duplicate definitions.',
  codeExamples: [
    { filename: 'Form.tsx', language: 'typescript', approach: 'real-world', code: `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema = validation + TypeScript types
const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password too short"),
});

type FormData = z.infer<typeof schema>;  // type from schema!

function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("email")} type="email" placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}`, explanation: 'Zod schema defines validation + types. useForm with zodResolver. register() connects inputs. errors show messages. isSubmitting for button state. This is the standard production form pattern.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Registration Form', steps: [
    { step: 1, title: 'Install', instruction: 'Install RHF + Zod', command: 'bun add react-hook-form zod @hookform/resolvers' },
    { step: 2, title: 'Create form', instruction: 'Build registration form', command: 'Create RegisterForm with name, email, password fields' },
    { step: 3, title: 'Test validation', instruction: 'Try invalid inputs', command: 'Submit with empty fields → see errors', verification: 'Validation messages appear' },
  ]},
  commonErrors: [{ error: 'Form re-renders on every keystroke (slow)', fix: 'Use React Hook Form (uncontrolled). It does NOT re-render on keystroke. Controlled forms (value={state}) do.', rootCause: 'Controlled inputs trigger setState on every keystroke → re-render. RHF uses refs, no re-render.' }],
  quiz: [{ question: 'Why use React Hook Form over controlled forms?', options: ['More features', 'Does NOT re-render on every keystroke (10x faster for large forms)', 'Required', 'Better validation'], correctIndex: 1, explanation: 'Controlled forms re-render on every keystroke. RHF uses uncontrolled inputs (refs) — no re-render per character. 10x faster for 20+ field forms.' }],
  resources: [{ title: 'React Hook Form', url: 'https://react-hook-form.com/', type: 'docs' }, { title: 'Zod', url: 'https://zod.dev/', type: 'docs' }],
  whatToReadNext: 'Read about Styling (next lesson) — Tailwind CSS, shadcn/ui.',
};

export const reactL10: Lesson = {
  slug: 'styling', title: 'Styling — Tailwind CSS, shadcn/ui, CVA',
  subtitle: 'Style your React app with Tailwind and component libraries',
  duration: 60, difficulty: 'Intermediate', phase: 'Intermediate', xp: 150, moduleSlug: 'react',
  objectives: ['Set up Tailwind CSS v4 with Vite','Use utility classes for rapid styling','Install and use shadcn/ui components','Create variant components with CVA','Configure dark mode'],
  realWorldContext: 'Tailwind CSS is used by Vercel, GitHub, and every modern startup. shadcn/ui (built on Tailwind + Radix) is the most popular React component library — used by Linear, Cal.com, and many YC startups. Together they give you production UI in minutes, not days.',
  prerequisites: ['Completed React L1-L9'],
  conceptDiagram: `TAILWIND + SHADCN/UI:
  Tailwind: utility classes (bg-blue-500, p-4, rounded-lg)
  shadcn/ui: copy-paste components (Button, Dialog, Table)
  CVA: variant management (variants: primary, danger, ghost)

  TAILWIND EXAMPLE:
  <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md">
    <h1 className="text-2xl font-bold text-gray-900">Title</h1>
  </div>

  SHADCN/UI:
  npx shadcn@latest add button dialog table
  → copies component code into YOUR project (you own it)`,
  conceptExplanation: ['Tailwind CSS uses utility classes instead of custom CSS. No more naming CSS classes. Faster development, smaller bundle (only used classes are included). Dark mode with dark: prefix.','shadcn/ui is NOT a npm package — it copies component source code into your project. You own and customize the code. Built on Radix UI (accessibility) + Tailwind (styling). This is why it is so popular — no black box.','CVA (Class Variance Authority) manages component variants: { primary: "bg-blue-500", danger: "bg-red-500" }. Type-safe variant selection. Used by shadcn/ui internally.'],
  whyItMatters: 'Without Tailwind, you write custom CSS for every component (slow, inconsistent). Without shadcn/ui, you build Dialog, Select, Table from scratch (weeks of work). Together: production UI in minutes. This is the fastest way to build beautiful React apps.',
  codeExamples: [
    { filename: 'Component.tsx', language: 'typescript', approach: 'real-world', code: `import { cva, type VariantProps } from "class-variance-authority";

// CVA — type-safe variants
const buttonStyles = cva(
  "px-4 py-2 rounded font-medium transition",  // base
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        ghost: "bg-transparent hover:bg-gray-100",
      },
      size: {
        sm: "text-sm px-3 py-1",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonStyles> {}

function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}

// Usage:
// <Button variant="danger" size="lg">Delete</Button>
// <Button variant="ghost">Cancel</Button>`, explanation: 'CVA: type-safe variants. shadcn/ui uses this pattern. Variants are autocomplete in VS Code. Type-safe = no invalid variant combinations.' },
  ],
  configFiles: [{ filename: 'tailwind.config.ts', language: 'typescript', content: `import type { Config } from "tailwindcss";\nexport default {\n  content: ["./src/**/*.{ts,tsx}"],\n  darkMode: "class",\n  theme: { extend: { colors: { brand: "#7C3AED" } } },\n} satisfies Config;`, comment: 'Tailwind config with dark mode (class strategy) and custom brand color' }],
  lab: { title: 'Add Tailwind + shadcn/ui', steps: [
    { step: 1, title: 'Install Tailwind', instruction: 'Set up Tailwind', command: 'bun add -D tailwindcss @tailwindcss/vite' },
    { step: 2, title: 'Add shadcn/ui', instruction: 'Init shadcn', command: 'npx shadcn@latest init' },
    { step: 3, title: 'Add components', instruction: 'Add Button and Dialog', command: 'npx shadcn@latest add button dialog', verification: 'Components in src/components/ui/' },
  ]},
  commonErrors: [{ error: 'Tailwind classes not applying', fix: 'Check content array in tailwind.config.ts includes all source files. Restart dev server after config change.', rootCause: 'Tailwind only generates CSS for classes found in files matching the content pattern.' }],
  quiz: [{ question: 'What makes shadcn/ui different from other component libraries?', options: ['It is faster', 'It copies source code into YOUR project (you own and customize it)', 'It is cheaper', 'It is required'], correctIndex: 1, explanation: 'shadcn/ui is not an npm package. It copies component source into your project. You own the code, can customize freely, no version lock-in.' }],
  resources: [{ title: 'Tailwind CSS', url: 'https://tailwindcss.com/', type: 'docs' }, { title: 'shadcn/ui', url: 'https://ui.shadcn.com/', type: 'docs' }],
  whatToReadNext: 'Read about API Integration (next lesson) — Axios, interceptors, auth token refresh.',
};

// L11-L18 — specific real content
export const reactL11: Lesson = {
  slug: 'api-integration', title: 'API Integration — Axios, Interceptors, Auth Refresh',
  subtitle: 'Connect your React app to a backend API with auth',
  duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'react',
  objectives: ['Create Axios instance with base URL and interceptors','Add auth token to every request automatically','Refresh expired tokens transparently','Handle 401 errors with redirect to login','Retry failed requests'],
  realWorldContext: 'Every React app talks to an API. Axios interceptors add auth tokens to EVERY request without repeating code. When a token expires, the interceptor refreshes it and retries the request — the user never sees it. This is how Vercel, Linear, and every SaaS app handles auth.',
  prerequisites: ['Completed React L1-L10'],
  conceptDiagram: `AXIOS INTERCEPTORS:
  Request → [Add Auth Header] → API
  Response ← [401? Refresh Token → Retry] ← API

  FLOW:
  1. User logs in → store JWT token
  2. Every request: interceptor adds "Authorization: Bearer <token>"
  3. Token expires (401) → interceptor refreshes → retries request
  4. Refresh fails → redirect to login

  This is INVISIBLE to the user — they never see "session expired"`,
  conceptExplanation: ['Axios interceptors run on EVERY request/response. Request interceptor: add auth header, add request ID. Response interceptor: handle 401 (refresh token), handle 500 (log error). This is the central place for cross-cutting concerns.','Token refresh: when access token expires (30 min), the response interceptor catches 401, calls /refresh to get a new token, then retries the original request. The user never knows their token expired.','Use a queue for refresh: if 5 requests fail with 401 simultaneously, only ONE refresh call is made. Other requests wait for the refresh to complete, then retry with the new token.'],
  whyItMatters: 'Without interceptors, you add auth headers manually to every fetch call. Without auto-refresh, users get "session expired" errors and have to re-login. This pattern is how production apps provide seamless auth — the user logs in once and never thinks about tokens again.',
  codeExamples: [
    { filename: 'api.ts', language: 'typescript', approach: 'production', code: `import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 30000,
});

// REQUEST interceptor: add auth token to EVERY request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// RESPONSE interceptor: handle 401 (token expired)
let isRefreshing = false;
let queue: ((token: string) => void)[] = [];

api.interceptors.response.use(
  (response) => response,  // success: pass through
  async (error) => {
    const original = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        // Queue this request — wait for refresh
        return new Promise((resolve) => {
          queue.push((token: string) => {
            original.headers.Authorization = \`Bearer \${token}\`;
            resolve(api(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;
      try {
        const res = await axios.post("/api/auth/refresh", {
          refresh_token: localStorage.getItem("refresh_token"),
        });
        const newToken = res.data.access_token;
        localStorage.setItem("access_token", newToken);

        // Retry queued requests
        queue.forEach((cb) => cb(newToken));
        queue = [];

        // Retry original request
        original.headers.Authorization = \`Bearer \${newToken}\`;
        return api(original);
      } catch (refreshError) {
        // Refresh failed → redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;`, explanation: 'Production Axios: request interceptor adds token, response interceptor handles 401 with refresh + retry. Queue prevents multiple refresh calls. Redirect to login on refresh failure.' },
  ],
  configFiles: [],
  lab: { title: 'Add API Client', steps: [
    { step: 1, title: 'Install Axios', instruction: 'Install', command: 'bun add axios' },
    { step: 2, title: 'Create API client', instruction: 'Set up interceptors', command: 'Create src/lib/api.ts with request and response interceptors' },
    { step: 3, title: 'Use in components', instruction: 'Replace fetch with api', command: 'Use api.get("/users") instead of fetch', verification: 'Auth header added to all requests' },
  ]},
  commonErrors: [{ error: 'Multiple refresh calls on simultaneous 401', fix: 'Use a queue + isRefreshing flag. First 401 triggers refresh, others wait. When refresh completes, retry all queued requests.', rootCause: 'Without queueing, 5 simultaneous 401s trigger 5 refresh calls. Only 1 should be made.' }],
  quiz: [{ question: 'What does an Axios request interceptor do?', options: ['Caches responses', 'Runs on EVERY request (add auth header, modify config)', 'Handles errors', 'Logs responses'], correctIndex: 1, explanation: 'Request interceptor runs before every request is sent. Use to add auth headers, request IDs, modify config.' }],
  resources: [{ title: 'Axios Interceptors', url: 'https://axios-http.com/docs/interceptors', type: 'docs' }],
  whatToReadNext: 'Read about WebSocket Client (next lesson) — real-time communication.',
};

export const reactL12: Lesson = {
  slug: 'websocket-client', title: 'WebSocket Client — useWebSocket Hook, Reconnection',
  subtitle: 'Real-time communication in React with auto-reconnect',
  duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'react',
  objectives: ['Create useWebSocket custom hook','Auto-reconnect on disconnect','Message queue for offline messages','Handle real-time UI updates','Clean up on unmount'],
  realWorldContext: 'Real-time features (chat, notifications, live dashboards) need WebSockets. Companies like Discord, Slack, and Figma use WebSockets for real-time collaboration. Auto-reconnect is critical — users should not notice temporary network issues.',
  prerequisites: ['Completed React L1-L11'],
  conceptDiagram: `WEBSOCKET IN REACT:
  useWebSocket("ws://localhost:8000/ws")
    → connect on mount
    → send/receive messages
    → auto-reconnect on disconnect
    → clean up on unmount

  RECONNECT STRATEGY:
  disconnect → wait 1s → reconnect → fail → wait 2s → reconnect → ...
  Exponential backoff with max delay`,
  conceptExplanation: ['WebSocket keeps a persistent connection open. Unlike HTTP (request-response), the server can PUSH messages to the client at any time. Perfect for chat, notifications, live updates.','Auto-reconnect: when connection drops, wait 1s, reconnect. If fails, wait 2s, then 4s, 8s (exponential backoff). Max delay 30s. The user never needs to refresh the page.','Clean up on unmount: close the WebSocket when the component unmounts. Without this, you leak connections and get memory leaks.'],
  whyItMatters: 'Without WebSockets, you poll the server every 5 seconds (wasteful, slow, not real-time). Without auto-reconnect, users see "disconnected" on any network blip. This is how production real-time apps work.',
  codeExamples: [
    { filename: 'useWebSocket.ts', language: 'typescript', approach: 'production', code: `import { useEffect, useRef, useState, useCallback } from "react";

interface Options {
  onMessage?: (data: any) => void;
  reconnectInterval?: number;
  maxRetries?: number;
}

export function useWebSocket(url: string, options: Options = {}) {
  const { onMessage, reconnectInterval = 1000, maxRetries = 10 } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const retryCount = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    if (retryCount.current >= maxRetries) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      retryCount.current = 0;  // reset on success
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages(prev => [...prev, data]);
      onMessage?.(data);
    };

    ws.onclose = () => {
      setIsConnected(false);
      // Exponential backoff reconnect
      const delay = Math.min(reconnectInterval * 2 ** retryCount.current, 30000);
      retryCount.current++;
      timeoutRef.current = setTimeout(connect, delay);
    };

    ws.onerror = () => ws.close();
  }, [url, onMessage, reconnectInterval, maxRetries]);

  const send = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      clearTimeout(timeoutRef.current);
    };
  }, [connect]);

  return { isConnected, messages, send };
}

// Usage:
// const { isConnected, messages, send } = useWebSocket("ws://localhost:8000/ws");
// send({ type: "message", content: "Hello" });`, explanation: 'Production hook: auto-reconnect with exponential backoff, message state, send function, cleanup on unmount. This is how real-time React apps work.' },
  ],
  configFiles: [],
  lab: { title: 'Add Real-time Updates', steps: [{ step: 1, title: 'Create hook', instruction: 'Write useWebSocket', command: 'Create src/hooks/useWebSocket.ts' }, { step: 2, title: 'Use in component', instruction: 'Connect to WebSocket', command: 'Use hook in a chat component', verification: 'Messages appear in real-time' }] },
  commonErrors: [{ error: 'WebSocket memory leak on unmount', fix: 'Close the WebSocket in useEffect cleanup: return () => ws.close(). Clear any reconnect timeouts.', rootCause: 'Without cleanup, the WebSocket stays open after the component unmounts. Reconnect timer keeps running.' }],
  quiz: [{ question: 'Why use exponential backoff for reconnection?', options: ['Faster', 'Prevents server overload (1s, 2s, 4s, 8s — not hammering every 1s)', 'Required', 'Uses less memory'], correctIndex: 1, explanation: 'Exponential backoff prevents overloading the server with reconnection attempts. 1s → 2s → 4s → 8s → max 30s. If the server is down, you do not want 1000 clients reconnecting every second.' }],
  resources: [{ title: 'WebSocket API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket', type: 'docs' }],
  whatToReadNext: 'Read about Performance (next lesson) — Profiler, memo, virtualization.',
};

export const reactL13: Lesson = {
  slug: 'performance', title: 'Performance — Profiler, Memo, Virtualization',
  subtitle: 'Optimize React app performance',
  duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'react',
  objectives: ['Use React DevTools Profiler to find slow renders','Use React.memo for component memoization','Use useMemo and useCallback correctly','Virtualize long lists with TanStack Virtual','Split bundles with lazy loading'],
  realWorldContext: 'A slow React app loses users. Google found that 400ms delay = 0.4% fewer searches. At scale, performance = revenue. Companies use Profiler to find bottlenecks, memo to prevent unnecessary renders, and virtualization for long lists.',
  prerequisites: ['Completed React L1-L12'],
  conceptDiagram: `PERFORMANCE TOOLS:
  1. React DevTools Profiler → find slow renders
  2. React.memo → prevent re-render if props unchanged
  3. useMemo → cache expensive calculations
  4. useCallback → stable function references
  5. Virtualization → render only visible items (100K rows)
  6. Lazy loading → split bundle by route

  WHEN TO OPTIMIZE:
  1. MEASURE (Profiler) → find bottleneck
  2. Optimize → memo, useMemo, virtualization
  3. MEASURE again → verify improvement`,
  conceptExplanation: ['React DevTools Profiler shows which components re-render and how long they take. Look for: components that re-render unnecessarily, renders that take >16ms (causes jank). Profile before optimizing — do not guess.','React.memo prevents re-render if props are equal. But if you pass new objects/arrays/functions every render, memo does not help. Use useMemo for objects, useCallback for functions. Memo is useless without stable props.','Virtualization renders only visible items. A list of 10,000 items renders only ~20 visible ones. The rest are rendered on scroll. Use TanStack Virtual or react-window. Without this, 10K DOM nodes = frozen browser.'],
  whyItMatters: 'A React app with 10,000 list items without virtualization = frozen browser. A form that re-renders on every keystroke = laggy typing. Performance optimization is what separates a demo from a production app.',
  codeExamples: [
    { filename: 'Perf.tsx', language: 'typescript', approach: 'production', code: `import { memo, useMemo, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

// 1. React.memo — prevent re-render if props unchanged
const ExpensiveItem = memo(function Item({ data, onSelect }: Props) {
  console.log("Item rendered");  // only if data or onSelect changes
  return <div onClick={() => onSelect(data.id)}>{data.name}</div>;
});

// 2. Virtualized list (render only visible items)
function BigList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,  // row height
    overscan: 5,  // render 5 extra above/below
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map(vi => (
          <div
            key={vi.key}
            style={{
              position: "absolute",
              top: vi.start,
              height: vi.size,
              width: "100%",
            }}
          >
            <ExpensiveItem data={items[vi.index]} onSelect={handleSelect} />
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Stable callback (does not break memo)
const handleSelect = useCallback((id: number) => {
  console.log("Selected:", id);
}, []);  // stable reference — does not cause re-renders`, explanation: 'React.memo + stable props (useCallback) = no unnecessary re-renders. Virtualization = only render visible items (10K list = smooth). This is how production apps handle large lists.' },
  ],
  configFiles: [],
  lab: { title: 'Optimize a Slow Component', steps: [
    { step: 1, title: 'Profile', instruction: 'Use React DevTools Profiler', command: 'Install React DevTools browser extension, record a render', verification: 'See which components take longest' },
    { step: 2, title: 'Add memo', instruction: 'Wrap slow components in React.memo', command: 'Wrap component with memo(), ensure stable props with useCallback' },
    { step: 3, title: 'Virtualize lists', instruction: 'Add TanStack Virtual', command: 'bun add @tanstack/react-virtual && useVirtualizer', verification: '10K list scrolls smoothly' },
  ]},
  commonErrors: [{ error: 'React.memo not working (still re-renders)', fix: 'Check if you pass new objects/arrays/functions every render. Use useMemo for objects, useCallback for functions. Memo only works with stable props.', rootCause: 'Memo does shallow comparison. New object {} every render = different reference = re-render. Need useMemo/useCallback.' }],
  quiz: [{ question: 'What does virtualization do?', options: ['Caches data', 'Renders only visible items (10K list → only ~20 DOM nodes)', 'Compresses HTML', 'Adds lazy loading'], correctIndex: 1, explanation: 'Virtualization renders only visible items + a few extra (overscan). 10,000 items → only ~20 DOM nodes. The rest are rendered on scroll. Prevents browser freeze.' }],
  resources: [{ title: 'React Profiler', url: 'https://react.dev/reference/react/Profiler', type: 'docs' }, { title: 'TanStack Virtual', url: 'https://tanstack.com/virtual/latest', type: 'docs' }],
  whatToReadNext: 'Read about Testing (next lesson) — Vitest, Testing Library, MSW.',
};

export const reactL14: Lesson = {
  slug: 'testing', title: 'Testing — Vitest, Testing Library, MSW',
  subtitle: 'Test React components and hooks',
  duration: 75, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'react',
  objectives: ['Set up Vitest with React Testing Library','Test component rendering and interactions','Mock API calls with MSW (Mock Service Worker)','Test custom hooks with renderHook','Achieve 80%+ coverage'],
  realWorldContext: 'Untested React code breaks in production. Companies require 80%+ coverage. Vitest (fast, Vite-native) + Testing Library (test like a user) + MSW (mock APIs) is the standard stack. Vercel, Linear, and Cal.com all use this exact setup.',
  prerequisites: ['Completed React L1-L13'],
  conceptDiagram: `TESTING STACK:
  Vitest           → test runner (fast, Vite-native)
  Testing Library  → test components like a user (query, click, type)
  MSW              → mock API calls (intercepts fetch, returns fake data)
  jest-dom         → custom matchers (toBeInTheDocument, toBeDisabled)

  TEST PATTERNS:
  render(<Component/>) → mount component
  screen.getByText() → find element
  userEvent.click() → simulate user action
  expect(element).toBeInTheDocument() → assert`,
  conceptExplanation: ['Testing Library tests components like a real user: find elements by text, click buttons, type in inputs. It does NOT test implementation details (state, methods). If your test breaks on a refactor, your test is too tied to implementation.','MSW (Mock Service Worker) intercepts fetch/XHR requests and returns mock data. Your component thinks it is calling the real API. This means: no real API needed for tests, tests are fast, tests do not break when API changes.','Vitest is the Vite-native test runner. It is 10x faster than Jest (uses Vite transform). Same API as Jest (describe, it, expect). Built-in watch mode, coverage, mocking.'],
  whyItMatters: 'Without tests, every deploy is a gamble. With tests, you refactor confidently. Testing Library ensures your tests survive refactors — they test what the user sees, not internal state. MSW means tests run without a backend.',
  codeExamples: [
    { filename: 'test.tsx', language: 'typescript', approach: 'production', code: `import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { UserList } from "./UserList";

// MSW: mock API
const server = setupServer(
  http.get("/api/users", () => {
    return HttpResponse.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);
  })
);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("UserList", () => {
  it("renders users from API", async () => {
    render(<UserList />);
    // Wait for API to load
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<UserList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("filters users by search", async () => {
    render(<UserList />);
    await screen.findByText("Alice");  // wait for load

    // Type in search (like a real user)
    await userEvent.type(screen.getByPlaceholderText("Search..."), "Alice");

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });
});`, explanation: 'Vitest + Testing Library + MSW: mock API, render component, find elements by text, simulate user typing. Tests are user-focused, not implementation-focused.' },
  ],
  configFiles: [{ filename: 'vitest.config.ts', language: 'typescript', content: `import { defineConfig } from "vitest/config";\nimport react from "@vitejs/plugin-react";\nimport path from "path";\n\nexport default defineConfig({\n  plugins: [react()],\n  test: {\n    environment: "jsdom",\n    setupFiles: ["./src/test/setup.ts"],\n    globals: true,\n    coverage: { provider: "v8", reporter: ["text", "html"] },\n  },\n  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },\n});`, comment: 'Vitest config with jsdom (DOM in tests), coverage, path alias' }],
  lab: { title: 'Test Your Components', steps: [
    { step: 1, title: 'Install', instruction: 'Install test deps', command: 'bun add -D vitest @testing-library/react @testing-library/user-event msw jsdom' },
    { step: 2, title: 'Write test', instruction: 'Test a component', command: 'Create test file with render, findByText, userEvent' },
    { step: 3, title: 'Run tests', instruction: 'Run with coverage', command: 'bunx vitest run --coverage', verification: 'Tests pass, coverage > 80%' },
  ]},
  commonErrors: [{ error: 'Cannot find element (getByText fails)', fix: 'Use findByText (async, waits) instead of getByText (sync, immediate). The element may not be rendered yet (API still loading).', rootCause: 'getByText throws immediately if element is not found. findByText waits (async) for it to appear.' }],
  quiz: [{ question: 'Why use Testing Library over Enzyme?', options: ['Faster', 'Tests like a user (by text, role) — not implementation details', 'More features', 'Required'], correctIndex: 1, explanation: 'Testing Library tests what the user sees (text, roles, labels). Enzyme tested implementation (state, methods). Testing Library tests survive refactors — Enzyme tests break on refactors.' }],
  resources: [{ title: 'Vitest', url: 'https://vitest.dev/', type: 'docs' }, { title: 'Testing Library', url: 'https://testing-library.com/', type: 'docs' }, { title: 'MSW', url: 'https://mswjs.io/', type: 'docs' }],
  whatToReadNext: 'Read about Auth Flows (next lesson) — JWT, protected routes, refresh.',
};

export const reactL15: Lesson = {
  slug: 'auth-flows', title: 'Auth Flows — JWT, Protected Routes, Refresh',
  subtitle: 'Implement authentication in React',
  duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'react',
  objectives: ['Store JWT tokens (httpOnly cookie vs localStorage)','Create protected routes with auth check','Implement refresh token rotation','Redirect to login on 401','Persist auth across page refresh'],
  realWorldContext: 'Auth is required for every app with users. The pattern: login → get tokens → store → attach to requests → refresh when expired → redirect to login on failure. Companies like Vercel and Linear use httpOnly cookies for security; localStorage is simpler but vulnerable to XSS.',
  prerequisites: ['Completed React L1-L14'],
  conceptDiagram: `AUTH FLOW:
  Login → POST /token → get access_token + refresh_token
  Store tokens (localStorage or httpOnly cookie)
  Every request: Authorization: Bearer <access_token>
  Token expires (401) → POST /refresh → new tokens → retry
  Refresh fails → redirect to /login

  PROTECTED ROUTES:
  <Route element={<RequireAuth/>}>
    <Route path="/dashboard" element={<Dashboard/>}/>
  </Route>
  
  RequireAuth: check token → redirect to /login if missing`,
  conceptExplanation: ['JWT tokens: access token (short-lived, 30 min) for API calls, refresh token (long-lived, 7 days) to get new access tokens. Store access token in memory or localStorage. Store refresh token in httpOnly cookie (XSS-safe).','Protected routes: a wrapper component that checks if the user is authenticated. If not, redirect to /login with a "redirect back" parameter. After login, redirect back to the original page.','Token refresh: when access token expires, call /refresh with the refresh token. Get new access token. Retry the original request. The user never sees this — it is transparent.'],
  whyItMatters: 'Without auth, anyone can access any page. Without protected routes, users see "dashboard" without logging in. Without refresh, users get kicked out every 30 minutes. This is the most important security feature of any app.',
  codeExamples: [
    { filename: 'Auth.tsx', language: 'typescript', approach: 'production', code: `import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/auth";

// Protected route wrapper
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = useUserStore(s => s.user);
  const location = useLocation();

  if (!user) {
    // Redirect to login, remember where they were going
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

// Usage in router:
// <Route element={<RequireAuth/>}>
//   <Route path="/dashboard" element={<Dashboard/>}/>
//   <Route path="/settings" element={<Settings/>}/>
// </Route>

// Login page
function LoginPage() {
  const login = useUserStore(s => s.login);
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate(from, { replace: true });  // go back to original page
  };
  // ...
}`, explanation: 'RequireAuth: check user, redirect to /login if not authenticated. After login, redirect back to original page. This is how every protected app works.' },
  ],
  configFiles: [],
  lab: { title: 'Add Authentication', steps: [
    { step: 1, title: 'Create auth store', instruction: 'Set up Zustand auth store', command: 'Create store with login, logout, user state' },
    { step: 2, title: 'Add RequireAuth', instruction: 'Create protected route wrapper', command: 'Create RequireAuth component that redirects to /login' },
    { step: 3, title: 'Create login page', instruction: 'Build login form', command: 'Create LoginPage that calls login and redirects back' },
  ]},
  commonErrors: [{ error: 'User loses auth on page refresh', fix: 'Store token in localStorage (persisted). On app mount, check localStorage and restore session. Or use httpOnly cookies (automatically sent by browser).', rootCause: 'Zustand state is in-memory — lost on refresh. Persist tokens in localStorage or use cookies.' }],
  quiz: [{ question: 'Where to store JWT access token?', options: ['localStorage (simple but XSS vulnerable)', 'httpOnly cookie (XSS-safe but CSRF risk)', 'In memory only (lost on refresh)', 'Depends on security requirements'], correctIndex: 3, explanation: 'localStorage: simple, XSS vulnerable. httpOnly cookie: XSS-safe, CSRF risk (use SameSite). In-memory: most secure, lost on refresh. Choose based on your security needs.' }],
  resources: [{ title: 'JWT Best Practices', url: 'https://datatracker.ietf.org/doc/html/rfc8725', type: 'article' }],
  whatToReadNext: 'Read about File Upload UI (next lesson) — drag-and-drop, progress, S3.',
};

export const reactL16: Lesson = {
  slug: 'file-upload-ui', title: 'File Upload UI — Drag-drop, Progress, S3 Presigned',
  subtitle: 'Build file upload with drag-and-drop and progress bars',
  duration: 65, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'react',
  objectives: ['Add drag-and-drop with react-dropzone','Show upload progress bar','Preview images before upload','Use S3 presigned URLs for direct upload','Handle multiple files'],
  realWorldContext: 'File upload is how users share content — photos, documents, videos. Companies like Google Drive, Dropbox, and Slack all use drag-and-drop with progress bars. S3 presigned URLs let clients upload directly to S3 (bypassing your API server — no server load).',
  prerequisites: ['Completed React L1-L15'],
  conceptDiagram: `FILE UPLOAD UI:
  1. Drag-and-drop zone (react-dropzone)
  2. Preview image (URL.createObjectURL)
  3. Progress bar (axios onUploadProgress)
  4. S3 presigned URL (client uploads directly to S3)

  S3 PATTERN:
  Client → POST /presign (get upload URL) → Client → PUT directly to S3
  (API never handles file data — scalable!)`,
  conceptExplanation: ['react-dropzone handles drag-and-drop, file type validation, and file size limits. It gives you isDragActive, acceptedFiles. Simple to integrate.','Progress bar: axios onUploadProgress callback gives { loaded, total }. Calculate percentage: Math.round((loaded / total) * 100). Update state on each progress event.','S3 presigned URLs: your API generates a time-limited URL. The client uploads directly to S3 using PUT. Your API never handles the file data — this scales to any file size.'],
  whyItMatters: 'Without drag-and-drop, uploads are clunky (file picker only). Without progress bars, users do not know if the upload is working. Without S3 presigned URLs, large files crash your API server (loading 10GB into memory).',
  codeExamples: [
    { filename: 'Upload.tsx', language: 'typescript', approach: 'production', code: `import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";
import axios from "axios";

function FileUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (files: File[]) => {
    setUploading(true);
    for (const file of files) {
      // 1. Get presigned URL from API
      const { data } = await axios.post("/api/presign", {
        filename: file.name,
        contentType: file.type,
      });

      // 2. Upload directly to S3 (bypasses API!)
      await axios.put(data.upload_url, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded / (e.total || 1)) * 100));
        },
      });

      // 3. Tell API upload is complete
      await axios.post("/api/upload-complete", { key: data.key });
    }
    setUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxSize: 10 * 1024 * 1024,  // 10MB
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={\`border-2 border-dashed p-8 text-center cursor-pointer \${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}\`}
      >
        <input {...getInputProps()} />
        {isDragActive ? "Drop files here" : "Drag & drop or click to upload"}
      </div>
      {uploading && (
        <div className="mt-4">
          <progress value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      )}
    </div>
  );
}`, explanation: 'Production file upload: react-dropzone (drag-and-drop, validation), S3 presigned (direct upload, no API load), progress bar (onUploadProgress). This is how Google Drive and Slack handle uploads.' },
  ],
  configFiles: [],
  lab: { title: 'Build File Upload', steps: [{ step: 1, title: 'Install', instruction: 'Install react-dropzone', command: 'bun add react-dropzone' }, { step: 2, title: 'Create component', instruction: 'Build drag-drop upload', command: 'Create FileUpload with dropzone + progress' }] },
  commonErrors: [{ error: 'Upload freezes for large files', fix: 'Use S3 presigned URLs — client uploads directly to S3, bypassing your API. Use axios onUploadProgress for progress.', rootCause: 'Uploading through your API loads the entire file into server memory. S3 presigned URLs bypass the server entirely.' }],
  quiz: [{ question: 'Why use S3 presigned URLs?', options: ['Faster', 'Client uploads directly to S3 (API never handles file data — scales to any size)', 'Required', 'More secure'], correctIndex: 1, explanation: 'Presigned URLs let the client upload directly to S3. Your API only generates the URL — it never handles the file. This means 10GB files do not crash your API server.' }],
  resources: [{ title: 'react-dropzone', url: 'https://react-dropzone.js.org/', type: 'docs' }],
  whatToReadNext: 'Read about Real-time Dashboard (next lesson) — WebSocket + charts.',
};

export const reactL17: Lesson = {
  slug: 'realtime-dashboard', title: 'Real-time Dashboard — WebSocket + Charts',
  subtitle: 'Build a live dashboard with WebSocket data and Recharts',
  duration: 80, difficulty: 'Advanced', phase: 'Real-World', xp: 250, moduleSlug: 'react',
  objectives: ['Connect WebSocket for live data','Display real-time charts with Recharts','Update chart data without re-rendering entire component','Handle reconnection','Add filters that work with live data'],
  realWorldContext: 'Dashboards are how companies monitor their systems. Datadog, Grafana, and Vercel Analytics all use real-time WebSocket data with charts. Building a dashboard that updates live (without flickering) is a common senior engineer task.',
  prerequisites: ['Completed React L1-L16'],
  conceptDiagram: `REAL-TIME DASHBOARD:
  WebSocket → live data → chart updates → user sees real-time metrics

  COMPONENTS:
  useWebSocket → receives data points
  Recharts → renders line/bar charts
  useMemo → efficient chart data transform
  useState → store data history (last N points)`,
  conceptExplanation: ['Connect to a WebSocket that pushes data (e.g., server metrics, stock prices, user activity). Each message is a data point. Store the last N points in state. Render with Recharts.','Recharts renders charts from data arrays. To update: append new data point, remove old (keep last 50 points). Use functional setState: setPoints(prev => [...prev.slice(-49), newPoint]).','Avoid re-rendering the entire dashboard on each data point. Use useMemo for chart data transformation. Use React.memo for chart components. Only the chart that receives new data should update.'],
  whyItMatters: 'Real-time dashboards are used in every ops team, every trading floor, every analytics platform. Building one that is smooth (no flickering, no memory leaks) is a senior engineer skill.',
  codeExamples: [
    { filename: 'Dashboard.tsx', language: 'typescript', approach: 'production', code: `import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useWebSocket } from "@/hooks/useWebSocket";

interface DataPoint { time: string; value: number; }

export function Dashboard() {
  const [data, setData] = useState<DataPoint[]>([]);

  // WebSocket pushes data points
  const { isConnected } = useWebSocket("ws://localhost:8000/ws/metrics", {
    onMessage: (msg) => {
      const point: DataPoint = {
        time: new Date().toLocaleTimeString(),
        value: msg.value,
      };
      // Keep last 50 points (sliding window)
      setData(prev => [...prev.slice(-49), point]);
    },
  });

  // Memoize chart data (prevent unnecessary re-renders)
  const chartData = useMemo(() => data, [data]);

  return (
    <div>
      <div>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}`, explanation: 'WebSocket receives data → append to state (last 50 points) → Recharts renders line chart. isAnimationActive={false} prevents flickering on real-time updates. ResponsiveContainer makes it responsive.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Live Dashboard', steps: [{ step: 1, title: 'Install Recharts', instruction: 'Install', command: 'bun add recharts' }, { step: 2, title: 'Create dashboard', instruction: 'Build with WebSocket + chart', command: 'Create Dashboard.tsx with useWebSocket + LineChart' }, { step: 3, title: 'Test', instruction: 'Connect to WebSocket server', command: 'Run with backend sending data', verification: 'Chart updates in real-time' }] },
  commonErrors: [{ error: 'Chart flickers on each update', fix: 'Set isAnimationActive={false} on the Line component. Animation on real-time data causes flickering.', rootCause: 'Recharts animates by default. On rapid updates, animation restarts each time = flickering.' }],
  quiz: [{ question: 'How to handle real-time chart data?', options: ['Render entire chart', 'Append new point, keep last N (sliding window), disable animation', 'Reload page', 'Use polling'], correctIndex: 1, explanation: 'Sliding window (last 50 points) + disabled animation = smooth real-time chart. Full data causes memory growth, animation causes flickering.' }],
  resources: [{ title: 'Recharts', url: 'https://recharts.org/', type: 'docs' }],
  whatToReadNext: 'Read about Deployment (next lesson) — Vite build, Nginx, Docker.',
};

export const reactL18: Lesson = {
  slug: 'deployment', title: 'Deployment — Vite Build, Nginx, Docker, CI/CD',
  subtitle: 'Deploy your React app to production',
  duration: 70, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'react',
  objectives: ['Build optimized production bundle with Vite','Serve SPA with Nginx (with history fallback)','Containerize with Docker','Set up GitHub Actions for CI/CD','Deploy to cloud (Vercel or custom server)'],
  realWorldContext: 'A React app on localhost is useless — it needs to be deployed. The standard stack: Vite build → Docker container → Nginx serves static files → CDN for global delivery. Companies like Vercel automate this; custom deployments use Docker + Nginx.',
  prerequisites: ['Completed React L1-L17'],
  conceptDiagram: `DEPLOYMENT STACK:
  Vite build → dist/ (static HTML, JS, CSS)
  Nginx → serves dist/, history fallback for SPA
  Docker → container with Nginx + dist/
  CI/CD → push to main → build → push image → deploy

  NGINX SPA CONFIG (critical):
  location / {
    try_files $uri $uri/ /index.html;  ← history fallback
  }
  # All routes return index.html (React Router handles them)`,
  conceptExplanation: ['Vite build creates optimized static files in dist/. Code is minified, tree-shaken, split into chunks. The dist/ folder is what you deploy.','Nginx serves the static files. For SPA (Single Page Application), you need try_files $uri /index.html — all routes return index.html, and React Router handles the actual routing client-side. Without this, refreshing /dashboard gives 404.','Docker container: Nginx + dist/ in one image. Reproducible, portable. CI/CD: on push to main, build image, push to registry, deploy to server.'],
  whyItMatters: 'Without proper deployment, your app is not accessible. Without history fallback, users get 404 on refresh. Without CI/CD, deployment is manual and error-prone. This is the final step — making your app available to the world.',
  codeExamples: [
    { filename: 'Dockerfile', language: 'dockerfile', approach: 'production', code: `# Stage 1: Build React app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install
COPY . .
RUN npm run build  # creates dist/

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`, explanation: 'Multi-stage: build React in Node, serve with Nginx. Final image is tiny (just Nginx + static files).' },
    { filename: 'nginx.conf', language: 'nginx', approach: 'production', code: `server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # SPA history fallback (CRITICAL!)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets (hashed filenames)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy API calls to backend
    location /api/ {
        proxy_pass http://api:8000;
    }
}`, explanation: 'try_files $uri /index.html = SPA fallback (all routes serve index.html). /assets/ cached for 1 year (hashed filenames = safe). /api/ proxied to backend.' },
  ],
  configFiles: [{ filename: '.github/workflows/deploy.yml', language: 'yaml', content: 'name: Deploy\non:\n  push:\n    branches: [main]\njobs:\n  build-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n      - run: npm ci\n      - run: npm run build\n      - uses: docker/build-push-action@v5\n        with:\n          context: .\n          push: true\n          tags: ghcr.io/$\{\{ github.repository }}:latest', comment: 'CI/CD: build → Docker image → push to GHCR → deploy' }],
  lab: { title: 'Deploy Your React App', steps: [
    { step: 1, title: 'Build', instruction: 'Create production build', command: 'bun run build', expectedOutput: 'dist/ folder with index.html, assets/' },
    { step: 2, title: 'Create Dockerfile', instruction: 'Multi-stage build', command: 'Create Dockerfile with Node builder + Nginx runtime' },
    { step: 3, title: 'Create nginx.conf', instruction: 'SPA config', command: 'Create nginx.conf with try_files $uri /index.html' },
    { step: 4, title: 'Build and run', instruction: 'Docker build', command: 'docker build -t myapp . && docker run -p 80:80 myapp', verification: 'Open http://localhost — app loads, routes work on refresh' },
  ]},
  commonErrors: [{ error: '404 on page refresh (e.g., /dashboard)', fix: 'Add try_files $uri $uri/ /index.html; in Nginx config. SPA routes must serve index.html, not look for a file.', rootCause: 'Nginx tries to find /dashboard file. SPA routes are client-side — all must serve index.html, React Router handles routing.' }],
  quiz: [{ question: 'Why do you need try_files $uri /index.html in Nginx for SPA?', options: ['For caching', 'SPA routes are client-side — all routes must serve index.html (React Router handles them)', 'For security', 'For compression'], correctIndex: 1, explanation: 'SPA has one HTML file (index.html). Routes like /dashboard are handled by React Router client-side. Without try_files, refreshing /dashboard gives 404 (Nginx looks for a file).' }],
  resources: [{ title: 'Vite Build', url: 'https://vitejs.dev/guide/build.html', type: 'docs' }, { title: 'Nginx SPA Config', url: 'https://nginx.org/en/docs/', type: 'docs' }],
  whatToReadNext: 'Congratulations! You completed the React module. Start the capstone project or move to PostgreSQL.',
};
