export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  users: {
    me: "/users/me",
  },
  fitscore: {
    create: "/fitscore",
    me: "/fitscore/me",
    candidates: "/fitscore/candidates",
    candidateById: (id: number | string) => `/fitscore/candidates/${id}`,
  },
  notifications: {
    create: "/notifications",
    list: "/notifications",
  },
};
