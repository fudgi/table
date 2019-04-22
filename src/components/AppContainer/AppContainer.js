import React from "react";
import arraySort from "array-sort";
import ReactPaginate from "react-paginate";

import ControlPanel from "../ControlPanel/ControlPanel";
import WorkSpace from "../WorkSpace/WorkSpace";

import "./AppContainer.scss";
import loading from "../../images/loading.gif";
import errorImage from "../../images/error.svg";

const dataURL = {
    smallData:
        "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    bigData:
        "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
};

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: "small-data",
            tableData: [],
            currentPage: 0,
            maxOnPage: 50,
            sortByColumn: "id",
            sortDirection: 0, //0 - dsc, 1 - asc
            error: null,
            isLoaded: false
        };
    }
    getData() {
        let URL = dataURL.smallData;
        if (this.state.dataSource == "big-data") URL = dataURL.bigData;
        fetch(URL)
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        tableData: arraySort(result, this.state.sortByColumn, {
                            reverse: this.state.sortDirection
                        })
                    });
                },
                error => {
                    let err = error.message;
                    if (err == "Failed to fetch") {
                        err = "Сервер недоступен";
                    }
                    this.setState({
                        isLoaded: true,
                        error: err
                    });
                }
            );
    }

    changeDataSource(data) {
        this.setState({ dataSource: data });
    }

    searchForData(searchValue) {
        if (searchValue) {
            this.setState({ searchValue });
        } else this.setState({ searchValue: "" });
    }

    addNewElement(data) {
        let tableData = this.state.tableData.slice();
        tableData.unshift(data);
        this.setState({ tableData });
    }

    sortChange(sortByColumn) {
        let sortDirection = this.state.sortDirection;
        if (sortByColumn == this.state.sortByColumn) {
            sortDirection = !sortDirection;
        }
        let newTableData = this.state.tableData.slice();
        arraySort(newTableData, sortByColumn, { reverse: sortDirection });
        this.setState({
            sortByColumn: sortByColumn,
            sortDirection: sortDirection,
            tableData: newTableData
        });
    }

    pageChangeHandler(selectedPage) {
        this.setState({ currentPage: selectedPage });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.dataSource != this.state.dataSource) {
            this.setState({ error: null, isLoaded: false });
            this.getData();
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const { maxOnPage, tableData, dataSource } = this.state;
        const { error, isLoaded } = this.state;

        let filteredTableData = tableData;
        let currentPage = this.state.currentPage;

        //filter tableData to find all searchValues
        if (this.state.searchValue) {
            currentPage = 0;
            filteredTableData = tableData.filter(item => {
                let FilteredLine = Object.values(item).filter(value => {
                    if (String(value).indexOf(this.state.searchValue) != -1) {
                        return true;
                    }
                });
                if (FilteredLine.length != 0) return true;
            });
        }

        //array on page
        const startPosition = currentPage * maxOnPage;
        const endPosition = startPosition + 50;
        const currentPageData = filteredTableData.slice(
            startPosition,
            endPosition
        );

        const totalPageCount = Math.floor(filteredTableData.length / maxOnPage);

        let workSpace = () => {
            if (error) {
                return (
                    <div className="message">
                        <img src={errorImage} />
                        Ошибка: {error}
                    </div>
                );
            } else if (!isLoaded) {
                return (
                    <div className="message">
                        <img src={loading} />
                        Получение данных с сервера
                    </div>
                );
            } else {
                return (
                    <React.Fragment>
                        {totalPageCount > 1 ? (
                            <ReactPaginate
                                previousLabel={"←"}
                                nextLabel={"→"}
                                breakLabel={"..."}
                                pageCount={totalPageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={3}
                                onPageChange={data =>
                                    this.pageChangeHandler(data.selected)
                                }
                                containerClassName={"pagination"}
                                pageLinkClassName={"pagination__pages"}
                                previousLinkClassName={"pagination__pages"}
                                nextLinkClassName={"pagination__pages"}
                                activeLinkClassName={"pagination__active"}
                            />
                        ) : (
                            ""
                        )}
                        <WorkSpace
                            currentPageData={currentPageData}
                            sortByColumn={this.state.sortByColumn}
                            sortDirection={this.state.sortDirection}
                            sortChange={sortByColumn =>
                                this.sortChange(sortByColumn)
                            }
                        />
                    </React.Fragment>
                );
            }
        };
        return (
            <React.Fragment>
                <ControlPanel
                    addNewElement={data => this.addNewElement(data)}
                    getData={URL => this.getData(URL)}
                    changeDataSource={data => this.changeDataSource(data)}
                    dataSource={dataSource}
                    searchForData={searchValue =>
                        this.searchForData(searchValue)
                    }
                />
                {workSpace()}
            </React.Fragment>
        );
    }
}

export default AppContainer;
