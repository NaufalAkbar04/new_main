function toggleSidebar() {
    console.log('Toggle sidebar called');
    const sidebar = document.getElementById("sidebar");
    const closeBtn = document.querySelector('.close-btn');
    
    if (!sidebar) {
        console.error('Sidebar element not found');
        return;
    }

    console.log('Sidebar element:', sidebar);
    console.log('Current sidebar classes:', sidebar.classList);
    console.log('Close button:', closeBtn);

    const isOpen = sidebar.classList.contains("open");
    console.log('Current state:', isOpen ? 'open' : 'closed');

    if (isOpen) {
        sidebar.style.boxShadow = "none";
        sidebar.classList.remove("open");
        console.log('Sidebar closed');
    } else {
        sidebar.style.boxShadow = "2px 0 20px rgba(255, 255, 0, 0.5)";
        sidebar.classList.add("open");
        console.log('Sidebar opened');
    }

    console.log('Updated sidebar classes:', sidebar.classList);
    console.log('Computed width:', window.getComputedStyle(sidebar).width);
}

// Initialize sidebar on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sidebar script loaded');
    
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
        console.log('Menu button event listener added');
    } else {
        console.error('Menu button not found');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleSidebar);
        console.log('Close button event listener added');
    } else {
        console.error('Close button not found');
    }
});
