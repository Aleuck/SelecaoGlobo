import Client from '../../components/feathers/FeathersClient';
import Auth from '../../components/feathers/FeathersAuth';

import Login from '../../components/login';
import Dashboard from '../../components/dashboard';

import { ThemeProvider } from '@material-ui/core/styles/';
import muiTheme from '../../mui-themes/default';

import '../../themes/base-css';

const Admin = () => (
  <ThemeProvider theme={muiTheme}>
    <Client server={process.env.API_URL}>
      {(client) => (
        <Auth
          client={client}
          renderLogin={(props) => (<Login {...props} />)}
        >
          {(props) => (
            <Dashboard client={client} {...props} />
          )}
        </Auth>
      )}
    </Client>
  </ThemeProvider>
);

export default Admin;
