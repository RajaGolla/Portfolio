document.addEventListener('DOMContentLoaded', function () {
    // Profile Modal Elements
    const profileIcon = document.querySelector('a[href="#profile"]');
    const profileModal = document.getElementById('profile-modal');
    const closeProfileBtn = document.getElementById('close-profile-btn');
    const signInForm = document.getElementById('sign-in-form');
    const signUpForm = document.getElementById('sign-up-form');
    const showSignUpBtn = document.getElementById('show-sign-up');
    const showSignInBtn = document.getElementById('show-sign-in');

    // Open the profile modal when the profile icon is clicked
    profileIcon.addEventListener('click', function (event) {
        event.preventDefault(); // Prevents default action of the link
        profileModal.style.display = 'flex'; // Show the modal
    });

    // Close the profile modal when the close button is clicked
    closeProfileBtn.addEventListener('click', function () {
        profileModal.style.display = 'none'; // Hide the modal
    });

    // Switch to Sign Up form
    showSignUpBtn.addEventListener('click', function () {
        signInForm.style.display = 'none'; // Hide Sign In form
        signUpForm.style.display = 'block'; // Show Sign Up form
    });

    // Switch to Sign In form
    showSignInBtn.addEventListener('click', function () {
        signUpForm.style.display = 'none'; // Hide Sign Up form
        signInForm.style.display = 'block'; // Show Sign In form
    });

    // Optionally, you can also close the modal if the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (event.target === profileModal) {
            profileModal.style.display = 'none'; // Close modal when clicking outside
        }
    });
});
