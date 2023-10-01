import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { SpeechProvider } from '@speechly/react-client';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SpeechProvider
      appId="f8778538-e0cf-4371-b07f-9109088d4c96"
      debug={true}
      logSegments={true}
      vad={{ enabled: false }}
    >
      <App />
    </SpeechProvider>
  </React.StrictMode>,
)
