const FilterSidebar = ({ title, options, selectedOptions, onToggleOption }) => (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option} className="flex items-center text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => onToggleOption(option)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
  
  export default FilterSidebar;
  