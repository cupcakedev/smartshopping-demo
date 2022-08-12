import React, { useState } from 'react';

import { COLORS } from '../../../../constants/constants';
import headBot from '../../../../assets/images/headBot.png';
import closeIcon from '../../../../assets/images/closeIcon.png';
import {
    Grid,
    Header,
    Text,
    Start,
    Close,
    Image,
    CloseIcon,
    DetectIcon,
} from './styles';
import { TDetectStage } from '../Demo';

interface IProps {
    inspectOnly: boolean;
    close: () => void;
    start: () => void;
    promocodes: number;
    total: number;
    shop: string;
    detectStage: TDetectStage;
    userCode: string;
}

const StartSlider = ({
    inspectOnly,
    promocodes,
    total,
    shop,
    close,
    start,
    detectStage,
    userCode,
}: IProps) => {
    const [fade, setFade] = useState<'in' | 'out'>('in');
    const fadeout = async () => {
        setFade('out');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        close();
    };

    return (
        <Grid fade={fade}>
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
                    {` $${total?.toFixed(2)}`}
                </span>
            </Text>
            {detectStage === 'STARTED' && (
                <Text>
                    Detect started <DetectIcon />
                </Text>
            )}
            {detectStage === 'COUPON-EXTRACTED' && (
                <Text>Coupon extracted - {userCode}</Text>
            )}
            <Start
                data-test-role="start-slider__start-button"
                onClick={inspectOnly ? fadeout : start}
            >
                {inspectOnly ? 'Close' : 'Start'}
            </Start>
            <Close
                data-test-role="start-slider__close-button"
                onClick={fadeout}
            >
                <CloseIcon src={closeIcon} />
            </Close>
        </Grid>
    );
};

export { StartSlider };
