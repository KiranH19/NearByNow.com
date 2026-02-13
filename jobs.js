/**
 * jobs.js - Job-specific functionality for NearByNow
 * Handles job filtering, sorting, searching, and display
 */

// Global job-related variables
let currentJobFilters = {
    types: [],
    maxDistance: 10,
    minSalary: 0,
    experience: []
};

/**
 * Initialize jobs page
 */
function initJobsPage() {
    console.log('Initializing jobs page...');
    
    // Load all jobs
    if (typeof mockJobs !== 'undefined') {
        console.log(`Loaded ${mockJobs.length} jobs`);
    }
    
    // Set up event listeners
    setupJobEventListeners();
}

/**
 * Set up event listeners for jobs page
 */
function setupJobEventListeners() {
    // Search input with debounce
    const searchInput = document.getElementById('jobSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleJobSearch, 300));
    }
    
    // Filter change listeners
    const filterCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="filter"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyJobFilters);
    });
    
    // Distance slider
    const distanceSlider = document.getElementById('distanceSlider');
    if (distanceSlider) {
        distanceSlider.addEventListener('input', applyJobFilters);
    }
    
    // Salary filter
    const salaryRadios = document.querySelectorAll('input[name="salary"]');
    salaryRadios.forEach(radio => {
        radio.addEventListener('change', applyJobFilters);
    });
    
    // Sort dropdown
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleJobSort);
    }
}

/**
 * Handle job search
 */
function handleJobSearch(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    
    if (!searchTerm) {
        // If search is empty, show all jobs with current filters
        applyJobFilters();
        return;
    }
    
    // Filter jobs by search term
    const filteredJobs = mockJobs.filter(job => {
        return job.title.toLowerCase().includes(searchTerm) ||
               job.company.toLowerCase().includes(searchTerm) ||
               job.description.toLowerCase().includes(searchTerm) ||
               job.location.toLowerCase().includes(searchTerm) ||
               job.type.toLowerCase().includes(searchTerm);
    });
    
    // Display filtered jobs
    displayJobResults(filteredJobs);
    
    // Update count
    updateJobCount(filteredJobs.length);
}

/**
 * Apply job filters
 */
function applyJobFilters() {
    // Get selected job types
    const selectedTypes = [];
    if (document.getElementById('filterDaily')?.checked) selectedTypes.push('daily');
    if (document.getElementById('filterMonthly')?.checked) selectedTypes.push('monthly');
    if (document.getElementById('filterContract')?.checked) selectedTypes.push('contract');
    
    // Get distance
    const maxDistance = parseInt(document.getElementById('distanceSlider')?.value || 10);
    
    // Get min salary
    const minSalary = parseInt(document.querySelector('input[name="salary"]:checked')?.value || 0);
    
    // Get experience filters
    const selectedExperience = [];
    if (document.getElementById('filterFreshers')?.checked) selectedExperience.push('freshers');
    if (document.getElementById('filterExperienced')?.checked) selectedExperience.push('experienced');
    
    // Update current filters
    currentJobFilters = {
        types: selectedTypes,
        maxDistance: maxDistance,
        minSalary: minSalary,
        experience: selectedExperience
    };
    
    // Filter jobs
    let filteredJobs = [...mockJobs];
    
    // Filter by type
    if (selectedTypes.length > 0) {
        filteredJobs = filteredJobs.filter(job => selectedTypes.includes(job.type));
    }
    
    // Filter by distance
    filteredJobs = filteredJobs.filter(job => job.distance <= maxDistance);
    
    // Filter by salary
    if (minSalary > 0) {
        filteredJobs = filteredJobs.filter(job => job.salary >= minSalary);
    }
    
    // Filter by experience
    if (selectedExperience.length > 0) {
        filteredJobs = filteredJobs.filter(job => {
            const exp = job.experience.toLowerCase();
            if (selectedExperience.includes('freshers') && (exp.includes('fresher') || exp.includes('no experience'))) {
                return true;
            }
            if (selectedExperience.includes('experienced') && (exp.includes('year') || exp.includes('experienced'))) {
                return true;
            }
            return false;
        });
    }
    
    // Display filtered jobs
    displayJobResults(filteredJobs);
    
    // Update count
    updateJobCount(filteredJobs.length);
}

