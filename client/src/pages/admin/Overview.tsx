import { BarChart3, Users } from "lucide-react"


const Overview = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <div className="flex items-center mb-2">
                <BarChart3 className="text-blue-600 mr-3" size={24} />
                <h2 className="font-bold text-lg">Sales</h2>
              </div>
              <p className="text-2xl font-semibold">GHC 10,000</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <div className="flex items-center mb-2">
                <i className="fas fa-faMoneyBill text-green-600 mr-3" />
                <h2 className="font-bold text-lg">Revenue</h2>
              </div>
              <p className="text-2xl font-semibold">GHC 50,000</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <div className="flex items-center mb-2">
                <Users className="text-purple-600 mr-3" size={24} />
                <h2 className="font-bold text-lg">Users</h2>
              </div>
              <p className="text-2xl font-semibold">1,200</p>
            </div>
          </section>
  )
}

export default Overview