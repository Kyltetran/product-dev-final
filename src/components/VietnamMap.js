// src/components/VietnamMap.js
import React, { useEffect } from 'react';
import './style.css'; // Import your custom styles for the map

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
            const regionName = region.getAttribute('title');
            regionDetails.textContent = regionName;
            modal.style.display = 'block';
            modalContent.innerHTML = `<h2>${regionName}</h2><p>Details about ${regionName}...</p>`;
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
