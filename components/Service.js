export const fetchData = async (url, method, data, token, process, res, processImg = false) => {
    // loadingData(true)

    let headers = {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    if (process) {
        headers = { ...headers, 'contentType': false, 'processData': false }
    } else {
        headers = { ...headers, 'Content-Type': 'application/json' }
    }

    if (token) {
        let TOKEN = localStorage.getItem('amazio-token')
        headers = { ...headers, 'token': TOKEN }
    }

    let request = {
        'method': method,
        'headers': headers,
    }

    if (data) {
        request = { ...request, 'body': process ? data : JSON.stringify(data) }
    }

    await fetch(`${ENDPOINT}${url}`, request).then((response) => processImg === "text" ? response.text() : (processImg === "blob" ? response.blob() : response.json())).then((json) => {
        // loadingData()
        if (json.message === "Unauthenticated.") {
            localStorage.removeItem("lr_admin-token");
            window.location.href = '/login'
        } else if (!json.records) {
            // toastNotify(json)
            res(json)
        } else {
            res(json)
        }
    }).catch((error) => { console.log(error) });
}