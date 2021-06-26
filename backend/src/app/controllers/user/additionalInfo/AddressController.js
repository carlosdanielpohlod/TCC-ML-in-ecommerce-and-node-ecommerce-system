const httpStatus = require('../../enum/httpStatus')
const {address, user} = require('../../../models')
const {sequelizeOrGeneric} = require('../../utils/errorFormat')

class AddressController{
    async store(req, res){
        try{
            !req.body ? res.status(400).send({status:false, msg:httpStatus['400'].value}) : null
            const newAddress = await address.create(req.body)    
            await user.update({idAddress:newAddress.idAddress},{ where:{idUser:req.user.idUser}} )
            res.status(201).send({status:true, data:newAddress})
        }
        catch(err){
            sequelizeOrGeneric(err, res)
        }
    }
    async update(req, res){
        try{
            const userData = await user.findOne({where:{idUser:req.user.idUser}})
            
            await address.update({
                cep:req.body.cep,
                state:req.body.state,
                city: req.body.city,
                street:req.body.street,
                number:req.body.number
            },{where:{idAddress:userData.idAddress}})
            return res.status(200).send({msg:httpStatus["200"].value, status:true})
        }

        catch(err){ sequelizeOrGeneric(err, res)}
      
    }

    async get(req, res){
        try{
            const isEmpty = false
            const {user} = require('../../../models')

            const response= await address.findOne({
                include:[{
                    model:user,
                    where: {idUser:req.user.idUser}, 
                    attributes:[]
                }]
            })
            if(!response){
                isEmpty = true
            }

            return res.status(200).send({data:response, status:true, isEmpty})
        }catch(err){
            return res.status(500).send({status: false})
        }
    }
}
module.exports = new AddressController()