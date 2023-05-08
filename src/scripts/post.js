// Gets the data from the sent form.
export function getData(form) {
    var formData = new FormData(form);

    // Iterate through the entries.
    for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }
}

// async function getJugadores() {
//     let url = 'localhost:5283/api/Jugadores';
//     try {
//         let res = await fetch(url, method = "POST");
//         return await res.json();
//     } catch (error) {
//         console.log(error);
//     }
// }
