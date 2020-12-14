module.exports = (api) => {
    api.cache(true)
    const plugins =
    [
        'babel-plugin-transform-typescript-metadata',
        [
            "@babel/plugin-proposal-decorators",
            {
            "legacy": true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties", 
            { 
                "loose": true 
            }
        ]
    ]

    const presets = ['@babel/env', '@babel/typescript']
    return { presets, plugins}
  }