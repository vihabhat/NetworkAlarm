// src/components/SuccessPage.jsx
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
    <div className="min-h-screen bg-[#0D2030] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for registering with Network Alarm. You will be redirected to the home page in a few seconds.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#DE522B] hover:bg-[#0D1F2D] text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;