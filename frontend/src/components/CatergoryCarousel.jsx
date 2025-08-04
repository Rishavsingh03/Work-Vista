import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "Product Manager"
]

const CatergoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Popular <span className="gradient-text">Categories</span>
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Explore jobs by category and find the perfect match for your skills
                </p>
            </div>
            
            <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button 
                                onClick={() => searchJobHandler(cat)}
                                variant="outline" 
                                className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:border-gray-600 rounded-xl py-6 text-sm font-medium transition-all duration-300"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
                <CarouselNext className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
            </Carousel>
        </div>
    )
}

export default CatergoryCarousel;