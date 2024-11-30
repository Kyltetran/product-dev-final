// src/components/VietnamMap.js
import React, { useEffect } from 'react';
import './style.css'; // Import your custom styles for the map
import './map.css';

const VietnamMap = () => {
  useEffect(() => {
    // Function to remove accents and normalize Vietnamese text
    function removeAccents(str) {
      return str
        .normalize("NFD") // Normalize to decomposed form
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
        .replace(/đ/g, "d") // Convert 'đ' to 'd'
        .replace(/Đ/g, "D") // Convert 'Đ' to 'D'
        .toLowerCase(); // Convert to lowercase
    }

    // Load the external SVG file
    fetch('assets/vietnam.svg')
      .then(response => response.text())
      .then(svgContent => {
        // Insert SVG content into the container
        document.getElementById('svg-container').innerHTML = svgContent;

        const tooltip = document.getElementById('tooltip');
        const modal = document.getElementById('region-modal');
        const modalContent = document.getElementById('modal-content');
        const closeModalButton = document.getElementById('close-modal');
        const regionDetails = document.getElementById('region-details'); // Container with region details

        const regions = document.querySelectorAll('#svg-container path[title]');

        regions.forEach(region => {
          // Show tooltip on hover
          region.addEventListener('mouseover', () => {
            tooltip.style.display = 'block';
            tooltip.textContent = region.getAttribute('title');
            region.style.cursor = 'pointer';
            // change color of region on hover
            region.style.fill = '#b0b0b0'; // Change highlight color to gray
          });

          // when mouse leaves the region, hide tooltip and reset color
          region.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
            region.style.fill = ''; // Reset region color
          });

          // Hide tooltip when not hovering
          region.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
          });

          // Update tooltip position dynamically
          region.addEventListener('mousemove', (event) => {
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;

            const svgContainer = document.getElementById('svg-container');
            const containerRect = svgContainer.getBoundingClientRect();

            let left = event.clientX - containerRect.left + 10;
            let top = event.clientY - containerRect.top + 10;

            if (left + tooltipWidth > containerRect.width) {
              left = containerRect.width - tooltipWidth - 10;
            }

            if (top + tooltipHeight > containerRect.height) {
              top = containerRect.height - tooltipHeight - 10;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
          });

          // Show modal when a region is clicked
          region.addEventListener('click', () => {
            const regionName = region.getAttribute('title'); // Get the region name from title attribute
            const regionId = region.getAttribute('id'); // Get the region id (e.g., 'VN-HN')
          
            regionDetails.textContent = regionName;
            modal.style.display = 'block';
            
            // If Ha Noi is clicked (using title or id)
            if (regionId === "VN-HN" || regionName === "Hà Nội") {
              const modalContentContainer = document.createElement('div'); // Create a container for images and descriptions
              modalContentContainer.classList.add('modal-content-container'); // Add a CSS class for styling
              
              // Define images and descriptions for Ha Noi
              const items = [
                { image: `${process.env.PUBLIC_URL}/images/bun_cha_Ha_Noi.png`, description: 'Bún chả là món ăn đặc trưng của Hà Nội, với chả nướng thơm, ăn kèm bún tươi, rau sống và nước mắm chua ngọt.' },
                { image: `${process.env.PUBLIC_URL}/images/bun_dau_mam_tom_Ha_Noi.png`, description: 'Bún đậu mắm tôm là món ăn gồm đậu phụ chiên giòn, bún tươi và mắm tôm đậm đà, tạo nên hương vị hấp dẫn.' },
                { image: `${process.env.PUBLIC_URL}/images/com_Ha_Noi.png`, description: 'Xôi xéo là món xôi dẻo, đậu xanh và hành phi, ăn sáng là hết sảy, ngon mà no lâu.' },
                { image: `${process.env.PUBLIC_URL}/images/bun_oc_nguoi_Ha_Noi.png`, description: 'Bún ốc nguội là món bún tươi ăn với ốc giòn, nước dùng thanh thanh, ngon cực kỳ vào những ngày nóng.' },
                { image: `${process.env.PUBLIC_URL}/images/xoi_xeo_Ha_Noi.png`, description: 'Cốm Hà Nội là đặc sản mùa thu, cốm dẻo thơm, ăn cùng chuối chín là chuẩn nhất.' },
                { image: `${process.env.PUBLIC_URL}/images/bun_moc_Ha_Noi.png`, description: 'Bún mọc sườn là bún ăn kèm với sườn ninh mềm và mọc chả nấm, vị ngọt thanh, đậm đà, ai ăn một lần là mê.' }
              ];
          
              // Loop over each item and create its content
              items.forEach(item => {
                const itemContainer = document.createElement('div'); // Create a container for each image and description
                itemContainer.classList.add('item-container'); // Add class for each item
          
                const image = document.createElement('img');
                image.src = item.image;
                image.alt = item.description;
                image.classList.add('item-image'); // Add class for styling image
          
                const description = document.createElement('p');
                description.textContent = item.description;
                description.classList.add('item-description'); // Add class for styling description
          
                itemContainer.appendChild(image);
                itemContainer.appendChild(description);
                modalContentContainer.appendChild(itemContainer);
              });
          
              // Append the container to the modal content
              modalContent.innerHTML = '<h2>Ẩm thực Hà Nội</h2>'; // Clear any existing content
              modalContent.appendChild(modalContentContainer);
            } else {
              // Default modal content for other regions
              modalContent.innerHTML = `<h2>${regionName}</h2><p>Details about ${regionName}...</p>`;
            }
          });
        });

        // Close the modal when clicking the close button
        closeModalButton.addEventListener('click', () => {
          modal.style.display = 'none';
        });

        // Close the modal when clicking outside the modal
        window.addEventListener('click', (event) => {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        });

        // Search functionality
        const searchInput = document.getElementById('region-search');
        const searchButton = document.getElementById('search-button');

        const searchFunction = () => {
          const query = removeAccents(searchInput.value.trim()); // Normalize the input
          let found = false;

          regions.forEach(region => {
            const regionName = removeAccents(region.getAttribute('title')); // Normalize the region name

            if (regionName === query) {
              found = true;
              // Highlight region
              region.style.fill = '#b0b0b0'; // Change highlight color to gray

              // Show tooltip below the region
              const bbox = region.getBoundingClientRect();
              const svgContainer = document.getElementById('svg-container').getBoundingClientRect();

              tooltip.style.display = 'block';
              tooltip.textContent = region.getAttribute('title');

              // Position tooltip below the region
              tooltip.style.left = `${bbox.left - svgContainer.left + bbox.width / 2 - tooltip.offsetWidth / 2}px`;
              tooltip.style.top = `${bbox.bottom - svgContainer.top + 10}px`;

              // Remove highlight and hide tooltip after 3 seconds
              setTimeout(() => {
                region.style.fill = ''; // Reset region color
                tooltip.style.display = 'none'; // Hide tooltip
              }, 3000); // 3 seconds
            }
          });

          if (!found) {
            alert('Region not found! Please try again.');
          }
        };

        // Trigger search on button click
        searchButton.addEventListener('click', searchFunction);

        // Trigger search on Enter key press
        searchInput.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            searchFunction();
          }
        });
      })
      .catch(error => console.error('Error loading SVG:', error));

      // Scroll to the map when "Regions Exploration" button is clicked
      document.getElementById('regions-exploration').addEventListener('click', () => {
        document.querySelector('.map-wrapper').scrollIntoView({ behavior: 'smooth' });
      });
  }, []);

  return (
    <div>
      {/* SVG container */}
      <div id="svg-container" className="map-container"></div>

      {/* Tooltip */}
      <div id="tooltip" className="tooltip"></div>

      {/* Modal */}
      <div id="region-modal" className="modal">
        <div className="modal-content" id="modal-content">
          <button id="close-modal" className="close-btn">×</button>
          <div id="region-details"></div>
        </div>
      </div>
    </div>
  );
}

export default VietnamMap;
