module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 5 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
        })
    ]
}
