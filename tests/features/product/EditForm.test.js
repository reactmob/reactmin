import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EditForm } from 'src/features/product/EditForm';

describe('product/EditForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      product: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EditForm {...props} />
    );

    expect(
      renderedComponent.find('.product-edit-form').node
    ).to.exist;
  });
});
