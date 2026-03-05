import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Inicio() {
  const [usuario, setUsuario] = useState(null); //acá vamos a guardar los datos del usuario, arrancamos en null para que esté vacío.
  const navigate = useNavigate();
  const [panelOpen, setPanelOpen] = useState(false);
  const [operaciones, setOperaciones] = useState([]);
  const [fechaOperacion, setFechaOperacion] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [ticker, setTicker] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [moneda, setMoneda] = useState("ARS");

  //Que queremos cambiar haciendo check?
  const checkIdOperacion = (id) => {
    if (seleccionado.includes(id)) {
      setSeleccionado(seleccionado.filter(index => index !== id)); //.filter() -> eliminamos ese id que ya estaba.
    }else{
      setSeleccionado([...seleccionado, id]); //con el ... estamos creando una copia del array y agregandole un id.
    }
  }

  const eliminarOperacion = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Sesión expirada");
      return;
    }

    if (seleccionado.length === 0) {
      alert("No seleccionaste ninguna operación. Seleccione al menos 1.");
    }else{
        const nuevoSeleccionado = seleccionado.map(id => `ids=${id}`);
        const idsAEliminar = nuevoSeleccionado.join("&");
        try {
          const respuesta = await fetch(`http://localhost:5045/api/Operacion?${idsAEliminar}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (respuesta.ok) {
          alert("Operaciones eliminadas correctamente.");
          buscarOperaciones(usuario.id, token);
          setSeleccionado([]);
        }
        else{
          alert("Error al eliminar las operaciones seleccionadas.");
        }
        } catch (error) {
          
        }
    }
  }

  const buscarOperaciones = async (id, token) => {
    const respuesta = await fetch(
      `http://localhost:5045/api/Operacion/usuario/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (respuesta.ok) {
      const resultado = await respuesta.json(); // trae la respuesta del JSON.
      setOperaciones(resultado);
      // const operacionesConPrecioActual = await Promise.all(
      //   resultado.map(async (r) => {
      //     const precioActual = await buscarPrecioCedear(r.ticker)
      //     return{
      //       ...r,
      //       precioActual
      //     }
      //   })
      // )
      //setOperaciones(operacionesConPrecioActual);
    } else {
      console.log(await respuesta.text());
    }
  }

  const agregarOperacion = async (e) =>{
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Sesión expirada");
      return;
    }

    const operacion = {
      IdUsuario: Number(usuario.id),
      FechaOperacion: fechaOperacion,
      TipoOperacion: tipoOperacion,
      Moneda: moneda || "ARS",
      Ticker: ticker,
      Cantidad: Number(cantidad),
      Precio: Number(precio)
    }
    try {
      const respuesta = await fetch('http://localhost:5045/api/Operacion',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(operacion),
        });
        if (respuesta.ok) {
          const resultado = await respuesta.json();
          alert("Operación agregada exitosamente.");
          setPanelOpen(false);
          buscarOperaciones(usuario.id, token);
        } else {
          alert("Error al cargar la operación. Vuelva a intentarlo!");
        }  

    } catch (error) {
      console.error("Error real:", error);
    }
  }
  // ------------------------------------------------ ESTO ESTARÍA GENIAL CON UNA API QUE NO TENGA LIMITE
  // const buscarPrecioCedear = async (ticker) =>{
  //   try {
  //     const response = await fetch(`http://localhost:5045/api/Operacion/precio/${ticker}`);

  //     if (response.ok) {
  //       const data = await response.json()
  //       if (data["Global Quote"]["05. price"]) {
  //         setPrecio(Number(data["Global Quote"]["05. price"]))
  //       }else{
  //         return;
  //       }
  //     }
  //   } catch (error) {
      
  //   }
  // }

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const decoded = jwtDecode(token);

  const usuarioLimpio = {
    id: Number(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]),
    email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
    nombre: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
  };

  setUsuario(usuarioLimpio);

  // 🔥 Llamada directa acá
  buscarOperaciones(usuarioLimpio.id, token);

}, []);

  return (
    <>
      <nav className="relative bg-gray-800/50 border-b border-white/10">
        <div className="w-full px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo + Links */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a className="font-bold text-white pt-1">Bienvenido/a</a>
                  <a className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">
                    Mis cedears
                  </a>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:ml-6 sm:pr-0">

              {/* Profile */}
              <div className="relative ml-3 text-white border-2 border-blue-500 rounded-full px-4 py-2">
                <button>Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full bg-gray-500 p-10 text-center border border-gray-800 rounded-lg shadow">
        <h1 className="text-white font-bold text-5xl">MIS CEDEARS</h1>
        <h2 className="text-white text-2xl pt-4">Acá vas a ver los cedears que tenes en tu cartera</h2>
      </div>
      <div>
        <button onClick={() => setPanelOpen(true)} className="bg-green-700 mt-2 mb-2 p-2 border border-white-500 rounded-lg shadow text-white ml-2">Agregar Operación</button>
        <button onClick={eliminarOperacion} className="bg-red-700 mt-2 mb-2 p-2 border border-white-500 rounded-lg shadow text-white ml-2">Eliminar Operación</button>
      </div>
      <div className="w-full p-2">
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th>
                  <input
                    type="checkbox" 
                  />
              </th>
                <th className="p-3">Id Operacion</th>
                <th className="p-3">Fecha Operación</th>
                <th className="p-3">Tipo Operación</th>
                <th className="p-3">Moneda</th>
                <th className="p-3">CEDEAR</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Precio</th>
                <th className="p-3">P/A Acción</th>
              </tr>
            </thead>

            <tbody>
              {operaciones.map((op, index) => (
                <tr key={index} className="border-b">
                  <td>
                    <input 
                      type="checkbox"
                      onChange={() => checkIdOperacion(op.idOperacion)}
                      checked = {seleccionado.includes(op.idOperacion)}
                    />
                  </td>
                  <td className="p-3">{op.idOperacion}</td>
                  <td className="p-3">{op.fechaOperacion}</td>
                  <td className="p-3">{op.tipoOperacion}</td>
                  <td className="p-3">{op.moneda}</td>
                  <td className="p-3 font-medium">{op.ticker}</td>
                  <td className="p-3">{op.cantidad}</td>
                  <td className="p-3">${op.precio}</td>
                  <td className="p-3">${op.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {panelOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-white w-[400px] rounded-xl p-6 shadow-xl relative">
            
            <button
              onClick={() => setPanelOpen(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
            >
              X
            </button>

            <h2 className="text-xl font-bold mb-4">Nueva Operación</h2>

            <input
              type="date"
              placeholder="Fecha de la operación"
              className="w-full border p-2 mb-3 rounded"
              onChange={(e) => setFechaOperacion(e.target.value)}
            />

            <select onChange={(e) => setTipoOperacion(Number(e.target.value))}>
              <option value={0}>Compra</option>
              <option value={1}>Venta</option>
            </select>

            <input
              type="text"
              placeholder="Moneda"
              className="w-full border p-2 mb-3 rounded"
              onChange={(e) => setMoneda(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Cedear"
              className="w-full border p-2 mb-3 rounded"
              onChange={(e) => setTicker(e.target.value.toUpperCase().trim())}
              // onBlur={buscarPrecioCedear(ticker)}
            />

            <input
              type="number"
              placeholder="Cantidad"
              className="w-full border p-2 mb-3 rounded"
              onChange={(e) => setCantidad(e.target.value)}
            />

            <input
              type="number"
              placeholder="Precio"
              className="w-full border p-2 mb-3 rounded"
              // value={Number(precio)}
              onChange={(e) => setPrecio(e.target.value)}
            />

            <button onClick={agregarOperacion} className="w-full bg-green-600 text-white p-2 rounded">
              Guardar
            </button>

          </div>
        </div>
      )}
    </>
  );

};
export default Inicio;
