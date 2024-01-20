interface IUserDTO {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  habilitado: boolean;
}

interface IUpdatePasswordUser {
  id: string;
  password: string;
}

export { IUserDTO, IUpdatePasswordUser };
