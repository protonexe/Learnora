const StudySpots = ({ onClose }) => {
  const [spots, setSpots] = React.useState([
    { id: 1, name: 'University Library', type: 'library', distance: 0.3, rating: 4.8, wifi: true, power: true, noise: 'quiet', hours: '7AM-11PM', lat: 40.7128, lng: -74.0060 },
    { id: 2, name: 'Campus Coffee House', type: 'cafe', distance: 0.5, rating: 4.5, wifi: true, power: true, noise: 'moderate', hours: '6AM-9PM', lat: 40.7138, lng: -74.0070 },
    { id: 3, name: 'Student Center', type: 'campus', distance: 0.2, rating: 4.2, wifi: true, power: true, noise: 'moderate', hours: '8AM-10PM', lat: 40.7118, lng: -74.0050 },
    { id: 4, name: 'Park Study Zone', type: 'outdoor', distance: 0.8, rating: 4.6, wifi: false, power: false, noise: 'moderate', hours: 'Open 24h', lat: 40.7148, lng: -74.0080 },
    { id: 5, name: '24-Hour Study Hall', type: 'library', distance: 1.2, rating: 4.4, wifi: true, power: true, noise: 'quiet', hours: 'Open 24h', lat: 40.7158, lng: -74.0090 },
  ]);
  const [filter, setFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('distance');
  const [favorites, setFavorites] = React.useState(() => {
    const saved = localStorage.getItem('learnora-study-spots-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showMap, setShowMap] = React.useState(false);

  const types = [
    { value: 'all', label: 'All Spots', icon: '📍' },
    { value: 'library', label: 'Libraries', icon: '📚' },
    { value: 'cafe', label: 'Cafes', icon: '☕' },
    { value: 'campus', label: 'Campus', icon: '🏫' },
    { value: 'outdoor', label: 'Outdoor', icon: '🌳' },
  ];

  const saveFavorites = (favs) => {
    setFavorites(favs);
    localStorage.setItem('learnora-study-spots-favorites', JSON.stringify(favs));
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      saveFavorites(favorites.filter(f => f !== id));
    } else {
      saveFavorites([...favorites, id]);
    }
  };

  const filteredSpots = spots
    .filter(spot => filter === 'all' || spot.type === filter)
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const getTypeIcon = (type) => {
    const t = types.find(t => t.value === type);
    return t?.icon || '📍';
  };

  const getNoiseColor = (noise) => {
    if (noise === 'quiet') return '#10b981';
    if (noise === 'moderate') return '#f59e0b';
    return '#f43f5e';
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      overflow: 'auto',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20 }}>📍 Study Spots</h2>
        </div>
        <button
          onClick={() => setShowMap(!showMap)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: showMap ? 'var(--primary)' : 'var(--bg)',
            color: showMap ? 'white' : 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          {showMap ? '📋 List' : '🗺️ Map'}
        </button>
      </div>

      <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
          overflowX: 'auto',
          paddingBottom: 8
        }}>
          {types.map(t => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 20,
                border: 'none',
                background: filter === t.value ? 'var(--primary)' : 'var(--bg-secondary)',
                color: filter === t.value ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 13,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20
        }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', alignSelf: 'center' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 13,
              cursor: 'pointer'
            }}
          >
            <option value="distance">📍 Nearest</option>
            <option value="rating">⭐ Highest Rated</option>
          </select>
        </div>

        {/* Spots List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredSpots.map(spot => (
            <div
              key={spot.id}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                padding: 16,
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 12
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--primary)' + '15',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24
                  }}>
                    {getTypeIcon(spot.type)}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)' }}>{spot.name}</h3>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {spot.distance} km away • {spot.hours}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(spot.id)}
                  style={{
                    padding: '8px',
                    borderRadius: 8,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 20
                  }}
                >
                  {favorites.includes(spot.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <div style={{
                display: 'flex',
                gap: 8,
                marginBottom: 12,
                flexWrap: 'wrap'
              }}>
                <span style={{
                  padding: '4px 10px',
                  background: '#fbbf2415',
                  color: '#fbbf24',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  ⭐ {spot.rating}
                </span>
                <span style={{
                  padding: '4px 10px',
                  background: spot.wifi ? '#10b98115' : '#f43f5e15',
                  color: spot.wifi ? '#10b981' : '#f43f5e',
                  borderRadius: 6,
                  fontSize: 12
                }}>
                  📶 WiFi {spot.wifi ? '✓' : '✗'}
                </span>
                <span style={{
                  padding: '4px 10px',
                  background: spot.power ? '#10b98115' : '#f43f5e15',
                  color: spot.power ? '#10b981' : '#f43f5e',
                  borderRadius: 6,
                  fontSize: 12
                }}>
                  🔌 Power {spot.power ? '✓' : '✗'}
                </span>
                <span style={{
                  padding: '4px 10px',
                  background: getNoiseColor(spot.noise) + '15',
                  color: getNoiseColor(spot.noise),
                  borderRadius: 6,
                  fontSize: 12
                }}>
                  🔊 {spot.noise.charAt(0).toUpperCase() + spot.noise.slice(1)}
                </span>
              </div>

              <button style={{
                width: '100%',
                padding: '10px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500
              }}>
                🚀 Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
