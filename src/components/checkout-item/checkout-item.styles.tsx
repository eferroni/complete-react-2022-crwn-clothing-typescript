import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
  .name,
  .quantity,
  .price {
    width: 23%;
  }
  .quantity {
    display: flex;

    .arrow {
      cursor: pointer;
    }

    .value {
      margin: 0 10px;
    }
  }

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 800px) {
    padding-right: 10px;
  }
`;

export const RemoveButton = styled.span`
  padding-left: 12px;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    padding-left: unset;
  }
`;
