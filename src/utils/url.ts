export const getUrlParams = (url?: string) => {
  const searchParams = new URLSearchParams(url || window.location.search);
  const params: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};
