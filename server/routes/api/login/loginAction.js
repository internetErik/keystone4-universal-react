const PASSWORD = process.env.PASSWORD || 'password';

exports = module.exports = (req, res) => {
  const { password } = req.body;
  if(password === PASSWORD) {
    req.session.loggedIn = true;
    res.json({ error : false });
  }
  else
    res.json({ error : true , message : 'Incorrect password' });
}