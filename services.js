/**
 * services.js - Service-specific functionality for NearByNow
 * Handles service filtering, sorting, searching, and display
 */

// Global service-related variables
let currentServiceFilters = {
    categories: [],
    maxDistance: 10,
    availableOnly: false,
    minRating: 0
};

// Service category information
const serviceCategories = [
    { name: 'Electrician', icon: 'fa-bolt', count: 0 },
    { name: 'Plumber', icon: 'fa-wrench', count: 0 },
    { name: 'Painter', icon: 'fa-paint-roller', count: 0 },
    { name: 'Hospital', icon: 'fa-hospital', count: 0 },
    { name: 'Bank', icon: 'fa-building-columns', count: 0 },
    { name: 'Car-Washing', icon: 'fa-car', count: 0 },
    { name: 'Repair', icon: 'fa-screwdriver-wrench', count: 0 },
    { name: 'Cleaning', icon: 'fa-broom', count: 0 },
    { name: 'Teaching', icon: 'fa-book', count: 0 }
];

/**
 * Initialize services page
 */
function initServicesPage() {
    console.log('Initializing services page...');
    
    // Load all services
    if (typeof mockServices !== 'undefined') {
        console.log(`Loaded ${mockServices.length} services`);
        updateCategoryCounts();
    }
    
    // Set up event listeners
    setupServiceEventListeners();
}

/**
 * Update category counts
 */
function updateCategoryCounts() {
    serviceCategories.forEach(category => {
        const categoryName = category.name.toLowerCase();
        category.count = mockServices.filter(service => 
            service.category === categoryName
        ).length;
    });
}

/**
 * Set up event listeners for services page
 */
function setupServiceEventListeners() {
    // Search input with debounce
    const searchInput = document.getElementById('serviceSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleServiceSearch, 300));
    }
    
    // Distance slider
    const distanceSlider = document.getElementById('distanceSlider');
    if (distanceSlider) {
        distanceSlider.addEventListener('input', applyServiceFilters);
    }
    
    // Availability filter
    const availabilityCheckbox = document.getElementById('filterAvailable');
    if (availabilityCheckbox) {
        availabilityCheckbox.addEventListener('change', applyServiceFilters);
    }
    
    // Rating filter
    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    ratingRadios.forEach(radio => {
        radio.addEventListener('change', applyServiceFilters);
    });
    
    // Sort dropdown
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleServiceSort);
    }
}

/**
 * Handle service search
 */
function handleServiceSearch(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    
    if (!searchTerm) {
        // If search is empty, show all services with current filters
        applyServiceFilters();
        return;
    }
    
    // Filter services by search term
    const filteredServices = mockServices.filter(service => {
        return service.name.toLowerCase().includes(searchTerm) ||
               service.category.toLowerCase().includes(searchTerm) ||
               service.provider.toLowerCase().includes(searchTerm) ||
               service.description.toLowerCase().includes(searchTerm) ||
               service.location.toLowerCase().includes(searchTerm) ||
               (service.services && service.services.some(s => s.toLowerCase().includes(searchTerm)));
    });
    
    // Display filtered services
    displayServiceResults(filteredServices);
    
    // Update count
    updateServiceCount(filteredServices.length);
}

/**
 * Apply service filters
 */
function applyServiceFilters() {
    // Get selected categories
    const selectedCategories = currentServiceFilters.categories || [];
    
    // Get distance
    const maxDistance = parseInt(document.getElementById('distanceSlider')?.value || 10);
    
    // Get availability filter
    const availableOnly = document.getElementById('filterAvailable')?.checked || false;
    
    // Get min rating
    const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value || 0);
    
    // Update current filters
    currentServiceFilters = {
        categories: selectedCategories,
        maxDistance: maxDistance,
        availableOnly: availableOnly,
        minRating: minRating
    };
    
    // Filter services
    let filteredServices = [...mockServices];
    
    // Filter by category
    if (selectedCategories.length > 0) {
        filteredServices = filteredServices.filter(service => 
            selectedCategories.includes(service.category)
        );
    }
    
    // Filter by distance
    filteredServices = filteredServices.filter(service => service.distance <= maxDistance);
    
    // Filter by availability
    if (availableOnly) {
        filteredServices = filteredServices.filter(service => service.available === true);
    }
    
    // Filter by rating
    if (minRating > 0) {
        filteredServices = filteredServices.filter(service => 
            service.rating && service.rating >= minRating
        );
    }
    
    // Display filtered services
    displayServiceResults(filteredServices);
    
    // Update count
    updateServiceCount(filteredServices.length);
}

/**
 * Handle service sorting
 */
