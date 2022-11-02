import React from 'react';

import { COLORS } from '@constants/theme';
import headBot from '@assets/images/headBot.png';
import closeIcon from '@assets/images/closeIcon.png';
import validIcon from '@assets/images/valid.png';
import invalidIcon from '@assets/images/invalid.png';
import {
    Grid,
    Header,
    Text,
    Start,
    Close,
    Image,
    CloseIcon,
    DetectIcon,
    ValidationImage,
} from './styles';
import { TDetectStage } from '../Demo/Demo';
import { useAnimation } from '@hooks/useAnimation';

interface IProps {
    inspectOnly: boolean;
    close: () => void;
    start: () => void;
    promocodes: number;
    total: number;
    shop: string;
    detectStage: TDetectStage;
    userCode: string;
    isUserCodeValid: boolean;
}

const DevStartSlider = ({
    inspectOnly,
    promocodes,
    total,
    shop,
    close,
    start,
    detectStage,
    userCode,
    isUserCodeValid,
}: IProps) => {
    const { phase, startAnimation } = useAnimation<'in' | 'out'>('in', 1000);
    const slideOut = startAnimation('out', close);

    return (
        <Grid slide={phase}>
            <Header>
                <Image src={headBot} />
                SmartShopping.ai
            </Header>
            <Text>
                Brand: <span style={{ color: COLORS.primary }}>{shop}</span>
            </Text>
            <Text>
                Coupons:{' '}
                <span style={{ color: COLORS.primary }}>{promocodes}</span>
            </Text>
            <Text>
                Cart total:{' '}
                <span
                    data-test-role="start-slider__total"
                    style={{ color: COLORS.primary }}
                >
                    {` $${total.toFixed(2)}`}
                </span>
            </Text>
            {detectStage === 'STARTED' && (
                <Text>
                    Detect started <DetectIcon />
                </Text>
            )}
            {detectStage === 'COUPON-EXTRACTED' && (
                <Text>
                    Coupon extracted - {userCode}{' '}
                    <ValidationImage
                        src={isUserCodeValid ? validIcon : invalidIcon}
                    />
                </Text>
            )}
            <Start
                data-test-role="start-slider__start-button"
                onClick={inspectOnly ? slideOut : start}
            >
                {inspectOnly ? 'Close' : 'Start'}
            </Start>
            <Close
                data-test-role="start-slider__close-button"
                onClick={slideOut}
            >
                <CloseIcon src={closeIcon} />
            </Close>
        </Grid>
    );
};

export { DevStartSlider };
