import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Steps } from 'shared/ui/steps';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

const Home = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleSelect = (step: number) => {
    setActiveStep(step);
  };

  const checkValid = (step: number, index: number) => {
    return true;
  };

  const { register, getValues } = useForm();

  const getData = () => {
    const data = getValues();

    console.log('==========>data', data);
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
      <Button onClick={getData}>отправить</Button>
      <Input placeholder="Second Name" label="Second Name" {...register('secondName')} />
      <Input placeholder="First Name" label="First Name" {...register('firstName')} />
    </div>
  );
};

export default Home;
