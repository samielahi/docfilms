# docfilms archive

Search through movies shown at docfilms since the early 20th century.

# To do

## Bugs

- Error handling for movies that don't have directors

## Data

- Edit capsule data
  - [x] fall
  - spring
  - winter
  - summer
- Merge capsule data with archive data
- Populate director data in archive using MovieDB api
  - name
  - gender
- Add genre data
- [x] Map show date to series season + year
- Series index data
- Director index data
- [x] Fix years on movies that are off by one

## Design

- Design series page
- Design pages for movie, director, and series when data is sparse
- Admin account page
- Review suggested corrections and additions page
- Sign in page
- Report duplicate index value

## Features

- Add email NextAuth for admin account
- Record Correction Tool
- Loading spinner for pages
- Menu button for mobile header
- Filter by year in director movies page 

## Database

- Make migration to amended data
- Add table for users
- Add table for user suggested corrections
