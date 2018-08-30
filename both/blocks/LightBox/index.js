import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param  {Node}
 * @return {Boolean}
 */
const childClicked = target => target.classList.contains('light-box__children')

const Lightbox = ({ className, lightboxConfig: { backgroundClassName, open, close, children }}) => (
open
? <div className={`light-box posf t0 l0 w100% h100% dib ${className || ''}`}>
    <div
      className="light-box__close posa c-white t32 r32 h44 w44 lh0 curp fz32 z2 round-element bgc-gray t16@lg r16@lg"
      onClick={close}
    >
      <span className="posa center">&times;</span>
    </div>
    <div
      onClick={e => childClicked(e.target) && close()}
      className={`light-box__children posa center w100% h100% z0 ${backgroundClassName || ''}`}
    >
    { children }
    </div>
  </div>
: <div></div>
);

Lightbox.propTypes = {
  className      : PropTypes.string,
  lightboxConfig : PropTypes.object, // ToDo: describe shape?
};

export default Lightbox;
