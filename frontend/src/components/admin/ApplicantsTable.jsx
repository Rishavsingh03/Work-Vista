import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setAllApplicants } from '@/redux/applicationSlice';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = ({ refreshData }) => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                // Update local state to reflect the change immediately
                const updatedApplicants = {
                    ...applicants,
                    applications: applicants.applications.map(app => 
                        app._id === id ? { ...app, status: status.toLowerCase() } : app
                    )
                };
                dispatch(setAllApplicants(updatedApplicants));
                
                // Refresh data from server to ensure consistency
                if (refreshData) {
                    setTimeout(() => {
                        refreshData();
                    }, 500);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }

    const getStatusText = (status) => {
        if (status === 'accepted') return 'Already Accepted';
        if (status === 'rejected') return 'Already Rejected';
        return 'Pending';
    }
    
    const getStatusClassName = (status) => {
        switch (status) {
            case 'accepted':
                return 'text-green-600 font-medium';
            case 'rejected':
                return 'text-red-600 font-medium';
            default:
                return 'text-yellow-600 font-medium';
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell>
                                    <span className={`capitalize ${getStatusClassName(item.status)}`}>
                                        {item.status}
                                    </span>
                                </TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    {item.status === 'pending' ? (
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {
                                                    shortlistingStatus.map((status, index) => (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    ))
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    ) : (
                                        <span className="text-gray-500 italic text-sm">
                                            {getStatusText(item.status)}
                                        </span>
                                    )}
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable