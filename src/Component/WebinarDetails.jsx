import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, ArrowUp, ArrowDown, Star, Bookmark, BookmarkCheck } from "lucide-react";
import { Line } from "react-chartjs-2";
import { useWebinar } from "../context/WebinarContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const WebinarDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { webinars, toggleBookmark, isBookmarked } = useWebinar();
  const webinar = webinars.find(w => w.id === Number(id)) || {
    title: "Webinar not found",
    shortDescription: "This webinar might have been deleted or doesn't exist",
    price: 0,
    enrollmentDate: new Date().toISOString(),
    isActive: false,
    views: 0,
    revenue: 0,
    subscribers: 0,
    activeUsers: 0
  };

  const chartData = {
    labels: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
    datasets: [
      {
        fill: true,
        data: [40, 42, 55, 45, 48, 52, 90, 55, 48, 52, 48, 50, 48, 45, 45],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: 'rgb(99, 102, 241)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        borderColor: 'rgb(229, 231, 235)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: () => 'Views',
          label: (context) => `${context.parsed.y}k`,
        }
      }
    },
    scales: {
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawTicks: false,
        },
        border: {
          display: false
        },
        ticks: {
          padding: 8,
          stepSize: 20,
          callback: (value) => `${value}k`
        },
        min: 20,
        max: 100,
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false
        },
        ticks: {
          padding: 8,
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            className="w-8 h-8 bg-purple-600 rounded-lg cursor-pointer"
            onClick={() => navigate('/')}
          ></div>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate('/create-webinar')}
          >
            + Create webinar
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button 
              className="text-sm text-gray-600 mr-4 flex items-center"
              onClick={() => navigate('/')}
            >
              ← Back to listing
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => toggleBookmark(Number(id))}
            >
              {isBookmarked(Number(id)) ? (
                <BookmarkCheck className="w-6 h-6 text-purple-600" />
              ) : (
                <Bookmark className="w-6 h-6" />
              )}
            </button>
            <button 
              className="text-purple-600 border border-purple-600 px-4 py-2 rounded-lg"
              onClick={() => navigate('/create-webinar')}
            >
              Edit webinar
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-8">
            <div className="flex justify-between items-start gap-8 mb-12">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-2xl font-semibold">{webinar.title}</h1>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-500 ml-1">{webinar.ratings?.average || "4.8"}</span>
                  </div>
                  {webinar.isActive && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Active</span>
                  )}
                </div>
                <p className="text-gray-600 text-lg mb-4 max-w-3xl leading-relaxed">
                  {webinar.shortDescription}
                </p>
                <div className="flex items-center justify-between max-w-3xl">
                  <p className="text-sm text-gray-500">{webinar.subscribers || 0} people have enrolled till now</p>
                  <p className="text-purple-600 font-semibold">Price: $ {webinar.price}</p>
                </div>
              </div>
              <div className="w-72 h-48 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 absolute bottom-4">Sharon Hegde</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-semibold text-gray-900">Total views</h2>
                <button className="flex items-center text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg">
                  Views <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <button className="flex items-center text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg">
                  This Month <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="flex gap-6">
                <div className="flex-1 h-[300px] relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-100 px-3 py-1.5 rounded-full text-xs text-purple-600 font-medium">
                    {webinar.views}k
                  </div>
                  <Line data={chartData} options={chartOptions} />
                </div>
                <div className="w-64 space-y-6">
                  <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <h3 className="text-gray-500 font-medium mb-2">Total number of attendees</h3>
                    <p className="text-4xl font-bold text-purple-600">{webinar.subscribers}k</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <h3 className="text-gray-500 font-medium mb-2">Total revenue generated</h3>
                    <p className="text-4xl font-bold text-purple-600">${webinar.revenue}</p>
                    <p className="text-sm text-gray-400 mt-1">*Affiliate + Purchases</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-6">
              <div className="p-4 rounded-xl border border-gray-100 bg-white hover:border-purple-100 transition-colors">
                <h3 className="text-sm text-gray-500 mb-2">Webinar Revenue</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">${Math.floor(webinar.revenue * 0.7)}</span>
                  <span className="text-red-500 text-sm flex items-center bg-red-50 px-1.5 py-0.5 rounded">
                    <ArrowDown className="h-3 w-3 mr-0.5" /> 20%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{Math.floor(webinar.subscribers * 0.3)} Orders</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 bg-white hover:border-purple-100 transition-colors">
                <h3 className="text-sm text-gray-500 mb-2">Affiliate Revenue</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">${Math.floor(webinar.revenue * 0.3)}</span>
                  <span className="text-green-500 text-sm flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                    <ArrowUp className="h-3 w-3 mr-0.5" /> 3.2%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{webinar.views}k Visitors</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 bg-white hover:border-purple-100 transition-colors">
                <h3 className="text-sm text-gray-500 mb-2">Subscribers</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{webinar.subscribers}</span>
                  <span className="text-red-500 text-sm flex items-center bg-red-50 px-1.5 py-0.5 rounded">
                    <ArrowDown className="h-3 w-3 mr-0.5" /> 8.3%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">${(webinar.revenue / webinar.subscribers || 0).toFixed(2)} Average Order</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 bg-white hover:border-purple-100 transition-colors">
                <h3 className="text-sm text-gray-500 mb-2">Monthly active users</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{webinar.activeUsers}</span>
                  <span className="text-green-500 text-sm flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                    <ArrowUp className="h-3 w-3 mr-0.5" /> 10.0%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{new Date(webinar.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarDetails; 