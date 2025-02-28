import { useEffect, useState } from "react";
import { User, Edit, Shield } from "lucide-react";
import SettingSection from "./SettingSection";
import axios from "axios";
import { BASE_URL } from "../../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="animate-pulse space-y-4 p-4">
        <div className="h-24 w-24 rounded-full bg-gray-700" />
        <div className="space-y-2">
          <div className="h-4 w-48 rounded bg-gray-700" />
          <div className="h-4 w-64 rounded bg-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-x-8 md:space-y-0">
        <div className="relative">
          <img
            src={
				user.photo?.[0]?.name 
                  ? `${BASE_URL}/cdn?file=${user.photo[0].name}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-indigo-500/30 object-cover shadow-lg"
          />
          {user.role === "admin" && (
            <div className="absolute -bottom-2 right-0 rounded-full bg-purple-600 p-1">
              <Shield className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white">{user.name}</h3>
          <p className="text-gray-300">{user.email}</p>
          <div className="inline-flex items-center rounded-full bg-gray-700/50 px-3 py-1 text-sm">
            <span className="mr-2 text-gray-400">Role:</span>
            <span className="font-medium text-indigo-400">{user.role}</span>
          </div>
        </div>
        {/* <div className="w-full md:w-auto">
          <button className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-indigo-500/50 bg-indigo-500/10 py-2 px-6 font-medium text-indigo-300 transition-all hover:border-indigo-500 hover:bg-indigo-500/20 hover:text-indigo-200">
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div> */}
      </div>
    </SettingSection>
  );
};

export default Profile;