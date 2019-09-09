import redirectData from '../redirect-data';

exports = module.exports = (request, response) => {
  const path = request.path.split('/')[1];
  response.redirect(302, redirectData[path] || '/');
};
