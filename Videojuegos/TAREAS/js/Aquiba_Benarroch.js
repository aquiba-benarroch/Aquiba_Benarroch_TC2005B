/*
 Example functions to practice JavaScript
 Aquiba Yudah Benarroch Bittan
 A01783710
*/

"Use strict";

// 1.Funcion que encuentra la primer letra que no se repite en la oracion. 

export function firstNonRepeating(str)
{
    for (let i = 0; i < str.length; i++) //For para recorrer el string completo
    {
        let Unique = true; //Variable para saber si la letra es unica
        for (let j = 0; j < str.length; j++) //Segundo for para recorrer lo demas
        {
            if(j !== i && str[i] == str[j]) //Si la letra es igual al la letra de j se rompre el for y continua el primer for
            {
                Unique = false;
                break;
            }
        }
            if (Unique) //Si no se rompe nunca el segundo for significa que la letra es unica en el string
            {
                return str[i];
            }
        }
        return undefined; //Si no hay letras unicas se regresa null
    }

// 2. Funcion para algoritmo bubble sort
export function bubbleSort(arr) //Funcion para ordenar un array de forma ascendente
{
    let flag = false; //Variable para saber si se hizo un cambio
    for (let i = 0; i < arr.length; i++) //For para recorrer el array de
    {  
        for (let j = 0; j < arr.length - i; j++) //Segundo for para recorrer el array
        {
            if (arr[j] > arr[j + 1]) //Si el numero actual es mayor al siguiente se cambian de lugar
            {
                //Se hace el cambio de lugar entre las variables
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = true; //Se hizo un cambio
            }
        }
        if (!flag) //Si no se hizo ningun cambio se rompe el primer for
        {
            break;
        }
    }
    return arr; //Se regresa el array ordenado
}

/*
3.1 Funcion que recibe un arreglo de numeros y regresa un nuevo arreglo con los numeros invertidos. 
3.2 Funcion que recibe un arreglo de numeros y los invierte en el mismo arreglo.
*/
export function invertArray(arr)
{
    let arr2 = []; //Array para guardar el array invertido
    for (let i = arr.length -1; i >= 0; i--) //For para recorrer el array de forma inversa
    {
        arr2.push(arr[i]); //Se agrega el valor al array 2
    }
    return arr2; //Se regresa el array invertido
}

export function invertArrayInplace(arr)
{
    for(let i = 0; i < arr.length / 2; i++) //For para recorrer el array
    {
        for(let j = arr.length -1 -i; j > i; j--) //Segundo for para recorrer el array de forma inversa
        {
            let temp = arr[i]; //Variable temporal para guardar el valor de i
            arr[i] = arr[j]; //Se cambia el valor de i por el de j
            arr[j] = temp; //Se cambia el valor de j por el de i
            break; //Sale del for de j para que no se hagan mas cambios
        }
    }
    return arr; //Se regresa el array invertido
}

// 4. Funcion que recibe texto y regrese una nueva con la primer letra de cada palabra en mayúscula.
export function capitalize(str)
{
    let words = str.split(" "); //Se separa el string en palabras
    for(let i = 0; i < words.length; i++) //For para recorrer las palabras
    {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); //Se cambia la primera letra de la palabra a mayuscula
    }
    return words.join(" "); //Se regresa el string con las palabras cambiadas
}

// 5. Funcion que calcula el máximo común divisor de dos números
export function mcd(a,b)
{
    if (a === 0) //Si a es 0 se regresa b
    {
        return b;
    }
    if (b === 0) //Si b es 0 se regresa a
    {
        return a;
    }
    //Si nungun numero es 0 entonces
    else
    {
        let min = Math.min(a, b); //Usamos .min para saber cual es el numero menor
        let mcd = 1; //Variable para guardar el maximo comun divisor
        for (let i = min; i >= 1; i--) //For para recorrer los numeros hasta llegar a 1
        {
            if (a % i === 0 && b % i === 0) //Si ambos numeros son divisibles entre i se regresa i
            {
                mcd = i;
                break; //Salimos del for debido a que ya tenemos el maximo comun divisor.
            }
        }
        return mcd; //Se regresa el mcd
    }
}

// 6. Funcion para cambiar texto a Hacker Speak
export function hackerSpeak(str)
{
    let arr = []; //Array para guardar el string cambiado
    for (let i = 0; i < str.length; i++) //For para recorrer el string
    {
        switch(str[i]) //Switch para cambiar las letras. El switch prueba casos, si ninguno se cumple se va al default
        { 
            //En caso de las letras a e o s ya sea mayusculas o minusculas
            case 'A':
            case 'a':
                arr.push('4');
                break;
            case 'E':
            case 'e':
                arr.push('3');
                break;
            case 'I':
            case 'i':
                arr.push('1');
                break;
            case 'O':
            case 'o':
                arr.push('0');
                break;
            case 'S':
            case 's':
                arr.push('5');
                break;
            default: //Si no se encuentra alguna letra de los casos, la letra se agrega al array automaticamente
                arr.push(str[i]);
                break;
        }
    }
    return arr.join(""); //Se regresa el string cambiado
} 

// 7. Funcion que recibe un numero y regresa lista con todos sus factores
export function factorize(num)
{
    let arr = []; //Array para guardar los factores del numero
    for (let i = 1; i <= num; i++) //For para recorrer los todos los numero hasta llegar al numero parametro
    {
        if (num % i === 0) //Si el numero es divisible entre i se agrega al array
        {
            arr.push(i);
        }
    }
    return arr; //Se regresa el array con los factores
}

