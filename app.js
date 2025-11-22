// Database Simulation using LocalStorage
class Database {
    constructor() {
        this.initializeDB();
    }

    initializeDB() {
        if (!localStorage.getItem('projects')) {
            localStorage.setItem('projects', JSON.stringify([]));
        }
        if (!localStorage.getItem('resources')) {
            localStorage.setItem('resources', JSON.stringify([]));
        }
        if (!localStorage.getItem('settings')) {
            localStorage.setItem('settings', JSON.stringify({
                municipalityName: 'بلدية المثال',
                currency: 'DZD',
                enableNotifications: true,
                language: 'ar'
            }));
        }
        // Add sample data if empty
        const projects = this.getProjects();
        if (projects.length === 0) {
            this.addSampleData();
        }
    }

    addSampleData() {
        const sampleProjects = [
            {
                id: 1,
                name: 'مشروع تطوير الطرق الرئيسية',
                description: 'تطوير وتحسين البنية التحتية للطرق الرئيسية في المدينة',
                budget: 5000000,
                startDate: '2025-01-15',
                endDate: '2025-12-31',
                status: 'in-progress',
                progress: 45
            },
            {
                id: 2,
                name: 'بناء مركز صحي جديد',
                description: 'إنشاء مركز صحي متطور بخدمات شاملة',
                budget: 3000000,
                startDate: '2025-02-01',
                endDate: '2025-10-30',
                status: 'in-progress',
                progress: 30
            },
            {
                id: 3,
                name: 'مشروع الطاقة الشمسية',
                description: 'تركيب ألواح شمسية للمباني العامة',
                budget: 2000000,
                startDate: '2024-10-01',
                endDate: '2025-03-31',
                status: 'completed',
                progress: 100
            },
            {
                id: 4,
                name: 'تحديث شبكة الصرف الصحي',
                description: 'تحديث وصيانة شبكة الصرف الصحي',
                budget: 4000000,
                startDate: '2025-01-01',
                endDate: '2025-06-30',
                status: 'delayed',
                progress: 20
            },
            {
                id: 5,
                name: 'بناء حديقة عامة',
                description: 'إنشاء حديقة عامة للعائلات والأطفال',
                budget: 1500000,
                startDate: '2025-03-01',
                endDate: '2025-08-31',
                status: 'planned',
                progress: 0
            }
        ];

        const sampleResources = [
            {
                id: 1,
                name: 'مهندسين مدنيين',
                type: 'human',
                quantity: 10,
                cost: 500000,
                projectId: 1
            },
            {
                id: 2,
                name: 'إسمنت',
                type: 'material',
                quantity: 1000,
                cost: 200000,
                projectId: 1
            },
            {
                id: 3,
                name: 'معدات بناء',
                type: 'equipment',
                quantity: 5,
                cost: 800000,
                projectId: 2
            },
            {
                id: 4,
                name: 'ألواح شمسية',
                type: 'material',
                quantity: 200,
                cost: 1500000,
                projectId: 3
            }
        ];

        localStorage.setItem('projects', JSON.stringify(sampleProjects));
        localStorage.setItem('resources', JSON.stringify(sampleResources));
    }

    getProjects() {
        return JSON.parse(localStorage.getItem('projects'));
    }

    getProject(id) {
        const projects = this.getProjects();
        return projects.find(p => p.id === id);
    }

    addProject(project) {
        const projects = this.getProjects();
        project.id = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
        return project;
    }

    updateProject(id, updates) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updates };
            localStorage.setItem('projects', JSON.stringify(projects));
            return projects[index];
        }
        return null;
    }

    deleteProject(id) {
        const projects = this.getProjects();
        const filtered = projects.filter(p => p.id !== id);
        localStorage.setItem('projects', JSON.stringify(filtered));
    }

    getResources() {
        return JSON.parse(localStorage.getItem('resources'));
    }

    addResource(resource) {
        const resources = this.getResources();
        resource.id = resources.length > 0 ? Math.max(...resources.map(r => r.id)) + 1 : 1;
        resources.push(resource);
        localStorage.setItem('resources', JSON.stringify(resources));
        return resource;
    }

    deleteResource(id) {
        const resources = this.getResources();
        const filtered = resources.filter(r => r.id !== id);
        localStorage.setItem('resources', JSON.stringify(filtered));
    }

    getSettings() {
        return JSON.parse(localStorage.getItem('settings'));
    }

    updateSettings(settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
    }
}

