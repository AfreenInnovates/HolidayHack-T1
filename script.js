// JavaScript to show the popup on page load
window.onload = function () {
  const popup = document.querySelector(".popup");
  const closePopupButton = document.querySelector(".close-popup");

  // Show the popup after 1 second
  setTimeout(() => {
    popup.classList.add("show");
  }, 1000);

  // Close the popup when the close button is clicked
  closePopupButton.addEventListener("click", () => {
    popup.classList.remove("show");
  });
};
