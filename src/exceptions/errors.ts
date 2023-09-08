export const errors = {
  FAIR_PRODUCT_ALREADY_CREATED: {
    status: 409,
    message: 'Produto já cadastrado',
  },
  FAIR_NOT_FOUND: {
    status: 404,
    message: 'Feira não encontrada',
  },
  FAIR_PRODUCT_NOT_FOUND: {
    status: 404,
    message: 'Produto não encontrado',
  },
  FAIR_ALREADY_CREATED: {
    status: 409,
    message: 'Feira já cadastrada',
  },
  USER_ALREADY_CREATED: {
    status: 400,
    message: 'Usuário já cadastrado',
  },
  USER_NOT_FOUND: {
    status: 404,
    message: 'Usuário não encontrado',
  },
  PASSWORD_INCORRECT: {
    status: 401,
    message: 'Senha incorreta',
  },
};
