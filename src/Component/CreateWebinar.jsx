import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useWebinar } from '../context/WebinarContext';
import Toast from './Toast';

const CreateWebinar = () => {
  const navigate = useNavigate();
  const { addWebinar } = useWebinar();
  const [isActive, setIsActive] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [transcriptFile, setTranscriptFile] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    enrollmentDate: '',
    price: ''
  });
  const videoInputRef = useRef(null);
  const transcriptInputRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('border-purple-400');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-purple-400');
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-purple-400');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0], type);
    }
  };

  const handleFileSelect = (file, type) => {
    if (type === 'video') {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (SVG, PNG, JPG or GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('File size should be less than 5MB');
        return;
      }
      setVideoFile(file);
    } else {
      const validTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid document (Doc or CSV)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('File size should be less than 5MB');
        return;
      }
      setTranscriptFile(file);
    }
  };

  const removeFile = (type) => {
    if (type === 'video') {
      setVideoFile(null);
    } else {
      setTranscriptFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.title.trim()) {
      showToast('Please enter a title', 'error');
      return;
    }
    if (!formData.shortDescription || !formData.shortDescription.trim()) {
      showToast('Please enter a short description', 'error');
      return;
    }
    if (!formData.enrollmentDate) {
      showToast('Please select an enrollment date', 'error');
      return;
    }
    if (!formData.price || isNaN(parseFloat(formData.price))) {
      showToast('Please enter a valid price', 'error');
      return;
    }
    if (!videoFile) {
      showToast('Please upload a video file', 'error');
      return;
    }

    try {
      const webinarData = {
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim(),
        description: formData.description.trim(),
        enrollmentDate: formData.enrollmentDate,
        price: parseFloat(formData.price),
        isActive: isActive,
        videoFile: videoFile,
        transcriptFile: transcriptFile
      };

      const newWebinar = addWebinar(webinarData);
      showToast('Webinar created successfully!');
      setTimeout(() => {
        navigate('/webinar-confirmation', { state: { webinar: newWebinar } });
      }, 1500);
    } catch (error) {
      if (error.message === 'A webinar with this title already exists') {
        showToast('A webinar with this title already exists', 'error');
      } else {
        showToast('Failed to create webinar', 'error');
        console.error('Error creating webinar:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      {/* Notification Banner */}
      <div className="bg-indigo-700 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span>✨ New webinar releasing on 23 Aug 2024</span>
            <button className="underline">Learn More</button>
          </div>
          <button className="text-lg">×</button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-6 h-6 bg-purple-600 rounded"></div>
            <span className="text-sm">Financewithsharan</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Navigation */}
        <div className="mb-4">
          <button 
            className="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" /> Create webinar
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex gap-4">
          {/* Left Column - Basic Information */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium">Basic information</h2>
                <button className="text-purple-600 text-sm hover:text-purple-700">Preview webinar</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">
                    Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Description<span className="text-red-500">*</span>
                    <span className="text-gray-400 text-xs ml-1">(Write a short introduction)</span>
                  </label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Enter"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">
                      Enrollment date<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="enrollmentDate"
                      value={formData.enrollmentDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      Pricing<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Uploads */}
          <div className="w-[400px]">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-sm font-medium mb-6">Uploads</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">
                    Video<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    ref={videoInputRef}
                    className="hidden"
                    accept=".svg,.png,.jpg,.gif"
                    onChange={(e) => handleFileSelect(e.target.files[0], 'video')}
                  />
                  <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-8 transition-colors duration-200 cursor-pointer"
                    onClick={() => videoInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'video')}
                  >
                    {!videoFile ? (
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-purple-600 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
                        <p className="text-xs text-gray-400">(max. 800x400px)</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <img src={URL.createObjectURL(videoFile)} alt="Preview" className="w-6 h-6 object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{videoFile.name}</p>
                            <p className="text-xs text-gray-400">{(videoFile.size / 1024).toFixed(1)}KB</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile('video');
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Transcript</label>
                  <input
                    type="file"
                    ref={transcriptInputRef}
                    className="hidden"
                    accept=".doc,.docx,.csv"
                    onChange={(e) => handleFileSelect(e.target.files[0], 'transcript')}
                  />
                  <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-8 transition-colors duration-200 cursor-pointer"
                    onClick={() => transcriptInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'transcript')}
                  >
                    {!transcriptFile ? (
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-purple-600 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">Doc or CSV</p>
                        <p className="text-xs text-gray-400">(max. 5MB)</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Upload className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{transcriptFile.name}</p>
                            <p className="text-xs text-gray-400">{(transcriptFile.size / 1024).toFixed(1)}KB</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile('transcript');
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative inline-block">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                      />
                      <div className={`w-8 h-4 rounded-full transition-colors ${
                        isActive ? 'bg-purple-600' : 'bg-gray-200'
                      }`}>
                        <div className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transition-transform ${
                          isActive ? 'left-[18px]' : 'left-0.5'
                        }`} />
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">Mark this webinar active</span>
                  </label>
                  <button 
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                  >
                    Upload webinar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWebinar; 