
export const rawImageToBase64DataUrl = (rawImg: Buffer | string): string => {
  if (!rawImg)
    return '';

  const base64Data = Buffer.from(rawImg).toString('base64');
  return `data:image/png;base64,${base64Data}`;
};