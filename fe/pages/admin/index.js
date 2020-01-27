import Client from '../../components/feathers/FeathersClient';
import Auth from '../../components/feathers/FeathersAuth';

import Login from '../../components/login';
import Button from '../../components/button';

const Admin = () => (
  <Client server={process.env.SERVER_URL}>
    {(client) => (
      <Auth
        client={client}
        renderLogin={(login => (<Login onSubmit={login} />))}
      >
        {(logout, user) => (
          <Button onClick={logout}>Logout from {user.username}</Button>
        )}
      </Auth>
    )}
  </Client>
);

export default Admin;
