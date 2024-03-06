import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik"; //biblioteca de react para validar inputs, entradas de usuario
//form crea el formulario y formik mantiene el estado
import { useClients } from "../context/UserProvider";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ClientsForm() {
  const { createClient, getClient, updateClient } = useClients();
  const [client, setClient] = useState({
    name: "",
    last_name: "",
    phone: "",
    address: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const loadClient = async () => {
      if (params.id) {
        const client = await getClient(params.id);
        console.log(client);
        setClient({
          name: client.name,
          last_name: client.last_name,
          phone: client.phone,
          address: client.address,
        });
      }
    };
    loadClient();
  }, []);
  const notify = () => toast.error("All fields are required.");
  return (
    <div>
      <h1 className=" text-4xl font-bold text-center">
        {params.id ? "Edit Client" : "Create Client"}
      </h1>
      <Formik
        initialValues={client}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          // si algún campo está vacío
          if (
            !values.name ||
            !values.last_name ||
            !values.phone ||
            !values.address
          ) {
            notify();
            return; // Detener el envío del formulario
          }
          console.log(values);
          if (params.id) {
            await updateClient(params.id, values);
          } else {
            await createClient(values);
          }
          navigate("/clients");
          setClient({
            name: "",
            last_name: "",
            phone: "",
            address: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col bg-gray-500 max-w-md rounded-md p-4 mx-auto mt-5"
          >
            <label>Name</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="text"
              name="name"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.name}
            />

            <label>Last name</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="text"
              name="last_name"
              placeholder="Write a last name"
              onChange={handleChange}
              value={values.last_name}
            />

            <label>Phone</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="text"
              name="phone"
              placeholder="Write a phone"
              onChange={handleChange}
              value={values.phone}
            />

            <label>Address</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="text"
              name="address"
              placeholder="Write a address"
              onChange={handleChange}
              value={values.address}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className=" py-1 px-3 bg-green-500 rounded-md cursor-pointer mt-3"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
}

export default ClientsForm;
