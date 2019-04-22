import React from "react";
import TableRow from "../TableRow/TableRow";
import "./Table.scss";

class Table extends React.Component {
    sortChange(e) {
        this.props.sortChange(e.target.dataset.id);
    }

    render() {
        let columnClasses = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
        };
        let directionSign = this.props.sortDirection ? "asc" : "dsc";
        columnClasses[this.props.sortByColumn] = "selected " + directionSign;
        return (
            // <section className="table-section">
            <table>
                <thead>
                    <tr onClick={e => this.sortChange(e)}>
                        <th className={columnClasses["id"]} data-id="id">
                            id
                        </th>
                        <th
                            className={columnClasses["firstName"]}
                            data-id="firstName"
                        >
                            firstName
                        </th>
                        <th
                            className={columnClasses["lastName"]}
                            data-id="lastName"
                        >
                            lastName
                        </th>
                        <th className={columnClasses["email"]} data-id="email">
                            email
                        </th>
                        <th className={columnClasses["phone"]} data-id="phone">
                            phone
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.tableData.map((data, index) => (
                        <TableRow
                            data={data}
                            index={index}
                            key={index}
                            selectRow={rowIndex =>
                                this.props.selectRow(rowIndex)
                            }
                        />
                    ))}
                </tbody>
            </table>
            // </section>
        );
    }
}
export default Table;
