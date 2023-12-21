const cron = require('node-cron');
const { main } = require('./scrapping');

cron.schedule('*/3 * * * *', () => {
    console.log('Exécution du scraping toutes les 3 minutes');
    main();
});
