# 🚀 CryptoMarquee Widget

[![npm version](https://badge.fury.io/js/crypto-marquee-widget.svg)](https://badge.fury.io/js/crypto-marquee-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![File Size](https://img.shields.io/bundlephobia/minzip/crypto-marquee-widget)](https://bundlephobia.com/package/crypto-marquee-widget)
[![Downloads](https://img.shields.io/npm/dm/crypto-marquee-widget.svg)](https://npmjs.org/package/crypto-marquee-widget)

> **A beautiful, lightweight, and customizable cryptocurrency price ticker widget for any website**

Perfect for blogs, news sites, portfolios, and any web project that wants to display live crypto prices in a sleek scrolling marquee format.

## ✨ Features

- 🔄 **Real-time prices** - Live cryptocurrency data
- 🎨 **Light & Dark themes** - Matches any website design  
- ⚡ **Lightweight** - Only ~15KB minified
- 🚀 **Fast loading** - Optimized performance
- 📱 **Responsive** - Works on all devices
- 🎛️ **Highly configurable** - Speed, count, theme, etc.
- 🔗 **SEO friendly** - Generates backlinks to your site
- 🚫 **No dependencies** - Pure vanilla JavaScript
- ♿ **Accessible** - ARIA compliant

## 🎯 Quick Start

Add this single line of HTML to your website:

```html
<div id="crypto-marquee"></div>
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js"></script>
```

**That's it!** 🎉 Your crypto ticker will automatically load and display live prices.

## 📱 Live Demo

Visit our **[interactive demo](https://www.cryptowatchnews.com/crypto-marquee-widget)** to see the widget in action and test different configurations.

## 🎨 Examples

### Default Widget
```html
<div id="crypto-marquee"></div>
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js"></script>
```

### Dark Theme
```html
<div id="crypto-marquee" data-theme="dark"></div>
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js"></script>
```

### Fast Animation
```html
<div id="crypto-marquee" data-speed="20"></div>
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js"></script>
```

### Compact Version
```html
<div id="crypto-marquee" 
     data-count="10" 
     data-show-change="false">
</div>
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js"></script>
```

## ⚙️ Configuration

Customize your widget using HTML data attributes:

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-speed` | number | `40` | Animation speed in seconds (lower = faster) |
| `data-count` | number | `15` | Number of cryptocurrencies to display |
| `data-theme` | string | `"light"` | Theme: `"light"` or `"dark"` |
| `data-show-change` | boolean | `true` | Show 24h price changes with colors |
| `data-show-powered-by` | boolean | `true` | Show "Powered by" attribution link |
| `data-api-url` | string | Auto | Custom API endpoint (advanced usage) |

### Advanced Configuration

```html
<div id="crypto-marquee" 
     data-speed="30" 
     data-count="20"
     data-theme="dark"
     data-show-change="true"
     data-show-powered-by="false">
</div>
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js"></script>
```

## 🌐 Platform Integration

### WordPress

#### Method 1: Add to theme
Add to your theme's `footer.php`:
```php
<div id="crypto-marquee" data-theme="light"></div>
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js"></script>
```

#### Method 2: Custom HTML Block
1. Edit your page/post
2. Add a "Custom HTML" block  
3. Paste the widget code

### React/Next.js

```jsx
import { useEffect } from 'react';

function CryptoMarquee({ speed = 40, theme = 'light' }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js';
    script.defer = true;
    document.body.appendChild(script);
    
    return () => document.body.removeChild(script);
  }, []);

  return <div id="crypto-marquee" data-speed={speed} data-theme={theme} />;
}
```

### Vue.js

```vue
<template>
  <div id="crypto-marquee" :data-speed="speed" :data-theme="theme"></div>
</template>

<script>
export default {
  props: ['speed', 'theme'],
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js';
    document.body.appendChild(script);
  }
}
</script>
```

### Shopify

Add to your theme's `theme.liquid` before `</body>`:

```liquid
<div id="crypto-marquee" data-count="10"></div>
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js"></script>
```

## 📦 Installation

### Via CDN (Recommended)
```html
<script src="https://www.cryptowatchnews.com/widgets/crypto-marquee-widget.js"></script>
```

### Via npm
```bash
npm install crypto-marquee-widget
```

### Download Files
Download the latest release from [GitHub Releases](https://github.com/cryptowatchnews/crypto-marquee-widget/releases)

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/cryptowatchnews/crypto-marquee-widget.git
cd crypto-marquee-widget

# Install dependencies
npm install

# Build the widget
npm run build

# Start development server
npm start
```

## 🔒 Privacy & Security

- ✅ No tracking or cookies
- ✅ No personal data collection
- ✅ HTTPS-only connections
- ✅ No external dependencies beyond our secure API
- ✅ Open source and transparent

## 🎯 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 📊 Performance

- 📏 **Size**: ~15KB minified + gzipped
- ⚡ **Load time**: <100ms
- 🔄 **Updates**: Every 30 seconds
- 💾 **Memory**: <2MB usage
- 🚀 **Hardware acceleration**: Enabled

## ❓ FAQ

**Q: Is it free to use?**  
A: Yes! Completely free for personal and commercial use.

**Q: Can I customize the styling?**  
A: Yes! Override CSS classes or use our theme system.

**Q: Does it affect SEO?**  
A: No negative impact. Actually provides beneficial backlinks.

**Q: Can I use multiple widgets on one page?**  
A: Absolutely! Just use different IDs.

**Q: What about mobile devices?**  
A: Fully responsive and touch-friendly.

## 🐛 Issues & Support

- 🐞 **Bug reports**: [GitHub Issues](https://github.com/cryptowatchnews/crypto-marquee-widget/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/cryptowatchnews/crypto-marquee-widget/discussions)
- 📧 **Email**: support@cryptowatchnews.com
- 🌐 **Website**: [cryptowatchnews.com](https://www.cryptowatchnews.com)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this widget
- Built with ❤️ by the [CryptoWatchNews](https://www.cryptowatchnews.com) team
- Cryptocurrency data provided by reliable market APIs

---

<div align="center">

**[⭐ Star us on GitHub](https://github.com/cryptowatchnews/crypto-marquee-widget)** • **[🌐 Visit our website](https://www.cryptowatchnews.com)** • **[📺 Live Demo](https://www.cryptowatchnews.com/crypto-marquee-widget)**

Made with ❤️ for the crypto community

</div>