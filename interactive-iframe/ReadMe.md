# Iframe Injection Documentation

## Overview

This documentation explains how the iframe injection is implemented in the `interactiveIframeEmbed.js` file, how it is minified using the Terser tool, and how it is delivered over a CDN.

## File Structure

## Iframe Injection Implementation

### `interactiveIframeEmbed.js`

The `interactiveIframeEmbed.js` file contains the code to inject a custom widget and an iframe into the webpage. Below are the key parts of the implementation:

1. **Self-Invoking Function**: The script is wrapped in a self-invoking function to ensure it runs as soon as it is loaded.

## Delivery over CDN

Once the interactiveIframeEmbed.min.js file is generated, it can be uploaded to a CDN for delivery. The CDN URL can then be used to include the script in webpages. A couple of CDNS are available for free but some sites like chatgpt.com wont allow some origins

```js
<script
  id="proximaai-embed-script"
  src="https://cdn.jsdelivr.net/gh/Proximaagent/proximaai-embed@v1.0.4-beta/interactive-iframe/interactiveIframeEmbed.min.js"
  data-widget-text="Open"
  data-iframe-src="https://interactive.proximaai.co/?auth_uri=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzM3NzExNDQzfQ.PgZ8az8NJ_L-V8rwSLh4L1eYzEbpSb1i2Dg1WRnjaqU&is_auth=false&theme=light&color=turquoise"
  data-widget-style='{"backgroundColor":"#2daab1","color":"white"}'
  data-iframe-container-style='{"borderColor":"#2daab1"}'
  data-close-button-style='{"backgroundColor":"#2daab1"}'
  data-icon-color="#2daab1"> // Pass color or a valid color code
/>
// The iframe is now fully customizable
```
