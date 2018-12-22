import React from 'react';

export default class Checkbox extends React.Component {

    constructor(props) {
        super(props);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    toggleCheckbox(e) {
        const { handleCheckboxChanged, label, name } = this.props;
        handleCheckboxChanged(name, e.target.checked);
    }

    render() {
        const { label } = this.props;

        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={this.props.isChecked}
                        onChange={this.toggleCheckbox}
                    />
                    {label}
                </label>
            </div>
        );
    }
}

