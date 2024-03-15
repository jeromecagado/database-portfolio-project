# All codes is based on the CS 340 starter code, with the exception of formatting dates in employee.hbs, sales.hbs and the get functions for both employee and sales in app.js. That code is based on this ed dicussion: https://edstem.org/us/courses/49750/discussion/4477591. Cuong Duong, is the one who suggested using the following:

const moment = require('moment');
const Handlebars = require('handlebars');

Handlebars.registerHelper('formatDate', function(dateString, format = 'MMM DD, YYYY') {
  return moment(dateString).format(format);
});.


The Retro Games database is crucial to the growth of the store. The databases focuses on the efficient management of sales, inventory, and customer relations within Retro Games store. In response to the shifting landscape of the gaming industry towards digital distribution and the growing scarcity of retro and physical video games, Retro Games has witnessed a surge in new customers seeking their products. However, without a robust system in place to track customer data, monitor inventory levels, and maintain operational efficiency while delivering exceptional customer service, Retro Games faced challenges in meeting the demands of its expanding clientele. To address these challenges, the Retro Games database was designed and implemented. This database serves as a centralized repository for storing and managing critical information pertaining to Retro Games employees, customers, developers, sales transactions, and the extensive catalog of video games offered by the store.

By leveraging the functionalities of the Retro Games database, the company can effectively track sales performance, monitor inventory levels in real-time, and analyze customer preferences and purchasing patterns. Overall, the Retro Games database plays a pivotal role in empowering Retro Games stores to adapt to the dynamic gaming market landscape while upholding the highest standards of operational efficiency and customer satisfaction.

© 2024 Gabriel Jean-Betrand and Jerome Cagado

