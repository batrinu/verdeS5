import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Trees, ArrowRight, Mail, Lock } from 'lucide-react';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Date de autentificare incorecte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-card fade-in">
        <div className="auth-header">
          <div className="auth-logo">
            <Trees className="logo-icon text-accent" size={36} />
          </div>
          <h1>Verde în Sectorul 5</h1>
          <p className="auth-subtitle">Autentifică-te pentru a accesa platforma</p>
        </div>

        {error && <div className="auth-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: admin@sector5.ro"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Parolă</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Se conectează...' : (
              <>
                Autentificare
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="demo-credentials glass-card">
          <p className="demo-title">💡 Conturi Demo:</p>
          <p><strong>Admin:</strong> <code>admin@sector5.ro</code> / <code>password123</code></p>
          <p><strong>Cetățean:</strong> <code>citizen@example.com</code> / <code>password123</code></p>
        </div>

        <div className="auth-footer">
          <p>Nu ai încă un cont? <Link to="/register" className="text-accent">Înregistrează-te gratuit</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