// Initialize Database
const db = new Database();

// Translation System
const translations = {
    ar: {
        // Dashboard
        'pageTitle': 'لوحة التحكم',
        'pageSubtitle': 'نظرة شاملة على المشاريع التنموية',
        'totalProjectsLabel': 'إجمالي المشاريع',
        'inProgressLabel': 'قيد التنفيذ',
        'completedLabel': 'مكتملة',
        'delayedLabel': 'متأخرة',
        'projectStatusChart': 'حالة المشاريع',
        'budgetChart': 'توزيع الميزانية',
        'recentProjectsTitle': 'المشاريع الحديثة',
        // Table Headers
        'th-name': 'اسم المشروع',
        'th-status': 'الحالة',
        'th-progress': 'نسبة الإنجاز',
        'th-budget': 'الميزانية',
        'th-deadline': 'الموعد النهائي',
        'th-actions': 'إجراءات',
        'th-resource-name': 'اسم المورد',
        'th-resource-type': 'النوع',
        'th-resource-quantity': 'الكمية',
        'th-resource-cost': 'التكلفة',
        'th-resource-project': 'المشروع',
        'th-resource-actions': 'إجراءات',
        // Status
        'planned': 'مخطط',
        'in-progress': 'قيد التنفيذ',
        'completed': 'مكتمل',
        'delayed': 'متأخر',
        // Actions
        'edit': 'تعديل',
        'delete': 'حذف',
        'view': 'عرض',
        // Resource Types
        'human': 'بشري',
        'material': 'مادي',
        'equipment': 'معدات',
        'financial': 'مالي'
    },
    en: {
        // Dashboard
        'pageTitle': 'Dashboard',
        'pageSubtitle': 'Comprehensive overview of development projects',
        'totalProjectsLabel': 'Total Projects',
        'inProgressLabel': 'In Progress',
        'completedLabel': 'Completed',
        'delayedLabel': 'Delayed',
        'projectStatusChart': 'Project Status',
        'budgetChart': 'Budget Distribution',
        'recentProjectsTitle': 'Recent Projects',
        // Table Headers
        'th-name': 'Project Name',
        'th-status': 'Status',
        'th-progress': 'Progress',
        'th-budget': 'Budget',
        'th-deadline': 'Deadline',
        'th-actions': 'Actions',
        'th-resource-name': 'Resource Name',
        'th-resource-type': 'Type',
        'th-resource-quantity': 'Quantity',
        'th-resource-cost': 'Cost',
        'th-resource-project': 'Project',
        'th-resource-actions': 'Actions',
        // Status
        'planned': 'Planned',
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'delayed': 'Delayed',
        // Actions
        'edit': 'Edit',
        'delete': 'Delete',
        'view': 'View',
        // Resource Types
        'human': 'Human',
        'material': 'Material',
        'equipment': 'Equipment',
        'financial': 'Financial'
    }
};

let currentLang = 'ar';

function translate(key) {
    return translations[currentLang][key] || key;
}

function updateTranslations() {
    document.querySelectorAll('[id]').forEach(element => {
        if (translations[currentLang][element.id]) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[currentLang][element.id];
            } else {
                element.textContent = translations[currentLang][element.id];
            }
        }
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.getElementById('langText').textContent = currentLang === 'ar' ? 'English' : 'العربية';
    updateTranslations();
    renderDashboard();
}

// Charts
let statusChart, budgetChart;

