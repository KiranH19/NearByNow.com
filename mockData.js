// ===================================
// MOCK DATA FOR NEARBYNOW
// Jobs & Services for Tier 2/3 Cities
// ===================================

// Sample Jobs Data
const mockJobs = [
    // DAILY JOBS
    {
        id: 1,
        title: "Shop Helper Needed",
        type: "daily",
        salary: 600,
        salaryPeriod: "day",
        company: "Raj Grocery Store",
        location: "Sector 15, Rourkela",
        distance: 1.2,
        description: "Need helper for shop work. Morning 9am to evening 6pm. Simple tasks like arranging items, billing support, and customer service.",
        contact: "9876543210",
        postedBy: "Raj Kumar",
        postedDate: "2024-02-10",
        requirements: "Basic reading/writing, Good behavior",
        experience: "Freshers welcome"
    },
    {
        id: 2,
        title: "Delivery Boy - Food",
        type: "daily",
        salary: 700,
        salaryPeriod: "day",
        company: "Swiggy Partner Restaurant",
        location: "Civil Township, Rourkela",
        distance: 0.8,
        description: "Food delivery from 11am-3pm and 6pm-10pm. Own bike required. Petrol allowance provided.",
        contact: "9123456789",
        postedBy: "Restaurant Manager",
        postedDate: "2024-02-11",
        requirements: "Own two-wheeler, Valid driving license",
        experience: "No experience needed"
    },
    {
        id: 3,
        title: "Construction Labor",
        type: "daily",
        salary: 800,
        salaryPeriod: "day",
        company: "Patel Construction",
        location: "Panposh Road, Rourkela",
        distance: 3.5,
        description: "Need laborers for building construction. 8am to 5pm. Food and tea provided on site.",
        contact: "9988776655",
        postedBy: "Site Supervisor",
        postedDate: "2024-02-09",
        requirements: "Physically fit, Hard working",
        experience: "Experienced preferred"
    },
    {
        id: 4,
        title: "Loading/Unloading Helper",
        type: "daily",
        salary: 650,
        salaryPeriod: "day",
        company: "Godown Services",
        location: "Chhend Colony, Rourkela",
        distance: 2.1,
        description: "Loading and unloading goods from trucks. Flexible timing based on truck arrival. Daily payment.",
        contact: "8877665544",
        postedBy: "Warehouse Manager",
        postedDate: "2024-02-11",
        requirements: "Good physical strength",
        experience: "Freshers can apply"
    },
    {
        id: 5,
        title: "Tea Stall Helper",
        type: "daily",
        salary: 500,
        salaryPeriod: "day",
        company: "Sharma Tea Stall",
        location: "Uditnagar, Rourkela",
        distance: 1.5,
        description: "Help in tea preparation, serving customers, cleaning. 6am to 12pm. Free breakfast and tea.",
        contact: "7766554433",
        postedBy: "Shop Owner",
        postedDate: "2024-02-10",
        requirements: "Clean habits, Punctual",
        experience: "No experience needed"
    },

    // MONTHLY JOBS
    {
        id: 6,
        title: "Retail Sales Executive",
        type: "monthly",
        salary: 12000,
        salaryPeriod: "month",
        company: "Mobile World",
        location: "Bisra Road, Rourkela",
        distance: 2.5,
        description: "Selling mobile phones and accessories. Handle billing, customer queries, stock management. Full time 10am-8pm.",
        contact: "9871234567",
        postedBy: "Store Manager",
        postedDate: "2024-02-08",
        requirements: "10th/12th pass, Basic English, Good communication",
        experience: "0-2 years"
    },
    {
        id: 7,
        title: "Factory Worker - Steel Plant",
        type: "monthly",
        salary: 15000,
        salaryPeriod: "month",
        company: "RSP Contractor",
        location: "RSP Township, Rourkela",
        distance: 4.2,
        description: "Work in steel plant on contract basis. 8-hour shifts. PF and ESI benefits provided. Safety training given.",
        contact: "9090909090",
        postedBy: "HR Department",
        postedDate: "2024-02-07",
        requirements: "10th pass, Age 18-35",
        experience: "Freshers welcome"
    },
    {
        id: 8,
        title: "Security Guard",
        type: "monthly",
        salary: 10000,
        salaryPeriod: "month",
        company: "Secure Services Pvt Ltd",
        location: "Fertilizer Township, Rourkela",
        distance: 3.8,
        description: "12-hour night shift. Guard company premises. Uniform and food provided. PF benefits available.",
        contact: "8787878787",
        postedBy: "Security Manager",
        postedDate: "2024-02-09",
        requirements: "8th pass minimum, Age 21-45, Physically fit",
        experience: "Experience preferred"
    },
    {
        id: 9,
        title: "Computer Operator",
        type: "monthly",
        salary: 14000,
        salaryPeriod: "month",
        company: "Digital Solutions",
        location: "Kachery Road, Rourkela",
        distance: 1.8,
        description: "Data entry, MS Office work, basic computer operations. 9am-6pm, Monday to Saturday.",
        contact: "9876512340",
        postedBy: "Office Admin",
        postedDate: "2024-02-10",
        requirements: "12th pass, Computer knowledge (MS Office, Typing)",
        experience: "0-1 year"
    },
    {
        id: 10,
        title: "Cook - Mess/Canteen",
        type: "monthly",
        salary: 11000,
        salaryPeriod: "month",
        company: "College Canteen",
        location: "NIT Campus, Rourkela",
        distance: 5.0,
        description: "Prepare meals for students. Breakfast, lunch, dinner. Food and accommodation provided on campus.",
        contact: "7654321098",
        postedBy: "Mess Contractor",
        postedDate: "2024-02-11",
        requirements: "Experience in cooking for large groups",
        experience: "2+ years required"
    },
    {
        id: 11,
        title: "Accountant Assistant",
        type: "monthly",
        salary: 16000,
        salaryPeriod: "month",
        company: "Verma & Associates",
        location: "Main Market, Rourkela",
        distance: 2.0,
        description: "Maintain account books, billing, GST filing support, bank work. Knowledge of Tally required.",
        contact: "9123498765",
        postedBy: "CA Firm",
        postedDate: "2024-02-09",
        requirements: "Commerce graduate, Tally knowledge, Basic accounting",
        experience: "1-3 years"
    },
    {
        id: 12,
        title: "Warehouse Supervisor",
        type: "monthly",
        salary: 18000,
        salaryPeriod: "month",
        company: "Logistics Hub",
        location: "Hamirpur Road, Rourkela",
        distance: 6.5,
        description: "Supervise loading/unloading, maintain stock records, coordinate with delivery team. Two-wheeler required.",
        contact: "8765432109",
        postedBy: "Operations Head",
        postedDate: "2024-02-08",
        requirements: "Graduate, Good communication, Computer basics",
        experience: "2-4 years in warehouse/logistics"
    },

    // CONTRACT JOBS
    {
        id: 13,
        title: "Electrician - Project Based",
        type: "contract",
        salary: 25000,
        salaryPeriod: "project",
        company: "Building Contractors Ltd",
        location: "Sector 19, Rourkela",
        distance: 2.8,
        description: "Complete electrical wiring for 3 residential buildings. 2-month project. Payments weekly.",
        contact: "9988771122",
        postedBy: "Project Manager",
        postedDate: "2024-02-10",
        requirements: "ITI Electrician certified, 3+ years experience",
        experience: "Experienced only"
    },
    {
        id: 14,
        title: "Event Management - Marriage Season",
        type: "contract",
        salary: 35000,
        salaryPeriod: "season",
        company: "Royal Events",
        location: "Multiple Locations, Rourkela",
        distance: 1.0,
        description: "Marriage season work (Feb-June). Setup decoration, coordinate vendors, manage events. High earning potential.",
        contact: "7788996655",
        postedBy: "Event Company",
        postedDate: "2024-02-07",
        requirements: "Good communication, Hardworking, Flexible timings",
        experience: "1+ year in events"
    },
    {
        id: 15,
        title: "Painting Contractor",
        type: "contract",
        salary: 30000,
        salaryPeriod: "project",
        company: "Home Renovation Co.",
        location: "Basanti Colony, Rourkela",
        distance: 3.2,
        description: "Paint 5 flats completely. Interior and exterior. Materials provided. 3-week deadline.",
        contact: "9876556789",
        postedBy: "Building Owner",
        postedDate: "2024-02-11",
        requirements: "Professional painting experience, Own tools",
        experience: "3+ years"
    },
    {
        id: 16,
        title: "Data Entry - Census Project",
        type: "contract",
        salary: 20000,
        salaryPeriod: "month",
        company: "Government Survey Project",
        location: "District Office, Rourkela",
        distance: 2.5,
        description: "Government project for 3 months. Data entry and field survey. Fixed 3-month contract with possible extension.",
        contact: "8899776655",
        postedBy: "Survey Department",
        postedDate: "2024-02-09",
        requirements: "Graduate, Computer knowledge, Local knowledge",
        experience: "Freshers can apply"
    },
    {
        id: 17,
        title: "Plumbing Work - Housing Project",
        type: "contract",
        salary: 40000,
        salaryPeriod: "project",
        company: "Urban Housing Project",
        location: "Vedvyas, Rourkela",
        distance: 4.5,
        description: "Complete plumbing installation for 10 new flats. 6-week project. Advance payment available.",
        contact: "9123456780",
        postedBy: "Construction Head",
        postedDate: "2024-02-08",
        requirements: "Certified plumber, Team of 2-3 workers, Experience with projects",
        experience: "5+ years required"
    },
    {
        id: 18,
        title: "AC Installation Team",
        type: "contract",
        salary: 50000,
        salaryPeriod: "project",
        company: "Cool Air Services",
        location: "Various Locations, Rourkela",
        distance: 2.0,
        description: "Install ACs in new office building - 25 units. All materials provided. 2-week deadline. Payment on completion.",
        contact: "7766889900",
        postedBy: "AC Company",
        postedDate: "2024-02-10",
        requirements: "AC installation certified, Team of 3-4 technicians",
        experience: "Commercial installation experience required"
    },
    {
        id: 19,
        title: "Photography - Event Coverage",
        type: "contract",
        salary: 15000,
        salaryPeriod: "event",
        company: "Corporate Events",
        location: "Hotel Venue, Rourkela",
        distance: 1.5,
        description: "Cover corporate annual day event. Full day shoot, editing, deliver 200+ photos in 3 days.",
        contact: "9988776644",
        postedBy: "Event Organizer",
        postedDate: "2024-02-11",
        requirements: "Professional camera, Portfolio required, Editing skills",
        experience: "Event photography experience"
    },
    {
        id: 20,
        title: "Website Development Project",
        type: "contract",
        salary: 30000,
        salaryPeriod: "project",
        company: "Local Business",
        location: "Work from Home",
        distance: 0.5,
        description: "Develop simple business website with 5 pages. Include contact form, gallery. 3-week deadline.",
        contact: "8877665533",
        postedBy: "Business Owner",
        postedDate: "2024-02-09",
        requirements: "HTML, CSS, JavaScript knowledge, Portfolio required",
        experience: "1+ year web development"
    }
];

