export default class Point {
  constructor(name, x, y, position) {
    this.id = this.generateId();
    this.name = name;
    this.x = x;
    this.y = y;
    this.position = position;
  }

  /**
   * Генерация идентификатора точки 
   */
  generateId() {
    return Math.random().toString().substr(2);
  }
}