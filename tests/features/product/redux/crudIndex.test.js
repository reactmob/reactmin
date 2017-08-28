import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  PRODUCT_CRUD_INDEX_BEGIN,
  PRODUCT_CRUD_INDEX_SUCCESS,
  PRODUCT_CRUD_INDEX_FAILURE,
  PRODUCT_CRUD_INDEX_DISMISS_ERROR,
} from 'src/features/product/redux/constants';

import {
  crudIndex,
  dismissCrudIndexError,
  doCrudIndex,
  reducer,
} from 'src/features/product/redux/crudIndex';

describe('product/redux/crudIndex', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by productIndex', () => {
    expect(crudIndex()).to.have.property('type', PRODUCT_CRUD_INDEX_BEGIN);
  });

  it('returns correct action by dismissCrudIndexError', () => {
    expect(dismissCrudIndexError()).to.have.property('type', PRODUCT_CRUD_INDEX_DISMISS_ERROR);
  });

  // saga tests
  const generator = doCrudIndex();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches PRODUCT_PRODUCT_INDEX_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: PRODUCT_CRUD_INDEX_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches PRODUCT_PRODUCT_INDEX_FAILURE action when failed', () => {
    const generatorForError = doCrudIndex();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: PRODUCT_CRUD_INDEX_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type PRODUCT_CRUD_INDEX_BEGIN correctly', () => {
    const prevState = { productIndexPending: false };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_INDEX_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.productIndexPending).to.be.true;
  });

  it('handles action type PRODUCT_CRUD_INDEX_SUCCESS correctly', () => {
    const prevState = { productIndexPending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_INDEX_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.productIndexPending).to.be.false;
  });

  it('handles action type PRODUCT_CRUD_INDEX_FAILURE correctly', () => {
    const prevState = { productIndexPending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_INDEX_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.productIndexPending).to.be.false;
    expect(state.productIndexError).to.exist;
  });

  it('handles action type PRODUCT_CRUD_INDEX_DISMISS_ERROR correctly', () => {
    const prevState = { productIndexError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRODUCT_CRUD_INDEX_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.productIndexError).to.be.null;
  });
});