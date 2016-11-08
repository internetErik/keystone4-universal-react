'use strict';
import {
  getPost,
  getPosts,
} from '../../data/posts';

exports = module.exports = function (req, res) {

  const postid = req.params.postid;
  const data = {
    post: {},
    posts: [],
  };

  const promises = [ getPosts(data) ];

  if(postid)
    promises.push(getPost(postid, data));

  Promise.all(promises)
    .then(() => res.json({ data }));
};
