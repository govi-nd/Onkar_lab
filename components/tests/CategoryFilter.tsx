export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange("All")}
        className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
          activeCategory === "All"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-black hover:bg-slate-100"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === category
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-black hover:bg-slate-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
