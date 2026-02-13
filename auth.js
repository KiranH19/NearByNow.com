// ===================================
// AUTH.JS - Authentication Logic
// Login, Register, Session Management
// ===================================

// ===================================
// REGISTER FUNCTIONALITY
// ===================================
function handleRegister(event) {
    if (event) event.preventDefault();
    
    // Get form values
    const name = document.getElementById('registerName')?.value.trim();
    const phone = document.getElementById('registerPhone')?.value.trim();
    const password = document.getElementById('registerPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const userType = document.getElementById('userType')?.value;
    const location = document.getElementById('registerLocation')?.value.trim();
    
    // Validation
    if (!name || name.length < 3) {
        showToast('Please enter a valid name (minimum 3 characters)', 'error');
        return false;
    }
    
    if (!validatePhone(phone)) {
        showToast('Please enter a valid 10-digit phone number', 'error');
        return false;
    }
    
    if (!password || password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return false;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return false;
    }
    
    if (!userType) {
        showToast('Please select user type', 'error');
        return false;
    }
    
    if (!location) {
        showToast('Please enter your location', 'error');
        return false;
    }
    
    // Check if user already exists
    const existingUser = getUserByPhone(phone);
    if (existingUser) {
        showToast('Phone number already registered! Please login.', 'error');
        return false;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(), // Simple ID generation
        name: name,
        phone: phone,
        password: password, // In real app, this should be hashed
        userType: userType,
        location: location,
        savedJobs: [],
        savedServices: [],
        appliedJobs: [],
        postedJobs: [],
        registeredDate: new Date().toISOString()
    };
    
    // Add company name if job provider
    if (userType === 'jobProvider') {
        const companyName = document.getElementById('companyName')?.value.trim();
        if (companyName) {
            newUser.companyName = companyName;
        }
    }
    
    // Add service details if service provider
    if (userType === 'serviceProvider') {
        const serviceName = document.getElementById('serviceName')?.value.trim();
        const serviceCategory = document.getElementById('serviceCategory')?.value;
        if (serviceName && serviceCategory) {
            newUser.serviceName = serviceName;
            newUser.serviceCategory = serviceCategory;
        }
    }
    
    // Save user to mockUsers array
    const savedUser = addUser(newUser);
    
    // Auto login after registration
    setCurrentUser(savedUser);
    
    // Show success message
    showToast('Registration successful! Welcome to NearByNow', 'success');
    
    // Redirect based on user type
    setTimeout(() => {
        if (userType === 'jobProvider') {
            window.location.href = 'post-job.html';
        } else if (userType === 'serviceProvider') {
            window.location.href = 'post-service.html';
        } else {
            window.location.href = 'index.html';
        }
    }, 1500);
    
    return false;
}

// ===================================
// LOGIN FUNCTIONALITY
// ===================================
function handleLogin(event) {
    if (event) event.preventDefault();
    
    // Get form values
    const phone = document.getElementById('loginPhone')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    
    // Validation
    if (!phone) {
        showToast('Please enter phone number', 'error');
        return false;
    }
    
    if (!password) {
        showToast('Please enter password', 'error');
        return false;
    }
    
    // Validate credentials
    const result = validateLogin(phone, password);
    
    if (result.success) {
        // Login successful
        setCurrentUser(result.user);
        showToast(`Welcome back, ${result.user.name}!`, 'success');
        
        // Redirect to appropriate page
        setTimeout(() => {
            const redirectUrl = getUrlParameter('redirect');
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                window.location.href = 'index.html';
            }
        }, 1000);
    } else {
        // Login failed
        showToast('Invalid phone number or password', 'error');
    }
    
    return false;
}

