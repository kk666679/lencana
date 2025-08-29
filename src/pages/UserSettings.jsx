import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Lock, Bell, Palette, Shield, Link } from 'lucide-react';
import FileUpload from '../components/FileUpload';

export default function UserSettings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account Settings
    name: 'Ahmad Rahman',
    email: 'ahmad@example.com',
    avatar: '/default-avatar.png',
    
    // Privacy Settings
    profileVisibility: 'public',
    twoFactorEnabled: false,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    
    // Appearance Settings
    theme: 'light',
    language: 'en',
    
    // Connected Accounts
    googleConnected: false,
    facebookConnected: false
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'connections', label: 'Connections', icon: Link }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleAvatarUpload = (url) => {
    updateSetting('avatar', url);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // API call to save settings
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">{t('nav.settings')}</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <nav className="w-64 bg-white rounded-lg shadow p-4">
            <div className="space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Content */}
          <main className="flex-1 bg-white rounded-lg shadow">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={settings.avatar}
                      alt="Profile"
                      className="w-20 h-20 rounded-full bg-gray-200"
                    />
                    <div>
                      <h3 className="font-medium mb-2">Profile Picture</h3>
                      <FileUpload
                        onUpload={handleAvatarUpload}
                        accept="image/*"
                        folder="avatars"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={settings.name}
                        onChange={(e) => updateSetting('name', e.target.value)}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSetting('email', e.target.value)}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorEnabled}
                        onChange={(e) => updateSetting('twoFactorEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser notifications' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Get a weekly summary of your activity' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={(e) => updateSetting(item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['light', 'dark'].map(theme => (
                        <button
                          key={theme}
                          onClick={() => updateSetting('theme', theme)}
                          className={`p-4 border rounded-lg text-center capitalize ${
                            settings.theme === theme ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          {theme} Mode
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => updateSetting('language', e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="en">English</option>
                      <option value="ms">Bahasa Malaysia</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full p-3 border rounded-lg"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-3 border rounded-lg"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full p-3 border rounded-lg"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Connected Accounts */}
            {activeTab === 'connections' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Connected Accounts</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'googleConnected', label: 'Google', color: 'red' },
                    { key: 'facebookConnected', label: 'Facebook', color: 'blue' }
                  ].map(account => (
                    <div key={account.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-${account.color}-100 rounded-full flex items-center justify-center`}>
                          <span className={`text-${account.color}-600 font-semibold`}>
                            {account.label[0]}
                          </span>
                        </div>
                        <span className="font-medium">{account.label}</span>
                      </div>
                      <button
                        onClick={() => updateSetting(account.key, !settings[account.key])}
                        className={`px-4 py-2 rounded-lg ${
                          settings[account.key]
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {settings[account.key] ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="px-6 py-4 border-t bg-gray-50 rounded-b-lg">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t('settings.saveChanges')}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}