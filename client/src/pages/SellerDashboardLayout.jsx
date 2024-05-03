import { Outlet } from 'react-router-dom'
import Layout from '../components/Layout.jsx'

function SellerDashboardLayout() {
    return (
        <> 
            <Layout/>
            <div className="px-3 h-[92vh] py-6 sm:ml-64 mt-14">
                <Outlet />
            </div>
        </>
    )
}

export default SellerDashboardLayout