from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
import os

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@server/db_name'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/flask_database'
# app.debug = True
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    
    def __init__(self, username, email):
        self.username = username
        self.email = email
      
@app.route('/')
def index():
   return render_template("./index.html")

@app.route('/post_user', methods=['POST'])
def post_user():
    user = User(request.form['username'], request.form['email'])
    try:
        db.session.add(user)
        db.session.commit()
    except exc.IntegrityError as e:
        db.session().rollback()
    
    return redirect(url_for('index'))
    # return "Record is loaded to your database"

if __name__ == "__main__":
    app.run(debug=True)