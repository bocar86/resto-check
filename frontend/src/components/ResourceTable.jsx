import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

function ResourceTable({ title, endpoint, columns }) {
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}${endpoint}`)
            .then((res) => res.json())
            .then(setRows)
            .catch((err) => setError(err.message));
    }, [endpoint]);

    return (
        <section>
            <h2>{title}</h2>
            {error && <p>Erreur : {error}</p>}
            <table>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row[columns[0].key]}>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default ResourceTable;
