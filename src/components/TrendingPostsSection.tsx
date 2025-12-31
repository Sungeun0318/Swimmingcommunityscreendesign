import React, { useState } from 'react';
import { Flame, TrendingUp, Award, Heart, MessageCircle, Bookmark, Clock } from 'lucide-react';

interface TrendingPost {
  id: number;
  user: {
    id: number;
    name: string;
    avatar: string;
    level: string;
  };
  title: string;
  likes: number;
  comments: number;
  saves: number;
  score24h: number;
  uploadedAt: string;
  image?: string;
}

interface TrendingPostsSectionProps {
  onPostClick?: (postId: number) => void;
}

export function TrendingPostsSection({ onPostClick }: TrendingPostsSectionProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');

  // 24시간 인기 게시물 (오늘의 인기)
  const todayPosts: TrendingPost[] = [
    {
      id: 101,
      user: { id: 1, name: 'Sarah Kim', avatar: 'https://images.unsplash.com/photo-1598821835763-4d757e7224e6?w=100&h=100&fit=crop', level: 'Coach' },
      title: '🔥 올림픽 코치의 자유형 마스터클래스',
      likes: 234,
      comments: 45,
      saves: 89,
      score24h: 234 + (45 * 3) + (89 * 5), // 234 + 135 + 445 = 814
      uploadedAt: '2시간 전',
      image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=200&fit=crop'
    },
    {
      id: 102,
      user: { id: 2, name: 'James Park', avatar: 'https://images.unsplash.com/photo-1646870122020-402be5d8b74d?w=100&h=100&fit=crop', level: 'Head Coach' },
      title: '💪 평영 킥 완벽 마스터 가이드',
      likes: 189,
      comments: 38,
      saves: 72,
      score24h: 189 + (38 * 3) + (72 * 5), // 189 + 114 + 360 = 663
      uploadedAt: '5시간 전',
      image: 'https://images.unsplash.com/photo-1530115638250-8f7f42475f5e?w=400&h=200&fit=crop'
    },
    {
      id: 103,
      user: { id: 3, name: 'Mike Lee', avatar: 'https://images.unsplash.com/photo-1598821835763-4d757e7224e6?w=100&h=100&fit=crop', level: 'Athlete' },
      title: '⚡ 배영 턴 테크닉 완전 정복',
      likes: 156,
      comments: 29,
      saves: 64,
      score24h: 156 + (29 * 3) + (64 * 5), // 156 + 87 + 320 = 563
      uploadedAt: '8시간 전',
      image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&h=200&fit=crop'
    }
  ];

  // 이번 주 인기 게시물
  const weekPosts: TrendingPost[] = [
    {
      id: 201,
      user: { id: 4, name: 'Emily Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', level: 'Head Coach' },
      title: '🏊 혼영 완벽 가이드 - 4영법 마스터',
      likes: 456,
      comments: 87,
      saves: 142,
      score24h: 456 + (87 * 3) + (142 * 5), // 456 + 261 + 710 = 1427
      uploadedAt: '2일 전',
      image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=200&fit=crop'
    },
    {
      id: 202,
      user: { id: 1, name: 'Sarah Kim', avatar: 'https://images.unsplash.com/photo-1598821835763-4d757e7224e6?w=100&h=100&fit=crop', level: 'Coach' },
      title: '🌊 오픈워터 수영 완벽 준비 가이드',
      likes: 398,
      comments: 72,
      saves: 128,
      score24h: 398 + (72 * 3) + (128 * 5), // 398 + 216 + 640 = 1254
      uploadedAt: '3일 전',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=200&fit=crop'
    },
    {
      id: 203,
      user: { id: 5, name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', level: 'Athlete' },
      title: '💨 스프린트 스피드 향상 프로그램',
      likes: 287,
      comments: 54,
      saves: 95,
      score24h: 287 + (54 * 3) + (95 * 5), // 287 + 162 + 475 = 924
      uploadedAt: '4일 전',
      image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&h=200&fit=crop'
    }
  ];

  const currentPosts = activeTab === 'today' ? todayPosts : weekPosts;

  return (
    <div className="space-y-4">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500 dark:text-orange-400" />
          <h3 className="text-lg text-gray-900 dark:text-gray-100">인기 게시물</h3>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-1 bg-white dark:bg-card rounded-lg p-1 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'today'
                ? 'bg-orange-500 dark:bg-orange-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            오늘
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'week'
                ? 'bg-orange-500 dark:bg-orange-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            이번 주
          </button>
        </div>
      </div>

      {/* Trending Posts List */}
      <div className="space-y-3">
        {currentPosts.map((post, index) => (
          <button
            key={post.id}
            onClick={() => onPostClick?.(post.id)}
            className="w-full bg-white dark:bg-card rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-all hover:shadow-md group"
          >
            <div className="flex gap-3">
              {/* Rank Badge */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                index === 0 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                  : index === 1
                  ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white'
                  : index === 2
                  ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {index + 1}
              </div>

              {/* Post Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-2">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900 dark:text-gray-100 truncate">{post.user.name}</span>
                      {(post.user.level === 'Coach' || post.user.level === 'Head Coach') && (
                        <span className="px-1.5 py-0.5 rounded text-xs bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white flex items-center gap-1">
                          <Award className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.uploadedAt}
                    </p>
                  </div>
                </div>

                <h4 className="text-sm text-gray-900 dark:text-gray-100 mb-2 text-left line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {post.title}
                </h4>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
                    <span className="text-orange-600 dark:text-orange-400">{post.score24h.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{post.saves}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail */}
              {post.image && (
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Info Footer */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-3">
        <p className="text-xs text-orange-800 dark:text-orange-300">
          <Flame className="inline w-3.5 h-3.5 mr-1" />
          인기 점수 = 좋아요×1 + 댓글×3 + 저장×5 (업로드 후 24시간 내)
        </p>
      </div>
    </div>
  );
}
