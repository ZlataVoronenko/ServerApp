const path = require('path');

module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        config.resolve.alias['@response'] = path.join(__dirname, 'response');

        config.resolve.alias['@'] = path.resolve(__dirname);
        
        return config;
    },
};