import React from 'react';
import { useAccountContext } from '../../../contexts/useAccountContext';
import { useAccountUtils } from '../../../hooks/account/useAccountUtils';
import { toCurrency } from '../../../utilities/utils';
import { Container } from '../../common/grids';
import { StaticMapImage } from '../../common/images';
import { InputWithImage } from '../../common/inputs/InputWithImage';

const AccountDetailsScreen: React.FC = () => {
  const {
    accountState: { account },
  } = useAccountContext();
  const { fullAccountName, fullAccountAddress } = useAccountUtils(account);

  return (
    <Container style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
      <InputWithImage
        label="Número de cuenta"
        editable={false}
        returnKeyType="next"
        value={account?.AccountNumber}
      />

      <InputWithImage
        label="Propietario"
        editable={false}
        returnKeyType="next"
        value={fullAccountName}
      />

      <InputWithImage
        label="Domicilio"
        editable={false}
        returnKeyType="next"
        value={fullAccountAddress}
      />

      <InputWithImage
        label="Monto de adeudo"
        editable={false}
        returnKeyType="next"
        value={`$ ${toCurrency(account?.Amount)}`}
      />

      <InputWithImage
        label="Celular"
        returnKeyType="next"
        keyboardType="name-phone-pad"
        value={account?.Mobile}
      />

      <InputWithImage
        label="Correo"
        returnKeyType="done"
        keyboardType="email-address"
        value={account?.Email}
      />

      <StaticMapImage
        latitude={account?.Latitud}
        longitude={account?.Longitud}
      />
    </Container>
  );
};

export { AccountDetailsScreen };
