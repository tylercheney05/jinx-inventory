import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AddInventoryCategoryForm from '@/components/inventorycategories/AddInventoryCategoryForm'
import InventoryCategoryList from '@/components/inventorycategories/InventoryCategoryList'
import AddInventoryItemForm from '@/components/inventoryitems/AddInventoryItemForm'
import InventoryItemList from '@/components/inventoryitems/InventoryItemList'

const SettingsPage = () => (
  <Layout>
    <div className="flex items-center justify-center mt-8 sm:mt-[100px]">
      <Card className="w-full sm:w-[500px] md:w-[900px] min-h-[400px]">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile: horizontal tabs on top. Desktop: vertical tabs on left sidebar */}
          <Tabs defaultValue="items" orientation="vertical" className="flex flex-col sm:flex-row">
            <TabsList className="justify-start overflow-x-auto sm:overflow-x-visible sm:flex-col sm:w-[160px] sm:shrink-0">
              <TabsTrigger value="inventoryCategories" className="justify-start">
                Inventory Categories
              </TabsTrigger>
              <TabsTrigger value="items" className="justify-start">
                Items
              </TabsTrigger>
            </TabsList>
            <TabsContent value="items" className="w-full">
              <InventoryItemList />
              <AddInventoryItemForm />
            </TabsContent>
            <TabsContent value="inventoryCategories" className="w-full">
              <InventoryCategoryList />
              <AddInventoryCategoryForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </Layout>
)

export default SettingsPage
