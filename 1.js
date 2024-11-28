document.addEventListener('DOMContentLoaded', function () {
    // Show Profile Modal
    const profileIcon = document.getElementById('profile-icon');
    const profileModal = document.getElementById('profile-modal');
    const closeProfileBtn = document.getElementById('close-profile-btn');

    profileIcon.addEventListener('click', function () {
        profileModal.style.display = 'flex';
    });

    closeProfileBtn.addEventListener('click', function () {
        profileModal.style.display = 'none';
    });

    // Section redirection logic for Men, Women, and Kids
    document.getElementById('men-link').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('men').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('women-link').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('women').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('kids-link').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('kids').scrollIntoView({ behavior: 'smooth' });
    });
});
