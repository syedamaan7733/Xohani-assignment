import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight, Bookmark, BookmarkCheck } from "lucide-react";
import { useWebinar } from "../context/WebinarContext";

const Home = () => {
  const navigate = useNavigate();
  const { webinars, toggleBookmark, isBookmarked, getBookmarkedWebinars } = useWebinar();
  const [activeTab, setActiveTab] = useState('home');

  const displayWebinars = activeTab === 'home' ? webinars : getBookmarkedWebinars();

  const handleBookmarkClick = (e, webinarId) => {
    e.stopPropagation(); // Prevent navigation when clicking bookmark
    toggleBookmark(webinarId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Banner */}
      <div className="bg-purple-600 text-white text-sm py-2 relative">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <p>✨ New webinar releasing on 23 April 2025. <span className="underline cursor-pointer">Learn More</span></p>
          <button className="text-white/80 hover:text-white">×</button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate('/create-webinar')}
          >
            + Create webinar
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button 
              className={`text-sm pb-4 px-2 ${
                activeTab === 'home'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('home')}
            >
              Home
            </button>
            <button 
              className={`text-sm pb-4 px-2 ${
                activeTab === 'bookmarks'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('bookmarks')}
            >
              My bookmarks
            </button>
          </div>
        </div>

        {/* Webinar List */}
        <div className="space-y-4">
          {displayWebinars.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === 'home' ? 'No webinars yet' : 'No bookmarked webinars'}
              </h2>
              <p className="text-gray-600 mb-6">
                {activeTab === 'home' 
                  ? 'Create your first webinar to get started'
                  : 'Bookmark webinars to find them quickly later'}
              </p>
              {activeTab === 'home' && (
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                  onClick={() => navigate('/create-webinar')}
                >
                  Create webinar
                </button>
              )}
              {activeTab === 'bookmarks' && (
                <button
                  className="text-purple-600 border border-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-50"
                  onClick={() => setActiveTab('home')}
                >
                  Browse webinars
                </button>
              )}
            </div>
          ) : (
            displayWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow relative"
                onClick={() => navigate(`/webinar/${webinar.id}`)}
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-lg font-semibold text-gray-900">{webinar.title}</h2>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">{webinar.ratings?.average || "4.5"}</span>
                      </div>
                      {webinar.isActive && (
                        <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">Active</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{webinar.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{webinar.subscribers} enrollments</span>
                        <span>•</span>
                        <span>${webinar.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 hover:bg-gray-50 rounded-full transition-colors"
                          onClick={(e) => handleBookmarkClick(e, webinar.id)}
                        >
                          {isBookmarked(webinar.id) ? (
                            <BookmarkCheck className="w-5 h-5 text-purple-600" />
                          ) : (
                            <Bookmark className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
