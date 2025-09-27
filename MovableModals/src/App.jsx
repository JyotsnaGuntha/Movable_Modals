import { useState } from 'react'
import MovableModal, { modalInstances } from './components/MovableModal' // Importing modalInstances array

function App() {
  const [modals, setModals] = useState({
    settings: false,
    userProfile: false,
    notifications: false,
    help: false
  });

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review project requirements', completed: false },
    { id: 2, title: 'Design movable modal component', completed: true },
    { id: 3, title: 'Implement drag functionality', completed: true },
    { id: 4, title: 'Add responsive design', completed: false },
    { id: 5, title: 'Write documentation', completed: false }
  ]);

  const [notifications] = useState([
    { id: 1, title: 'New message received', time: '2 minutes ago', type: 'message' },
    { id: 2, title: 'Task completed', time: '5 minutes ago', type: 'success' },
    { id: 3, title: 'System update available', time: '1 hour ago', type: 'info' },
    { id: 4, title: 'Meeting reminder', time: '2 hours ago', type: 'reminder' }
  ]);

  const openModal = (modalName) => {
    const instance = modalInstances.find(m => m.id === modalName);

    // If the instance exists, it means the modal is already open............
    if (instance) { // Bring to front if already open........
      instance.bringToFront();
    }
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  const openAllModals = () => {
    setModals({
      settings: true,
      userProfile: true,
      notifications: true,
      help: true
    });
  };

  const closeAllModals = () => {
    setModals({
      settings: false,
      userProfile: false,
      notifications: false,
      help: false
    });
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">DeepLure Research Task</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openModal('notifications')}
                className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12V2a1 1 0 00-1-1H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1z" />
                </svg>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <button
                onClick={() => openModal('userProfile')}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JD</span>
                </div>
                <span>John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Project Overview Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Tasks</span>
                <span className="font-semibold">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{tasks.filter(t => t.completed).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining</span>
                <span className="font-semibold text-orange-600">{tasks.filter(t => !t.completed).length}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => openModal('settings')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                ⚙️ Open Settings
              </button>
              <button
                onClick={() => openModal('help')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                ❓ Help & Support
              </button>
              <button
                onClick={() => openModal('notifications')}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                🔔 View Notifications
              </button>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Modal System</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Drag & Drop</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Enabled
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Touch Support</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Task Management</h3>
            <p className="text-gray-600 text-sm">Track your project progress while using movable modals</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </span>
                  {task.completed && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multiple Modal Test Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">🚀 Multiple Modal Testing</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={openAllModals}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              Open All Modals
            </button>
            <button
              onClick={closeAllModals}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Close All Modals
            </button>
            <div className="text-purple-800 text-sm flex items-center">
              Total Open: {Object.values(modals).filter(Boolean).length}
            </div>
          </div>
        </div>

        {/* Demo Instructions */}
        <div className="mt-6 bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-900 mb-3">🎯 Enhanced Multiple Modal Features</h3>
          <div className="text-indigo-800 space-y-2">
            <p>• <strong>No Interface Blocking:</strong> Background remains fully interactive - open multiple modals without interference</p>
            <p>• <strong>True Multiple Instances:</strong> Open Settings → Help → Profile → Notifications simultaneously</p>
            <p>• <strong>Smart Layer Management:</strong> Click any modal to bring it to front with visual focus indicators</p>
            <p>• <strong>Window-like Behavior:</strong> Modals act like independent floating windows</p>
            <p>• <strong>Closing Options:</strong> Use X button or ESC key to close modals (no outside-click-to-close)</p>
            <p>• <strong>Visual Focus:</strong> Active modal shows blue border, "Active" badge, and position number</p>
            <p>• <strong>Drag & Drop:</strong> Drag any modal header to reposition and auto-focus</p>
            <p>• <strong>Touch Support:</strong> Full mobile device compatibility with touch drag</p>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-md border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-2">💡 Quick Test Workflow:</h4>
            <ol className="text-sm text-indigo-800 space-y-1">
              <li>1. Click "⚙️ Open Settings" to open first modal</li>
              <li>2. Click "❓ Help & Support" to open second modal (Settings stays open!)</li>
              <li>3. Click "🔔 View Notifications" for third modal</li>
              <li>4. Use "Open All Modals" to test 4 simultaneous instances</li>
              <li>5. Drag modals around and click to change focus</li>
              <li>6. Use individual X buttons or "Close All" to clean up</li>
            </ol>
          </div>
        </div>
      </main>

      {/* Enhanced Movable Modals with Smart Positioning */}
      <MovableModal
        isOpen={modals.settings}
        onClose={() => closeModal('settings')}
        title="Settings"
        id="settings"
        initialPosition={{ x: 100, y: 80 }}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme Preference
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notifications
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-700">Push notifications</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => closeModal('settings')}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Save Changes
            </button>
          </div>
        </div>
      </MovableModal>

      <MovableModal
        isOpen={modals.userProfile}
        onClose={() => closeModal('userProfile')}
        title="User Profile"
        id="userProfile"
        initialPosition={{ x: 320, y: 120 }}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-semibold">JD</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                defaultValue="john.doe@deeplure.org"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input 
                type="text" 
                defaultValue="Senior Frontend Developer"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input 
                type="text" 
                defaultValue="Engineering"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => closeModal('userProfile')}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Update Profile
            </button>
          </div>
        </div>
      </MovableModal>

      <MovableModal
        isOpen={modals.notifications}
        onClose={() => closeModal('notifications')}
        title="Notifications"
        id="notifications"
        initialPosition={{ x: 180, y: 200 }}
      >
        <div className="space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'message' ? 'bg-blue-500' :
                notification.type === 'success' ? 'bg-green-500' :
                notification.type === 'info' ? 'bg-yellow-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => closeModal('notifications')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Mark All Read
            </button>
          </div>
        </div>
      </MovableModal>

      <MovableModal
        isOpen={modals.help}
        onClose={() => closeModal('help')}
        title="Help & Support"
        id="help"
        initialPosition={{ x: 400, y: 160 }}
      >
        <div className="space-y-4">
          <div className="prose prose-sm">
            <h4 className="text-base font-semibold text-gray-900 mb-3">How to use Movable Modals</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Moving:</strong> Click and drag the modal header to reposition</li>
              <li>• <strong>Closing:</strong> Click the X button, press ESC, or click outside</li>
              <li>• <strong>Focus:</strong> Tab navigation is trapped within the modal</li>
              <li>• <strong>Multiple:</strong> Open several modals at once</li>
              <li>• <strong>Mobile:</strong> Touch and drag to move on mobile devices</li>
            </ul>
            
            <h4 className="text-base font-semibold text-gray-900 mb-3 mt-6">Features</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✅ Drag and drop repositioning</li>
              <li>✅ Viewport boundary constraints</li>
              <li>✅ Focus management and accessibility</li>
              <li>✅ Multiple modal instances</li>
              <li>✅ Responsive design</li>
              <li>✅ Touch device support</li>
              <li>✅ Smooth animations</li>
            </ul>
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              onClick={() => closeModal('help')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Got it!
            </button>
          </div>
        </div>
      </MovableModal>
    </div>
  )
}

export default App
