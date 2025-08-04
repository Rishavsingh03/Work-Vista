import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Zap } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center py-16 px-4'>
            <div className='flex flex-col gap-8 max-w-4xl mx-auto'>
                {/* Premium Badge */}
                <div className='flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 w-fit'>
                    <Zap className='h-4 w-4 text-yellow-400' />
                    <span className='text-white font-medium text-sm'>Premium Job Platform #1</span>
                </div>
                
                {/* Main Heading */}
                <h1 className='text-6xl md:text-7xl font-bold text-white leading-tight'>
                    Discover Your <br />
                    <span className='gradient-text'>Next Career</span>
                </h1>
                
                {/* Description */}
                <p className='text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed'>
                    Join thousands of professionals who found their dream jobs through our premium platform. 
                    Connect with leading companies and unlock opportunities that match your expertise.
                </p>
                
                {/* Search Section */}
                <div className='flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full'>
                    <div className='flex-1 relative'>
                        <div className='flex items-center bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3'>
                            <Search className='h-5 w-5 text-gray-400 mr-3' />
                            <input
                                type="text"
                                placeholder="Search your dream position..."
                                onChange={(e) => setQuery(e.target.value)}
                                className='outline-none border-none bg-transparent text-white placeholder-gray-400 w-full'
                                onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                            />
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <Button 
                            onClick={() => navigate("/jobs")} 
                            variant="outline" 
                            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-xl px-6"
                        >
                            Browse Jobs
                        </Button>
                        <Button 
                            onClick={searchJobHandler} 
                            className="gradient-purple-blue hover:opacity-90 text-white rounded-xl px-6"
                        >
                            Find Opportunities
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection