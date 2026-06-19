// ─── lib/api.js ──────────────────────────────────────────────────────────────
// All HTTP calls to the Laravel backend go through this module.
// Set NEXT_PUBLIC_API_URL in your .env.local, e.g.:
//   NEXT_PUBLIC_API_URL=http://localhost:8000/api
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function getCookie(name) {
  if (typeof document === "undefined") return "";
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1] || "";
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ecomlanka_auth_token") || localStorage.getItem("auth_token");
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const isMutating = ["POST", "PUT", "PATCH", "DELETE"].includes(
    (options.method || "GET").toUpperCase()
  );

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isMutating ? { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const text = await res.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: `Unexpected response: ${res.status}` };
    }
  }

  if (!res.ok) {
    const err = new Error(data.message || "API Error");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

function qs(params = {}) {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") p.set(k, v);
  });
  const s = p.toString();
  return s ? `?${s}` : "";
}

// ── Products ──────────────────────────────────────────────────────────────────
export const getProducts = (params) =>
  request(`/products${qs(params)}`);
export const getProduct = (id) => request(`/products/${id}`);
export const getFeaturedProducts = () => request("/products/featured");

// ── Suppliers ─────────────────────────────────────────────────────────────────
export const getSuppliers = (params) =>
  request(`/suppliers${qs(params)}`);
export const getSupplier = (id) => request(`/suppliers/${id}`);
export const getSupplierProducts = (id, params) =>
  request(`/suppliers/${id}/products${qs(params)}`);

// ── Categories ────────────────────────────────────────────────────────────────
export const getCategories = () => request("/categories");
export const getCategoryProducts = (slug, params) =>
  request(`/categories/${slug}/products${qs(params)}`);

// ── Search ────────────────────────────────────────────────────────────────────
export const search = (q, filters = {}) =>
  request(`/search${qs({ q, ...filters })}`);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = (credentials) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const register = (data) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const logout = () =>
  request("/auth/logout", { method: "POST" });

export const getMe = () => request("/auth/me");

// ── RFQ ───────────────────────────────────────────────────────────────────────
export const submitRFQ = (data) =>
  request("/rfq", { method: "POST", body: JSON.stringify(data) });

export const getMyRFQs = () => request("/rfq");

// ── Inquiry ───────────────────────────────────────────────────────────────────
export const submitInquiry = (data) =>
  request("/inquiry", { method: "POST", body: JSON.stringify(data) });

export const getMyInquiries = () => request("/inquiry");

// ── Reviews ───────────────────────────────────────────────────────────────────
export const getProductReviews = (productId) =>
  request(`/products/${productId}/reviews`);

export const submitReview = (productId, data) =>
  request(`/products/${productId}/reviews`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// ── Wishlist ──────────────────────────────────────────────────────────────────
export const getWishlist = () => request("/wishlist");
export const addToWishlist = (productId) =>
  request("/wishlist", {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
export const removeFromWishlist = (productId) =>
  request(`/wishlist/${productId}`, { method: "DELETE" });
