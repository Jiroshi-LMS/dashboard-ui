import axios, { AxiosError } from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// --- Refresh Logic ---
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Skip if request already retried
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If Unauthorized → try refreshing
    if (error.response?.status === 401) {
      if (isRefreshing) {
        // Wait for the token to be refreshed
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) throw new Error("NO_REFRESH_TOKEN");

        const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/instructor/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = resp.data.access;
        localStorage.setItem("access", newAccessToken);

        // Update headers globally
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        // Retry original
        return api(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError, null);

        // Instead of redirecting, we throw a standard error identifier
        const tokenError = new Error("TOKEN_EXPIRED");
        (tokenError as any).cause = refreshError;
        throw tokenError;
      } finally {
        isRefreshing = false;
      }
    }

    // For all other errors, just forward
    return Promise.reject(error);
  }
);

export default api;