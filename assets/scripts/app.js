const addMovieModal = document.getElementById('add-modal');
const startAddMovieModal = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  clearMovieInputs();
  closeMovieDeletionModal();
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInputs();
};

const movies = [];

const updateUI = () => {
  if (movies.length > 0) {
    entryTextSection.style.display = 'none';
  } else {
    entryTextSection.style.display = 'block';
  }
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}"/>
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener(
    'click',
    startDeletionMovieHandler.bind(this, id)
  );
  movieList.append(newMovieElement);
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue > 5 ||
    +ratingValue < 1
  ) {
    alert('Please enter valid options');
  } else {
    const newMovie = {
      id: Math.random().toString,
      title: titleValue,
      imageUrl: imageUrlValue,
      rating: ratingValue,
    };

    movies.push(newMovie);
    closeMovieModal();
    updateUI();
    renderNewMovieElement(
      newMovie.id,
      newMovie.title,
      newMovie.imageUrl,
      newMovie.rating
    );
    clearMovieInputs();
  }
};

const clearMovieInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const deleteMovie = movieId => {
  const movieIndex = movies.findIndex(movie => movie.id === movieId);
  movies.splice(movieIndex, 1);
  movieList.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const startDeletionMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();

  const cancelDeleteMovieBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeleteMovieBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmDeleteMovieBtn.replaceWith(confirmDeleteMovieBtn.cloneNode(true));

  confirmDeleteMovieBtn = deleteMovieModal.querySelector('.btn--danger');
  cancelDeleteMovieBtn.removeEventListener('click', closeMovieDeletionModal);

  confirmDeleteMovieBtn.addEventListener(
    'click',
    deleteMovie.bind(this, movieId)
  );

  cancelDeleteMovieBtn.addEventListener('click', closeMovieDeletionModal);
};

startAddMovieModal.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
