import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen w-screen bg-[#0D2030] flex items-center justify-center p-4">
      <div className="w-full min-w-screen sm:max-w-sm md:max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={2} />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Registration Successful!
        </h1>
        
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Thank you for registering with Network Alarm.
          <br />
          You will be redirected to the home page in a few seconds.
        </p>

        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-40 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out text-sm sm:text-base"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;