import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';  // Import MantineProvider
import '@mantine/core/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-fljy7gnrs84002pu.us.auth0.com"
      clientId="dTtWct2xQ7TfouJB7y1PkZxx9MnvQgjo"
      authorizationParams={{
        redirect_uri: 'http://localhost:5173/'
      }}
      audience='http://localhost:8000'
      scope='openid profile email'
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>  {/* Wrap with MantineProvider */}
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
