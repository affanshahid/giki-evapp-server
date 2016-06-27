const configs = {
  development: {
    port: 8001,
    multerOpts: { dest: './data/images' },
    dbSetup: [undefined, undefined, undefined],
    dbOpts: {
      dialect: 'sqlite',
      typeValidation: true,
      logging: false,
      storage: './data/db.sqlite'
    }
  },
  test: {
    port: 4001,
    multerOpts: { dest: './test/fixtures/data/images' },
    dbSetup: [undefined, undefined, undefined],
    dbOpts: {
      dialect: 'sqlite',
      typeValidation: true,
      logging: false,
      storage: './test/fixtures/data/db.sqlite'
    }
  },
  production: {
    port: process.env.PORT,
    cloudinaryOpts: {
      folder: 'giki-evapp-server',
      allowedFormats: ['jpg', 'png', 'gif']
    },
    multerOpts: {
      limits: {
        fileSize: 2 * 1024 * 1024
      }
    },
    dbSetup: [process.env.DATABASE_URL],
    dbOpts: {
      dialect: 'postgres',
      typeValidation: true,
      logging: false
    }
  }
};

const env = getEnvironment();
const config = configs[env];
config.env = env;

export default config;

function getEnvironment() {
  if (process.env.npm_lifecycle_event === "test") {
    process.env.NODE_ENV = 'test';
  }
  if (process.env.NODE_ENV) return process.env.NODE_ENV;
  return 'development';
}
