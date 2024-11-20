(function () {
    console.log("Widget script loaded!");

    // This is a self-invoking function that will run as soon as the script is loaded
console.log("This is a self-invoking function that will run as soon as the script is loaded")
    // Styles for the widget and iframe
    const styles = `
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
        height: 98vh;
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
        }
    }
    @media (min-width: 769px) {
        #custom-iframe-container {
            border-radius: 20px; /* Add border-radius for larger screens */
            overflow: hidden; /* Prevent content overflow */
        }
    }
`;

    // Inject styles into the page
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Create the widget element
    const widget = document.createElement("div");
    widget.id = "custom-widget";
    widget.innerText = "Open";

    // Create the iframe container
    const iframeContainer = document.createElement("div");
    iframeContainer.id = "custom-iframe-container";

    // Create the close button
    const closeButton = document.createElement("div");
    closeButton.id = "close-btn";
    closeButton.innerText = "Close";

    // Create the iframe
    const iframe = document.createElement("iframe");
    iframe.id = "custom-iframe";
    iframe.src = "https://interactive.proximaai.co/home";

    // Append elements
    iframeContainer.appendChild(closeButton);
    iframeContainer.appendChild(iframe);
    document.body.appendChild(widget);
    document.body.appendChild(iframeContainer);

    // Add click event to widget to toggle iframe
    widget.onclick = () => {
        widget.style.display = "none"; // Hide widget
        iframeContainer.style.display = "flex"; // Show iframe
    };

    // Add click event to close button to collapse iframe
    closeButton.onclick = () => {
        iframeContainer.style.display = "none"; // Hide iframe
        widget.style.display = "flex"; // Show widget
    };
})();