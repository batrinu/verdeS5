import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { FileText } from 'lucide-react';

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
    <>
      <PitchHeader />
      <div className="app-reports-page">
        <header className="app-reports-header">
          <div>
            <h2><FileText size={20} aria-hidden="true" /> Rapoarte și Sesizări</h2>
            <p className="hig-secondary">Vizualizează stadiul sesizărilor din Sectorul 5</p>
          </div>
          <Link to="/reports/create" className="hig-button">
            + Raportează o problemă
          </Link>
        </header>

        <div className="app-reports-filters">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="hig-field app-reports-filter-select"
            aria-label="Filtrează după status"
          >
            <option value="toate">Toate Statusurile</option>
            <option value="nou">Nou</option>
            <option value="în lucru">În lucru</option>
            <option value="rezolvat">Rezolvat</option>
          </select>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="hig-field app-reports-filter-select"
            aria-label="Filtrează după tip"
          >
            <option value="toate">Toate Tipurile</option>
            <option value="siguranță">Siguranță</option>
            <option value="copac uscat">Copac Uscat</option>
            <option value="toaletare">Toaletare</option>
          </select>
        </div>

        {filteredReports.length > 0 ? (
          <div className="hig-list app-reports-list">
            {filteredReports.map(report => (
              <div key={report.id} className="hig-list-item app-reports-list-item">
                <div className="app-reports-list-main">
                  <div className="app-reports-list-top">
                    <span className="hig-tag">{report.status}</span>
                    <span className="hig-footnote hig-tertiary">{report.date}</span>
                  </div>
                  <div className="app-reports-list-title">{report.title}</div>
                  <div className="app-reports-list-meta hig-secondary">
                    <span>{report.type}</span>
                    <span aria-hidden="true">·</span>
                    <span>{report.location}</span>
                  </div>
                </div>
                <button type="button" className="hig-button plain small app-reports-list-action">
                  Vezi detalii
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="hig-empty">
            <FileText className="hig-empty-icon" size={44} aria-hidden="true" />
            <div className="hig-empty-title">Nu s-au găsit rapoarte.</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;
