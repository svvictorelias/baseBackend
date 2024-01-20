class User {
  id!: string;
  nome!: string;
  email!: string;
  senha?: string;
  tipo!: string;
  habilitado!: boolean;
}

export { User };
