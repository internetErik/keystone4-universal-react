import React from 'react';
import PropTypes from 'prop-types';

const SiteBody = ({ className, children }) => (
<section className={`site-body z1 ${className || ''}`}>
  <div className="posr">
    {children}
  </div>
</section>
);

SiteBody.propTypes = {
  className : PropTypes.string,
  children  : PropTypes.object.isRequired,
};

export default SiteBody;
