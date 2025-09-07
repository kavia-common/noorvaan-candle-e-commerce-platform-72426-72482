import React from 'react';
import { useContent } from '../providers/ContentContext';

// PUBLIC_INTERFACE
export default function PromoBar() {
  const { site } = useContent();
  if (!site?.announcement?.enabled) return null;

  const { threshold, code, message } = site.announcement;
  const text = message || (threshold ? `Free shipping on orders over $${threshold}` : '');
  const suffix = code ? ` • Use code ${code}` : '';

  return (
    <div className="announcement">
      {text}{suffix}
    </div>
  );
}
