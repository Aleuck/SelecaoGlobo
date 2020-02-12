import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ThemeContext from '../../themes/ThemeContext';

/**
 * Change event.
 * @event changeEvent
 * @param {React.FormEvent} event
 */

/** Class represents a selectable react component. */
class Selectable extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    tabIndex: PropTypes.number,
    role: PropTypes.string,
    ariaLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    children: PropTypes.node,
  };

  /**
   * Creates selectable Component
   * @param {Object} props - Component properties.
   * @param {string} props.id - Input id, also used as value.
   * @param {string} props.name - Input name.
   * @param {boolean} [props.selected=false] - Controls selected state.
   * @param {number} [props.tabIndex=0] - Element's tab index.
   * @param {string} [props.role=checkbox] - Element's role.
   * @param {string} [props.ariaLabel=checkbox] - Element's aria-label.
   * @param {changeEvent} props.onChange - Handler for changes on input.
   * @listens changeEvent
   */
  constructor(props) {
    super(props);
    this.labelRef = React.createRef();
  }

  keyDownHandler = event => {
    if (typeof this.props.onChange === 'function') {
      if ([' '].includes(event.key)) {
        this.props.onChange();
      }
    }
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }
  };

  focus() {
    this.labelRef.current.focus();
  }

  render() {
    const {
      id,
      name,
      selected,
      tabIndex,
      onChange,
      children,
      ariaLabel,
      role,
    } = this.props;
    const classes = this.context.selectable;
    return (
      <React.Fragment>
        <label
          htmlFor={id}
          className={classNames(
            classes.selectable,
            { [classes['selectable--selected']]: selected ? true : false },
          )}
          tabIndex={tabIndex || 0} // Makes it keyboard reachable (via tab)
          onKeyDown={this.keyDownHandler} // And selectable with 'space' or 'Enter' keys
          ref={this.labelRef}
          aria-label={ariaLabel}
          role={role || 'checkbox'}
        >
          {children}
        </label>
        <input
          className={classes.selectable__input}
          type="checkbox"
          name={name}
          id={id}
          value={id}
          checked={selected}
          onChange={onChange}
        />
      </React.Fragment>
    );
  }
}

export default Selectable;
