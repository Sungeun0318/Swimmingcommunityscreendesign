import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Clock, Waves, Award, Bookmark, TrendingUp } from 'lucide-react';

interface WorkoutStep {
  step: number;
  type: string;
  stroke: string;
  distance: string;
  sets: number;
  cycle: string;
  intensity: string;
}

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
    level: string;
    club: string;
  };
  timeAgo: string;
  content: string;
  workout: {
    title: string;
    totalDistance: string;
    totalTime: string;
    difficulty: string;
    targetPace: string;
    steps: WorkoutStep[];
  };
  stats: {
    likes: number;
    comments: number;
    saves: number;
  };
  image?: string;
}

interface PostCardProps {
  post: Post;
  onUserClick?: (user: any) => void;
  onFollowClick?: (userId: number) => void;
  isFollowing?: boolean;
}

export function PostCard({ post, onUserClick, onFollowClick, isFollowing = false }: PostCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white dark:bg-card rounded-2xl shadow-sm overflow-hidden transition-colors duration-300">
      {/* User Info */}
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={() => onUserClick?.(post.user)}
          className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
        >
          <img 
            src={post.user.avatar} 
            alt={post.user.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-cyan-900 flex-shrink-0"
          />
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 dark:text-card-foreground truncate">{post.user.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 whitespace-nowrap ${
                post.user.level === 'Coach' || post.user.level === 'Head Coach' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {(post.user.level === 'Coach' || post.user.level === 'Head Coach') && (
                  <Award className="w-3 h-3" />
                )}
                {post.user.level}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 truncate">
              <span className="truncate">{post.user.club}</span>
              <span>•</span>
              <span>{post.timeAgo}</span>
            </div>
          </div>
        </button>
        
        {onFollowClick && (
          <button
            onClick={() => onFollowClick(post.user.id)}
            className={`px-4 py-1.5 text-sm rounded-full transition-colors ml-2 whitespace-nowrap ${
              isFollowing
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                : 'bg-blue-500 dark:bg-cyan-500 text-white hover:bg-blue-600 dark:hover:bg-cyan-600'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        )}
      </div>

      {/* Workout Title & Info */}
      <div className="px-4 pb-3">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-xl p-4 mb-3">
          <h3 className="text-lg mb-2">{post.workout.title}</h3>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>{post.workout.difficulty}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-800 dark:text-gray-300">{post.content}</p>
      </div>

      {/* Summary Stats */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-1">
              <Waves className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Total Distance</span>
            </div>
            <div className="text-blue-600 dark:text-cyan-400">{post.workout.totalDistance}</div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-100 dark:border-green-800">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-green-500 dark:text-green-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Total Time</span>
            </div>
            <div className="text-green-600 dark:text-green-400">{post.workout.totalTime}</div>
          </div>
        </div>
      </div>

      {/* Workout Program Table */}
      <div className="px-4 pb-3">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
          <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Waves className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
            Training Program
          </h4>
          
          {/* Excel-style Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-500 dark:bg-cyan-600 text-white">
                  <th className="px-2 py-2 text-center border-r border-blue-400 dark:border-cyan-500 w-8">#</th>
                  <th className="px-2 py-2 text-left border-r border-blue-400 dark:border-cyan-500 w-16">Type</th>
                  <th className="px-2 py-2 text-left border-r border-blue-400 dark:border-cyan-500">Stroke</th>
                  <th className="px-2 py-2 text-center border-r border-blue-400 dark:border-cyan-500 w-16">Dist</th>
                  <th className="px-2 py-2 text-center border-r border-blue-400 dark:border-cyan-500 w-12">x</th>
                  <th className="px-2 py-2 text-center w-16">Rest</th>
                </tr>
              </thead>
              <tbody>
                {post.workout.steps.map((step, index) => (
                  <tr 
                    key={step.step}
                    className={`${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                    } ${
                      step.type === 'Rest' ? 'bg-orange-50 dark:bg-orange-900/20' : ''
                    } hover:bg-blue-50 dark:hover:bg-cyan-900/20 transition-colors`}
                  >
                    <td className="px-2 py-2 text-center border-r border-gray-200 dark:border-gray-700">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 dark:bg-cyan-500 text-white rounded-full text-xs">
                        {step.step}
                      </span>
                    </td>
                    <td className="px-2 py-2 border-r border-gray-200 dark:border-gray-700">
                      <span className="inline-block px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded text-xs whitespace-nowrap">
                        {step.type}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-blue-600 dark:text-cyan-400 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                      {step.stroke}
                    </td>
                    <td className="px-2 py-2 text-center text-gray-800 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                      {step.distance}
                    </td>
                    <td className="px-2 py-2 text-center text-gray-800 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                      {step.sets > 1 ? step.sets : '-'}
                    </td>
                    <td className="px-2 py-2 text-center text-gray-600 dark:text-gray-400 text-xs whitespace-nowrap">
                      {step.cycle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Image if exists */}
      {post.image && (
        <img 
          src={post.image} 
          alt="Post"
          className="w-full h-64 object-cover"
        />
      )}

      {/* Actions */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2 group"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                liked ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-red-500'
              }`}
            />
            <span className={`text-sm ${liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}>
              {post.stats.likes + (liked ? 1 : 0)}
            </span>
          </button>
          
          <button className="flex items-center gap-2 group">
            <MessageCircle className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{post.stats.comments}</span>
          </button>
          
          <button className="flex items-center gap-2 group">
            <Bookmark className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-yellow-500 transition-colors" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{post.stats.saves}</span>
          </button>
        </div>

        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Share2 className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </button>
      </div>
    </div>
  );
}