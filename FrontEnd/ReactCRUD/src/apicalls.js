export async function get() {
    try {
        const response = await fetch("http://localhost:5294/api/Student", {
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
        const response = await fetch("http://localhost:5294/api/Student", {
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
        const response = await fetch(`http://localhost:5294/api/Student/${id}`, {
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
        const response = await fetch(`http://localhost:5294/api/Student/${id}`, {
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