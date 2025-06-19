import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/Authcontext';
import { fetchUserEvents, deleteEvent } from '../api/Event';
import { EventType } from '../assets/types';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';

import { EditProfileForm } from '../components/EditProfileForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Skeleton from '../components/Skeleton';
import { FiEdit, FiLogOut, FiArrowRight, FiCalendar, FiSettings, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchUserEvents();
      setEvents(data.map(event => ({
        ...event,
        date: event.date
      })));
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'organizer') {
      loadEvents();
    } else {
      setLoading(false);
    }
  }, [user, loadEvents]);

  const handleApiError = (err: unknown) => {
    if (err instanceof Error) {
      if (err.message.includes('Unauthorized')) {
        logout();
        navigate('/login');
      }
      setError(err.message);
    } else {
      setError('An unexpected error occurred');
    }
  };

  const handleDeleteClick = async (eventId: string) => {
    setEventToDelete(eventId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    setIsDeleting(true);
    try {
      await deleteEvent(eventToDelete);
      setEvents(prev => prev.filter(event => event._id !== eventToDelete));
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
      setEventToDelete(null);
    }
  };

  const handleProfileUpdate = async (updatedData: any) => {
    try {
      await updateUser(updatedData);
      setIsEditing(false);
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="flex flex-col sm:flex-row gap-2 mb-8 border-b border-gray-200">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('events')}
          className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all transform ${activeTab === 'events'
            ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg scale-[1.02] shadow-purple-200'
            : 'text-gray-600 hover:bg-gray-50 hover:scale-[1.01]'
            }`}
        >
          <FiCalendar className="w-5 h-5" />
          My Events
        </motion.button>

        {user?.role === 'admin' && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all transform ${activeTab === 'admin'
              ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg scale-[1.02] shadow-purple-200'
              : 'text-gray-600 hover:bg-gray-50 hover:scale-[1.01]'
              }`}
          >
            <FiSettings className="w-5 h-5" />
            Admin Dashboard
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all transform ${activeTab === 'settings'
            ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg scale-[1.02] shadow-purple-200'
            : 'text-gray-600 hover:bg-gray-50 hover:scale-[1.01]'
            }`}
        >
          <FiUser className="w-5 h-5" />
          Account Settings
        </motion.button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        >
          {error}
        </motion.div>
      )}

      {activeTab === 'events' && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-xl" />
            ))
          ) : events.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <FiArrowRight className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No events yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {user?.role === 'organizer'
                    ? "Get started by creating your first event"
                    : "You need to be an organizer to create events"}
                </p>
                <div className="mt-6">
                  {user?.role === 'organizer' ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-sm"
                      onClick={() => navigate('/organizer/dashboard')}
                    >
                      Create New Event
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-sm"
                      onClick={() => navigate('/register-organization')}
                    >
                      Upgrade to Organizer
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            events.map((event) => (
              <motion.div 
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -10,
                  rotateZ: 1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <EventCard
                  event={event}
                  variant="organizer"
                  onDelete={handleDeleteClick}
                />
              </motion.div>
            ))
          )}
        </div>
      )}

      {activeTab === 'admin' && user?.role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all transform ${activeTab === 'admin'
              ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg scale-[1.02]'
              : 'text-gray-600 hover:bg-gray-50 hover:scale-[1.01]'
              }`}
          >
            <FiSettings className="w-5 h-5" />
            Admin Dashboard
          </button>
        )}
      
      {activeTab === 'settings' && user && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {isEditing ? (
            <EditProfileForm
              user={user}
              onSave={handleProfileUpdate}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <AccountSettingsView user={user} onEdit={() => setIsEditing(true)} logout={logout} />
          )}
        </motion.div>
      )}

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
        isProcessing={isDeleting}
      />
    </motion.div>
  );
};

const AccountSettingsView = ({ user, onEdit, logout }: { user: any, onEdit: () => void, logout: () => void }) => (
  <>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Account Settings</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEdit}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md hover:from-purple-700 hover:to-blue-600 shadow-md"
      >
        <FiEdit className="w-5 h-5" />
        Edit Profile
      </motion.button>
    </div>

    <div className="space-y-6 max-w-xl">
      <div className="form-group">
        <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
          {user.name}
        </div>
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
          {user.email}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => logout()}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md"
      >
        <FiLogOut className="w-5 h-5" />
        Logout
      </motion.button>
    </div>
  </>
);

export default Profile;