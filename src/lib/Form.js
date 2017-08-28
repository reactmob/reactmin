import React from 'react';

import { autobind } from 'src/lib/utils'

export class Form extends React.Component {

    componentWillMount() {

        //console.log(this.refs);
        //console.log(this.refs['name']);
    }

    @autobind
    clickMe() {
        this.props.children.forEach((item) => {
            console.log(item.props.value());
        });
    }

    render() {
        return (
            <div>
                <div>{this.props.children}</div>
                <button type="button" onClick={this.clickMe}>Test</button>
            </div>
        );
    }
}
