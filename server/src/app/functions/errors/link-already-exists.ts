export class LinkAlreadyExists extends Error {
  constructor() {
    super("Link already exists.");
  }
}
