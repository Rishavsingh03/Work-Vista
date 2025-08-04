import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { MapPin, Clock, Star, Bookmark } from 'lucide-react';

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    
    const handleJobClick = () => {
        if (user) {
            navigate(`/description/${job._id}`);
        } else {
            toast.error("Please login to view job details");
            navigate('/login');
        }
    };

    // Generate company initials for gradient logo
    const getCompanyInitials = (companyName) => {
        if (!companyName) return "CO";
        return companyName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    };
    
    return (
        <div 
            onClick={handleJobClick} 
            className='p-6 rounded-xl card-dark hover:glow-purple transition-all duration-300 border border-gray-700/50 cursor-pointer'
        >
            {/* Header with bookmark */}
            <div className='flex justify-end mb-4'>
                <Button 
                    variant="ghost" 
                    className="text-gray-400 hover:text-white p-2 rounded-lg"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Handle bookmark functionality
                    }}
                >
                    <Bookmark className="h-4 w-4" />
                </Button>
            </div>

            {/* Company Info */}
            <div className='flex items-center gap-3 mb-4'>
                <div className="w-12 h-12 rounded-lg gradient-purple-blue flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                        {getCompanyInitials(job?.company?.name)}
                    </span>
                </div>
                <div>
                    <h2 className='font-semibold text-white text-lg'>{job?.title}</h2>
                    <div className='flex items-center gap-2'>
                        <span className='text-gray-400 text-sm'>{job?.company?.name}</span>
                        <div className='flex items-center gap-1'>
                            <Star className='h-3 w-3 text-yellow-400 fill-current' />
                            <span className='text-gray-400 text-xs'>4.8</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Description */}
            <p className='text-gray-300 text-sm mb-4 line-clamp-2'>
                {job?.description}
            </p>

            {/* Skills/Tags */}
            <div className='flex flex-wrap gap-2 mb-4'>
                {job?.skills?.slice(0, 3).map((skill, index) => (
                    <Badge 
                        key={index} 
                        className="bg-gray-800 text-gray-300 border border-gray-700 rounded-lg px-2 py-1 text-xs"
                    >
                        {skill}
                    </Badge>
                ))}
                {job?.skills?.length > 3 && (
                    <Badge className="bg-gray-800 text-gray-300 border border-gray-700 rounded-lg px-2 py-1 text-xs">
                        +{job.skills.length - 3} more
                    </Badge>
                )}
            </div>

            {/* Job Details */}
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1 text-gray-400 text-sm'>
                        <MapPin className='h-3 w-3' />
                        <span>{job?.location || "Remote"}</span>
                    </div>
                    <div className='flex items-center gap-1 text-gray-400 text-sm'>
                        <Clock className='h-3 w-3' />
                        <span>{job?.jobType || "Full Time"}</span>
                    </div>
                </div>
                <div className='text-right'>
                    <p className='text-pink-400 font-semibold text-sm'>
                        ${job?.salary || "100K"} - ${job?.salary ? job.salary + 20 : "130K"}
                    </p>
                </div>
            </div>

            {/* Open Positions */}
            <div className='flex items-center justify-between'>
                <span className='text-gray-400 text-sm'>
                    {job?.position || 1} Open Position{job?.position > 1 ? 's' : ''}
                </span>
            </div>
        </div>
    )
}

export default LatestJobCards