import { useEffect, useState } from 'react'

const stepsBase = [
  { key: 'device', title: 'Choose your device', content: 'Select the phone or tablet you are using. We will show exact steps.' },
  { key: 'a2hs', title: 'Add to Home Screen', content: 'Follow the steps to install Team Logger to your Home Screen.' },
  { key: 'push', title: 'Enable Notifications', content: 'Turn on notifications so your team can send reminders.' },
  { key: 'tour', title: 'Quick Tour', content: 'We will point to the main features. You can skip anytime.' },
]

export default function Onboarding({ onClose }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [device, setDevice] = useState('auto')

  useEffect(() => {
    const saved = localStorage.getItem('tl_onboard_done')
    if (saved === '1') onClose?.()
  }, [onClose])

  const next = () => {
    if (stepIndex < stepsBase.length - 1) setStepIndex(stepIndex + 1)
    else {
      localStorage.setItem('tl_onboard_done', '1')
      onClose?.()
    }
  }

  const skip = () => next()

  const Step = stepsBase[stepIndex]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">{Step.title}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">✕</button>
        </div>

        {Step.key === 'device' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-600">Pick your device to see exact steps.</p>
            <div className="grid grid-cols-2 gap-2">
              {['iPhone/iPad','Android','Desktop','Other'].map((d) => (
                <button key={d} onClick={() => setDevice(d)}
                  className={`border rounded-lg p-3 text-sm ${device===d? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {Step.key === 'a2hs' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-700">Add Team Logger to your Home Screen.</p>
            <div className="text-sm bg-slate-50 border border-slate-200 rounded p-3">
              {device.startsWith('iPhone') || device === 'iPhone/iPad' ? (
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Open the Share button in Safari.</li>
                  <li>Tap "Add to Home Screen".</li>
                  <li>Press Add. Look for the app icon on your Home Screen.</li>
                </ol>
              ) : device === 'Android' ? (
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Open menu (⋮) in Chrome.</li>
                  <li>Tap "Install app" or "Add to Home screen".</li>
                  <li>Confirm. Find the icon on your Home Screen.</li>
                </ol>
              ) : device === 'Desktop' ? (
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Use your browser menu to install the app.</li>
                  <li>On macOS Safari: File → Add to Dock.</li>
                  <li>On Chrome/Edge: Install App in the address bar.</li>
                </ol>
              ) : (
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Open your browser menu.</li>
                  <li>Find Add to Home Screen / Install App.</li>
                  <li>Confirm. The app icon will appear on your device.</li>
                </ol>
              )}
            </div>
          </div>
        )}

        {Step.key === 'push' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-700">Turn on notifications to get reminders and updates.</p>
            <button
              onClick={async () => {
                try {
                  const perm = await Notification.requestPermission()
                  alert(`Notifications: ${perm}`)
                } catch (e) {
                  alert('This device/browser does not support web push here.')
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm">
              Enable Notifications
            </button>
            <p className="text-xs text-slate-500">On iOS, notifications work when the app is installed to Home Screen (iOS 16.4+).</p>
          </div>
        )}

        {Step.key === 'tour' && (
          <div className="space-y-3 text-sm text-slate-700">
            <p>Quick tour highlights will appear in the app once you finish onboarding.</p>
            <p>Kids under 12: please ask an adult for help using these features.</p>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <button onClick={skip} className="text-slate-500 text-sm">Skip</button>
          <button onClick={next} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm">{stepIndex < stepsBase.length - 1 ? 'Next' : 'Finish'}</button>
        </div>
      </div>
    </div>
  )
}
