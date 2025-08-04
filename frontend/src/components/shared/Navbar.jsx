import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '../ui/avatar';
import { LogOut, User2, Search, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { logout } from '@/redux/authSlice';
import { persistor } from '@/redux/store';

function Navbar() {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });

      if (res.data.success) {
        dispatch(logout());
        
        // Purge all persisted Redux data
        persistor.purge();
        
        navigate("/");
        toast.success(res.data.message)
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="bg-[#1A1A2E] border-b border-gray-800">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-purple-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Work<span className="gradient-text">Vista</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-8">
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies" className="text-white hover:text-gray-300 transition-colors">Companies</Link></li>
                <li><Link to="/admin/jobs" className="text-white hover:text-gray-300 transition-colors">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="text-white hover:text-gray-300 transition-colors">Home</Link></li>
                <li><Link to="/jobs" className="text-white hover:text-gray-300 transition-colors">Jobs</Link></li>
                <li><Link to="/browse" className="text-white hover:text-gray-300 transition-colors">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Icons and Buttons */}
          <div className="flex items-center gap-4 z-50">
            <Search className="h-5 w-5 text-white cursor-pointer hover:text-gray-300 transition-colors" />
            <Bell className="h-5 w-5 text-white cursor-pointer hover:text-gray-300 transition-colors" />
            
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-lg">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="gradient-purple-blue hover:opacity-90 text-white rounded-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-700">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                      alt="User Avatar"
                      className="rounded-full"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-88 bg-gray-800 border-gray-700">
                  <div className="flex items-center gap-2 p-4">
                    <Avatar className="w-10 h-10 rounded-full cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                        alt="User Avatar"
                        className="rounded-full"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white">{user?.fullname}</h4>
                      <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-300 p-4">
                    {user && user.role === 'student' && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-white transition-colors'>
                        <User2 className="h-4 w-4" />
                        <Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-white transition-colors">
                      <LogOut className="h-4 w-4" />
                      <Button onClick={logoutHandler} variant="link" className="text-gray-300 hover:text-white p-0 h-auto">
                        Log Out
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
