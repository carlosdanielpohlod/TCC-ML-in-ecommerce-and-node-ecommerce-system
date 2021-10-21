from random import randint, choice

# from recomender_system.repository.DB import db

import mysql.connector
db = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="12345",
            database="TCC_DEVELOPMENT"
        )
def createProduct(name, price, idProvider, description,idCategory, idBrand, idProductStatus):

    mycursor = db.cursor()
    sql = f'INSERT INTO product (name, price, idProvider, description,idCategory, idBrand, idProductStatus) VALUES (%s, %s, %s, %s, %s, %s, %s)'

    val = (name, price, idProvider, description,idCategory, idBrand, idProductStatus)
    mycursor.execute(sql, val)
    db.commit()
def createUser(idAddress, idUserPrivilege, name, cpf, email, password, surname):
    mycursor = db.cursor()
    sql = f'INSERT INTO user (idAddress, idUserPrivilege, name, cpf, email, password, surname) VALUES (%s, %s, %s, %s, %s, %s, %s)'

    val = (idAddress, idUserPrivilege, name, cpf, email, password, surname)
    mycursor.execute(sql, val)
    db.commit()
def createRating(idUser, idProduct, rating):
    mycursor = db.cursor()
    sql = f'INSERT INTO rating (idUser, idProduct, rating) VALUES (%s, %s, %s)'

    val = (idUser, idProduct, rating)
    mycursor.execute(sql, val)
    db.commit()
def allProducts():
    mycursor = db.cursor()
    sql = f'SELECT idProduct FROM product'
    
    mycursor.execute(sql)
    return mycursor.fetchall()
def allUsers():
    mycursor = db.cursor()
    sql = f'SELECT idUser FROM user'
    
    mycursor.execute(sql)
    return mycursor.fetchall()
for i in range(2000):
    name = f'product {i}'
    price = i
    idProvider = 1 
    description = 'produto gerado no seeder de machine learning'
    idCategory = 1
    idBrand = 1
    idProductStatus = 2
    createProduct(name, price, idProvider, description,idCategory, idBrand, idProductStatus)
def genCPF(i):
    stringCpf = ''
    for i in range(9):
        stringCpf = stringCpf + f'{randint(0, i + 1)}'
    return stringCpf
for i in range(100):
    idAddress = 1
    idUserPrivilege = 2 
    name = 'seed tcc'
    cpf = genCPF(i) 
    email = f'seedTcc{i}@tcc.com'
    password = i
    surname = 'tcc'
    createUser(idAddress, idUserPrivilege, name, cpf, email, password, surname)

users = allUsers()
products = allProducts()

for i in users:
    jaAvalio = []
    qtdRatings = randint(1,100)
    for product in products:
        willRate = choice([True, False])
        if(willRate and product not in jaAvalio and len(jaAvalio) < qtdRatings):
            jaAvalio.append(product)
            createRating(i[0], product[0], randint(1,5))