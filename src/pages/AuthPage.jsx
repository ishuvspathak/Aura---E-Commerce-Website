import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiActivity } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const { login, signup, loginGoogle } = useAuth();
  const navigate = useNavigate();

  // Mode: 'login' or 'signup' or 'otp'
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [pendingSignupValues, setPendingSignupValues] = useState(null);
  const [otpCode, setOtpCode] = useState('');

  // Schemas
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required')
  });

  const SignupSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Must be at least 3 characters').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required')
  });

  const handleLoginSubmit = (values, { setSubmitting, setFieldError }) => {
    const res = login(values.email, values.password);
    setSubmitting(false);
    if (res.success) {
      toast.success(`Welcome back, ${res.user.username}!`, {
        icon: '👋',
        style: { borderRadius: '12px', background: '#111827', color: '#fff' }
      });
      navigate(-1); // Go back or home
    } else {
      setFieldError('email', res.message);
      toast.error(res.message);
    }
  };

  const handleSignupSubmit = (values) => {
    // Intercept with OTP verification UI
    setPendingSignupValues(values);
    setMode('otp');
    toast.success('Mock OTP code "1234" sent to your email!', { duration: 5000 });
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (otpCode !== '1234') {
      toast.error('Invalid verification code. Use code "1234".');
      return;
    }

    if (pendingSignupValues) {
      const { username, email, password } = pendingSignupValues;
      const res = signup(username, email, password);
      if (res.success) {
        toast.success(`Account registered successfully, welcome ${username}!`, { icon: '🎉' });
        navigate('/');
      } else {
        toast.error(res.message);
        setMode('signup');
      }
    }
  };

  const handleGoogleLogin = () => {
    const res = loginGoogle();
    if (res.success) {
      toast.success('Logged in with Google!', { icon: '🔑' });
      navigate('/');
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode selectors */}
      {mode !== 'otp' && (
        <div className="flex border-b border-gray-150 dark:border-gray-800">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all focus:outline-none ${
              mode === 'login' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-gray-400 hover:text-primary dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all focus:outline-none ${
              mode === 'signup' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-gray-400 hover:text-primary dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>
      )}

      {/* Login Screen */}
      {mode === 'login' && (
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    className={`w-full bg-gray-55 dark:bg-gray-850 text-xs rounded-xl pl-9 pr-4 py-3 focus:outline-none border ${errors.email && touched.email ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                </div>
                <ErrorMessage name="email" component="span" className="text-[10px] text-danger" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Password</label>
                  <button 
                    type="button"
                    onClick={() => toast('Password reset link sent (simulated).', { icon: '✉️' })}
                    className="text-[10px] text-accent font-semibold hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full bg-gray-55 dark:bg-gray-850 text-xs rounded-xl pl-9 pr-10 py-3 focus:outline-none border ${errors.password && touched.password ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="h-4.5 w-4.5" /> : <FiEye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="span" className="text-[10px] text-danger" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Sign In
              </button>

              {/* Google login mock */}
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-200 dark:border-gray-700 w-full" />
                <span className="absolute bg-white dark:bg-card-dark px-3 text-[10px] text-gray-450 uppercase font-bold tracking-wider">Or</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* Signup Screen */}
      {mode === 'signup' && (
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSignupSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Username / Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Field
                    name="username"
                    placeholder="e.g. Elena Rostova"
                    className={`w-full bg-gray-55 dark:bg-gray-850 text-xs rounded-xl pl-9 pr-4 py-3 focus:outline-none border ${errors.username && touched.username ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                </div>
                <ErrorMessage name="username" component="span" className="text-[10px] text-danger" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    className={`w-full bg-gray-55 dark:bg-gray-855 text-xs rounded-xl pl-9 pr-4 py-3 focus:outline-none border ${errors.email && touched.email ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                </div>
                <ErrorMessage name="email" component="span" className="text-[10px] text-danger" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 6 characters"
                    className={`w-full bg-gray-55 dark:bg-gray-855 text-xs rounded-xl pl-9 pr-10 py-3 focus:outline-none border ${errors.password && touched.password ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="h-4.5 w-4.5" /> : <FiEye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="span" className="text-[10px] text-danger" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Field
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    className={`w-full bg-gray-55 dark:bg-gray-855 text-xs rounded-xl pl-9 pr-10 py-3 focus:outline-none border ${errors.confirmPassword && touched.confirmPassword ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                </div>
                <ErrorMessage name="confirmPassword" component="span" className="text-[10px] text-danger" />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* OTP verification Screen overlay */}
      {mode === 'otp' && (
        <form onSubmit={handleOtpVerify} className="space-y-4">
          <div className="text-center space-y-2 mb-4">
            <h4 className="text-sm font-bold text-primary dark:text-white">Verify Your Account</h4>
            <p className="text-[11px] text-gray-400">
              An OTP passcode has been sent to your email. Enter code <span className="font-bold text-accent">1234</span> below to confirm registration.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase text-center block">Enter 4-Digit OTP Code</label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="e.g. 1234"
              className="w-full text-center tracking-widest font-black text-lg bg-gray-55 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 focus:outline-none focus:border-accent text-primary dark:text-white"
              maxLength={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-xs font-bold transition-colors"
          >
            Confirm & Log In
          </button>
          
          <button
            type="button"
            onClick={() => setMode('signup')}
            className="w-full text-center text-xs text-gray-400 hover:text-accent font-semibold"
          >
            ← Back to Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthPage;
