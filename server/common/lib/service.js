import slugify from 'slugify';
export class Service {
  model = null;
  fieldToSlugify = null;
  slugField = 'slug';
  query = null;

  _checkModel() {
    if (!this.model) throw new Error('Resource not set.');
  }

  hasSlugField() {
    const hasSlug = this.slugField && this.model.schema.paths[this.slugField];
    const hasFieldToSlugify = this.fieldToSlugify && this.model.schema.paths[this.fieldToSlugify];
    return hasSlug && hasFieldToSlugify;
  }

  hasField(field) {
    const hasField = this.imageField && this.model.schema.paths[field];
    return hasField;
  }

  slugParams(field) {
    return [
      field,
      {
        lower: true,
        strict: true,
        trim: true,
      },
    ];
  }

  makeSlug(field) {
    if (!this.hasSlugField()) return null;
    field = field || this.fieldToSlugify;
    return slugify(...this.slugParams(field));
  }

  exec() {
    const query = this.query.exec();
    this.query = null;
    return query;
  }

  search(str = '', field = 'name') {
    this._checkModel();

    if (!this.query) this.query = this.model.find();

    this.query = this.query.find({
      [field]: {
        $regex: new RegExp(str, 'i'),
      },
    });
    return this;
  }

  paginate(params = {}) {
    this._checkModel();
    let { limit = 10, page = 1, sort = '-createdAt', filter = {} } = params;

    if (limit < 1) limit = 10;
    if (page < 1) page = 1;

    const skip = (page - 1) * limit;
    if (!this.query) this.query = this.model.find();
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  filter(params = {}) {
    this._checkModel();
    if (!this.query) this.query = this.model.find();
    this.query = this.query.find(params);
    return this;
  }

  async checkIfExists(filter) {
    this._checkModel();
    const record = await this.model.exists(filter);
    if (record) return record;
    return null;
  }

  async getAll() {
    this._checkModel();
    return this.model.find();
  }

  async getById(id) {
    this._checkModel();
    return this.model.findById(id);
  }

  async getOne(filter) {
    this._checkModel();
    return this.model.findOne(filter);
  }
  async create(body) {
    this._checkModel();
    const data = Array.isArray(body)
      ? body.map((item) => this.model.filterFillables(item))
      : this.model.filterFillables(body);
    const slug = this.makeSlug(data[this.fieldToSlugify]);
    if (slug) data[this.slugField] = slug;
    return this.model.create(data);
  }

  async update(id, body) {
    this._checkModel();
    const data = Array.isArray(body)
      ? body.map((item) => this.model.filterFillables(item))
      : this.model.filterFillables(body);
    const slug = this.makeSlug(data[this.fieldToSlugify]);
    if (slug) data[this.slugField] = slug;
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    this._checkModel();
    return this.model.findByIdAndDelete(id);
  }

  async insertMany(bodies, ignoreErrors = true) {
    this._checkModel();
    const data = bodies.map((body) => {
      const filteredData = this.model.filterFillables(body);
      const slug = this.makeSlug(filteredData[this.fieldToSlugify]);
      if (slug) filteredData[this.slugField] = slug;
      return filteredData;
    });
    return this.model.insertMany(data, { ordered: !ignoreErrors });
  }

  async deleteMany(body) {
    this._checkModel();
    return this.model.deleteMany(body);
  }
}
