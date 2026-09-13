import React, { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('App render error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
          <h1>We&apos;re fixing this page.</h1>
          <p>Please refresh in a moment, or contact us if this persists.</p>
        </div>
      )
    }

    return this.props.children
  }
}

const app = (
  <StrictMode>
    <RootErrorBoundary>
      <App pathname={window.location.pathname.endsWith("/")?window.location.pathname:window.location.pathname+"/"} />
    </RootErrorBoundary>
  </StrictMode>
);
const root=document.getElementById("root");
if(root.hasChildNodes())hydrateRoot(root,app);else createRoot(root).render(app);
