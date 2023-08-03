import { UserManager } from "oidc-client";

const issuer = process.env.REACT_APP_OIDC_ISSUER;
const clientId = process.env.REACT_APP_OIDC_CLIENT_ID;
const redirectUri = process.env.REACT_APP_OIDC_REDIRECT_URI;
const backendURL = process.env.REACT_APP_BACKEND_URL;

const userManager = new UserManager({
  authority: issuer,
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: "code",
  scope: "openid email profile", // Allow to retrieve the email and user name later api side
});

const cleanup = () => {
  // Remove the ?code&state from the URL
  window.history.replaceState(
    {},
    window.document.title,
    window.location.origin
  );
};

export const authProvider = {
  login: async ({ username, password, provider }) => {
    if (provider === "google") {
      // Redirect to Google login page
      await userManager.signinRedirect();
      return;
    }

    const request = new Request("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const auth = await response.json();
      localStorage.setItem("auth", JSON.stringify(auth));
    } catch (error) {
      console.log(error);
      throw new Error("Network error");
    }
  },
  checkError: async (error) => {
    const status = error.status;
    const { searchParams } = new URL(window.location.href);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    console.log({ code, state });
    if (code && state) {
      // We are coming back from the issuer
      return Promise.reject();
    }
    if (status === 401) {
      // Token is invalid or expired
      const auth = JSON.parse(localStorage.getItem("auth"));
      const refresh = auth.refresh;

      if (!refresh) {
        // localStorage.removeItem('access');
        throw new Error("No refresh token");
      }

      const request = new Request("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        body: JSON.stringify({ refresh }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      try {
        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const { access } = await response.json();
        localStorage.setItem("auth", JSON.stringify({ ...auth, access }));
      } catch (err) {
        console.log(err);
        // localStorage.removeItem('access');
        // localStorage.removeItem('refresh');
        throw new Error("Network error");
      }
    }
  },
  handleCallback: async () => {
    // We came back from the issuer with ?code infos in query params

    const { searchParams } = new URL(window.location.href);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    // oidc-client uses localStorage to keep a temporary state
    // between the two redirections. But since we need to send it to the API
    // we have to retrieve it manually
    const stateKey = `oidc.${state}`;
    const { code_verifier } = JSON.parse(
      localStorage.getItem(stateKey) || "{}"
    );

    // Transform the code to a token via the API
    const response = await fetch(`${backendURL}/code-to-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code, code_verifier }),
    });

    if (!response.ok) {
      cleanup();
      return Promise.reject();
    }

    const auth = await response.json();

    localStorage.setItem("auth", JSON.stringify(auth));
    userManager.clearStaleState();
    cleanup();
    return Promise.resolve();
  },
  checkAuth: async () => {
    const { searchParams } = new URL(window.location.href);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    console.log(window.location.href);
    if (code && state) {
      // We are coming back from the issuer
      return;
    }
    const { access } = JSON.parse(localStorage.getItem("auth"));
    if (!access) {
      throw new Error();
    }
  },
  logout: async () => {
    localStorage.removeItem("auth");
  },
};
