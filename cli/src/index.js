#!/usr/bin/env node

const path = require('path');
const FileSystem = require('fs');


function createFastifyPackage() {
    const commonPackage = require(path.resolve(__dirname, '../../node/common/package.json'));
    const fastifyPackage = require(path.resolve(__dirname, '../../node/fastify/fastify.package.json'));

    const package = {
        ...commonPackage,
        ...fastifyPackage,
    };

    FileSystem.writeFileSync('./final.package.json', JSON.stringify(package, null, 4));


}

createFastifyPackage();