import React, {Component} from 'react';
import '../App.css';
import {Form, InputGroup, Image} from 'react-bootstrap/'

// const TextInput = (props) => {
//
//     this.state = {
//         address: props.address
//     }
//
//     let errors = {formControl: ""};
//
//     if(props.touched){
//         if(props.valid){
//             errors = {
//                 formControl: 'control-success',
//             };
//         }
//         else{
//             errors = {
//                 formControl: 'control-error',
//             };
//             console.log(errors);
//         }
//     }
//
//     return (
//
//         {this.state.address == "true"
//             ?
//                 <InputGroup className="mb-3">
//                     <InputGroup.Prepend>
//                         <InputGroup.Text className="prependStyle"><Image src="/phonePrepend.PNG"/></InputGroup.Text>
//                     </InputGroup.Prepend>
//                     <Form.Group className="form-group">
//                         <Form.Label className="fieldLabel">{props.label}</Form.Label>
//                         <Form.Control type="text" id={props.label} className={errors.formControl} {...props}/>
//                     </Form.Group>
//                 </InputGroup>
//             :
//                 <Form.Group className="form-group">
//                     <Form.Label className="fieldLabel">{props.label}</Form.Label>
//                     <Form.Control type="text" id={props.label} className={errors.formControl} {...props}/>
//                 </Form.Group>
//         }
//
//     );
//
//
// }

class TextInput extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      formControl: "form-control",
      address: props.address,
      names: props.names,
      phone: props.phone,
      email: props.email,
      home: props.home
    };
    // this.changeState();

  }

  // changeState(){
  //   if(this.props.touched && !this.props.valid) {
  //         // formControl = 'form-control control-error';
  //       this.setState({formControl: "form-control control-error"});
  //   }
  // }

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
                console.log(errors);
            }
        }

    return(
        <>
            {this.state.names == "true"
                ?
                    <Form.Group className="form-group">
                        <Form.Label className="fieldLabel">{this.props.label}</Form.Label>
                        <Form.Control type="text" id={this.props.label} className={errors.formControl} {...this.props}/>
                    </Form.Group>
                :
                    ""
            }
            {this.state.phone == "true"
                ?
                    <Form.Group className="form-group">
                        <Form.Label className="fieldLabel">{this.props.label}</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text className="prependStyle"><Image src="/phonePrepend.PNG"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" id={this.props.label} className={errors.formControl} {...this.props}/>
                        </InputGroup>
                    </Form.Group>
                :
                    ""
            }
            {this.state.email == "true"
                ?
                    <Form.Group className="form-group">
                        <Form.Label className="fieldLabel">{this.props.label}</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text className="prependStyle"><Image src="/emailPrepend.PNG"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" id={this.props.label} className={errors.formControl} {...this.props}/>
                        </InputGroup>
                    </Form.Group>
                :
                    ""
            }
            {this.state.home == "true"
                ?
                    <Form.Group className="form-group">
                        <Form.Label className="fieldLabel">{this.props.label}</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text className="prependStyle"><Image src="/homePrepend.PNG"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" id={this.props.label} className={errors.formControl} {...this.props}/>
                        </InputGroup>
                    </Form.Group>
                :
                    ""
            }
        </>

    );
  }

}

export default TextInput;
