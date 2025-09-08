import React, { createContext, useContext } from 'react';
import fragrances from '../data/fragrances.json';
import facets from '../data/facets.json';
import faqs from '../data/faqs.json';
import collections from '../data/collections.json';
import site from '../data/site.json';

const ContentContext = createContext(null);

// PUBLIC_INTERFACE
export function ContentProvider({ children }) {
  const api = {
    fragrances,
    facets,
    faqs,
    collections,
    site
  };
  return <ContentContext.Provider value={api}>{children}</ContentContext.Provider>;
}

// PUBLIC_INTERFACE
export function useContent() {
  /** Returns data models for the site: fragrances, facets, faqs, collections, site config */
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
