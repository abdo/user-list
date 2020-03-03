import { Container as MainContainer } from 'components/Container';
import styled from 'styled-components';

export const Container = styled(MainContainer)`
  & .ant-card {
    text-align: center;
  }
  & .ant-input,
  .ant-btn,
  .ant-select {
    margin: 2rem 0;
  }

  .ant-select {
    width: 100%;
  }
`;

export const RedirectHint = styled.div`
  color: ${({ theme }) => theme.colors.base};
  cursor: pointer;
`;
