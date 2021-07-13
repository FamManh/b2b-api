import b2b from '../b2b';

// getOrders
const getOrders = async () => {
    const res = await b2b.order.getOrders();
    console.log('employeeRole Res -> ', res);
    console.log('-------------');
}
getOrders();
