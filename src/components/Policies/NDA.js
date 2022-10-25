import React from "react";
import jsPDF from "jspdf";
import Button from 'react-bootstrap/Button';
export default function NDA(){
    var generatePDF = () => {
        var doc = new jsPDF("p","pt","a4");
        console.log("here");
        doc.html(document.querySelector(".content"), {
            callback : function(pdf){
                pdf.save("NDA.pdf");
                console.log("here too");
            }
        })
    }
    const submitForm = ()=>{
        alert("NDA Agreement signed !!!")
    }
    return(
        <div>
            <div className="content">
                <h1>NDA Agreement</h1>
                <div className="agreementText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis vestibulum orci, non bibendum velit ullamcorper quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc rutrum ut felis non hendrerit. Pellentesque sed quam sed neque aliquam eleifend. Nulla facilisi. Sed elementum libero et tortor consequat dignissim. Vestibulum at laoreet sem, et ultrices sapien. Vivamus tempus massa a mauris dapibus, quis eleifend dolor fringilla. Etiam non erat non enim rutrum consectetur eget nec enim. Fusce commodo ligula at leo iaculis, a varius erat tincidunt. In faucibus enim vehicula diam maximus, eget pharetra mi dictum. Proin pretium ultricies dolor. Ut ipsum lectus, ultrices in dui sed, venenatis tempus urna.

Nulla dictum vel lorem vel placerat. Donec et sapien et libero scelerisque tincidunt id in mi. Praesent ex risus, eleifend a ligula sit amet, commodo pulvinar orci. Pellentesque tristique ligula a libero maximus commodo. Fusce nec purus gravida justo tempor pellentesque quis nec magna. Nulla consequat dui non turpis molestie, sed hendrerit leo varius. Aliquam a magna magna. Donec vitae massa a urna porta posuere.

In hac habitasse platea dictumst. Aenean condimentum, erat id placerat vehicula, sem eros accumsan eros, id vestibulum dui erat et est. Quisque pellentesque maximus felis, eu dapibus erat semper ac. Nulla malesuada ex venenatis ligula luctus dapibus. Aenean aliquam elementum lacus tincidunt congue. Phasellus et mattis elit. Maecenas gravida, dui eu tincidunt rhoncus, quam leo efficitur nibh, vitae finibus ipsum felis eget ipsum. Aliquam tempus, lacus eu faucibus molestie, mauris turpis eleifend dui, egestas fringilla libero tellus ut libero. Nullam nunc leo, blandit nec felis ut, placerat aliquam magna.
                </div>
                <div className="agree">
                    <input className='accept' type="checkbox" />
                    <label className="acceptText">I accept the agreement</label>
                </div>
            </div>
            <div className="buttons">
                <Button onClick={generatePDF} type="primary"> Download </Button>
                <Button onClick={submitForm}> Save </Button>
            </div>
        </div>

    );
}