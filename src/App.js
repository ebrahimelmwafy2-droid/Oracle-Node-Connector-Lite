import React from 'react';
// استدعاء الـ Connector والـ Engine (تأكد من وجود الملفات في src/lib)
import { useOracleSync } from './lib/OracleConnector';
import { useOracleConnector } from './lib/OracleEngine'; 
import './App.css';

function App() {
  // استخدام الـ Connector الأساسي اللي فيه ميزة الـ Refresh
  const { data, loading, refresh } = useOracleSync({ endpoint: 'https://api.example.com/data' });
  
  // ندهنا للـ Engine عشان ناخد منه حالة الـ Connection (Synced / Connection Failed)
  const { status } = useOracleConnector('https://api.example.com/data');

  return (
    <div className="App" style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      
      {/* الـ Header مع حالة الاتصال والزرار */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #58a6ff', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0 }}>E-Flow Oracle Engine 🚀</h1>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '5px' }}>
            <p style={{ color: '#8b949e', margin: 0 }}>v1.0.0 | Built by Ebrahim Elmwafy</p>
            <span style={{ 
              fontSize: '12px', 
              color: status.includes('Synced') ? '#3fb950' : '#f85149',
              background: 'rgba(0,0,0,0.3)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid'
            }}>
              {status}
            </span>
          </div>
        </div>
        
        <button 
          onClick={refresh} 
          style={{ 
            background: '#238636', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#2ea043'}
          onMouseOut={(e) => e.target.style.background = '#238636'}
        >
          {loading ? '⚡ Syncing Infrastructure...' : 'Refresh Oracle Sync'}
        </button>
      </header>

      {/* عرض البيانات */}
      <div style={{ marginTop: '30px', display: 'grid', gap: '20px' }}>
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} style={{ 
              background: '#161b22', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid #30363d', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#58a6ff', letterSpacing: '0.5px' }}>
                  {item.name}
                </h3>
                <small style={{ color: '#8b949e' }}>
                  Node Location: <span style={{ color: '#c9d1d9' }}>Damietta Cluster</span> | Last Sync: {item.lastSync}
                </small>
              </div>
              
              <span style={{ 
                background: item.status === 'Active' ? '#238636' : '#1f6feb', 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontSize: '11px', 
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {item.status}
              </span>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', color: '#8b949e' }}>
            <p>No data records found. Try clicking Refresh.</p>
          </div>
        )}
      </div>

      <footer style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px' }}>
        <p style={{ color: '#484f58', fontSize: '13px' }}>
          © 2026 E-Flow Systems. Licensed for Oracle Enterprise Infrastructure.
        </p>
      </footer>
    </div>
  );
}

export default App;