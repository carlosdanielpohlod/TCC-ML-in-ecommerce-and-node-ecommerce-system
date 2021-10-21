import numpy as np
from utils import *
from sklearn.neighbors import NearestNeighbors
import math
impossivel_predizer = -2
class Model:
    #classificação
    def __init__(self, n_neighbors):
        self.modelo_knn = NearestNeighbors(metric='cosine', n_neighbors=n_neighbors)

    def fit(self, df_recomender, n_neighbors):
        self.modelo_knn.fit(df_recomender,  n_neighbors)
        return self.modelo_knn
    def kneighbors(self,alvo, n_neighbors):
        distancia, indices_vizinhos = self.modelo_knn.kneighbors(alvo, n_neighbors)
        return distancia[0][1:], indices_vizinhos[0][1:]
   
    def predict(self, rating_vizinhos,distancia_vizinhos, ratings_user):
  
        qtd_produtos = len(ratings_user)
        qtd_vizinhos = len(rating_vizinhos)
        r_a = 0

        ratings_comum_entre_usuario_e_vizinhos = getRatingsUsuarioComumComVizinhos(ratings_user, rating_vizinhos)
        
        if(len(ratings_comum_entre_usuario_e_vizinhos) > 0):
            
            r_a  = np.mean(ratings_comum_entre_usuario_e_vizinhos)

            for produto in range(qtd_produtos):
                existe_vizinho_comum = False

                if(r_a > 0):
                    
                    sum = 0
                    # print('r_a',r_a)
                    array_W_au = []

                    for index_vizinho in range(qtd_vizinhos):
                        ratings_vizinho_X_usuario = getRatingsComumVizinhoComUsuario(rating_vizinhos[index_vizinho], ratings_user)
                        
                        if(rating_vizinhos[index_vizinho][produto] != 0 and len(ratings_vizinho_X_usuario) > 0):
                            
                            

                            r_u = np.mean( ratings_vizinho_X_usuario ) 
                            W_au = distancia_vizinhos[index_vizinho]
                            r_u_i = rating_vizinhos[index_vizinho][produto]
                            
                            
                            sum = sum + (r_u_i - r_u) * W_au
                            
                            # print('ry',r_u)
                    

                            array_W_au.append(np.abs( W_au) )
                            existe_vizinho_comum = True

                        if(existe_vizinho_comum):

                            P_ai = r_a + ( sum /  np.sum(array_W_au) ) 
                            
                            if(not math.isnan(P_ai)):
                                ratings_user[produto] = np.floor(round(P_ai,2))
                            else:
                                ratings_user[produto] = impossivel_predizer
                                
                        else:
                            ratings_user[produto] = impossivel_predizer
                        
            
                
        return ratings_user