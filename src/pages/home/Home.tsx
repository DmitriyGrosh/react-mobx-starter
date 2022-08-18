import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Steps } from 'shared/ui/steps';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { Select } from 'shared/ui/select';
import { MultiSelect } from 'shared/ui/multiSelect';
import { Autocomplete } from 'shared/ui/autocomplete';

const Home = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleSelect = (step: number) => {
    setActiveStep(step);
  };

  const checkValid = (step: number, index: number) => {
    return true;
  };

  const { register, getValues, control } = useForm();

  const getData = () => {
    const data = getValues();

    console.log('==========>data', data);
  };

  const defaultValueMultiSelect = {
    label: 'Multi 1',
    data: {
      id: 1,
    },
  };

  const test = ['qwet', 'asdncnsdjc', 'safgdudcubaucb', 'ygbsn,a;sopsa'];

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
      <Select {...register('select')} value="1" color="indigo">
        <Select.Option value="1">label</Select.Option>
        <Select.Option value="2">label 1</Select.Option>
        <Select.Option value="3">label 2</Select.Option>
        <Select.Option value="4">label 3</Select.Option>
        <Select.Option value="5">label 3</Select.Option>
        <Select.Option value="6">label 3</Select.Option>
        <Select.Option value="7">label 3</Select.Option>
        <Select.Option value="8">label 3</Select.Option>
        <Select.Option value="9">label 3</Select.Option>
        <Select.Option value="10">label 3</Select.Option>
        <Select.Option value="11">label 3</Select.Option>
        <Select.Option value="12">label 3</Select.Option>
        <Select.Option value="13">label 3</Select.Option>
        <Select.Option value="14">label 3</Select.Option>
        <Select.Option value="15">label 3</Select.Option>
        <Select.Option value="16">label 4</Select.Option>
      </Select>
      <MultiSelect
        defaultValue={defaultValueMultiSelect}
        label="Select multi select"
        control={control}
        controlName="multiSelect"
      >
        <MultiSelect.Option data={{ id: 1 }}>Multi 1</MultiSelect.Option>
        <MultiSelect.Option data={{ id: 2 }}>Multi 2</MultiSelect.Option>
        <MultiSelect.Option data={{ id: 3 }}>Multi 3</MultiSelect.Option>
        <MultiSelect.Option data={{ id: 4 }}>Multi 4</MultiSelect.Option>
      </MultiSelect>
      <Autocomplete
        getOptionLabel={(el) => el}
        options={test}
        {...register('autocomplete')}
        isLoading
      />
    </div>
  );
};

export default Home;
