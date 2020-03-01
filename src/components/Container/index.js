import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => `linear-gradient(
    90deg,
    ${theme.colors.secondaryTransparent} 0%,
    ${theme.colors.primaryTransparent} 80%
  )`};
`;
