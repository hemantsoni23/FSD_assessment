import Reacta from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Application</h1>
        <p className="text-gray-600 mb-8">
          Please log in to access your dashboard or admin panel.
        </p>
        <Link to="/login">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
