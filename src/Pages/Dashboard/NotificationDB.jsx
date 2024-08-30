import React from 'react'
import NavbarDB from '../../Components/Dashboard/NavbarDB'
import Sidebar from '../../Components/Dashboard/Sidebar'

const NotificationDB = () => {
  return (
    <>
    <NavbarDB />
    <div className="flex">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
        {/* Image */}
        <img
          src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.no_notification_darkmode.png-26-5021f4d2fac950bf.png"
          alt=""
          className="w-1/12 max-w-2xl mb-8 rounded-lg"
        />

        {/* Headings */}
        <h1 className="text-3xl font-bold mb-4 text-center">No New Notifications</h1>
        <h2 className="text-lg font-semibold text-center">Notifications you received in the last 30 days will show up here.</h2>
      </div>
    </div>
  </>
  )
}

export default NotificationDB