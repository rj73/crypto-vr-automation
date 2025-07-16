import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";

export default function NavbarAdmin() {
  const navigate = useNavigate();

  const removeUser = async () => {
    try {
      const res = await fetch('https://crypto-vr-automation.onrender.com/api/history', {
        method: 'POST',
      });

      if (res.ok) {
        alert('History snapshot saved successfully.');
        navigate('/');
      } else {
        alert('Failed to save history.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error while saving history.');
    }
  };

  return (
    <div className="border-2 border-gray-100">
      <div className="flex justify-between items-center">
        <img
          onClick={() => navigate('/')}
          className="relative z-1 p-5 ml-30 w-90 cursor-pointer h-20"
          src={assets.logo}
          alt="logo"
        />
        <button
          onClick={removeUser}
          className="relative z-1 p-5 mr-30 bg-blue-600 rounded-full w-37 h-10 flex items-center cursor-pointer text-white gap-3 text-sm"
        >
          <div>Snap History</div>
          <img src={assets.arrow} alt="arrow" />
        </button>
      </div>
    </div>
  );
}
