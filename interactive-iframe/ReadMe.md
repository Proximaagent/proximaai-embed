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
<script src="https://cdn.example.com/interactiveIframeEmbed.min.js"></script>
```