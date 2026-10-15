const { Sequelize } = require('sequelize');

// Substitui pelo teu External Database URL do Render
const sequelize = new Sequelize('postgresql://carlos:5mVqQyzMMQlybzK0NbcLcSvK96clwruX@dpg-db4cf4ks728c73aat1hg-a.frankfurt-postgres.render.com/dbtreino_tyok', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;
