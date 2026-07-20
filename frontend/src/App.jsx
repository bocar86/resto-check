import "./App.css";
import ResourceTable from "./components/ResourceTable";

function App() {
    return (
        <>
            <h1>Resto Check 🍽️</h1>

            <ResourceTable
                title="Rôles"
                endpoint="/roles"
                columns={[
                    { key: "id_role", label: "ID" },
                    { key: "nom", label: "Nom" },
                ]}
            />

            <ResourceTable
                title="Catégories"
                endpoint="/categories"
                columns={[
                    { key: "id_categorie", label: "ID" },
                    { key: "nom", label: "Nom" },
                ]}
            />

            <ResourceTable
                title="Employés"
                endpoint="/employes"
                columns={[
                    { key: "id_employes", label: "ID" },
                    { key: "nom", label: "Nom" },
                    { key: "prenom", label: "Prénom" },
                    { key: "email", label: "Email" },
                    { key: "telephone", label: "Téléphone" },
                ]}
            />

            <ResourceTable
                title="Responsables"
                endpoint="/responsables"
                columns={[
                    { key: "id_responsables", label: "ID" },
                    { key: "nom", label: "Nom" },
                    { key: "prenom", label: "Prénom" },
                    { key: "email", label: "Email" },
                    { key: "telephone", label: "Téléphone" },
                    { key: "id_role", label: "Rôle (ID)" },
                ]}
            />

            <ResourceTable
                title="Stock"
                endpoint="/stock"
                columns={[
                    { key: "id_stock", label: "ID" },
                    { key: "nom", label: "Nom" },
                    { key: "quantite", label: "Quantité" },
                    { key: "unite", label: "Unité" },
                    { key: "id_categorie", label: "Catégorie (ID)" },
                    { key: "seuil_alerte", label: "Seuil alerte" },
                    { key: "emballage", label: "Emballage" },
                ]}
            />
        </>
    );
}

export default App;
