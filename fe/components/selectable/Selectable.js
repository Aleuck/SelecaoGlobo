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
 * @param {boolean} [props.selected=false] - Controls selected state.
 * @param {string} [props.className] - Class added to element.
 * @param {string} [props.classNameSelected] - Class added to element when it is selected.
 * @param {handleChange} props.onChange - Handler for changes on input.
 */
const Selectable = ({ id, name, selected, className, classNameSelected, onChange, children, ...rest }) => {
  return (
    <Fragment>
      <label
        htmlFor={id}
        className={classNames(
          ( className || styles.label ), // Only use default styles if custom are not provided.
          { [(classNameSelected || styles.labelSelected)]: selected ? true : false },
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
        className={styles.input}
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  className: PropTypes.string,
  classNameSelected: PropTypes.string,
};

export default Selectable;
