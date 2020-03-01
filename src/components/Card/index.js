import AntCard from 'antd/lib/card';
import styled from 'styled-components';
import { screenWidths } from '../../style/constants';

export const Card = styled(AntCard)`
  width: 45rem;
  margin: 2rem 0;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.75);
  @media (max-width: ${screenWidths.mobile}px) {
    width: 90%;
  }
`;
