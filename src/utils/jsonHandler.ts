export const jsonHandler = (data: string) => {
  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
};
