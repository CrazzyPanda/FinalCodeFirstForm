import React from 'react';
import '../App.css';
import {Form, Image, Button, Overlay, OverlayTrigger, Tooltip, Popover, PopoverContent, PopoverTitle, ButtonToolbar} from 'react-bootstrap/'


class Checkbox extends React.Component{

    constructor(props){
        super(props);

        this.formControl = "form-control";
        if (props.touched && !props.valid) {
            this.formControl = 'form-control control-error';
        }

        this.state = {
            hint: props.hint
        };
    }

    render(){
        return (
            <div className="form-group">
                <label className="fieldLabel">{this.props.label}</label>
                {this.state.hint == "true"
                    ?
                        <OverlayTrigger aria-labelledby="icon"
                            overlay={
                                <Popover >
                                    <Popover.Title className="helpTextBox">{this.props.helpTextTitle}</Popover.Title>
                                    <Popover.Content>
                                        {this.props.helpText}
                                    </Popover.Content>
                                </Popover>
                            }>
                            <Image className="helpTextPic" id="icon" src="/questionMark.PNG"/>
                        </OverlayTrigger>
                    : "" }
                <div className="form-group" id={this.props.label}>
                <Button variant="light" className="checkboxButton" size="sm" active>
                    <input className="checkbox"
                        type="checkbox"
                        name={this.props.name}
                        onChange={this.props.onChange}
                        checked={this.props.checked}
                    />
                </Button>
                </div>
            </div>
        );
    }
}

export default Checkbox;

// const Radio = props => {
//
//     let formControl = "form-control";
//
//     if (props.touched && !props.valid) {
//         formControl = 'form-control control-error';
//     }
//
//     return (
//         <div className="form-group">
//             <label className="fieldLabel">{props.label}</label>
//             <div className="form-group" className="checkbox">
//                 <input
//                     type="checkbox"
//                     name={props.name}
//                     onChange={props.onChange}
//                     checked={props.checked}
//                 />
//             </div>
//         </div>
//     );
// }
