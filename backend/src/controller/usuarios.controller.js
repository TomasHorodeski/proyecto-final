export async function me(req, res) {
  res.json({ id: req.user.id });
}

