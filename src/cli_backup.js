import arg from 'arg';
import prompts from 'prompts';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        dirName: args._[0],
        type: args._[1],
        template: args._[2],
        runInstall: args['--install'] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'Javascript';
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        };
    }

    const questions = [];
    if (!options.dirName) {
        questions.push({
            type: 'text',
            name: 'dirName',
            message: 'Please provide a project directory name',
        })
    }
    if (!options.type) {
        questions.push({
            type: 'select',
            name: 'type',
            message: 'Please provide a project type',
            choices: ['Discord', 'Express']
        })
    }
    if (!options.template) {
        questions.push({
            type: 'select',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: ['Javascript', 'Typescript'],
            default: defaultTemplate,
        });
    }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Should a git be initialized?',
            default: false,
        });
    }

    const answers = await prompts(questions);
    console.log(answers);
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
        dirName: options.dirName || answers.dirName,
        type: options.type || answers.type
    };
}
export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    return;
    await createProject(options);
}
