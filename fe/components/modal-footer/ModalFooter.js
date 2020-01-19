import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../themes/ThemeContext';

class ModalFooter extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const classes = this.context.modalFooter
    return (
      <div className={classes.modalFooter}>
        {this.props.children}
      </div>
    );
  }
}

export default ModalFooter;
