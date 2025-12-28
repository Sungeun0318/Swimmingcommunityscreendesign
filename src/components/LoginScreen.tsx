import React, { useState } from 'react';
import { Waves, Droplet, TrendingUp, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import logo from 'figma:asset/fe48e338294f1c5b5719c23795f4728078fb676c.png';
import brandImage from 'figma:asset/8dfb1fcc657ed6b91f860fad74c74ddf8dc27a3d.png';
import { SignupModal } from './SignupModal';
import { ForgotPasswordModal } from './ForgotPasswordModal';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email login:', { email, password });
    onLogin();
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
    onLogin();
  };

  const handleNaverLogin = () => {
    console.log('Naver login');
    onLogin();
  };

  const handleAppleLogin = () => {
    console.log('Apple login');
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wave patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating bubbles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        
        {/* Water droplets */}
        <Droplet className="absolute top-20 right-20 w-8 h-8 text-white/20 animate-bounce" style={{ animationDuration: '2s' }} />
        <Droplet className="absolute bottom-32 left-16 w-6 h-6 text-white/20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <Waves className="absolute top-1/2 right-12 w-10 h-10 text-white/20 animate-pulse" style={{ animationDuration: '3s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title Section */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          {/* Logo Container with Animation - NO WHITE BACKGROUND */}
          <div className="relative inline-block mb-6">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl animate-pulse" />
            
            {/* Logo - transparent background, no white card */}
            <div className="relative hover:scale-105 transition-transform duration-300">
              <img 
                src={logo} 
                alt="Swimming Starter" 
                className="w-40 h-40 object-contain drop-shadow-2xl"
              />
            </div>
            
            {/* Floating circles around logo */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Brand Image instead of text */}
          <div className="mb-3">
            <img 
              src={brandImage} 
              alt="Swimming Starter" 
              className="h-10 mx-auto object-contain drop-shadow-lg"
            />
          </div>
          <p className="text-white/90 text-lg mb-1">당신의 수영 커뮤니티</p>
          <p className="text-white/70 text-sm">훈련하고, 기록하고, 성장하세요</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '0.2s' }}>
          {/* Welcome Text */}
          <div className="text-center mb-6">
            <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">환영합니다!</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">로그인하고 수영 여정을 시작하세요</p>
          </div>

          {/* Email/Password Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="text-gray-600 dark:text-gray-400">로그인 유지</span>
              </label>
              <button type="button" className="text-blue-600 dark:text-cyan-400 hover:underline" onClick={() => setShowForgotPasswordModal(true)}>
                비밀번호 찾기
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              로그인
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              계정이 없으신가요?{' '}
              <button type="button" className="text-blue-600 dark:text-cyan-400 hover:underline" onClick={() => setShowSignupModal(true)}>
                회원가입
              </button>
            </p>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">또는 간편 로그인</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-300 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 dark:text-gray-200">구글로 계속하기</span>
            </button>

            {/* Naver Login */}
            <button
              onClick={handleNaverLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#03C75A] hover:bg-[#02b350] border-2 border-[#03C75A] rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
              </svg>
              <span className="text-white">네이버로 계속하기</span>
            </button>

            {/* Apple Login */}
            <button
              onClick={handleAppleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 border-2 border-black dark:border-white rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path className="text-white dark:text-black" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-white dark:text-black">Apple로 계속하기</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/80 text-xs animate-in fade-in duration-700" style={{ animationDelay: '0.4s' }}>
          <p>계속 진행하면 다음에 동의하는 것으로 간주됩니다</p>
          <p className="mt-1">
            <button className="underline hover:text-white">서비스 이용약관</button>
            {' '}및{' '}
            <button className="underline hover:text-white">개인정보처리방침</button>
          </p>
        </div>
      </div>

      {/* Modals */}
      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSignup={() => {
            setShowSignupModal(false);
            onLogin();
          }}
        />
      )}

      {showForgotPasswordModal && (
        <ForgotPasswordModal
          onClose={() => setShowForgotPasswordModal(false)}
        />
      )}
    </div>
  );
}