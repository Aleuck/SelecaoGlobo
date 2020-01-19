import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../themes/ThemeContext';

class ModalHeader extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    title: PropTypes.node,
    icon: PropTypes.node,
  };

  render() {
    const { title, icon } = this.props;
    const classes = this.context.modalHeader
    return (
      <div className={classes.modalHeader}>
        <div className={classes.modalHeader__wrapper}>
          {icon && (<div className={classes.modalHeader__icon}>{icon}</div>)}
          {title && (<div className={classes.modalHeader__title}>{title}</div>)}
        </div>
        <div className={classes.modalHeader__separator}></div>
      </div>
    );
  }
}

export default ModalHeader;
