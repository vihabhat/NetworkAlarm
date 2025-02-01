import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MapPin, Check } from 'lucide-react';
import Navbar from './navbar';

// Sample colleges data
const collegesData = [
  {
    id: 1,
    name: "Sri Venkateshwara College of Engg",
    // logo: "/api/placeholder/100/100",
    location: "Vidyanagar, Bangalore",
    description: "A renowned institution for technology and innovation",
    totalStudents: 10000,
    totalClubs: 4,
    verified: true
  },
  {
    id: 2,
    name: "PES University",
    // logo: "/api/placeholder/100/100",
    location: "Electronic City, Bangalore",
    description: "Leading research university in the heart of Electronic city",
    totalStudents: 16937,
    totalClubs: 10,
    verified: true
  }
];

const CollegeCard = ({ college }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/home')}
      className="bg-slate-800 rounded-xl p-6 cursor-pointer hover:bg-slate-700 transition-all duration-200"
    >
      <div className="flex items-start gap-6">
        {/* <img
          src={college.logo}
        //   alt={`${college.name} logo`}
          className="w-24 h-24 rounded-lg object-cover"
        /> */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">{college.name}</h2>
            {college.verified && (
              <Check className="w-5 h-5 text-orange-500" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <p className="text-sm">{college.location}</p>
          </div>
          <p className="text-gray-400 mt-4">{college.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-400">Students</p>
                <p className="text-lg font-semibold text-white">
                  {college.totalStudents.toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Clubs</p>
              <p className="text-lg font-semibold text-white">
                {college.totalClubs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CollegesPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-slate-900">
      <Navbar />
      <main className="flex-1 p-6 mt-16"> {/* Added mt-16 for navbar spacing */}
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Select Your College</h1>
          <div className="space-y-6">
            {collegesData.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegesPage;