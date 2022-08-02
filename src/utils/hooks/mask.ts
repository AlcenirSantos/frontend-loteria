export const getPureValue = (value) => {
  if (!value) {
    return '';
  }
  return value.replace(/[\s()-//.]/g, '').replace(/_/g, '');
};
const process = (mask, value) => {
  const arrayMask = mask.split('');
  const arrayValue = String(value).split('');

  return arrayMask.reduce((acc, curr) => {
    if (arrayValue.length) {
      if (curr === '9') {
        return acc + arrayValue.shift();
      }
      return acc + curr;
    }
    return acc;
  }, '');
};
export enum MaskTypes {
  CPF = '0[0][0].0[0][0].0[0][0]-0[0]',
  CNPJ = '0[0].0[0][0].0[0][0]/0[0][0][0]-0[0]',
  PHONENUMBER = '(0[0]) 0[0][0][0]-0[0][0][0]',
  CELLNUMBER = '(0[0]) 0[0][0][0][0]-0[0][0][0]',
  DATE = '0[0]/0[0]/0[0][0][0]',
}
const masks = {
  cep: (value) => {
    const pure = getPureValue(value);
    return process('99999-999', pure);
  },
  cepWithDot: (value) => {
    const pure = getPureValue(value);
    return process('99.999-999', pure);
  },
  cpf: (value) => {
    const pure = getPureValue(value);
    return process('999.999.999-99', pure);
  },
  cnpj: (value) => {
    const pure = getPureValue(value);
    return process('99.999.999/9999-99', pure);
  },
  document: (value) => {
    const pure = getPureValue(value);
    if (pure.length <= 11) {
      return masks.cpf(value);
    }
    return masks.cnpj(value);
  },
  phoneNumber: (value) => {
    const pure = getPureValue(value);
    if (pure.length < 11) {
      return process('(99) 9999-9999', pure);
    }
    return process('(99) 99999-9999', pure);
  },
  date: (value) => {
    const pure = getPureValue(value);
    return process('99/99/9999', pure);
  },
  cardNumber: (value) => {
    const pure = getPureValue(value);
    return process('9999 9999 9999 9999', pure);
  },
  cardExpirationDate: (value) => {
    const pure = getPureValue(value);
    return process('99/99', pure);
  },
};

export const maskPhone = (value: string) => {
  const pure = getPureValue(value);
  return masks.phoneNumber(pure);
};

export const maskDocument = (value: string) => {
  const pure = getPureValue(value);
  if (pure.length <= 11) {
    return masks.cpf(value);
  }
  return masks.cnpj(value);
};
