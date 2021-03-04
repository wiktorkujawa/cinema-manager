"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const PostController_1 = require("../controller/PostController");
exports.postRoute = [
    {
        method: 'get',
        route: '/api/posts',
        controller: PostController_1.PostController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/api/posts/:id',
        controller: PostController_1.PostController,
        action: 'one',
    },
];
