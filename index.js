require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
const inquirer = require("inquirer");

const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-3.5-turbo'
})

const prompt = async (input) => {
    try {
        const p = new PromptTemplate({
            template: "You are a JavaScript expert and will answer the user's coding question thouroughly as possible.\n{question}",
            inputVariables: ["question"],
        })
        const promptInput = await p.format({
            question: input
        })
        const res = await model.call(promptInput);
        console.log(res)
    } catch (err) {
        console.log(err);
    }
}

const init = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Ask a coding question:',
        },
    ]).then((res) => {
        prompt(res.name)
    })
}

init()