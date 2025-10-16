/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/Authcontext';
import { fetchUserEvents, deleteEvent } from '../api/Event';
import { EventType, User } from '../assets/types';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { EditProfileForm } from '../components/EditProfileForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Skeleton from '../components/Skeleton';
import { 
  FiEdit, 
  FiLogOut, 
  FiCalendar, 
  FiSettings, 
  FiUser, 
  FiTrash2,
  FiEye,
  FiUsers,
  FiTrendingUp
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, logout, updateUser, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteAccountConfirmOpen, setDeleteAccountConfirmOpen] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0
  });

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchUserEvents();
      setEvents(data.map(event => ({
        ...event,
        date: event.date
      })));

      // Calculate stats
      const upcoming = data.filter(event => new Date(event.date) > new Date()).length;
      const totalAttendees = data.reduce((sum, event) => sum + (event.attendees?.length || 0), 0);
      
      setStats({
        totalEvents: data.length,
        upcomingEvents: upcoming,
        totalAttendees
      });
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
      setStats(prev => ({
        ...prev,
        totalEvents: prev.totalEvents - 1,
        upcomingEvents: prev.upcomingEvents - 1
      }));
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
      setEventToDelete(null);
    }
  };

  const handleProfileUpdate = async (updatedData: Partial<User>) => {
    try {
      await updateUser(updatedData);
      setIsEditing(false);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteAccountConfirmOpen(false);
    await deleteAccount();
  };

  const tabVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    active: { scale: 1.05 }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your events, account settings, and preferences in one place
          </p>
        </motion.div>

        {/* Stats Cards for Organizers */}
        {user?.role === 'organizer' && events.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <StatCard
              icon={<FiCalendar className="w-6 h-6" />}
              value={stats.totalEvents}
              label="Total Events"
              color="from-purple-500 to-purple-600"
            />
            <StatCard
              icon={<FiTrendingUp className="w-6 h-6" />}
              value={stats.upcomingEvents}
              label="Upcoming Events"
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              icon={<FiUsers className="w-6 h-6" />}
              value={stats.totalAttendees}
              label="Total Attendees"
              color="from-green-500 to-green-600"
            />
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-2 mb-8 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <motion.button
              variants={tabVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={activeTab === 'events' ? 'active' : 'initial'}
              onClick={() => setActiveTab('events')}
              className={`px-6 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-200 ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FiCalendar className="w-5 h-5" />
              My Events
              {user?.role === 'organizer' && events.length > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activeTab === 'events' ? 'bg-white text-purple-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  {events.length}
                </span>
              )}
            </motion.button>

            {user?.role === 'admin' && (
              <motion.button
                variants={tabVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={activeTab === 'admin' ? 'active' : 'initial'}
                onClick={() => setActiveTab('admin')}
                className={`px-6 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-200 ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <FiSettings className="w-5 h-5" />
                Admin Dashboard
              </motion.button>
            )}

            <motion.button
              variants={tabVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={activeTab === 'settings' ? 'active' : 'initial'}
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FiUser className="w-5 h-5" />
              Account Settings
            </motion.button>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            {error}
          </motion.div>
        )}

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'events' && (
              <EventsSection 
                user={user}
                events={events}
                loading={loading}
                onNavigate={navigate}
                onDeleteClick={handleDeleteClick}
              />
            )}

            {activeTab === 'admin' && user?.role === 'admin' && (
              <AdminSection user={user} />
            )}

            {activeTab === 'settings' && user && (
              <SettingsSection
                user={user}
                isEditing={isEditing}
                onEditToggle={setIsEditing}
                onProfileUpdate={handleProfileUpdate}
                onLogout={logout}
                onDeleteAccount={() => setDeleteAccountConfirmOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Confirmation Dialogs */}
        <ConfirmationDialog
          isOpen={deleteConfirmOpen}
          title="Delete Event"
          message="Are you sure you want to delete this event? This action cannot be undone and all attendee registrations will be lost."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirmOpen(false)}
          isProcessing={isDeleting}
        />
        <ConfirmationDialog
          isOpen={deleteAccountConfirmOpen}
          title="Delete Account"
          message="Are you absolutely sure? This will permanently delete your account and all associated data. This action cannot be undone."
          onConfirm={handleDeleteAccount}
          onCancel={() => setDeleteAccountConfirmOpen(false)}
          isProcessing={false}
        />
      </div>
    </motion.div>
  );
};