// Sample Services Data
const mockServices = [
    // ELECTRICIAN
    {
        id: 1,
        name: "Ram Electrician Services",
        category: "electrician",
        description: "All types of electrical work - wiring, repair, installation, MCB/DB work. 24/7 emergency service available. Certified electrician with 10 years experience.",
        provider: "Ram Singh",
        location: "Civil Township, Rourkela",
        distance: 0.8,
        phone: "9876543210",
        experience: "10 years",
        available: true,
        rating: 4.5,
        services: ["House wiring", "Industrial work", "Fault repair", "Installation"],
        price: "₹300-500/hour"
    },
    {
        id: 2,
        name: "Sanjay Electrical Works",
        category: "electrician",
        description: "Expert in residential and commercial electrical solutions. Fan, AC, geyser installation and repair.",
        provider: "Sanjay Kumar",
        location: "Uditnagar, Rourkela",
        distance: 2.3,
        phone: "9123456789",
        experience: "8 years",
        available: true,
        rating: 4.3,
        services: ["Home electrical", "Appliance repair", "Switchboard work"],
        price: "₹250-400/hour"
    },

    // PLUMBER
    {
        id: 3,
        name: "Mohan Plumbing Services",
        category: "plumber",
        description: "All plumbing work - pipelines, leakage, bathroom fittings, water tank installation. Quick and reliable service.",
        provider: "Mohan Patel",
        location: "Sector 15, Rourkela",
        distance: 1.5,
        phone: "9988776655",
        experience: "12 years",
        available: true,
        rating: 4.7,
        services: ["Pipe leakage", "Bathroom fitting", "Water tank", "Drainage"],
        price: "₹300-600/visit"
    },
    {
        id: 4,
        name: "Quick Fix Plumbers",
        category: "plumber",
        description: "Emergency plumbing services. Available for urgent repairs. Experienced in all types of plumbing work.",
        provider: "Raju Mistri",
        location: "Panposh Road, Rourkela",
        distance: 3.1,
        phone: "8877665544",
        experience: "6 years",
        available: true,
        rating: 4.2,
        services: ["Emergency repair", "Installation", "Maintenance"],
        price: "₹400-700/visit"
    },

    // PAINTER
    {
        id: 5,
        name: "Sharma Painting Works",
        category: "painter",
        description: "Professional house painting - interior and exterior. Asian Paints approved contractor. Free color consultation.",
        provider: "Rakesh Sharma",
        location: "Bisra Road, Rourkela",
        distance: 2.7,
        phone: "7766554433",
        experience: "15 years",
        available: true,
        rating: 4.8,
        services: ["Interior painting", "Exterior painting", "Texture work", "Waterproofing"],
        price: "₹12-18/sq ft"
    },
    {
        id: 6,
        name: "Color Expert Painters",
        category: "painter",
        description: "Quality painting services for homes and offices. All brands of paint work. Neat and clean work guaranteed.",
        provider: "Anil Kumar",
        location: "Sector 19, Rourkela",
        distance: 3.5,
        phone: "9871234560",
        experience: "9 years",
        available: true,
        rating: 4.4,
        services: ["Home painting", "Office painting", "Wood polish"],
        price: "₹10-15/sq ft"
    },

    // HOSPITAL
    {
        id: 7,
        name: "City Hospital",
        category: "hospital",
        description: "24/7 emergency services. General medicine, surgery, ICU, pharmacy. Experienced doctors and modern facilities.",
        provider: "Medical Trust",
        location: "Kachery Road, Rourkela",
        distance: 1.8,
        phone: "9090909090",
        experience: "20 years",
        available: true,
        rating: 4.6,
        services: ["Emergency", "OPD", "Surgery", "Diagnostics", "Pharmacy"],
        price: "Varies"
    },
    {
        id: 8,
        name: "Health Plus Clinic",
        category: "hospital",
        description: "Multi-specialty clinic. General physician, pediatrics, gynecology. Open 8am-10pm daily.",
        provider: "Dr. Sharma",
        location: "Civil Township, Rourkela",
        distance: 1.2,
        phone: "8787878787",
        experience: "12 years",
        available: true,
        rating: 4.5,
        services: ["OPD", "Consultation", "Lab tests", "Vaccination"],
        price: "₹200-500/consultation"
    },

    // BANK
    {
        id: 9,
        name: "State Bank of India",
        category: "bank",
        description: "Full service bank branch. Savings, loans, lockers, deposits. ATM available 24/7.",
        provider: "SBI",
        location: "Main Market, Rourkela",
        distance: 2.0,
        phone: "1800-425-3800",
        experience: "50+ years",
        available: true,
        rating: 4.3,
        services: ["Savings Account", "Loans", "FD/RD", "Lockers", "ATM"],
        price: "Banking services"
    },
    {
        id: 10,
        name: "HDFC Bank Branch",
        category: "bank",
        description: "Private sector bank. Quick account opening, home loans, personal loans, credit cards. Modern banking facilities.",
        provider: "HDFC",
        location: "Uditnagar, Rourkela",
        distance: 1.6,
        phone: "1800-267-8800",
        experience: "25+ years",
        available: true,
        rating: 4.4,
        services: ["Accounts", "Loans", "Credit Cards", "Investment"],
        price: "Banking services"
    },

    // CAR WASHING
    {
        id: 11,
        name: "Sparkle Car Wash",
        category: "car-washing",
        description: "Professional car washing and detailing. Interior cleaning, polishing, waxing. Doorstep service available.",
        provider: "Auto Care Services",
        location: "Panposh Road, Rourkela",
        distance: 2.5,
        phone: "9876512340",
        experience: "5 years",
        available: true,
        rating: 4.5,
        services: ["Exterior wash", "Interior cleaning", "Polish", "Wax"],
        price: "₹200-800/wash"
    },
    {
        id: 12,
        name: "Quick Wash Center",
        category: "car-washing",
        description: "Fast car washing service. Water wash, foam wash, vacuum cleaning. Open 7am-9pm.",
        provider: "Wash Pro",
        location: "Bisra Road, Rourkela",
        distance: 3.2,
        phone: "7654321098",
        experience: "3 years",
        available: true,
        rating: 4.2,
        services: ["Basic wash", "Deep cleaning", "Bike wash"],
        price: "₹100-500"
    },

    // REPAIR SERVICES
    {
        id: 13,
        name: "Mobile Repair Expert",
        category: "repair",
        description: "All mobile phone repairs. Screen replacement, battery change, software issues. All brands. Same day service.",
        provider: "Tech Solutions",
        location: "Main Market, Rourkela",
        distance: 1.9,
        phone: "9123498765",
        experience: "7 years",
        available: true,
        rating: 4.6,
        services: ["Screen repair", "Battery", "Software", "Water damage"],
        price: "₹300-3000"
    },
    {
        id: 14,
        name: "Home Appliance Repair",
        category: "repair",
        description: "Repair all home appliances - TV, fridge, washing machine, AC, microwave. Doorstep service.",
        provider: "Service Center",
        location: "Sector 19, Rourkela",
        distance: 2.8,
        phone: "8765432109",
        experience: "10 years",
        available: true,
        rating: 4.4,
        services: ["TV repair", "Fridge", "Washing machine", "AC service"],
        price: "₹300-2000/visit"
    },

    // CLEANING SERVICES
    {
        id: 15,
        name: "Clean Home Services",
        category: "cleaning",
        description: "Professional house cleaning. Deep cleaning, regular cleaning, bathroom/kitchen cleaning. Trained staff.",
        provider: "Clean Pro",
        location: "Civil Township, Rourkela",
        distance: 1.3,
        phone: "9988771122",
        experience: "4 years",
        available: true,
        rating: 4.5,
        services: ["House cleaning", "Office cleaning", "Deep cleaning", "Sofa cleaning"],
        price: "₹500-2000/visit"
    },
    {
        id: 16,
        name: "Pest Control Services",
        category: "cleaning",
        description: "Complete pest control solutions. Cockroach, termite, rat control. Safe chemicals, guaranteed results.",
        provider: "Pest Free Solutions",
        location: "Uditnagar, Rourkela",
        distance: 2.1,
        phone: "7788996655",
        experience: "8 years",
        available: true,
        rating: 4.7,
        services: ["Cockroach control", "Termite treatment", "Rat control", "Bed bugs"],
        price: "₹800-3000/treatment"
    },

    // TEACHING/TUITION
    {
        id: 17,
        name: "Maths & Science Tuition",
        category: "teaching",
        description: "Home tuition for class 6-10. Maths, Science, English. Experienced teacher. Individual attention guaranteed.",
        provider: "Priya Sharma",
        location: "Sector 15, Rourkela",
        distance: 1.7,
        phone: "9876556789",
        experience: "6 years",
        available: true,
        rating: 4.8,
        services: ["6-10 tuition", "Maths", "Science", "English"],
        price: "₹2000-4000/month"
    },
    {
        id: 18,
        name: "Computer Training Institute",
        category: "teaching",
        description: "Basic computer courses, MS Office, Tally, programming. Job-oriented courses. Certificate provided.",
        provider: "Tech Academy",
        location: "Kachery Road, Rourkela",
        distance: 2.4,
        phone: "8899776655",
        experience: "10 years",
        available: true,
        rating: 4.5,
        services: ["Basic computer", "MS Office", "Tally", "Programming"],
        price: "₹2000-5000/course"
    },

    // ADDITIONAL SERVICES
    {
        id: 19,
        name: "Two Wheeler Mechanic",
        category: "repair",
        description: "Bike and scooter repair. All brands servicing. Engine work, electrical, spare parts available.",
        provider: "Gupta Garage",
        location: "Hamirpur Road, Rourkela",
        distance: 3.8,
        phone: "9123456780",
        experience: "12 years",
        available: true,
        rating: 4.3,
        services: ["Bike service", "Repair", "Spare parts", "Engine work"],
        price: "₹200-1500"
    },
    {
        id: 20,
        name: "Tailor & Alteration",
        category: "repair",
        description: "Ladies and gents tailoring. Stitching, alteration, zip replacement. Quick service. Reasonable rates.",
        provider: "Master Tailor",
        location: "Main Market, Rourkela",
        distance: 2.0,
        phone: "7766889900",
        experience: "20 years",
        available: true,
        rating: 4.6,
        services: ["Stitching", "Alteration", "Design", "Repair"],
        price: "₹100-1000"
    }
];

