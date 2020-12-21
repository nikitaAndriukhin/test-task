from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000", allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
    supports_credentials=True, intercept_exceptions=False)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True)
    color = db.Column(db.String(32), )

    def __init__(self, username, color):
        self.username = username
        self.color = color

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'color')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class UserManager(Resource):
    @staticmethod
    def get():
        try: id = request.args['id']
        except Exception as _: id = None

        if not id:
            users = User.query.all()
            return jsonify(users_schema.dump(users))
        user = User.query.get(id)
        return jsonify(user_schema.dump(user))

    @staticmethod
    def post():
        username = request.json['username']
        color = request.json['color']
        ter = User.query.filter_by(username=username).first()
        if ter is None:
            user = User(username, color)
            db.session.add(user)
            db.session.commit()
            sec = User.query.filter_by(username=username).first()
            return jsonify(user_schema.dump(sec))
        else:
            return jsonify(user_schema.dump(ter))


    @staticmethod
    def put():
        try: id = request.args['id']
        except Exception as _: id = None
        if not id:
            return jsonify({ 'Message': 'Must provide the user ID' })
        user = User.query.get(id)

        color = request.json['color']

        user.color = color 

        db.session.commit()
        return jsonify({
            'Message': f'User altered.'
        })


api.add_resource(UserManager, '/api/users')

if __name__ == '__main__':
    app.run(debug=True)