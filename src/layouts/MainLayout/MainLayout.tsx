import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar'

export default function MainLayout() {
    return (
        <div>
            <SideBar />
            <Outlet/>
        </div>
    )
}
