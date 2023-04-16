"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const allowedOrigins = [
    process.env.ORIGIN_LOCALHOST || '',
    process.env.ORIGIN_PRODUCT || '',
];
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
(0, routes_1.default)(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
exports.default = app;
