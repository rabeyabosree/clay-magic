import React from "react";

const DynamicCheckboxGroup = ({ options, values, onChange }) => {
  return (
    <div className="grid grid-cols-3 space-y-3">
      {options.map((option) => (
        <label key={option.name} className="flex items-center space-x-3">
          <input
            type="checkbox"
            name={option.name}
            checked={values[option.name] || false}
            onChange={(e) => onChange(e.target.name, e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default DynamicCheckboxGroup;
