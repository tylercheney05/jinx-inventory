import type { InventoryCategory } from '@/types/inventoryCategories'

interface CategorySidebarProps {
  categories: InventoryCategory[]
  selectedCategoryIds: Set<number>
  onToggle: (id: number) => void
  onSelectAll: () => void
}

const CategorySidebar = ({ categories, selectedCategoryIds, onToggle, onSelectAll }: CategorySidebarProps) => {
  const btnBase = 'text-sm font-medium rounded-full px-4 py-1.5 transition-colors whitespace-nowrap'
  const activeClass = 'bg-jinxBlue text-white'
  const inactiveClass = 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'

  const allSelected = selectedCategoryIds.size === 0

  const buttons = (
    <>
      <button
        onClick={onSelectAll}
        className={`${btnBase} ${allSelected ? activeClass : inactiveClass}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onToggle(cat.id)}
          className={`${btnBase} ${selectedCategoryIds.has(cat.id) ? activeClass : inactiveClass}`}
        >
          {cat.name}
        </button>
      ))}
    </>
  )

  return (
    <>
      {/* Mobile: horizontal scrollable chip row */}
      <div className="flex md:hidden overflow-x-auto gap-2 pb-2 shrink-0">
        {buttons}
      </div>
      {/* Desktop: vertical sidebar */}
      <div className="hidden md:flex flex-col gap-1 w-44 shrink-0">
        {buttons}
      </div>
    </>
  )
}

export default CategorySidebar
