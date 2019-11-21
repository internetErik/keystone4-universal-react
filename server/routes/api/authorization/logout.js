export const logoutController = (req, res) => {
  req.session.destroy(err => err && console.warn('Problem destroying session: ', err))
  res.json({ error : false })
}
