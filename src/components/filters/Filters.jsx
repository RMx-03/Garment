import FilterSidebar from './FilterSidebar';

const Filters = ({
  categories,
  colors,
  selectedCategories,
  selectedColors,
  onToggleCategory,
  onToggleColor
}) => {
  return (
    <>
      <FilterSidebar
        title="Category"
        options={categories}
        selectedOptions={selectedCategories}
        onToggleOption={onToggleCategory}
      />
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => onToggleColor(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColors.includes(color) ? 'border-black' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Filters;
