import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

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
    
    return (
        <div onClick={handleJobClick} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <div className='flex align-middle '>
                    <div className="w-10 h-10 -mx-px" variant="outline" size="icon">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </div>
                    <h1 className='font-medium text-lg justify-center mx-6'>{job?.company?.name}</h1>
                </div>
                <p className='text-sm text-gray-500 mx-16'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost"> {job?.position}Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost"> {job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards