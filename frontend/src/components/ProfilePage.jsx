import React, { useState, useEffect } from 'react';
import data from '../../data/data.json'; 

const LOGGED_IN_USER_ID = 1; // Simulate logged-in user

// Simple class item component
const ClassItem = ({ name, role }) => (
  <div className="flex justify-between items-center p-2 border-b border-gray-300">
    <span>{name}</span>
    <span className="font-semibold text-gray-700">({role})</span>
  </div>
);

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  // Control active tab, initialized to 'created'
  const [activeTab, setActiveTab] = useState('created'); 

  useEffect(() => {
    // Logic to fetch user data and process classes
    const user = data.users.find(u => u.id === LOGGED_IN_USER_ID);
    if (!user) return;

    const createdClasses = user.created_classes.map(id => {
      const cls = data.classes.find(c => c.id === id);
      return { name: cls?.name || 'Unknown', role: 'Teacher' };
    });

    const joinedClasses = user.joined_classes.map(id => {
      const cls = data.classes.find(c => c.id === id);
      return { name: cls?.name || 'Unknown', role: 'Student' };
    });

    setProfile({
      name: user.name,
      email: user.email,
      createdClasses,
      joinedClasses,
    });

    // Default to 'joined' tab if user has no created classes but has joined classes
    if (createdClasses.length === 0 && joinedClasses.length > 0) {
      setActiveTab('joined');
    }
  }, []);

  /**
   * Corrected function to return consistent styling for both tabs.
   * The active tab receives the green background, and the inactive tab is plain text.
   */
  const getTabClasses = (tabName) => {
    const isActive = activeTab === tabName;

    // Styles for the active (selected) tab
    const activeStyles = 'px-4 py-2 text-sm font-medium bg-green-500 text-white rounded hover:bg-green-600 shadow-md';
    
    // Styles for the inactive (unselected) tab
    const inactiveStyles = 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800'; 

    return isActive ? activeStyles : inactiveStyles;
  };

  if (!profile) return <p className="p-8">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-white p-8">
      {/* User Info */}
      <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
      <p className="mb-4"><strong>Email:</strong> {profile.email}</p>

      {/* Tabs */}
      <div className="mb-4 flex space-x-2 items-end">
        <button onClick={() => setActiveTab('created')} className={getTabClasses('created')}>
          Your Classes ({profile.createdClasses.length})
        </button>
        <button onClick={() => setActiveTab('joined')} className={getTabClasses('joined')}>
          Joined Classes ({profile.joinedClasses.length})
        </button>
      </div>

      {/* Content */}
      <div className="border border-gray-300 rounded p-4 bg-white shadow-sm">
        {activeTab === 'created' && (
          <div className="mb-6">
            <p className="mb-2 font-semibold">Your Classes:</p>
            <div className="border rounded">
              {profile.createdClasses.length > 0
                ? profile.createdClasses.map((cls, idx) => <ClassItem key={idx} {...cls} />)
                : <p className="p-2 text-gray-500">You haven't created any classes yet.</p>
              }
            </div>
          </div>
        )}

        {activeTab === 'joined' && (
          <div className="mb-6">
            <p className="mb-2 font-semibold">Joined Classes:</p>
            <div className="border rounded">
              {profile.joinedClasses.length > 0
                ? profile.joinedClasses.map((cls, idx) => <ClassItem key={idx} {...cls} />)
                : <p className="p-2 text-gray-500">You haven't joined any classes yet.</p>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;