import { useState } from 'react';
import styles from './Login.module.css';

export function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginResult, setLoginResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setLoginResult(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setLoginResult(data);
      console.log('Login successful:', data);

      // Here you could redirect or update UI based on successful login
      // For now, we'll just display the result
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>

      {error && <div className={styles.error}>{error}</div>}

      {loginResult && loginResult.success && (
        <div className={styles.success}>
          Login successful! Welcome, {loginResult.name}.
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className={styles.demoCredentials}>
          <p>Demo credentials:</p>
          <p>Username: demo</p>
          <p>Password: password123</p>
        </div>
      </form>
    </div>
  );
}
