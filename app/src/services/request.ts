const options: RequestInit = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

const request = async (url: string, init: RequestInit = {}) => {
  const fetchOptions = { ...options, ...init };
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw response;
  }

  return response.json();
};

export const requestFetch = (url: string) => request(url);

export const requestCreation = <body = unknown>(url: string, body: body) =>
  request(url, { method: "POST", body: JSON.stringify(body) });

export const requestUpdate = <body = unknown>(url: string, body: body) =>
  request(url, { method: "PATCH", body: JSON.stringify(body) });

export const requestDelete = (url: string) =>
  request(url, { method: "DELETE" });

export default {
  fetch: requestFetch,
  create: requestCreation,
  update: requestUpdate,
  delete: requestDelete,
};
