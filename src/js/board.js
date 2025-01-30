export default class Board {
  constructor(element) {
    if (!element) {
      throw new Error("не передан элемент");
    }
    this.element = element;
    this.generateСells();
    this.currentElement = null;
    this.currentСellIndex = null;
  }
}
