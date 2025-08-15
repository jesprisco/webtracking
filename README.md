# Web Tracking Test Site

This repository contains standardized web tracking test pages for testing Informz web tracking functionality across different brands and environments.

## Overview

The site provides a centralized location for testing web tracking implementations across multiple brands, with standardized layouts and consistent tracking code structure.

## Structure

### Main Pages
- **`index.html`** - Main navigation page with links to all brand test pages
- **`styles.css`** - Standardized black and white styling for all pages

### Brand Test Pages

#### Development Environment
- **`webtracking43100.html`** - Brand 43100 (RC Environment)
- **`42986.html`** - Brand 42986 (RC Environment)  
- **`2590.html`** - Brand 2590 (Dev2 Environment)
- **`2728.html`** - Brand 2728 (Dev2 Environment)
- **`43013.html`** - Brand 43013 (RC Environment)
- **`43188.html`** - Brand 43188 (RC Environment)
- **`2675.html`** - Brand 2675 (Dev2 Environment)
- **`43286.html`** - Brand 43286 (RC Environment)

#### Production Environment
- **`1551.html`** - Brand 1551 (Production Environment)
- **`2969.html`** - Brand 2969 (Production Environment)
- **`30863.html`** - Brand 30863 (Production Environment)
- **`40584.html`** - Brand 40584 (Production Environment)
- **`5333.html`** - Brand 5333 (Production Environment)

## Standardization Features

### HTML Structure
- **HTML5 compliant** with proper DOCTYPE and meta tags
- **Responsive design** with mobile-friendly viewport settings
- **Semantic HTML** with proper heading hierarchy and structure
- **Accessibility** improvements with proper language attributes

### Tracking Code
- **Consistent formatting** with proper indentation and spacing
- **Environment detection** automatically determines RC vs Production CDN
- **Standardized functions** for testing different tracking events
- **Clean code structure** with proper comments and organization

### Styling
- **Black and white theme** as per requirements
- **Modern CSS** with CSS Grid and Flexbox layouts
- **Responsive design** that works on all device sizes
- **Consistent branding** across all pages
- **Professional appearance** suitable for testing environments

## Testing Capabilities

Each brand page includes standardized test buttons for:

1. **Whitepaper Download Tracking** - Tests `trackStructEvent` with download events
2. **Video View Tracking** - Tests `trackStructEvent` with video start events  
3. **Website Search Tracking** - Tests `trackStructEvent` with search events
4. **Product Purchase Tracking** - Tests `addItem` and `trackTrans` for e-commerce

## Environment Detection

The system automatically detects the environment based on the collector URL:
- **Dev2**: Contains "dev2" in collector URL
- **RC**: Contains "rc" or "informzrc" in collector URL  
- **Production**: All other environments

## CDN Configuration

- **RC Environment**: Uses `https://cdn.informzrc.net/web_trk/sp.js`
- **Production Environment**: Uses `https://cdn.informz.net/web_trk/sp.js`

## Adding New Brands

To add a new brand test page:

1. Fork this repository
2. Create a new file named `[brandid].html`
3. Copy the tracking code from your brand's web tracking instructions
4. Replace `openInformzAlertDialog` with `alert` if present
5. Commit your changes
6. Update `index.html` to include a link to your new page
7. Create a pull request

## File Organization

```
webtracking/
├── index.html              # Main navigation page
├── styles.css              # Standardized styling
├── README.md               # This documentation
├── web_trk/                # Tracking script files
│   └── sp.js              # Snowplow tracking script
└── [brandid].html         # Individual brand test pages
```

## Browser Compatibility

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile devices** (iOS Safari, Chrome Mobile)
- **Responsive design** adapts to all screen sizes

## Testing Notes

- All pages include proper error handling for tracking functions
- Test buttons provide immediate feedback via alerts
- Tracking events are logged to the browser console for debugging
- Each page maintains its unique brand configuration while sharing standardized structure

## Maintenance

- **Regular updates** to tracking code as needed
- **Environment validation** to ensure proper CDN usage
- **Code quality** maintained through consistent formatting standards
- **Documentation** updated with any structural changes

## Support

For questions or issues with the web tracking test site, please contact the development team or create an issue in the repository.
