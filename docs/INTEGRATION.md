# 🔧 Integration Guide

This comprehensive guide covers all the ways you can integrate the CryptoMarquee Widget into your website or application.

## 📚 Table of Contents

- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Platform-Specific Integration](#platform-specific-integration)
- [Advanced Features](#advanced-features)
- [Styling & Customization](#styling--customization)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Basic Integration

The simplest way to add the widget to any HTML page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Site</h1>
    
    <!-- CryptoMarquee Widget -->
    <div id="crypto-marquee"></div>
    <script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>
    
    <p>Your content continues here...</p>
</body>
</html>
```

### CDN Options

```html
<!-- jsdelivr CDN (Recommended) -->
<script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>

<!-- unpkg CDN -->
<script src="https://unpkg.com/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>

<!-- Direct from CryptoWatchNews -->
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.min.js"></script>
```

## ⚙️ Configuration

### HTML Data Attributes

Configure the widget using HTML data attributes:

```html
<div id="crypto-marquee" 
     data-speed="30" 
     data-count="20"
     data-theme="dark"
     data-show-change="true"
     data-show-powered-by="false">
</div>
```

### Complete Configuration Reference

| Attribute | Type | Default | Description | Example |
|-----------|------|---------|-------------|---------|
| `data-speed` | number | `40` | Animation speed in seconds (lower = faster) | `20` |
| `data-count` | number | `15` | Number of cryptocurrencies to display | `10` |
| `data-theme` | string | `"light"` | Visual theme: `"light"` or `"dark"` | `"dark"` |
| `data-show-change` | boolean | `true` | Show 24h price changes with colors | `false` |
| `data-show-powered-by` | boolean | `true` | Show attribution link | `false` |
| `data-api-url` | string | Auto | Custom API endpoint (advanced) | Custom URL |

### Configuration Examples

#### Slow and Minimal
```html
<div id="crypto-marquee" 
     data-speed="60" 
     data-count="5"
     data-show-change="false">
</div>
```

#### Fast and Comprehensive
```html
<div id="crypto-marquee" 
     data-speed="15" 
     data-count="25"
     data-theme="dark">
</div>
```

## 🌐 Platform-Specific Integration

### WordPress

#### Method 1: Theme Integration
Add to your active theme's `footer.php` file:

```php
<?php
// Add this before the closing </body> tag
?>
<div id="crypto-marquee" data-theme="light" data-count="10"></div>
<script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>
<?php
```

#### Method 2: Functions.php Hook
Add to your theme's `functions.php`:

```php
function add_crypto_marquee_widget() {
    if (!is_admin()) {
        ?>
        <div id="crypto-marquee" data-speed="40"></div>
        <script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>
        <?php
    }
}
add_action('wp_footer', 'add_crypto_marquee_widget');
```

#### Method 3: Custom HTML Block
1. Edit your page/post in WordPress
2. Add a "Custom HTML" block
3. Paste the widget code
4. Publish your changes

#### Method 4: Widget Plugin
Create a simple plugin file `crypto-marquee-plugin.php`:

```php
<?php
/*
Plugin Name: CryptoMarquee Widget
Description: Adds cryptocurrency price ticker to your website
Version: 1.0
*/

function crypto_marquee_shortcode($atts) {
    $atts = shortcode_atts(array(
        'speed' => '40',
        'count' => '15',
        'theme' => 'light'
    ), $atts);
    
    $widget_id = 'crypto-marquee-' . uniqid();
    
    return '<div id="' . $widget_id . '" data-speed="' . $atts['speed'] . '" data-count="' . $atts['count'] . '" data-theme="' . $atts['theme'] . '"></div>
    <script>
    if (!document.getElementById("cwn-script")) {
        var script = document.createElement("script");
        script.id = "cwn-script";
        script.src = "https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js";
        document.head.appendChild(script);
    }
    </script>';
}
add_shortcode('crypto_marquee', 'crypto_marquee_shortcode');
```

Use in posts with: `[crypto_marquee speed="30" theme="dark"]`

### React/Next.js

#### Functional Component
```jsx
import { useEffect, useRef } from 'react';

function CryptoMarqueeWidget({ 
  speed = 40, 
  count = 15, 
  theme = 'light', 
  showChange = true,
  showPoweredBy = true 
}) {
  const widgetRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    // Load script only once
    if (!scriptRef.current) {
      scriptRef.current = document.createElement('script');
      scriptRef.current.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
      scriptRef.current.defer = true;
      document.body.appendChild(scriptRef.current);
    }

    // Cleanup function
    return () => {
      if (widgetRef.current && widgetRef.current.dataset.cwnitialized) {
        // Reset widget if component unmounts
        widgetRef.current.innerHTML = '';
        delete widgetRef.current.dataset.cwnitialized;
      }
    };
  }, []);

  return (
    <div 
      ref={widgetRef}
      id={`crypto-marquee-${Math.random().toString(36).substr(2, 9)}`}
      data-speed={speed}
      data-count={count}
      data-theme={theme}
      data-show-change={showChange}
      data-show-powered-by={showPoweredBy}
    />
  );
}

export default CryptoMarqueeWidget;
```

#### Next.js with Script Component
```jsx
import Script from 'next/script';
import { useState } from 'react';

function CryptoMarquee() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  return (
    <>
      <div id="crypto-marquee" data-theme="dark" />
      <Script
        src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
    </>
  );
}
```

### Vue.js

#### Vue 3 Composition API
```vue
<template>
  <div 
    :id="widgetId"
    :data-speed="speed"
    :data-count="count"
    :data-theme="theme"
    :data-show-change="showChange"
    :data-show-powered-by="showPoweredBy"
  ></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  speed: { type: Number, default: 40 },
  count: { type: Number, default: 15 },
  theme: { type: String, default: 'light' },
  showChange: { type: Boolean, default: true },
  showPoweredBy: { type: Boolean, default: true }
});

