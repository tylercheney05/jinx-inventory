import Layout from "@/components/Layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const CATEGORY_STOCK_DATA = [
  { category: "Cups", onHand: 320, value: 480, fill: "#2A70E9" },
  { category: "Lids", onHand: 275, value: 220, fill: "#10905D" },
  { category: "Syrups", onHand: 84, value: 1260, fill: "#FCD638" },
  { category: "Toppings", onHand: 150, value: 600, fill: "#DF4B44" },
  { category: "Powders", onHand: 62, value: 930, fill: "#B4D819" },
  { category: "Straws", onHand: 500, value: 150, fill: "#7C3AED" },
]

const totalValue = CATEGORY_STOCK_DATA.reduce((sum, d) => sum + d.value, 0)

const HomePage = () => (
  <Layout>
    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

    <Card className="mb-6">
      <CardHeader>
        <CardDescription>Total Inventory Value</CardDescription>
        <CardTitle className="text-4xl">
          ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </CardTitle>
      </CardHeader>
    </Card>

    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Stock Levels by Category</CardTitle>
          <CardDescription>Units on hand per category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={CATEGORY_STOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="onHand" name="On Hand" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Value by Category</CardTitle>
          <CardDescription>Estimated dollar value per category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={CATEGORY_STOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(v: number) => `$${v}`} />
              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Value",
                ]}
              />
              <Bar dataKey="value" name="Value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </Layout>
)

export default HomePage
