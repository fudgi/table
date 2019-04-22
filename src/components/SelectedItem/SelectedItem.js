import React from "react";
import "./SelectedItem.scss";

class SelectedItem extends React.Component {
    render() {
        const { firstName, lastName, address, description } = this.props.data;
        return (
            <section className="selected-item">
                <h3>
                    Выбран пользователь <b>{`${firstName} ${lastName}`}</b>
                </h3>
                <div className="selected-item__content">
                    <div className="selected-item__part">
                        <h4>Описание:</h4>
                        <textarea rows="6" value={description} />
                    </div>
                    <div className="selected-item__part">
                        <p>
                            Адрес проживания: <b>{address.streetAddress}</b>
                        </p>
                        <p>
                            Город: <b>{address.city}</b>
                        </p>
                        <p>
                            Провинция/штат: <b>{address.state}</b>
                        </p>
                        <p>
                            Индекс: <b>{address.zip}</b>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default SelectedItem;
