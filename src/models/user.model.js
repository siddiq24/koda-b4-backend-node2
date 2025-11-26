const prisma = require('../libs/prisma');

module.exports = {
    register: async ({ email, password }) => {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: password
            }
        });
        return newUser;
    },

    findUserByEmail: async (email) => {
        return prisma.user.findUnique({
            where: { email }
        });
    }
};