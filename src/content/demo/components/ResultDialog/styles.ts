import styled from 'styled-components';
import { MAIN_FONT, MAIN_FONT_BOLD } from '../../constants';

const Container = styled.div`
  transform: scale(0.7, 0.7);
  height: 100%;
  width: 100%;
  max-height: 606px;
  max-width: 994px;
  box-shadow: 0 3px 33px 0 rgba(0, 0, 0, 0.53);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
`;

const Logo = styled.div`
  flex: 0 0 157px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    height: 100%;
    width: 110%;
    position: absolute;
    right: -5%;
    background-image: linear-gradient(284deg, #e67300 20%, #f6b205 80%);
    border-radius: 0 0 50% 50%;
  }

  img {
    width: 360px;
    height: 80px;
    z-index: 20;
  }
`;

const Info = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .result-calculations {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 420px;

    .result-aa-text {
      text-align: center;
      color: #585858;
      font-weight: bold;
      font-family: ${MAIN_FONT_BOLD};
    }

    .result-calculations-figures {
      display: flex;
      flex-direction: column;
      width: 100%;

      .result-calculations-item {
        display: flex;
        margin: 7px 0;

        .result-calculations-title {
          flex: 2;
          text-align: right;
          padding-right: 10px;
          font-size: 28px;
          font-weight: bold;
          color: #e67300;
          white-space: nowrap;
          font-family: ${MAIN_FONT_BOLD};
        }

        .result-calculations-value {
          flex: 1;
          font-size: 28px;
          white-space: nowrap;
          font-family: ${MAIN_FONT} !important;
        }

        .profit {
          font-weight: bold;
          font-family: ${MAIN_FONT_BOLD};
        }
      }
    }

    p {
      font-size: 22px;
    }
  }

  h1 {
    color: #e67300;
    font-size: 40px;
    font-weight: bold;
    text-transform: uppercase;
    font-family: ${MAIN_FONT_BOLD};
  }

  h4 {
    font-size: 28px;
    font-weight: bold;
    color: #585858;
    display: flex;
    align-items: center;

    .coupons-amount {
      font-size: 40px;
      color: #e67300;
      margin-right: 8px;
    }
  }

  img {
    width: 370px;
    height: 267px;
  }

  button {
    width: 294px;
    height: 54px;
    border-radius: 64px;
    background: #e67300;
    width: 100%;
    border: none;
    color: white;
    font-size: 22px;
    text-transform: capitalize;
    cursor: pointer;
    outline: none;
    font-family: ${MAIN_FONT_BOLD};
  }
`;

export { Container, Logo, Info };
