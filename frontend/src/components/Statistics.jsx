import React from 'react'
import { Briefcase, Users, Award } from 'lucide-react'

const Statistics = () => {
  const stats = [
    {
      icon: <Briefcase className="h-8 w-8 text-purple-500" />,
      number: "15,000+",
      label: "Premium Jobs",
      color: "text-purple-500"
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      number: "100K+",
      label: "Success Stories",
      color: "text-green-500"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      number: "98%",
      label: "Satisfaction Rate",
      color: "text-orange-500"
    }
  ]

  const trustedCompanies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix']

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
              {stat.icon}
            </div>
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.number}
            </div>
            <div className="text-gray-400 text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Trusted Companies Section */}
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-6">
          Trusted by professionals from:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {trustedCompanies.map((company, index) => (
            <div 
              key={index}
              className="px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white text-sm font-medium hover:border-gray-600 transition-colors cursor-pointer"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Statistics 