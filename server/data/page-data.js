import keystone from 'keystone';

export function getPageData(
  /* ref */data,
  modalName,
  populate,
  resultTransform = r => r
) {
  return new Promise((resolve, reject) => {
    let query = keystone.list(modalName)
                .model
                .findOne()

    if(populate)
      query = query.populate(populate);

    query.exec((err, result) => {
      if(err) console.warn("Error loading pages: ", err);
      data.pageData = resultTransform(result);
      resolve(data);
    });
  });
}