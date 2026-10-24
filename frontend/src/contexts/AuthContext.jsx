import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext(null);

const API = '/api/v1';
let csrfToken = null;

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.method && options.method !== 'GET' && csrfToken
        ? { 'X-CSRF-Token': csrfToken }
        : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
}

async function refreshCsrfToken() {
  try {
    const data = await request('/auth/csrf');
    csrfToken = data.csrfToken;
  } catch (err) {
    console.warn('Could not refresh CSRF token:', err.message);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        await refreshCsrfToken();
        const data = await request('/auth/me');

        if (!cancelled) setUser(data.user);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email, password, role = null, rememberMe = false) {
    await refreshCsrfToken();

    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role, rememberMe }),
    });

    // Login regenerates the session, so get a fresh CSRF token.
    await refreshCsrfToken();
    setUser(data.user);

    return data.user;
  }

  async function register(registrationData) {
    await refreshCsrfToken();

    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });

    await refreshCsrfToken();
    setUser(data.user);

    return data.user;
  }

  async function logout() {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      csrfToken = null;
      setUser(null);
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user),
    isOrgAdmin: user?.role === 'org_admin',
    isClient: user?.role === 'client',
    isTeamMember: user?.role === 'team_member',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
