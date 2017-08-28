import { expect } from 'chai';

import {
  COMMON_ROUTE_PUSH,
} from 'src/features/common/redux/constants';

import {
  routePush,
  reducer,
} from 'src/features/common/redux/routePush';

describe('common/redux/routePush', () => {
  it('returns correct action by routePush', () => {
    expect(routePush()).to.have.property('type', COMMON_ROUTE_PUSH);
  });

  it('handles action type COMMON_ROUTE_PUSH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_ROUTE_PUSH }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
