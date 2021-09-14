// If User had any complex fields, we'd put them on this object.
export class User {
  constructor(id, { name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
