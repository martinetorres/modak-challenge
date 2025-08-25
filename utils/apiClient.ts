import { initCategoriesApi } from "@/features/products/api/categories.api";
import { initProductApi } from "@/features/products/api/products.api";

export type ApiClient = {
  get<T>(path: string, params?: Record<string, unknown>, init?: RequestInit): Promise<T>;
};

function buildUrl(baseUrl: string, path: string, params?: Record<string, unknown>) {
  const url = new URL(path, baseUrl);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export function createApiClient(opts: { baseUrl: string; defaultHeaders?: Record<string, string> }): ApiClient {
  const { baseUrl, defaultHeaders } = opts;

  async function get<T>(path: string, params?: Record<string, unknown>, init?: RequestInit): Promise<T> {
    const res = await fetch(buildUrl(baseUrl, path, params), {
      method: "GET",
      headers: { Accept: "application/json", ...(defaultHeaders ?? {}) },
      ...init,
    });

    const data = (await res.json()) as T; 
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status}`) as Error & { status?: number; data?: unknown };
      err.status = res.status; (err as any).data = data;
      throw err;
    }
    return data;
  }

  return { get };
}

export const api = createApiClient({ baseUrl: "https://dummyjson.com" });

export const productApi = initProductApi(api);
export const categoriesApi = initCategoriesApi(api);