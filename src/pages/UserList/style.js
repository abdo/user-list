import { Container as MainContainer } from 'components/Container';
import styled from 'styled-components';

export const Container = styled(MainContainer)`
  & .ant-pagination,
  .ant-alert {
    margin: 2rem 0;
  }

  & .ant-spin-lg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
