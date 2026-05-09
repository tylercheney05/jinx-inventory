import type { InventoryCategory } from '@/types/inventoryCategories'

interface CategorySidebarProps {
  categories: InventoryCategory[]
  selectedCategoryIds: Set<number>
  onToggle: (id: number) => void
  onSelectAll: () => void
}

const CategorySidebar = ({ categories, selectedCategoryIds, onToggle, onSelectAll }: CategorySidebarProps) => {
  const allSelected = selectedCategoryIds.size === 0

  const mobileChipClass = (active: boolean) =>
    `text-sm font-medium rounded-full px-4 py-1.5 transition-colors whitespace-nowrap ${
      active
        ? 'bg-jinxBlue text-white'
        : 'bg-white text-gray-700 border border-gray-200 hover:bg-[#EEF2F7]'
    }`

  const desktopRowClass = (active: boolean) =>
    `w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
      active
        ? 'bg-[#E8EFFD] text-jinxBlue font-semibold'
        : 'text-[#0B1220] font-medium hover:bg-[#EEF2F7]'
    }`

  return (
    <>
      {/* Mobile: horizontal scrollable chip row */}
      <div className="flex md:hidden overflow-x-auto gap-2 pb-2 shrink-0">
        <button onClick={onSelectAll} className={mobileChipClass(allSelected)}>All</button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => onToggle(cat.id)} className={mobileChipClass(selectedCategoryIds.has(cat.id))}>
            {cat.name}
          </button>
        ))}
      </div>
      {/* Desktop: vertical row-style list */}
      <div className="hidden md:flex flex-col gap-0.5 w-44 shrink-0 bg-white border border-[#E4E8EE] rounded-xl p-2">
        <button onClick={onSelectAll} className={desktopRowClass(allSelected)}>All categories</button>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => onToggle(cat.id)} className={desktopRowClass(selectedCategoryIds.has(cat.id))}>
            {cat.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default CategorySidebar
