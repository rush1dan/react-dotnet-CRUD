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