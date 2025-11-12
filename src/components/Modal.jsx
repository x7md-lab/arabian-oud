import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      // Prevent default close so we can sync state
      e.preventDefault();
      onClose?.();
    };

    dialog.addEventListener('cancel', handleCancel);

    try {
      if (isOpen && !dialog.open) {
        dialog.showModal();
      } else if (!isOpen && dialog.open) {
        dialog.close();
      }
    } catch {
      // Fallback for environments without showModal
      if (isOpen && !dialog.open) {
        dialog.setAttribute('open', '');
      } else if (!isOpen && dialog.open) {
        dialog.removeAttribute('open');
      }
    }

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [isOpen, onClose]);

  const handleClose = () => onClose?.();

  return (
    <dialog
      ref={dialogRef}
      dir="rtl"
      className="rounded-xl bg-[#28170e] border border-[#f1eedb] p-6 shadow-2xl text-[#FFFFFF] text-right"
    >
      {/* <div className="flex justify-end">
        <button
          onClick={handleClose}
          className="text-[#f1eedb] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#f1eedb]"
          aria-label="إغلاق"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div> */}
      <div className="mt-2">
        {children}
      </div>
    </dialog>
  );
};

export default Modal;