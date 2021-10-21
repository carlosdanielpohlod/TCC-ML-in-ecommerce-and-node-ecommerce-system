import pandas as pd
from random import randint
from model.model import Model
import numpy as np
import math
from utils import *
from flask import Flask

class RecommenderService:

  def __init__(self) -> None:
      self.n_neighbors = 3
      self.model = Model(self.n_neighbors)
  def getRecommendation(self, usuario_alvo, df):
    
    df_recomender = pd.pivot_table(data = df, index = 'userId', columns='itemId', values = 'rating').fillna(0)
    # print(df_recomender)
    self.model.fit(df_recomender, self.n_neighbors)
    distancia_vizinhos, indices_vizinhos = self.model.kneighbors(df_recomender.iloc[usuario_alvo].values.reshape(1,-1), n_neighbors=self.n_neighbors)
    print(f'\n\nvizinhos do usuário {usuario_alvo}: \n vizinho 1: {indices_vizinhos[0]}({distancia_vizinhos[0]})\n vizinho 2: {indices_vizinhos[1]}({distancia_vizinhos[1]})')
    ratingVizinhos = extractRatingVizinho(df_recomender, indices_vizinhos)
    ratings_usuario_alvo = np.array(df_recomender.iloc[usuario_alvo].values.reshape(1,-1)[0])
    ratings_originais_usuario_alvo = np.array(deepcopy(df_recomender.iloc[usuario_alvo].values.reshape(1,-1)[0]))
    df_recomender.iloc[usuario_alvo] = self.model.predict(ratingVizinhos, distancia_vizinhos, ratings_usuario_alvo)
    return filterPredictions(df_recomender.iloc[usuario_alvo].values.reshape(1,-1)[0], ratings_originais_usuario_alvo,df_recomender.columns, 4.0)



  
