import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from '@uifabric/utilities';
import { actions } from 'src/lib/crud';
import { flash } from 'src/ui/FlashMessage';

import EditForm from './EditForm';
import { select } from './schema';

export class Edit extends Component {
    static propTypes = {
        pending: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        const { crud, path } = this.props;
        crud.read(path.read);
    }

    @autobind
    onSubmitFail(errors, dispatch, submitError) {
        const { flash } = this.props;
        flash.error(errors._error || 'เกิดความผิดพลาดในการบันทึก');
    }

    @autobind
    onSubmit(data, dispatch, form) {
        const { flash, crud, dto, path } = this.props;

        if (!form.valid) {
            flash.error('ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
            return;
        }

        if (!form.dirty) {
            flash.warning('ไม่มีการเปลี่ยนแปลงข้อมูลใดๆ');
            return;
        }

        dto.persist(data);

        return new Promise((resolve, reject) => {
            crud.update({ resolve, reject, dto, ...path.update })
        });
    }

    render() {
        const { dto, pending } = this.props;
        if (!dto.data) return null;

        return (
            <div style={{ overflow: 'auto', height: '100%', width: '50%' }}>
                <EditForm
                    initialValues={dto.data}
                    isLoading={pending}
                    onSubmit={this.onSubmit}
                    onSubmitFail={this.onSubmitFail}/>
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        pending: select.pending(state),
        path: select.path(state),
        dto: select.formData(state),
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        crud: bindActionCreators({ ...actions }, dispatch),
        flash: bindActionCreators({ ...flash }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);