// Sample User Data (for testing login/register)
let mockUsers = [
    {
        id: 1,
        name: "Rahul Kumar",
        phone: "9876543210",
        password: "123456",
        userType: "seeker", // seeker, jobProvider, serviceProvider
        location: "Sector 15, Rourkela",
        savedJobs: [1, 6, 13],
        savedServices: [1, 7, 15],
        appliedJobs: [1, 6]
    },
    {
        id: 2,
        name: "Priya Sharma",
        phone: "9123456789",
        password: "123456",
        userType: "jobProvider",
        location: "Civil Township, Rourkela",
        postedJobs: [1, 2],
        companyName: "Raj Grocery Store"
    },
    {
        id: 3,
        name: "Ram Singh",
        phone: "9988776655",
        password: "123456",
        userType: "serviceProvider",
        location: "Civil Township, Rourkela",
        serviceId: 1,
        serviceName: "Ram Electrician Services"
    }
];

// Service Categories
const serviceCategories = [
    { id: 1, name: "Electrician", icon: "fa-bolt", count: 2 },
    { id: 2, name: "Plumber", icon: "fa-wrench", count: 2 },
    { id: 3, name: "Painter", icon: "fa-paint-roller", count: 2 },
    { id: 4, name: "Hospital", icon: "fa-hospital", count: 2 },
    { id: 5, name: "Bank", icon: "fa-building-columns", count: 2 },
    { id: 6, name: "Car Washing", icon: "fa-car", count: 2 },
    { id: 7, name: "Repair", icon: "fa-screwdriver-wrench", count: 4 },
    { id: 8, name: "Cleaning", icon: "fa-broom", count: 2 },
    { id: 9, name: "Teaching", icon: "fa-book", count: 2 }
];

