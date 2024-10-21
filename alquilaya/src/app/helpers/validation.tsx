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


export const validatePassword = (password: string): string => {
    let validation = "";
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!regexPassword.test(password)) {
        validation = "Debe tener al menos 8 caracteres, con al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
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
        validation = "Dirección no válida. Debe tener al menos 5 carácteres e incluir letras y números.";
    }

    return validation;
};