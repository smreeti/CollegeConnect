import React from 'react';

export default class SelectInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        const { value } = this.state;

        const options = this.props.options.map((option) => {
            return <option key={option.value}
                value={option.value}>{option.label}
            </option>;
        });

        return (
            <select
                {...this.props}
                value={value}
                onChange={this.onChange}>
                {options}
            </select>
        );
    }
}