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
  src="https://cdn.jsdelivr.net/gh/Proximaagent/proximaai-embed@v1.1.6-beta/interactive-iframe/interactiveIframeEmbed.min.js"
  data-iframe-src="https://iframe.proximaai.co/?auth_uri=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZXhwIjoxNzU0MDU0NzQ2fQ.BP3xpdlr9JSdJMj0LEyzbIlKphW-x_7AaKscUDW_k5M&is_auth=false&theme=light&color=red"
  data-iframe-container-style='{"borderColor":"#FE0182"}'
  data-close-button-style='{"backgroundColor":"#FE0182","color":"#FFFFFF"}'
  data-icon-color="#FE0182"
  data-tenantId="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZXhwIjoxNzU0MDU0NzQ2fQ.BP3xpdlr9JSdJMj0LEyzbIlKphW-x_7AaKscUDW_k5M" // the auth uri identifying each tenant.
  data-appId="CIXS"
/>
// The iframe is now fully customizable
```

Authors: [ M.I.Titus ]
