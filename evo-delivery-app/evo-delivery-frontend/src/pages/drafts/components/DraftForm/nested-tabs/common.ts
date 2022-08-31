export const convertObjToNiceText = (obj: object) =>
  Object.entries(obj)
    .filter(([_, v]: any[]) => v !== null && v !== '' && !isNaN(v))
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
