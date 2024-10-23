export const validateEmail = (email: string) => {
    let validation = "";
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(email)) {
        validation = "Formato de correo electrónico no válido";
    } else {
        // validation = "Valid email";
        validation = "";
    }

    return validation;
};

//  Gaston Gonzalez

export const validateCountry = (country:string): string => {
    let validation = ""
    const regexCountry = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-]{2,50}$/

    if(!regexCountry.test(country)) validation = "Debe tener entre 2 y 50 carácteres"
    return validation
}

export const validateDni = (dni:string): string => {
    let validation = ""
    const regexCountry = /^\d{7,10}$/

    if(!regexCountry.test(dni)) validation = "Debe tener entre 7 y 10 números."
    return validation
}

export const validateName = (name:string): string => {
    let validation = ""
    const regexCountry = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/

    if(!regexCountry.test(name)) validation = "Debe tener entre 1 y 50 letras."
    return validation
}
export const validatePhone = (name:string): string => {
    let validation = ""
    const regexCountry = /^\+?\d{1,3}?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/

    if(!regexCountry.test(name)) validation = "Sólo números"
    return validation
}



//  Gaston Gonzalez


export const validatePassword = (password: string): string => {
    let validation = "";
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!regexPassword.test(password)) {
        validation = "Debe tener al menos 8 carácteres, con al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
    } else {
        // validation = "Valid password";
        validation = "";
    }

    return validation;
};


export const validateAddress = (address: string): string => {
    let validation = "";
    const regexAddress = /^[a-zA-Z0-9\s,.'-]{5,}$/;

    if (!regexAddress.test(address)) {
        validation = "Formato de dirección no válido. Debe tener al menos 5 caracteres e incluir letras y números.";
    }

    return validation;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    let validation = "";

    if (confirmPassword !== password) {
        validation = "Las contraseñas no coinciden";
    } else {
       
        validation = "";
    }

    return validation;
};