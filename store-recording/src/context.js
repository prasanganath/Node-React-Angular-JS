import React, { Component } from "react";
import {storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

//Provider
//Consumer


class ProductProvider extends Component {

    state={
        products: [],
        detailProduct: detailProduct,
        cart:[],
        modelOpen: false,
        modelProduct: detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0

    };
    // setProducts = (){
    //     let products = [];
    //     storeProducts.forEach()
    // }
    componentDidMount(){
        this.setProducts();
         
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];


        });
        this.setState(()=>{
            return {products:tempProducts, cart:[...this.state.cart]};
        });

    };
    getItem = id =>{
        const product = this.state.products.find(item => item.id ===id);
        return product;
    };

    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
      
    };
    addToCart = id =>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

    this.setState(
        ()=> {
        return {products:tempProducts, cart: [...this.state.cart,product]};
    },
    () => {
        console.log(this.state);
    }
    );





    };
    openModel = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {modelProduct:product,modelOpen:true}
        })
    }

    closeModel  =() =>{
        this.setState(()=>{
            return {modelOpen:false}
        });

    };
    increment = (id) =>{
        console.log('this is increment method ');
    }
    decrement = (id) =>{
        console.log('this is decrement method ');
    }
    removeItem = (id)=> {
        console.log('item removed');

    }
    clearCart = () => {
        console.log('card was cleard');
    }

    


   
    render() {
        return (
            <ProductContext.Provider 
            value={{
...this.state,
handleDetail: this.handleDetail,
addToCart: this.addToCart,
openModel:this.openModel,
closeModel:this.closeModel,
increment: this.increment,
decrement: this.decrement,
removeItem: this.removeItem,
clearCart: this.clearCart




            }}
            >
                {this.props.children}


            </ProductContext.Provider>
   
      
        ); 
        

    }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };