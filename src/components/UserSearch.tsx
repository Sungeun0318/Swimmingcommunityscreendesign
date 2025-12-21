import React, { useState } from 'react';
import { Search, X, UserPlus, UserCheck } from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar: string;
  level: string;
  club: string;
  followers: number;
  following: number;
  isFollowing: boolean;
}

interface UserSearchProps {
  onClose: () => void;
  onUserSelect: (user: User) => void;
  followingList: number[];
  onFollowToggle: (userId: number) => void;
}

export function UserSearch({ onClose, onUserSelect, followingList, onFollowToggle }: UserSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock users data
  const allUsers: User[] = [
    {
      id: 1,
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1598821835763-4d757e7224e6?w=100&h=100&fit=crop',
      level: 'Coach',
      club: 'Seoul Swim Club',
      followers: 2453,
      following: 342,
      isFollowing: followingList.includes(1)
    },
    {
      id: 2,
      name: 'James Park',
      avatar: 'https://images.unsplash.com/photo-1646870122020-402be5d8b74d?w=100&h=100&fit=crop',
      level: 'Head Coach',
      club: 'National Training Center',
      followers: 5821,
      following: 189,
      isFollowing: followingList.includes(2)
    },
    {
      id: 3,
      name: 'Mike Lee',
      avatar: 'https://images.unsplash.com/photo-1598821835763-4d757e7224e6?w=100&h=100&fit=crop',
      level: 'Athlete',
      club: 'Busan Swim Club',
      followers: 892,
      following: 521,
      isFollowing: followingList.includes(3)
    },
    {
      id: 4,
      name: 'Emma Johnson',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      level: 'Coach',
      club: 'Elite Swimmers Academy',
      followers: 3241,
      following: 276,
      isFollowing: followingList.includes(4)
    },
    {
      id: 5,
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=100&h=100&fit=crop',
      level: 'Athlete',
      club: 'Victory Swim Team',
      followers: 1567,
      following: 432,
      isFollowing: followingList.includes(5)
    },
    {
      id: 6,
      name: 'Lisa Martinez',
      avatar: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100&h=100&fit=crop',
      level: 'Head Coach',
      club: 'Olympic Training Center',
      followers: 8934,
      following: 123,
      isFollowing: followingList.includes(6)
    },
    {
      id: 7,
      name: 'Tom Anderson',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
      level: 'Athlete',
      club: 'Wave Makers Club',
      followers: 621,
      following: 389,
      isFollowing: followingList.includes(7)
    },
    {
      id: 8,
      name: 'Sophie Brown',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop',
      level: 'Coach',
      club: 'Dolphin Swim Academy',
      followers: 2789,
      following: 298,
      isFollowing: followingList.includes(8)
    }
  ];

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.club.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl text-gray-900 dark:text-gray-100">Search Users</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or club..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              autoFocus
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No users found</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUserSelect(user)}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-cyan-900 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-gray-900 dark:text-gray-100 truncate">
                            {user.name}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs whitespace-nowrap ${
                            user.level === 'Coach' || user.level === 'Head Coach'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {user.level}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user.club}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {user.followers.toLocaleString()} followers • {user.following.toLocaleString()} following
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => onFollowToggle(user.id)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        followingList.includes(user.id)
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          : 'bg-blue-500 dark:bg-cyan-500 text-white hover:bg-blue-600 dark:hover:bg-cyan-600'
                      }`}
                    >
                      {followingList.includes(user.id) ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Follow
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