const widgetId = ref(`crypto-marquee-${Math.random().toString(36).substr(2, 9)}`);
let scriptElement = null;

onMounted(() => {
  if (!document.getElementById('cwn-widget-script')) {
    scriptElement = document.createElement('script');
    scriptElement.id = 'cwn-widget-script';
    scriptElement.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
    scriptElement.defer = true;
    document.body.appendChild(scriptElement);
  }
});

onUnmounted(() => {
  const element = document.getElementById(widgetId.value);
  if (element && element.dataset.cwnitialized) {
    element.innerHTML = '';
    delete element.dataset.cwnitialized;
  }
});
</script>
```

#### Vue 2 Options API
```vue
<template>
  <div 
    :id="widgetId"
    :data-speed="speed"
    :data-count="count"
    :data-theme="theme"
  ></div>
</template>

<script>
export default {
  props: ['speed', 'count', 'theme'],
  data() {
    return {
      widgetId: `crypto-marquee-${Math.random().toString(36).substr(2, 9)}`
    };
  },
  mounted() {
    this.loadScript();
  },
  methods: {
    loadScript() {
      if (!document.getElementById('cwn-widget-script')) {
        const script = document.createElement('script');
        script.id = 'cwn-widget-script';
        script.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
        document.body.appendChild(script);
      }
    }
  }
};
</script>
```

### Angular

#### Component
```typescript
// crypto-marquee.component.ts
import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'crypto-marquee',
  template: `
    <div #widgetElement
         [id]="widgetId"
         [attr.data-speed]="speed"
         [attr.data-count]="count"
         [attr.data-theme]="theme"
         [attr.data-show-change]="showChange"
         [attr.data-show-powered-by]="showPoweredBy">
    </div>
  `
})
export class CryptoMarqueeComponent implements OnInit, OnDestroy {
  @Input() speed: number = 40;
  @Input() count: number = 15;
  @Input() theme: string = 'light';
  @Input() showChange: boolean = true;
  @Input() showPoweredBy: boolean = true;
  
  @ViewChild('widgetElement', { static: true }) widgetElement!: ElementRef;
  
  widgetId = `crypto-marquee-${Math.random().toString(36).substr(2, 9)}`;
  
  ngOnInit() {
    this.loadScript();
  }
  
  ngOnDestroy() {
    const element = this.widgetElement.nativeElement;
    if (element.dataset.cwnitialized) {
      element.innerHTML = '';
      delete element.dataset.cwnitialized;
    }
  }
  
  private loadScript() {
    if (!document.getElementById('cwn-widget-script')) {
      const script = document.createElement('script');
      script.id = 'cwn-widget-script';
      script.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
      script.defer = true;
      document.body.appendChild(script);
    }
  }
}
```

### Shopify

#### Theme Integration
Add to your theme's `theme.liquid` before the closing `</body>` tag:

```liquid
<!-- CryptoMarquee Widget -->
<div id="crypto-marquee" 
     data-theme="light" 
     data-count="10"
     data-speed="35">
</div>
<script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>
```

#### Section File
Create `sections/crypto-marquee.liquid`:

```liquid
<div class="crypto-marquee-section">
  <div id="crypto-marquee-{{ section.id }}" 
       data-speed="{{ section.settings.speed | default: 40 }}"
       data-count="{{ section.settings.count | default: 15 }}"
       data-theme="{{ section.settings.theme | default: 'light' }}">
  </div>
