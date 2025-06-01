import app from "./app";
import dotenv from "dotenv";
import dbInit from "./services/db-service";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, async() => {
    await dbInit();
    console.log(`Server is running on port ${PORT}`);
})