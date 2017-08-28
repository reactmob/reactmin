import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  PRODUCT_CRUD_UPDATE_BEGIN,
  PRODUCT_CRUD_UPDATE_SUCCESS,
  PRODUCT_CRUD_UPDATE_FAILURE,
  PRODUCT_CRUD_UPDATE_DISMISS_ERROR,
} from 'src/features/product/redux/constants';

import {
  crudUpdate,
  dismissCrudUpdateError,
  doCrudUpdate,
  reducer,
} from 'src/features/product/redux/crudUpdate';

describe('product/redux/crudUpdate', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by crudUpdate', () => {
    expect(crudUpdate()).to.have.property('type', PRODUCT_CRUD_UPDATE_BEGIN);
  });

  it('returns correct action by dismissCrudUpdateError', () => {
    expect(dismissCrudUpdateError()).to.have.property('type', PRODUCT_CRUD_UPDATE_DISMISS_ERROR);
  });

  // saga tests
  const generator = doCrudUpdate();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches PRODUCT_CRUD_UPDATE_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: PRODUCT_CRUD_UPDATE_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches PRODUCT_CRUD_UPDATE_FAILURE action when failed', () => {
    const generatorForError = doCrudUpdate();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: PRODUCT_CRUD_UPDATE_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type PRODUCT_CRUD_UPDATE_BEGIN correctly', () => {
    const prevState = { crudUpdatePending: false };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_UPDATE_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.crudUpdatePending).to.be.true;
  });

  it('handles action type PRODUCT_CRUD_UPDATE_SUCCESS correctly', () => {
    const prevState = { crudUpdatePending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_UPDATE_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.crudUpdatePending).to.be.false;
  });

  it('handles action type PRODUCT_CRUD_UPDATE_FAILURE correctly', () => {
    const prevState = { crudUpdatePending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_UPDATE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.crudUpdatePending).to.be.false;
    expect(state.crudUpdateError).to.exist;
  });

  it('handles action type PRODUCT_CRUD_UPDATE_DISMISS_ERROR correctly', () => {
    const prevState = { crudUpdateError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_UPDATE_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.crudUpdateError).to.be.null;
  });
});