import b2b from '../b2b';

// getEmployeeRole
const getAllPriceBooks = async () => {
    const res = await b2b.priceBook.getAllPriceBooks();
    console.log('getAllPriceBooks Res -> ', res);
    console.log('-------------');
}
getAllPriceBooks();