function initCharts() {
    const projects = db.getProjects();

    // Status Chart
    const statusCounts = {
        planned: projects.filter(p => p.status === 'planned').length,
        inProgress: projects.filter(p => p.status === 'in-progress').length,
        completed: projects.filter(p => p.status === 'completed').length,
        delayed: projects.filter(p => p.status === 'delayed').length
    };

    const statusCtx = document.getElementById('statusChart').getContext('2d');
    statusChart = new Chart(statusCtx, {
        type: 'bar',
        data: {
            labels: [translate('planned'), translate('in-progress'), translate('completed'), translate('delayed')],
            datasets: [{
                label: translate('projectStatusChart'),
                data: [statusCounts.planned, statusCounts.inProgress, statusCounts.completed, statusCounts.delayed],
                backgroundColor: ['#3b82f6', '#fbbf24', '#10b981', '#ef4444']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    // Budget Chart
    const budgetData = projects.reduce((acc, p) => {
        if (p.status === 'completed') acc.completed += p.budget;
        else if (p.status === 'in-progress') acc.inProgress += p.budget;
        else if (p.status === 'delayed') acc.delayed += p.budget;
        else acc.planned += p.budget;
        return acc;
    }, { planned: 0, inProgress: 0, completed: 0, delayed: 0 });

    const budgetCtx = document.getElementById('budgetPieChart').getContext('2d');
    budgetChart = new Chart(budgetCtx, {
        type: 'pie',
        data: {
            labels: [translate('planned'), translate('in-progress'), translate('completed'), translate('delayed')],
            datasets: [{
                data: [budgetData.planned, budgetData.inProgress, budgetData.completed, budgetData.delayed],
                backgroundColor: ['#3b82f6', '#fbbf24', '#10b981', '#ef4444']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: currentLang === 'ar' ? 'right' : 'left'
                }
            }
        }
    });
}

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;

        // Update active nav
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Show page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');

        // Render page content
        switch(page) {
            case 'dashboard':
                renderDashboard();
                break;
            case 'projects':
                renderProjects();
                break;
            case 'resources':
                renderResources();
                break;
            case 'reports':
                renderReports();
                break;
            case 'settings':
                renderSettings();
                break;
        }
    });
});

// Dashboard Rendering
function renderDashboard() {
    const projects = db.getProjects();

    // Update statistics
    document.getElementById('totalProjects').textContent = projects.length;
    document.getElementById('inProgressProjects').textContent = projects.filter(p => p.status === 'in-progress').length;
    document.getElementById('completedProjects').textContent = projects.filter(p => p.status === 'completed').length;
    document.getElementById('delayedProjects').textContent = projects.filter(p => p.status === 'delayed').length;

    // Update charts
    if (statusChart) statusChart.destroy();
    if (budgetChart) budgetChart.destroy();
    initCharts();

    // Render projects table
    const tbody = document.getElementById('projectsTableBody');
    tbody.innerHTML = '';

    projects.slice(0, 5).forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.name}</td>
            <td><span class="status-badge status-${project.status}">${translate(project.status)}</span></td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                </div>
                <small>${project.progress}%</small>
            </td>
            <td>${formatCurrency(project.budget)}</td>
            <td>${formatDate(project.endDate)}</td>
            <td class="action-buttons">
                <button class="btn-warning" onclick="editProject(${project.id})">${translate('edit')}</button>
                <button class="btn-danger" onclick="deleteProject(${project.id})">${translate('delete')}</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Projects Rendering
function renderProjects() {
    const projects = db.getProjects();
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${project.progress}%"></div>
            </div>
            <small>${project.progress}% ${translate('completed')}</small>
            <div class="project-meta">
                <span class="status-badge status-${project.status}">${translate(project.status)}</span>
                <span>${formatCurrency(project.budget)}</span>
            </div>
            <div class="action-buttons" style="margin-top: 16px;">
                <button class="btn-warning" onclick="editProject(${project.id})">${translate('edit')}</button>
                <button class="btn-danger" onclick="deleteProject(${project.id})">${translate('delete')}</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Resources Rendering
function renderResources() {
    const resources = db.getResources();
    const projects = db.getProjects();
    const tbody = document.getElementById('resourcesTableBody');
    tbody.innerHTML = '';

    resources.forEach(resource => {
        const project = projects.find(p => p.id === resource.projectId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${resource.name}</td>
            <td>${translate(resource.type)}</td>
            <td>${resource.quantity}</td>
            <td>${formatCurrency(resource.cost)}</td>
            <td>${project ? project.name : '-'}</td>
            <td class="action-buttons">
                <button class="btn-danger" onclick="deleteResource(${resource.id})">${translate('delete')}</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Update resource project select
    const select = document.getElementById('resourceProject');
    select.innerHTML = projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

// Settings Rendering
function renderSettings() {
    const settings = db.getSettings();
    document.getElementById('municipalityName').value = settings.municipalityName;
    document.getElementById('currency').value = settings.currency;
    document.getElementById('enableNotifications').checked = settings.enableNotifications;
}

// Modal Functions
function showAddProjectModal() {
    document.getElementById('addProjectModal').classList.add('active');
}

function showAddResourceModal() {
    const projects = db.getProjects();
    const select = document.getElementById('resourceProject');
    select.innerHTML = projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    document.getElementById('addResourceModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// CRUD Operations
function saveProject() {
    const project = {
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectDescription').value,
        budget: parseFloat(document.getElementById('projectBudget').value),
        startDate: document.getElementById('projectStartDate').value,
        endDate: document.getElementById('projectEndDate').value,
        status: document.getElementById('projectStatus').value,
        progress: 0
    };

    db.addProject(project);
    closeModal('addProjectModal');
    showNotification(currentLang === 'ar' ? 'تم إضافة المشروع بنجاح' : 'Project added successfully');
    renderDashboard();
    renderProjects();
}

function editProject(id) {
    const project = db.getProject(id);
    if (project) {
        document.getElementById('projectName').value = project.name;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectBudget').value = project.budget;
        document.getElementById('projectStartDate').value = project.startDate;
        document.getElementById('projectEndDate').value = project.endDate;
        document.getElementById('projectStatus').value = project.status;
        showAddProjectModal();
    }
}

function deleteProject(id) {
    if (confirm(currentLang === 'ar' ? 'هل أنت متأكد من حذف هذا المشروع؟' : 'Are you sure you want to delete this project?')) {
        db.deleteProject(id);
        showNotification(currentLang === 'ar' ? 'تم حذف المشروع' : 'Project deleted');
        renderDashboard();
        renderProjects();
    }
}

function saveResource() {
    const resource = {
        name: document.getElementById('resourceName').value,
        type: document.getElementById('resourceType').value,
        quantity: parseFloat(document.getElementById('resourceQuantity').value),
        cost: parseFloat(document.getElementById('resourceCost').value),
        projectId: parseInt(document.getElementById('resourceProject').value)
    };

    db.addResource(resource);
    closeModal('addResourceModal');
    showNotification(currentLang === 'ar' ? 'تم إضافة المورد بنجاح' : 'Resource added successfully');
    renderResources();
}

function deleteResource(id) {
    if (confirm(currentLang === 'ar' ? 'هل أنت متأكد من حذف هذا المورد؟' : 'Are you sure you want to delete this resource?')) {
        db.deleteResource(id);
        showNotification(currentLang === 'ar' ? 'تم حذف المورد' : 'Resource deleted');
        renderResources();
    }
}

function saveSettings() {
    const settings = {
        municipalityName: document.getElementById('municipalityName').value,
        currency: document.getElementById('currency').value,
        enableNotifications: document.getElementById('enableNotifications').checked,
        language: currentLang
    };

    db.updateSettings(settings);
    showNotification(currentLang === 'ar' ? 'تم حفظ الإعدادات' : 'Settings saved');
}

function generateReport() {
    const type = document.getElementById('reportType').value;
    const format = document.getElementById('reportFormat').value;

    showNotification(currentLang === 'ar' ?
        `جاري إنشاء تقرير ${type} بصيغة ${format}...` :
        `Generating ${type} report in ${format} format...`
    );

    // Simulate report generation
    setTimeout(() => {
        showNotification(currentLang === 'ar' ? 'تم إنشاء التقرير بنجاح' : 'Report generated successfully');
    }, 2000);
}

// Utility Functions
function formatCurrency(amount) {
    const settings = db.getSettings();
    return new Intl.NumberFormat(currentLang === 'ar' ? 'ar-DZ' : 'en-US', {
        style: 'currency',
        currency: settings.currency
    }).format(amount);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateFormat(currentLang === 'ar' ? 'ar-DZ' : 'en-US').format(date);
}

function showNotification(message) {
    // Simple notification system
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        ${currentLang === 'ar' ? 'right' : 'left'}: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
document.getElementById('projectSearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const projects = db.getProjects().filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );

    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${project.progress}%"></div>
            </div>
            <small>${project.progress}% ${translate('completed')}</small>
            <div class="project-meta">
                <span class="status-badge status-${project.status}">${translate(project.status)}</span>
                <span>${formatCurrency(project.budget)}</span>
            </div>
        `;
        grid.appendChild(card);
    });
});

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();

    // Set up notification system
    const settings = db.getSettings();
    if (settings.enableNotifications) {
        setInterval(() => {
            const projects = db.getProjects();
            const delayed = projects.filter(p => {
                const endDate = new Date(p.endDate);
                const today = new Date();
                return endDate < today && p.status !== 'completed';
            });

            if (delayed.length > 0) {
                console.log(`${delayed.length} ${currentLang === 'ar' ? 'مشروع متأخر' : 'delayed projects'}`);
            }
        }, 60000); // Check every minute
    }
});
