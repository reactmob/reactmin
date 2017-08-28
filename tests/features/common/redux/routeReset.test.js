import { expect } from 'chai';

import {
  COMMON_ROUTE_RESET,
} from 'src/features/common/redux/constants';

import {
  routeReset,
  reducer,
} from 'src/features/common/redux/routeReset';

describe('common/redux/routeReset', () => {
  it('returns correct action by routeReset', () => {
    expect(routeReset()).to.have.property('type', COMMON_ROUTE_RESET);
  });

  it('handles action type COMMON_ROUTE_RESET correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_ROUTE_RESET }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
