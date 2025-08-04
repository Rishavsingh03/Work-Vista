import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Download, User, MapPin, Calendar } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJob'

const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)

    return (
        <div className="min-h-screen bg-[#1A1A2E]">
            <Navbar />
            
            {/* Profile Header Section */}
            <div className='max-w-4xl mx-auto px-4 py-8'>
                <div className='card-dark rounded-2xl p-8 mb-8 border border-gray-700/50'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                        <div className='flex items-center gap-6'>
                            <Avatar className="h-24 w-24 border-4 border-gray-700">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" />
                            </Avatar>
                            <div>
                                <h1 className='font-bold text-2xl text-white mb-2'>{user?.fullname}</h1>
                                <p className='text-gray-300 text-lg'>{user?.profile?.bio || "No bio available"}</p>
                                <div className='flex items-center gap-4 mt-3'>
                                    <div className='flex items-center gap-2 text-gray-400'>
                                        <Mail className="h-4 w-4" />
                                        <span className='text-sm'>{user?.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-gray-400'>
                                        <Contact className="h-4 w-4" />
                                        <span className='text-sm'>{user?.phoneNumber || "No phone"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            variant="outline" 
                            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-xl px-4"
                        >
                            <Pen className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>
                </div>

                {/* Skills Section */}
                <div className='card-dark rounded-2xl p-8 mb-8 border border-gray-700/50'>
                    <div className='flex items-center gap-2 mb-6'>
                        <User className="h-5 w-5 text-purple-500" />
                        <h2 className='font-bold text-xl text-white'>Skills & Expertise</h2>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((skill, index) => (
                                <Badge 
                                    key={index} 
                                    className="bg-gray-800 text-gray-300 border border-gray-700 rounded-lg px-3 py-1 text-sm"
                                >
                                    {skill}
                                </Badge>
                            ))
                        ) : (
                            <span className='text-gray-400 text-sm'>No skills added yet</span>
                        )}
                    </div>
                </div>

                {/* Resume Section */}
                <div className='card-dark rounded-2xl p-8 mb-8 border border-gray-700/50'>
                    <div className='flex items-center gap-2 mb-6'>
                        <Download className="h-5 w-5 text-green-500" />
                        <h2 className='font-bold text-xl text-white'>Resume</h2>
                    </div>
                    {isResume && user?.profile?.resume ? (
                        <div className='space-y-4'>
                            <div className='p-4 bg-gray-800 rounded-xl border border-gray-700'>
                                <div className='flex items-center gap-3 mb-3'>
                                    <div className='w-10 h-10 bg-white-500/20 rounded-lg flex items-center justify-center'>
                                        <Download className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className='text-white font-medium'>{user?.profile?.resumeOriginalName || "Resume.pdf"}</p>
                                        <p className='text-gray-400 text-sm'>Click to view resume</p>
                                    </div>
                                </div>
                                {/* <div className='mt-4'>
                                    <p className='text-gray-400 text-sm mb-2'>Resume URL:</p>
                                    <div className='p-3 bg-gray-900 rounded-lg border border-gray-600'>
                                        <p className='text-green-400 text-sm break-all font-mono'>
                                            {user?.profile?.resume}
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                            <div className='flex justify-end'>
                                <a 
                                    target='_blank' 
                                    href={user?.profile?.resume} 
                                    className='px-6 py-2 bg-white-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2'
                                >
                                    <Download className="h-4 w-4" />
                                    View Resume
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className='text-center py-8'>
                            <Download className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                            <p className='text-gray-400 text-lg'>No resume uploaded yet</p>
                            <p className='text-gray-500 text-sm mt-2'>Upload your resume to increase your chances</p>
                        </div>
                    )}
                </div>

                {/* Applied Jobs Section */}
                <div className='card-dark rounded-2xl p-8 border border-gray-700/50'>
                    <div className='flex items-center gap-2 mb-6'>
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <h2 className='font-bold text-xl text-white'>Applied Jobs</h2>
                    </div>
                    <AppliedJobTable />
                </div>
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile