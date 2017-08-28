import { expect } from 'chai';

import {
  COMMON_BREADCRUMB_RESET,
} from 'src/features/common/redux/constants';

import {
  breadcrumbReset,
  reducer,
} from 'src/features/common/redux/breadcrumbReset';

describe('common/redux/breadcrumbReset', () => {
  it('returns correct action by breadcrumbReset', () => {
    expect(breadcrumbReset()).to.have.property('type', COMMON_BREADCRUMB_RESET);
  });

  it('handles action type COMMON_BREADCRUMB_RESET correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_BREADCRUMB_RESET }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
