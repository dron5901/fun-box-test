import React from 'react';
import { shallow } from 'enzyme';
import App from './MapApp';

it('renders without crashing', () => {
  shallow(<App />);
});