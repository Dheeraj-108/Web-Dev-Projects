import fs from "node:fs";

const requestLogger = (req, _, next) => {
    fs.appendFileSync(
        "./logs.txt",
        `${new Date().toUTCString()}: ${req.method} request accessed ${req.url} path\n`,
    );

    next();
};

export default requestLogger;
