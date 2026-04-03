import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Settings } from 'lucide-react'
import type { RootState } from '@/store'

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-14 flex items-center justify-between px-4">
      <Link to="/" className="font-bold text-jinxBlue text-lg">
        Jinx Inventory
      </Link>
      {isAuthenticated && (
        <div className="flex items-center gap-2">
          <Link
            to="/restock"
            className="text-sm font-medium text-jinxBlue px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            Restock
          </Link>
          <Link to="/settings" aria-label="Settings" className="p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Settings className="text-jinxBlue" size={22} />
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