/**
 * Handle job sorting
 */
function handleJobSort() {
    const sortBy = document.getElementById('sortBy')?.value;
    const jobsGrid = document.getElementById('jobsGrid');
    
    if (!jobsGrid) return;
    
    // Get current jobs from DOM
    const jobCards = Array.from(jobsGrid.querySelectorAll('.job-card'));
    
    if (jobCards.length === 0) return;
    
    // Get job IDs from cards
    const jobIds = jobCards.map(card => {
        const onclickAttr = card.getAttribute('onclick');
        const match = onclickAttr?.match(/goToJobDetails\((\d+)\)/);
        return match ? parseInt(match[1]) : null;
    }).filter(id => id !== null);
    
    // Get job objects
    let jobs = jobIds.map(id => getJobById(id)).filter(job => job !== null);
    
    // Sort jobs
    switch(sortBy) {
        case 'recent':
            jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
            break;
        case 'distance':
            jobs.sort((a, b) => a.distance - b.distance);
            break;
        case 'salary-high':
            jobs.sort((a, b) => b.salary - a.salary);
            break;
        case 'salary-low':
            jobs.sort((a, b) => a.salary - b.salary);
            break;
        default:
            break;
    }
    
    // Display sorted jobs
    displayJobResults(jobs);
}

/**
 * Display job results
 */
function displayJobResults(jobs) {
    const jobsGrid = document.getElementById('jobsGrid');
    
    if (!jobsGrid) return;
    
    if (jobs.length === 0) {
        jobsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-briefcase"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
        return;
    }
    
    jobsGrid.innerHTML = jobs.map(job => createJobCard(job)).join('');
}

/**
 * Create job card HTML
 */
