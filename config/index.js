import mongoose from "mongoose";

let connection

(async ()=>{
    try {
        connection = await mongoose.connect(process.env.MONGODB)
        console.log("Conectado a la base de datos exitosamente")
    } catch (error) {
        console.log("No se ha podido conectar a la base de datos")
        console.log(error)
        
    }
})()