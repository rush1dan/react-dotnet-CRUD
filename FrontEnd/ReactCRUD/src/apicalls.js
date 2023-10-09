const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const apiURL = `${import.meta.env.VITE_BACKEND_URL}/api/Students`;

export async function get() {
    try {
        const response = await fetch(`${apiURL}`, {
            method: "GET",
            mode: "cors"
        });
        return await response.json();
    }
    catch(error) {
        throw error;
    }
}

export async function post(data) {
    try {
        const response = await fetch(`${apiURL}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
    catch(error) {
        throw error;
    }
}

export async function put(id, data) {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.status;
    }
    catch(error) {
        throw error;
    }
}

export async function deleteEntry(id) {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return await response.status;
    }
    catch(error) {
        throw error;
    }
}