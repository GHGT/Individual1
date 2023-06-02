// TMDB API를 이용하여 인기 영화 목록 가져오기
// TMDB API를 이용하여 인기 영화 목록 가져오기
function fetchPopularMovies() {
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGNlZmRkNDlkNzIxOGQzYzU4YzZmN2Q5NDlhODc5ZCIsInN1YiI6IjY0NzU4YzFmYmJjYWUwMDBjMTQ0YjVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PagxBbcXnNmEDzilvApSCe42Hjoa5Eov_b2NpQuD7X0'; // 여기에 본인의 TMDB API 키를 입력하세요
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };
  
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => displayMovies(data.results))
      .catch(err => console.error(err));
  }
  
  // 가져온 영화 데이터를 화면에 표시하는 함수
  function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
  }
    // 기존에 있던 영화 카드 삭제
    while (movieContainer.firstChild) {
      movieContainer.removeChild(movieContainer.firstChild);
    }
  
  
  
        // 영화 카드를 생성하는 함수
        function createMovieCard(movie) {
          const { id, title, overview, poster_path, vote_average } = movie;
          const card = document.createElement("div");
          card.className = "movie-card__item";
          // 포스터 이미지
          const imageContainer = document.createElement("div");
          imageContainer.className = "movie-card__image";
          const image = document.createElement("img");
          image.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
          image.alt = title; // 이미지 없을때 출력
          imageContainer.appendChild(image);
          card.appendChild(imageContainer);
  
          // 영화 정보
          const content = document.createElement("div");
          content.className = "movie-card__content";
  
          const movieTitle = document.createElement("h2");
          movieTitle.className = "movie-card__title";
          movieTitle.textContent = title;
          content.appendChild(movieTitle);
  
          const movieOverview = document.createElement("p");
          movieOverview.className = "movie-card__overview";
          movieOverview.textContent = overview;
          content.appendChild(movieOverview);
  
          const movieVote = document.createElement("p");
          movieVote.className = "movie-card__vote";
          movieVote.textContent = `평점: ${vote_average}`;
  
          content.appendChild(movieVote);
          card.appendChild(content);
  
          // 영화 카드를 클릭했을 때 ID를 알려주는 알림창
          card.addEventListener("click", () => {
            alert(`Selected movie ID: ${id}`);
          });
  
          return card;
        }
  
        // 영화 카드를 화면에 렌더링하는 함수
        function renderMovies(movies) {
          const movieList = document.getElementById("movie-list");
          movieList.innerHTML = "";
  
          movies.forEach((movie) => {
            const movieCard = createMovieCard(movie);
            movieList.appendChild(movieCard);
          });
        }
  
        // 영화 검색을 수행하는 함수
        function fetchMovies() {
          const searchInput = document.getElementById("search-input");
          const query = searchInput.value.trim();
  
          if (query === "") {
            alert("Please enter a movie title");
            return;
          }
  
          // 검색어를 포함한 영화들을 검색하는 API URL
          const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  
          fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                const movies = data.results;
                renderMovies(movies);
              } else {
                alert("No movies found");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
  
        // 검색 버튼 클릭 시 영화 검색 수행
        const searchButton = document.getElementById("search-button");
        searchButton.addEventListener("click", fetchMovies);
  
        // 검색어 입력 시 영화 검색 수행
        const searchInput = document.getElementById("search-input");
        searchInput.addEventListener("input", () => {
          fetchMovies();
        });
  
        // 초기 페이지 로드 시 인기 영화 가져와서 렌더링
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const movies = data.results.slice(0, 10);
            renderMovies(movies);
          })
          .catch((error) => {
            console.error("Error:", error);
          });