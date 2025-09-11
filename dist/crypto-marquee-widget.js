/**
 * CryptoWatchNews Marquee Widget v1.0
 * Embeddable cryptocurrency price marquee for external websites
 * https://www.cryptowatchnews.com
 */

(function() {
    "use strict";

    // Configuration par défaut
    const DEFAULT_CONFIG = {
        speed: 40,
        count: 15,
        theme: "light",
        showChange: true,
        apiUrl: "https://www.cryptowatchnews.com/api/price/list",
        showPoweredBy: true
    };

    // CSS styles intégrés
    const CSS_STYLES = `
        .cwn-marquee-widget {
            width: 100%;
            background: rgba(248, 250, 252, 0.95);
            padding: 0.5rem 0;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
            font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            position: relative;
            overflow: hidden;
            contain: layout style paint;
        }
        
        .cwn-marquee-widget.dark {
            background: rgba(30, 41, 59, 0.95);
        }

        .cwn-marquee-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
        }

        .cwn-marquee-container::before,
        .cwn-marquee-container::after {
            content: "";
            position: absolute;
            top: 0;
            width: 100px;
            height: 100%;
            z-index: 2;
            pointer-events: none;
        }

        .cwn-marquee-container::before {
            left: 0;
            background: linear-gradient(
                to right,
                rgba(248, 250, 252, 0.8) 0%,
                rgba(248, 250, 252, 0.3) 70%,
                transparent 100%
            );
        }

        .cwn-marquee-container::after {
            right: 0;
            background: linear-gradient(
                to left,
                rgba(248, 250, 252, 0.8) 0%,
                rgba(248, 250, 252, 0.3) 70%,
                transparent 100%
            );
        }

        .cwn-marquee-widget.dark .cwn-marquee-container::before {
            background: linear-gradient(
                to right,
                rgba(30, 41, 59, 0.8) 0%,
                rgba(30, 41, 59, 0.3) 70%,
                transparent 100%
            );
        }

        .cwn-marquee-widget.dark .cwn-marquee-container::after {
            background: linear-gradient(
                to left,
                rgba(30, 41, 59, 0.8) 0%,
                rgba(30, 41, 59, 0.3) 70%,
                transparent 100%
            );
        }

        .cwn-marquee-content {
            display: flex;
            flex-shrink: 0;
            gap: 20px;
            animation: cwn-scroll-left linear infinite;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
        }

        .cwn-marquee-content.paused {
            animation-play-state: paused;
        }

        .cwn-marquee-items {
            flex-shrink: 0;
            display: flex;
            gap: 20px;
            align-items: center;
            min-width: max-content;
            transform: translateZ(0);
        }

        .cwn-crypto-item {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.3rem 0.6rem;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 0.3rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
            text-decoration: none;
            color: inherit;
            transition: all 0.15s ease;
            font-size: 0.8rem;
            white-space: nowrap;
        }

        .cwn-marquee-widget.dark .cwn-crypto-item {
            background: rgba(51, 65, 85, 0.95);
            color: #f1f5f9;
        }

        .cwn-crypto-item:hover {
            background: rgba(255, 255, 255, 1);
            transform: translateY(-1px);
        }

        .cwn-marquee-widget.dark .cwn-crypto-item:hover {
            background: rgba(71, 85, 105, 1);
        }

        .cwn-crypto-icon {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            flex-shrink: 0;
            object-fit: cover;
            background: #f1f5f9;
        }

        .cwn-crypto-symbol {
            font-weight: 700;
            color: #333;
        }

        .cwn-marquee-widget.dark .cwn-crypto-symbol {
            color: #f1f5f9;
        }

        .cwn-crypto-price {
            font-weight: 600;
            color: #555;
        }

        .cwn-marquee-widget.dark .cwn-crypto-price {
            color: #cbd5e1;
        }

        .cwn-crypto-change {
            font-weight: 600;
            font-size: 0.7rem;
            padding: 0.15rem 0.3rem;
            border-radius: 0.2rem;
        }

        .cwn-crypto-change.positive {
            color: #10b981;
            background: rgba(16, 185, 129, 0.1);
        }

        .cwn-crypto-change.negative {
            color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
        }

        .cwn-powered-by {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.25rem 0.5rem;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 0.3rem;
            text-decoration: none;
            color: #6b7280;
            font-size: 0.7rem;
            font-weight: 500;
            transition: all 0.15s ease;
        }

        .cwn-marquee-widget.dark .cwn-powered-by {
            background: rgba(51, 65, 85, 0.9);
            color: #9ca3af;
        }

        .cwn-powered-by:hover {
            background: rgba(255, 255, 255, 1);
            color: #4b5563;
        }

        .cwn-marquee-widget.dark .cwn-powered-by:hover {
            background: rgba(71, 85, 105, 1);
            color: #d1d5db;
        }

        .cwn-powered-by-icon {
            width: 16px;
            height: 16px;
            border-radius: 2px;
        }

        .cwn-loading {
            text-align: center;
            padding: 1rem;
            color: #6b7280;
            font-size: 0.875rem;
        }

        .cwn-marquee-widget.dark .cwn-loading {
            color: #9ca3af;
        }

        @keyframes cwn-scroll-left {
            0% {
                transform: translateX(0) translateZ(0);
            }
            100% {
                transform: translateX(calc(-25% - 5px)) translateZ(0);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .cwn-marquee-content {
                animation-duration: 2x;
            }
        }
    `;

    // Utilitaires de formatage
    function formatPrice(price) {
        if (price == null) return "$0.00";
        if (price >= 1000) {
            return `$${Number(price).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
        }
        return `$${Number(price).toFixed(price < 1 ? 4 : 2)}`;
    }

    function formatPercentage(n) {
        if (n == null || Number.isNaN(n)) return "-";
        return `${(n * 100).toFixed(2)}%`;
    }

    function createSlug(name) {
        return (name || "")
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
    }

    // Classe principale du widget
    class CryptoMarqueeWidget {
        constructor(element, config) {
            this.element = element;
            this.config = { ...DEFAULT_CONFIG, ...config };
            this.cryptoData = [];
            this.isDestroyed = false;
            
            this.init();
        }

        init() {
            this.injectStyles();
            this.render();
            this.fetchData();
        }

        injectStyles() {
            if (!document.getElementById("cwn-marquee-styles")) {
                const style = document.createElement("style");
                style.id = "cwn-marquee-styles";
                style.textContent = CSS_STYLES;
                document.head.appendChild(style);
            }
        }

        render() {
            const themeClass = this.config.theme === "dark" ? " dark" : "";
            this.element.innerHTML = `
                <div class="cwn-marquee-widget${themeClass}">
                    <div class="cwn-marquee-container">
                        <div class="cwn-marquee-content" style="animation-duration: ${this.config.speed}s;">
                            <div class="cwn-loading">Loading crypto prices...</div>
                        </div>
                    </div>
                </div>
            `;

            // Pause sur hover
            const marqueeContent = this.element.querySelector(".cwn-marquee-content");
            if (marqueeContent) {
                this.element.addEventListener("mouseenter", () => {
                    marqueeContent.classList.add("paused");
                });
                this.element.addEventListener("mouseleave", () => {
                    marqueeContent.classList.remove("paused");
                });
            }
        }

        async fetchData() {
            if (this.isDestroyed) return;

            try {
                const params = new URLSearchParams({
                    page: 1,
                    perPage: this.config.count,
                    order: "marketCapUsd",
                    dir: "desc"
                });

                const response = await fetch(`${this.config.apiUrl}?${params.toString()}`);
                if (!response.ok) throw new Error("API request failed");

                const data = await response.json();
                this.cryptoData = this.processData(data.data || []);
                this.updateContent();
            } catch (error) {
                console.error("CryptoMarqueeWidget: Error fetching data", error);
                this.showError();
            }
        }

        processData(rawData) {
            const blacklistedSymbols = ["USDT", "USDC", "USDE"];
            
            return rawData
                .filter(token => !blacklistedSymbols.includes(token.symbol?.toUpperCase()))
                .map(token => ({
                    symbol: token.symbol,
                    name: token.name,
                    price: parseFloat(token.priceUsd) || 0,
                    change: parseFloat(token.change24hPct) || 0,
                    icon: token.icon || `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons/32/color/${token.symbol?.toLowerCase()}.png`
                }));
        }

        updateContent() {
            if (this.isDestroyed || !this.cryptoData.length) return;

            const marqueeContent = this.element.querySelector(".cwn-marquee-content");
            if (!marqueeContent) return;

            // Créer 4 copies du contenu pour un défilement fluide
            const items = this.cryptoData.map(crypto => this.createCryptoItem(crypto));
            
            if (this.config.showPoweredBy) {
                items.push(this.createPoweredByItem());
            }

            const itemsHTML = items.join("");
            
            marqueeContent.innerHTML = `
                <div class="cwn-marquee-items">${itemsHTML}</div>
                <div class="cwn-marquee-items" aria-hidden="true">${itemsHTML}</div>
                <div class="cwn-marquee-items" aria-hidden="true">${itemsHTML}</div>
                <div class="cwn-marquee-items" aria-hidden="true">${itemsHTML}</div>
            `;
        }

        createCryptoItem(crypto) {
            const change = Number(crypto.change || 0);
            const positive = change >= 0;
            const slug = createSlug(crypto.name);
            const symbol = (crypto.symbol || "").toLowerCase().replace(/[^a-z0-9-]/g, "");
            const href = `https://www.cryptowatchnews.com/price/${slug}/${symbol}-usd`;

            const changeHtml = this.config.showChange ? `
                <span class="cwn-crypto-change ${positive ? "positive" : "negative"}">
                    ${positive ? "▲" : "▼"} ${positive ? "+" : ""}${formatPercentage(change)}
                </span>
            ` : "";

            return `
                <a href="${href}" class="cwn-crypto-item" target="_blank" rel="noopener">
                    <img 
                        src="${crypto.icon}" 
                        alt="${crypto.name}"
                        class="cwn-crypto-icon"
                        onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNmMWY1ZjkiLz4KPHR0ZXh0IHg9IjEyIiB5PSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiPj88L3RleHQ+Cjwvc3ZnPg=='"
                    />
                    <span class="cwn-crypto-symbol">${crypto.symbol}</span>
                    <span class="cwn-crypto-price">${formatPrice(crypto.price)}</span>
                    ${changeHtml}
                </a>
            `;
        }

        createPoweredByItem() {
            return `
                <a href="https://www.cryptowatchnews.com" class="cwn-powered-by" target="_blank" rel="noopener">
                    <img 
                        src="https://www.cryptowatchnews.com/favicon-32x32.png" 
                        alt="CryptoWatchNews"
                        class="cwn-powered-by-icon"
                        onerror="this.style.display='none'"
                    />
                    <span>Powered by CryptoWatchNews</span>
                </a>
            `;
        }

        showError() {
            const marqueeContent = this.element.querySelector(".cwn-marquee-content");
            if (marqueeContent) {
                marqueeContent.innerHTML = '<div class="cwn-loading">Unable to load crypto prices</div>';
            }
        }

        destroy() {
            this.isDestroyed = true;
            this.element.innerHTML = "";
        }
    }

    // Auto-initialisation
    function initializeWidgets() {
        const widgets = document.querySelectorAll('[id^="crypto-marquee"]');
        
        widgets.forEach(element => {
            if (element.dataset.cwnitialized) return;

            const config = {
                speed: parseInt(element.dataset.speed) || DEFAULT_CONFIG.speed,
                count: parseInt(element.dataset.count) || DEFAULT_CONFIG.count,
                theme: element.dataset.theme || DEFAULT_CONFIG.theme,
                showChange: element.dataset.showChange !== 'false',
                apiUrl: element.dataset.apiUrl || DEFAULT_CONFIG.apiUrl,
                showPoweredBy: element.dataset.showPoweredBy !== 'false'
            };

            new CryptoMarqueeWidget(element, config);
            element.dataset.cwnitialized = 'true';
        });
    }

    // Initialisation automatique
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWidgets);
    } else {
        initializeWidgets();
    }

    // Observer pour les éléments ajoutés dynamiquement
    if (window.MutationObserver) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.id && node.id.startsWith('crypto-marquee')) {
                        initializeWidgets();
                    }
                });
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // API publique
    window.CryptoMarqueeWidget = CryptoMarqueeWidget;

})();