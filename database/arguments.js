export const getArgument = (argName) => {
    const idx = process.argv.findIndex(arg => arg === `--${argName}`)

    if(idx === -1) {
        throw new Error("Application requires argument "+argName)
    }

    const arg = process.argv[idx+1]

    if(arg === undefined) {
        throw new Error("No value provided for argument "+argName)
    }

    return arg
}