from repository.DB import db
class ProductRepository:
    def findProducts(self,arrayId) -> list:
        mycursor = db.cursor()
        orString = ''
        # COLOCAR UM LIMITE AKE NAS FOTOS
        sql = f'SELECT product.idProduct, product.name, product.price, productimage.url FROM product LEFT JOIN productimage  ON productimage.idProduct = product.idProduct WHERE product.idProduct = {arrayId[0]}' 
        
        for id in arrayId:
            orString = orString + f' OR product.idProduct = {id}'
        
        sql = sql + orString 
        
        resposta = mycursor.execute(sql)
        resposta =  mycursor.fetchall()
        for i in range(len(resposta)):
            
            resposta[i] = {"idProduct":resposta[i][0], "name":resposta[i][1], "price":resposta[i][2], "productimage":resposta[i][3]}
        
        return {"data":resposta}