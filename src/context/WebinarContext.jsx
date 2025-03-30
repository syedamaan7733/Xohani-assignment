import React, { createContext, useContext, useState, useEffect } from 'react';

const WebinarContext = createContext();

export const useWebinar = () => {
  const context = useContext(WebinarContext);
  if (!context) {
    throw new Error('useWebinar must be used within a WebinarProvider');
  }
  return context;
};

export const WebinarProvider = ({ children }) => {
  const [webinars, setWebinars] = useState(() => {
    try {
      const savedWebinars = localStorage.getItem('webinars');
      return savedWebinars ? JSON.parse(savedWebinars) : [];
    } catch (error) {
      console.error('Error loading webinars from localStorage:', error);
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const savedBookmarks = localStorage.getItem('bookmarks');
      return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    } catch (error) {
      console.error('Error loading bookmarks from localStorage:', error);
      return [];
    }
  });

  // Single useEffect for localStorage updates
  useEffect(() => {
    try {
      localStorage.setItem('webinars', JSON.stringify(webinars));
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [webinars, bookmarks]);

  const addWebinar = (webinarData) => {
    try {
      // Check if webinar with same title already exists
      const isDuplicate = webinars.some(
        webinar => webinar.title.toLowerCase() === webinarData.title.toLowerCase()
      );

      if (isDuplicate) {
        throw new Error('A webinar with this title already exists');
      }

      const initialStats = {
        views: Math.floor(Math.random() * 1000),
        revenue: Math.floor(Math.random() * 10000),
        subscribers: Math.floor(Math.random() * 500),
        activeUsers: Math.floor(Math.random() * 1000),
        ratings: {
          average: (4 + Math.random()).toFixed(1),
          count: Math.floor(Math.random() * 100)
        }
      };

      const newWebinar = {
        ...webinarData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...initialStats,
        isBookmarked: false
      };

      setWebinars(prevWebinars => [...prevWebinars, newWebinar]);
      return newWebinar;
    } catch (error) {
      console.error('Error adding webinar:', error);
      throw error; // Throw the original error to handle duplicate case
    }
  };

  const toggleBookmark = (webinarId) => {
    try {
      setBookmarks(prev => 
        prev.includes(webinarId) 
          ? prev.filter(id => id !== webinarId)
          : [...prev, webinarId]
      );
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw new Error('Failed to toggle bookmark');
    }
  };

  const isBookmarked = (webinarId) => {
    return bookmarks.includes(webinarId);
  };

  const getBookmarkedWebinars = () => {
    return webinars.filter(webinar => bookmarks.includes(webinar.id));
  };

  const updateWebinar = (id, updatedData) => {
    try {
      setWebinars(prevWebinars =>
        prevWebinars.map(webinar =>
          webinar.id === id ? { ...webinar, ...updatedData } : webinar
        )
      );
    } catch (error) {
      console.error('Error updating webinar:', error);
      throw new Error('Failed to update webinar');
    }
  };

  const deleteWebinar = (id) => {
    try {
      setWebinars(prevWebinars => prevWebinars.filter(webinar => webinar.id !== id));
      setBookmarks(prev => prev.filter(bookmarkId => bookmarkId !== id));
    } catch (error) {
      console.error('Error deleting webinar:', error);
      throw new Error('Failed to delete webinar');
    }
  };

  const getWebinar = (id) => {
    try {
      return webinars.find(webinar => webinar.id === id);
    } catch (error) {
      console.error('Error getting webinar:', error);
      return null;
    }
  };

  const clearWebinars = () => {
    try {
      setWebinars([]);
      setBookmarks([]);
      localStorage.removeItem('webinars');
      localStorage.removeItem('bookmarks');
    } catch (error) {
      console.error('Error clearing webinars:', error);
      throw new Error('Failed to clear webinars');
    }
  };

  return (
    <WebinarContext.Provider value={{
      webinars,
      addWebinar,
      updateWebinar,
      deleteWebinar,
      getWebinar,
      toggleBookmark,
      isBookmarked,
      getBookmarkedWebinars,
      clearWebinars
    }}>
      {children}
    </WebinarContext.Provider>
  );
}; 