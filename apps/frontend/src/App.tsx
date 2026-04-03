import { useEffect, useState } from 'react';
import keycloak from './keycloak';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    })
    .then((auth) => {
      console.log("Authenticated:", auth);
      setAuthenticated(auth);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Keycloak init error:", err);
      setLoading(false);
    });
  }, []);
  console.log("Token is here ", keycloak.token);

  if (loading) return <div>Loading...</div>;

  if (!authenticated) return <div>Not authenticated</div>;

  return (
    <div>
      Hello {keycloak.tokenParsed?.preferred_username}
      <button onClick={() => keycloak.logout()}>Logout</button>
       <hr />
    </div>
  );
}

export default App;