// New Stat Card Component
const StatCard = ({ icon, value, label, color }: { 
  icon: React.ReactNode; 
  value: number; 
  label: string; 
  color: string; 
}) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
  >
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white mb-4`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    <p className="text-gray-600 text-sm font-medium">{label}</p>
  </motion.div>
);

// Enhanced Events Section
const EventsSection = ({ user, events, loading, onNavigate, onDeleteClick }: any) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
      {user?.role === 'organizer' && events.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('/organizer/dashboard')}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Create New Event
        </motion.button>
      )}
    </div>

    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        [...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-2xl" />
        ))
      ) : events.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="max-w-md mx-auto">
            <div className="mx-auto h-20 w-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
              <FiCalendar className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-600 mb-6">
              {user?.role === 'organizer'
                ? "Start creating amazing events for your audience"
                : "Upgrade to organizer to create and manage events"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user?.role === 'organizer' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => onNavigate('/organizer/dashboard')}
                >
                  Create Your First Event
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => onNavigate('/register-organization')}
                >
                  Become an Organizer
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                onClick={() => onNavigate('/events')}
              >
                Browse Events
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        events.map((event: EventType) => (
          <motion.div 
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              y: -8,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <EventCard
              event={event}
              variant="organizer"
              onDelete={onDeleteClick}
              actions={[
                {
                  icon: <FiEye className="w-4 h-4" />,
                  label: 'View',
                  onClick: () => onNavigate(`/events/${event._id}`),
                  variant: 'outline'
                },
                {
                  icon: <FiEdit className="w-4 h-4" />,
                  label: 'Edit',
                  onClick: () => onNavigate(`/organizer/events/${event._id}/edit`),
                  variant: 'outline'
                },
                {
                  icon: <FiTrash2 className="w-4 h-4" />,
                  label: 'Delete',
                  onClick: () => onDeleteClick(event._id!),
                  variant: 'danger'
                }
              ]}
            />
          </motion.div>
        ))
      )}
    </div>
  </div>
);

// Enhanced Settings Section
const SettingsSection = ({ user, isEditing, onEditToggle, onProfileUpdate, onLogout, onDeleteAccount }: any) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    {isEditing ? (
      <EditProfileForm
        user={user}
        onSave={onProfileUpdate}
        onCancel={() => onEditToggle(false)}
        onDeleteAccount={onDeleteAccount}
      />
    ) : (
      <AccountSettingsView 
        user={user} 
        onEdit={() => onEditToggle(true)} 
        logout={onLogout} 
      />
    )}
  </div>
);

// Enhanced Account Settings View
const AccountSettingsView = ({ user, onEdit, logout }: { user: User, onEdit: () => void, logout: () => void }) => (
  <>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEdit}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <FiEdit className="w-5 h-5" />
        Edit Profile
      </motion.button>
    </div>

    <div className="grid gap-8 max-w-2xl">
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="space-y-4">
          <InfoField label="Full Name" value={user.name} />
          <InfoField label="Email Address" value={user.email} />
          <InfoField label="Account Type" value={user.role} badge />
        </div>
      </div>

      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:bg-red-700 transition-all duration-200"
        >
          <FiLogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </div>
    </div>
  </>
);

// New Info Field Component
const InfoField = ({ label, value, badge = false }: { label: string; value: string; badge?: boolean }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    {badge ? (
      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium capitalize">
        {value}
      </span>
    ) : (
      <span className="text-gray-900 font-medium">{value}</span>
    )}
  </div>
);

// Placeholder Admin Section
const AdminSection = ({ }: { user: User }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
    <div className="text-center py-12">
      <FiSettings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Admin Features Coming Soon</h3>
      <p className="text-gray-500">Advanced admin tools and analytics are under development.</p>
    </div>
  </div>
);

export default Profile;
