<?php
/**
 * CryptoMarquee Widget - WordPress Integration Examples
 * 
 * This file contains various methods to integrate the CryptoMarquee Widget
 * into WordPress websites.
 */

// Method 1: Simple function to add widget to footer
function add_crypto_marquee_to_footer() {
    if (!is_admin()) {
        ?>
        <!-- CryptoMarquee Widget -->
        <div id="crypto-marquee" data-theme="light" data-count="15"></div>
        <script src="https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js"></script>
        <?php
    }
}
add_action('wp_footer', 'add_crypto_marquee_to_footer');

// Method 2: Shortcode implementation
function crypto_marquee_shortcode($atts) {
    // Parse attributes with defaults
    $attributes = shortcode_atts(array(
        'speed' => '40',
        'count' => '15',
        'theme' => 'light',
        'show_change' => 'true',
        'show_powered_by' => 'true',
        'id' => 'crypto-marquee-' . uniqid()
    ), $atts);
    
    // Generate unique ID for this widget instance
    $widget_id = sanitize_html_class($attributes['id']);
    
    // Build the widget HTML
    $widget_html = sprintf(
        '<div id="%s" data-speed="%s" data-count="%s" data-theme="%s" data-show-change="%s" data-show-powered-by="%s"></div>',
        esc_attr($widget_id),
        esc_attr($attributes['speed']),
        esc_attr($attributes['count']),
        esc_attr($attributes['theme']),
        esc_attr($attributes['show_change']),
        esc_attr($attributes['show_powered_by'])
    );
    
    // Add script only once per page
    static $script_added = false;
    $script_html = '';
    
    if (!$script_added) {
        $script_html = '<script>
            if (!document.getElementById("cwn-widget-script")) {
                var script = document.createElement("script");
                script.id = "cwn-widget-script";
                script.src = "https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js";
                script.defer = true;
                document.head.appendChild(script);
            }
        </script>';
        $script_added = true;
    }
    
    return $widget_html . $script_html;
}
add_shortcode('crypto_marquee', 'crypto_marquee_shortcode');

// Method 3: Widget class for WordPress dashboard
class CryptoMarquee_Widget extends WP_Widget {
    
    public function __construct() {
        parent::__construct(
            'crypto_marquee_widget',
            'CryptoMarquee Widget',
            array(
                'description' => 'Display live cryptocurrency prices in a scrolling marquee format.',
                'classname' => 'crypto-marquee-widget-wrapper'
            )
        );
    }
    
    // Widget frontend display
    public function widget($args, $instance) {
        echo $args['before_widget'];
        
        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }
        
        $speed = !empty($instance['speed']) ? $instance['speed'] : '40';
        $count = !empty($instance['count']) ? $instance['count'] : '15';
        $theme = !empty($instance['theme']) ? $instance['theme'] : 'light';
        $show_change = !empty($instance['show_change']) ? 'true' : 'false';
        
        $widget_id = 'crypto-marquee-widget-' . $this->id;
        
        echo sprintf(
            '<div id="%s" data-speed="%s" data-count="%s" data-theme="%s" data-show-change="%s"></div>',
            esc_attr($widget_id),
            esc_attr($speed),
            esc_attr($count),
            esc_attr($theme),
            esc_attr($show_change)
        );
        
        // Add script
        echo '<script>
            if (!document.getElementById("cwn-widget-script")) {
                var script = document.createElement("script");
                script.id = "cwn-widget-script";
                script.src = "https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js";
                script.defer = true;
                document.head.appendChild(script);
            }
        </script>';
        
