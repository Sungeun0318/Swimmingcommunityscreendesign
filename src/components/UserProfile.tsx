import React, { useState } from 'react';
import { X, UserPlus, UserCheck, MapPin, Calendar, Award, TrendingUp } from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar: string;
  level: string;
  club: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  bio?: string;
  location?: string;
  joinedDate?: string;
  totalWorkouts?: number;
  totalDistance?: string;
}

interface UserProfileProps {
  user: User;
  onClose: () => void;
  onFollowToggle: (userId: number) => void;
  isFollowing: boolean;
  myPosts: any[];
}

export function UserProfile({ user, onClose, onFollowToggle, isFollowing, myPosts }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'stats'>('posts');
  
  // Filter posts by user
  const userPosts = myPosts.filter(post => post.user.name === user.name);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="relative">
          {/* Cover Image - Reduced height */}
          <div className="h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-lg transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Profile Info */}
          <div className="px-4 pb-4">
            {/* Centered Profile Picture */}
            <div className="flex flex-col items-center -mt-16">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white dark:ring-card shadow-lg"
              />
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="text-xl text-gray-900 dark:text-gray-100">
                    {user.name}
                  </h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    user.level === 'Coach' || user.level === 'Head Coach'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {user.level}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-3">{user.club}</p>
                
                {user.bio && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 max-w-sm mx-auto">
                    {user.bio || '수영을 사랑하는 코치로 여러분의 수영 목표 달성을 돕습니다.'}
                  </p>
                )}

                {/* Followers/Following */}
                <div className="flex items-center justify-center gap-6 text-sm mb-4">
                  <button className="hover:underline">
                    <span className="text-gray-900 dark:text-gray-100">{user.followers.toLocaleString()}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">팔로워</span>
                  </button>
                  <button className="hover:underline">
                    <span className="text-gray-900 dark:text-gray-100">{user.following.toLocaleString()}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">팔로잉</span>
                  </button>
                </div>

                {/* Follow Button */}
                <button
                  onClick={() => onFollowToggle(user.id)}
                  className={`px-8 py-2 rounded-full text-sm transition-colors flex items-center gap-2 mx-auto ${
                    isFollowing
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      : 'bg-blue-500 dark:bg-cyan-500 text-white hover:bg-blue-600 dark:hover:bg-cyan-600'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      팔로잉
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      팔로우
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('posts')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'posts'
                  ? 'border-blue-500 dark:border-cyan-500 text-blue-500 dark:text-cyan-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              게시물 ({userPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'stats'
                  ? 'border-blue-500 dark:border-cyan-500 text-blue-500 dark:text-cyan-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              통계
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'posts' ? (
            <div className="space-y-3">
              {userPosts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">아직 게시물이 없습니다</p>
                </div>
              ) : (
                userPosts.map(post => (
                  <div key={post.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{post.timeAgo}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        post.workout.difficulty === 'Beginner' || post.workout.difficulty === '초급'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : post.workout.difficulty === 'Intermediate' || post.workout.difficulty === '중급'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {post.workout.difficulty}
                      </span>
                    </div>
                    <h4 className="text-gray-900 dark:text-gray-100 mb-1">{post.workout.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>❤️ {post.stats.likes}</span>
                      <span>💬 {post.stats.comments}</span>
                      <span>🔖 {post.stats.saves}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-blue-500 dark:text-cyan-400" />
                  <h4 className="text-gray-900 dark:text-gray-100">총 훈련 횟수</h4>
                </div>
                <p className="text-2xl text-blue-600 dark:text-cyan-400">{user.totalWorkouts || 243}회</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <h4 className="text-gray-900 dark:text-gray-100">총 거리</h4>
                </div>
                <p className="text-2xl text-green-600 dark:text-green-400">{user.totalDistance || '342.5 km'}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-100 dark:border-orange-800">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  <h4 className="text-gray-900 dark:text-gray-100">평균 페이스</h4>
                </div>
                <p className="text-2xl text-orange-600 dark:text-orange-400">1:52/100m</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}