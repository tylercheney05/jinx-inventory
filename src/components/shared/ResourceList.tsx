import type { ReactNode } from 'react'
import { LoadingIcon } from '@/components/Icons'

interface ResourceListProps<T> {
  title: string
  emptyMessage: string
  errorMessage: string
  isLoading: boolean
  isError: boolean
  data: T[] | undefined
  renderItem: (item: T) => ReactNode
  getKey: (item: T) => string | number
}

const ResourceList = <T,>({
  title,
  emptyMessage,
  errorMessage,
  isLoading,
  isError,
  data,
  renderItem,
  getKey,
}: ResourceListProps<T>) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <LoadingIcon />
      </div>
    )
  }

  if (isError) {
    return <p className="text-sm text-destructive px-4">{errorMessage}</p>
  }

  return (
    <div className="px-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {data && data.length > 0 ? (
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={getKey(item)}>{renderItem(item)}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      )}
    </div>
  )
}

export default ResourceList