function createJobCard(job) {
    const isSaved = isJobSaved(job.id);
    
    return `
        <div class="job-card" onclick="goToJobDetails(${job.id})">
            <div class="job-card-header">
                <div class="job-type-badge ${job.type}">${job.type.charAt(0).toUpperCase() + job.type.slice(1)}</div>
                <div class="job-actions">
                    <button class="btn-icon ${isSaved ? 'saved' : ''}" onclick="event.stopPropagation(); toggleSaveJob(${job.id})" title="Save job">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="btn-icon" onclick="event.stopPropagation(); shareJob(${escapeHtml(JSON.stringify(job))})" title="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
            
            <h3>${escapeHtml(job.title)}</h3>
            <p class="company"><i class="fas fa-building"></i> ${escapeHtml(job.company)}</p>
            
            <div class="job-details">
                <div class="job-detail-item">
                    <i class="fas fa-rupee-sign"></i>
                    <strong>₹${job.salary}/${job.salaryPeriod}</strong>
                </div>
                <div class="job-detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.distance} km away</span>
                </div>
                <div class="job-detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${formatDate(job.postedDate)}</span>
                </div>
            </div>
            
            <p class="job-description">${escapeHtml(job.description.substring(0, 120))}...</p>
            
            <div class="job-footer">
                <span class="posted-date">Posted by ${escapeHtml(job.postedBy)}</span>
                <div class="job-footer-actions">
                    <button class="btn-call" onclick="event.stopPropagation(); makeCall('${job.contact}')">
                        <i class="fas fa-phone"></i> Call Now
                    </button>
                    <button class="btn-view">
                        <i class="fas fa-arrow-right"></i> View Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Update job count display
 */
function updateJobCount(count) {
    const jobCountElement = document.getElementById('jobCount');
    if (jobCountElement) {
        jobCountElement.textContent = count;
    }
}

/**
 * Clear all job filters
 */
function clearAllJobFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"][id^="filter"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset distance slider
    const distanceSlider = document.getElementById('distanceSlider');
    if (distanceSlider) {
        distanceSlider.value = 10;
        document.getElementById('distanceValue').textContent = '10';
    }
    
    // Reset salary filter
    const salaryAll = document.getElementById('salaryAll');
    if (salaryAll) {
        salaryAll.checked = true;
    }
    
    // Reset experience filters
    const filterFreshers = document.getElementById('filterFreshers');
    const filterExperienced = document.getElementById('filterExperienced');
    if (filterFreshers) filterFreshers.checked = false;
    if (filterExperienced) filterExperienced.checked = false;
    
    // Reset search input
    const searchInput = document.getElementById('jobSearchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reapply filters (which will show all jobs)
    applyJobFilters();
}

/**
 * Filter jobs by type
 */
function filterJobsByType(type) {
    return mockJobs.filter(job => job.type === type);
}

/**
 * Filter jobs by distance
 */
function filterJobsByDistance(maxDistance) {
    return mockJobs.filter(job => job.distance <= maxDistance);
}

/**
 * Filter jobs by salary range
 */
function filterJobsBySalary(minSalary, maxSalary = Infinity) {
    return mockJobs.filter(job => job.salary >= minSalary && job.salary <= maxSalary);
}

/**
 * Filter jobs by experience level
 */
function filterJobsByExperience(level) {
    return mockJobs.filter(job => {
        const exp = job.experience.toLowerCase();
        if (level === 'freshers') {
            return exp.includes('fresher') || exp.includes('no experience');
        } else if (level === 'experienced') {
            return exp.includes('year') || exp.includes('experienced');
        }
        return false;
    });
}

/**
 * Get jobs by company
 */
function getJobsByCompany(companyName) {
    return mockJobs.filter(job => 
        job.company.toLowerCase().includes(companyName.toLowerCase())
    );
}

/**
 * Get jobs by location
 */
function getJobsByLocation(location) {
    return mockJobs.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
    );
}

/**
 * Get recently posted jobs (within last N days)
 */
function getRecentJobs(days = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return mockJobs.filter(job => {
        const jobDate = new Date(job.postedDate);
        return jobDate >= cutoffDate;
    });
}

/**
 * Get jobs sorted by various criteria
 */
function getSortedJobs(sortBy = 'recent') {
    const jobs = [...mockJobs];
    
    switch(sortBy) {
        case 'recent':
            return jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        case 'distance':
            return jobs.sort((a, b) => a.distance - b.distance);
        case 'salary-high':
            return jobs.sort((a, b) => b.salary - a.salary);
        case 'salary-low':
            return jobs.sort((a, b) => a.salary - b.salary);
        case 'title':
            return jobs.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return jobs;
    }
}

/**
 * Get job statistics
 */
function getJobStatistics() {
    const stats = {
        total: mockJobs.length,
        byType: {
            daily: mockJobs.filter(j => j.type === 'daily').length,
            monthly: mockJobs.filter(j => j.type === 'monthly').length,
            contract: mockJobs.filter(j => j.type === 'contract').length
        },
        avgSalary: {
            daily: 0,
            monthly: 0,
            contract: 0
        },
        byDistance: {
            near: mockJobs.filter(j => j.distance <= 2).length,
            medium: mockJobs.filter(j => j.distance > 2 && j.distance <= 5).length,
            far: mockJobs.filter(j => j.distance > 5).length
        },
        forFreshers: mockJobs.filter(j => 
            j.experience.toLowerCase().includes('fresher') || 
            j.experience.toLowerCase().includes('no experience')
        ).length
    };
    
    // Calculate average salaries
    const dailyJobs = mockJobs.filter(j => j.type === 'daily');
    const monthlyJobs = mockJobs.filter(j => j.type === 'monthly');
    const contractJobs = mockJobs.filter(j => j.type === 'contract');
    
    if (dailyJobs.length > 0) {
        stats.avgSalary.daily = Math.round(
            dailyJobs.reduce((sum, j) => sum + j.salary, 0) / dailyJobs.length
        );
    }
    
    if (monthlyJobs.length > 0) {
        stats.avgSalary.monthly = Math.round(
            monthlyJobs.reduce((sum, j) => sum + j.salary, 0) / monthlyJobs.length
        );
    }
    
    if (contractJobs.length > 0) {
        stats.avgSalary.contract = Math.round(
            contractJobs.reduce((sum, j) => sum + j.salary, 0) / contractJobs.length
        );
    }
    
    return stats;
}

/**
 * Get recommended jobs for a user
 */
function getRecommendedJobs(userProfile) {
    if (!userProfile) return mockJobs.slice(0, 5);
    
    let jobs = [...mockJobs];
    
    // Filter by saved jobs similarity
    if (userProfile.savedJobs && userProfile.savedJobs.length > 0) {
        const savedJobTypes = userProfile.savedJobs
            .map(id => getJobById(id))
            .filter(job => job)
            .map(job => job.type);
        
        // Prioritize jobs of similar types
        jobs.sort((a, b) => {
            const aMatch = savedJobTypes.includes(a.type);
            const bMatch = savedJobTypes.includes(b.type);
            return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
        });
    }
    
    // Sort by distance
    jobs.sort((a, b) => a.distance - b.distance);
    
    return jobs.slice(0, 10);
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

/**
 * Format job type for display
 */
function formatJobType(type) {
    const types = {
        'daily': 'Daily Job',
        'monthly': 'Monthly Job',
        'contract': 'Contract Job'
    };
    return types[type] || type;
}

/**
 * Get job type badge color
 */
function getJobTypeBadgeColor(type) {
    const colors = {
        'daily': 'blue',
        'monthly': 'green',
        'contract': 'amber'
    };
    return colors[type] || 'gray';
}

/**
 * Calculate salary per year (for comparison)
 */
function calculateYearlySalary(job) {
    switch(job.salaryPeriod) {
        case 'day':
            return job.salary * 26 * 12; // 26 working days per month
        case 'month':
            return job.salary * 12;
        case 'project':
            return job.salary; // Can't calculate yearly for project-based
        default:
            return job.salary;
    }
}

/**
 * Check if job is suitable for freshers
 */
function isSuitableForFreshers(job) {
    const exp = job.experience.toLowerCase();
    return exp.includes('fresher') || exp.includes('no experience') || exp.includes('0');
}

/**
 * Get jobs near a location
 */
function getJobsNearLocation(latitude, longitude, radiusKm = 10) {
    // In a real app, calculate actual distance using lat/long
    // For now, use the distance property
    return mockJobs.filter(job => job.distance <= radiusKm);
}

/**
 * Export job data (for future use)
 */
function exportJobsToCSV(jobs) {
    const headers = ['ID', 'Title', 'Company', 'Type', 'Salary', 'Period', 'Location', 'Distance', 'Posted Date'];
    const rows = jobs.map(job => [
        job.id,
        job.title,
        job.company,
        job.type,
        job.salary,
        job.salaryPeriod,
        job.location,
        job.distance,
        job.postedDate
    ]);
    
    let csv = headers.join(',') + '\n';
    csv += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    return csv;
}

/**
 * Log job view (for analytics)
 */
function logJobView(jobId) {
    const viewedJobs = JSON.parse(localStorage.getItem('viewedJobs') || '[]');
    
    if (!viewedJobs.includes(jobId)) {
        viewedJobs.push(jobId);
        localStorage.setItem('viewedJobs', JSON.stringify(viewedJobs));
    }
    
    console.log(`Job ${jobId} viewed`);
}

/**
 * Get recently viewed jobs
 */
function getRecentlyViewedJobs() {
    const viewedJobIds = JSON.parse(localStorage.getItem('viewedJobs') || '[]');
    return viewedJobIds
        .map(id => getJobById(id))
        .filter(job => job !== null)
        .slice(-10); // Last 10 viewed jobs
}

// Initialize jobs page if on jobs.html
if (window.location.pathname.includes('jobs.html')) {
    document.addEventListener('DOMContentLoaded', initJobsPage);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterJobsByType,
        filterJobsByDistance,
        filterJobsBySalary,
        filterJobsByExperience,
        getJobsByCompany,
        getJobsByLocation,
        getRecentJobs,
        getSortedJobs,
        getJobStatistics,
        getRecommendedJobs,
        calculateYearlySalary,
        isSuitableForFreshers
    };
}