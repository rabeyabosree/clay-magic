import React from 'react';

function QuantityControl({ productId, quantity, onIncrease, onDecrease, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onDecrease(productId, quantity - 1)}
        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
      >
        −
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => onChange(productId, parseInt(e.target.value))}
        min="0"
        className="w-12 text-center p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={() => onIncrease(productId, quantity + 1)}
        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;


