import express from "express"
import dotenv from "dotenv"
import { AppDataSource } from "./data-source"
import router from "./routes/index"

dotenv.config()

const app = express()
const port= process.env.PORT || 8000
app.use(express.json())


app.use("/api", router)

app.get("/", (req, res)=>{
  res.send("Logistics API is live.")
})
    
AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
    console.log("Data Source for Logistics API has been initialized!");
  })
  .catch((error) => console.log(error));