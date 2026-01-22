import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Star,
  User
} from 'lucide-react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [errors, setErrors] = useState({});

  const isLogin = activeTab === 'login';
  const isSignup = activeTab === 'signup';
  const isForgot = activeTab === 'forgot';

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email Validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (!isLogin && !isForgot && !formData.email.endsWith('.edu')) {
       // Optional: Enforce .edu only on signup if desired
       // newErrors.email = 'Please use your .edu school email';
    }

    // Password Validation
    if (!isForgot) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!isLogin && formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
    }

    if (isSignup) {
      // Full Name Validation
      if (!formData.fullname.trim()) {
        newErrors.fullname = 'Full Name is required';
      }

      // Confirm Password Validation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Terms Validation
      if (!formData.terms) {
        newErrors.terms = 'You must agree to the Terms and Conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted', formData);
      // if (onLogin) {
      //   onLogin(formData);
      // } else {
      //   alert(`${isLogin ? 'Login' : 'Signup'} Successful!`);
      // }
             onLogin(formData);
    } else {
      console.log('Validation Failed');
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    if (tab !== 'forgot') {
      setFormData({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      });
    }
  };

  return (
    <div className="login-container">
      {/* Left Panel - Branding & Testimonials */}
      <div className="login-left-panel">
        {/* Background Pattern */}
        <div className="login-bg-pattern"></div>

        {/* Logo */}
        <div className="brand-header">
          <div className="brand-icon-wrapper">
            <GraduationCap className="icon-white" size={24} color="white" />
          </div>
          <span className="brand-name">Campus Marketplace</span>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            The trusted platform <br /> 
            for student trading.
          </h1>
          <p className="hero-description">
            Join a verified community of students buying and selling textbooks, electronics, and furniture safely on campus.
          </p>

          {/* Social Proof */}
          <div className="social-proof">
            <div className="avatar-group">
              {[1, 2, 3].map((i) => (
                <div key={i} className="avatar-wrapper">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=c0aede`} 
                    alt="User" 
                    className="avatar-img"
                  />
                </div>
              ))}
            </div>
            <div className="rating-container">
              <div className="rating-stars">
                <span className="rating-text">4.9/5</span>
                <Star size={16} fill="currentColor" />
              </div>
              <p className="trust-text">Trusted by 10k+ students</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="panel-footer">
          <p>© 2023 Campus Marketplace Inc.</p>
          <div className="footer-links">
            <span>Secure SSL</span>
            <span>Verified .edu</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login/Signup Form */}
      <div className="login-right-panel">
        <div className="login-card">
          
          <div className="login-header">
            <h2 className="login-title">
              {isLogin ? 'Welcome Back' : isSignup ? 'Create Account' : 'Reset Password'}
            </h2>
            <p className="login-subtitle">
              {isLogin 
                ? 'Log in to access your secure campus account.' 
                : isSignup 
                  ? 'Join your university\'s exclusive marketplace.'
                  : 'Enter your email to receive a password reset link.'}
            </p>
          </div>

          {/* Tabs - Hidden for Forgot Password */}
          {!isForgot && (
            <div className="tabs-container">
              <button
                onClick={() => switchTab('login')}
                className={`tab-button ${isLogin ? 'active' : ''}`}
              >
                Log In
              </button>
              <button
                onClick={() => switchTab('signup')}
                className={`tab-button ${isSignup ? 'active' : ''}`}
              >
                Sign Up
              </button>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Full Name (Signup only) */}
            {!isLogin && (
              <div className="form-group">
                <label className="form-label" htmlFor="fullname">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    id="fullname"
                    placeholder="Alex Johnson"
                    className={`form-input ${errors.fullname ? 'error' : ''}`}
                    value={formData.fullname}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.fullname && <p className="error-message">{errors.fullname}</p>}
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                School Email
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="you@university.edu"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors.email ? (
                <p className="error-message">{errors.email}</p>
              ) : !isLogin ? (
                <p className="helper-text">Must be a valid .edu email address</p>
              ) : null}
            </div>

            {/* Password Field (Login/Signup only) */}
            {!isForgot && (
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder={isLogin ? "••••••••" : "Min. 8 characters"}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
            )}

            {/* Confirm Password (Signup only) */}
            {isSignup && (
              <div className="form-group">
                <label className="form-label" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Repeat password"
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Actions (Login: Remember/Forgot; Signup: Terms; Forgot: Back) */}
            <div className="form-actions">
              {isLogin ? (
                <>
                  <div className="checkbox-wrapper">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="form-checkbox"
                    />
                    <label htmlFor="remember-me" className="remember-text">
                      Stay logged in
                    </label>
                  </div>
                  <div className="forgot-wrapper" onClick={() => switchTab('forgot')}>
                    <p 
                    style={{color: 'blue'}}
                    >
                      Forgot password?
                    </p>
                  </div>
                </>
              ) : isSignup ? (
                <div className="checkbox-wrapper" style={{ alignItems: 'flex-start' }}>
                   <div style={{ paddingTop: '2px' }}>
                    <input
                      id="terms"
                      type="checkbox"
                      className="form-checkbox"
                      checked={formData.terms}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="terms" className="remember-text">
                      I agree to the <a href="#" className="link-text">Terms and Conditions</a> and <a href="#" className="link-text">Privacy Policy</a>
                    </label>
                    {errors.terms && <p className="error-message" style={{ marginTop: '0.25rem' }}>{errors.terms}</p>}
                  </div>
                </div>
              ) : (
                <div className="forgot-wrapper" style={{ width: '100%', textAlign: 'center' }}>
                  <button 
                    type="button" 
                    className="forgot-password"
                    onClick={() => switchTab('login')}
                  >
                    Return to Login
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
            >
              {isLogin ? 'Log In Securely' : isSignup ? 'Create Secure Account' : 'Reset My Password'}
              <ArrowRight size={16} />
            </button>

            {/* Security Badge */}
            <div className="security-badge">
              <ShieldCheck size={16} />
              {isLogin || isForgot ? 'Protected by Industry-Standard Encryption' : 'JWT-secured session management'}
            </div>
          </form>

          {/* Switch Mode Footer */}
          <div className="login-footer">
            <p className="signup-text">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => switchTab(isLogin ? 'signup' : 'login')} 
                className="signup-link-btn"
              >
                {isLogin ? 'Sign up with .edu' : 'Log In'}
              </button>
            </p>
            <div className="footer-links-row">
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Campus Safety</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
