<<<<<<< HEAD
 
import { EventFiltersProps } from '../assets/types';

const EventFilters: React.FC<EventFiltersProps> = ({ filters, onFilterChange, organizerView = false }) => {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'music', label: 'Music' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'art', label: 'Art & Culture' },
    { value: 'business', label: 'Business' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'general', label: 'General' },
    { value: 'other', label: 'Other' }
  ];

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: 'free', label: 'Free Events Only' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200-1000', label: '$200+' }
  ];

  const statusOptions = organizerView 
    ? [
        { value: '', label: 'All Status' },
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    : [
        { value: '', label: 'All Events' },
        { value: 'upcoming', label: 'Upcoming Events' }
      ];

  const handleFilterChange = (name: string, value: string) => {
    onFilterChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    onFilterChange({
      status: '',
      category: '',
      date: '',
      sort: 'date-asc',
      priceRange: '',
      location: '',
    });
  };

  const hasActiveFilters = filters.status || filters.category || filters.date || filters.priceRange || filters.location || filters.sort !== 'date-asc';

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium px-3 py-1 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
          />
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
          >
            <option value="date-asc">Date: Earliest First</option>
            <option value="date-desc">Date: Latest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          placeholder="Search by city, venue, or address..."
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
        />
      </div>

      {/* Active Filters Badges */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Category: {categories.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className="ml-1 hover:text-purple-900 focus:outline-none"
                >
                  ×
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: {statusOptions.find(s => s.value === filters.status)?.label}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-1 hover:text-blue-900 focus:outline-none"
                >
                  ×
                </button>
              </span>
            )}
            {filters.date && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Date: {new Date(filters.date).toLocaleDateString()}
                <button
                  onClick={() => handleFilterChange('date', '')}
                  className="ml-1 hover:text-green-900 focus:outline-none"
                >
                  ×
                </button>
              </span>
            )}
            {filters.priceRange && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-green-800">
                Price: {priceRanges.find(p => p.value === filters.priceRange)?.label}
                <button
                  onClick={() => handleFilterChange('priceRange', '')}
                  className="ml-1 hover:text-green-900 focus:outline-none"
                >
                  ×
                </button>
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Location: {filters.location}
                <button
                  onClick={() => handleFilterChange('location', '')}
                  className="ml-1 hover:text-red-900 focus:outline-none"
                >
                  ×
                </button>
              </span>
            )}
            {filters.sort !== 'date-asc' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Sort: {filters.sort.replace('-', ' ')}
                <button
                  onClick={() => handleFilterChange('sort', 'date-asc')}
                  className="ml-1 hover:text-gray-900 focus:outline-none"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
=======
// components/EventFilters.tsx
import { EventFiltersProps } from '../assets/types';
import  { useState } from 'react';
const EventFilters: React.FC<EventFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    priceRange: '',
    category: '',
    location: '',
    sort: 'date-asc'
  });

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Categories</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="tech">Technology</option>
        </select>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        />

        <select
        
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
          <option value="date-asc">Date: Earliest First</option>
          <option value="date-desc">Date: Latest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
    </div>
  );
};

export default EventFilters;