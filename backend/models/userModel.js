const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })


// Hash the password before saving the user to the database
// userSchema.pre('save', async (next) => {
//     const user = this;
//     const hash = await bcrypt.hash(this.password, 11)

//     this.password = hash;
//     next()
// })

// Verify the password of the user
userSchema.methods.verifyPassword = async function(password) {
    const user = this
    return await bcrypt.compare(password, user.password)

}

const User = model('users', userSchema)

module.exports = User;