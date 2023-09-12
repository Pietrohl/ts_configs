#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const projectName = process.argv[2];

if (!projectName) {
    console.error("You must provide a repository name as second argument.");
    process.exit(1);
}



const repoPath = path.resolve('./', projectName);

const createRepo = (repoName) => {
    if (!fs.existsSync(repoPath)) {
        try {
            fs.mkdirSync(repoPath);
            console.log(`Created repository ${repoName} with nested folder ${projectName}`);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    } else {
        console.log(`Folder ${repoName} already exists.`);
        console.log(`Exiting...`);
        process.exit(1);
    }
};


const createPackage = (template = 'fastify', folder = 'node') => {
    const commonPackage = require(path.resolve(__dirname, '../../' + folder + '/common/package.json'));
    const fastifyPackage = require(path.resolve(__dirname, '../../' + folder + '/' + template + '/' + template + '.package.json'));

    const package = {
        ...commonPackage,
        ...fastifyPackage,
    };

    fs.writeFileSync(path.join(repoPath + '/package.json'), JSON.stringify(package, null, 4));
}


const copyCommonFiles = (folder = 'node') => {

    const commonPath = path.resolve(__dirname, '../../' + folder + '/common');
    const targetPath = repoPath;

    try {
        fs.copyFileSync(commonPath, repoPath);
        console.log(`Copied src files to ${targetPath}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}


const copyTemplateFiles = (template = 'fastify', folder = 'node') => {

    const templatePath = path.resolve(__dirname, '../../' + folder + '/' + template);
    const targetPath = path.join(repoPath, '/src/');

    try {
        fs.copyFileSync(templatePath, repoPath);
        console.log(`Copied src files to ${targetPath}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }



}








const main = async () => {

    const { consent } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'consent',
            message: 'Create a new project on ' + repoPath + '?',
            default: false,
        }
    ]);

    if (!consent) {
        console.log('Exiting...');
        process.exit(1);
    }



    const { enviroment } = await inquirer.prompt([
        {
            type: 'list',
            name: 'enviroment',
            message: 'Select one of two options',
            choices: ['client', 'node'],
        }
    ]);

    if (enviroment === 'client') {
        console.error('The "client" option is not implemented yet.');
        return;
    }

    if (enviroment === 'node') {
        const { template } = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Select one of three options',
                choices: ['fastify', 'express', 'koa'],
            }
        ]);

        createRepo(projectName);
        // copyCommonFiles(enviroment);
        // copyTemplateFiles(template, enviroment);
        createPackage(template, enviroment);
    }
};

main();








