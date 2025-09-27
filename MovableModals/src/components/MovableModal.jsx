import { useState, useRef, useEffect, useCallback } from 'react';

// Global state for managing multiple modals
export let modalInstances = []; // Array to hold references to all open modals..............
let highestZIndex = 1000;

const MovableModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  initialPosition = { x: 100, y: 100 },
  id = Math.random().toString(36).substr(2, 9) // Unique ID for each modal
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(1000);
  const [isFocused, setIsFocused] = useState(false);
  const modalRef = useRef(null);
  const dragHandleRef = useRef(null);
  const modalId = useRef(id);

  // Register/unregister modal instance
  useEffect(() => {
    if (isOpen) {
      // Add to global modal instances
      const modalInstance = {
        id: modalId.current,
        ref: modalRef,
        setZIndex,
        setIsFocused,
        close: onClose,
        bringToFront: bringToFront //Added bringToFront method to instance...............
      };
      modalInstances.push(modalInstance);
      
      // Set initial z-index and focus
      bringToFront();
      
      return () => {
        // Remove from global instances when closed
        modalInstances = modalInstances.filter(m => m.id !== modalId.current);
      };
    }
  }, [isOpen]);

  // Bring modal to front when clicked
  const bringToFront = useCallback(() => {
    highestZIndex += 1;
    setZIndex(highestZIndex);
    setIsFocused(true);
    
    // Set other modals as not focused
    modalInstances.forEach(instance => {
      if (instance.id !== modalId.current) {
        instance.setIsFocused(false);
      }
    });
  }, []);

  // Focus management - only trap focus in the topmost modal
  useEffect(() => {
    if (isOpen && isFocused && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen, isFocused]);

  // Handle keyboard navigation (trap focus) - only for focused modal
  useEffect(() => {
    if (!isOpen || !isFocused) return;

    const handleKeyDown = (e) => {
      // ESC closes only the topmost modal
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Tab navigation only in focused modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFocused, onClose]);

  // Click handler to bring modal to front
  const handleModalClick = useCallback((e) => {
    e.stopPropagation();
    if (!isFocused) {
      bringToFront();
    }
  }, [isFocused, bringToFront]);

  // Removed outside click to close functionality for better multiple modal experience
  // Users can use ESC key or X button to close modals
  // This prevents interference with opening multiple modals

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!dragHandleRef.current.contains(e.target)) return;
    
    // Bring to front when starting to drag
    if (!isFocused) {
      bringToFront();
    }
    
    // This will disable transitions during drag................
    if (modalRef.current) {
      modalRef.current.style.transition = 'none';
    }

    setIsDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const modalRect = modalRef.current.getBoundingClientRect();
    
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;

    // Constrain to viewport bounds
    newX = Math.max(0, Math.min(newX, viewport.width - modalRect.width));
    newY = Math.max(0, Math.min(newY, viewport.height - modalRect.height));

    //setPosition({ x: newX, y: newY });...................
    modalRef.current.style.left = `${newX}px`;
    modalRef.current.style.top = `${newY}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    //Here we could update position state to reflect final position.............
    if (modalRef.current) {
        modalRef.current.style.transition = '';
        const finalRect = modalRef.current.getBoundingClientRect();
        setPosition({ x: finalRect.left, y: finalRect.top });
    }
  };

  // Touch drag handlers for mobile - enhanced for multiple modals
  const handleTouchStart = (e) => {
    if (!dragHandleRef.current.contains(e.target)) return;
    
    // Bring to front when starting to drag on touch
    if (!isFocused) {
      bringToFront();
    }
    
    // This will disable transitions during drag..............
    if (modalRef.current) {
      modalRef.current.style.transition = 'none';
    }

    const touch = e.touches[0];
    setIsDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const modalRect = modalRef.current.getBoundingClientRect();
    
    let newX = touch.clientX - dragOffset.x;
    let newY = touch.clientY - dragOffset.y;

    // Constrain to viewport bounds
    newX = Math.max(0, Math.min(newX, viewport.width - modalRect.width));
    newY = Math.max(0, Math.min(newY, viewport.height - modalRect.height));

    //setPosition({ x: newX, y: newY }); .......................
    modalRef.current.style.left = `${newX}px`;
    modalRef.current.style.top = `${newY}px`;
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    //Here we could update position state to reflect final position..............
    if (modalRef.current) {
      modalRef.current.style.transition = '';
        const finalRect = modalRef.current.getBoundingClientRect();
        setPosition({ x: finalRect.left, y: finalRect.top });
    }
  };

  // Global mouse/touch event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  return (
    <>
      {/* No backdrop - allows full visibility of underlying interface for multiple modals */}
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed bg-white rounded-lg min-w-80 max-w-2xl transition-all duration-200 ${ //Here transition is disabled during drag...............  
          isDragging ? 'shadow-2xl scale-105' : 'shadow-xl hover:shadow-2xl'
        } ${
          isFocused 
            ? 'border-2 border-indigo-400 ring-4 ring-indigo-100 shadow-indigo-200/50' 
            : 'border border-gray-300 hover:border-gray-400 shadow-gray-200/50'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: zIndex,
          cursor: isDragging ? 'grabbing' : 'default'
        }}
        onClick={handleModalClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${modalId.current}`}
      >
        {/* Drag Handle - Header */}
        <div
          ref={dragHandleRef}
          className={`flex items-center justify-between p-4 border-b rounded-t-lg transition-all duration-200 ${
            isDragging ? 'cursor-grabbing bg-gradient-to-r from-indigo-100 to-purple-100' : 'cursor-grab'
          } ${
            isFocused 
              ? 'bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-300' 
              : 'bg-gray-50 border-gray-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <h2 id={`modal-title-${modalId.current}`} className={`text-lg font-semibold select-none transition-colors ${
              isFocused ? 'text-indigo-900' : 'text-gray-900'
            }`}>
              {title}
            </h2>
            <div className="flex items-center space-x-2">
              {isFocused && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 animate-pulse">
                  Active
                </span>
              )}
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                isFocused 
                  ? 'bg-indigo-200 text-indigo-800' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {Math.floor(zIndex / 100) % 10 || '●'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded hover:bg-gray-200"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default MovableModal;