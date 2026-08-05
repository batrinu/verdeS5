import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Register.css';

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
    <div className="register-container">
      <div className="register-card fade-in">
        <div className="register-logo">
          <h2>Verde în Sectorul 5</h2>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Nume Complet</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefon</label>
            <input 
              type="tel" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="neighborhood">Cartier</label>
            <select 
              id="neighborhood" 
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
          
          <div className="form-group">
            <label htmlFor="password">Parolă</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Se încarcă...' : 'Înregistrare'}
          </button>
          
          <p className="login-link">
            Ai deja cont? <Link to="/login">Autentifică-te</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
