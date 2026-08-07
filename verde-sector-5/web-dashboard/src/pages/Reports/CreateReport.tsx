import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PitchHeader } from '../../components/Pitch/PitchHeader';

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
    <>
      <PitchHeader />
      <div className="app-create-report-page">
        <div className="hig-card app-create-report-card">
          <div className="app-create-report-header">
            <h2>Raportează o problemă</h2>
            <p className="hig-secondary">Ajută-ne să menținem spațiile verzi sănătoase</p>
          </div>

          <form onSubmit={handleSubmit} className="app-create-report-form">
            <div className="hig-form-row">
              <label>Tipul problemei</label>
              <div className="app-issue-types-grid">
                {issueTypes.map(issue => (
                  <div
                    key={issue.id}
                    className={`app-issue-type-card${type === issue.id ? ' selected' : ''}`}
                    onClick={() => setType(issue.id)}
                  >
                    <span className="app-issue-type-icon">{issue.icon}</span>
                    <span className="app-issue-type-label">{issue.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hig-form-row">
              <label htmlFor="description">Descriere</label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Descrie problema în detaliu..."
                required
                className="hig-field"
              ></textarea>
            </div>

            <div className="hig-form-row">
              <label htmlFor="address">Adresă (sau locație aproximativă)</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Ex: Str. Mărgeanului, în fața blocului M10"
                required
                className="hig-field"
              />
              <div className="app-location-picker-mock">
                <span>📍 Selectează pe hartă</span>
              </div>
            </div>

            <div className="hig-form-row">
              <label>Fotografii (Opțional)</label>
              <div className="app-dropzone">
                <span className="app-dropzone-title">📷 Adaugă fotografii</span>
                <p className="app-dropzone-subtitle hig-secondary">Trage fișierele aici sau dă click pentru a încărca</p>
              </div>
            </div>

            <div className="app-create-report-actions">
              <button type="button" className="hig-button gray" onClick={() => navigate('/reports')}>
                Anulează
              </button>
              <button type="submit" className="hig-button large" disabled={!type || loading}>
                {loading ? 'Se trimite...' : 'Trimite Raportul'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateReport;
