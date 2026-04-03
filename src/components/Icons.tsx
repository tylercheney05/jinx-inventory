import { Loader2 } from 'lucide-react'

interface LoadingIconProps {
  className?: string
  size?: number
}

const LoadingIcon = ({ className, size = 24 }: LoadingIconProps) => (
  <Loader2 className={`animate-spin ${className ?? ''}`} size={size} />
)
LoadingIcon.displayName = 'LoadingIcon'

export { LoadingIcon }
