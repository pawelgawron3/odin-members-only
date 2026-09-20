export function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }

  next();
}

export function requireAdminAuth(req, res, next) {
  if (!req.user.is_admin) {
    return res.redirect("/");
  }

  next();
}
