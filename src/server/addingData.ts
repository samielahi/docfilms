/*
Utils for adding data to the archive

save edit session data in indexedDB 

TODO:
  - upload csv
    - checks if the columns that we need are there
      - if not we error out and suggest they upload another one
    - trim leading and trailing whitespace
    - go through the rows and check if 'year', 'title', 'director', 'series', 'date' is missing
      - add rows with missing columns to a pool
        - after processing all records warn about rows with missing data
        - user should be able to fill in any missing data
    - indexing
      - use flexsearch to check if movie has been played before or if a movie by the director exists
        - for movie, update the count if its been played before
      - "found x new movies to add to movies index and y new directors to add to directors index!"

  - get tmdb data merged with csv data
    - get id, backdrop_path, title, overview

  - review and publish
    - manual review
    - total records being added  
    - movies and directors getting indexed

  Functions 

  User uplods csv and the csv gets passed to the server which parses it 
  and return the data

*/