// ===================================
// LOGOUT FUNCTIONALITY
// ===================================
function logout() {
    if (confirmAction('Are you sure you want to logout?')) {
        clearCurrentUser();
        showToast('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// ===================================
// PASSWORD RESET/FORGOT PASSWORD
// ===================================
function handleForgotPassword(event) {
    if (event) event.preventDefault();
    
    const phone = document.getElementById('forgotPhone')?.value.trim();
    
    if (!validatePhone(phone)) {
        showToast('Please enter a valid phone number', 'error');
        return false;
    }
    
    const user = getUserByPhone(phone);
    
    if (user) {
        // In a real app, send OTP via SMS
        alert(`Password reset link sent to ${phone}\n\nFor demo: Your password is "${user.password}"`);
        showToast('Password reset instructions sent!', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        showToast('Phone number not registered', 'error');
    }
    
    return false;
}

// ===================================
// DEMO LOGIN (Quick Login)
// ===================================
function demoLogin(userType) {
    let demoUser;
    
    switch(userType) {
        case 'seeker':
            demoUser = mockUsers[0]; // Rahul Kumar - Job Seeker
            break;
        case 'jobProvider':
            demoUser = mockUsers[1]; // Priya Sharma - Job Provider
            break;
        case 'serviceProvider':
            demoUser = mockUsers[2]; // Ram Singh - Service Provider
            break;
        default:
            demoUser = mockUsers[0];
    }
    
    setCurrentUser(demoUser);
    showToast(`Demo login as ${demoUser.name}`, 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ===================================
// SHOW/HIDE ADDITIONAL FIELDS
// ===================================
function toggleUserTypeFields() {
    const userType = document.getElementById('userType')?.value;
    const companyField = document.getElementById('companyField');
    const serviceFields = document.getElementById('serviceFields');
    
    // Hide all additional fields first
    if (companyField) companyField.style.display = 'none';
    if (serviceFields) serviceFields.style.display = 'none';
    
    // Show relevant fields based on user type
    if (userType === 'jobProvider' && companyField) {
        companyField.style.display = 'block';
    } else if (userType === 'serviceProvider' && serviceFields) {
        serviceFields.style.display = 'block';
    }
}

// ===================================
// PASSWORD VISIBILITY TOGGLE
// ===================================
function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    
    if (input && icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

// ===================================
// UPDATE PROFILE
// ===================================
function updateProfile(event) {
    if (event) event.preventDefault();
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showToast('Please login first', 'error');
        window.location.href = 'login.html';
        return false;
    }
    
    // Get updated values
    const name = document.getElementById('profileName')?.value.trim();
    const location = document.getElementById('profileLocation')?.value.trim();
    const newPassword = document.getElementById('newPassword')?.value;
    
    // Update user object
    if (name) currentUser.name = name;
    if (location) currentUser.location = location;
    if (newPassword && newPassword.length >= 6) {
        currentUser.password = newPassword;
        showToast('Password updated successfully', 'success');
    }
    
    // Save updated user
    setCurrentUser(currentUser);
    
    showToast('Profile updated successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1500);
    
    return false;
}

// ===================================
// CHECK USER TYPE
// ===================================
function isJobProvider() {
    const currentUser = getCurrentUser();
    return currentUser && currentUser.userType === 'jobProvider';
}

function isServiceProvider() {
    const currentUser = getCurrentUser();
    return currentUser && currentUser.userType === 'serviceProvider';
}

function isSeeker() {
    const currentUser = getCurrentUser();
    return currentUser && currentUser.userType === 'seeker';
}

// ===================================
// REQUIRE SPECIFIC USER TYPE
// ===================================
function requireJobProvider() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to access this page');
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return false;
    }
    
    if (currentUser.userType !== 'jobProvider') {
        alert('Only job providers can access this page');
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

function requireServiceProvider() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to access this page');
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return false;
    }
    
    if (currentUser.userType !== 'serviceProvider') {
        alert('Only service providers can access this page');
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// ===================================
// GET USER STATISTICS
// ===================================
function getUserStats() {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    
    return {
        savedJobsCount: currentUser.savedJobs?.length || 0,
        savedServicesCount: currentUser.savedServices?.length || 0,
        appliedJobsCount: currentUser.appliedJobs?.length || 0,
        postedJobsCount: currentUser.postedJobs?.length || 0
    };
}

// ===================================
// DELETE ACCOUNT
// ===================================
function deleteAccount() {
    if (confirmAction('Are you sure you want to delete your account? This action cannot be undone.')) {
        const confirmText = prompt('Type "DELETE" to confirm account deletion:');
        
        if (confirmText === 'DELETE') {
            clearCurrentUser();
            showToast('Account deleted successfully', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showToast('Account deletion cancelled', 'info');
        }
    }
}

// ===================================
// AUTO-FILL LOCATION (Geolocation)
// ===================================
function autoFillLocation(inputId) {
    const input = document.getElementById(inputId);
    
    if (!navigator.geolocation) {
        showToast('Geolocation is not supported by your browser', 'error');
        return;
    }
    
    showToast('Detecting location...', 'info');
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // In real app, use reverse geocoding API to get address
            // For demo, just show coordinates
            if (input) {
                input.value = 'Current Location (Detected)';
            }
            showToast('Location detected successfully', 'success');
        },
        function(error) {
            console.error('Geolocation error:', error);
            showToast('Unable to detect location. Please enter manually.', 'error');
        }
    );
}

// ===================================
// VALIDATE REGISTRATION FORM
// ===================================
function validateRegistrationForm() {
    const name = document.getElementById('registerName')?.value.trim();
    const phone = document.getElementById('registerPhone')?.value.trim();
    const password = document.getElementById('registerPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const userType = document.getElementById('userType')?.value;
    
    let isValid = true;
    
    // Name validation
    if (!name || name.length < 3) {
        document.getElementById('registerName')?.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('registerName')?.classList.remove('error');
    }
    
    // Phone validation
    if (!validatePhone(phone)) {
        document.getElementById('registerPhone')?.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('registerPhone')?.classList.remove('error');
    }
    
    // Password validation
    if (!password || password.length < 6) {
        document.getElementById('registerPassword')?.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('registerPassword')?.classList.remove('error');
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
        document.getElementById('confirmPassword')?.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('confirmPassword')?.classList.remove('error');
    }
    
    // User type validation
    if (!userType) {
        document.getElementById('userType')?.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('userType')?.classList.remove('error');
    }
    
    return isValid;
}

// ===================================
// REMEMBER ME FUNCTIONALITY
// ===================================
function handleRememberMe() {
    const rememberCheckbox = document.getElementById('rememberMe');
    const phone = document.getElementById('loginPhone')?.value;
    
    if (rememberCheckbox && rememberCheckbox.checked && phone) {
        localStorage.setItem('rememberedPhone', phone);
    } else {
        localStorage.removeItem('rememberedPhone');
    }
}

function loadRememberedPhone() {
    const rememberedPhone = localStorage.getItem('rememberedPhone');
    const phoneInput = document.getElementById('loginPhone');
    const rememberCheckbox = document.getElementById('rememberMe');
    
    if (rememberedPhone && phoneInput) {
        phoneInput.value = rememberedPhone;
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }
}

// ===================================
// INITIALIZE AUTH PAGE
// ===================================
function initAuthPage() {
    // Load remembered phone on login page
    if (window.location.pathname.includes('login.html')) {
        loadRememberedPhone();
    }
    
    // Setup user type change listener on register page
    const userTypeSelect = document.getElementById('userType');
    if (userTypeSelect) {
        userTypeSelect.addEventListener('change', toggleUserTypeFields);
    }
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthPage);
} else {
    initAuthPage();
}

// ===================================
// EXPORT FUNCTIONS (for other scripts)
// ===================================
// These are already available globally since we're not using modules

console.log('Auth.js loaded successfully!');