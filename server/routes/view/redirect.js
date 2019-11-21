import redirectData from '../redirect-data';

export const redirectController = (request, response) => {
  const path = request.path.split('/')[1];
  response.redirect(302, redirectData[path] || '/');
};
