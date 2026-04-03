import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Settings, Menu } from 'lucide-react'
import type { RootState } from '@/store'
import { useIsMobile } from '@/hooks/use-mobile'
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet'

const navLinks = [
  { to: '/inventory', label: 'Inventory' },
  { to: '/in-transit', label: 'In Transit' },
  { to: '/restock', label: 'Restock' },
  { to: '/removal', label: 'Removal' },
  { to: '/settings', label: 'Settings' },
]

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-14 flex items-center justify-between px-4">
      <Link to="/" className="font-bold text-jinxBlue text-lg">
        Jinx Inventory
      </Link>
      {isAuthenticated && (
        <>
          {isMobile ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Open menu">
                  <Menu className="text-jinxBlue" size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="pt-12">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <SheetClose key={link.to} asChild>
                      <button
                        className="text-left text-base font-medium text-jinxBlue px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setOpen(false)
                          navigate(link.to)
                        }}
                      >
                        {link.label}
                      </button>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/inventory"
                className="text-sm font-medium text-jinxBlue px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                Inventory
              </Link>
              <Link
                to="/in-transit"
                className="text-sm font-medium text-jinxBlue px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                In Transit
              </Link>
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
        </>
      )}
    </nav>
  )
}

export default Navbar
