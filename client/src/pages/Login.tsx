import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
<<<<<<< HEAD
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import EHlogo from "../assets/images/EHlogo.png";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: ""});
  const [rememberMe, setRememberMe] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const { login } = useAuth();
=======
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";
const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const { login, checkAuthStatus } = useAuth();
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      setErrors({ general: location.state.success });
    }
  }, [location]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
<<<<<<< HEAD
  e.preventDefault();
  if (!validateForm()) return;

  setIsLoading(true);
  setErrors({});

  try {
    // 🔑 pass rememberMe flag to context
    await login(formData.email, formData.password, rememberMe); 

    navigate("/"); // redirect after login
  } catch (error: unknown) {
    const errorResponse = error as {
      response?: { data?: { code?: string; msg?: string } };
    };
    const errorCode = errorResponse.response?.data?.code;
    const errorMessage =
      errorResponse.response?.data?.msg ||
      "Login failed. Please try again later.";

    if (errorCode === "EMAIL_NOT_VERIFIED") {
      navigate("/verify-email", { state: { email: formData.email } });
      return;
    }

    if (errorCode === "INVALID_CREDENTIALS") {
      setErrors({
        email: "Check your email",
        password: "Check your password",
        general: errorMessage
      });
    } else {
      setErrors({ general: errorMessage });
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center flex-col justify-center px-4 py-12 overflow-hidden">
      <img loading='lazy' src={EHlogo} alt="EHlogo" className="w-32 h-32 mb-4" />
=======
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
      await checkAuthStatus();
      navigate("/profile");
    } catch (error: any) {
      const errorCode = error.response?.data?.code;
      const errorMessage = error.response?.data?.msg || "Login failed. Please try again later.";

      if (errorCode === "EMAIL_NOT_VERIFIED") {
        navigate("/verify-email", { state: { email: formData.email } });
        return;
      }

      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 py-12">
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-blue-100 mt-1">Sign in to your account</p>
        </div>

        <div className="p-6 sm:p-8">
          {errors.general && (
<<<<<<< HEAD
            <div
              className={`mb-4 p-3 rounded-lg flex items-start gap-2 ${
                location.state?.success
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
=======
            <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 ${location.state?.success
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
              }`}>
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
              <FiAlertCircle className="flex-shrink-0 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
<<<<<<< HEAD
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
=======
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
<<<<<<< HEAD
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } text-sm shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
=======
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-200"
                    } text-sm shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
                    }`}
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <FiAlertCircle className="flex-shrink-0" /> {errors.email}
                </p>
              )}
            </div>

<<<<<<< HEAD
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
=======
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
<<<<<<< HEAD
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  onKeyUp={(e) => setCapsLockOn((e as any).getModifierState && (e as any).getModifierState('CapsLock'))}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } text-sm shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
=======
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-200"
                    } text-sm shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                    }`}
                />
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <FiAlertCircle className="flex-shrink-0" /> {errors.password}
                </p>
              )}
<<<<<<< HEAD
              {!errors.password && capsLockOn && (
                <p className="mt-2 text-sm text-amber-600 flex items-center gap-1">
                  <FiAlertCircle className="flex-shrink-0" /> Caps Lock is on
                </p>
              )}
            </div>

            {/* Remember Me */}
=======
            </div>

>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="remember-me"
<<<<<<< HEAD
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
=======
                  name="remember-me"
                  type="checkbox"
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

<<<<<<< HEAD
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password}
=======
            <button
              type="submit"
              disabled={isLoading}
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
              className="w-full py-3 px-6 flex justify-center items-center gap-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
<<<<<<< HEAD
                "Sign in"
=======
                'Sign in'
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
              )}
            </button>
          </form>

<<<<<<< HEAD
=======

>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
