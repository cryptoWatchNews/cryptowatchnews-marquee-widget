# 📡 API Reference

This document provides a comprehensive reference for the CryptoMarquee Widget API.

## 🏗️ Widget Class

### CryptoMarqueeWidget

The main class that powers the widget functionality.

#### Constructor

```javascript
new CryptoMarqueeWidget(element, config)
```

**Parameters:**
- `element` (HTMLElement): The DOM element to render the widget into
- `config` (Object): Configuration options

**Example:**
```javascript
const element = document.getElementById('crypto-marquee');
const widget = new CryptoMarqueeWidget(element, {
  speed: 30,
  theme: 'dark',
  count: 10
});
```

#### Configuration Object

```javascript
const config = {
  speed: 40,              // Animation speed in seconds
  count: 15,              // Number of cryptocurrencies
  theme: 'light',         // Theme: 'light' or 'dark'
  showChange: true,       // Show price changes
  showPoweredBy: true,    // Show attribution
  apiUrl: 'auto'          // API endpoint URL
};
```

#### Methods

##### init()
Initializes the widget by injecting styles, rendering HTML, and fetching data.

```javascript
widget.init();
```

##### render()
Renders the widget HTML structure.

```javascript
widget.render();
```

##### fetchData()
Fetches cryptocurrency data from the API.

```javascript
await widget.fetchData();
```

##### updateContent()
Updates the widget content with fresh data.

```javascript
widget.updateContent();
```

##### destroy()
Destroys the widget instance and cleans up resources.

```javascript
widget.destroy();
```

## 🔧 Configuration Options

### Data Attributes

All configuration options can be set via HTML data attributes:

| Attribute | Type | Default | Valid Values | Description |
|-----------|------|---------|--------------|-------------|
| `data-speed` | number | `40` | `10-100` | Animation duration in seconds |
| `data-count` | number | `15` | `1-50` | Number of cryptocurrencies to display |
| `data-theme` | string | `"light"` | `"light"`, `"dark"` | Visual theme |
| `data-show-change` | boolean | `true` | `true`, `false` | Show 24h price changes |
| `data-show-powered-by` | boolean | `true` | `true`, `false` | Show attribution link |
| `data-api-url` | string | Auto | Valid URL | Custom API endpoint |

### JavaScript Configuration

```javascript
const DEFAULT_CONFIG = {
  speed: 40,              // Animation speed (seconds)
  count: 15,              // Number of cryptos
  theme: 'light',         // 'light' or 'dark'
  showChange: true,       // Show price changes
  showPoweredBy: true,    // Show attribution
  apiUrl: 'https://www.cryptowatchnews.com/api/price/list'
};
```

## 🌐 API Endpoints

### Price List Endpoint

**URL:** `https://www.cryptowatchnews.com/api/price/list`

**Method:** GET

**Parameters:**
- `page` (number): Page number (default: 1)
- `perPage` (number): Items per page (default: 15)
- `order` (string): Sort field (default: 'marketCapUsd')
- `dir` (string): Sort direction (default: 'desc')

**Example Request:**
```
GET /api/price/list?page=1&perPage=15&order=marketCapUsd&dir=desc
```

**Response Format:**
```json
{
  "data": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "priceUsd": "45000.50",
      "change24hPct": "0.0234",
      "icon": "https://example.com/btc-icon.png"
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 15,
    "total": 100
  }
}
```

### Custom API Integration

You can use your own API by setting the `data-api-url` attribute:

```html
<div id="crypto-marquee" 
     data-api-url="https://your-api.com/crypto-prices">
</div>
```

**Required Response Format:**
Your API must return data in this format:

```json
{
  "data": [
    {
      "symbol": "BTC",           // Required: Token symbol
      "name": "Bitcoin",         // Required: Full name
      "priceUsd": "45000.50",   // Required: Price in USD (string or number)
      "change24hPct": "0.0234", // Optional: 24h change percentage
      "icon": "https://..."     // Optional: Icon URL
    }
  ]
}
```

