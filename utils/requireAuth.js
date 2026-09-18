function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }

  next();
}

export default requireAuth;
