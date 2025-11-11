/**
 * @typedef {Object} Producto
 * @property {number} id
 * @property {number} subcategoria_id
 * @property {string} nombre
 * @property {string} descripcion
 * @property {number} precio
 * @property {string} imagen
 */

/**
 * @typedef {Object} Categoria
 * @property {number} id
 * @property {string} nombre
 * @property {{id:number,nombre:string}[]} sub
 */

/**
 * @typedef {Object} Usuario
 * @property {number} id
 * @property {string} email
 * @property {string} password_hash
 */
