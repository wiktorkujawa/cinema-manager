"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const postRoute_1 = require("./postRoute");
const userRoute_1 = require("./userRoute");
exports.Routes = [
    ...userRoute_1.userRoute,
    ...postRoute_1.postRoute
];
