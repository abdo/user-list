import AntAlert from 'antd/lib/alert';
import AntPagination from 'antd/lib/pagination';
import AntSpin from 'antd/lib/spin';
import styled from 'styled-components';

export const Pagination = styled(AntPagination)`
  margin: 2rem 0;
`;

export const Alert = styled(AntAlert)`
  margin: 2rem 0;
`;

export const Spin = styled(AntSpin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