// Job Categories
const jobTypes = [
    { id: 1, name: "Daily Jobs", value: "daily", color: "#1e40af" },
    { id: 2, name: "Monthly Jobs", value: "monthly", color: "#166534" },
    { id: 3, name: "Contract Jobs", value: "contract", color: "#92400e" }
];

// Distance Filters
const distanceFilters = [
    { value: 1, label: "Within 1 km" },
    { value: 3, label: "Within 3 km" },
    { value: 5, label: "Within 5 km" },
    { value: 10, label: "Within 10 km" },
    { value: 999, label: "All" }
];

// Helper Functions

// Get job by ID
function getJobById(id) {
    return mockJobs.find(job => job.id === parseInt(id));
}

// Get service by ID
function getServiceById(id) {
    return mockServices.find(service => service.id === parseInt(id));
}

// Filter jobs by type
function filterJobsByType(type) {
    if (type === 'all') return mockJobs;
    return mockJobs.filter(job => job.type === type);
}

// Filter jobs by distance
function filterJobsByDistance(maxDistance) {
    return mockJobs.filter(job => job.distance <= maxDistance);
}

// Filter services by category
function filterServicesByCategory(category) {
    if (category === 'all') return mockServices;
    return mockServices.filter(service => service.category === category);
}

// Filter services by distance
function filterServicesByDistance(maxDistance) {
    return mockServices.filter(service => service.distance <= maxDistance);
}

