import sequelize from "../config/db-config";

const dbInit = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
        if (process.env.NODE_ENV === "development") {
            // await sequelize.sync({ alter: true });
            console.log("Database synchronized successfully.");
        }

        return { sequelize: sequelize }
    } catch (error) {
        console.error("Database initialization failed:", error);
        throw error;
    }
}

export default dbInit;