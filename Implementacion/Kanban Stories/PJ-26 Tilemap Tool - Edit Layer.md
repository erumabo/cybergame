JIRA:PJ-26

Opcion 1:
Todo con flags y opciones del programa:
https://www.npmjs.com/package/commander#commands

Pro: Podemos hacer input/ output del stdin-stdout, para usar |>< con otros programas
Con: Habria que especificar todos tus cambios deseados con --option, lo que puede ser engorroso, pero si tenemos la opcion de | podriamos encadenar comandos

Opcion 2:
Interactive cli:

1. https://www.npmjs.com/package/enquirer
2. https://www.npmjs.com/package/@inquirer/prompts
3. https://www.npmjs.com/package/prompts
4. https://github.com/sindresorhus/yocto-spinner
5. https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json << Sand spinner

