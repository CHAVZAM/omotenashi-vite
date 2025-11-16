// src/types/qrcode.d.ts
declare module 'qrcode' {
  export function toDataURL(
    text: string,
    options?: any
  ): Promise<string>;

  // default export para compatibilidad con import default
  const _default: {
    toDataURL: typeof toDataURL;
  };
  export default _default;
}