## 🎨 CSS Classes

### Main Classes

| Class | Description |
|-------|-------------|
| `.cwn-marquee-widget` | Main widget container |
| `.cwn-marquee-widget.dark` | Dark theme modifier |
| `.cwn-marquee-container` | Scrolling container |
| `.cwn-marquee-content` | Animated content wrapper |
| `.cwn-marquee-items` | Items container |
| `.cwn-crypto-item` | Individual crypto item |
| `.cwn-crypto-icon` | Cryptocurrency icon |
| `.cwn-crypto-symbol` | Symbol text |
| `.cwn-crypto-price` | Price text |
| `.cwn-crypto-change` | Price change indicator |
| `.cwn-powered-by` | Attribution link |
| `.cwn-loading` | Loading state |

### State Classes

| Class | Description |
|-------|-------------|
| `.cwn-marquee-content.paused` | Animation paused (on hover) |
| `.cwn-crypto-change.positive` | Positive price change |
| `.cwn-crypto-change.negative` | Negative price change |

### CSS Custom Properties

You can customize the widget using CSS custom properties:

```css
.cwn-marquee-widget {
  --cwn-bg-light: rgba(248, 250, 252, 0.95);
  --cwn-bg-dark: rgba(30, 41, 59, 0.95);
  --cwn-item-bg: rgba(255, 255, 255, 0.95);
  --cwn-item-bg-dark: rgba(51, 65, 85, 0.95);
  --cwn-positive-color: #10b981;
  --cwn-negative-color: #ef4444;
  --cwn-text-primary: #333;
  --cwn-text-secondary: #555;
  --cwn-animation-duration: 40s;
}
```

## 🔄 Events

The widget emits custom events that you can listen to:

### Widget Loaded
```javascript
document.addEventListener('cwn-widget-loaded', function(e) {
  console.log('Widget loaded:', e.detail.element);
});
```

### Data Updated
```javascript
document.addEventListener('cwn-data-updated', function(e) {
  console.log('Data updated:', e.detail.data);
});
```

### Error Occurred
```javascript
document.addEventListener('cwn-error', function(e) {
  console.error('Widget error:', e.detail.error);
});
```

## 🛠️ Utility Functions

### formatPrice(price)
Formats a price value for display.

```javascript
formatPrice(45000.50);  // Returns: "$45,000.50"
formatPrice(0.0234);    // Returns: "$0.0234"
formatPrice(null);      // Returns: "$0.00"
```

### formatPercentage(percentage)
Formats a percentage value for display.

```javascript
formatPercentage(0.0234);  // Returns: "2.34%"
formatPercentage(-0.0156); // Returns: "-1.56%"
formatPercentage(null);    // Returns: "-"
```

### createSlug(name)
Creates a URL-friendly slug from a cryptocurrency name.

```javascript
createSlug("Bitcoin Cash");  // Returns: "bitcoin-cash"
createSlug("Ethereum");      // Returns: "ethereum"
```

## 🧩 Integration Patterns

### Async Loading
```javascript
async function loadWidget() {
  // Wait for script to load
  if (!window.CryptoMarqueeWidget) {
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.onload = resolve;
      script.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
      document.head.appendChild(script);
    });
  }
  
  // Initialize widget
  const element = document.getElementById('crypto-marquee');
  const widget = new CryptoMarqueeWidget(element, { theme: 'dark' });
  
  return widget;
}
```

### Multiple Widgets
```javascript
function initializeAllWidgets() {
  const widgets = document.querySelectorAll('[id^="crypto-marquee"]');
  const instances = [];
  
  widgets.forEach((element, index) => {
    if (!element.dataset.initialized) {
      const config = {
        speed: parseInt(element.dataset.speed) || 40,
        count: parseInt(element.dataset.count) || 15,
        theme: element.dataset.theme || 'light'
      };
      
      const widget = new CryptoMarqueeWidget(element, config);
      instances.push(widget);
      element.dataset.initialized = 'true';
    }
  });
  
  return instances;
}
```