</div>

<script>
  if (!document.getElementById('cwn-widget-script')) {
    var script = document.createElement('script');
    script.id = 'cwn-widget-script';
    script.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
    document.body.appendChild(script);
  }
</script>

{% schema %}
{
  "name": "Crypto Marquee",
  "settings": [
    {
      "type": "range",
      "id": "speed",
      "min": 10,
      "max": 100,
      "step": 5,
      "label": "Animation Speed",
      "default": 40
    },
    {
      "type": "range",
      "id": "count",
      "min": 5,
      "max": 30,
      "step": 1,
      "label": "Number of Cryptocurrencies",
      "default": 15
    },
    {
      "type": "select",
      "id": "theme",
      "label": "Theme",
      "options": [
        { "value": "light", "label": "Light" },
        { "value": "dark", "label": "Dark" }
      ],
      "default": "light"
    }
  ],
  "presets": [
    {
      "name": "Crypto Marquee"
    }
  ]
}
{% endschema %}
```

### Squarespace

1. Go to **Settings** → **Advanced** → **Code Injection**
2. Add to **Footer**:

```html
<div id="crypto-marquee" data-speed="35" data-theme="light"></div>
<script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>

<style>
/* Optional: Custom styling for Squarespace */
#crypto-marquee {
  margin: 20px 0;
}
</style>
```

### Wix

1. Add an **HTML Element** to your page
2. Paste this code:

```html
<div id="crypto-marquee" 
     data-speed="30" 
     data-count="12"
     data-theme="light">
</div>

<script>
if (!window.cryptoMarqueeLoaded) {
  window.cryptoMarqueeLoaded = true;
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
  document.head.appendChild(script);
}
</script>
```

## 🔧 Advanced Features

### Multiple Widgets

You can have multiple widgets on the same page:

```html
<!-- Header widget -->
<div id="crypto-marquee-header" 
     data-count="8" 
     data-speed="30" 
     data-theme="light">
</div>

<!-- Sidebar widget -->
<div id="crypto-marquee-sidebar" 
     data-count="5" 
     data-theme="dark"
     data-show-change="false">
</div>

<!-- Footer widget -->
<div id="crypto-marquee-footer" 
     data-count="12" 
     data-speed="50">
</div>

<!-- Load script once -->
<script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>
```

### Dynamic Widget Creation

Create widgets programmatically:

```javascript
// Load the widget script
function loadCryptoWidget() {
  return new Promise((resolve) => {
    if (window.CryptoMarqueeWidget) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

// Create widget dynamically
async function createDynamicWidget() {
  await loadCryptoWidget();
  
  const container = document.createElement('div');
  container.id = 'crypto-marquee-dynamic';
  container.dataset.speed = '25';
  container.dataset.theme = 'dark';
  container.dataset.count = '10';
  
  document.getElementById('widget-container').appendChild(container);
  
  // Widget will auto-initialize
}

// Usage
createDynamicWidget();
```

### Programmatic Control

Access the widget instance for advanced control:

```javascript
// Wait for script to load
document.addEventListener('DOMContentLoaded', function() {
  // Access widget instance (if available)
  const element = document.getElementById('crypto-marquee');
  
  // Check if widget is initialized
  if (element.dataset.cwnitialized) {
    console.log('Widget is ready!');
  }
  
  // Listen for widget events (if implemented)
  element.addEventListener('cwn-data-loaded', function(e) {
    console.log('Crypto data loaded:', e.detail);
  });
});
```

## 🎨 Styling & Customization

### Custom CSS

Override default styles with CSS:

```css
/* Custom background */
.cwn-marquee-widget {
  background: linear-gradient(45deg, #667eea, #764ba2) !important;
  border-radius: 10px !important;
}

/* Custom item styling */
.cwn-crypto-item {
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 8px !important;
  backdrop-filter: blur(10px) !important;
}

/* Custom typography */
.cwn-crypto-symbol {
  font-family: 'Roboto', sans-serif !important;
  font-weight: 800 !important;
}

/* Custom animations */
.cwn-crypto-item:hover {
  transform: translateY(-2px) scale(1.02) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

/* Hide powered by link */
.cwn-powered-by {
  display: none !important;
}
```

### Theme Customization

Create custom themes:

```css
/* Custom dark theme */
.cwn-marquee-widget.custom-dark {
  background: #1a1a2e !important;
}

.cwn-marquee-widget.custom-dark .cwn-crypto-item {
  background: #16213e !important;
  color: #eee !important;
}

/* Custom light theme */
.cwn-marquee-widget.custom-light {
  background: #f8f9ff !important;
}
```

Then use with custom class:

```html
<div id="crypto-marquee" class="custom-dark" data-theme="dark"></div>
```

### Responsive Design

Customize for different screen sizes:

```css
/* Mobile optimizations */
@media (max-width: 768px) {
  .cwn-crypto-item {
    font-size: 0.7rem !important;
    padding: 0.2rem 0.4rem !important;
  }
  
  .cwn-crypto-icon {
    width: 16px !important;
    height: 16px !important;
  }
}

/* Tablet optimizations */
@media (min-width: 769px) and (max-width: 1024px) {
  .cwn-marquee-widget {
    padding: 0.7rem 0 !important;
  }
}

/* Desktop optimizations */
@media (min-width: 1025px) {
  .cwn-crypto-item {
    gap: 0.7rem !important;
  }
}
```

## ⚡ Performance Optimization

### Lazy Loading

Load the widget only when needed:

```javascript
// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadCryptoWidget();
      observer.unobserve(entry.target);
    }
  });
});

