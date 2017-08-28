import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Breadcrumb } from 'src/features/common/Breadcrumb';

describe('common/Breadcrumb', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Breadcrumb {...props} />
    );

    expect(
      renderedComponent.find('.common-breadcrumb').node
    ).to.exist;
  });
});
