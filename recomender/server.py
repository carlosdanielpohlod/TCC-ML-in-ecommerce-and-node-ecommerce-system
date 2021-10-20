from flask import Flask
from flask_restful import Api

from controllers.RecommenderController import RecommenderController

app = Flask(__name__)
api = Api(app)


api.add_resource(RecommenderController, '/product/recommendation/<idUser>') 

if __name__ == '__main__':
    app.run()