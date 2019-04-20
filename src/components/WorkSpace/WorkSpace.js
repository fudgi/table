import React from "react";

import Table from "../Table/Table";
import SelectedItem from "../SelectedItem/SelectedItem";

class WorkSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow: undefined
        };
    }

    selectRow(rowIndex) {
        this.setState({ selectedRow: Number(rowIndex) });
    }

    render() {
        const { currentPageData } = this.props;
        return (
            <main className="workspace">
                <Table
                    tableData={currentPageData}
                    sortByColumn={this.props.sortByColumn}
                    sortDirection={this.props.sortDirection}
                    sortChange={sortByColumn =>
                        this.props.sortChange(sortByColumn)
                    }
                    selectRow={rowIndex => this.selectRow(rowIndex)}
                />

                {this.state.selectedRow != undefined ? (
                    <SelectedItem
                        data={currentPageData[this.state.selectedRow]}
                    />
                ) : (
                    ""
                )}
            </main>
        );
    }
}

export default WorkSpace;
