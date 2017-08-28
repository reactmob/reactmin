import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/product/DefaultPage';

describe('product/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      product: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.product-default-page').node
    ).to.exist;
  });
});
