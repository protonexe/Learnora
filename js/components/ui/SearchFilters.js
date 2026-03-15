const SearchFilters = ({ 
  filters = {}, 
  onChange, 
  sortOptions = [],
  defaultSort = 'recent'
}) => {
  const isMobile = window.innerWidth <= 768;
  const [localFilters, setLocalFilters] = React.useState({
    sort: defaultSort,
    ...filters
  });

  const handleChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onChange?.(newFilters);
  };

  const clearFilters = () => {
    const cleared = { sort: defaultSort };
    setLocalFilters(cleared);
    onChange?.(cleared);
  };

  const hasActiveFilters = Object.entries(localFilters).some(([key, value]) => 
    value && value !== 'all' && value !== defaultSort
  );

  const defaultSortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'progress', label: 'Progress' },
  ];

  const options = sortOptions.length > 0 ? sortOptions : defaultSortOptions;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '12px' : '16px',
      alignItems: isMobile ? 'stretch' : 'center',
      justifyContent: 'space-between',
      marginBottom: '16px',
      padding: '12px',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)'
    }}>
      {/* Sort Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon name="arrow-up-down" size={16} color="var(--text-tertiary)" />
        <select
          value={localFilters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
          style={{
            padding: '8px 12px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '13px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            minWidth: '140px'
          }}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {Object.entries(localFilters).filter(([key, value]) => 
            value && value !== 'all' && value !== defaultSort && key !== 'sort'
          ).map(([key, value]) => (
            <span
              key={key}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                background: 'var(--primary-500)15',
                color: 'var(--primary-500)',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              {value}
              <button
                onClick={() => handleChange(key, 'all')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--primary-500)',
                  padding: '0',
                  fontSize: '14px'
                }}
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={clearFilters}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--danger)',
              fontSize: '12px',
              fontWeight: '500',
              textDecoration: 'underline'
            }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results Count */}
      <div style={{
        fontSize: '13px',
        color: 'var(--text-tertiary)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <Icon name="search" size={14} />
        <span>{filters.resultCount || 'Results'}</span>
      </div>
    </div>
  );
};

window.SearchFilters = SearchFilters;
