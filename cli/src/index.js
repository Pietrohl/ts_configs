#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
    console.error("You must provide a repository name as second argument.");
    process.exit(1);
}



const repoPath = path.resolve('./', projectName);


function isFile(target) {
    return fs.statSync(target).isFile();
}


function copyFiles(source, target) {
    const dirs = fs.readdirSync(source);
    for (const d of dirs) {
        if (isFile(path.join(source, d))) {
            fs.copyFileSync(path.join(source, d), path.join(target, d));
        } else {
            fs.mkdirSync(path.join(target, d));
            copyFiles(path.join(source, d), path.join(target, d));
        }
    }
}



const runCommand = command => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (err) {
        console.error(`Failed to execute ${command}. `, err);
        process.exit(1);
    }
}




const createRepo = (repoName) => {
    if (!fs.existsSync(repoPath)) {
        try {
            fs.mkdirSync(repoPath);
            console.log(`Created repository ${repoName} on folder ${repoPath}`);
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
        copyFiles(commonPath, repoPath);
        console.log(`Copied src files to ${targetPath}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}


const copyTemplateFiles = (template = 'fastify', folder = 'node') => {

    const templatePath = path.resolve(__dirname, '../../' + folder + '/' + template + '/src');
    const targetPath = path.join(repoPath, '/src/');

    try {
        fs.mkdirSync(targetPath);
        copyFiles(templatePath, targetPath);
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
    let template;
    if (enviroment === 'node') {
        template = (await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Select one of three options',
                choices: ['fastify', 'express', 'koa'],
            }
        ])).template;

    }

    const { packageMan } = await inquirer.prompt([
        {
            type: 'list',
            name: 'packageMan',
            message: 'Select the package manager you want to use',
            choices: ['npm', 'yarn', 'pnpm'],
            default: 'npm'
        }
    ]);



    createRepo(projectName);
    copyCommonFiles(enviroment);
    copyTemplateFiles(template, enviroment);
    createPackage(template, enviroment);
    runCommand(`cd ${repoPath} && ${packageMan} ${packageMan === 'yarn' ? "" : 'install'}`);
};

main();








