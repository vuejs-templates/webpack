module.exports = {
    "helpers":           {},
    "prompts":           {
        "name": {
            "type":     "string",
            "required": true,
            "message":  "Project name"
        },
    },
    "filters":           {},
    "skipInterpolation": [
        "src/sprites/templates/**/*",
        "src/**/*.vue"
    ],
    "completeMessage":   "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev"
};