//8. Funcion que toma un array y quita los numeros repetidos
export function deduplicate(arr)
{
    let arr2 = []; //Array para guardar los numeros no repetidos
    for(let i = 0;  i < arr.length; i++)
    {
        let isDuplicate = false;
        for (let j = 0; j < arr2.length; j++)
        {
            if(arr[i] == arr2[j]) //Si esta repetido hacemos break 
            {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) //Si no esta repetido se agrega al arreglo
        {
            arr2.push(arr[i]);
        }
    }
    return arr2; //Se regresa el array sin duplicados
}

//9. Funcion que recibe una lista de cadenas de texto y regresa la longitud mas corta
export function findShortestString(arr)
{
    if (arr.length === 0)  //Si el array esta vacio se regresa 0
    {
        return 0; 
    }
    else
    {
        let shortest = arr[0].length; //Variable para guardar la longitud de la primera cadena
        for (let i = 0; i < arr.length; i++) //For para recorrer el array
        {
            if (arr[i].length < shortest) //Si la longitud de la cadena actual es menor a la mas corta, shortest se cambia
            {
                shortest = arr[i].length;
            }
        }
        return shortest; //Se regresa la longitud de la cadena mas corta
    }
}

//10. Funcion que recibe un string y te dice si es palindromo
export function isPalindrome(str)
{
    let reversed = [];
    str = str.toLowerCase(); //Se cambia el string a minusculas
    //Se quitan los espacios del string. Entre los slashes se pone lo que se quiere quitar y la g es porque quiza haya mas de un espacio. Se reemplaza por nada
    str = str.replace(/ /g, ""); 
    for (let i = str.length - 1; i >= 0; i--) //For para recorrer el string de forma inversa
    {
        reversed.push(str[i]); //Se agrega la letra al array reversed
    }
    if (str === reversed.join("")) //Si el string original es igual al string reversed se regresa true
    {
        return true
    }
    else //Si no se regresa false
    {
        return false;
    }
}

//11. Funcion que toma una listra de strings y las regresa en orden alfabetico
export function sortStrings(arr)
{
    //Convertimos todo a lower case para que no hayan errores
    for(let i = 0; i < arr.length; i++)
    {
        arr[i] = arr[i].toLowerCase();
    }
    let arrOrdenado = [];
    arrOrdenado = bubbleSort(arr) //Usamos la funcion bubbleSort que definimos arriba para ordenar el array
    return arrOrdenado; //Se regresa el arreglo ordenado
}

//12. Funcion que recibe una lista de numeros y regresa la media y moda
export function stats(arr)
{
    let resultado = []; //Array para guardar la mediana y la moda
    let n = arr.length; //Variable para guardar la longitud del array

    if (arr.length == 0) //Si el array esta vacio se regresa un array vacio
    {
        return [0,0]; //Para probar el caso de que el array este vacio
    }

    //Sacamos media
    let media = 0; //Variable para guardar la media
    for(let i = 0; i < arr.length; i++) //For para recorrer el array
    {
        media += arr[i]; //Se suma cada valor del array
    }
    media = media / n; //Se divide la suma entre la longitud del array
    resultado.push(media); //Se agrega la media al array resultado

    //Sacamos moda
    let moda = arr[0]; //Variable para guardar la moda
    let maxCount = 0; //Variable para guardar el numero de veces que se repite la moda
    for(let i = 0; i < arr.length; i++) //For para recorrer el array
    {
        let count = 0; //Variable para contar las repeticionnes
        for(let j = i + 1; j < arr.length; j++) //Segundo for para recorrer el array
        {
            if(arr[i] === arr[j]) //Si el valor de i es igual al de j se suma al contador
            {
                count++;
            }
        }
        if (count > maxCount) //Si el contador es mayor al maxCount se actualiza la moda
        {
            moda = arr[i];
            maxCount = count;
        }
    }
    resultado.push(moda); //Se agrega la moda al array resultado
    return resultado; //Se regresa el array con la media y la moda
}

//13. Funcion que toma una cadena de textos y regresa el texto que mas se repite
export function popularString(arr)
{
    if(arr.length == 0) //Si el array esta vacio se regresa un string vacio
    {
        return '';
    }
    let popular = arr[0]; //Variable para guardar el string mas popular
    let maxCount = 0; //Variable para guardar el numero de la palabra mas repetida
    for(let i = 0; i < arr.length; i++) //For para recorrer el array
    {
        let count = 0; //Variable para contar las repeticionnes
        for(let j = i + 1; j < arr.length; j++) //Segundo for para recorrer el array
        {
            if(arr[i] === arr[j]) //Si el valor de i es igual al de j se suma al contador
            {
                count++;
            }
        }
        if (count > maxCount) //Si el contador es mayor al maxCount se actualiza la moda
        {
            popular = arr[i];
            maxCount = count;
        }
    }
    return popular; //Se regresa el string mas popular
}

//14. Funcion que regresa true si un numero es potencia de 2
export function isPowerOf2(n)
{
    if (n === 0) //Si el numero es 0 se regresa false
    {
        return false;
    }
    while (n !== 1) //Mientras el numero no sea 1. Si es 1 se regresa true
    {
        if (n % 2 !== 0) //Si el numero no es divisible entre 2 se regresa false
        {
            return false;
        }
        n = n / 2; //Se divide el numero entre 2 y se actualiza
    }
    return true;
}

//15. Funcion que toma una lista de numeros y la regresa de manera descendiente
export function sortDescending(arr)
{
    let arrDesc = []; //Nuevo array para guardar de manera descendiente el array original
    arrDesc = invertArrayInplace(bubbleSort(arr)); //Usamos las funciones ya definidas arriba y lo invertimos
    return arrDesc; //Se regresa el array ordenado de manera descendiente
}