import React from 'react';

interface NavbarProps {
  currentPage: number;
  totalPages: number;
  progress: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, totalPages, progress, onZoomIn, onZoomOut }) => {
  // Calculate the actual page numbers (excluding cover)
  const leftPage = currentPage - 1;
  const rightPage = currentPage;
  const isCover = currentPage === 0;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          flex: 1,
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#fff',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{
          color: '#fff',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          whiteSpace: 'nowrap'
        }}>
          {isCover ? 'capa' : `${leftPage}-${rightPage}`} / {totalPages - 2}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <button
            onClick={onZoomOut}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#fff',
              width: '30px',
              height: '30px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <button
            onClick={onZoomIn}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#fff',
              width: '30px',
              height: '30px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 