const presets = [
    [
        "@babel/env",
        {

        },
    ],
];

const ignore = [/node_modules\/(?!lodash-es)/]

module.exports = { presets, ignore };