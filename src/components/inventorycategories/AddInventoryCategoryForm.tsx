import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateInventoryCategoryMutation } from '@/services/inventoryCategories'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AddForm from '@/components/shared/AddForm'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
})

const AddInventoryCategoryForm = () => {
  const [createInventoryCategory, result] = useCreateInventoryCategoryMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createInventoryCategory(values)
  }

  return (
    <AddForm
      title="Add Inventory Category"
      buttonText="Add Category"
      successMessage="Category created successfully!"
      errorMessage="Failed to create category. Please try again."
      form={form}
      result={result}
      onSubmit={onSubmit}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter category name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </AddForm>
  )
}

export default AddInventoryCategoryForm
