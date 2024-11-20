(function () {
    console.log("Proxima Widget injected!");
    // Dynamically load Tailwind CDN
    const tailwindLink = document.createElement("link");
    tailwindLink.href = "https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css";
    tailwindLink.rel = "stylesheet";
    document.head.appendChild(tailwindLink);

    // Wait until the Tailwind CSS is loaded before creating the elements
    tailwindLink.onload = () => {
        // Create the widget element
        const widget = document.createElement("div");
        widget.id = "custom-widget";
        widget.classList.add(
            "fixed", "bottom-5", "right-5", "w-16", "h-16", "bg-black", "text-white", "flex", "justify-center", 
            "items-center", "rounded-full", "cursor-pointer", "z-50"
        );
        widget.innerText = "Open";

        // Create the iframe container
        const iframeContainer = document.createElement("div");
        iframeContainer.id = "custom-iframe-container";
        iframeContainer.classList.add(
            "fixed", "bottom-5", "right-5", "w-[500px]", "h-[90vh]", "flex", "flex-col", "hidden", 
            "z-50", "border", "border-gray-300", "bg-white"
        );

        // Create the close button
        const closeButton = document.createElement("div");
        closeButton.id = "close-btn";
        closeButton.classList.add(
            "h-10", "bg-black", "text-white", "cursor-pointer", "text-center", "leading-10"
        );
        closeButton.innerText = "Close";

        // Create the iframe
        const iframe = document.createElement("iframe");
        iframe.id = "custom-iframe";
        iframe.classList.add("flex-grow", "border-none");
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

        // Media query for responsiveness
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        if (mediaQuery.matches) {
            iframeContainer.classList.add("w-full", "h-full", "top-0", "left-0", "right-0", "bottom-0", "border-none");
            closeButton.classList.add("absolute", "top-2", "left-2", "w-16", "h-8", "text-sm", "leading-8");
        }
    };
})();
