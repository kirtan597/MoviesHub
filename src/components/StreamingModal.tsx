import React from 'react';
import { X } from 'lucide-react';
import { Movie } from '../types/movie';

interface StreamingModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const StreamingModal: React.FC<StreamingModalProps> = ({ movie, isOpen, onClose }) => {
  if (!movie || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black" style={{ zIndex: 9999 }}>
      <iframe
        src="https://www.youtube.com/embed/wVfTHDhaU9I?autoplay=1&rel=0&modestbranding=1&controls=1"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title={movie.title}
        style={{ border: 'none' }}
      />
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full hover:bg-red-700"
        style={{ zIndex: 10000 }}
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
};

export default StreamingModal;