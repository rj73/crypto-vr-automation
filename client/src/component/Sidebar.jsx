import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";

export default function Sidebar(){
    return <div className="flex flex-col w-60  items-center h-full">
    <div className="w-full mt-4">
        <NavLink end={true} to='/' className={({isActive})=> (isActive? "bg-blue-50 border-blue-700 shadow-2xs p-1  text-black  w-full flex pl-10 gap-3 border-r-4": "p-1  text-black  w-full flex pl-10 gap-3")}>
        <img className="w-4" src={assets.home_icon}></img>
        <p>Dashboard</p>
        </NavLink>
        
        </div>
    </div>
}