        echo $args['after_widget'];
    }
    
    // Widget backend form
    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : '';
        $speed = !empty($instance['speed']) ? $instance['speed'] : '40';
        $count = !empty($instance['count']) ? $instance['count'] : '15';
        $theme = !empty($instance['theme']) ? $instance['theme'] : 'light';
        $show_change = !empty($instance['show_change']) ? $instance['show_change'] : true;
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>">Title:</label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" 
                   name="<?php echo esc_attr($this->get_field_name('title')); ?>" 
                   type="text" value="<?php echo esc_attr($title); ?>">
        </p>
        
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('speed')); ?>">Animation Speed (seconds):</label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('speed')); ?>" 
                   name="<?php echo esc_attr($this->get_field_name('speed')); ?>" 
                   type="number" min="10" max="100" value="<?php echo esc_attr($speed); ?>">
        </p>
        
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('count')); ?>">Number of Cryptocurrencies:</label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('count')); ?>" 
                   name="<?php echo esc_attr($this->get_field_name('count')); ?>" 
                   type="number" min="1" max="50" value="<?php echo esc_attr($count); ?>">
        </p>
        
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('theme')); ?>">Theme:</label>
            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('theme')); ?>" 
                    name="<?php echo esc_attr($this->get_field_name('theme')); ?>">
                <option value="light" <?php selected($theme, 'light'); ?>>Light</option>
                <option value="dark" <?php selected($theme, 'dark'); ?>>Dark</option>
            </select>
        </p>
        
        <p>
            <input class="checkbox" type="checkbox" <?php checked($show_change); ?> 
                   id="<?php echo esc_attr($this->get_field_id('show_change')); ?>" 
                   name="<?php echo esc_attr($this->get_field_name('show_change')); ?>" />
            <label for="<?php echo esc_attr($this->get_field_id('show_change')); ?>">Show price changes</label>
        </p>
        <?php
    }
    
    // Widget settings update
    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        $instance['speed'] = (!empty($new_instance['speed'])) ? intval($new_instance['speed']) : 40;
        $instance['count'] = (!empty($new_instance['count'])) ? intval($new_instance['count']) : 15;
        $instance['theme'] = (!empty($new_instance['theme'])) ? sanitize_text_field($new_instance['theme']) : 'light';
        $instance['show_change'] = (!empty($new_instance['show_change'])) ? true : false;
        
        return $instance;
    }
}

// Register the widget
function register_crypto_marquee_widget() {
    register_widget('CryptoMarquee_Widget');
}
add_action('widgets_init', 'register_crypto_marquee_widget');

// Method 4: Gutenberg block (basic example)
function crypto_marquee_block_init() {
    // Register the block
    wp_register_script(
        'crypto-marquee-block-editor',
        plugin_dir_url(__FILE__) . 'block-editor.js',
        array('wp-blocks', 'wp-element', 'wp-editor'),
        '1.0.0'
    );
    
    register_block_type('crypto-marquee/widget', array(
        'editor_script' => 'crypto-marquee-block-editor',
        'render_callback' => 'crypto_marquee_block_render',
    ));
}
add_action('init', 'crypto_marquee_block_init');

function crypto_marquee_block_render($attributes) {
    $speed = isset($attributes['speed']) ? $attributes['speed'] : 40;
    $count = isset($attributes['count']) ? $attributes['count'] : 15;
    $theme = isset($attributes['theme']) ? $attributes['theme'] : 'light';
    
    $widget_id = 'crypto-marquee-block-' . uniqid();
    
    return sprintf(
        '<div id="%s" data-speed="%s" data-count="%s" data-theme="%s"></div>
        <script>
            if (!document.getElementById("cwn-widget-script")) {
                var script = document.createElement("script");
                script.id = "cwn-widget-script";
                script.src = "https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js";
                document.head.appendChild(script);
            }
        </script>',
        esc_attr($widget_id),
        esc_attr($speed),
        esc_attr($count),
        esc_attr($theme)
    );
}

// Method 5: Admin settings page
function crypto_marquee_admin_menu() {
    add_options_page(
        'CryptoMarquee Settings',
        'CryptoMarquee',
        'manage_options',
        'crypto-marquee-settings',
        'crypto_marquee_settings_page'
    );
}
add_action('admin_menu', 'crypto_marquee_admin_menu');

