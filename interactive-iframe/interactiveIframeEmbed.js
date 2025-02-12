(function () {
  const script = document.currentScript;
  const iframeSrc =
    script.dataset.iframeSrc || 'https://interactive.proximaai.co/home';
  const widgetStyle = script.dataset.widgetStyle
    ? JSON.parse(script.dataset.widgetStyle)
    : {};
  const iframeContainerStyle = script.dataset.iframeContainerStyle
    ? JSON.parse(script.dataset.iframeContainerStyle)
    : {};
  const closeButtonStyle = script.dataset.closeButtonStyle
    ? JSON.parse(script.dataset.closeButtonStyle)
    : {};
  const iconColor = script.dataset.iconColor || '#2daab1';
  const tenantName = script.dataset.tenantName || 'Proxima AI';
  const appId = script.dataset.appId || '';
  const tenantId = script.dataset.tenantId || '';

  // Enhanced styles including notification
  const defaultStyles = `
#custom-widget {
position: fixed;
bottom: 20px;
right: 20px;
width: 60px;
height: 60px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
cursor: pointer;
z-index: 9999;
background: ${widgetStyle.background || '#000'};
}

#notification-container {
position: fixed;
bottom: 20px;
right: 90px;
height: 60px;
background: white;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
display: flex;
align-items: center;
padding: 0 15px;
transform: translateX(calc(100% + 90px));
opacity: 0;
pointer-events: none;
transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
z-index: 9998;
border: 1px solid ${iconColor};
}

#notification-container.show {
transform: translateX(0);
opacity: 1;
pointer-events: auto;
}

#notification-content {
margin-right: 15px;
color: #333;
font-size: 14px;
}

#notification-close {
cursor: pointer;
color: ${iconColor};
font-size: 20px;
padding: 5px;
display: flex;
align-items: center;
justify-content: center;
transition: transform 0.2s ease;
}

#notification-close:hover {
transform: scale(1.1);
}

#custom-iframe-container {
position: fixed;
bottom: 20px;
right: 20px;
width: 500px;
height: 96vh;
display: none;
flex-direction: column;
z-index: 9999;
border: 1px solid ${iframeContainerStyle.borderColor || '#ccc'};
background-color: ${iframeContainerStyle.backgroundColor || '#fff'};
}
#custom-iframe {
flex-grow: 1;
border: none;
}
#close-btn {
height: 40px;
color: ${closeButtonStyle.color || iconColor};
cursor: pointer;
text-align: center;
line-height: 40px;
display: flex;
justify-content: space-between;
padding: 0 10px;
}
@media (max-width: 768px) {
#custom-iframe-container {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border: none;
}
#notification-container {
  right: 70px;
  max-width: calc(100% - 100px);
}
}
@media (min-width: 769px) {
#custom-iframe-container {
  border-radius: 20px;
  overflow: hidden; 
}
}
`;

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = defaultStyles;
  document.head.appendChild(styleSheet);

  // Notification timing management
  const NOTIFICATION_INTERVAL = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
  const STORAGE_KEY = 'lastNotificationTime';

  function shouldShowNotification() {
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (!lastShown) return true;

    const timeSinceLastShown = Date.now() - parseInt(lastShown);
    return timeSinceLastShown >= NOTIFICATION_INTERVAL;
  }

  function updateLastShownTime() {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }

  // Create notification container
  const notificationContainer = document.createElement('div');
  notificationContainer.id = 'notification-container';

  const notificationContent = document.createElement('div');
  notificationContent.id = 'notification-content';
  notificationContent.textContent = `Hello I'm ${tenantName} assistant!`;

  const notificationClose = document.createElement('div');
  notificationClose.id = 'notification-close';
  notificationClose.innerHTML = '&times;';

  notificationContainer.appendChild(notificationContent);
  notificationContainer.appendChild(notificationClose);

  // Create widget and other elements
  const widget = document.createElement('div');
  widget.id = 'custom-widget';

  const svg = `
<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.697 400">
<defs>
  <linearGradient id="a" x1="330.454" y1="326.319" x2="77.231" y2="58.335" gradientUnits="userSpaceOnUse">
    <stop offset=".604" stop-color="#2cabb1"/>
    <stop offset="1" stop-color="#00e0c1"/>
  </linearGradient>
</defs>
<circle cx="117.252" cy="148.157" r="31.597" fill="white"/>
<circle cx="241.067" cy="148.157" r="31.597" fill="white"/>
<path d="M64.328 223.757q.938 18.606 1.873 37.214c8.95 8.51 51.4 47.042 117.489 47.278 68.522.244 112.188-40.857 120.572-49.071v-36.124c-12.127 9.809-55.472 42.417-119.863 42.6-64.362.18-107.883-32.154-120.071-41.897" fill="white"/>
<path d="M383.921 298.622V77.036A77.263 77.263 0 0 0 306.885 0H92.3a77.26 77.26 0 0 0-77.037 77.036v221.586a76.8 76.8 0 0 0 22.63 54.407c19.165 19.165 44.442 22.527 54.406 22.629h.057a2706 2706 0 0 0 50.458 0L136.962 400l95.027-24.342h74.9a83.7 83.7 0 0 0 43.834-12.184 73.3 73.3 0 0 0 16.786-14.03c16.116-18.771 16.669-42.059 16.412-50.822M256.33 116.559a31.6 31.6 0 1 1-31.6 31.6 31.6 31.6 0 0 1 31.6-31.6m-123.815 0a31.6 31.6 0 1 1-31.6 31.6 31.6 31.6 0 0 1 31.6-31.6m187.01 142.619c-8.384 8.214-52.05 49.315-120.572 49.071-66.089-.236-108.539-38.768-117.489-47.278l-1.873-37.214c12.188 9.74 55.705 42.077 120.071 41.895 64.391-.181 107.736-32.789 119.863-42.6Z" transform="translate(-15.263)" fill="${iconColor}"/>
</svg>
`;

  widget.innerHTML = svg;
  Object.assign(widget.style, widgetStyle);

  const iframeContainer = document.createElement('div');
  iframeContainer.id = 'custom-iframe-container';
  Object.assign(iframeContainer.style, iframeContainerStyle);

  const closeButton = document.createElement('div');
  closeButton.id = 'close-btn';
  const dateSpan = document.createElement('span');
  dateSpan.innerText = new Date().toLocaleDateString();
  const closeIcon = document.createElement('span');
  closeIcon.innerHTML = '&times;';
  closeButton.appendChild(dateSpan);
  closeButton.appendChild(closeIcon);
  Object.assign(closeButton.style, closeButtonStyle);

  const iframe = document.createElement('iframe');
  iframe.id = 'custom-iframe';
  iframe.src = iframeSrc;

  iframeContainer.appendChild(closeButton);
  iframeContainer.appendChild(iframe);

  // Show notification function
  function showNotification() {
    if (shouldShowNotification()) {
      notificationContainer.classList.add('show');
      updateLastShownTime();
    }
  }

  // Hide notification function with animation
  function hideNotification() {
    notificationContainer.classList.remove('show');
  }

  // Event listeners
  widget.onclick = () => {
    widget.style.display = 'none';
    iframeContainer.style.display = 'flex';
    hideNotification();
  };

  closeButton.onclick = () => {
    iframeContainer.style.display = 'none';
    widget.style.display = 'flex';
  };

  notificationClose.onclick = (e) => {
    e.stopPropagation();
    hideNotification();
  };

  notificationContainer.onclick = () => {
    widget.click();
  };

  // Check and show notification on load
  showNotification();

  // Function to clean up iframe elements
  function cleanupIframeElements() {
    const existingWidget = document.getElementById('custom-widget');
    const existingContainer = document.getElementById(
      'custom-iframe-container'
    );
    const existingNotification = document.getElementById(
      'notification-container'
    );

    if (existingWidget) existingWidget.remove();
    if (existingContainer) existingContainer.remove();
    if (existingNotification) existingNotification.remove();
  }

  const VALID_PLATFORMS = ['Portal', 'CIXS', 'CRM'];

  // Function to check subscription and mount iframe
  async function mountIframeIfSubscribed() {
    const isSubscribed = await checkTenantPlatformSubscription(
      iframeSrc,
      appId
    );
    if (isSubscribed) {
      document.body.appendChild(widget);
      document.body.appendChild(iframeContainer);
      document.body.appendChild(notificationContainer);
    } else {
      console.log('User does not have an active subscription.');
      cleanupIframeElements(); // Clean up any existing elements
    }
  }

  // Call the function to check subscription and mount iframe
  mountIframeIfSubscribed();

  // Your existing checkTenantPlatformSubscription function
  async function checkTenantPlatformSubscription(iframeSrc, appId) {
    try {
      // Validate platform name
      if (!VALID_PLATFORMS.includes(appId)) {
        console.error(
          `Invalid platform name: ${appId}. Must be one of: ${VALID_PLATFORMS.join(
            ', '
          )}`
        );
        return false;
      }

      // Parse auth_uri from iframeSrc
      const url = new URL(iframeSrc);
      const authToken = url.searchParams.get('auth_uri');

      // Include tenantId and appId in the API request
      const apiUrl = new URL(
        'https://core.proximaai.co/api/tenantmanagement/tenantdetails/'
      );
      apiUrl.searchParams.append('token', authToken || '');
      apiUrl.searchParams.append('platform', appId);
      apiUrl.searchParams.append('tenant_id', tenantId);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) return false;

      const data = await response.json();
      console.log('Subscription data:', data);

      // Check if subscription_platforms exists and is an array
      if (!Array.isArray(data.subscription_platforms)) {
        console.error('Invalid subscription data format');
        return false;
      }

      // Find the platform subscription and check if it's active
      const platformSubscription = data.subscription_platforms.find(
        (platform) => platform.platform_name === appId
      );

      if (!platformSubscription) {
        console.log(`No subscription found for platform: ${appId}`);
        return false;
      }

      return platformSubscription.is_active === true;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  }
})();
