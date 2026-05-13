/**
 * services/api.js
 * Centralised HTTP service layer.
 * All calls return: { success: boolean, data: any }
 *
 * Set VITE_API_BASE_URL in your .env file, e.g.:
 *   VITE_API_BASE_URL=http://localhost:8000/api
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

/**
 * Generic fetch wrapper that normalises responses into
 * { success, data } so callers never have to inspect status codes.
 */
async function request(method, endpoint, body = null, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const json = await response.json().catch(() => null);

    if (response.ok) {
        return { success: true, data: json };
    }

    // Normalise error message from common Laravel / generic API shapes
    const message =
        json?.message ??
        json?.error ??
        (typeof json === "string" ? json : "Something went wrong");

    return { success: false, data: message };
}

export const api = {
    /**
     * POST /auth/login
     * Expected success response body:
     *   { user, token, refreshToken }
     */
    login: (email, password) =>
        request("POST", "/auth/login", { email, password }),

    /**
     * POST /auth/register
     * Sends the full registerForm object.
     */
    register: (userData) => request("POST", "/auth/register", userData),

    /**
     * POST /auth/refresh
     * Sends the current refresh token, receives a new access token.
     * Expected success response body: { token }
     */
    refreshToken: (refreshToken) =>
        request("POST", "/auth/refresh", { refresh_token: refreshToken }),
};
