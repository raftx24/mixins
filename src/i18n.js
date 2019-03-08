export default {
    methods: {
        i18n(key, params = null) {
            if (key === null || key === '' || typeof key === 'undefined') {
                return null;
            }

            if (!this.$store.getters['localisation/ready']) {
                return key;
            }

            let translation = this.$store.getters['localisation/i18n'](key);

            if (typeof translation === 'undefined' || translation === null) {
                translation = key;

                if (this.$store.state.localisation.keyCollector) {
                    this.$store.commit('localisation/addMissingKey', key);
                }
            }

            return !!params && typeof params === 'object'
                ? translation.replace(/:(\w*)/g, (e, key) => {
                    if (typeof params[key.toLowerCase()] === 'undefined') {
                        return key;
                    }

                    const param = params[key.toLowerCase()];

                    if (key === key.toUpperCase()) {
                        return param.toUpperCase();
                    }

                    return key[0] === key[0].toUpperCase()
                        ? param.charAt(0).toUpperCase() + param.slice(1)
                        : param;
                })
                : translation || key;
        },
    },
};
