import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reports.css';

const mockReports = [
  { id: 1, title: 'Creangă ruptă care blochează trotuarul', type: 'Siguranță', status: 'Nou', location: 'Str. Mărgeanului nr. 20', date: '2023-10-25' },
  { id: 2, title: 'Copac uscat cu risc de cădere', type: 'Copac Uscat', status: 'În lucru', location: 'Parcul Sebastian', date: '2023-10-24' },
  { id: 3, title: 'Necesar toaletare de primăvară', type: 'Toaletare', status: 'Rezolvat', location: 'Bd. Tudor Vladimirescu', date: '2023-10-20' },
];

const Reports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('toate');
  const [filterType, setFilterType] = useState('toate');

  useEffect(() => {
    setReports(mockReports);
  }, []);

  const filteredReports = reports.filter(r => {
    const matchStatus = filterStatus === 'toate' || r.status.toLowerCase() === filterStatus;
    const matchType = filterType === 'toate' || r.type.toLowerCase() === filterType;
    return matchStatus && matchType;
  });

  return (
    <div className="reports-container">
      <div className="reports-header-section">
        <div>
          <h1>Rapoarte și Sesizări</h1>
          <p>Vizualizează stadiul sesizărilor din Sectorul 5</p>
        </div>
        <Link to="/reports/create" className="btn-primary">
          + Raportează o problemă
        </Link>
      </div>

      <div className="reports-filters">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="filter-select">
          <option value="toate">Toate Statusurile</option>
          <option value="nou">Nou</option>
          <option value="în lucru">În lucru</option>
          <option value="rezolvat">Rezolvat</option>
        </select>

        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="filter-select">
          <option value="toate">Toate Tipurile</option>
          <option value="siguranță">Siguranță</option>
          <option value="copac uscat">Copac Uscat</option>
          <option value="toaletare">Toaletare</option>
        </select>
      </div>

      <div className="reports-grid">
        {filteredReports.map(report => (
          <div key={report.id} className="report-card fade-in">
            <div className="report-card-header">
              <span className={`status-badge status-${report.status.toLowerCase().replace(' ', '-')}`}>
                {report.status}
              </span>
              <span className="report-date">{report.date}</span>
            </div>
            <h3 className="report-title">{report.title}</h3>
            <div className="report-details">
              <p><strong>Tip:</strong> {report.type}</p>
              <p><strong>Locație:</strong> {report.location}</p>
            </div>
            <button className="btn-details">Vezi detalii</button>
          </div>
        ))}
        {filteredReports.length === 0 && (
          <div className="no-results">Nu s-au găsit rapoarte.</div>
        )}
      </div>
    </div>
  );
};

export default Reports;
