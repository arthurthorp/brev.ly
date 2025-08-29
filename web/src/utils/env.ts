function getEnvVar(key: string): string {
  const value = import.meta.env[key] as string | undefined;
  if (!value) {
    throw new Error(`A variável de ambiente ${key} não foi encontrada`);
  }
  return value;
}

export const env = {
  FRONTEND_URL: getEnvVar("VITE_FRONTEND_URL"),
  BACKEND_URL: getEnvVar("VITE_BACKEND_URL"),
};
