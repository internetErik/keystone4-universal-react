import { initialCacheLoad } from '../../../cache';

exports = module.exports = (req, res) => {
  if(req.user && req.user.isAdmin) {
    initialCacheLoad();
    res.json({ message: 'starting data load' });
  }
  else
    res.json({ message: 'You must be logged in' });
}
