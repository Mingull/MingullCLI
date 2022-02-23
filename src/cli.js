import arg from 'arg';
import chalk from 'chalk';
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
        type: args._[0],
        command: args._[1],
        name: args._[2],
        template: args._[3],
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

    const resultType = await prompts({
        type: 'select',
        name: 'type',
        message: 'Whats the type of project?',
        choices: [
            { title: 'Express', value: "express" },
            { title: 'Discord', value: 'discord', disabled: true },
        ]
    });
    if (resultType.type == "express") {
        const resultCommand = await prompts({
            type: 'select',
            name: 'command',
            message: 'What do you want to do?',
            choices: [
                { title: 'New', value: "new" },
                { title: 'Generate', value: 'generate', disabled: true },
            ]
        });
        if (resultCommand.command == "new") {
            const questions = [];
            if (!options.name) {
                questions.push({
                    type: 'text',
                    name: 'name',
                    message: 'Please provide a project directory name',
                    initial: "express-project"
                })
            }
            if (!options.template) {
                questions.push({
                    type: 'select',
                    name: 'template',
                    message: 'Please choose which project template to use',
                    choices: [
                        { title: 'Javascript', value: 'javascript', selected: true },
                        { title: 'Typescript', value: 'typescript' }
                    ]
                });
            }
            if (!options.git) {
                questions.push({
                    type: 'confirm',
                    name: 'git',
                    message: 'Should a git be initialized?',
                    initial: false,
                });
            }

            const otherResult = await prompts(questions);
            return {
                ...options,
                type: options.type || resultType.type,
                command: options.command || resultCommand.command,
                template: options.template || otherResult.template,
                git: options.git || otherResult.git,
                name: options.name || otherResult.name
            };
        }
        if (result.command == "generate") {
            console.error(`${chalk.red.bold('WIP')} Express generate not ready`);
            process.exit(1);
        }
    }
    if (result.type == "discord") {
        console.error(`${chalk.red.bold('WIP')} Discord not ready`);
        process.exit(1);
    }
    // return {
    //     ...options,
    //     template: options.template || answers.template,
    //     git: options.git || answers.git,
    //     dirName: options.dirName || answers.dirName,
    //     type: options.type || answers.type
    // };
}
export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    // console.log(options);
    // return;
    await createProject(options);
}
