import { shallow } from 'enzyme';
import { expect } from 'chai';
import Selectable from '../components/selectable';

describe('Components', () => {

  describe('Selectable', () => {
    it('renders with content', () => {
      const instance = shallow(
        <Selectable id="anOption" name="selectableContent" onChange={() => {}}>
          <p>content</p>
        </Selectable>
      );
      expect(instance.find('p').text()).to.equal('content');
    });
  });

});
