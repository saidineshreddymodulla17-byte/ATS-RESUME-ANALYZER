import Sidebar from '../Sidebar'

const DashboardLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <Sidebar />

      <main className="min-h-screen lg:pl-[270px]">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout