import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  PRODUCT_CRUD_READ_BEGIN,
  PRODUCT_CRUD_READ_SUCCESS,
  PRODUCT_CRUD_READ_FAILURE,
  PRODUCT_CRUD_READ_DISMISS_ERROR,
} from 'src/features/product/redux/constants';

import {
  crudRead,
  dismissCrudReadError,
  doCrudRead,
  reducer,
} from 'src/features/product/redux/crudRead';

describe('product/redux/crudRead', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by crudRead', () => {
    expect(crudRead()).to.have.property('type', PRODUCT_CRUD_READ_BEGIN);
  });

  it('returns correct action by dismissCrudReadError', () => {
    expect(dismissCrudReadError()).to.have.property('type', PRODUCT_CRUD_READ_DISMISS_ERROR);
  });

  // saga tests
  const generator = doCrudRead();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches PRODUCT_CRUD_READ_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: PRODUCT_CRUD_READ_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches PRODUCT_CRUD_READ_FAILURE action when failed', () => {
    const generatorForError = doCrudRead();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: PRODUCT_CRUD_READ_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type PRODUCT_CRUD_READ_BEGIN correctly', () => {
    const prevState = { crudReadPending: false };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_READ_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.crudReadPending).to.be.true;
  });

  it('handles action type PRODUCT_CRUD_READ_SUCCESS correctly', () => {
    const prevState = { crudReadPending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_READ_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.crudReadPending).to.be.false;
  });

  it('handles action type PRODUCT_CRUD_READ_FAILURE correctly', () => {
    const prevState = { crudReadPending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_READ_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.crudReadPending).to.be.false;
    expect(state.crudReadError).to.exist;
  });

  it('handles action type PRODUCT_CRUD_READ_DISMISS_ERROR correctly', () => {
    const prevState = { crudReadError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_READ_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.crudReadError).to.be.null;
  });
});