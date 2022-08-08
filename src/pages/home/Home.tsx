import React, { useState, useEffect } from 'react';
import { Steps } from 'shared/ui/steps';
import { Button } from 'shared/ui/button';

const Home = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleSelect = (step: number) => {
    setActiveStep(step);
  };

  const checkValid = (step: number, index: number) => {
    console.log('==========>step', step);
    console.log('==========>index', index);

    return true;
  };

  return (
    <div>
      <Steps isValid={checkValid} color="blue" onSelect={handleSelect} isColumn activeStep={activeStep}>
        <Steps.Step>1 шаг</Steps.Step>
        <Steps.Step>2 шаг</Steps.Step>
        <Steps.Step>3 шаг</Steps.Step>
        <Steps.Step>4 шаг</Steps.Step>
        <Steps.Step>5 шаг</Steps.Step>
      </Steps>
      <Button>отправить</Button>
    </div>
  );
};

export default Home;
