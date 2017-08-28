import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LoadMask } from 'src/features/common';

describe('common/LoadMask', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <LoadMask />
    );

    expect(
      renderedComponent.find('.common-load-mask').node
    ).to.exist;
  });
});
