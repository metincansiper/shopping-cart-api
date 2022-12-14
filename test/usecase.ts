import { expect } from 'chai';
import CalculateTotalPrice from '../src/core/usecase/CalculateTotalPrice';
import sinon from 'sinon';
import ProductRepository from '../src/core/repository/ProductRepository';
import ItemRepository from '../src/core/repository/ItemRepository';
import Product from '../src/core/entity/Product';
import Item from '../src/core/entity/Item';
import SearchProduct from '../src/core/usecase/SearchProduct';
import UpdateItemQuantity from '../src/core/usecase/UpdateItemQuantity';

describe('CalculateTotalPrice', function() {
    it('execute() should make the right calls and return the expected value', async function() {
        const userId: string = 'user1';
        const productRepo = <ProductRepository>{};
        const itemRepo = <ItemRepository>{};
        const items = [
            new Item(userId, 'product1', 2),
            new Item(userId, 'product2', 10)
        ];
        
        const products = [
            new Product('car', 10),
            new Product('apple', 1)
        ];

        const productIds = items.map(item => item.productId);

        itemRepo.findBy = function(props: Object){
            return Promise.resolve(items);
        }

        productRepo.getMultiple = function(ids: String[]){
            return Promise.resolve(products);
        }
        
        const findBySpy = sinon.spy(itemRepo, 'findBy');
        const getMultipleSpy = sinon.spy(productRepo, 'getMultiple');
        const calcTotalPrice = new CalculateTotalPrice(itemRepo, productRepo);
        const totalPrice = await calcTotalPrice.execute('user1');
        
        expect(findBySpy.calledOnce).to.be.true;
        expect(findBySpy.calledWith(sinon.match({ userId }))).to.be.true;
        expect(getMultipleSpy.calledOnce).to.be.true;
        expect(getMultipleSpy.calledWithMatch(productIds)).to.be.true;
        expect(totalPrice).to.be.equal(30);
    });
});

describe("SearchProduct", function(){
    before(function(){
        const productRepo = <ProductRepository>{};
        const products = [new Product('prod1', 50)];
        productRepo.findBy = function() {
            return Promise.resolve(products);
        };
        this.products = products;
        this.productRepo = productRepo;
        this.searchProduct = new SearchProduct(productRepo);
    });

    it('executeByName() must call productRepository.findBy() with object containing name field', async function() {
        const productRepo = this.productRepo;
        const findBySpy = sinon.spy(productRepo, 'findBy');
        const name = 'prod1';
        const products: Product[] = await this.searchProduct.executeByName(name);
        expect(findBySpy.calledOnce).to.be.true;
        expect(findBySpy.calledWith(sinon.match({ name }))).to.be.true;
        expect(products).to.deep.equal(this.products);
    });
});

describe("UpdateItemQuantity", function(){
    beforeEach(function() {
        const itemRepo =  <ItemRepository>{};
        const item = new Item('user', 'item', 5);
        itemRepo.get = () => {
            return Promise.resolve(item);
        };
        
        itemRepo.delete = () => {
            return Promise.resolve(true);
        };

        itemRepo.update = () => {
            return Promise.resolve(item);
        };

        const updateQuantity = new UpdateItemQuantity(itemRepo);

        this.item = item;
        this.updateQuantity = updateQuantity;
        this.updateSpy = sinon.spy(itemRepo, 'update');
    });

    it('Try removing more than or equal to quantity of existing items', async function() {
        const { id, quantity } = this.item;    
        const updatedItem = await this.updateQuantity.execute(id, -(quantity+1));
        expect(updatedItem).to.be.null;
        expect(this.updateSpy.called).to.be.false;
    });

    it('Remove some of existing items', async function() {
        const { id, quantity } = this.item;    
        const updateBy =  1 - quantity;
        const newQuantity = quantity + updateBy;
        const updatedItem = await this.updateQuantity.execute(id, updateBy);
        
        expect(this.updateSpy.called).to.be.true;
        expect(updatedItem).not.to.be.null;

        const updateArgs = this.updateSpy.args[0];
        expect(updateArgs[0]).to.be.equal(id);
        expect(updateArgs[1]).to.deep.equal({ quantity: newQuantity });
    });
});