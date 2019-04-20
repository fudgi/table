import React from "react";
import "./ControlPanel.scss";

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingOpened: false,
            id: 1,
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
        };
    }

    openInputForm() {
        this.setState({ isCreatingOpened: !this.state.isCreatingOpened });
    }
    changeFormHangler(e) {
        let data = {};
        data[e.target.id] = e.target.value;
        this.setState(data);
    }

    submitForm() {
        let newDataRow = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            address: {
                streetAddress: "Не определен",
                city: "Не определен",
                state: "Не определен",
                zip: "Не определен"
            },
            description: ""
        };
        this.props.addNewElement(newDataRow);
        this.setState({
            id: 1,
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
        });
    }
    changeDataSource(e) {
        if (e.target.value != undefined) {
            this.props.changeDataSource(e.target.value);
        }
    }

    render() {
        const { id, firstName, lastName, email, phone } = this.state;

        let isCreatingOpenedClasses = "";
        if (this.state.isCreatingOpened)
            isCreatingOpenedClasses += "active-input";

        let disabled = true;
        if (id && firstName && lastName && email && phone) {
            disabled = false;
        }

        let dataSourceClasses = ["", ""];
        if (this.props.dataSource == "small-data")
            dataSourceClasses[1] = "selected";
        else dataSourceClasses[0] = "selected";

        return (
            <header className={isCreatingOpenedClasses}>
                <div className="first-line">
                    <div className="first-line__search">
                        <input
                            type="text"
                            onChange={e =>
                                this.setState({ searchInput: e.target.value })
                            }
                        />
                        <button
                            onClick={() =>
                                this.props.searchForData(this.state.searchInput)
                            }
                        >
                            Найти
                        </button>
                    </div>
                    <div
                        className="first-line__data-source"
                        onClick={e => this.changeDataSource(e)}
                    >
                        <button
                            value="big-data"
                            className={dataSourceClasses[0]}
                        >
                            Big Data
                        </button>
                        <button
                            value="small-data"
                            className={dataSourceClasses[1]}
                        >
                            Small Data
                        </button>
                    </div>
                    <button
                        className="first-line__add"
                        onClick={() => this.openInputForm()}
                    >
                        Добавить
                    </button>
                </div>
                <div className="input-form">
                    <h2>Добавление данных в таблицу </h2>
                    <form
                        className="input-form__form"
                        onChange={e => this.changeFormHangler(e)}
                        onSubmit={e => {
                            e.preventDefault();
                            this.submitForm();
                        }}
                    >
                        <div className="input-form__item">
                            <label htmlFor="id">Id:</label>
                            <input
                                type="number"
                                id="id"
                                value={Number(this.state.id)}
                            />
                        </div>
                        <div className="input-form__item">
                            <label htmlFor="firstName">firstName:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-form__item">
                            <label htmlFor="lastName">lastName:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-form__item">
                            <label htmlFor="email">email:</label>
                            <input
                                type="email"
                                id="email"
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-form__item">
                            <label htmlFor="phone">phone:</label>
                            <input
                                type="number"
                                id="phone"
                                value={this.state.phone}
                            />
                        </div>
                        <div className="input-form__item">
                            <button disabled={disabled}>
                                Добавить в таблицу
                            </button>
                        </div>
                    </form>
                </div>
            </header>
        );
    }
}

export default ControlPanel;
