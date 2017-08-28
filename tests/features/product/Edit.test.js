import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Edit } from 'src/features/product/Edit';

describe('product/Edit', () => {
  it('renders node with correct class name', () => {
    const props = {
      product: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Edit {...props} />
    );

    expect(
      renderedComponent.find('.product-edit').node
    ).to.exist;
  });
});
