import React from 'react';

import { COLORS } from '@constants/theme';
import logo from '@assets/images/smartshoppingLogo.png';
import { TDetectStage } from '../Demo/Demo';
import { useAnimation } from '@hooks/useAnimation';
import { Button, Grid, Image, Plan, Text } from './styles';

interface IProps {
    inspectOnly: boolean;
    close: () => void;
    start: () => void;
    promocodes: number;
    total: number;
    detectStage: TDetectStage;
    userCode: string;
}

const ClientStartSlider = ({
    inspectOnly,
    promocodes,
    total,
    close,
    start,
    detectStage,
    userCode,
}: IProps) => {
    const { phase, startAnimation } = useAnimation<'in' | 'out'>('in', 1000);
    const slideOut = startAnimation('out', close);

    const isThirdPartyCouponApplied = !!userCode;
    const isStandardPlanMerchant = detectStage === 'INACTIVE' && inspectOnly;
    const isEssentialPlanMerchant = detectStage !== 'INACTIVE' && inspectOnly;
    const isPlusPlanMerchant = !!promocodes && !inspectOnly;

    return (
        <Grid slide={phase}>
            <Image src={logo} />
            <Plan>
                {isStandardPlanMerchant && 'Standard'}
                {isEssentialPlanMerchant && 'Essential'}
                {isPlusPlanMerchant && 'Plus'}
            </Plan>
            {(isStandardPlanMerchant || isEssentialPlanMerchant) &&
                !isThirdPartyCouponApplied && (
                    <>
                        <Text>
                            Your cart total is
                            <span style={{ color: COLORS.primary }}>
                                {' '}
                                ${total}.
                            </span>
                        </Text>
                        <Text>
                            Make sure to activate cashback and save
                            <span style={{ color: COLORS.primary }}>
                                {' '}
                                ${(total * 0.05).toFixed(2)}.
                            </span>
                        </Text>
                        <Button onClick={slideOut}>Got it</Button>
                    </>
                )}
            {isEssentialPlanMerchant && isThirdPartyCouponApplied && (
                <>
                    <Text>
                        It looks like a 3d party coupon code has been used and
                        cashback was cancelled.
                    </Text>
                    <Text>Please re-activate cashback and save money</Text>
                    <Button onClick={slideOut}>Got it</Button>
                </>
            )}
            {isPlusPlanMerchant && (
                <>
                    <Text>
                        You have{' '}
                        <span style={{ color: COLORS.primary }}>
                            {promocodes}{' '}
                        </span>
                        coupon code(s) available
                    </Text>
                    <Button onClick={start}>Apply coupons</Button>
                </>
            )}
        </Grid>
    );
};

export { ClientStartSlider };
