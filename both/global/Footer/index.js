import React from 'react';
import { Link } from 'react-router-dom';

import RenderOnClientOnly from '../../blocks/RenderOnClientOnly';
import { isBrowser } from '../../util/environment-detection';

const Footer = () => (
<footer className="footer">
  <div className="grid-container posr">
    <div className="clearfix">
      <div className="footer-links">
        <RenderOnClientOnly>
        <div>
        {isBrowser && window.__USER &&
          <a href="/keystone">Keystone</a>
        }
        </div>
        </RenderOnClientOnly>
      </div>
    </div>
  </div>
</footer>
);

export default Footer;
