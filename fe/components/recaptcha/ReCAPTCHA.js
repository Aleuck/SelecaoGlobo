import ThemeContext from '../../themes/ThemeContext';
import ReCAPTCHA from 'react-google-recaptcha';

class ReCaptcha extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div className={this.context.recaptcha}>
        <ReCAPTCHA
          sitekey="6LfXUtAUAAAAALAAdn4RirMpPvbGaDBmH6CW7zdu"
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
 export default ReCaptcha;
