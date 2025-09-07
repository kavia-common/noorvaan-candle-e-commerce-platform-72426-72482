import React, { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('processing');
    setTimeout(() => setStatus('success'), 900);
  };

  return (
    <div className="nv-section">
      <h1>Contact & Newsletter</h1>
      <form onSubmit={handleSubmit} className="nv-row">
        <div>
          <label style={{display:'block', marginBottom:6}}>Name</label>
          <input className="nv-input" placeholder="Your name" required />
        </div>
        <div>
          <label style={{display:'block', marginBottom:6}}>Email</label>
          <input className="nv-input" type="email" placeholder="you@example.com" required />
        </div>
        <div style={{gridColumn:'1 / -1'}}>
          <label style={{display:'block', marginBottom:6}}>Message</label>
          <textarea className="nv-textarea" rows={5} placeholder="How can we help?" />
        </div>
        <div style={{gridColumn:'1 / -1', display:'flex', gap:10}}>
          <button className="nv-btn" type="submit" disabled={status==='processing'}>
            {status==='processing' ? 'Sending…' : 'Send'}
          </button>
          <button className="nv-btn secondary" type="button" onClick={()=>setStatus('idle')}>Reset</button>
        </div>
      </form>

      <div className="nv-section">
        <div className="nv-kicker">Newsletter</div>
        <p>Be the first to hear about seasonal scents and limited drops.</p>
        <form onSubmit={handleSubmit} style={{display:'flex', gap:10, flexWrap:'wrap'}}>
          <input className="nv-input" type="email" placeholder="you@example.com" required style={{flex:'1 1 260px'}} />
          <button className="nv-btn" type="submit" disabled={status==='processing'}>
            {status==='processing' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
        {status==='success' && <div style={{marginTop:10}}>Thanks! You’re on the list.</div>}
      </div>
    </div>
  );
}
