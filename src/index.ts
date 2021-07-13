import Config from './config'
import RequestFactory from './factories/request'

import Category from './endpoints/category'
import Customer from './endpoints/customer'
import CustomerGroups from './endpoints/customerGroups'
import File from './endpoints/file'
import Login from './endpoints/login'
import Order from './endpoints/order/order'
import Period from './endpoints/period'
import PriceBook from './endpoints/price-book/priceBook'
import Product from './endpoints/product/product'
import Quote from './endpoints/quote'
import Role from './endpoints/role'

class B2BSdk {
  config: Config
  request: RequestFactory
  role: Role
  category: Category
  customer: Customer
  order: Order
  period: Period
  priceBook: PriceBook
  product: Product
  customerGroups: CustomerGroups
  file: File
  login: Login
  quote: Quote

  constructor(config: Config) {
    this.config = config
    this.request = new RequestFactory(config)
    this.role = new Role(config)
    this.category = new Category(config)
    this.customer = new Customer(config)
    this.order = new Order(config)
    this.period = new Period(config)
    this.priceBook = new PriceBook(config)
    this.product = new Product(config)
    this.customerGroups = new CustomerGroups(config)
    this.file = new File(config)
    this.login = new Login(config)
    this.quote = new Quote(config)
  }
}

const gateway = (config: Config) => new B2BSdk(config)

export { gateway }

export default B2BSdk
