import React from 'react';

const masks = {
  currencyFormatter(value: number) {
    const format = /^([\d]*)\.?([\d]{2})/;
    const separatedByCents = String(value).replace(format,"$1.$2");

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(separatedByCents));
  }
}

export default masks;
