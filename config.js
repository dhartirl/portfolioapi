module.exports = {
    authSecret: process.env.authSecret || 'AUTH_TOKEN',
    awsRoot: process.env.awsRoot || 'S3_ROOT_FOLDER',
    dbUrl: process.env.dbUrl || 'DBURL_HERE',
    clientLocation: process.env.clientLocation || 'http://localhost:4200',
    listenPort: process.env.listenPort || 4201
}