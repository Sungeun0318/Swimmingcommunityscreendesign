import React, { useState, useEffect, useRef } from 'react';
import { PostCard } from './PostCard';
import { TrendingUp, Flame, ChevronDown, Check, ChevronLeft, ChevronRight, X, ExternalLink, Crown, Search, UserPlus } from 'lucide-react';
import { UserSearch } from './UserSearch';
import { UserProfile } from './UserProfile';

interface CommunityFeedProps {
  onCreatePost: () => void;
  myUserId?: number;
  myPosts?: any[];
  followingList?: number[];
  onFollowToggle?: (userId: number) => void;
}

export function CommunityFeed({ 
  onCreatePost, 
  myUserId = 999,
  myPosts: externalMyPosts,
  followingList: externalFollowingList,
  onFollowToggle: externalFollowToggle
}: CommunityFeedProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showTopAd, setShowTopAd] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeView, setActiveView] = useState<'all' | 'my'>('all');
  const [internalFollowingList, setInternalFollowingList] = useState<number[]>([1, 2]);
  const [internalMyPosts, setInternalMyPosts] = useState<any[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  const followingList = externalFollowingList !== undefined ? externalFollowingList : internalFollowingList;
  const myPosts = externalMyPosts !== undefined ? externalMyPosts : internalMyPosts;

  const handleFollowToggle = (userId: number) => {
    if (externalFollowToggle) {
      externalFollowToggle(userId);
    } else {
      setInternalFollowingList(prev => 
        prev.includes(userId) 
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    }
  };

  const filterOptions = [
    { id: 'All', label: 'All Posts', color: 'from-gray-500 to-gray-600' },
    { id: 'Following', label: 'Following', color: 'from-blue-500 to-cyan-500' },
    { id: 'Beginner', label: 'Beginner', color: 'from-green-500 to-emerald-500' },
    { id: 'Intermediate', label: 'Intermediate', color: 'from-yellow-500 to-orange-500' },
    { id: 'Advanced', label: 'Advanced', color: 'from-orange-500 to-red-500' },
    { id: 'Elite', label: 'Elite', color: 'from-red-500 to-rose-600' }
  ];

  const trendingPosts = [
    { id: 1, title: '🔥 Olympic Coach Freestyle Masterclass', likes: 1249, image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=200&fit=crop' },
    { id: 2, title: '💪 Master Breaststroke in 7 Days', likes: 892, image: 'https://images.unsplash.com/photo-1530115638250-8f7f42475f5e?w=400&h=200&fit=crop' },
    { id: 3, title: '⚡ World Champion Backstroke Turn Secrets', likes: 756, image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&h=200&fit=crop' },
    { id: 4, title: '🏊 IM Training for Competition Swimmers', likes: 645, image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=200&fit=crop' },
    { id: 5, title: '🌊 Open Water Swimming Tips & Techniques', likes: 589, image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=200&fit=crop' }
  ];

  const mockPosts = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Sarah Kim',
        avatar: 'https://images.unsplash.com/photo-1598821835763-4d757e7224e6?w=100&h=100&fit=crop',
        level: 'Coach',
        club: 'Seoul Swim Club'
      },
      timeAgo: '2h ago',
      content: 'Freestyle endurance program for intermediate swimmers. Best to do 3+ times per week.',
      workout: {
        title: 'Freestyle Endurance Builder (Level 2)',
        totalDistance: '1500m',
        totalTime: '28:30',
        difficulty: 'Intermediate',
        targetPace: '1:54/100m',
        steps: [
          { step: 1, type: 'Warm-up', stroke: 'Free', distance: '200m', sets: 1, cycle: '3:00', intensity: '60%' },
          { step: 2, type: 'Main Set', stroke: 'Free', distance: '100m', sets: 10, cycle: '1:30', intensity: '80%' },
          { step: 3, type: 'Cool Down', stroke: 'Free', distance: '300m', sets: 1, cycle: 'Easy', intensity: '50%' }
        ]
      },
      stats: {
        likes: 124,
        comments: 28,
        saves: 45
      },
      image: 'https://images.unsplash.com/photo-1530115638250-8f7f42475f5e?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'James Park',
        avatar: 'https://images.unsplash.com/photo-1646870122020-402be5d8b74d?w=100&h=100&fit=crop',
        level: 'Head Coach',
        club: 'National Training Center'
      },
      timeAgo: '5h ago',
      content: 'Butterfly technique drills. Focus on kick timing and undulation.',
      workout: {
        title: 'Butterfly Technique Drills',
        totalDistance: '800m',
        totalTime: '25:00',
        difficulty: 'Beginner',
        targetPace: '2:15/100m',
        steps: [
          { step: 1, type: 'Warm-up', stroke: 'Free', distance: '200m', sets: 1, cycle: '3:00', intensity: '60%' },
          { step: 2, type: 'Drill', stroke: 'Fly Kick', distance: '25m', sets: 8, cycle: '0:45', intensity: '70%' },
          { step: 3, type: 'Rest', stroke: '-', distance: '-', sets: 1, cycle: '2:00', intensity: '-' },
          { step: 4, type: 'Main Set', stroke: 'Fly', distance: '50m', sets: 4, cycle: '2:00', intensity: '75%' },
          { step: 5, type: 'Cool Down', stroke: 'Free', distance: '200m', sets: 1, cycle: 'Easy', intensity: '50%' }
        ]
      },
      stats: {
        likes: 218,
        comments: 56,
        saves: 89
      }
    },
    {
      id: 3,
      user: {
        id: 3,
        name: 'Mike Lee',
        avatar: 'https://images.unsplash.com/photo-1598821835763-4d757e7224e6?w=100&h=100&fit=crop',
        level: 'Athlete',
        club: 'Busan Swim Club'
      },
      timeAgo: '1d ago',
      content: 'Morning training routine. IM main set focused on balancing all strokes.',
      workout: {
        title: 'IM Comprehensive Training',
        totalDistance: '2500m',
        totalTime: '45:20',
        difficulty: 'Advanced',
        targetPace: '1:48/100m',
        steps: [
          { step: 1, type: 'Warm-up', stroke: 'Free', distance: '400m', sets: 1, cycle: '6:00', intensity: '60%' },
          { step: 2, type: 'Drill', stroke: 'Kick', distance: '50m', sets: 8, cycle: '1:00', intensity: '70%' },
          { step: 3, type: 'Main Set', stroke: 'IM', distance: '200m', sets: 5, cycle: '3:00', intensity: '85%' },
          { step: 4, type: 'Rest', stroke: '-', distance: '-', sets: 1, cycle: '3:00', intensity: '-' },
          { step: 5, type: 'Speed', stroke: 'Free', distance: '50m', sets: 10, cycle: '1:00', intensity: '90%' },
          { step: 6, type: 'Cool Down', stroke: 'Free', distance: '400m', sets: 1, cycle: 'Easy', intensity: '50%' }
        ]
      },
      stats: {
        likes: 156,
        comments: 34,
        saves: 67
      },
      image: 'https://images.unsplash.com/photo-1646870122020-402be5d8b74d?w=800&h=400&fit=crop'
    }
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => {
      if (prev.includes(filterId)) {
        const newFilters = prev.filter(f => f !== filterId);
        return newFilters.length === 0 ? ['All'] : newFilters;
      } else {
        return [...prev, filterId];
      }
    });
  };

  const filteredPosts = mockPosts.filter(post => {
    if (selectedFilters.includes('All')) return true;
    if (selectedFilters.includes('Following')) return followingList.includes(post.user.id);
    return selectedFilters.some(filter => post.workout.difficulty === filter);
  });

  // Display posts based on view
  const displayedPosts = activeView === 'my' ? myPosts : filteredPosts;

  // Auto-scroll carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % trendingPosts.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused, trendingPosts.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % trendingPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + trendingPosts.length) % trendingPosts.length);
  };

  return (
    <div className="px-4 space-y-3 pb-24">
      {/* View Tabs & Search Button */}
      <div className="sticky top-16 bg-background dark:bg-background z-10 pb-2 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-2">
          {/* All Posts / My Posts Tabs */}
          <div className="flex-1 flex gap-2 bg-white dark:bg-card rounded-xl p-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveView('all')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeView === 'all'
                  ? 'bg-blue-500 dark:bg-cyan-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setActiveView('my')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeView === 'my'
                  ? 'bg-blue-500 dark:bg-cyan-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              My Posts ({myPosts.length})
            </button>
          </div>

          {/* Search Button */}
          <button
            onClick={() => setShowSearch(true)}
            className="p-3 bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-cyan-400 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Filter Dropdown - Only show for "All Posts" view */}
        {activeView === 'all' && (
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white dark:bg-card border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-cyan-400 transition-colors"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {selectedFilters.length === 0 ? (
                  <span className="text-gray-500 dark:text-gray-400">Select filters</span>
                ) : (
                  selectedFilters.map(filter => {
                    const option = filterOptions.find(o => o.id === filter);
                    return (
                      <span
                        key={filter}
                        className={`px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r ${option?.color}`}
                      >
                        {option?.label}
                      </span>
                    );
                  })
                )}
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 space-y-1 max-h-80 overflow-y-auto">
                {filterOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleFilter(option.id)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${option.color}`} />
                      <span className="text-gray-900 dark:text-gray-100">{option.label}</span>
                    </div>
                    {selectedFilters.includes(option.id) && (
                      <Check className="w-5 h-5 text-blue-500 dark:text-cyan-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Trending Posts Carousel - Only show for "All Posts" view */}
      {activeView === 'all' && (
        <div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 transition-colors duration-300"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center gap-2 px-4 pt-3 pb-2">
            <Flame className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            <h3 className="text-gray-900 dark:text-gray-100">Trending Now</h3>
          </div>

          <div 
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {trendingPosts.map((post) => (
              <div key={post.id} className="w-full flex-shrink-0 px-4 pb-4">
                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all cursor-pointer">
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm mb-1">{post.title}</p>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <TrendingUp className="w-3 h-3" />
                      <span>{post.likes.toLocaleString()} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-1.5 pb-3">
            {trendingPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-6 bg-orange-500 dark:bg-orange-400' 
                    : 'w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-orange-300 dark:hover:bg-orange-500'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Premium Banner Ad (Below Trending) */}
      {!isPremium && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 dark:from-yellow-900/30 dark:via-amber-900/30 dark:to-orange-900/30 transition-colors duration-300">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100 mb-1">Upgrade to Premium</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Remove ads, unlock exclusive workouts, and get priority support
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all">
                    Try Free for 7 Days
                  </button>
                  <button className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-3">
        {displayedPosts.length === 0 ? (
          <div className="py-12 text-center">
            {activeView === 'my' ? (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-2">No posts yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Share your first workout with the community!
                  </p>
                  <button
                    onClick={onCreatePost}
                    className="px-6 py-3 bg-blue-500 dark:bg-cyan-500 text-white rounded-xl hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors"
                  >
                    Create Post
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 dark:text-gray-400">No posts found</p>
              </div>
            )}
          </div>
        ) : (
          displayedPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <PostCard
                post={post}
                onUserClick={(user) => {
                  // Create a more complete user object for the profile modal
                  const fullUser = {
                    id: post.user.id || post.id,
                    name: user.name,
                    avatar: user.avatar,
                    level: user.level,
                    club: user.club,
                    followers: Math.floor(Math.random() * 5000) + 100,
                    following: Math.floor(Math.random() * 500) + 50,
                    isFollowing: followingList.includes(post.user.id || post.id),
                    bio: `Passionate swimmer and coach dedicated to helping others achieve their swimming goals.`,
                    location: 'Seoul, South Korea',
                    joinedDate: 'Jan 2024',
                    totalWorkouts: Math.floor(Math.random() * 300) + 50,
                    totalDistance: `${Math.floor(Math.random() * 400) + 100}.${Math.floor(Math.random() * 9)} km`
                  };
                  setSelectedUser(fullUser);
                }}
                onFollowClick={handleFollowToggle}
                isFollowing={followingList.includes(post.user.id || post.id)}
              />
              
              {/* Native Ad every 2 posts */}
              {!isPremium && (index + 1) % 2 === 0 && index < displayedPosts.length - 1 && (
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-card border-2 border-dashed border-gray-300 dark:border-gray-700 transition-colors duration-300">
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                    Sponsored
                  </div>
                  <div className="p-4 pt-8">
                    <div className="flex gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=100&h=100&fit=crop"
                        alt="Ad"
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-gray-900 dark:text-gray-100 mb-1">
                          Professional Swim Gear - 30% Off
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Get the best swimming equipment for your training
                        </p>
                        <button className="flex items-center gap-1 text-sm text-blue-600 dark:text-cyan-500 hover:underline">
                          <span>Shop Now</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>

      {/* Modals */}
      {showSearch && (
        <UserSearch
          onClose={() => setShowSearch(false)}
          onUserSelect={(user) => {
            setSelectedUser(user);
            setShowSearch(false);
          }}
          followingList={followingList}
          onFollowToggle={handleFollowToggle}
        />
      )}

      {selectedUser && (
        <UserProfile
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onFollowToggle={handleFollowToggle}
          isFollowing={followingList.includes(selectedUser.id)}
          myPosts={mockPosts}
        />
      )}
    </div>
  );
}