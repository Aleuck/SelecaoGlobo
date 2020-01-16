import { shallow } from 'enzyme';
import { expect } from 'chai';
import Selectable from '../components/selectable';

describe('Components', () => {
  describe('Selectable', () => {
    it('renders with content', () => {
      const app = shallow(
        <Selectable><p>content</p></Selectable>
      );
      expect(app.find('p').text()).to.equal('content');
    });
  });
});
