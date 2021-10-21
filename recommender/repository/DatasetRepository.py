from repository.DB import db
import pandas as pd
class DatabaseRepostory:
    def getDatabaseRatings(self):
        mycursor = db.cursor()
        sql = f'SELECT user.idUser, product.idProduct, rating.rating FROM user JOIN rating ON user.idUser = rating.idUser JOIN product ON rating.idProduct = product.idProduct'
        
        resposta = mycursor.execute(sql)
        resposta =  mycursor.fetchall()

        df = pd.DataFrame(resposta)
        df.columns = ['userId', 'itemId','rating']
        return df
    


    