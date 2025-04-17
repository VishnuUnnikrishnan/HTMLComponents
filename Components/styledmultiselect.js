class StyledMultiSelect{
    clientClassInstance = ""
    inputContainerId = "";
    selectContainer="";
    tagHolderId = "";
    objecttitle = "";
    options = [];
    placeholder = "Please Select"
    value = []
    
    constructor(name, title,inputContainer_id, options){
        this.clientClassInstance = name;
        this.inputContainerId = inputContainer_id;
        this.options = options;
        this.objecttitle = title;
        this.setupTagsContainer();
    }
    setupTagsContainer(){
        this.selectContainer = this.inputContainerId+"_select";
        this.tagHolderId = this.inputContainerId+"_tagHolder";
        var title = this.inputContainerId+"_title";
        var counter = 0;
        document.getElementById(this.inputContainerId).innerHTML = `
            <div id="${title}">${this.objecttitle}</div></span>
            <br>
            <div id="${this.tagHolderId}" style="min-height:50px;"></div>
            <br>
            <select onChange = "${this.clientClassInstance}.multiselectonChangeHandler()" class = "form-select" id="${this.selectContainer}"><option id="multiselect_placeholder" selected value="">${this.placeholder}</option></select>
        `;

        this.options.forEach(element => {
            var value = "";
            var text = "";
            var selected = false;
            
            if (element.constructor == Object){
                keys = Object.keys(element);
                if (keys.includes("value")){
                    value = element["value"];
                }


                if(keys.included("selected")){
                    selected = element["selected"];
                }
            }
            else{

                value=element;
            }
            var valueCounter = value +"_option_"+String(counter);
            if (!selected){
                document.getElementById(this.selectContainer).innerHTML += `
                    <option id = "${valueCounter}" ,value= ${value}>${value}</option>
                `;
            }
            else{
            }
            counter++;
        });
        
    }
    multiselectonChangeHandler(){
        var select = document.getElementById(this.selectContainer)
        var option_id = select[select.selectedIndex].id;
        console.log(option_id);

        var tagHolder = document.getElementById(this.tagHolderId);
        
        if(option_id != "multiselect_placeholder"){
            tagHolder.innerHTML += `<button class="btn btn-outline-dark" style="margin-bottom:5px;" id ="${option_id}_button" onclick="${this.clientClassInstance}.removeElement(${option_id}_button)">
            ${select.value}</button>
            `;
            this.value.push(select.value);
            document.getElementById(option_id).remove();
        }
    }

    removeElement(id){
        var button = id
        var select = document.getElementById(this.selectContainer);
        console.log(button.id);
        var option_id = button.id.replace("_button","");
        
        select.innerHTML += `
                    <option id = "${option_id}" ,value= ${button.innerHTML}>${button.innerHTML}</option>
                `;

        button.remove();
        this.value.pop(button.id);

    }

    


}

