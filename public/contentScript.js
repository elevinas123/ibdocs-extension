(function() {
    if (!history.state || !history.state.buttonsAdded) {
        const tailwindLink = document.createElement('link');
        tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
        tailwindLink.type = 'text/css';
        tailwindLink.rel = 'stylesheet';
        document.head.appendChild(tailwindLink);


        const observer = new MutationObserver((mutations, observer) => {
            const listItems = document.querySelectorAll('#items > li.item');
            if (listItems.length > 0) {
                listItems.forEach((item, index) => {
                    const itemName = item.querySelector('.label').innerText.trim();
                    chrome.storage.local.get([itemName], function(result) {
                        const isItemStored = result.hasOwnProperty(itemName);
                        // Create a new button element
                        const button = document.createElement('button');
                        button.className = `mr-96 ${isItemStored ? 'border-4 border-green-400' : 'border-4 border-gray-700'} p-1 flex flex-row justify-center items-center text-center w-6 h-6 min-h-0 min-w-0 hover:bg-opacity-75 right-0 z-20 rounded-full border-black text-white font-bold rounded cursor-pointer`;
                        item.className = "item file flex flex-row justify-between items-center ";

                        // Create SVG and path for the icon
                        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        icon.setAttribute('viewBox', '0 0 448 512');
                        icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                        icon.classList.add("iconClass");
                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        path.setAttribute('d', "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z");
                        path.setAttribute('fill', isItemStored ? 'green' : 'red');
                        icon.appendChild(path);

                        button.appendChild(icon);

                        // Add an event listener to the button
                        button.addEventListener('click', function() {
                            chrome.storage.local.get([itemName], function(result) {
                                const isItemStored = result.hasOwnProperty(itemName);
                                console.log(`${itemName} clicked!`);
                                if (isItemStored) {
                                    // Remove itemName from storage
                                    chrome.storage.local.remove(itemName, function() {
                                        console.log(`${itemName} is removed from storage`);
                                        // Change icon color to red
                                        path.setAttribute('fill', 'red');
                                        // Change button background to red
                                        button.className = `mr-96 border-4 border-gray-700 p-1 flex flex-row justify-center items-center text-center w-6 h-6 min-h-0 min-w-0 hover:bg-opacity-75 right-0 z-20 rounded-full border-black text-white font-bold rounded cursor-pointer`;
                                    });
                                } else {
                                    // Store itemName in chrome.storage
                                    const data = {};
                                    data[itemName] = true;
                                    chrome.storage.local.set(data, function() {
                                        console.log(`${itemName} is saved in storage`);
                                        // Change icon color to green
                                        path.setAttribute('fill', 'green');
                                        // Change button background to green
                                        button.className = `mr-96 border-4 border-green-400 p-1 flex flex-row justify-center items-center text-center w-6 h-6 min-h-0 min-w-0 hover:border-opacity-75 right-0 z-20 rounded-full border-black text-white font-bold rounded cursor-pointer`;
                                    });
                                }
                            })
                        });

                        // Append the button to the list item
                        item.appendChild(button);
                    });
                });

                observer.disconnect(); // Stop observing
            }
        });


        observer.observe(document.body, { childList: true, subtree: true });
        history.replaceState({ ...history.state, buttonsAdded: true }, '');
    }
})()