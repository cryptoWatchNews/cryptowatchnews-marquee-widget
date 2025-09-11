import React, { useEffect, useRef, useState } from 'react';

/**
 * CryptoMarquee Widget - React Component Examples
 * 
 * This file contains various React implementations of the CryptoMarquee Widget
 * suitable for different React applications and frameworks.
 */

// =====================================================
// Example 1: Basic Functional Component with Hooks
// =====================================================

const CryptoMarqueeBasic = ({ 
  speed = 40, 
  count = 15, 
  theme = 'light', 
  showChange = true,
  showPoweredBy = true 
}) => {
  const widgetRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let scriptElement = null;

    const loadWidget = async () => {
      try {
        // Check if script is already loaded
        if (window.CryptoMarqueeWidget) {
          setIsLoaded(true);
          return;
        }

        // Load the widget script
        if (!document.getElementById('cwn-widget-script')) {
          scriptElement = document.createElement('script');
          scriptElement.id = 'cwn-widget-script';
          scriptElement.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
          scriptElement.defer = true;
          
          // Handle script load
          scriptElement.onload = () => {
            setIsLoaded(true);
            setError(null);
          };
          
          // Handle script error
          scriptElement.onerror = () => {
            setError('Failed to load widget script');
          };
          
          document.head.appendChild(scriptElement);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    loadWidget();

    // Cleanup function
    return () => {
      if (widgetRef.current && widgetRef.current.dataset.cwnitialized) {
        widgetRef.current.innerHTML = '';
        delete widgetRef.current.dataset.cwnitialized;
      }
    };
  }, []);

  // Generate unique ID for this widget instance
  const widgetId = `crypto-marquee-${Math.random().toString(36).substr(2, 9)}`;

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        background: '#fee', 
        border: '1px solid #fcc', 
        borderRadius: '4px',
        color: '#c44'
      }}>
        Error loading crypto widget: {error}
      </div>
    );
  }

  return (
    <div 
      ref={widgetRef}
      id={widgetId}
      data-speed={speed}
      data-count={count}
      data-theme={theme}
      data-show-change={showChange}
      data-show-powered-by={showPoweredBy}
      style={{
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!isLoaded && (
        <div style={{ color: '#666', fontSize: '14px' }}>
          Loading crypto prices...
        </div>
      )}
    </div>
  );
};

// =====================================================
// Example 2: Advanced Component with Custom Hooks
// =====================================================

// Custom hook for widget management
const useCryptoMarqueeWidget = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadScript = () => {
      // Return early if script already exists
      if (document.getElementById('cwn-widget-script') || window.CryptoMarqueeWidget) {
        setIsScriptLoaded(true);
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.id = 'cwn-widget-script';
        script.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
        script.defer = true;
        
        script.onload = () => {
          setIsScriptLoaded(true);
          resolve();
        };
        
        script.onerror = (err) => {
          setError('Failed to load widget script');
          reject(err);
        };
        
        document.head.appendChild(script);
      });
    };

    loadScript().catch(err => {
      console.error('Error loading crypto widget script:', err);
    });
  }, []);

  return { isScriptLoaded, error };
};

