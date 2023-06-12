import type { Response } from "~/types/response.type";

type UseFetchParam<T> = Parameters<typeof useFetch<T>>;

export default <T>(url: UseFetchParam<Response<T>>[0], opts?: UseFetchParam<Response<T>>[1]) => {
  const config = useRuntimeConfig(); // nuxt.config.js에 접근하기 위해 필요한 것
  const baseUrl = config.public.apiUrl;
  
  return useFetch<Response<T>>(url, {
    ...opts,
    baseURL: baseUrl,
  });
}

