import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import App from '../pages/index.js';

describe('Pages', () => {
  it('page index shows "content"', () => {
    const app = shallow(<App />);
    expect(app.find('p').text()).to.equal('content');
  });
});
