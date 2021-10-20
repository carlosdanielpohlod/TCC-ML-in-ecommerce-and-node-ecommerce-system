def extractRatingVizinho(df_train, indices_vizinhos):
  items = []
  
  for i in indices_vizinhos:
   
    items.append(df_train.iloc[i].values.reshape(1,-1)[0])
  
  return items
  
def getRatingsUsuarioComumComVizinhos(ratings_user, rating_vizinhos):

  qtd_vizinhos = len(rating_vizinhos)
  ratings_comum_usuario_e_vizinhos = []
  qtd_produtos = len(ratings_user)

  for produto_index in range(qtd_produtos):
    todos_os_vizinhos_tambem_avaliaram = True
    
    if(ratings_user[produto_index] != 0 ):
      
      for vizinho_index in range(qtd_vizinhos):
        if(rating_vizinhos[vizinho_index][produto_index] == 0 ):
          todos_os_vizinhos_tambem_avaliaram = False
      
      if(todos_os_vizinhos_tambem_avaliaram):
        ratings_comum_usuario_e_vizinhos.append(ratings_user[produto_index])

  return ratings_comum_usuario_e_vizinhos

def getRatingsComumVizinhoComUsuario(ratings_vizinho, ratings_user):
  ratings_filtrados = []

  for i in range(len(ratings_vizinho)):
    if(ratings_vizinho[i] != 0):
      if(ratings_user[i]  != 0):
        ratings_filtrados.append(ratings_vizinho[i])
  return ratings_filtrados

from copy import deepcopy
def getRatingsByArrayIndices(ratings, indices):
  filtered_ratings = []
  for indice in indices:
    filtered_ratings.append(ratings[indice])
  return filtered_ratings


def removerErrosDePredicao(indices_ratings_escondidos, ratings):
  
  indices_filtrados = []
  for i in indices_ratings_escondidos:
    
    if(ratings[i] != -2):
     
      indices_filtrados.append(i)
  
  indices_ratings_escondidos = deepcopy(indices_filtrados)
  
  return indices_filtrados

def filterPredictions(array_predicted, array_original, idProducts,filter):
  size = len(array_original)
  difference = []
  
  if(len(array_predicted) > 0):
    for i in range(size):
      if(array_original[i] == 0 and array_predicted[i] > 0 and array_predicted[i] >= filter):
        difference.append(idProducts[i])
  
  
  return difference

def remove0(arr):
    filtrado = []
    for i in range(len(arr)):
        if(arr[i] != 0):
            filtrado.append((i, arr[i]))

    return filtrado