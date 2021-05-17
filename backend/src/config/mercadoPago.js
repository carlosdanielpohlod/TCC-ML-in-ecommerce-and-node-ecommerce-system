module.exports = {
    config:{
        notification_url: "https://webhook.site/fcbf2553-2a91-4429-9275-fd4246ff0d1e",
        statement_descriptor: "TESTE",
        back_urls: {
            success: "https://webhook.site/fcbf2553-2a91-4429-9275-fd4246ff0d1e",
            failure: "http://www.failure.com",
            pending: "http://www.pending.com"
        },
        auto_return: "approved"
    },
    credentials:{
        access_token: 'APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327',
        public_key:'APP_USR-6096a634-0b35-452c-94c9-a18adb8ffb15',
        integrator_id:'dev_24c65fb163bf11ea96500242ac130004',
        collector_id:'725736327'
    }
}