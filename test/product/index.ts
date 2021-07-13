import b2b from '../b2b';

// getAllProducts
const getAllProducts = async () => {
    const res = await b2b.product.getAllProducts();
    console.log('getAllProducts Res -> ', res);
    console.log('-------------');
}
getAllProducts();