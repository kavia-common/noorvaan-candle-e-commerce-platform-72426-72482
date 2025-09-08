/**
 * PUBLIC_INTERFACE
 * parseMulti
 * Reads multi-select query params supporting both repeated keys (?k=a&k=b)
 * and comma-separated single values (?k=a,b). Returns an array of strings.
 */
export function parseMulti(qs, key) {
  // Collect all values for this key (handles repeated params)
  const repeated = qs.getAll(key) || [];
  // Also handle single comma-separated form
  const single = qs.get(key);

  const parts = [];
  if (repeated.length > 0) {
    for (const v of repeated) {
      if (typeof v === 'string' && v.length) {
        // If a repeated entry itself has commas, split it too
        parts.push(...v.split(',').map(s => s.trim()).filter(Boolean));
      }
    }
  } else if (single) {
    parts.push(...single.split(',').map(s => s.trim()).filter(Boolean));
  }

  // Deduplicate while preserving order
  const seen = new Set();
  const out = [];
  for (const p of parts) {
    const dec = decodeURIComponent(p);
    if (!seen.has(dec)) {
      seen.add(dec);
      out.push(dec);
    }
  }
  return out;
}

export function applyFilters(products, selected) {
  let list = [...products];
  const checks = [
    { key: 'families', fn: p => selected.families.length ? selected.families.includes(p.family) : true },
    { key: 'sizes', fn: p => selected.sizes.length ? selected.sizes.includes(p.size_display) : true },
    { key: 'collections', fn: p => selected.collections.length ? selected.collections.includes(p.collection) : true },
    { key: 'colors', fn: p => selected.colors.length ? selected.colors.includes(p.vessel_color_name || '') : true },
    { key: 'badges', fn: p => selected.badges.length ? selected.badges.includes(p.badge || '') : true },
    { key: 'price_ranges', fn: p => {
      if (!selected.price_ranges.length) return true;
      const b = selected.price_ranges;
      const price = p.price || 0;
      const inRange = (tag) => {
        switch (tag) {
          case '<$40': return price < 40;
          case '$40–$80': return price >= 40 && price <= 80;
          case '$80–$150': return price > 80 && price <= 150;
          case '$150+': return price > 150;
          default: return true;
        }
      };
      return b.some(inRange);
    } }
  ];
  for (const c of checks) list = list.filter(c.fn);
  return list;
}

export function sortProducts(list, sortKey) {
  const arr = [...list];
  // Use stable secondary sort by slug to make deterministic
  const bySlug = (a, b) => (a.slug || '').localeCompare(b.slug || '');
  switch (sortKey) {
    case 'price-asc':
      return arr.sort((a,b)=> {
        const diff = (a.price||0) - (b.price||0);
        return diff !== 0 ? diff : bySlug(a,b);
      });
    case 'price-desc':
      return arr.sort((a,b)=> {
        const diff = (b.price||0) - (a.price||0);
        return diff !== 0 ? diff : bySlug(a,b);
      });
    case 'new':
      // New items first; tie-break deterministically by slug
      return arr.sort((a,b)=> {
        const aNew = !!a.is_new, bNew = !!b.is_new;
        if (aNew === bNew) return bySlug(a,b);
        return bNew - aNew; // true > false
      });
    case 'best':
      // Best sellers first; tie-break by slug
      return arr.sort((a,b)=> {
        const aBest = !!a.is_best_seller, bBest = !!b.is_best_seller;
        if (aBest === bBest) return bySlug(a,b);
        return bBest - aBest; // true > false
      });
    default:
      return arr; // featured default ordering
  }
}

export function countByFacet(products, facets) {
  const counts = {};
  const initGroup = (k, options) => {
    counts[k] = {};
    for (const o of options) counts[k][o] = 0;
  };
  initGroup('families', facets.families);
  initGroup('sizes', facets.sizes);
  initGroup('collections', facets.collections);
  initGroup('colors', facets.colors);
  initGroup('price_ranges', facets.price_ranges);
  initGroup('badges', facets.badges || ['Best Seller','Limited','New']);

  for (const p of products) {
    counts.families[p.family] = (counts.families[p.family] ?? 0) + 1;
    counts.sizes[p.size_display] = (counts.sizes[p.size_display] ?? 0) + 1;
    counts.collections[p.collection] = (counts.collections[p.collection] ?? 0) + 1;
    if (p.vessel_color_name) counts.colors[p.vessel_color_name] = (counts.colors[p.vessel_color_name] ?? 0) + 1;
    if (p.badge) counts.badges[p.badge] = (counts.badges[p.badge] ?? 0) + 1;
    const price = p.price || 0;
    const tag = price < 40 ? '<$40' : price <= 80 ? '$40–$80' : price <= 150 ? '$80–$150' : '$150+';
    counts.price_ranges[tag] = (counts.price_ranges[tag] ?? 0) + 1;
  }
  return counts;
}
