import keystone from 'keystone';

export const getFaqsData = (/* ref */data) => new Promise((resolve, reject) => {
  keystone.list('Faq')
  .model
  .find()
  .exec((err, results) => {
    data.faqs = [];
    if(err) console.error(err);

    if(results)
      data.faqs = results;

    resolve(data);
  });
});
