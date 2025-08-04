import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const LatestJobs = () => {
  const {allJobs} = useSelector(store => store.job);
  const navigate = useNavigate();
  
  return (
    <div className='max-w-7xl mx-auto px-4 py-16'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
          Latest & <span className='gradient-text'>Top Jobs</span>
        </h1>
        <p className='text-gray-300 text-lg max-w-2xl mx-auto'>
          Discover hand-picked opportunities from leading companies worldwide. 
          Each position is verified and comes with exclusive benefits.
        </p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12'>
        {allJobs.length <= 0 ? (
          <div className='col-span-full text-center py-12'>
            <p className='text-gray-400 text-lg'>No jobs available at the moment</p>
            <p className='text-gray-500 text-sm mt-2'>Check back later for new opportunities</p>
          </div>
        ) : (
          allJobs?.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
      
      {/* Call to Action */}
      <div className='text-center'>
        <div className='card-dark p-8 rounded-xl max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            Ready to find your dream job?
          </h2>
          <p className='text-gray-300 text-lg mb-6'>
            Join thousands of professionals who transformed their careers with WorkVista
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button 
              onClick={() => navigate("/jobs")}
              variant="outline" 
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-xl px-6"
            >
              Browse All Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => navigate("/admin/jobs/create")}
              className="gradient-purple-blue hover:opacity-90 text-white rounded-xl px-6"
            >
              Post Your Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestJobs