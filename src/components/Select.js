import React, {Component} from 'react';
import '../App.css';
import {Form, InputGroup, Image, Button, Overlay, OverlayTrigger, Tooltip, Popover, PopoverContent, PopoverTitle, ButtonToolbar} from 'react-bootstrap/'

class Select extends Component{

    constructor(props){
        super(props);
        // console.log(props);
        this.state = {
            hint: props.hint,
            prepend: props.prepend
        };
    }

    render(){
        let errors = {formControl: ""};
        if(this.props.touched){
            if(this.props.valid){
                errors = {
                    formControl: 'control-success',
                };
            }
            else{
                errors = {
                    formControl: 'control-error',
                };
            }
        }

    return (
        <Form.Group>
            <Form.Label className="fieldLabel">{this.props.label}</Form.Label>
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


            {this.state.prepend == "true"
                ?
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="prependStyle"><Image src="/euroPrepend.PNG"/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" className={errors.formControl} value={this.props.value} onChange={(e) => this.props.onChange(e)} name={this.props.name} id={this.props.label}>
                            {this.props.options.map((option, i) => (
                                <option key={i} value={option.value}>
                                    {option}
                                </option>
                            ))}
                        </Form.Control>
                    </InputGroup>
                :
                    <Form.Control as="select" className={errors.formControl} value={this.props.value} onChange={(e) => this.props.onChange(e)} name={this.props.name} id={this.props.label}>
                        {this.props.options.map((option, i) => {
                            // console.log(option);
                            return (<option key={i} value={option}>
                                {option}
                            </option>);
                        })}
                    </Form.Control>
            }
        </Form.Group>
    );

}

  // render(){
  //   return (
  //       <div className="form-group">
  //           <select className="YEET" value={this.props.value} onChange={this.props.onChange} name={this.props.name}>
  //             {this.props.options.map((option, i) => (
  //               <option key={i} value={option.value}>
  //                 {option}
  //               </option>
  //             ))}
  //           </select>
  //       </div>
  //   ); <Button varient="primary" id="icon" size="sm" > Get Quote </Button>
  // }

}

export default Select;
