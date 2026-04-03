import { useIsMobile } from '@/hooks/use-mobile'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import RemovalForm from '@/components/removal/RemovalForm'
import type { InventoryItem } from '@/types/inventoryItems'

interface RemovalModalProps {
  item: InventoryItem | null
  onClose: () => void
}

const RemovalModal = ({ item, onClose }: RemovalModalProps) => {
  const isMobile = useIsMobile()
  const open = !!item

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Remove</DrawerTitle>
            <DrawerDescription>{item?.name}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            {item && <RemovalForm item={item} onSuccess={onClose} />}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove</DialogTitle>
          <DialogDescription>{item?.name}</DialogDescription>
        </DialogHeader>
        {item && <RemovalForm item={item} onSuccess={onClose} />}
      </DialogContent>
    </Dialog>
  )
}

export default RemovalModal
