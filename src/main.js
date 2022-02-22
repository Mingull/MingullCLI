import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function createDir(options) {
    const result = await execa("mkdir", [options.dirName], { cwd: options.targetDirectory });
    if (result.failed) {
        return Promise.reject(new Error('Failed to create directory'));
    }
    options.targetDirectory += `/${options.dirName}`;
    return;
}

async function initNPM(options) {
    const npmResult = await execa('npm', ['init', '-y'], { cwd: options.targetDirectory });
    if (npmResult.failed) {
        return Promise.reject(new Error('Failed to initialize npm'));
    }
    return;
}

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

async function initGit(options) {
    const result = await execa('git', ['init'], { cwd: options.targetDirectory, });
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize Git'))
    }
    return;
}

export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    const currentFileUrl = import.meta.url;
    const templateDir = path.resolve(
        new URL(currentFileUrl).pathname.slice(1),
        '../../templates/',
        options.type.toLowerCase(),
        options.template.toLowerCase()
    );
    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error(`${chalk.red.bold('ERROR')} Invalid template name`);
        process.exit(1);
    }

    if (options.type == "Discord") {
        console.error(`${chalk.red.underline.bold('WIP')} Discord not ready`);
        process.exit(1);
    }

    const tasks = new Listr([
        {
            title: 'Creating directory',
            task: () => createDir(options)
        },
        {
            title: 'Copy project files',
            task: () => copyTemplateFiles(options)
        },
        {
            title: 'Initializing npm',
            task: () => initNPM(options)
        },
        {
            title: 'Initializing git',
            task: () => initGit(options),
            skip: () => !options.git ? 'Pass --git to initiate a git repository' : undefined
        },
        {
            title: 'Install dependencies',
            task: () => projectInstall({
                cwd: options.targetDirectory
            }),
            skip: () => !options.runInstall ? 'Pass --install to automatically install all dependencies' : undefined
        }
    ])

    await tasks.run();

    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}