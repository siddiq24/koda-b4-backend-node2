const products = [
    {
        id: 1,
        name: "Cappuchino",
        price: 20000,
        description: "Espresso-based coffee drink with steamed milk foam.",
        categoryId: 1,
        picture: null,
        stock: 50,
    },
    {
        id: 2,
        name: "Latte",
        price: 25000,
        description: "Espresso mixed with steamed milk and a light layer of foam.",
        categoryId: 1,
        picture: null,
        stock: 40,
    },
    {
        id: 3,
        name: "Espresso",
        price: 15000,
        description: "Strong black coffee made by forcing steam through ground coffee beans.",
        categoryId: 1,
        picture: null,
        stock: 60,
    },
    {
        id: 4,
        name: "Mocha",
        price: 30000,
        description: "Espresso with steamed milk and chocolate syrup.",
        categoryId: 1,
        picture: null,
        stock: 30,
    },
    {
        id: 5,
        name: "Cheesecake",
        price: 40000,
        description: "Creamy dessert with a graham cracker crust.",
        categoryId: 3,
        picture: null,
        stock: 20,
    },
    {
        id: 6,
        name: "Brownie",
        price: 35000,
        description: "Chocolate baked dessert square.",
        categoryId: 3,
        picture: null,
        stock: 25,
    },
    {
        id: 7,
        name: "Tiramisu",
        price: 45000,
        description: "Coffee-flavored Italian dessert made of layers of sponge cake and mascarpone cheese.",
        categoryId: 3,
        picture: null,
        stock: 15,
    }
];

const categories = ["Beverages", "Snacks", "Desserts", "Main Course"];

module.exports = {
    getAllProducts: (search, catId) => {
        let filteredProducts = products;
        if (search) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (catId) {
            filteredProducts = filteredProducts.filter(product =>
                product.categoryId === catId
            );
        }
        const result = filteredProducts.map(product => ({
            ...product,
            category: categories[product.categoryId - 1]
        }));
        return result;
    },
    getProductById: (id) => {
        return products.find(product => product.id === parseInt(id));
    },
    createProduct: (product) => {
        products.push({ id: products.length + 1, ...product });
    },
    updateProduct: (id, updatedProduct) => {
        const index = products.findIndex(product => product.id === parseInt(id));
        if (index !== -1) {
            products[index] = { id: products[index].id, ...updatedProduct };
        }
    },
    deleteProduct: (id) => {
        const index = products.findIndex(product => product.id === parseInt(id));
        if (index !== -1) {
            products.splice(index, 1);
        }
    },

    uploadPictureProduct: (id, picture) => {
        const product = products.find(product => product.id === parseInt(id));
        if (product) {
            product.picture = picture.path;
            return product;
        }
        return null;
    }

};