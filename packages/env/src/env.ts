const { NODE_ENV = "development" } = process.env;

const env = {
    isProd: NODE_ENV === "production",
    isNotProd: NODE_ENV !== "production",
    isTest: NODE_ENV === "test",
    isNotTest: NODE_ENV !== "test",
    isDev: NODE_ENV === "development",
    isNotDev: NODE_ENV !== "development",
};

export default env;
