import { useMemo, useState } from "react";

const API_BASE_URL = "http://localhost:8080";

async function postJson(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.message || "Error inesperado";
    throw new Error(message);
  }

  return data;
}

export default function App() {
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [session, setSession] = useState(null);

  const subtitle = useMemo(
    () =>
      mode === "login"
        ? "Accede con tus credenciales y se guardara la cookie de sesion emitida por el backend."
        : "Crea tu cuenta enviando email, password y nombre completo.",
    [mode]
  );

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const path = mode === "login" ? "/api/login" : "/api/register";
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { email: form.email, password: form.password, fullName: form.fullName };

      const data = await postJson(path, payload);
      setSession(data);
      setSuccess(mode === "login" ? "Login correcto, cookie guardada." : "Registro realizado y sesion iniciada.");
    } catch (err) {
      setError(err.message || "No se pudo completar la peticion.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await postJson("/api/logout", {});
      setSession(null);
      setSuccess("Sesion cerrada.");
    } catch (err) {
      setError(err.message || "No se pudo cerrar sesion.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setSuccess("");
    setForm({ email: "", password: "", fullName: "" });
  };

  return (
    <div className="app">
      <div className="layout">
        <header className="hero">
          <p className="eyebrow">login-front</p>
          <h1>Autenticacion lista para Backstage</h1>
          <p className="subtitle">{subtitle}</p>
          <div className="pills">
            <span className="pill">Base URL: {API_BASE_URL}</span>
            <span className="pill">Cookies habilitadas</span>
          </div>
        </header>

        <section className="panel">
          <div className="tabs">
            <button
              type="button"
              className={mode === "login" ? "tab active" : "tab"}
              onClick={() => switchMode("login")}
              disabled={loading}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "register" ? "tab active" : "tab"}
              onClick={() => switchMode("register")}
              disabled={loading}
            >
              Registro
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="usuario@ejemplo.com"
                required
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimo 8 caracteres"
                required
              />
            </label>

            {mode === "register" && (
              <label className="field">
                <span>Nombre completo</span>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                />
              </label>
            )}

            <button className="primary" type="submit" disabled={loading}>
              {loading ? "Enviando..." : mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>

          {(error || success) && (
            <div className={error ? "alert error" : "alert success"}>{error || success}</div>
          )}
        </section>

        <section className="session">
          <div className="session-header">
            <div>
              <p className="eyebrow">Estado de sesion</p>
              <h2>{session ? "Sesion activa" : "No hay sesion"}</h2>
            </div>
            {session && (
              <button type="button" className="ghost" onClick={handleLogout} disabled={loading}>
                Cerrar sesion
              </button>
            )}
          </div>
          {session ? (
            <div className="session-card">
              <p>
                <strong>Usuario:</strong> {session.fullName || "Sin nombre"}
              </p>
              <p>
                <strong>Email:</strong> {session.email}
              </p>
              <p>
                <strong>ID:</strong> {session.id}
              </p>
              <p className="muted">
                La cookie de sesion se guarda automaticamente al recibir la respuesta del backend.
              </p>
            </div>
          ) : (
            <p className="muted">
              Inicia sesion o registra un usuario para recibir la cookie de Symfony (PHPSESSID) y poder consumir
              el resto de APIs protegidas.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