function handleServiceSort() {
    const sortBy = document.getElementById('sortBy')?.value;
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (!servicesGrid) return;
    
    // Get current services from DOM
    const serviceCards = Array.from(servicesGrid.querySelectorAll('.service-card'));
    
    if (serviceCards.length === 0) return;
    
    // Get service IDs from cards
    const serviceIds = serviceCards.map(card => {
        const onclickAttr = card.getAttribute('onclick');
        const match = onclickAttr?.match(/goToServiceDetails\((\d+)\)/);
        return match ? parseInt(match[1]) : null;
    }).filter(id => id !== null);
    
    // Get service objects
    let services = serviceIds.map(id => getServiceById(id)).filter(service => service !== null);
    
    // Sort services
    switch(sortBy) {
        case 'distance':
            services.sort((a, b) => a.distance - b.distance);
            break;
        case 'rating':
            services.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case 'name':
            services.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }
    
    // Display sorted services
    displayServiceResults(services);
}

/**
 * Display service results
 */
function displayServiceResults(services) {
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (!servicesGrid) return;
    
    if (services.length === 0) {
        servicesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-wrench"></i>
                <h3>No services found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
        return;
    }
    
    servicesGrid.innerHTML = services.map(service => createServiceCard(service)).join('');
}

/**
 * Create service card HTML
 */
function createServiceCard(service) {
    const isSaved = isServiceSaved(service.id);
    const serviceIcon = getServiceIcon(service.category);
    
    return `
        <div class="service-card" onclick="goToServiceDetails(${service.id})">
            <div class="service-actions-top">
                <button class="btn-icon ${isSaved ? 'saved' : ''}" onclick="event.stopPropagation(); toggleSaveService(${service.id})" title="Save service">
                    <i class="fas fa-bookmark"></i>
                </button>
                <button class="btn-icon" onclick="event.stopPropagation(); shareService(${escapeHtml(JSON.stringify(service))})" title="Share">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>

            <div class="service-header">
                <div class="service-icon-large">
                    <i class="fas ${serviceIcon}"></i>
                </div>
                <div class="service-info">
                    <h3>${escapeHtml(service.name)}</h3>
                    <div class="service-category">${formatCategory(service.category)}</div>
                    ${service.available ? '<div class="availability-badge"><i class="fas fa-circle"></i> Available</div>' : ''}
                </div>
            </div>

            <div class="provider-info">
                <i class="fas fa-user"></i>
                <span>${escapeHtml(service.provider)}</span>
                ${service.rating ? `
                    <span class="rating">
                        <i class="fas fa-star"></i>
                        ${service.rating}
                    </span>
                ` : ''}
            </div>

            <p class="service-description">${escapeHtml(service.description.substring(0, 100))}...</p>

            <div class="service-features">
                <div class="feature-tag"><i class="fas fa-clock"></i> ${escapeHtml(service.experience)}</div>
                ${service.price ? `<div class="feature-tag"><i class="fas fa-rupee-sign"></i> ${escapeHtml(service.price)}</div>` : ''}
            </div>

            <div class="service-details-row">
                <div class="service-detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${escapeHtml(service.location)}</span>
                </div>
                <div class="distance-badge">
                    ${service.distance} km
                </div>
            </div>

            <div class="service-footer">
                <button class="btn-call" onclick="event.stopPropagation(); makeCall('${service.phone}')">
                    <i class="fas fa-phone"></i> Call Now
                </button>
                <button class="btn-view">
                    <i class="fas fa-arrow-right"></i> View Details
                </button>
            </div>
        </div>
    `;
}

/**
 * Update service count display
 */
function updateServiceCount(count) {
    const serviceCountElement = document.getElementById('serviceCount');
    if (serviceCountElement) {
        serviceCountElement.textContent = count;
    }
}

/**
 * Clear all service filters
 */
function clearAllServiceFilters() {
    // Clear category selections
    currentServiceFilters.categories = [];
    
    // Update UI if category cards exist
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) checkbox.checked = false;
    });
    
    // Reset distance slider
    const distanceSlider = document.getElementById('distanceSlider');
    if (distanceSlider) {
        distanceSlider.value = 10;
        const distanceValue = document.getElementById('distanceValue');
        if (distanceValue) distanceValue.textContent = '10';
    }
    
    // Reset availability filter
    const availabilityCheckbox = document.getElementById('filterAvailable');
    if (availabilityCheckbox) {
        availabilityCheckbox.checked = false;
    }
    
    // Reset rating filter
    const ratingAll = document.querySelector('input[name="rating"][value="0"]');
    if (ratingAll) {
        ratingAll.checked = true;
    }
    
    // Reset search input
    const searchInput = document.getElementById('serviceSearchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reapply filters (which will show all services)
    applyServiceFilters();
}

