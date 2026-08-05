import React, { useState, useEffect } from 'react';
import './Trees.css';

const mockTrees = [
  { id: 1, species: 'Platan', health: 'Sănătos', location: 'Parcul Sebastian', image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a56?auto=format&fit=crop&w=300&q=80' },
  { id: 2, species: 'Tei', health: 'Necesită toaletare', location: 'Strada Mărgeanului', image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&q=80' },
  { id: 3, species: 'Castan', health: 'Sănătos', location: 'Bulevardul Tudor Vladimirescu', image: 'https://images.unsplash.com/photo-1590417937395-5eb76dbdeee3?auto=format&fit=crop&w=300&q=80' },
  { id: 4, species: 'Stejar', health: 'Uscat', location: 'Parcul Izvor', image: 'https://images.unsplash.com/photo-1571407338562-b43a9b1c97a4?auto=format&fit=crop&w=300&q=80' },
];

const Trees: React.FC = () => {
  const [trees, setTrees] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('toate');
  const [filterHealth, setFilterHealth] = useState('toate');

  useEffect(() => {
    // Mock fetch
    setTrees(mockTrees);
  }, []);

  const filteredTrees = trees.filter(tree => {
    const matchesSearch = tree.species.toLowerCase().includes(search.toLowerCase()) || 
                          tree.location.toLowerCase().includes(search.toLowerCase());
    const matchesSpecies = filterSpecies === 'toate' || tree.species.toLowerCase() === filterSpecies;
    const matchesHealth = filterHealth === 'toate' || tree.health.toLowerCase() === filterHealth;
    return matchesSearch && matchesSpecies && matchesHealth;
  });

  return (
    <div className="trees-container">
      <div className="trees-header">
        <h1>Registrul Spațiilor Verzi</h1>
        <p>Explorează și adoptă copaci din Sectorul 5</p>
      </div>

      <div className="trees-filters">
        <input 
          type="text" 
          placeholder="Caută după specie sau locație..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        
        <select value={filterSpecies} onChange={e => setFilterSpecies(e.target.value)} className="filter-select">
          <option value="toate">Orice Specie</option>
          <option value="platan">Platan</option>
          <option value="tei">Tei</option>
          <option value="castan">Castan</option>
          <option value="stejar">Stejar</option>
        </select>

        <select value={filterHealth} onChange={e => setFilterHealth(e.target.value)} className="filter-select">
          <option value="toate">Orice Stare</option>
          <option value="sănătos">Sănătos</option>
          <option value="necesită toaletare">Necesită toaletare</option>
          <option value="uscat">Uscat</option>
        </select>
      </div>

      <div className="trees-grid">
        {filteredTrees.map(tree => (
          <div key={tree.id} className="tree-card fade-in">
            <div className="tree-image" style={{ backgroundImage: `url(${tree.image})` }}>
              <span className={`health-badge health-${tree.health.toLowerCase().replace(' ', '-')}`}>
                {tree.health}
              </span>
            </div>
            <div className="tree-info">
              <h3>{tree.species}</h3>
              <p className="tree-location">📍 {tree.location}</p>
              <button className="btn-adopt">Adoptă acest copac</button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTrees.length === 0 && (
        <div className="no-results">
          Nu s-au găsit copaci care să corespundă filtrelor.
        </div>
      )}
    </div>
  );
};

export default Trees;
