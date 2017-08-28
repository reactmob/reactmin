import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from '@uifabric/utilities';
import { actions } from 'src/lib/crud';
import { flash } from 'src/ui/FlashMessage';
import { Grid, GridDifition, CommandSelectionChangedHandler } from 'src/ui/Grid';

import { gridColumns, gridCommands, gridActions } from './grid/product';
import { select } from './schema';

export class DefaultPage extends React.Component {
    static propTypes = {
        path: PropTypes.object.isRequired,
        items: PropTypes.array.isRequired,
        pager: PropTypes.object,
        pending: PropTypes.bool,
    };

    componentWillMount() {
        if (!this.props.items.length) {
            this.loadItems()
        }
    }

    @autobind
    afterEdit(newState, oldState, action) {
        // back to list page
        this.props.history.push(this.props.location.pathname);

        // reload
        this.loadItems(this.grid.getRemoteOptions());
    }

    editItem(item) {
        this.props.crud.edit(
            Object.assign({}, this.props.path.edit, {
                afterEdit: this.afterEdit,
                criteria: { code: item.record.code }
            })
        )
    }

    @autobind
    loadItems(options = {}) {
        this.props.crud.list(
            Object.assign({}, this.props.path.list, { criteria: options })
        )
    }

    @autobind
    handleChangePage(options) {
        this.loadItems(options)
    }

    @autobind
    handleSorting(options) {
        this.loadItems(options)
    }

    @autobind
    onClickCalendar(e, f) {
        console.log(e);
        console.log(f);
    }

    @autobind
    onGridSelectionChangeEmail() {
        CommandSelectionChangedHandler.isHasSelected(...arguments)
    }

    render() {
        const { items, pending, pager } = this.props;
        const definition = new GridDifition(this, { gridColumns, gridCommands, gridActions });
        const columns = definition.getColumns();
        const commands = definition.getCommands();

        return (
            <Grid ref={grid => { if(grid) this.grid = grid } }
                columns={columns}
                commands={commands}
                items={items}
                isLoading={pending}
                pagerInfo={pager}
                onPageChange={this.handleChangePage}
                onSorting={this.handleSorting}
            />
        )
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        path: select.path(state),
        items: select.list(state),
        pager: select.pager(state),
        pending: select.pending(state),
    }
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        crud: bindActionCreators({ ...actions }, dispatch),
        flash: bindActionCreators({ ...flash }, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultPage)
