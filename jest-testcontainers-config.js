module.exports = {
    awx: {
        image: 'wiremock/wiremock:3.9.1',
        ports: [8080],
        resourcesQuota: {
            memory: 0.25
        },
        bindMounts: [{
            source: `${__dirname}/.awx`,
            target: '/home/wiremock',
            mode: 'rw'
        }],
        command: ['--verbose', '--disable-banner', '--record-mappings',
            '--proxy-all', 'https://host.docker.internal:8043' ]
    }
}