// Search jobs
function searchJobs(searchTerm) {
    const term = searchTerm.toLowerCase();
    return mockJobs.filter(job => 
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term)
    );
}

// Search services
function searchServices(searchTerm) {
    const term = searchTerm.toLowerCase();
    return mockServices.filter(service => 
        service.name.toLowerCase().includes(term) ||
        service.category.toLowerCase().includes(term) ||
        service.description.toLowerCase().includes(term) ||
        service.location.toLowerCase().includes(term)
    );
}

// Get user by phone
function getUserByPhone(phone) {
    return mockUsers.find(user => user.phone === phone);
}

// Add new user
function addUser(userData) {
    const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        savedJobs: [],
        savedServices: [],
        appliedJobs: [],
        postedJobs: [],
        serviceId: null
    };
    mockUsers.push(newUser);
    return newUser;
}

// Validate login
function validateLogin(phone, password) {
    const user = mockUsers.find(u => u.phone === phone && u.password === password);
    return user ? { success: true, user } : { success: false, message: "Invalid credentials" };
}

// Get statistics
function getStats() {
    return {
        totalJobs: mockJobs.length,
        dailyJobs: mockJobs.filter(j => j.type === 'daily').length,
        monthlyJobs: mockJobs.filter(j => j.type === 'monthly').length,
        contractJobs: mockJobs.filter(j => j.type === 'contract').length,
        totalServices: mockServices.length,
        totalUsers: mockUsers.length
    };
}

// Console log for testing
console.log('Mock Data Loaded Successfully!');
console.log('Total Jobs:', mockJobs.length);
console.log('Total Services:', mockServices.length);
console.log('Total Users:', mockUsers.length);