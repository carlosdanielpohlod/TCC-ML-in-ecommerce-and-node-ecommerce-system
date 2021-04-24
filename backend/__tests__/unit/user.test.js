const msg = require('../../src/app/controllers/enum/validationMessages')
const {user} = require('../../src/app/models/')

describe('User create validation', () => {
    
    it('Shold not create with invalid CPF most long to garanted', async (done) => {
     try{
        await user.create({ 
                        name:"usuario",
                        surname:"postman",
                        cpf:"1231383885678911",	
                        email:"user@test.com",
                        password:"12345"
                    }
                        )
     }
     catch(err){
         expect(err.message).toBe('Validation error: Deve conter 11 digitos numericos')
         done()
     }
        
    })
    it('Shold not create with invalid CPF with letter char', async (done) => {
        try{
           await user.create({ 
                           name:"usuario",
                           surname:"postman",
                           cpf:"12q45678912",	
                           email:"user@test.com",
                           password:"12345"
                       }
                           )
        }
        catch(err){
            
            expect(err.message).toBe('Validation error: ' + msg['isNumeric'].value)
            done()
        }
           
    })
    it('Shold not create with invalid CPF size', async (done) => {
        try{
           await user.create({ 
                           name:"usuario",
                           surname:"postman",
                           cpf:"124445678912",	
                           email:"user@test.com",
                           password:"12345"
                       }
                           )
        }
        catch(err){
            expect(err.message).toBe('Validation error: Deve conter 11 digitos numericos')
            
            done()
        }
           
    })
    it('Shold not create with invalid email format', async (done) => {
        try{
           await user.create({ 
                           name:"usuario",
                           surname:"postman",
                           cpf:"12444678912",	
                           email:"usertest.com",
                           password:"12345"
                       }
                           )
        }
        catch(err){
            expect(err.message).toBe('Validation error: ' + msg['isEmail'].value)
            
            done()
        }
           
    })
    it('Shold not create with invalid name format', async (done) => {
        try{
           await user.create({ 
                           name:"usuar0io",
                           surname:"postman",
                           cpf:"12444678912",	
                           email:"user@test.com",
                           password:"12345"
                       }
                           )
        }
        catch(err){
            expect(err.message).toBe('Validation error: ' + msg['isAlpha'].value)
            
            done()
        }
           
    })
})