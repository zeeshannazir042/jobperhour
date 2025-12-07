import React from "react";

const Modal = ({ title, children, onClose, onSubmit }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        {children}
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Modal;
