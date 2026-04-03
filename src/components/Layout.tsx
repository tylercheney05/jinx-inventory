import Navbar from '@/components/navbar/Navbar'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

const Layout = ({ children, className = '' }: LayoutProps) => (
  <>
    <Navbar />
    <div className={`min-h-screen bg-[#e8effd] pt-14 pb-5 px-5 ${className}`}>
      {children}
    </div>
  </>
)

export default Layout
