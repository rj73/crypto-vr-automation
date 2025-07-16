import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Sidebar from "./Sidebar";

export default function Layout(){
    return <>
        <NavbarAdmin></NavbarAdmin>
          <div className="flex">
                <Sidebar />
                <div className="flex-1"> 
                    <Outlet />
                </div>
            </div>
    </>
}