exports = module.exports = (req, res) => {
  req.session.destroy(err => err && console.warn('Problem destroying session: ', err))
  res.json({ error : false })
}