const CryptoMarqueeAdvanced = (props) => {
  const { isScriptLoaded, error } = useCryptoMarqueeWidget();
  const widgetRef = useRef(null);
  const [widgetInstance, setWidgetInstance] = useState(null);

  const {
    speed = 40,
    count = 15,
    theme = 'light',
    showChange = true,
    showPoweredBy = true,
    onDataLoad = null,
    onError = null
  } = props;

  // Widget ID generation
  const widgetId = useRef(`crypto-marquee-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (isScriptLoaded && widgetRef.current && !widgetInstance) {
      try {
        // Create widget instance programmatically (if supported by the widget library)
        const instance = new window.CryptoMarqueeWidget(widgetRef.current, {
          speed,
          count,
          theme,
          showChange,
          showPoweredBy
        });

        setWidgetInstance(instance);

        // Add event listeners if callbacks provided
        if (onDataLoad) {
          widgetRef.current.addEventListener('cwn-data-loaded', onDataLoad);
        }
        if (onError) {
          widgetRef.current.addEventListener('cwn-error', onError);
        }
      } catch (err) {
        console.error('Error initializing crypto widget:', err);
        if (onError) onError(err);
      }
    }

    // Cleanup
    return () => {
      if (widgetInstance && typeof widgetInstance.destroy === 'function') {
        widgetInstance.destroy();
      }
      if (widgetRef.current) {
        if (onDataLoad) {
          widgetRef.current.removeEventListener('cwn-data-loaded', onDataLoad);
        }
        if (onError) {
          widgetRef.current.removeEventListener('cwn-error', onError);
        }
      }
    };
  }, [isScriptLoaded, speed, count, theme, showChange, showPoweredBy, onDataLoad, onError, widgetInstance]);

  if (error) {
    return (
      <div className="crypto-widget-error">
        <p>Unable to load cryptocurrency data</p>
        <small>{error}</small>
      </div>
    );
  }

  return (
    <div 
      ref={widgetRef}
      id={widgetId.current}
      data-speed={speed}
      data-count={count}
      data-theme={theme}
      data-show-change={showChange}
      data-show-powered-by={showPoweredBy}
      className="crypto-marquee-container"
    >
      {!isScriptLoaded && (
        <div className="crypto-widget-loading">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

// =====================================================
// Example 3: Next.js Integration with Script Component
// =====================================================

import Script from 'next/script';

const CryptoMarqueeNextJS = ({ 
  speed = 40, 
  count = 15, 
  theme = 'light' 
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const widgetId = `crypto-marquee-nextjs-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <div 
        id={widgetId}
        data-speed={speed}
        data-count={count}
        data-theme={theme}
        style={{
          minHeight: scriptLoaded ? 'auto' : '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!scriptLoaded && (
          <div style={{ color: '#666', fontSize: '14px' }}>
            Loading crypto prices...
          </div>
        )}
      </div>
      
      <Script
        src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
        onError={(err) => {
          console.error('Error loading crypto widget:', err);
        }}
      />
    </>
  );
};

// =====================================================
// Example 4: Class Component (for legacy React apps)
// =====================================================

class CryptoMarqueeClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null
    };
    this.widgetRef = React.createRef();
    this.widgetId = `crypto-marquee-class-${Math.random().toString(36).substr(2, 9)}`;
  }

  componentDidMount() {
    this.loadWidget();
  }

  componentWillUnmount() {
    if (this.widgetRef.current && this.widgetRef.current.dataset.cwnitialized) {
      this.widgetRef.current.innerHTML = '';
      delete this.widgetRef.current.dataset.cwnitialized;
    }
  }

  loadWidget = async () => {
    try {
      if (window.CryptoMarqueeWidget) {
        this.setState({ isLoaded: true });
        return;
      }

      if (!document.getElementById('cwn-widget-script')) {
        const script = document.createElement('script');
        script.id = 'cwn-widget-script';
        script.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
        script.defer = true;
        
        script.onload = () => {
          this.setState({ isLoaded: true, error: null });
        };
        
        script.onerror = () => {
          this.setState({ error: 'Failed to load widget script' });
        };
        
        document.head.appendChild(script);
      }
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { speed = 40, count = 15, theme = 'light' } = this.props;
    const { isLoaded, error } = this.state;

    if (error) {
      return (
        <div className="crypto-widget-error">
          <p>Error loading crypto widget: {error}</p>
        </div>
      );
    }

    return (
      <div 
        ref={this.widgetRef}
        id={this.widgetId}
        data-speed={speed}
        data-count={count}
        data-theme={theme}
        style={{
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!isLoaded && (
          <div style={{ color: '#666', fontSize: '14px' }}>
            Loading crypto prices...
          </div>
        )}
      </div>
    );
  }
}

// =====================================================
// Example 5: TypeScript Definitions (if using TypeScript)
// =====================================================

/*
// types.ts
export interface CryptoMarqueeProps {
  speed?: number;
  count?: number;
  theme?: 'light' | 'dark';
  showChange?: boolean;
  showPoweredBy?: boolean;
  onDataLoad?: (event: CustomEvent) => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface CryptoData {
  symbol: string;
  name: string;
  priceUsd: string;
  change24hPct: string;
  icon: string;
}

export interface WidgetInstance {
  init: () => void;
  destroy: () => void;
  updateContent: () => void;
  fetchData: () => Promise<void>;
}

declare global {
  interface Window {
    CryptoMarqueeWidget: new (element: HTMLElement, config: any) => WidgetInstance;
  }
}
*/

// =====================================================
// Example 6: Styled Components Integration
// =====================================================

/*
import styled from 'styled-components';

const StyledWidgetContainer = styled.div`
  .cwn-marquee-widget {
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }

  .cwn-crypto-item {
    backdrop-filter: blur(10px) !important;
    transition: all 0.3s ease !important;
  }

  .cwn-crypto-item:hover {
    transform: translateY(-2px) scale(1.02) !important;
  }
`;

const StyledCryptoMarquee = (props) => (
  <StyledWidgetContainer>
    <CryptoMarqueeBasic {...props} />
  </StyledWidgetContainer>
);
*/

// =====================================================
// Example 7: Usage Examples and Demo Component
// =====================================================

const CryptoMarqueeDemo = () => {
  const [theme, setTheme] = useState('light');
  const [speed, setSpeed] = useState(40);
  const [count, setCount] = useState(15);

  const handleDataLoad = (event) => {
    console.log('Crypto data loaded:', event.detail);
  };

  const handleError = (error) => {
    console.error('Widget error:', error);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CryptoMarquee Widget - React Examples</h1>
      
      {/* Controls */}
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Widget Configuration</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <label>
            Theme:
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label>
            Speed:
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={speed} 
              onChange={(e) => setSpeed(parseInt(e.target.value))} 
            />
            {speed}s
          </label>
          <label>
            Count:
            <input 
              type="range" 
              min="5" 
              max="30" 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value))} 
            />
            {count}
          </label>
        </div>
      </div>

      {/* Basic Widget */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Basic Widget</h2>
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <CryptoMarqueeBasic 
            theme={theme} 
            speed={speed} 
            count={count}
            onDataLoad={handleDataLoad}
            onError={handleError}
          />
        </div>
      </section>

      {/* Advanced Widget */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Advanced Widget</h2>
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <CryptoMarqueeAdvanced 
            theme={theme} 
            speed={speed} 
            count={count}
            onDataLoad={handleDataLoad}
            onError={handleError}
          />
        </div>
      </section>

      {/* Class Component Widget */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Class Component Widget</h2>
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <CryptoMarqueeClass 
            theme={theme} 
            speed={speed} 
            count={count}
          />
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2>Code Examples</h2>
        <pre style={{ background: '#f8f8f8', padding: '15px', borderRadius: '8px', overflow: 'auto' }}>
{`// Basic usage
<CryptoMarqueeBasic />

// With props
<CryptoMarqueeBasic 
  speed={30}
  count={10}
  theme="dark"
  showChange={false}
/>

// With callbacks
<CryptoMarqueeAdvanced 
  onDataLoad={(e) => console.log('Data:', e.detail)}
  onError={(err) => console.error('Error:', err)}
/>`}
        </pre>
      </section>
    </div>
  );
};

// Export all components
export {
  CryptoMarqueeBasic,
  CryptoMarqueeAdvanced,
  CryptoMarqueeNextJS,
  CryptoMarqueeClass,
  CryptoMarqueeDemo,
  useCryptoMarqueeWidget
};

export default CryptoMarqueeBasic;