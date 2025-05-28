import React, { useState } from 'react';
import logo from '@assets/images/smartshoppingLogo.png';
import closeIcon from '@assets/images/closeIcon.png';

import {
    Container,
    Header,
    Logo,
    Title,
    Label,
    Price,
    ImageWrapper,
    ProductImage,
    Sku,
    CloseButton,
    CloseIconStyled,
    VariantsWrapper,
    VariantGroup,
    VariantLabel,
    VariantItems,
    VariantItem,
} from './styles';
import { EngineProductVariantGroup } from 'smartshopping-sdk';

interface IProps {
    close: () => void;
    fullPrice: number | null;
    discountPrice: number | null;
    sku: string | null;
    imageUrl: string | null;
    title: string;
    variants: EngineProductVariantGroup[];
}

const ProductSlider = ({
    fullPrice,
    discountPrice,
    title,
    close,
    sku,
    imageUrl,
    variants,
}: IProps) => {
    const [fade, setFade] = useState<'in' | 'out'>('in');

    const fadeout = async () => {
        setFade('out');
        await new Promise((resolve) => setTimeout(resolve, 300));
        close();
    };

    return (
        <Container fade={fade}>
            <CloseButton onClick={fadeout}>
                <CloseIconStyled src={closeIcon} />
            </CloseButton>
            <Header>
                <Logo src={logo} alt="SmartShopping Logo" />
            </Header>
            <Label>Product Name:</Label>
            <Price>{title}</Price>

            {fullPrice !== null && (
                <>
                    <Label>Full Price:</Label>
                    <Price>${fullPrice.toFixed(2)}</Price>
                </>
            )}

            {discountPrice !== null && (
                <>
                    <Label>Discount Price:</Label>
                    <Price style={{ color: '#e63946' }}>
                        ${discountPrice.toFixed(2)}
                    </Price>
                </>
            )}

            {imageUrl && (
                <ImageWrapper>
                    <ProductImage src={imageUrl} alt={title} />
                </ImageWrapper>
            )}
            {sku && (
                <>
                    <Label>SKU:</Label>
                    <Sku>{sku}</Sku>
                </>
            )}
            {variants.length > 0 && (
                <>
                    <Label>Variants:</Label>
                    <VariantsWrapper>
                        {variants.map((group) => (
                            <VariantGroup key={group.label}>
                                <VariantLabel>{group.label}:</VariantLabel>
                                <VariantItems>
                                    {group.items.map((item) => (
                                        <VariantItem key={item.label}>
                                            {item.label}
                                        </VariantItem>
                                    ))}
                                </VariantItems>
                            </VariantGroup>
                        ))}
                    </VariantsWrapper>
                </>
            )}
        </Container>
    );
};

export { ProductSlider };
