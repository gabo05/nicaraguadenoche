
module.exports = {

    attributes: {
        name:{
            type: 'string'
        },
        keyname: {
            type: 'string',
            unique: true
        },
        type:{
            type: 'string'
        }
    }
}