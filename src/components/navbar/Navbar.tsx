import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Settings, Menu } from 'lucide-react'
import type { RootState } from '@/store'
import { useIsMobile } from '@/hooks/use-mobile'
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet'

const navLinks = [
  { to: '/inventory', label: 'Inventory' },
  { to: '/in-transit', label: 'In Transit' },
  { to: '/log', label: 'Log' },
  { to: '/settings', label: 'Settings' },
]

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const linkClass = (path: string) =>
    `text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
      isActive(path)
        ? 'bg-[#E8EFFD] text-jinxBlue font-semibold'
        : 'text-jinxBlue hover:bg-[#EEF2F7]'
    }`

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
                <button className="p-2 rounded-md hover:bg-[#EEF2F7] transition-colors" aria-label="Open menu">
                  <Menu className="text-jinxBlue" size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="pt-12">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose key={link.to} asChild>
                      <button
                        className={`text-left text-base px-3 py-2 rounded-md transition-colors ${
                          isActive(link.to)
                            ? 'bg-[#E8EFFD] text-jinxBlue font-semibold'
                            : 'font-medium text-jinxBlue hover:bg-[#EEF2F7]'
                        }`}
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
            <div className="flex items-center gap-1">
              <Link to="/inventory" className={linkClass('/inventory')}>Inventory</Link>
              <Link to="/in-transit" className={linkClass('/in-transit')}>In Transit</Link>
              <Link to="/log" className={linkClass('/log')}>Log</Link>
              <Link
                to="/settings"
                aria-label="Settings"
                className={`p-2 rounded-md transition-colors ${isActive('/settings') ? 'bg-[#E8EFFD]' : 'hover:bg-[#EEF2F7]'}`}
              >
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
