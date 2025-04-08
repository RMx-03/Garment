const MobileFilters = ({ categories, selectedCategories, onToggleCategory }) => (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onToggleCategory(cat)}
          className={`px-4 py-2 rounded-full border whitespace-nowrap ${
            selectedCategories.includes(cat)
              ? 'bg-black text-white border-black'
              : 'border-gray-300 text-gray-700'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
  
  export default MobileFilters;
  