function crypto_marquee_settings_page() {
    ?>
    <div class="wrap">
        <h1>CryptoMarquee Widget Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('crypto_marquee_settings');
            do_settings_sections('crypto_marquee_settings');
            ?>
            <table class="form-table">
                <tr>
                    <th scope="row">Default Speed</th>
                    <td>
                        <input type="number" name="crypto_marquee_speed" 
                               value="<?php echo esc_attr(get_option('crypto_marquee_speed', 40)); ?>" 
                               min="10" max="100" />
                        <p class="description">Animation speed in seconds (lower = faster)</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Default Count</th>
                    <td>
                        <input type="number" name="crypto_marquee_count" 
                               value="<?php echo esc_attr(get_option('crypto_marquee_count', 15)); ?>" 
                               min="1" max="50" />
                        <p class="description">Number of cryptocurrencies to display</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Default Theme</th>
                    <td>
                        <select name="crypto_marquee_theme">
                            <option value="light" <?php selected(get_option('crypto_marquee_theme', 'light'), 'light'); ?>>Light</option>
                            <option value="dark" <?php selected(get_option('crypto_marquee_theme', 'light'), 'dark'); ?>>Dark</option>
                        </select>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
        
        <div style="margin-top: 40px; padding: 20px; background: #f9f9f9; border-radius: 5px;">
            <h3>Usage Examples</h3>
            <p><strong>Shortcode:</strong> <code>[crypto_marquee]</code></p>
            <p><strong>With options:</strong> <code>[crypto_marquee speed="30" count="10" theme="dark"]</code></p>
            <p><strong>In PHP:</strong> <code>&lt;?php echo do_shortcode('[crypto_marquee]'); ?&gt;</code></p>
        </div>
    </div>
    <?php
}

// Register settings
function crypto_marquee_admin_init() {
    register_setting('crypto_marquee_settings', 'crypto_marquee_speed');
    register_setting('crypto_marquee_settings', 'crypto_marquee_count');
    register_setting('crypto_marquee_settings', 'crypto_marquee_theme');
}
add_action('admin_init', 'crypto_marquee_admin_init');

// Method 6: Template function for theme developers
function crypto_marquee_display($args = array()) {
    $defaults = array(
        'speed' => get_option('crypto_marquee_speed', 40),
        'count' => get_option('crypto_marquee_count', 15),
        'theme' => get_option('crypto_marquee_theme', 'light'),
        'show_change' => true,
        'show_powered_by' => true,
        'id' => 'crypto-marquee-' . uniqid()
    );
    
    $settings = wp_parse_args($args, $defaults);
    
    printf(
        '<div id="%s" data-speed="%s" data-count="%s" data-theme="%s" data-show-change="%s" data-show-powered-by="%s"></div>',
        esc_attr($settings['id']),
        esc_attr($settings['speed']),
        esc_attr($settings['count']),
        esc_attr($settings['theme']),
        $settings['show_change'] ? 'true' : 'false',
        $settings['show_powered_by'] ? 'true' : 'false'
    );
    
    // Add script
    static $script_added = false;
    if (!$script_added) {
        echo '<script>
            if (!document.getElementById("cwn-widget-script")) {
                var script = document.createElement("script");
                script.id = "cwn-widget-script";
                script.src = "https://cdn.jsdelivr.net/npm/crypto-marquee-widget@latest/dist/crypto-marquee-widget.min.js";
                script.defer = true;
                document.head.appendChild(script);
            }
        </script>';
        $script_added = true;
    }
}

/*
USAGE EXAMPLES:

1. Add to functions.php to show in footer:
   add_action('wp_footer', 'add_crypto_marquee_to_footer');

2. Use shortcode in posts/pages:
   [crypto_marquee]
   [crypto_marquee speed="30" theme="dark" count="10"]

3. Use in theme templates:
   <?php crypto_marquee_display(); ?>
   <?php crypto_marquee_display(array('theme' => 'dark', 'speed' => 25)); ?>

4. Add as widget in WordPress admin:
   Go to Appearance > Widgets and add "CryptoMarquee Widget"

5. Use in Gutenberg editor:
   Add "CryptoMarquee Widget" block (if block is implemented)
*/
?>