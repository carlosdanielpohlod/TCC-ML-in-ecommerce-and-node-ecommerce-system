from flask_restful import Resource
from flask import jsonify
from repository.DatasetRepository import DatabaseRepostory
from services.RecommenderService import RecommenderService
from repository.ProductRepository import ProductRepository
class RecommenderController(Resource):
    def __init__(self) -> None:
        self.dataset = DatabaseRepostory()
        self.recommender = RecommenderService()
        self.products = ProductRepository()
    def get(self, idUser):
        df = self.dataset.getDatabaseRatings() 
        idProducts = self.recommender.getRecommendation(usuario_alvo=int(idUser), df = df)
        return jsonify(self.products.findProducts(idProducts))
