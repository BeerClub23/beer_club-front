import * as yup from "yup";

function calculateAge(birthDate) {
    const today = new Date();
    console.log(today);
    const dob = new Date(birthDate);
    dob.setHours(dob.getHours() + 3);
    console.log(dob);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      return age - 1;
    }
  
    return age;
  }

export const schema = yup.object().shape({  
     customer: yup.object().shape({
        name: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(10, "Máximo 10 caracteres"),
        lastName: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(10, "Máximo 10 caracteres"),
        dateOfBirth: yup
    .string()
    .matches(
      /^(\d{4}-\d{2}-\d{2})$/,
      'El formato de fecha debe ser DD-MM-AAAA'
    ),
   
        email: yup.string().required("Este campo es requerido").email("El correo no es válido").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),
        password: yup.string().required("La contraseña debe tener 8-16 caracteres e incluir letras, números y al menos un carácter especial (#, $, @, !, %, & o ?).").matches(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/, "Contraseña invalida"),
        passwordConfirm: yup.string().required("Este campo es requerido").oneOf([yup.ref('password'), null], 'La contraseña no coincide'),
    }),
    address: yup.object().shape({
            address1: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres"),
            address2: yup.string(),
            city: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres"),
            state: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres"),
            zipCode: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres")    ,    
      }),
    card : yup.object().shape({
        number: yup.string().required("Este campo es requerido").matches(/^[0-9]{16}$/, "Debe ser un número de 16 dígitos"),
        cvc: yup.string().required("Este campo es requerido").matches(/^[0-9]{3}$/, "Debe ser un número de 3 dígitos"),
        expDate: yup.string().required("Este campo es requerido").matches(/^[0-9]{4}$/, "Debe ser un número de 4 dígitos"),
        nameOnCard: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(20, "Máximo 20 caracteres"),
    })  
  
})

export const schema1 = yup.object().shape({  
    customer: yup.object().shape({
       name: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(10, "Máximo 10 caracteres"),
       lastName: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(10, "Máximo 10 caracteres"),
       email: yup.string().required("Este campo es requerido").email("El correo no es válido").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),
   })
 
})
export const schema2 = yup.object().shape({  
  
   address: yup.object().shape({
           address1: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres"),
           address2: yup.string(),
           city: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres"),
           state: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres"),
           zipCode: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres")    ,    
     }),
   
 
})
export const schema3 = yup.object().shape({ 
 
   card : yup.object().shape({
       number: yup.string().required("Este campo es requerido").matches(/^[0-9]{16}$/, "Debe ser un número de 16 dígitos"),
       cvc: yup.string().required("Este campo es requerido").matches(/^[0-9]{3}$/, "Debe ser un número de 3 dígitos"),
       expDate: yup.string().required("Este campo es requerido").matches(/^[0-9]{4}$/, "Debe ser un número de 4 dígitos"),
       nameOnCard: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(20, "Máximo 20 caracteres"),
   })  
 
})



