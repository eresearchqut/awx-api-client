module.exports = {
    awx: {
        image: 'wiremock/wiremock',
        ports: [8080],
        resourcesQuota: {
            memory: 0.25
        },
        bindMounts: [{
            source: `${__dirname}/.awx`,
            target: '/home/wiremock',
            mode: 'rw'
        }],
        command: ['--verbose', '--disable-banner', '--record-mappings', `--proxy-all=${process.env.AWX_URL}`]
    }
}