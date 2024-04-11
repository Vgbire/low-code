/**
 * 生成UUID v4
 * @return {*}  {string}
 */
export const uuid = (): string => {
  let d: number = Date.now();

  const d2: number =
    (performance && performance.now && performance.now() * 1000) || 0;

  return 'ddxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (c: string) => {
      let r: number = Math.random() * 16;

      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d = Math.floor(d2 / 16);
      }

      const v: number = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
};
