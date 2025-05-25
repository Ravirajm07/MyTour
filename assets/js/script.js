'use strict';

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const header = document.querySelector("[data-header]");

navToggleBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  header.classList.toggle("active");
});



/**
 * show go top btn when scroll window to 500px
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  window.scrollY >= 500 ? goTopBtn.classList.add("active")
    : goTopBtn.classList.remove("active");
});

// Modal functionality
const modalTriggers = document.querySelectorAll('[data-modal-target]');
const modalOverlay = document.querySelector('.modal-overlay');

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = trigger.getAttribute('data-modal-target');
    const modal = document.querySelector(modalId);
    
    // If clicking a link inside another modal, close the current modal first
    const currentModal = trigger.closest('.modal');
    if (currentModal) {
      closeModal(currentModal);
    }
    
    openModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  modalOverlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
}

// Close modal when clicking the close button
document.querySelectorAll('.close-modal').forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

// Close modal when clicking the overlay
modalOverlay.addEventListener('click', () => {
  const activeModal = document.querySelector('.modal.active');
  closeModal(activeModal);
});

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.active');
    closeModal(activeModal);
  }
});

// Handle login form submission
const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically make an API call to authenticate the user
    console.log('Login attempt:', { email, password });
    
    // Close the login modal
    const modal = loginForm.closest('.modal');
    closeModal(modal);
    
    // Show success notification
    showNotification('Login successful! Redirecting to your account...');
    
    // Redirect to account page after a short delay
    setTimeout(() => {
      window.location.href = 'my-account.html';
    }, 1500);
  });
}

// Account page functionality
if (window.location.pathname.includes('my-account.html')) {
  // Handle account menu navigation
  const accountMenu = document.querySelector('.account-menu');
  const sections = document.querySelectorAll('.account-details > div');
  
  accountMenu.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (e.target.tagName === 'A') {
      const targetId = e.target.getAttribute('href').substring(1);
      
      // Update active menu item
      accountMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
      e.target.parentElement.classList.add('active');
      
      // Show target section
      sections.forEach(section => {
        section.style.display = section.id === targetId ? 'block' : 'none';
      });
    }
  });
  
  // Handle logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Here you would typically make an API call to logout
      console.log('Logging out...');
      
      // Show notification
      showNotification('Logging out...');
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    });
  }
  
  // Handle settings form submission
  const settingsForm = document.querySelector('.settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('update-name').value;
      const email = document.getElementById('update-email').value;
      const phone = document.getElementById('update-phone').value;
      
      // Here you would typically make an API call to update the profile
      console.log('Updating profile:', { name, email, phone });
      
      // Show success notification
      showNotification('Profile updated successfully!');
    });
  }

  // Edit Profile logic
  const editProfileBtn = document.getElementById('editProfileBtn');
  const profileInfo = document.getElementById('profileInfo');
  const profileEditForm = document.getElementById('profileEditForm');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const cancelProfileBtn = document.getElementById('cancelProfileBtn');

  if (editProfileBtn && profileInfo && profileEditForm) {
    editProfileBtn.addEventListener('click', () => {
      // Set form values to current profile
      document.getElementById('editProfileName').value = document.getElementById('profileName').textContent;
      document.getElementById('editProfileEmail').value = document.getElementById('profileEmail').textContent;
      document.getElementById('editProfilePhone').value = document.getElementById('profilePhone').textContent;
      profileInfo.style.display = 'none';
      profileEditForm.style.display = 'block';
    });
  }

  if (saveProfileBtn && profileInfo && profileEditForm) {
    saveProfileBtn.addEventListener('click', () => {
      // Get new values
      const newName = document.getElementById('editProfileName').value;
      const newEmail = document.getElementById('editProfileEmail').value;
      const newPhone = document.getElementById('editProfilePhone').value;

      // Update profile info on the page
      document.getElementById('profileName').textContent = newName;
      document.getElementById('profileEmail').textContent = newEmail;
      document.getElementById('profilePhone').textContent = newPhone;

      // Update localStorage
      let user = JSON.parse(localStorage.getItem('user')) || {};
      user.name = newName;
      user.email = newEmail;
      user.phone = newPhone;
      localStorage.setItem('user', JSON.stringify(user));

      profileInfo.style.display = 'block';
      profileEditForm.style.display = 'none';
      showNotification('Profile updated successfully!');
    });
  }

  if (cancelProfileBtn && profileInfo && profileEditForm) {
    cancelProfileBtn.addEventListener('click', () => {
      profileInfo.style.display = 'block';
      profileEditForm.style.display = 'none';
    });
  }
}

// Notification functionality
function showNotification(message, duration = 3000) {
  const notification = document.getElementById('notification');
  const notificationMessage = notification.querySelector('.notification-message');
  
  notificationMessage.textContent = message;
  notification.classList.add('active');
  
  setTimeout(() => {
    notification.classList.remove('active');
  }, duration);
}

// Handle signup form submission
const signupForm = document.querySelector('.signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (password !== confirmPassword) {
      showNotification('Passwords do not match!');
      return;
    }

    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.userId) {
        showNotification('Account created! Please verify your account.');
        lastSignupUserId = data.userId;

        // Show the Verify Now button
        if (!verifyBtn) {
          verifyBtn = document.createElement('button');
          verifyBtn.textContent = 'Verify Now';
          verifyBtn.style.margin = '20px auto';
          verifyBtn.style.display = 'block';
          verifyBtn.className = 'btn btn-primary';
          verifyBtn.onclick = function() {
            fetch(`http://localhost:5000/verify/${lastSignupUserId}`)
              .then(res => res.json())
              .then(data => showNotification(data.message));
          };
          document.body.appendChild(verifyBtn);
        }
        verifyBtn.style.display = 'block';
      } else {
        showNotification(data.error || 'Signup failed');
      }
    });
  });
}

// Handle forgot password form submission
const forgotPasswordForm = document.querySelector('.forgot-password-form');
if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;
    
    // Here you would typically make an API call to send reset password email
    console.log('Password reset attempt:', { email });
    
    // For demo purposes, just close the modal
    const modal = forgotPasswordForm.closest('.modal');
    closeModal(modal);
  });
}

document.querySelector('.login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.user) {
      showNotification('Login successful!');
      // Save user info for account page
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect to account page, etc.
      setTimeout(() => {
        window.location.href = 'my-account.html';
      }, 1000);
    } else {
      showNotification(data.error || 'Login failed');
    }
  });
});

window.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    // If you collect phone/memberSince, set them here as well
  }

  // Book Now button handler
  document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default if it's an <a>
      const destination = btn.getAttribute('data-destination');
      if (destination) {
        window.location.href = `booking.html?destination=${encodeURIComponent(destination)}`;
      } else {
        alert('No destination specified!');
      }
    });
  });
});