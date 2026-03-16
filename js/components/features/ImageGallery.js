const ImageGallery = ({ images = [], columns = 3, gap = 8 }) => {
  const [lightbox, setLightbox] = React.useState(null);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gap}px` }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src || img}
            alt={img.alt || ''}
            onClick={() => setLightbox(idx)}
            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
          />
        ))}
      </div>
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <img src={images[lightbox].src || images[lightbox]} alt="" style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  );
};

window.ImageGallery = ImageGallery;