observer.observe(document.getElementById('crypto-marquee'));

function loadCryptoWidget() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js';
  document.body.appendChild(script);
}
```

### Preloading

Preload the script for better performance:

```html
<head>
  <!-- Preload the widget script -->
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js" as="script">
</head>
<body>
  <div id="crypto-marquee"></div>
  <script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js" defer></script>
</body>
```

### Caching Strategy

Implement browser caching:

```javascript
// Service Worker caching (example)
const CACHE_NAME = 'crypto-widget-v1';
const urlsToCache = [
  'https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});
```

## 🐛 Troubleshooting

### Common Issues

#### Widget Not Loading

**Symptom**: Widget container is empty
**Solutions**:
1. Check browser console for JavaScript errors
2. Verify the script URL is accessible
3. Ensure container ID starts with "crypto-marquee"
4. Check for ad blockers or content security policies

```javascript
// Debug: Check if script loaded
if (window.CryptoMarqueeWidget) {
  console.log('✅ Widget script loaded');
} else {
  console.log('❌ Widget script not loaded');
}

// Debug: Check widget initialization
const element = document.getElementById('crypto-marquee');
if (element.dataset.cwnitialized) {
  console.log('✅ Widget initialized');
} else {
  console.log('❌ Widget not initialized');
}
```

#### Styling Issues

**Symptom**: Widget looks broken or doesn't match your site
**Solutions**:
1. Check for CSS conflicts
2. Use `!important` for custom styles
3. Test in different browsers
4. Clear browser cache

```css
/* Debug: Add borders to see widget structure */
.cwn-marquee-widget * {
  border: 1px solid red !important;
}
```

#### Performance Issues

**Symptom**: Widget is slow or causes page lag
**Solutions**:
1. Reduce the number of displayed cryptocurrencies
2. Increase animation speed (higher number = slower)
3. Use lazy loading
4. Check for memory leaks

```javascript
// Debug: Monitor performance
console.time('widget-load');
// ... widget loading code ...
console.timeEnd('widget-load');

// Check memory usage
console.log('Memory usage:', performance.memory?.usedJSHeapSize);
```

#### API Issues

**Symptom**: Widget shows "Unable to load crypto prices"
**Solutions**:
1. Check network connectivity
2. Verify API endpoint is accessible
3. Check for CORS issues
4. Try refreshing the page

```javascript
// Debug: Test API directly
fetch('https://www.cryptowatchnews.com/api/price/list?page=1&perPage=5')
  .then(response => response.json())
  .then(data => console.log('API response:', data))
  .catch(error => console.error('API error:', error));
```

### Browser Compatibility

The widget supports modern browsers. For older browsers:

```html
<!-- Polyfill for older browsers -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=fetch,IntersectionObserver"></script>
<div id="crypto-marquee"></div>
<script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>
```

### Content Security Policy (CSP)

If your site uses CSP, add these directives:

```
Content-Security-Policy: 
  script-src 'self' https://cdn.jsdelivr.net https://unpkg.com https://www.cryptowatchnews.com;
  connect-src 'self' https://www.cryptowatchnews.com;
  img-src 'self' https://cdn.jsdelivr.net data:;
```

---

## 📞 Need Help?

- 🐞 **Bug Reports**: [GitHub Issues](https://github.com/cryptowatchnews/crypto-marquee-widget/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/cryptowatchnews/crypto-marquee-widget/discussions)
- 📧 **Email**: support@cryptowatchnews.com
- 🌐 **Website**: [cryptowatchnews.com](https://www.cryptowatchnews.com)