//Capturamos el boton para encriptar y desencriptar

var encriptar = document.querySelector(".encrypt");
var desencriptar = document.querySelector(".decrypt");

//Capturamos la etiqueta p donde se encuentra el texto
var frase = document.querySelector(".code_phrase");

//Capturamos el boton de copiar
var copiar = document.querySelector(".copy");

//Capturamos el muñeco de la persona
var muneco = document.querySelector(".person");

//Capturamos el lugar donde se encuentra la frase encriptada
var descr = document.querySelector(".descypt_area");

//Capturamos el lugar donde se muestra el formato que se debe ingresar
var advetencia = document.querySelector(".warning_container");

//Capturamos el lugar donde donde se muestra el formato que se debe ingresar
var error = document.getElementById('iderror');

//Capturamos el contenedor de los botones
var botones = document.querySelector(".container_btn");

//Capturamos el contenedor donde se muestra el texto encriptado y el boton de copiar
var area = document.querySelector(".text-area");

//Capturamos el lugar del texto encriptado
var fraseCodi = document.getElementById("pharseCod");

//Capturamos el lugar del texto encriptado
var textoEncriptar = document.getElementById("txt");

/*
    Funcion para mostrar el boton de copiar, el texto encriptado
    y ajustar los botones
*/

function desplegar() {
    frase.style.display = "flex";
    copiar.style.display = "flex";
    muneco.style.display = "none";
    descr.style.display = "none";
}

/*
    Funcion para formatear y animar el lugar donde
    se mostrara las convenciones del texto en caso
    de que se valido
*/

function esValido() {
    error.style.color = '#28b423'
    error.style.rotate = "-360deg";
    error.style.fontSize = "1em";
    error.style.fontWeight = "0";
}

/*
    Funcion para formatear y animar el lugar donde
    se mostrara las convenciones del texto en caso
    de que se invalido
*/

function invalido() {
    error.style.color = '#e42630';
    error.style.rotate = "360deg";
    error.style.fontSize = "1.5em";
    error.style.fontWeight = "400";
}

/*
    Funcion para dar formato al texto 
    del lugar donde se muestra el codigo encripta
*/

function textoError() {
    let texto = textoEncriptar.value;
    if (!texto) {
        fraseCodi.value = "Debe ingresar al menos un caracter!";
        fraseCodi.style.color = "#e42630";
        fraseCodi.style.fontSize = "1.4em";
        textoEncriptar.focus();
    } else {
        fraseCodi.value = "Error!";
        fraseCodi.style.color = "#e42630";
        fraseCodi.style.fontSize = "1.4em";
        textoEncriptar.focus();
    }
    return fraseCodi
}

// La siguiente función valida el elemento txt

function validar(inputValidar) {
    let isValid = false;
    let texto = inputValidar.value;
    const pattern = new RegExp("^[a-z\\s\\n\\ñ]+$");
    if (!texto) {
        isValid = false;
    } else {
        if (!pattern.test(texto)) {
            isValid = false;
        } else {
            isValid = true;
        }
    }
    if (!isValid) {
        invalido();
    } else {
        esValido();
    }
    return isValid;
}

function mostrarEncriptado() {
    let texto = textoEncriptar.value;
    desplegar();
    const valido = validar(textoEncriptar);
    if (!valido) {
        textoError();
    } else {
        let textoEncriptado = [];
        if (texto.length) {
            fraseCodi.style.color = "#495057";
            for (let i = 0; i < texto.length; i++) {
                let codigo;
                if (texto.charAt(i) == "a") {
                    codigo = texto.charAt(i).replace(/a/g, 'ai');
                }
                else if (texto.charAt(i) == "e") {
                    codigo = texto.charAt(i).replace(/e/g, 'enter');
                }
                else if (texto.charAt(i) == "i") {
                    codigo = texto.charAt(i).replace(/i/g, 'imes');
                }
                else if (texto.charAt(i) == "o") {
                    codigo = texto.charAt(i).replace(/o/g, 'ober');
                }
                else if (texto.charAt(i) == "u") {
                    codigo = texto.charAt(i).replace(/u/g, 'ufat');
                } else {
                    codigo = texto.charAt(i);
                }
                textoEncriptado.push(codigo)
                fraseCodi.value = textoEncriptado.join("");
            }
        }
    }
    textoEncriptar.value = "";
    resetCopiar();
}

//Funcion que desencripta el mensaje copiado

function mostrarDesencriptar() {
    let textoEncrip = textoEncriptar.value;
    desplegar();
    const valido = validar(textoEncriptar);
    if (!valido) {
        textoError();
    } else {
        if (textoEncrip.length) {
            fraseCodi.style.color = "#495057";
            let textoDesEncrip = textoEncrip.replace(/enter/gi, "e").replace(/imes/gi, "i")
                .replace(/ai/gi, "a").replace(/ober/gi, "o").replace(/ufat/gi, "u");
            fraseCodi.value = textoDesEncrip;
        }
    }
    textoEncriptar.value = "";
    resetCopiar();
}

//Funcio para copiar el texto

function copiarTexto() {
    if (fraseCodi.value == "") {
        alert("No hay nada que copiar!")
    } else {
        window.getSelection().removeAllRanges();
        fraseCodi.select();
        var res = document.execCommand('copy');
        if (res) {
            copiar.style.borderColor = '#28b423';
            copiar.style.boxShadow = '3px 3px 3px  #088c19';
            copiar.style.transform = 'scale(0.95)';
            alert("Texto copiado");
        }
    }
}

//Funcion encargada de resetear el boton de copiar

function resetCopiar() {
    copiar.style.borderColor = '#0a3871';
    copiar.style.boxShadow = 'none';
    copiar.style.transform = 'scale(1)';
}

encriptar.onclick = mostrarEncriptado;

desencriptar.onclick = mostrarDesencriptar;

copiar.onclick = copiarTexto;