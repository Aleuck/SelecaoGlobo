import Client from '../../components/feathers/FeathersClient';
import Auth from '../../components/feathers/FeathersAuth';

import Login from '../../components/login';
import Button from '../../components/button';

import { ThemeProvider } from '@material-ui/core/styles/'
import muiTheme from '../../mui-themes/default';

import '../../themes/base-css';

const Admin = () => (
  <ThemeProvider theme={muiTheme}>
    <Client server={process.env.SERVER_URL}>
      {(client) => (
        <Auth
          client={client}
          renderLogin={((props) => (<Login {...props} />))}
        >
          {(logout, user) => (
            <Button onClick={logout}>Logout from {user.username}</Button>
          )}
        </Auth>
      )}
    </Client>
  </ThemeProvider>
);

export default Admin;
