const express = require("express");
const app = express();
const dotenv = require("dotenv");
const pizzasRouter = require("./routers/posts-router");
dotenv.config();


// Registro il middleware per il parsing del body
// Ogni volta che verranno inviati dei dati al server 
// con "Content-Type: application/json" verranno 
// automaticamente convertiti in un oggetto javascript
// accessibile tramite req.body
app.use(express.json());


app.use("/posts", pizzasRouter);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
