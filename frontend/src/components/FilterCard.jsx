import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter } from 'lucide-react'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Job Type",
        array: ["Full Time", "Intern", "Contract", "Freelance"]
    },
    {
        fitlerType: "Experience Level",
        array: ["Entry Level", "Mid Level", "Senior", "Lead"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary Range",
        array: ["$0-$1k","$1K - $10K", "$10K - $25K", "$25K - $50K", "$50K+"]
    }
]

const FilterCard = () => {
    const[selectedValue, setSelectedValue]=useState('');
    const dispatch=useDispatch();
    
    const changeHandler=(value)=>{
        setSelectedValue(value);
    }
    
    useEffect(()=>{
        console.log(selectedValue);
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    
    return (
        <div className='w-full card-dark p-6 rounded-xl border border-gray-700/50'>
            <div className='flex items-center gap-2 mb-6'>
                <Filter className='h-5 w-5 text-gray-400' />
                <h1 className='font-bold text-xl text-white'>Filter Jobs</h1>
            </div>
            
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {fitlerData.map((data, index) => (
                    <div key={index} className='mb-6'>
                        <h2 className='font-semibold text-white text-lg mb-3'>{data.fitlerType}</h2>
                        <div className='space-y-2'>
                            {data.array.map((item, idx) => {
                                const itemId=`id${index}-${idx}`
                                return (
                                    <div key={idx} className='flex items-center space-x-3'>
                                        <RadioGroupItem 
                                            value={item} 
                                            id={itemId}
                            className="text-purple-500 border-gray-600 focus:ring-purple-500"
                                        />
                                        <Label 
                                            htmlFor={itemId}
                                            className="text-gray-300 hover:text-white cursor-pointer transition-colors"
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
            
            {/* Clear Filters Button */}
            <button 
                onClick={() => {
                    setSelectedValue('');
                    dispatch(setSearchedQuery(''));
                }}
                className="w-full mt-6 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors border border-gray-700"
            >
                Clear Filters
            </button>
        </div>
    )
}

export default FilterCard