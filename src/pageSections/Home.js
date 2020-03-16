import React, { Component } from 'react';
import TextArea from '../components/TextArea'
import Select from '../components/Select'
import Checkbox from '../components/Checkbox'
import * as selectData from '../data.json';
import validate from '../components/Validate'
import {Form, Button, Overlay, OverlayTrigger, Tooltip, Popover, PopoverContent, PopoverTitle, ButtonToolbar} from 'react-bootstrap/'
import {Container, Row, Col} from 'react-bootstrap/'
import ReactDOM from 'react-dom';



class Home extends React.Component{

    constructor (props) {
        super(props);

        this.errorMessageMap = new Map();
        console.log(selectData);

        this.state = selectData.default;
        this.state.hbtuh = false;
        console.log(this.state);
    }

    changeHandler = event => {
        console.log("change handler errorMessage");
        const name = event.target.name;
        let value = event.target.value;


        const updatedControls = {
      	   ...this.state.formControls
        };
        const updatedFormElement = {
      	   ...updatedControls[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.touched = true;

        const isChecked = event.target.checked;
        if(isChecked){
          updatedFormElement.value = isChecked + "";
          value = isChecked + "";
        }


        const validateArray = validate(value, updatedFormElement.validationRules, name);
        updatedFormElement.valid = validateArray[0];

        var label = updatedFormElement.label;
        if(updatedFormElement.valid){
            this.errorMessageMap.delete(label);
            document.getElementById("errorMessage").innerHTML = "";
        }
        else{
            this.errorMessageMap.set(label, validateArray[1]);
        }
        var errorText = ""

        for (const k of this.errorMessageMap.keys()) {
            errorText +=  this.errorMessageMap.get(k) + "<br />";
        }
        document.getElementById("errorMessage").innerHTML = errorText;

        updatedControls[name] = updatedFormElement;

        this.setState({
            formControls: updatedControls
        }, () => {
            //When yes is selected in insured dropdown, make 4 fields appear, otherwise hide them
            this.state.formControls.insured.value == "Yes" ? document.getElementById("ru").style.display = "block" : document.getElementById("ru").style.display = "none";
        });

    }



    addressButtonHandler(e){
        var errorText = "";
        for (let formElementId in this.state.formControls) {
            let value = this.state.formControls[formElementId].value;
            let name = this.state.formControls[formElementId].label;
            if(name == "Property Location: County" || name == "Address Line 1" || name == "Property Location: Town"){
                let updatedFormElement = this.state.formControls[formElementId];
                const validateArray = validate(value, updatedFormElement.validationRules, name);
                updatedFormElement.valid = validateArray[0];
                if(!updatedFormElement.valid){
                    errorText = errorText + validateArray[1];
                    this.setState({hbtuh: false});
                }else{
                    this.setState({hbtuh: true});
                }

            }
        }
        document.getElementById("addressErrorMessage").innerHTML = errorText;
        if(errorText == ""){
            // ReactDOM.render(
            //     SwapTextMethod(this),
            //     document.getElementById('addressErrorMessage')
            // );
        }

    }



    formSubmitHandler(e){
        e.preventDefault();
        const formData = {};
	    for (let formElementId in this.state.formControls) {

	        let value = this.state.formControls[formElementId].value;
            let name = this.state.formControls[formElementId].label;
            let updatedFormElement = this.state.formControls[formElementId];

            const validateArray = validate(value, updatedFormElement.validationRules, name);
            updatedFormElement.valid = validateArray[0];

            document.getElementById("errorMessage").innerHTML = "";

            if(!updatedFormElement.valid){
                this.errorMessageMap.set(name, validateArray[1]);
                if(document.getElementById(name)){
                  console.log("hello" + name + document.getElementById(name));
                 document.getElementById(name).className = "form-control control-error"
                }

            }
            var errorText = ""

            for (const k of this.errorMessageMap.keys()) {
                errorText +=  this.errorMessageMap.get(k) + "<br />";
            }
            document.getElementById("errorMessage").innerHTML = errorText;

	    }
        console.dir(this.state.formControls);
    }


    reouguherui(e){
        console.log(e.target.value);
    }


    render() {
        return (
            <>
            <Container>
                <form autoComplete="off" id="yee">
                    <Row>
                        <Col>
                            <Select
                                name="title"
                                label={this.state.formControls.title.label}
                                options={this.state.formControls.title.choices}
                                value={this.state.formControls.title.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.title.touched}
                                valid={this.state.formControls.title.valid}
                                hint="false"
                            />
                            <TextArea
                                name="firstName"
                                label={this.state.formControls.firstName.label}
                                value={this.state.formControls.firstName.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.firstName.touched}
                                valid={this.state.formControls.firstName.valid}
                                names="true"
                            />
                            <TextArea
                                name="surname"
                                label={this.state.formControls.surname.label}
                                value={this.state.formControls.surname.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.surname.touched}
                                valid={this.state.formControls.surname.valid}
                                names="true"
                            />
                            <Row>
                                <Col>
                                    <Select
                                        name="dateOfBirth"
                                        label={this.state.formControls.dateOfBirth.label}
                                        options={this.state.formControls.dateOfBirth.day}
                                        value={this.state.formControls.dateOfBirth.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.policyStartDate.touched}
                                        valid={this.state.formControls.policyStartDate.valid}
                                        hint="false"
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        name="dateOfBirth2"
                                        options={this.state.formControls.dateOfBirth.month}
                                        value={this.state.formControls.dateOfBirth.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.dateOfBirth.touched}
                                        valid={this.state.formControls.dateOfBirth.valid}
                                        hint="false"
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        name="dateOfBirth3"
                                        options={this.state.formControls.dateOfBirth.year}
                                        value={this.state.formControls.dateOfBirth.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.dateOfBirth.touched}
                                        valid={this.state.formControls.dateOfBirth.valid}
                                        hint="false"
                                    />
                                </Col>
                            </Row>
                            <Select
                                name="gender"
                                label={this.state.formControls.gender.label}
                                options={this.state.formControls.gender.choices}
                                value={this.state.formControls.gender.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.gender.touched}
                                valid={this.state.formControls.gender.valid}
                                hint="false"
                            />
                            <Select
                                name="maritalStatus"
                                label={this.state.formControls.maritalStatus.label}
                                options={this.state.formControls.maritalStatus.choices}
                                value={this.state.formControls.maritalStatus.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.maritalStatus.touched}
                                valid={this.state.formControls.maritalStatus.valid}
                                hint="false"
                            />
                            <Row>
                                <Col>
                                    <Select
                                        name="policyStartDate"
                                        label={this.state.formControls.policyStartDate.label}
                                        options={this.state.formControls.dateOfBirth.day}
                                        value={this.state.formControls.policyStartDate.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.policyStartDate.touched}
                                        valid={this.state.formControls.policyStartDate.valid}
                                        hint="false"
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        name="policyStartDate2"
                                        options={this.state.formControls.policyStartDate.month}
                                        value={this.state.formControls.policyStartDate.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.policyStartDate.touched}
                                        valid={this.state.formControls.policyStartDate.valid}
                                        hint="false"
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        name="policyStartDate3"
                                        options={this.state.formControls.policyStartDate.year}
                                        value={this.state.formControls.policyStartDate.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.policyStartDate.touched}
                                        valid={this.state.formControls.policyStartDate.valid}
                                        hint="false"
                                    />
                                </Col>
                            </Row>
                            <Select
                                name="propertyType"
                                label={this.state.formControls.propertyType.label}
                                options={this.state.formControls.propertyType.choices}
                                value={this.state.formControls.propertyType.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.propertyType.touched}
                                valid={this.state.formControls.propertyType.valid}
                                hint="false"
                            />
                            <Select
                                name="coverType"
                                label={this.state.formControls.coverType.label}
                                options={this.state.formControls.coverType.choices}
                                value={this.state.formControls.coverType.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.coverType.touched}
                                valid={this.state.formControls.coverType.valid}
                                hint="false"
                            />
                            <Select
                                name="yearBuilt"
                                label={this.state.formControls.yearBuilt.label}
                                helpTextTitle={this.state.formControls.yearBuilt.helpTextTitle}
                                helpText={this.state.formControls.yearBuilt.helpText}
                                options={this.state.formControls.dateOfBirth.year}
                                value={this.state.formControls.yearBuilt.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.yearBuilt.touched}
                                valid={this.state.formControls.yearBuilt.valid}
                                hint="true"
                            />
                            <Checkbox
                                name="subsidence"
                                label={this.state.formControls.subsidence.label}
                                helpTextTitle={this.state.formControls.subsidence.helpTextTitle}
                                helpText={this.state.formControls.subsidence.helpText}
                                value={this.state.formControls.subsidence.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.subsidence.options}
                                hint="true"
                            />
                            <Checkbox
                                name="flooding"
                                label={this.state.formControls.flooding.label}
                                value={this.state.formControls.flooding.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.flooding.options}
                                hint="false"
                            />
                            <Checkbox
                                name="basement"
                                label={this.state.formControls.basement.label}
                                value={this.state.formControls.basement.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.basement.options}
                                hint="false"
                            />
                        </Col>
                        <Col>
                            <Select
                                name="employmentStatus"
                                label={this.state.formControls.employmentStatus.label}
                                options={this.state.formControls.employmentStatus.choices}
                                value={this.state.formControls.employmentStatus.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.employmentStatus.touched}
                                valid={this.state.formControls.employmentStatus.valid}
                                hint="false"
                            />
                            <Select
                                name="occupation"
                                label={this.state.formControls.occupation.label}
                                options={this.state.formControls.occupation.choices}
                                value={this.state.formControls.occupation.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.occupation.touched}
                                valid={this.state.formControls.occupation.valid}
                                hint="false"
                            />
                            <TextArea
                                name="telephone"
                                label={this.state.formControls.telephone.label}
                                value={this.state.formControls.telephone.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.telephone.touched}
                                valid={this.state.formControls.telephone.valid}
                                phone="true"
                            />
                            <TextArea
                                name="email"
                                label={this.state.formControls.email.label}
                                value={this.state.formControls.email.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.email.touched}
                                valid={this.state.formControls.email.valid}
                                email="true"
                            />
                            <Checkbox
                                name="convictions"
                                label={this.state.formControls.convictions.label}
                                value={this.state.formControls.convictions.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.convictions.options}
                            />
                            <Checkbox
                                name="firstBuyer"
                                label={this.state.formControls.firstBuyer.label}
                                value={this.state.formControls.firstBuyer.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.firstBuyer.options}
                            />
                            <Select
                                name="securityAlarm"
                                label={this.state.formControls.securityAlarm.label}
                                helpTextTitle={this.state.formControls.securityAlarm.helpTextTitle}
                                helpText={this.state.formControls.securityAlarm.helpText}
                                options={this.state.formControls.securityAlarm.choices}
                                value={this.state.formControls.securityAlarm.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.securityAlarm.touched}
                                valid={this.state.formControls.securityAlarm.valid}
                                hint="true"
                            />
                            <Select
                                name="bedrooms"
                                label={this.state.formControls.bedrooms.label}
                                options={this.state.formControls.bedrooms.choices}
                                value={this.state.formControls.bedrooms.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.bedrooms.touched}
                                valid={this.state.formControls.bedrooms.valid}
                                hint="false"
                            />
                            <Select
                                name="bathrooms"
                                label={this.state.formControls.bathrooms.label}
                                options={this.state.formControls.bedrooms.choices}
                                value={this.state.formControls.bathrooms.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.bathrooms.touched}
                                valid={this.state.formControls.bathrooms.valid}
                                hint="false"
                            />
                            <Select
                                name="roofConstruction"
                                label={this.state.formControls.roofConstruction.label}
                                helpTextTitle={this.state.formControls.roofConstruction.helpTextTitle}
                                helpText={this.state.formControls.roofConstruction.helpText}
                                options={this.state.formControls.roofConstruction.choices}
                                value={this.state.formControls.roofConstruction.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.roofConstruction.touched}
                                valid={this.state.formControls.roofConstruction.valid}
                                hint="true"
                            />
                            <Checkbox
                                name="propertyOccupied"
                                label={this.state.formControls.propertyOccupied.label}
                                value={this.state.formControls.propertyOccupied.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.propertyOccupied.options}
                            />
                        </Col>
                    </Row>
                    <Row>
                    {/*rtuhrtbhlrtblketblrtbl.hetg.l*/}
                    {
                        !this.state.hbtuh ?
                        <Col className="addressBox" id="addressBox">

                            <Row>
                                <Col>
                                    <h4 className="addressTitle">Find Your Address</h4>
                                    <p className="addressDes">Enter your address into the text boxes below, select your County and Town and then click the <b>'Find Address'</b> button to search for your address.</p>
                                    <p className="addressDes2">Once your results have appeared, select your address from the list.</p>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col>
                                    <TextArea
                                        name="addressLine1"
                                        label={this.state.formControls.addressLine1.label}
                                        placeholder={this.state.formControls.addressLine1.placeholder}
                                        value={this.state.formControls.addressLine1.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.addressLine1.touched}
                                        valid={this.state.formControls.addressLine1.valid}
                                        home="true"
                                    />
                                    <TextArea
                                        name="addressLine2"
                                        label={this.state.formControls.addressLine2.label}
                                        placeholder={this.state.formControls.addressLine2.placeholder}
                                        value={this.state.formControls.addressLine2.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.addressLine2.touched}
                                        valid={this.state.formControls.addressLine2.valid}
                                        home="true"
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        name="county"
                                        label={this.state.formControls.county.label}
                                        options={this.state.formControls.county.choices}
                                        value={this.state.formControls.county.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.county.touched}
                                        valid={this.state.formControls.county.valid}
                                        hint="false"
                                    />
                                    <Select
                                        name="town"
                                        label={this.state.formControls.town.label}
                                        options={this.state.formControls.town.choices}
                                        value={this.state.formControls.town.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.town.touched}
                                        valid={this.state.formControls.town.valid}
                                        hint="false"
                                    />
                                    <Button id = "addressButton" className="addressButton" onClick={(e) => this.addressButtonHandler(e)} block>Find Address</Button>

                                </Col>
                            </Row>
                            <Row id="addressErrorMessage" className="errorNotification">
                                <Col className="errorMessages">
                                </Col>
                            </Row>
                        </Col>
                     :
                     < Container className="addressBox">
                        <Row>
                            <Col>
                                <h4>Address Match Results</h4>
                                <p>Please select your address from the list to continue: </p>
                            <Select
                                name="addressResults"
                                options={this.state.formControls.addressResults.choices}
                                value={this.state.formControls.addressResults.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.addressResults.touched}
                                valid={this.state.formControls.addressResults.valid}
                                hint="false"
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                            </Col>

                            <Col>
                                <Button className="addressButton" block>Change your Address</Button>
                                <p>Click the button above to change your address.</p>
                            </Col>
                        </Row>
                        </Container>
                        }
                        {/*<SwapTextMethod />*/}
                    </Row>
                    <Row>
                        <Col>
                            <Select
                                name="alterAddress"
                                label={this.state.formControls.alterAddress.label}
                                options={this.state.formControls.alterAddress.choices}
                                value={this.state.formControls.alterAddress.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.alterAddress.touched}
                                valid={this.state.formControls.alterAddress.valid}
                                hint="false"
                            />

                            <Select
                                name="insured"
                                label={this.state.formControls.insured.label}
                                options={this.state.formControls.insured.choices}
                                value={this.state.formControls.insured.value}
                                onChange={(e) => this.changeHandler(e)}
                                touched={this.state.formControls.insured.touched}
                                valid={this.state.formControls.insured.valid}

                            />

                    {/*start*/}
                        <div id="ru" style={{display: "none"}}>
                            <Select
                                name="insurer"
                                label={this.state.formControls.insurer.label}
                                options={this.state.formControls.insurer.choices}
                                value={this.state.formControls.insurer.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.insurer.touched}
                                valid={this.state.formControls.insurer.valid}
                            />
                            <TextArea
                                name="policyNumber"
                                label={this.state.formControls.policyNumber.label}
                                placeholder={this.state.formControls.policyNumber.placeholder}
                                value={this.state.formControls.policyNumber.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.policyNumber.touched}
                                valid={this.state.formControls.policyNumber.valid}
                                names="true"
                            />
                            <Row>
                                <Col>
                                    <Select
                                        name="expiryDay"
                                        label={this.state.formControls.expiryDay.label}
                                        options={this.state.formControls.expiryDay.choices}
                                        value={this.state.formControls.expiryDay.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.expiryDay.touched}
                                        valid={this.state.formControls.expiryDay.valid}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        name="expiryMonth"
                                        options={this.state.formControls.expiryMonth.choices}
                                        value={this.state.formControls.expiryMonth.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.expiryMonth.touched}
                                        valid={this.state.formControls.expiryMonth.valid}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        name="expiryYear"
                                        options={this.state.formControls.expiryYear.choices}
                                        value={this.state.formControls.expiryYear.value}
                                        onChange={this.changeHandler}
                                        touched={this.state.formControls.expiryYear.touched}
                                        valid={this.state.formControls.expiryYear.valid}
                                    />
                                </Col>
                            </Row>
                            <Select
                                name="yearsCurrentInsurer"
                                label={this.state.formControls.yearsCurrentInsurer.label}
                                options={this.state.formControls.yearsCurrentInsurer.choices}
                                value={this.state.formControls.yearsCurrentInsurer.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.yearsCurrentInsurer.touched}
                                valid={this.state.formControls.yearsCurrentInsurer.valid}
                            />
                        </div>
                    {/*end*/}




                            <Select
                                name="buildingCover"
                                label={this.state.formControls.buildingCover.label}
                                helpTextTitle={this.state.formControls.buildingCover.helpTextTitle}
                                helpText={this.state.formControls.buildingCover.helpText}
                                options={this.state.formControls.buildingCover.choices}
                                value={this.state.formControls.buildingCover.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.buildingCover.touched}
                                valid={this.state.formControls.buildingCover.valid}
                                hint="true"
                                prepend="true"
                            />
                            <Select
                                name="contentsCover"
                                label={this.state.formControls.contentsCover.label}
                                helpTextTitle={this.state.formControls.contentsCover.helpTextTitle}
                                helpText={this.state.formControls.contentsCover.helpText}
                                options={this.state.formControls.contentsCover.choices}
                                value={this.state.formControls.contentsCover.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.contentsCover.touched}
                                valid={this.state.formControls.contentsCover.valid}
                                hint="true"
                                prepend="true"
                            />
                            <Select
                                name="yearsLiving"
                                label={this.state.formControls.yearsLiving.label}
                                options={this.state.formControls.yearsLiving.choices}
                                value={this.state.formControls.yearsLiving.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.yearsLiving.touched}
                                valid={this.state.formControls.yearsLiving.valid}
                                hint="false"
                            />
                            <Select
                                name="heatingSystem"
                                label={this.state.formControls.heatingSystem.label}
                                options={this.state.formControls.heatingSystem.choices}
                                value={this.state.formControls.heatingSystem.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.heatingSystem.touched}
                                valid={this.state.formControls.heatingSystem.valid}
                                hint="false"
                            />
                            <Select
                                name="voluntaryExcess"
                                label={this.state.formControls.voluntaryExcess.label}
                                helpTextTitle={this.state.formControls.voluntaryExcess.helpTextTitle}
                                helpText={this.state.formControls.voluntaryExcess.helpText}
                                options={this.state.formControls.voluntaryExcess.choices}
                                value={this.state.formControls.voluntaryExcess.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.voluntaryExcess.touched}
                                valid={this.state.formControls.voluntaryExcess.valid}
                                hint="true"
                                prepend="true"
                            />
                            <Checkbox
                                name="smokersLiving"
                                label={this.state.formControls.smokersLiving.label}
                                value={this.state.formControls.smokersLiving.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.smokersLiving.options}
                            />
                        </Col>
                        <Col>
                            <Checkbox
                                name="accidentalDamage"
                                label={this.state.formControls.accidentalDamage.label}
                                helpTextTitle={this.state.formControls.accidentalDamage.helpTextTitle}
                                helpText={this.state.formControls.accidentalDamage.helpText}
                                value={this.state.formControls.accidentalDamage.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.accidentalDamage.options}
                                hint="true"
                            />
                            <Checkbox
                                name="smokeAlarms"
                                label={this.state.formControls.smokeAlarms.label}
                                value={this.state.formControls.smokeAlarms.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.smokeAlarms.options}
                            />
                            <Checkbox
                                name="securityLocks"
                                label={this.state.formControls.securityLocks.label}
                                helpTextTitle={this.state.formControls.securityLocks.helpTextTitle}
                                helpText={this.state.formControls.securityLocks.helpText}
                                value={this.state.formControls.securityLocks.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.securityLocks.options}
                                hint="true"
                            />
                            <Checkbox
                                name="neighbourWatch"
                                label={this.state.formControls.neighbourWatch.label}
                                value={this.state.formControls.neighbourWatch.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.neighbourWatch.options}
                            />
                      </Col>
                    </Row>
                    <Row className="addressBox">
                        <Col xs={7} className="addressDes termsBox">
                            <p>I have read and I accept the Privacy Policy</p>
                            <p>Please tick this box if you allow us to contact you about discounts, special offers and information<br/>
                            by post, email, SMS, phone and other electronic means.</p>
                            <p>Do you accept the assumptions and terms of business?</p>
                        </Col>
                        <Col>
                            <Checkbox
                                name="privacyPolicy"
                                value={this.state.formControls.privacyPolicy.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.privacyPolicy.options}
                                touched={this.state.formControls.privacyPolicy.touched}
                                valid={this.state.formControls.privacyPolicy.valid}
                            />
                            <Checkbox
                                name="specialOffers"
                                value={this.state.formControls.specialOffers.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.specialOffers.options}
                            />
                            <Checkbox
                                name="terms"
                                value={this.state.formControls.terms.value}
                                onChange={this.changeHandler}
                                options={this.state.formControls.terms.options}
                                touched={this.state.formControls.terms.touched}
                                valid={this.state.formControls.terms.valid}
                            />
                        </Col>
                    </Row>
                    <Row className="errorNotification" id="errorMessage">
                        <Col xs={7} className="errorMessages">
                            {this.errorMessageMap.forEach((key, value) =>  value )}
                        </Col>
                    </Row>
                    <Row>
                        <Button className="submitButton" type="submit" size="lg" block onClick={(e) => this.formSubmitHandler(e)}>Get Quote</Button>
                    </Row>
                </form>
            </Container>
            </>
        );
    }

}

export default Home;
