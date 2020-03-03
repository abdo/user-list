import { Container as MainContainer } from 'components/Container';
import styled from 'styled-components';

export const Container = styled(MainContainer)`
  & .ant-pagination,
  .ant-alert,
  .ant-btn {
    margin: 2rem 0;
  }
`;

export const StatusIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;

  & p {
    margin: 0;
  }
`;
