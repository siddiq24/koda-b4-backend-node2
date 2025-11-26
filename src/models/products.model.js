const prisma = require('../libs/prisma');

module.exports = {
    getAllProducts: async (search, catId) => {
        const products = await prisma.product.findMany({
            where: {
                AND: [
                    search
                        ? { name: { contains: search, mode: 'insensitive' } }
                        : {},
                    catId
                        ? { categoryId: Number(catId) }
                        : {}
                ]
            }
        });

        return products;
    },

    getProductById: async (id) => {
        return await prisma.product.findUnique({
            where: { id: Number(id) }
        });
    },

    createProduct: async (productData) => {
        return await prisma.product.create({
            data: {
                name: productData.name,
                price: productData.price,
                description: productData.description,
                picture: productData.picture,
                stock: productData.stock ?? 0,
                categoryId: productData.categoryId
            }
        });
    },

    updateProduct: async (id, updatedProduct) => {
        return await prisma.product.update({
            where: { id: Number(id) },
            data: updatedProduct
        });
    },

    deleteProduct: async (id) => {
        return await prisma.product.delete({
            where: { id: Number(id) }
        });
    },

    uploadPictureProduct: async (id, picture) => {
        return await prisma.product.update({
            where: { id: Number(id) },
            data: {
                picture: picture.path
            }
        });
    }
};
