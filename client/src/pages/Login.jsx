import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik"; //biblioteca de react para validar inputs, entradas de usuario
import { getLogin } from "../api/login.api";
import { useLogin } from "../context/UserProvider";

function Login() {
  const { login } = useLogin();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className=" text-4xl font-bold text-center">Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, actions) => {
          //   if (!values.name || !values.last_name) {
          //     console.log("All fields are required");
          //     return; // Detener el envío del formulario
          //   }
          try {
            const response = await getLogin(values.email, values.password);
            const userData = response.data;
            const token = response.data.token;

            console.log(userData, token); // Verifica qué datos devuelve el servidor
            if (response.status === 200 && token) {
              console.log("Login successful!!!!!!");
              navigate("/clients");
              localStorage.setItem("token", token);
              login();
            } else {
              console.log("Incorrect email or password");
            }
          } catch (error) {
            console.error("Error during login:", error);
            // Muestra un mensaje de error o realiza alguna otra acción
          }
          actions.setSubmitting(false); // Importante: marca el formulario como no enviado
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col bg-gray-500 max-w-md rounded-md p-4 mx-auto mt-5"
          >
            <label>Name</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="text"
              name="email"
              placeholder="Write a email"
              onChange={handleChange}
              value={values.email}
            />

            <label>Password</label>
            <input
              className="px-2 py-1 text-black rounded-sm"
              type="password"
              name="password"
              placeholder="Write a password"
              onChange={handleChange}
              value={values.password}
            />

            <button
              type="submit"
              className=" py-1 px-3 bg-green-500 rounded-md cursor-pointer mt-3"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
