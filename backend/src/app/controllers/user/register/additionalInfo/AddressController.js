
const {address, user} = require('../../../../models')
const {sequelizeOrGeneric} = require('../../../utils/errorFormat')

class AddressController{
    async store(req, res){
        try{
            !req.body ? res.status(400).send({status:false, msg:httpStatus['400'].value}) : null
            const newAddress = await address.create(req.body)    
            await user.update({idAddress:newAddress.idAddress},{ where:{idUser:req.body.idUser}} )
            res.status(201).send({status:true, data:newAddress})
        }
        catch(err){
            sequelizeOrGeneric(err, res)
        }
    }
    async update(req, res){
        try{
            const userData = await user.findOne({where:{idUser:req.body.idUser}})
            
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

}
module.exports = new AddressController()