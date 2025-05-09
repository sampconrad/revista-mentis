import * as pdfjsLib from 'pdfjs-dist';
import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import revistaPdf from '../assets/revista.pdf';
import './FlipBook.css';
import Navbar from './Navbar';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PageProps {
  number: number;
  imageUrl: string;
}

const Page = React.forwardRef((props: PageProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} style={{ 
      backgroundColor: 'white',
      border: '1px solid #ddd',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className={`page-gradient ${props.number % 2 === 0 ? 'even' : 'odd'}`} />
      {props.number % 2 === 0 && <div className="inner-shadow" />}
      <img 
        src={props.imageUrl} 
        alt={`Page ${props.number}`} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain',
          position: 'relative',
          zIndex: 0
        }} 
      />
    </div>
  );
});

const FlipBook = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1);
  const bookRef = useRef<unknown>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(revistaPdf).promise;
        const numPages = pdf.numPages;
        const pageImages: string[] = [];

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            pageImages.push(canvas.toDataURL('image/jpeg', 0.8));
          }
        }

        setPages(pageImages);
        setLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setLoading(false);
      }
    };

    loadPdf();
  }, []);

  const handlePageChange = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='spinner'></div>
        <div className='loading-text'>Carregando revista...</div>
      </div>
    );
  }

  const totalPages = pages.length;
  const progress = Math.min((currentPage / (totalPages - 2)) * 100, 100);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        minHeight: '100vh',
        backgroundColor: '#cfcfcf',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <Navbar
        currentPage={currentPage}
        totalPages={totalPages}
        progress={progress}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          padding: '80px 20px 20px 20px',
          transform: `scale(${scale})`,
          transition: 'transform 0.3s ease',
          maxHeight: 'calc(100vh - 100px)',
          overflow: 'hidden',
        }}>
        <HTMLFlipBook
          width={550}
          height={780}
          size={window.innerWidth <= 1120 ? 'stretch' : 'fixed'}
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.3}
          showCover={true}
          mobileScrollSupport={true}
          swipeDistance={30}
          clickEventForward={true}
          useMouseEvents={true}
          showPageCorners={true}
          disableFlipByClick={false}
          ref={bookRef}
          className='flipbook'
          style={{
            margin: '0 auto',
            maxHeight: 'calc(100vh - 100px)',
          }}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          onFlip={handlePageChange}>
          {pages.map((imageUrl, index) => (
            <Page
              key={index}
              number={index + 1}
              imageUrl={imageUrl}
            />
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default FlipBook; 