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
    return (
      <div className={this.context.modalHeader}>
        <div className={this.context.modalHeader__wrapper}>
          {icon && (<div className={this.context.modalHeader__icon}>{icon}</div>)}
          {title && (<div className={this.context.modalHeader__title}>{title}</div>)}
        </div>
        <div className={this.context.modalHeader__separator}></div>
      </div>
    );
  }
}

export default ModalHeader;
