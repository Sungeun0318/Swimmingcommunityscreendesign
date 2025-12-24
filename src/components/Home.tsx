import React from 'react';
import { MapPin, Target, Plus, Calendar, Clock, Users } from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: string) => void;
  onCreatePost: () => void;
}

export function Home({ onNavigate, onCreatePost }: HomeProps) {
  const userStats = {
    streak: 7,
    followers: 234,
    following: 156
  };

  const upcomingWorkouts = [
    {
      id: 1,
      date: '12월 20일 (금)',
      time: '오전 7:00',
      title: '자유형 지구력 강화',
      difficulty: '중급',
      duration: '45분'
    },
    {
      id: 2,
      date: '12월 22일 (일)',
      time: '오후 2:00',
      title: '4영법 기술 훈련',
      difficulty: '상급',
      duration: '60분'
    }
  ];

  const nearbyPools = [
    {
      id: 1,
      name: '잠실 실내수영장',
      distance: '0.8km',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: '올림픽공원 수영장',
      distance: '1.2km',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1519315901367-641a0f260d37?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: '서울시립 송파수영장',
      distance: '2.1km',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="px-4 space-y-3 pb-24">
      {/* Profile Summary - Streak Only */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 text-white rounded-2xl p-5 shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-16 h-16 rounded-full border-4 border-white/30 object-cover"
            />
            <div>
              <h2 className="text-xl mb-1">김수영</h2>
              <div className="flex items-center gap-3 text-sm">
                <button 
                  onClick={() => onNavigate('profile')}
                  className="flex items-center gap-1 hover:opacity-80"
                >
                  <Users className="w-4 h-4" />
                  <span>{userStats.followers} 팔로워</span>
                </button>
                <span>·</span>
                <button 
                  onClick={() => onNavigate('profile')}
                  className="hover:opacity-80"
                >
                  {userStats.following} 팔로잉
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl mb-1">{userStats.streak}🔥</div>
            <div className="text-sm opacity-90">연속 출석</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onCreatePost}
          className="bg-white dark:bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-blue-300 dark:hover:border-cyan-400"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-500 rounded-xl flex items-center justify-center mb-2 mx-auto">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <div className="text-sm text-gray-900 dark:text-card-foreground">프로그램 작성</div>
        </button>

        <button 
          onClick={() => onNavigate('training')}
          className="bg-white dark:bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-blue-300 dark:hover:border-cyan-400"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-xl flex items-center justify-center mb-2 mx-auto">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="text-sm text-gray-900 dark:text-card-foreground">퀵스타트</div>
        </button>
      </div>

      {/* Upcoming Workouts */}
      <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-gray-900 dark:text-card-foreground">
            <Calendar className="w-5 h-5 text-blue-500 dark:text-cyan-400" />
            다가오는 훈련
          </h3>
          <button 
            onClick={() => onNavigate('scheduler')}
            className="text-sm text-blue-500 dark:text-cyan-400 hover:text-blue-600 dark:hover:text-cyan-300"
          >
            전체보기
          </button>
        </div>

        <div className="space-y-3">
          {upcomingWorkouts.map(workout => (
            <div 
              key={workout.id} 
              onClick={() => onNavigate('scheduler')}
              className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer hover:border-blue-300 dark:hover:border-cyan-400"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm text-gray-900 dark:text-card-foreground mb-1">{workout.title}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                      {workout.difficulty}
                    </span>
                    <span className="text-gray-500 dark:text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {workout.duration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{workout.date}</span>
                <span>·</span>
                <span>{workout.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Badge Only */}
      <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-gray-900 dark:text-card-foreground">
            🔥 연속 출석 배지
          </h3>
          <button 
            onClick={() => onNavigate('profile')}
            className="text-sm text-blue-500 dark:text-cyan-400 hover:text-blue-600 dark:hover:text-cyan-300"
          >
            더보기
          </button>
        </div>

        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl p-6 text-center border-2 border-orange-300 dark:border-orange-700 w-48">
            <div className="text-5xl mb-2">🔥</div>
            <div className="text-xl text-gray-900 dark:text-gray-100 mb-1">{userStats.streak}일 연속</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">매일 꾸준히 수영 중!</div>
          </div>
        </div>
      </div>

      {/* Nearby Swimming Pools */}
      <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-gray-900 dark:text-card-foreground">
            <MapPin className="w-5 h-5 text-green-500" />
            근처 수영장
          </h3>
          <button className="text-sm text-blue-500 dark:text-cyan-400 hover:text-blue-600 dark:hover:text-cyan-300">
            더보기
          </button>
        </div>

        <div className="space-y-3">
          {nearbyPools.map(pool => (
            <div key={pool.id} className="flex gap-3 border border-gray-100 dark:border-gray-700 rounded-xl p-3 hover:shadow-md transition-all cursor-pointer">
              <img 
                src={pool.image}
                alt={pool.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="text-sm text-gray-900 dark:text-card-foreground mb-1">{pool.name}</div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {pool.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    ⭐ {pool.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}