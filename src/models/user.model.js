const prisma = require('../libs/prisma');

module.exports = {
    register: async (userData) => {
        const newUser = await prisma.user.create({
            data: {
                email: userData.email,
                password: userData.password,
            }
        });

        return newUser;
    },

    findUserByEmail: async (email) => {
        return await prisma.user.findUnique({
            where: { email }
        });
    }
};