### Dynamic Configuration
```javascript
function updateWidgetConfig(element, newConfig) {
  // Update data attributes
  Object.entries(newConfig).forEach(([key, value]) => {
    element.dataset[key] = value;
  });
  
  // Reinitialize if needed
  if (element.dataset.initialized) {
    const widget = new CryptoMarqueeWidget(element, newConfig);
    widget.init();
  }
}

// Usage
updateWidgetConfig(document.getElementById('crypto-marquee'), {
  theme: 'dark',
  speed: '25',
  count: '20'
});
```

## 🔒 Security Considerations

### Content Security Policy
Add these directives to your CSP header:

```
script-src 'self' https://cdn.jsdelivr.net;
connect-src 'self' https://www.cryptowatchnews.com;
img-src 'self' https://cdn.jsdelivr.net data:;
style-src 'self' 'unsafe-inline';
```

### XSS Prevention
The widget automatically sanitizes all data:

- HTML entities are escaped
- URLs are validated
- User input is filtered

### API Security
- All API requests use HTTPS
- No sensitive data is transmitted
- Rate limiting is applied server-side

## 🐛 Error Handling

### Error Types

#### Network Errors
```javascript
// Handle API failures
document.addEventListener('cwn-error', function(e) {
  if (e.detail.type === 'network') {
    console.log('Network error:', e.detail.message);
    // Show fallback content
  }
});
```

#### Configuration Errors
```javascript
// Invalid configuration
try {
  new CryptoMarqueeWidget(element, { count: -1 });
} catch (error) {
  console.error('Configuration error:', error.message);
}
```

#### DOM Errors
```javascript
// Element not found
const element = document.getElementById('non-existent');
if (!element) {
  console.error('Widget container not found');
}
```

### Error Recovery

```javascript
function initializeWidgetWithFallback() {
  try {
    const widget = new CryptoMarqueeWidget(element, config);
    return widget;
  } catch (error) {
    console.warn('Widget initialization failed:', error);
    
    // Show fallback content
    element.innerHTML = '<div class="crypto-fallback">Unable to load crypto prices</div>';
    
    // Retry after delay
    setTimeout(() => {
      initializeWidgetWithFallback();
    }, 5000);
  }
}
```

## 📊 Performance

### Metrics
- Bundle size: ~15KB minified + gzipped
- Memory usage: <2MB
- CPU usage: Minimal (CSS animations)
- Network requests: 1 per initialization + periodic updates

### Optimization Tips

1. **Use single script tag** for multiple widgets
2. **Enable browser caching** with proper headers
3. **Lazy load** widgets below the fold
4. **Reduce count** for better performance
5. **Use CDN** for faster loading

## 🧪 Testing

### Unit Testing
```javascript
describe('CryptoMarqueeWidget', () => {
  test('should initialize with default config', () => {
    const element = document.createElement('div');
    const widget = new CryptoMarqueeWidget(element);
    
    expect(widget.config.speed).toBe(40);
    expect(widget.config.theme).toBe('light');
  });
  
  test('should format prices correctly', () => {
    expect(formatPrice(45000.50)).toBe('$45,000.50');
    expect(formatPrice(0.0234)).toBe('$0.0234');
  });
});
```

### Integration Testing
```javascript
// Test widget loading
async function testWidgetLoading() {
  const element = document.getElementById('test-widget');
  const widget = new CryptoMarqueeWidget(element);
  
  // Wait for initialization
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if widget loaded
  assert(element.querySelector('.cwn-crypto-item'), 'Widget items should be present');
  assert(element.dataset.initialized === 'true', 'Widget should be initialized');
}
```

---

## 📞 Support

For technical support, please:

- 🐞 Report bugs on [GitHub Issues](https://github.com/cryptowatchnews/crypto-marquee-widget/issues)
- 💬 Ask questions in [GitHub Discussions](https://github.com/cryptowatchnews/crypto-marquee-widget/discussions)  
- 📧 Email us at support@cryptowatchnews.com