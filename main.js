// ===================================
// MAIN.JS - Common Functions & Navigation
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    console.log('Initializing NearByNow App...');
    
    // Setup hamburger menu
    setupMobileMenu();
    
    // Check authentication state
    checkAuthState();
    
    // Setup smooth scrolling
    setupSmoothScroll();
    
    console.log('App initialized successfully!');
}

// ===================================
// MOBILE MENU (HAMBURGER)
// ===================================
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// ===================================
// AUTHENTICATION STATE MANAGEMENT
// ===================================
function checkAuthState() {
    const currentUser = getCurrentUser();
    const loginLink = document.getElementById('loginLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLink = document.getElementById('profileLink');
    
    if (currentUser) {
        // User is logged in
        if (loginLink) loginLink.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (profileLink) profileLink.style.display = 'inline-block';
        
        // Setup logout button
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
    } else {
        // User is not logged in
        if (loginLink) loginLink.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (profileLink) profileLink.style.display = 'none';
    }
}

// Get current logged in user from localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Save current user to localStorage
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Clear current user (logout)
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        clearCurrentUser();
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    }
}

// Check if user is logged in (for protected pages)
function requireLogin() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to access this page');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// ===================================
// SMOOTH SCROLLING
// ===================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-IN');
}

// Format phone number for WhatsApp
function formatPhoneForWhatsApp(phone) {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    
    // If starts with 0, remove it
    if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1);
    }
    
    // Add country code if not present
    if (!cleaned.startsWith('91') && cleaned.length === 10) {
        cleaned = '91' + cleaned;
    }
    
    return cleaned;
}

// Open WhatsApp chat
function openWhatsApp(phone, message = '') {
    const formattedPhone = formatPhoneForWhatsApp(phone);
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    window.open(url, '_blank');
}

// Make phone call
function makeCall(phone) {
    window.location.href = `tel:${phone}`;
}

// Calculate distance between two points (simplified)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(1);
}

// Get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Show loading spinner
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'globalLoader';
    loader.className = 'loading-spinner';
    loader.innerHTML = `
        <div class="spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

// Hide loading spinner
function hideLoading() {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.remove();
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Confirm dialog
function confirmAction(message) {
    return confirm(message);
}

// ===================================
// FORM VALIDATION HELPERS
// ===================================

// Validate phone number (Indian)
function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate form field
function validateField(fieldId, validationFn, errorMessage) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    if (!validationFn(value)) {
        field.classList.add('error');
        showToast(errorMessage, 'error');
        return false;
    }
    
    field.classList.remove('error');
    return true;
}

// ===================================
// LOCAL STORAGE HELPERS
// ===================================

// Save to localStorage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// Get from localStorage
function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Remove from localStorage
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// ===================================
// SAVED ITEMS MANAGEMENT
// ===================================

// Save job
function saveJob(jobId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to save jobs');
        window.location.href = 'login.html';
        return;
    }
    
    if (!currentUser.savedJobs) {
        currentUser.savedJobs = [];
    }
    
    if (currentUser.savedJobs.includes(jobId)) {
        showToast('Job already saved!', 'info');
        return;
    }
    
    currentUser.savedJobs.push(jobId);
    setCurrentUser(currentUser);
    showToast('Job saved successfully!', 'success');
}

// Remove saved job
function removeSavedJob(jobId) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    currentUser.savedJobs = currentUser.savedJobs.filter(id => id !== jobId);
    setCurrentUser(currentUser);
    showToast('Job removed from saved items', 'info');
}

// Check if job is saved
function isJobSaved(jobId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.savedJobs) return false;
    return currentUser.savedJobs.includes(jobId);
}

// Save service
function saveService(serviceId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to save services');
        window.location.href = 'login.html';
        return;
    }
    
    if (!currentUser.savedServices) {
        currentUser.savedServices = [];
    }
    
    if (currentUser.savedServices.includes(serviceId)) {
        showToast('Service already saved!', 'info');
        return;
    }
    
    currentUser.savedServices.push(serviceId);
    setCurrentUser(currentUser);
    showToast('Service saved successfully!', 'success');
}

// Remove saved service
function removeSavedService(serviceId) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    currentUser.savedServices = currentUser.savedServices.filter(id => id !== serviceId);
    setCurrentUser(currentUser);
    showToast('Service removed from saved items', 'info');
}

// Check if service is saved
function isServiceSaved(serviceId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.savedServices) return false;
    return currentUser.savedServices.includes(serviceId);
}

// ===================================
// APPLY FOR JOB
// ===================================
function applyForJob(jobId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to apply for jobs');
        window.location.href = 'login.html';
        return;
    }
    
    if (!currentUser.appliedJobs) {
        currentUser.appliedJobs = [];
    }
    
    if (currentUser.appliedJobs.includes(jobId)) {
        showToast('You have already applied for this job!', 'info');
        return;
    }
    
    if (confirmAction('Are you sure you want to apply for this job?')) {
        currentUser.appliedJobs.push(jobId);
        setCurrentUser(currentUser);
        showToast('Application submitted successfully!', 'success');
    }
}

// Check if already applied
function hasApplied(jobId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.appliedJobs) return false;
    return currentUser.appliedJobs.includes(jobId);
}

// ===================================
// SHARE FUNCTIONALITY
// ===================================
function shareJob(job) {
    const text = `Check out this job: ${job.title} at ${job.company}. Salary: ₹${job.salary}/${job.salaryPeriod}. Location: ${job.location}`;
    const url = `${window.location.origin}/job-details.html?id=${job.id}`;
    
    if (navigator.share) {
        navigator.share({
            title: job.title,
            text: text,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
            showToast('Link copied to clipboard!', 'success');
        });
    }
}

function shareService(service) {
    const text = `Check out this service: ${service.name}. ${service.category}. Contact: ${service.phone}`;
    const url = `${window.location.origin}/service-details.html?id=${service.id}`;
    
    if (navigator.share) {
        navigator.share({
            title: service.name,
            text: text,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
            showToast('Link copied to clipboard!', 'success');
        });
    }
}

// ===================================
// DEBOUNCE FUNCTION (for search)
// ===================================
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ===================================
// PAGE NAVIGATION HELPERS
// ===================================
function goToJobDetails(jobId) {
    window.location.href = `job-details.html?id=${jobId}`;
}

function goToServiceDetails(serviceId) {
    window.location.href = `service-details.html?id=${serviceId}`;
}

function goBack() {
    window.history.back();
}

// ===================================
// SCROLL TO TOP
// ===================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});

// ===================================
// PRINT HELPERS
// ===================================
function printPage() {
    window.print();
}

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c NearByNow - Jobs & Services Near You ', 
    'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
console.log('%c Connecting Tier 2 & 3 Cities ', 
    'background: #10b981; color: white; font-size: 14px; padding: 5px;');
console.log('Version: 1.0.0');
console.log('Developer Mode: Active');