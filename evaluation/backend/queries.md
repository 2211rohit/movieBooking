### Evaluation Buses and Cities data

Create a database
```sql
CREATE DATABASE thinkify;
```

use the database created
```sql
USE thinkify;
```

Create the Movies table
```sql
CREATE TABLE movies (movie_id INT not null auto_increment, movie_name varchar(255) not null, ticket_price INT not null, genre varchar(255) not null, language varchar(255) not null, theatre varchar(255) not null, location varchar(255) not null, primary key(movie_id));
```

Create the Bus table
```sql
CREATE TABLE seats (seat_id INT not null auto_increment, movie_id INT not null,booked INT not null DEFAULT 0, primary key(seat_id), foreign key(movie_id) REFERENCES movies(movie_id));
```

```sql

```