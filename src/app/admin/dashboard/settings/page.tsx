

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your platform settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              General Settings
            </h3>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div>
              <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">
                Platform Name
              </label>
              <input
                type="text"
                name="site-name"
                id="site-name"
                defaultValue="My Learning Platform"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="site-description" className="block text-sm font-medium text-gray-700">
                Platform Description
              </label>
              <textarea
                id="site-description"
                name="site-description"
                rows={3}
                defaultValue="A comprehensive learning management system for all your educational needs."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                defaultValue="UTC"
              >
                <option>UTC</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
                <option>Asia/Tokyo</option>
                <option>Australia/Sydney</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                id="maintenance-mode"
                name="maintenance-mode"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="maintenance-mode" className="ml-2 block text-sm text-gray-900">
                Enable Maintenance Mode
              </label>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 text-right">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Email Settings
            </h3>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div>
              <label htmlFor="from-email" className="block text-sm font-medium text-gray-700">
                From Email
              </label>
              <input
                type="email"
                name="from-email"
                id="from-email"
                defaultValue="noreply@example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="smtp-host" className="block text-sm font-medium text-gray-700">
                SMTP Host
              </label>
              <input
                type="text"
                name="smtp-host"
                id="smtp-host"
                defaultValue="smtp.example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="smtp-port" className="block text-sm font-medium text-gray-700">
                  SMTP Port
                </label>
                <input
                  type="text"
                  name="smtp-port"
                  id="smtp-port"
                  defaultValue="587"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="smtp-encryption" className="block text-sm font-medium text-gray-700">
                  Encryption
                </label>
                <select
                  id="smtp-encryption"
                  name="smtp-encryption"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="tls"
                >
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="smtp-auth"
                name="smtp-auth"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <label htmlFor="smtp-auth" className="ml-2 block text-sm text-gray-900">
                SMTP Authentication
              </label>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 text-right">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Payment Settings
            </h3>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                Default Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                defaultValue="usd"
              >
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
                <option value="jpy">JPY (¥)</option>
              </select>
            </div>
            <div>
              <label htmlFor="payment-gateway" className="block text-sm font-medium text-gray-700">
                Payment Gateway
              </label>
              <select
                id="payment-gateway"
                name="payment-gateway"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                defaultValue="stripe"
              >
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
                <option value="razorpay">Razorpay</option>
              </select>
            </div>
            <div>
              <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
                API Key
              </label>
              <input
                type="password"
                name="api-key"
                id="api-key"
                defaultValue="sk_test_****************************************"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center">
              <input
                id="test-mode"
                name="test-mode"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <label htmlFor="test-mode" className="ml-2 block text-sm text-gray-900">
                Enable Test Mode
              </label>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 text-right">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Appearance
            </h3>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                defaultValue="light"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div>
              <label htmlFor="primary-color" className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="color"
                  name="primary-color"
                  id="primary-color"
                  defaultValue="#3b82f6"
                  className="h-8 w-8 rounded-md border-gray-300"
                />
                <input
                  type="text"
                  name="primary-color-hex"
                  defaultValue="#3b82f6"
                  className="ml-2 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div className="mt-1 flex items-center">
                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Logo</span>
                </div>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Change
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Favicon
              </label>
              <div className="mt-1 flex items-center">
                <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Icon</span>
                </div>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 text-right">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
