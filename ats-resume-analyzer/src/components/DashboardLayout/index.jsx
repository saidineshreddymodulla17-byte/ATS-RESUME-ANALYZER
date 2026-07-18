import Sidebar from '../Sidebar'

const DashboardLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout