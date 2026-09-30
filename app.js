// use mock data for one card

const movie = { title: "The Matrix", year: 1999, genres: ["Action", "Sci-Fi"], rating: 8.7 };

addPage('Example', [movie]);

const Fav_Movie = { 
    title: 'Spiderman: Brand New Day',
    year: 2026,
    genres: ['Action, Superhero'],
    rating: 4,
}

addPage('Favorite movie', [Fav_Movie] )

async function start() {
//use database in js
const SQL = await initSqlJs({
    locateFile: file => `vendor/${file}`
});


//open database
const response = await fetch('movies.db');
const bytes = await response.arrayBuffer();
const db = new SQL.Database(new Uint8Array(bytes));

//problem 1
addPage('Problem 1', db.exec(`
    SELECT title, year 
    FROM movies 
    WHERE year = 2000 
    ORDER by title 
    LIMIT 12;
    `));

//problem 2
addPage('Problem 2', db.exec(`
    SELECT title, rating 
    FROM movies 
    WHERE genres LIKE '%Comedy%' 
    ORDER by rating DESC 
    LIMIT 5;
    `));

//problem 3
addPage('Problem 3', db.exec(`
    SELECT title, year, rating 
    FROM movies 
    WHERE genres LIKE '%Horror%' AND rating_count >= 20
    ORDER by rating DESC 
    LIMIT 5;
    `));

//problem4
addPage('Problem 4', db.exec(`
    SELECT title, year, rating 
    FROM movies 
    WHERE genres LIKE '%Comedy%' AND year = 2000
    ORDER by title
    LIMIT 8;
    `));

//problem5
addPage('Problem 5', db.exec(`
    SELECT title, year, rating, rating_count 
    FROM movies 
    WHERE genres LIKE '%Horror%' AND year >= 2010 AND rating_count >= 20
    ORDER by year DESC 
    LIMIT 5;
    `));

//problem6
addPage('Problem 6', db.exec(`
    SELECT title, year, rating 
    FROM movies 
    WHERE rating >= 4 AND rating_count >= 50 AND year <= 1990
    ORDER by rating DESC 
    LIMIT 10;
    `));

//problem7
addPage('Problem 7', db.exec(`
    SELECT title, genres, rating 
    FROM movies 
    WHERE genres LIKE '%Horror%' And genres LIKE '%Comedy%' AND rating_count >= 10
    ORDER by rating DESC 
    LIMIT 5;
    `));

//problem8
addPage('Problem 8', db.exec(`
    SELECT title, year, rating_count 
    FROM movies 
    WHERE year >= 2000 AND year <= 2009 AND rating_count >= 50
    ORDER by rating_count DESC 
    LIMIT 5;
    `));

//close db
db.close();

}

start().catch(showError);