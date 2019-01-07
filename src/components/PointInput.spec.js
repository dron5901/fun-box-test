import React from 'react';
import { mount } from 'enzyme';
import PointInput from './PointInput';

it('Компонент должен отрисоваться', () => {
  let createPoint = jest.fn();
  let pointWrapper = mount(<PointInput createPoint={createPoint} />);
  expect(pointWrapper.find('form')).toHaveLength(1);
  expect(pointWrapper.find('input')).toHaveLength(1);
});

it('Должен произойти вызов функции создания точки подключения', () => {
  let createPoint = jest.fn();
  let pointWrapper = mount(<PointInput createPoint={createPoint} />);
  let form = pointWrapper.find('form');
  form.simulate('submit');
  expect(createPoint.mock.calls.length).toBe(1);
});

it('Значение pointName должно быть point1', () => {
  let createPoint = jest.fn();
  let pointWrapper = mount(<PointInput createPoint={createPoint} />);
  let input = pointWrapper.find('input');
  input.simulate('change', { target: { value: 'point1' } });
  expect(pointWrapper.state().pointName).toEqual('point1');
})
