import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import logger from 'src/lib/logger';
import { LoadMask } from 'src/ui/LoadMask';
import { CommandBar } from 'src/ui/CommandBar';
import { autobind } from '@uifabric/utilities';

import {
    ConstrainMode,
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
} from 'src/ui/DetailsList';

// to keep component state
let state = {
    items: [],
    columns: [],
    commands: [],
};

let pagerProps = {
    previousLabel: 'previous',
    nextLabel: 'next',
    breakLabel: '...',
    breakClassName: 'break-me',
    pageCount: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 2,
    containerClassName: 'ReactPaginate',
    activeClassName: 'active',
    disableInitialCallback: true,
};

export class Grid extends React.Component {
    static propTypes = {
        items: PropTypes.array,
        columns: PropTypes.array,
        commands: PropTypes.object,
        isLoading: PropTypes.bool,
        pagerProps: PropTypes.object,
        pagerInfo: PropTypes.object,
        pagerDisplayedInfoTemplate: PropTypes.func,
        onPageChange: PropTypes.func,
        onSorting: PropTypes.func,
        onSelectionChanged: PropTypes.func,
        detailsListProps: PropTypes.object,
    };

    static defaultProps = {
        pagerProps: pagerProps,
        pagerInfo: {},
        pagerDisplayedInfoTemplate: (info) => {
            return `Display ${info.start} - ${info.to} of ${info.total} Items`
        },
    };

    constructor(props) {
        super(props);

        this.state = { ...state, ...props };

        this.selection = new Selection({
            onSelectionChanged: this.onSelectionChanged,
        });
    }

    componentWillReceiveProps(props) {
        this.setState(this.getStateFromProps(props))
    }

    componentWillUnmount() {
        state = this.state
    }

    // @private
    getStateFromProps(props) {
        return {
            ...this.state,
            items: props.items,
            columns: props.columns,
            commands: props.commands,
        }
    }

    getTotalPage() {
        if (this.props.pagerProps.pageCount) {
            return this.props.pagerProps.pageCount;
        }

        if (this.props.pagerInfo.pages) {
            return this.props.pagerInfo.pages;
        }

        return 0;
    }

    getPagerProps() {
        const paginateProps = { ...pagerProps, ...this.props.pagerProps };

        if (!this.props.pagerProps.onPageChange) {
            paginateProps.onPageChange = this.onPageChange;
        }

        paginateProps.pageCount = this.getTotalPage();

        return paginateProps;
    }

    getPagerInfo() {
        const info = this.props.pagerInfo;
        const start = (info.page - 1) * info.limit;
        const to = start + info.limit;

        if (!info.total) {
            return;
        }

        return this.props.pagerDisplayedInfoTemplate ? this.props.pagerDisplayedInfoTemplate({
            start: start + 1,
            to: to,
            total: info.total,
            page: info.page,
        }) : null;
    }

    // @private
    doLocaleSort(e, column) {
        let { items } = this.state;
        let isSortedDescending = column.isSortedDescending;

        // If we've sorted this column, flip it.
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }

        // Sort the items.
        items = items.concat([]).sort((a, b) => {
            let firstValue = a[column.fieldName];
            let secondValue = b[column.fieldName];

            if (isSortedDescending) {
                return firstValue > secondValue ? -1 : 1;
            } else {
                return firstValue > secondValue ? 1 : -1;
            }
        });

