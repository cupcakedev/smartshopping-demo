import styled from 'styled-components';

const Container = styled.div`
  font-family: Verdana;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 1 0 180px;
  padding: 10px 15px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid black;
`;

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

export { Container, Header, Text, ApplyButton, CloseButton };
