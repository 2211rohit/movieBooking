from flask import Flask
from flask_cors import CORS
from flask import request
from flask import make_response
from flask import jsonify
from flask_mysqldb import MySQL
import json
import math


app = Flask(__name__)
app.config["MYSQL_USER"] = "rohit"
app.config["MYSQL_PASSWORD"] = "Goyal@123"
app.config["MYSQL_DB"] = "thinkify"
app.config["MYSQL_CURSORCLASS"] = "DictCursor"
CORS(app)
mysql = MySQL(app)

# reading all tasks
@app.route('/allMovies', methods=["GET"])
def read_tasks():
    rows = 10
    page = request.args.get("page", default=1, type=int)
    call_page = (page-1) * int(rows)
    cursor = mysql.connection.cursor()
    cursor.execute(
        # """select * from bus inner join city on bus.source_city_id = city.city_id limit %s,%s""",
        # (call_page, int(rows),))
        """select * from movies limit %s,%s""",
        (call_page, int(rows),))
    data = cursor.fetchall()
    cursor.execute(
        "SELECT count(movie_id) as movies FROM movies""")
    movies = cursor.fetchall()
    cursor.close()
    return {"data": data, "total_movies": int(movies[0]["movies"])}
    

@app.route("/paginationMovies", methods=["POST"])
def paginationTasks():
    page = request.args.get('page', default=1, type=int)
    call_page = (page-1)*10
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ SELECT * FROM movies limit %s,10""", (call_page,))
    data = cursor.fetchall()
    cursor.execute(
        "SELECT count(movie_id) as movies FROM movies""")
    total_movies = cursor.fetchall()
    cursor.close()
    return {"data": data, "total_movies": int(total_movies[0]["movies"])}


# Adding a Movie
@app.route("/addMovie", methods=["POST"])
def addMovie():
    name = request.json.get("name")
    price = request.json.get("price")
    genre = request.json.get("genre")
    language = request.json.get("language")
    theatre = request.json.get("theatre")
    location = request.json.get("location")
    cursor = mysql.connection.cursor()
    cursor.execute(
        """INSERT INTO movies (movie_name, ticket_price, genre, language, theatre, location)
            VALUES (%s, %s, %s, %s, %s, %s) """, (name, price, genre, language, theatre, location)
    )
    mysql.connection.commit()
    cursor.close()
    return {"message": "Movie Added"}



# Adding a Movie
@app.route("/addSeat", methods=["POST"])
def addSeat():
    movie_id = request.json.get("movie_id")
    seat = request.json.get("seat")
    cursor = mysql.connection.cursor()
    for i in seat:
        cursor.execute(
            """INSERT INTO seats (movie_id, seat_number)
                VALUES (%s, %s) """, (movie_id, i)
        )
    mysql.connection.commit()
    cursor.close()
    return {"message": "Seats Added"}

# Movie wise seats
@app.route("/seats", methods=["POST"])
def seats():
    movie_id = int(request.json.get("movie_id"))
    cursor = mysql.connection.cursor()
    print(movie_id)
    cursor.execute(
        """select * from seats WHERE movie_id= %s""", (movie_id,))
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}

# Genre wise movies
@app.route("/genre", methods=["POST"])
def genre():
    genre = request.json.get("genre")
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from movies WHERE genre= %s""", (genre,))
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}

# Language wise movies
@app.route("/language", methods=["POST"])
def language():
    language = request.json.get("language")
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from movies WHERE language= %s""", (language,))
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}


# Book Tickets
@app.route("/book", methods=["POST"])
def book():
    seat_id = int(request.json.get("seat_id"))
    booked = int(request.json.get("booked"))
    print(seat_id)
    cursor = mysql.connection.cursor()
    cursor.execute(
        """Update seats SET booked = %s WHERE seat_id= %s""", (booked, seat_id,))
    data = cursor.fetchall()
    cursor.close()
    return {"Message": "Ticket Booked"}

if __name__ == "__main__":
    app.run(debug=True)