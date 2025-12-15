// images.d.ts

// Permite a importação de ficheiros de imagem como módulos string
// Isto resolve o erro TS2307 para o TypeScript
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}