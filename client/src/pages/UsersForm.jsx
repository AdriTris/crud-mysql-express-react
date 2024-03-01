import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik"; //biblioteca de react para validar inputs, entradas de usuario
//form crea el formulario y formik mantiene el estado
import { useUsers } from "../context/UserProvider";
import { useEffect, useState } from "react";

function UsersForm() {
  const { createUser, getUser, updateUser } = useUsers();
  const [user, setUser] = useState({
    name: "",
    username: "",
    position: "",
    age: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if (params.id) {
        const user = await getUser(params.id);
        console.log(user);
        setUser({
          name: user.name,
          username: user.username,
          position: user.position,
          age: user.age,
        });
      }
    };
    loadUser();
  }, []);

  return (
    <div>
      <h1 className=" text-4xl font-bold text-center">
        {params.id ? "Edit User" : "Create User"}
      </h1>
      <Formik
        initialValues={user}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);
          if (params.id) {
            await updateUser(params.id, values);
          } else {
            await createUser(values);
          }
          navigate("/");
          setUser({
            name: "",
            username: "",
            position: "",
            age: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col bg-gray-500 max-w-md rounded-md p-4 mx-auto mt-5"
          >
            <label>name</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="text"
              name="name"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.name}
            />

            <label>username</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="text"
              name="username"
              placeholder="Write a username"
              onChange={handleChange}
              value={values.username}
            />

            <label>position</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="text"
              name="position"
              placeholder="Write a position"
              onChange={handleChange}
              value={values.position}
            />

            <label>age</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="text"
              name="age"
              placeholder="Write a age"
              onChange={handleChange}
              value={values.age}
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
    </div>
  );
}

export default UsersForm;
