import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useWebinar } from '../context/WebinarContext';

const WebinarConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addWebinar } = useWebinar();
  const [isAdded, setIsAdded] = useState(false);
  const webinarData = location.state?.webinarData;

  useEffect(() => {
    if (!webinarData) {
      navigate('/create-webinar');
      return;
    }

    if (!isAdded) {
      try {
        // Add the webinar to context/localStorage
        addWebinar(webinarData);
        setIsAdded(true);
      } catch (error) {
        console.error('Error adding webinar:', error);
        alert('There was an error saving your webinar. Please try again.');
        navigate('/create-webinar');
      }
    }
  }, [webinarData, addWebinar, navigate, isAdded]);

  const handleNavigate = (path) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation
      window.location.href = path;
    }
  };

  if (!webinarData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavigate('/')}
          >
            <div className="w-6 h-6 bg-purple-600 rounded"></div>
            <span className="text-sm">Financewithsharan</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <button 
            className="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900"
            onClick={() => handleNavigate('/')}
          >
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </button>
        </div>

        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Webinar uploaded successfully!</h1>
              <p className="text-gray-600">Your webinar has been uploaded and is now ready to be viewed.</p>
            </div>
          </div>

          {/* Webinar Details */}
          <div className="space-y-6">
            <div className="border-t border-b border-gray-100 py-4">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Webinar Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="text-sm font-medium">{webinarData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-sm font-medium">${webinarData.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrollment Date</p>
                  <p className="text-sm font-medium">{new Date(webinarData.enrollmentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${webinarData.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <p className="text-sm font-medium">{webinarData.isActive ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Files Uploaded</h3>
              <div className="space-y-2">
                {webinarData.videoFile && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span>Video: {webinarData.videoFile.name}</span>
                  </div>
                )}
                {webinarData.transcriptFile && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span>Transcript: {webinarData.transcriptFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="text-gray-600 hover:text-gray-900 text-sm"
                onClick={() => handleNavigate('/create-webinar')}
              >
                Upload another webinar
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                onClick={() => handleNavigate('/')}
              >
                Go to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarConfirmation; 