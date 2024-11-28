// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Redirect to category-specific pages
    const categoryCards = document.querySelectorAll(".category-card");
    categoryCards.forEach(card => {
        card.addEventListener("click", () => {
            const categoryName = card.querySelector("h3").innerText.toLowerCase().replace(" ", "-");
            window.location.href = `${categoryName}.html`; // E.g., summer-dresses.html
        });
    });

    // Wishlist button interaction
    const wishlistButtons = document.querySelectorAll(".wishlist");
    wishlistButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent triggering the parent card click
            button.classList.toggle("added");
            const icon = button.querySelector("i");
            icon.classList.toggle("far");
            icon.classList.toggle("fas");
        });
    });

    // Search bar functionality
    const searchBar = document.querySelector(".search-bar input");
    const searchIcon = document.querySelector(".search-bar i");

    const performSearch = () => {
        const query = searchBar.value.trim();
        if (query) {
            alert(`Searching for: ${query}`); // Placeholder for real search functionality
        } else {
            alert("Please enter a search query.");
        }
    };

    searchIcon.addEventListener("click", performSearch);
    searchBar.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });
});
