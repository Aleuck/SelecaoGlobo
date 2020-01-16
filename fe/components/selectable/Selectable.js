import styles from './Selectable.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
/**
 * Handles
 * @callback handleChange
 */

/**
 * Makes content selectable.
 * @param {Object} props - Component properties.
 * @param {string} props.id - Input id, also used as value.
 * @param {string} props.name - Input name.
 * @param {boolean} props.selected - Type of input: "checkbox" or "radio".
 * @param {handleChange} props.onChange - Handler for changes on input.
 */
const Selectable = ({ id, name, selected, onChange, children, ...rest }) => {
  return (
    <Fragment>
      <label
        htmlFor={id}
        className={classNames(
          styles.selectable__label,
          { [styles['selectable__label--selected']]: selected }
        )}
        // Makes it keyboard reachable (via tab)
        tabIndex={0}
        // And selectable with 'space' or 'Enter' keys
        onKeyDown={event => {
          if ([' ', 'Enter'].includes(event.key)) {
            if (typeof onChange === 'function') {
              onChange();
            }
          }
        }}
        {...rest}
      >
        {children}
      </label>
      <input
        className={styles.selectable__input}
        type="checkbox"
        name={name}
        id={id}
        value={id}
        checked={selected}
        onChange={onChange}
      />
    </Fragment>
  );
};

Selectable.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
};

export default Selectable;
