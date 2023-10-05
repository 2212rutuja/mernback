
import { products } from "./constants/data.js"
import Product from "./model/productSchema.js"

const DefaultData = async ()=>{
    try{
        
        await Product.insertMany(products);
        console.log('data inserted sucessfully')

    }catch(error){
        console.log("error while handling database", error.message)
    }

}

export default DefaultData;