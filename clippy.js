const tips = [
  "Did you know? Internet Explorer 3.0 introduced CSS support!",
  "Tip: Windows 95 was the first OS to include the Start button!",
  "Fun fact: Microsoft Office debuted in 1990!",
  "Pro Tip: Clippy first appeared in Microsoft Office 97.",
  "Did you know? The Windows logo changed significantly in Windows 95!",
];

const clippyContainer = document.getElementById("clippy-container");
const clippyTip = document.getElementById("clippy-tip");
const closeBtn = document.querySelector(".clippy .close-btn");

let clippyTimeout; // Timer for hiding Clippy
let isClippyVisible = false;

// Function to generate random positions
function getRandomPosition() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const randomX = Math.random() * (screenWidth - 250); // Ensures Clippy stays within screen bounds
  const randomY = Math.random() * (screenHeight - 250);
  return { x: randomX, y: randomY };
}

// Function to show Clippy
function showClippy() {
  if (isClippyVisible) return; // Prevent multiple show calls
  const { x, y } = getRandomPosition();
  clippyContainer.style.left = `${x}px`;
  clippyContainer.style.top = `${y}px`;
  clippyTip.textContent = tips[Math.floor(Math.random() * tips.length)];
  clippyContainer.classList.remove("hidden");
  isClippyVisible = true;

  // Set timer to hide Clippy after 5 seconds
  clippyTimeout = setTimeout(hideClippy, 5000);
}

// Function to hide Clippy
function hideClippy() {
  if (!isClippyVisible) return; // Prevent multiple hide calls
  clippyContainer.classList.add("hidden");
  isClippyVisible = false;

  // Wait 5 seconds, then show Clippy again
  setTimeout(showClippy, 5000);
}

// Close button handler
closeBtn.addEventListener("click", () => {
  clearTimeout(clippyTimeout); // Cancel automatic hide
  hideClippy(); // Immediately hide Clippy
});

// Initial Clippy appearance
setTimeout(showClippy, 1000); // First appearance after 1 second

clippyContainer.onmousedown = function (event) {
  const shiftX = event.clientX - clippyContainer.getBoundingClientRect().left;
  const shiftY = event.clientY - clippyContainer.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    clippyContainer.style.left = pageX - shiftX + "px";
    clippyContainer.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  clippyContainer.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    clippyContainer.onmouseup = null;
  };
};

clippyContainer.ondragstart = function () {
  return false;
};

const reservedTop = 200;
const reservedBottom = 100;

const randomY =
  Math.random() * (screenHeight - reservedTop - reservedBottom - 250) +
  reservedTop;
