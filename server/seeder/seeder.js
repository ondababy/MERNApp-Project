import { faker } from '@faker-js/faker';

export class Seeder {
  constructor(service, count) {
    this.service = service;
    this.count = count;
  }

  schema() {
    return {};
  }

  async run() {
    try {
      await this.service.deleteMany({});
      console.log(`Cleared existing data from ${this.service.model.modelName}`);

      const schema = this.schema();
      const fakeData = Array.from({ length: this.count }, () => this.generate(schema));

      await this.service.insertMany(fakeData, { ordered: false });
      console.log(`Inserted ${this.count} fake records into ${this.service.model.modelName}`);
    } catch (error) {
      console.error(`Error seeding data for ${this.service.model.modelName}:`, error);
    }
  }

  generate(schema) {
    const fakeData = {};
    for (const [field, fakerMethod] of Object.entries(schema)) {
      if (typeof fakerMethod === 'function') {
        fakeData[field] = fakerMethod();
      } else if (typeof fakerMethod === 'string') {
        const [category, method] = fakerMethod.split('.');
        if (faker[category] && faker[category][method]) {
          fakeData[field] = faker[category][method]();
        } else {
          console.warn(`Invalid faker method: ${fakerMethod}`);
        }
      }
    }
    return fakeData;
  }
}

