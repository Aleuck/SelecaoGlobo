import styles from './Selectable.scss'
import classNames from 'classnames';

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
    <React.Fragment>
      <label
        htmlFor={id}
        className={classNames(
          styles.selectable__label,
          { [styles['selectable__label--selected']]: selected }
        )}
        // Makes it keyboard reachable (via tab)
        tabIndex={0}
        // And selectable with space or Enter keys
        onKeyDown={event => {
          if ([' ', 'Enter'].includes(event.key)) {
            onChange();
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
    </React.Fragment>
  );
};

export default Selectable;
