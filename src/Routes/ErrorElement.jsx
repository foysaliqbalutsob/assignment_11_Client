import React from 'react';
import { Link } from 'react-router';

const ErrorElement = () => {
    return (
        <div>
             <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="mt-4 text-lg">Something went wrong </p>

      <p className="mt-2 text-gray-600">
        
      </p>

      <Link to="/" className="mt-6 btn btn-primary">
        Go Back Home
      </Link>
    </div>
        </div>
    );
};

export default ErrorElement;