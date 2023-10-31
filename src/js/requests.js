import mask from "./mask";
import  "./validation"


    async function response(inputs,formData) {
        let response;
        try {
            response = await fetch("http://localhost:9090/api/registration", {
                   method: "POST",
                   body: formData
               });
               if(response.ok) {
                let result = await response.json();
                 inputs.forEach(item => {
                    if(item.id === "formPhone") {
                        mask.value = "";
                    } else {
                        item.value = '';
                    }
            })
                alert(JSON.stringify(result.message))
            } else {
                let fields = []
                inputs.forEach(item => {
                    if(item.id === "formName") {
                        fields.push('Поле Имя заполнено не верно')
                    }
                     else if(item.id === "formEmail") {
                        fields.push('Поле "Е-mail" заполнено не верно')
                    } else if(item.id === "formPhone") {
                        fields.push('Поле "Телефон" заполнено не верно')
                    } else if(item.id === "formText") {
                        fields.push('Поле "Сообщение" заполнено не верно')
                    }
                })
               alert(fields);
            
               inputs.forEach(item => {
                if(item.id === "formPhone") {
                    mask.value = "";
                } else {
                    item.value = '';
                }
            })
            }
        } catch(err) {
            alert('Сервер не запущен')
        }
    }

export { response }


