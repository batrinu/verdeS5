import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateReport.css';

const issueTypes = [
  { id: 'uscat', label: 'Copac Uscat/Pericol', icon: '🍂' },
  { id: 'toaletare', label: 'Necesar Toaletare', icon: '✂️' },
  { id: 'daune', label: 'Daune/Vandalism', icon: '⚠️' },
  { id: 'plantare', label: 'Solicitare Plantare', icon: '🌱' },
];

const CreateReport: React.FC = () => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock submit
    setTimeout(() => {
      setLoading(false);
      navigate('/reports');
    }, 1000);
  };

  return (
    <div className="create-report-container">
      <div className="create-report-card fade-in">
        <div className="create-report-header">
          <h2>Raportează o problemă</h2>
          <p>Ajută-ne să menținem spațiile verzi sănătoase</p>
        </div>

        <form onSubmit={handleSubmit} className="create-report-form">
          <div className="form-group">
            <label>Tipul problemei</label>
            <div className="issue-types-grid">
              {issueTypes.map(issue => (
                <div 
                  key={issue.id} 
                  className={`issue-type-card ${type === issue.id ? 'selected' : ''}`}
                  onClick={() => setType(issue.id)}
                >
                  <span className="issue-icon">{issue.icon}</span>
                  <span className="issue-label">{issue.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descriere</label>
            <textarea 
              id="description" 
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrie problema în detaliu..."
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresă (sau locație aproximativă)</label>
            <input 
              type="text" 
              id="address" 
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Ex: Str. Mărgeanului, în fața blocului M10"
              required
            />
            <div className="location-picker-mock">
              <span>📍 Selectează pe hartă (Mock)</span>
            </div>
          </div>

          <div className="form-group">
            <label>Fotografii (Opțional)</label>
            <div className="photo-upload-area">
              <span>📷 Adaugă fotografii</span>
              <p>Trage fișierele aici sau dă click pentru a încărca</p>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/reports')}>
              Anulează
            </button>
            <button type="submit" className="btn-submit" disabled={!type || loading}>
              {loading ? 'Se trimite...' : 'Trimite Raportul'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReport;
