import knex from "knex";
import faker from "faker";

export class Manager {
  constructor(config, table) {
    this._db = knex(config);
    this._table = table;
  }

  async create(obj) {
    try {
      let id = await this._db(this._table).insert(obj);
      return id;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getById(row) {
    try {
      let data = await this._db(this._table).whereRaw("id = ?", row);
      return JSON.parse(JSON.stringify(...data));
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAll() {
    try {
      let data = await this._db.from(this._table).select("*");
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateById(obj) {
    try {
      let data = await this._db(this._table)
        .where({ id: obj.id })
        .update({ name: obj.name, price: obj.price, thumbnail: obj.thumbnail });
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteById(id) {
    try {
      let data = await this._db(this._table).where({ id: id }).del();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
  async getRandomProducts() {
    let productos = [];
    for (let id = 0; id <= 4; id++) {
      const nombre = faker.commerce.product();
      const precio = faker.commerce.price(100, 200, 2, "$");
      const foto = faker.image.animals(640, 480, true);

      productos.push({
        id,
        nombre,
        precio,
        foto,
      });
    }
    return productos;
  }
}