/**
 * Toggle category selection
 */
function toggleCategoryFilter(category) {
    const index = currentServiceFilters.categories.indexOf(category);
    
    if (index > -1) {
        // Remove category
        currentServiceFilters.categories.splice(index, 1);
    } else {
        // Add category
        currentServiceFilters.categories.push(category);
    }
    
    applyServiceFilters();
}

/**
 * Filter services by category
 */
function filterServicesByCategory(category) {
    return mockServices.filter(service => service.category === category.toLowerCase());
}

/**
 * Filter services by distance
 */
function filterServicesByDistance(maxDistance) {
    return mockServices.filter(service => service.distance <= maxDistance);
}

/**
 * Filter services by availability
 */
function filterServicesByAvailability(availableOnly = true) {
    if (availableOnly) {
        return mockServices.filter(service => service.available === true);
    }
    return mockServices;
}

/**
 * Filter services by rating
 */
function filterServicesByRating(minRating) {
    return mockServices.filter(service => service.rating && service.rating >= minRating);
}

/**
 * Get services by provider name
 */
function getServicesByProvider(providerName) {
    return mockServices.filter(service => 
        service.provider.toLowerCase().includes(providerName.toLowerCase())
    );
}

/**
 * Get services by location
 */
function getServicesByLocation(location) {
    return mockServices.filter(service => 
        service.location.toLowerCase().includes(location.toLowerCase())
    );
}

/**
 * Get top-rated services
 */
