import Link from "next/link";

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-[url('/bg.png')] bg-cover bg-center items-center justify-center p-12">
        <div className="max-w-md text-center">
          {/* Dashboard Illustration */}
          {/* <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-sm mx-auto">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔑</span>
                </div>
                <span className="font-semibold text-gray-800">Password Reset</span>
              </div>
              
              <div className="space-y-3">
                <div className="h-3 bg-orange-200 rounded-full w-full"></div>
                <div className="h-3 bg-orange-100 rounded-full w-3/4"></div>
                <div className="h-3 bg-orange-50 rounded-full w-1/2"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-orange-50 p-3 rounded-lg text-center">
                  <div className="text-orange-600 font-bold text-lg">📬</div>
                  <div className="text-xs text-gray-600">Email</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-lg">🔒</div>
                  <div className="text-xs text-gray-600">Secure</div>
                </div>
              </div>
            </div>
          </div> */}
          
          <h2 className="text-2xl font-bold text-white mb-4 bg-transparent backdrop-blur-xl">
            Forgot Your Password?
          </h2>
          <p className="text-white bg-transparent backdrop-blur-xl">
            No worries! Enter your email address and we&apos;ll send you a secure link to reset your password.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Client</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
              <p className="text-gray-600 text-sm">
                Enter Your Email Address and We&apos;ll Send<br />
                You a Link to Reset Your Password.
              </p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder=""
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium mt-6"
              >
                Send Reset Link
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/admin/auth/login" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
