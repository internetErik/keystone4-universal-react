import React from 'react';
import PropTypes from 'prop-types';

const classNames = (className, fullLg, fullMd) =>
  `grid grid-container ${ fullLg ? 'grid-container--full-lg' : '' } ${ fullMd ? 'grid-container--full-md' : '' } ${ className || ''}`

const Grid = ({ className, children, elementType, fullLg, fullMd }) => (
  !elementType ? <div className={classNames(className, fullLg, fullMd)}>
                 { children }
                 </div>
: <section className={classNames(className, fullLg, fullMd)}>
  { children }
  </section>
)

Grid.propTypes = {
  className : PropTypes.string,
  children  : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  elementType : PropTypes.string,
}

export default Grid;
