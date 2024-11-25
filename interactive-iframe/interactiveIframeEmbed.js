(function () {
    const script = document.currentScript; // Get the script element
    const widgetText = script.dataset.widgetText || "Open";
    const iframeSrc =
      script.dataset.iframeSrc || "https://interactive.proximaai.co/home";
    const widgetStyle = script.dataset.widgetStyle
      ? JSON.parse(script.dataset.widgetStyle)
      : {};
    const iframeContainerStyle = script.dataset.iframeContainerStyle
      ? JSON.parse(script.dataset.iframeContainerStyle)
      : {};
    const closeButtonStyle = script.dataset.closeButtonStyle
      ? JSON.parse(script.dataset.closeButtonStyle)
      : {};

    console.log("Widget script loaded with custom data!");

    // Default styles
    const defaultStyles = `
    #custom-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background-color: #000;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        z-index: 9999;
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
        border: 1px solid #ccc;
        background-color: #fff;
    }
    #custom-iframe {
        flex-grow: 1;
        border: none;
    }
    #close-btn {
        height: 40px;
        background-color: #000;
        color: #fff;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
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
        #close-btn {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 60px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            border-radius: 5px;
        }
    }
    @media (min-width: 769px) {
        #custom-iframe-container {
            border-radius: 20px;
            overflow: hidden; 
        }
    }
`;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = defaultStyles;
    document.head.appendChild(styleSheet);

    const widget = document.createElement("div");
    widget.id = "custom-widget";
    widget.innerText = widgetText;

    // Apply custom widget styles
    Object.assign(widget.style, widgetStyle);

    const iframeContainer = document.createElement("div");
    iframeContainer.id = "custom-iframe-container";

    // Apply custom iframe container styles
    Object.assign(iframeContainer.style, iframeContainerStyle);

    const closeButton = document.createElement("div");
    closeButton.id = "close-btn";
    closeButton.innerText = "Close";

    // Apply custom close button styles
    Object.assign(closeButton.style, closeButtonStyle);

    const iframe = document.createElement("iframe");
    iframe.id = "custom-iframe";
    iframe.src = iframeSrc;

    iframeContainer.appendChild(closeButton);
    iframeContainer.appendChild(iframe);
    document.body.appendChild(widget);
    document.body.appendChild(iframeContainer);

    widget.onclick = () => {
      widget.style.display = "none";
      iframeContainer.style.display = "flex";
    };

    closeButton.onclick = () => {
      iframeContainer.style.display = "none";
      widget.style.display = "flex";
    };
  })();