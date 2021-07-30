import styled from 'styled-components';

const Header = styled.p`
  margin: 0;
  line-height: 1.1em;
  letter-spacing: 0.05em;
  font-size: 16px;
  text-align: center;
`;

const Text = styled.p`
  line-height: 1.1em;
  letter-spacing: 0.05em;
  margin: 5px 0;
  font-size: 12px;
`;

const ApplyButton = styled.button`
  line-height: 1.1em;
  letter-spacing: 0.05em;
  height: 40px;
  width: 120px;
  margin: 5px 80px 0;
  cursor: pointer;
`;

const CloseButton = styled.button`
  letter-spacing: 0.05em;
  position: absolute;
  margin: 0;
  top: 10px;
  right: 10px;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  border: 2px solid black;
  padding: 0 0 2px 1px;
  font-size: 14px;
  line-height: 1em;
  cursor: pointer;
`;

export { Header, Text, ApplyButton, CloseButton };
