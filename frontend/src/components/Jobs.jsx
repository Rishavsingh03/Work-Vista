import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location?.toLowerCase().includes(searchedQuery.toLowerCase())||
                    job.industry?.toLowerCase().includes(searchedQuery.toLowerCase())||
                    job.jobType?.toLowerCase().includes(searchedQuery.toLowerCase())||
                    job.experience?.toLowerCase().includes(searchedQuery.toLowerCase())||
                    (() => {
                        console.log("searchedQuery",job.salary);
                        const salaryQuery = searchedQuery.replace(/\$/g, '').replace(/K/g, '').replace(/\s/g, '');
                        if (salaryQuery.includes('-')) {
                            const [minStr, maxStr] = salaryQuery.split('-');
                            const min = parseInt(minStr, 10) * 1000;
                            const max = parseInt(maxStr, 10) * 1000;
                            if (!isNaN(min) && !isNaN(max)) {
                                return job.salary >= min && job.salary <= max;
                            }
                            return false;
                        } else if (salaryQuery.endsWith('+')) {
                            const min = parseInt(salaryQuery.replace('+', ''), 10) * 1000;
                            if (!isNaN(min)) {
                                return job.salary >= min;
                            }
                            return false;
                        } else {
                            const num = parseInt(salaryQuery, 10) * 1000;
                            if (!isNaN(num)) {
                                return job.salary === num;
                            }
                            return false;
                        }
                    })()
            })
            console.log("Filter",filteredJobs)
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);   

    return (
        <div className="min-h-screen bg-[#1A1A2E]">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Header Section */}
                <div className='mb-8'>
                    <h1 className='text-4xl md:text-5xl font-bold text-white mb-2'>
                        Latest & <span className='gradient-text'>Top Jobs</span>
                    </h1>
                    <p className='text-gray-300 text-lg max-w-2xl'>
                        Discover hand-picked opportunities from leading companies worldwide. 
                        Each position is verified and comes with exclusive benefits.
                    </p>
                </div>

                {/* Filter and Results Section */}
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Filter Sidebar */}
                    <div className='lg:w-80'>
                        <FilterCard />
                    </div>
                    
                    {/* Jobs Grid */}
                    {filterJobs.length <= 0 ? (
                        <div className='flex-1 flex items-center justify-center'>
                            <div className='text-center'>
                                <p className='text-gray-400 text-lg mb-2'>No jobs found</p>
                                <p className='text-gray-500 text-sm'>Try adjusting your search criteria</p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex-1'>
                            {/* Results Info */}
                            <div className='flex items-center justify-between mb-6'>
                                <div className='flex items-center gap-4'>
                                    <span className='text-gray-400 text-sm'>All Filters</span>
                                    <span className='text-white text-sm hover:text-gray-300 cursor-pointer'>Remote</span>
                                    <span className='text-white text-sm hover:text-gray-300 cursor-pointer'>Full-time</span>
                                    <span className='text-white text-sm hover:text-gray-300 cursor-pointer'>Featured</span>
                                </div>
                                <span className='text-gray-400 text-sm'>
                                    Showing {filterJobs.length} premium positions
                                </span>
                            </div>
                            
                            {/* Jobs Grid */}
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Jobs