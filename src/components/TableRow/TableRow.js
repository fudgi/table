import React from "react";

class TableRow extends React.Component {
    selectRow(e) {
        this.props.selectRow(e.currentTarget.dataset.id);
    }
    render() {
        const { data, index } = this.props;
        return (
            <tr data-id={index} onClick={e => this.selectRow(e)}>
                <td>{data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
            </tr>
        );
    }
}

export default TableRow;
