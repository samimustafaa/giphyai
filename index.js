	// Sticky Navbar
    let header = document.querySelector('header');
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
     
    menu.onclick = () => {
        navbar.classList.toggle('active');
    }
    window.onscroll = () => {
        navbar.classList.remove('active');
    }

// scroll to top
// let scrollTop = document.querySelector('.scroll-top');

// window.addEventListener('scroll', () => {
//     scrolllTop.classList.toggle('scroll-active', window.scrollY >= 20);
// })


const apiKey = 'Jzrx3UiCLNRV6O2pzGX1uwt1jAYzL8W0';
const searchInput = document.getElementById('searchInput');
const clearIcon = document.getElementById('clearIcon');
const gifContainer = document.getElementById('gifContainer');
let typingTimer;

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(generateGIFs, 300); // Adjust the duration as needed
});

searchInput.addEventListener('focus', toggleClearIcon);
searchInput.addEventListener('blur', toggleClearIcon);

function generateGIFs() {
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    clearGIFs();
    return;
  }

  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=10`)
    .then(response => response.json())
    .then(data => {
      clearGIFs();

      if (data.data.length === 0) {
        displayNoResultsMessage();
        return;
      }

      data.data.forEach(gif => {
        const gifUrl = gif.images.fixed_height.url;
        const img = document.createElement('img');
        img.src = gifUrl;
        img.classList.add('gif');
        gifContainer.appendChild(img);
      });
    })
    .catch(error => {
      console.error('An error occurred while fetching GIFs:', error);
    });
}

function clearGIFs() {
  gifContainer.innerHTML = '';
}

function displayNoResultsMessage() {
  const message = document.createElement('p');
  message.textContent = 'No GIFs found for the given search query.';
  gifContainer.appendChild(message);
}

function toggleClearIcon() {
  clearIcon.style.display = searchInput.value.trim() !== '' ? 'inline-block' : 'none';
}

clearIcon.addEventListener('click', clearSearchBar);

function clearSearchBar() {
  searchInput.value = '';
  clearIcon.style.display = 'none';
  clearGIFs();
}
