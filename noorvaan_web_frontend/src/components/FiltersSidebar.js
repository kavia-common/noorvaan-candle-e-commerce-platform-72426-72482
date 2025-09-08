import React from 'react';

// PUBLIC_INTERFACE
export default function FiltersSidebar({ facets, selected, counts, onToggle, onClear }) {
  const groups = [
    { key: 'sizes', label: 'Product Sizes' },
    { key: 'families', label: 'Fragrance Family' },
    { key: 'collections', label: 'Collections' },
    { key: 'colors', label: 'Colors' },
    { key: 'price_ranges', label: 'Price' },
    { key: 'badges', label: 'Badges' }
  ];

  const renderGroup = (group) => {
    const options = facets[group.key] || [];
    return (
      <div key={group.key}>
        <div style={{fontWeight:600, margin:'10px 0 6px'}}>{group.label}</div>
        <div style={{display:'grid', gap:6}}>
          {options.map(o => {
            const active = selected[group.key]?.includes(o);
            const count = counts?.[group.key]?.[o];
            return (
              <label key={o} style={{display:'flex', alignItems:'center', gap:8, cursor:'pointer'}}>
                <input type="checkbox" checked={!!active} onChange={()=>onToggle(group.key, o)} />
                <span>{o}</span>
                {typeof count === 'number' && <span className="badge" aria-label="count">{count}</span>}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const chips = Object.entries(selected).flatMap(([k, arr]) => (arr||[]).map(v => ({k, v})));

  return (
    <aside className="card" style={{padding:12, position:'sticky', top:90, alignSelf:'start'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{fontWeight:700}}>Filters</div>
        <button className="btn" onClick={onClear} aria-label="Clear filters">Clear all</button>
      </div>
      {chips.length > 0 && (
        <div style={{margin:'10px 0', display:'flex', flexWrap:'wrap', gap:6}}>
          {chips.map(({k,v}) => (
            <button key={`${k}:${v}`} className="badge" onClick={()=>onToggle(k, v)} aria-label={`remove ${v}`}>
              {v} ✕
            </button>
          ))}
        </div>
      )}
      <div className="hr" />
      <div style={{display:'grid', gap:14}}>
        {groups.map(renderGroup)}
      </div>
    </aside>
  );
}