function getTopRatedServices(limit = 10) {
    return [...mockServices]
        .filter(service => service.rating)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

/**
 * Get available services
 */
function getAvailableServices() {
    return mockServices.filter(service => service.available === true);
}

/**
 * Get services sorted by various criteria
 */
function getSortedServices(sortBy = 'distance') {
    const services = [...mockServices];
    
    switch(sortBy) {
        case 'distance':
            return services.sort((a, b) => a.distance - b.distance);
        case 'rating':
            return services.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'name':
            return services.sort((a, b) => a.name.localeCompare(b.name));
        case 'experience':
            return services.sort((a, b) => {
                const aYears = parseInt(a.experience) || 0;
                const bYears = parseInt(b.experience) || 0;
                return bYears - aYears;
            });
        default:
            return services;
    }
}

/**
 * Get service statistics
 */
function getServiceStatistics() {
    const stats = {
        total: mockServices.length,
        byCategory: {},
        available: mockServices.filter(s => s.available).length,
        unavailable: mockServices.filter(s => !s.available).length,
        withRating: mockServices.filter(s => s.rating).length,
        avgRating: 0,
        byDistance: {
            near: mockServices.filter(s => s.distance <= 2).length,
            medium: mockServices.filter(s => s.distance > 2 && s.distance <= 5).length,
            far: mockServices.filter(s => s.distance > 5).length
        }
    };
    
    // Count by category
    serviceCategories.forEach(category => {
        const categoryName = category.name.toLowerCase();
        stats.byCategory[categoryName] = mockServices.filter(
            s => s.category === categoryName
        ).length;
    });
    
    // Calculate average rating
    const servicesWithRating = mockServices.filter(s => s.rating);
    if (servicesWithRating.length > 0) {
        stats.avgRating = (
            servicesWithRating.reduce((sum, s) => sum + s.rating, 0) / servicesWithRating.length
        ).toFixed(1);
    }
    
    return stats;
}

/**
 * Get recommended services for a user
 */
function getRecommendedServices(userProfile) {
    if (!userProfile) return mockServices.slice(0, 5);
    
    let services = [...mockServices];
    
    // Filter by saved services similarity
    if (userProfile.savedServices && userProfile.savedServices.length > 0) {
        const savedServiceCategories = userProfile.savedServices
            .map(id => getServiceById(id))
            .filter(service => service)
            .map(service => service.category);
        
        // Prioritize services of similar categories
        services.sort((a, b) => {
            const aMatch = savedServiceCategories.includes(a.category);
            const bMatch = savedServiceCategories.includes(b.category);
            return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
        });
    }
    
    // Sort by distance and rating
    services.sort((a, b) => {
        const aScore = (a.rating || 0) * 10 - a.distance;
        const bScore = (b.rating || 0) * 10 - b.distance;
        return bScore - aScore;
    });
    
    return services.slice(0, 10);
}

/**
 * Get service icon class by category
 */
function getServiceIcon(category) {
    const icons = {
        'electrician': 'fa-bolt',
        'plumber': 'fa-wrench',
        'painter': 'fa-paint-roller',
        'hospital': 'fa-hospital',
        'bank': 'fa-building-columns',
        'car-washing': 'fa-car',
        'repair': 'fa-screwdriver-wrench',
        'cleaning': 'fa-broom',
        'teaching': 'fa-book',
        'carpenter': 'fa-hammer'
    };
    return icons[category.toLowerCase()] || 'fa-tools';
}

/**
 * Format category name for display
 */
function formatCategory(category) {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Get category color
 */
function getCategoryColor(category) {
    const colors = {
        'electrician': '#f59e0b',
        'plumber': '#3b82f6',
        'painter': '#8b5cf6',
        'hospital': '#ef4444',
        'bank': '#10b981',
        'car-washing': '#06b6d4',
        'repair': '#f97316',
        'cleaning': '#84cc16',
        'teaching': '#6366f1'
    };
    return colors[category.toLowerCase()] || '#6b7280';
}

/**
 * Check if service is highly rated
 */
function isHighlyRated(service) {
    return service.rating && service.rating >= 4.5;
}

/**
 * Check if service is nearby
 */
function isNearby(service, maxDistance = 2) {
    return service.distance <= maxDistance;
}

/**
 * Get services near a location
 */
function getServicesNearLocation(latitude, longitude, radiusKm = 10) {
    // In a real app, calculate actual distance using lat/long
    // For now, use the distance property
    return mockServices.filter(service => service.distance <= radiusKm);
}

/**
 * Search services by offered service
 */
function searchServicesByOffering(offering) {
    return mockServices.filter(service => {
        if (!service.services) return false;
        return service.services.some(s => 
            s.toLowerCase().includes(offering.toLowerCase())
        );
    });
}

/**
 * Get services by experience level
 */
function getServicesByExperience(minYears) {
    return mockServices.filter(service => {
        const years = parseInt(service.experience);
        return years >= minYears;
    });
}

/**
 * Export service data (for future use)
 */
function exportServicesToCSV(services) {
    const headers = ['ID', 'Name', 'Category', 'Provider', 'Experience', 'Location', 'Distance', 'Phone', 'Available', 'Rating', 'Price'];
    const rows = services.map(service => [
        service.id,
        service.name,
        service.category,
        service.provider,
        service.experience,
        service.location,
        service.distance,
        service.phone,
        service.available ? 'Yes' : 'No',
        service.rating || 'N/A',
        service.price || 'N/A'
    ]);
    
    let csv = headers.join(',') + '\n';
    csv += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    return csv;
}

/**
 * Log service view (for analytics)
 */
function logServiceView(serviceId) {
    const viewedServices = JSON.parse(localStorage.getItem('viewedServices') || '[]');
    
    if (!viewedServices.includes(serviceId)) {
        viewedServices.push(serviceId);
        localStorage.setItem('viewedServices', JSON.stringify(viewedServices));
    }
    
    console.log(`Service ${serviceId} viewed`);
}

/**
 * Get recently viewed services
 */
function getRecentlyViewedServices() {
    const viewedServiceIds = JSON.parse(localStorage.getItem('viewedServices') || '[]');
    return viewedServiceIds
        .map(id => getServiceById(id))
        .filter(service => service !== null)
        .slice(-10); // Last 10 viewed services
}

/**
 * Calculate service score for ranking
 */
function calculateServiceScore(service) {
    let score = 0;
    
    // Rating contribution (0-50 points)
    if (service.rating) {
        score += service.rating * 10;
    }
    
    // Distance contribution (0-25 points, closer is better)
    score += Math.max(0, 25 - service.distance * 2.5);
    
    // Availability bonus (15 points)
    if (service.available) {
        score += 15;
    }
    
    // Experience contribution (0-10 points)
    const years = parseInt(service.experience) || 0;
    score += Math.min(10, years);
    
    return score;
}

/**
 * Get best services (by calculated score)
 */
function getBestServices(limit = 10) {
    return [...mockServices]
        .map(service => ({
            ...service,
            score: calculateServiceScore(service)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize services page if on services.html
if (window.location.pathname.includes('services.html')) {
    document.addEventListener('DOMContentLoaded', initServicesPage);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterServicesByCategory,
        filterServicesByDistance,
        filterServicesByAvailability,
        filterServicesByRating,
        getServicesByProvider,
        getServicesByLocation,
        getTopRatedServices,
        getAvailableServices,
        getSortedServices,
        getServiceStatistics,
        getRecommendedServices,
        isHighlyRated,
        isNearby,
        calculateServiceScore,
        getBestServices
    };
}