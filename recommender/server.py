from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from controllers.RecommenderController import RecommenderController

app = Flask(__name__)
CORS(app) 
api = Api(app)


api.add_resource(RecommenderController, '/product/recommendation/<idUser>') 

if __name__ == '__main__':
    app.run()