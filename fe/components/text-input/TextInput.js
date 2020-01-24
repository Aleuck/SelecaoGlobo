import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames';
import ThemeContext from '../../themes/ThemeContext';

class TextInput extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.elementType,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  inputFocusHandler = () => {
    this.setState({
      focus: true,
    });
  };

  inputBlurHandler = () => {
    this.setState({
      focus: false,
    });
  };

  render() {
    const classes = this.context.textInput;
    return (
      <div className={classes.wrapper}>
        <span className={classes.placeholder}>
          {this.props.placeholder}
        </span>
        <label className={classNames(
          classes.label,
          { [classes.labelFocus]: this.state.focus },
        )}>
          <input
            name={this.props.name}
            type={this.props.type || 'text'}
            value={this.props.value}
            className={classes.input}
            onChange={this.props.onChange}
            onFocus={this.inputFocusHandler}
            onBlur={this.inputBlurHandler}
          />
        </label>
      </div>

    );
  }
}

export default TextInput;
