import { expect } from 'chai';

import {
  COMMON_NAV_RESET,
} from 'src/features/common/redux/constants';

import {
  navReset,
  reducer,
} from 'src/features/common/redux/navReset';

describe('common/redux/navReset', () => {
  it('returns correct action by navReset', () => {
    expect(navReset()).to.have.property('type', COMMON_NAV_RESET);
  });

  it('handles action type COMMON_NAV_RESET correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_NAV_RESET }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
