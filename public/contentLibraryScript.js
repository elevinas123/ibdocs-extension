(function() {
    console.log("sitas cia gerai bus turetuveikt")
    
        console.log("praejo history")
        

        console.log("cia")
            const listItems = document.querySelectorAll('tbody > tr');
            console.log("listItems", listItems)
            if (listItems.length > 0) {
                listItems.forEach((item, index) => {
                    const linkElement = item.querySelector('td a');
                    console.log(linkElement)
                    let itemName
                    // Ensure the linkElement is found to avoid errors
                    if (linkElement) {
                        itemName = linkElement.href
                        console.log(itemName); // Use the itemName for whatever you need
                    } else {
                        console.error('Link not found for item at index:', index);
                        return
                    }
                    chrome.storage.local.get([itemName], function(result) {
                        const isItemStored = result.hasOwnProperty(itemName);
                        // Create a new button element
                        const button = document.createElement('button');
                        
                        // Apply CSS classes
                        button.classList.add('myCustomButton');
                        button.classList.add(isItemStored ? 'storedItem' : 'notStoredItem');
                        item.className = "item ";
                        
                        // Create SVG and path for the icon
                        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        icon.setAttribute('viewBox', '0 0 448 512');
                        icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                        icon.classList.add('myIcon');
                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        path.setAttribute('d', "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z");
                        path.setAttribute('fill', isItemStored ? 'green' : 'red');
                        icon.appendChild(path);
                        
                        button.appendChild(icon);
                        // ... (rest of your event listener code)
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
                                        button.className = 'myCustomButton notStoredItem'

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
                                        button.className = 'myCustomButton storedItem'
                                    });
                                }
                            })
                        });

                        // Append the button to the list item
                        item.appendChild(button);
                    });
                });

            }


         
})()