const {user} = require('../../src/app/models/')
module.exports = () => {
    return Promise.all(
        Object.keys(sequelize.models).map(key => {
            return sequelize.models[key].destroy({truncate: true, force:true})
    }))
}


    
var sequelize = require('sequelize')
        
(sequelize.models).map(key => {
    return sequelize.models[key].destroy({truncate: true, force:true})

})