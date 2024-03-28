export const TrendMovies = `
query ($page: Int) {
    Page(perPage: 50, page: $page) {
    		pageInfo {
    		  total
    		  perPage
    		  currentPage
    		  lastPage
    		  hasNextPage
    		}
        media(sort: TRENDING_DESC, type: ANIME, format: MOVIE) {
            id
			genres
			title {
			  romaji
			  english
			  native
			}
			type
			status
			synonyms
			coverImage {
				extraLarge
			}		
        }
    }
}
`;
export const TrendManga = `
query ($page: Int) {
    Page(perPage: 50, page: $page) {
    		pageInfo {
    		  total
    		  perPage
    		  currentPage
    		  lastPage
    		  hasNextPage
    		}
        media(sort: TRENDING_DESC, type: MANGA) {
            id
			genres
			title {
			  romaji
			  english
			  native
			}
			type
			status
			synonyms
			coverImage {
				extraLarge
			}		
        }
    }
}
`;
export const Latest = `
query ($page: Int) {
    Page(perPage: 50, page: $page) {
    		pageInfo {
    		  total
    		  perPage
    		  currentPage
    		  lastPage
    		  hasNextPage
    		}
        media(sort: START_DATE_DESC, type: ANIME, format: TV) {
            id
			genres
			title {
			  romaji
			  english
			  native
			}
			type
			status
			synonyms
			coverImage {
				extraLarge
			}		
        }
    }
}
`;

export const SearchData = `
query ($page: Int, $search: String) {
	Page(perPage: 50, page: $page) {
	  pageInfo {
		total
		perPage
		currentPage
		lastPage
		hasNextPage
	  }
	  media(sort: POPULARITY_DESC, search: $search) {
		id
		type
		title {
		  romaji
		  english
		  native
		}
		coverImage {
		  extraLarge
		}
	  }
	}
  }
  `;
  export const CharactersQ = `
  query ($page: Int, $perPage: Int) {
	Page(perPage: $perPage, page: $page) {
	  characters (sort: FAVOURITES_DESC) {
		id
		name {
		  first
		  middle
		  last
		  full
		  native
		  userPreferred
		}
		image {
		  large
		  medium
		}
	  }
	}
  }
  `;