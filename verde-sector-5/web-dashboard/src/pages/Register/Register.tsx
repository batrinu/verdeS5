import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const neighborhoods = [
  'Giulești',
  'Crângași',
  'Drumul Taberei',
  'Ferentari',
  'Rahova',
  'Progresul',
  '13 Septembrie',
  'Militari'
];

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({ name, email, phone, password, neighborhood });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Eroare la înregistrare');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-auth">
      <div className="hig-card app-auth-card">
        <div className="app-auth-header">
          <h1>Verde în Sectorul 5</h1>
        </div>
        <form onSubmit={handleSubmit} className="app-auth-form">
          {error && <div className="app-auth-error">{error}</div>}

          <div className="hig-form-row">
            <label htmlFor="name">Nume Complet</label>
            <input
              type="text"
              id="name"
              className="hig-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="hig-form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="hig-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="hig-form-row">
            <label htmlFor="phone">Telefon</label>
            <input
              type="tel"
              id="phone"
              className="hig-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="hig-form-row">
            <label htmlFor="neighborhood">Cartier</label>
            <select
              id="neighborhood"
              className="hig-field"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              required
            >
              <option value="">Selectează cartierul</option>
              {neighborhoods.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="hig-form-row">
            <label htmlFor="password">Parolă</label>
            <input
              type="password"
              id="password"
              className="hig-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="hig-button large" disabled={loading}>
            {loading ? 'Se încarcă...' : 'Înregistrare'}
          </button>

          <p className="app-auth-footer-link hig-footnote">
            Ai deja cont? <Link to="/login">Autentifică-te</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