        this.setState({
            items: items,
        });
    }

    // @private
    getSortingOption() {
        return this.state.columns.reduce((prev, column) => {
            if (column.isSorted) {
                prev.push({
                    [column.fieldName || column.key]: column.isSortedDescending ? 'desc' : 'asc',
                });

            }

            return prev;
        }, []);
    }

    // @private
    getCurrentPage() {
        return this.props.pagerInfo.page || 1;
    }

    // @private
    getRemoteOptions() {
        return {
            page: this.getCurrentPage(),
            sorting: this.getSortingOption(),
        }
    }

    @autobind
    onColumnClick(e, column) {
        let { columns } = this.state;
        let isSortable = isLocalSort || column.sortable === true;

        if (!isSortable) {
            return;
        }

        let isLocalSort = !this.props.onSorting || this.getTotalPage() < 2;
        let isSortedDescending = column.isSortedDescending;

        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }

        this.setState({
            columns: columns.map(col => {
                col.isSorted = (col.key === column.key);

                if (col.isSorted) {
                    col.isSortedDescending = isSortedDescending;
                }

                return col;
            })
        });

        if (isLocalSort) {
            this.doLocaleSort(e, column);
        } else {
            this.props.onSorting(this.getRemoteOptions(), column, this);
        }
    }

    @autobind
    onPageChange(e) {
        if (this.props.pagerProps.onPageChange) {
            return this.props.pagerProps.onPageChange(e);
        }

        if (!this.props.onPageChange) {
            logger.warn(`
                Should be implement in Client Class and configure via
                - Grid.props.onPageChange or
                - Grid.props.pagerProps.onPageChange
            `);

            return;
        }

        const options = {
            ...this.getRemoteOptions(),
            page: e.selected + 1,
        };

        return this.props.onPageChange(options, this);
    }

    @autobind
    onSelectionChanged() {
        if (this.props.onSelectionChanged) {
            if (false !== this.onSelectionChanged(this.selection.getSelection())) {
                this.handleSelectionChanged();
            }
        } else {
            this.handleSelectionChanged();
        }
    }

    // @private
    handleSelectionChanged() {
        const { commands } = this.state;
        const handleOnGridSelectionChange = (cmd) => {
            if (cmd['onGridSelectionChange']) {
                cmd['onGridSelectionChange'](cmd, this.selection.getSelection(), this.selection, this);
            }

            ['items'].forEach(item => {
                if (cmd[item] && cmd[item].length) {
                    cmd[item].forEach(handleOnGridSelectionChange);
                }
            })
        };

        ['items', 'farItems', 'overflowItems'].forEach(items => {
            if (commands[items] && commands[items].length) {
                commands[items].forEach(handleOnGridSelectionChange);
            }
        });

        this.setState({ commands: { ...commands } });
    }

    render() {
        let {
            columns,
            commands,
            items,
        } = this.state;

        /*items = [];
         for (var i = 0; i < 100; i++) {
         items.push({
         id: i,
         code: 'code: ' + 1,
         name: 'Name ' + 1,
         })
         }*/

        const pagerInfo = this.getPagerInfo();
        const paginateProps = {
            ...this.getPagerProps(),
            initialPage: this.props.pagerInfo.page - 1,
        };

        // TODO: fix grid with overlap, case with first load page contains grid, after that no problem
        return (
            <LoadMask loading={this.props.isLoading} label="Loading ...">
                <div className="dos-grid__panel">
                    {commands && <div className="dos-grid__toolbar">
                        <CommandBar {...commands}/>
                    </div>}
                    <div className="dos-grid__body" style={{ overflow: 'auto' }}>
                        <DetailsList
                            constrainMode={ConstrainMode.unconstrained}
                            layoutMode={DetailsListLayoutMode.justified}
                            selectionMode={SelectionMode.multiple}
                            compact={true}
                            columns={columns}
                            items={items}
                            onColumnHeaderClick={this.onColumnClick}
                            selection={this.selection}
                            {...this.props.detailsListProps}
                        />
                    </div>
                    {pagerInfo && <div className="dos-grid__footer">
                        <div className="dos-grid__footer--pager">
                            <div className="dos-grid__footer--pager__info">
                                {pagerInfo}
                            </div>
                            <div className="dos-grid__footer--pager__paginate">
                                {paginateProps.pageCount ? <ReactPaginate {...paginateProps}/> : (null)}
                            </div>
                        </div>
                    </div>}
                </div>
            </LoadMask>
        );
    }
}
