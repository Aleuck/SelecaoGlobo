import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ThemeContext from '../../themes/ThemeContext';

/**
 * Change event.
 * @event changeEvent
 * @param {React.FormEvent} event
 */

/**
 * Makes content selectable.
 * @param {Object} props - Component properties.
 * @param {string} props.id - Input id, also used as value.
 * @param {string} props.name - Input name.
 * @param {boolean} [props.selected=false] - Controls selected state.
 * @param {number} [props.tabIndex=0]
 * @param {changeEvent} props.onChange - Handler for changes on input.
 * @listens changeEvent
 */
class Selectable extends React.Component {
  static contextType = ThemeContext;

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  keyDownHandler = event => {
    if (typeof this.props.onChange === 'function') {
      if ([' ', 'Enter'].includes(event.key)) {
        this.props.onChange();
      }
    }
  };

  render() {
    const { id, name, selected, tabIndex, onChange, children} = this.props;
    const classes = this.context.selectable
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
