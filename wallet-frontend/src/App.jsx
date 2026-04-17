import React, { useMemo, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
    color: "#0f172a",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  container: {
    maxWidth: 1240,
    margin: "0 auto",
    padding: "32px 20px 56px",
  },
  hero: {
    background:
      "radial-gradient(circle at top left, rgba(99,102,241,0.35), transparent 28%), linear-gradient(135deg, #0f172a 0%, #111827 55%, #1e293b 100%)",
    color: "white",
    borderRadius: 28,
    padding: 32,
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.18)",
    marginBottom: 24,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#cbd5e1",
  },
  heroTitle: {
    margin: "18px 0 10px",
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: "-0.04em",
  },
  heroText: {
    margin: 0,
    maxWidth: 760,
    fontSize: 18,
    lineHeight: 1.65,
    color: "#cbd5e1",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(10px)",
    borderRadius: 22,
    padding: 20,
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  statLabel: {
    margin: 0,
    fontSize: 14,
    color: "#64748b",
    fontWeight: 600,
  },
  statValue: {
    margin: "12px 0 0",
    fontSize: 34,
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: "-0.04em",
  },
  bannerBase: {
    marginBottom: 20,
    padding: "14px 18px",
    borderRadius: 18,
    border: "1px solid",
    fontSize: 14,
    fontWeight: 600,
  },
  successBanner: {
    background: "#ecfdf5",
    borderColor: "#a7f3d0",
    color: "#047857",
  },
  errorBanner: {
    background: "#fef2f2",
    borderColor: "#fecaca",
    color: "#b91c1c",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 20,
  },
  card: {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(8px)",
    borderRadius: 24,
    border: "1px solid #e2e8f0",
    padding: 24,
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 18,
  },
  cardTitleWrap: { flex: 1 },
  cardTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },
  cardSubtitle: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: 14,
    lineHeight: 1.6,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    display: "grid",
    placeItems: "center",
    background: "#eef2ff",
    color: "#4338ca",
    fontSize: 20,
    flexShrink: 0,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 14,
  },
  fullWidth: { gridColumn: "1 / -1" },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 8 },
  label: {
    fontSize: 14,
    fontWeight: 700,
    color: "#334155",
  },
  input: {
    width: "100%",
    borderRadius: 16,
    border: "1px solid #cbd5e1",
    background: "white",
    padding: "14px 16px",
    fontSize: 15,
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    border: 0,
    borderRadius: 16,
    background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
    color: "white",
    padding: "14px 18px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(17,24,39,0.18)",
  },
  buttonDisabled: {
    opacity: 0.65,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  resultBox: {
    marginTop: 18,
    borderRadius: 18,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: 16,
  },
  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    padding: "7px 0",
    borderBottom: "1px solid #e2e8f0",
    fontSize: 14,
  },
  resultRowLast: { borderBottom: 0 },
  resultLabel: { color: "#64748b", fontWeight: 600 },
  resultValue: { color: "#0f172a", fontWeight: 700 },
  historyCard: {
    marginTop: 20,
    background: "rgba(255,255,255,0.92)",
    borderRadius: 24,
    border: "1px solid #e2e8f0",
    padding: 24,
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
  },
  helper: { margin: "14px 0 0", fontSize: 14, color: "#64748b" },
  tableWrap: {
    marginTop: 16,
    overflowX: "auto",
    borderRadius: 20,
    border: "1px solid #e2e8f0",
    background: "white",
  },
  table: {
    width: "100%",
    minWidth: 860,
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "14px 16px",
    fontSize: 13,
    color: "#475569",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    fontWeight: 800,
    letterSpacing: "0.02em",
  },
  td: {
    padding: "14px 16px",
    fontSize: 14,
    borderBottom: "1px solid #f1f5f9",
    color: "#0f172a",
    verticalAlign: "top",
  },
  emptyState: {
    padding: "34px 18px",
    textAlign: "center",
    color: "#64748b",
    fontSize: 15,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background: "#eef2ff",
    color: "#4338ca",
  },
};

function EmojiIcon({ children }) {
  return <span aria-hidden="true">{children}</span>;
}

function SectionCard({ title, subtitle, icon, children }) {
  return (
    <section style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.cardTitleWrap}>
          <h2 style={styles.cardTitle}>{title}</h2>
          <p style={styles.cardSubtitle}>{subtitle}</p>
        </div>
        <div style={styles.iconBox}>
          <EmojiIcon>{icon}</EmojiIcon>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, style, ...props }) {
  return (
    <label style={{ ...styles.fieldWrap, ...style }}>
      <span style={styles.label}>{label}</span>
      <input style={styles.input} {...props} />
    </label>
  );
}

function PrimaryButton({ children, disabled, style, ...props }) {
  return (
    <button
      disabled={disabled}
      style={{ ...styles.button, ...(disabled ? styles.buttonDisabled : {}), ...style }}
      {...props}
    >
      {children}
    </button>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statLabel}>{label}</p>
      <p style={styles.statValue}>{value}</p>
    </div>
  );
}

function ResultRow({ label, value, last = false }) {
  return (
    <div style={{ ...styles.resultRow, ...(last ? styles.resultRowLast : {}) }}>
      <span style={styles.resultLabel}>{label}</span>
      <span style={styles.resultValue}>{value}</span>
    </div>
  );
}

export default function WalletFrontend() {
  const [userName, setUserName] = useState("");
  const [createdUser, setCreatedUser] = useState(null);

  const [topupUserId, setTopupUserId] = useState("");
  const [topupAmount, setTopupAmount] = useState("");
  const [topupDescription, setTopupDescription] = useState("");

  const [balanceUserId, setBalanceUserId] = useState("");
  const [balanceData, setBalanceData] = useState(null);

  const [fromUserId, setFromUserId] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferDescription, setTransferDescription] = useState("");
  const [transferResult, setTransferResult] = useState(null);

  const [movementsUserId, setMovementsUserId] = useState("");
  const [movements, setMovements] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const clearStatus = () => {
    setMessage("");
    setError("");
  };

  const request = async (url, options = {}) => {
    let response;

    try {
      response = await fetch(`${API_BASE}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        ...options,
      });
    } catch {
      throw new Error(
        "No pude conectar con el backend. Revisa que FastAPI siga corriendo y que tengas CORS habilitado."
      );
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.detail || "Algo salió mal en la petición.");
    }

    return data;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    clearStatus();
    setLoading(true);
    try {
      const data = await request("/users", {
        method: "POST",
        body: JSON.stringify({ name: userName }),
      });
      setCreatedUser(data);
      setMessage("Usuario creado correctamente.");
      setUserName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTopup = async (e) => {
    e.preventDefault();
    clearStatus();
    setLoading(true);
    try {
      const data = await request(`/accounts/${topupUserId}/topup`, {
        method: "POST",
        body: JSON.stringify({
          amount: Number(topupAmount),
          description: topupDescription || null,
        }),
      });
      setMessage(`Recarga exitosa. Nuevo saldo: $${data.balance}`);
      setTopupAmount("");
      setTopupDescription("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBalance = async (e) => {
    e.preventDefault();
    clearStatus();
    setLoading(true);
    try {
      const data = await request(`/accounts/${balanceUserId}/balance`);
      setBalanceData(data);
      setMessage("Saldo consultado correctamente.");
    } catch (err) {
      setError(err.message);
      setBalanceData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    clearStatus();
    setLoading(true);
    try {
      const data = await request(`/transfers`, {
        method: "POST",
        body: JSON.stringify({
          from_user_id: Number(fromUserId),
          to_user_id: Number(toUserId),
          amount: Number(transferAmount),
          description: transferDescription || null,
        }),
      });
      setTransferResult(data);
      setMessage("Transferencia realizada correctamente.");
      setTransferAmount("");
      setTransferDescription("");
    } catch (err) {
      setError(err.message);
      setTransferResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMovements = async (e) => {
    e.preventDefault();
    clearStatus();
    setLoading(true);
    try {
      const data = await request(`/accounts/${movementsUserId}/movements`);
      setMovements(data);
      setMessage("Historial cargado correctamente.");
    } catch (err) {
      setError(err.message);
      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  const movementCountText = useMemo(() => {
    if (!movements.length) return "No hay movimientos todavía.";
    return `${movements.length} movimiento(s) encontrados.`;
  }, [movements]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.badge}>Peer to peer wallet</div>
          <h1 style={styles.heroTitle}>Wallet App</h1>
          <p style={styles.heroText}>
            Demo funcional para crear usuarios, cargar saldo, transferir dinero y consultar el historial de movimientos con una interfaz limpia y lista para presentar.
          </p>
        </section>

        <section style={styles.statsGrid}>
          <StatCard label="Último usuario creado" value={createdUser ? `#${createdUser.id}` : "-"} />
          <StatCard label="Último saldo consultado" value={balanceData ? `$${balanceData.balance}` : "-"} />
          <StatCard label="Movimientos cargados" value={String(movements.length)} />
        </section>

        {(message || error) && (
          <div
            style={{
              ...styles.bannerBase,
              ...(error ? styles.errorBanner : styles.successBanner),
            }}
          >
            {error || message}
          </div>
        )}

        <section style={styles.grid}>
          <SectionCard
            title="Crear usuario"
            subtitle="Crea una cuenta nueva con saldo inicial en cero."
            icon="👤"
          >
            <form onSubmit={handleCreateUser} style={styles.formGrid}>
              <Field
                label="Nombre"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ej: Manolo"
                required
                style={styles.fullWidth}
              />
              <PrimaryButton type="submit" disabled={loading} style={{ width: "fit-content" }}>
                Crear usuario
              </PrimaryButton>
            </form>

            {createdUser && (
              <div style={styles.resultBox}>
                <ResultRow label="ID usuario" value={createdUser.id} />
                <ResultRow label="ID cuenta" value={createdUser.account_id} />
                <ResultRow label="Saldo inicial" value={`$${createdUser.balance}`} last />
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Cargar saldo"
            subtitle="Simula una recarga de dinero a una cuenta existente."
            icon="💸"
          >
            <form onSubmit={handleTopup} style={styles.formGrid}>
              <Field
                label="User ID"
                type="number"
                value={topupUserId}
                onChange={(e) => setTopupUserId(e.target.value)}
                required
              />
              <Field
                label="Monto"
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                required
              />
              <Field
                label="Descripción"
                value={topupDescription}
                onChange={(e) => setTopupDescription(e.target.value)}
                placeholder="Saldo inicial"
                style={styles.fullWidth}
              />
              <PrimaryButton type="submit" disabled={loading} style={{ width: "fit-content" }}>
                Cargar saldo
              </PrimaryButton>
            </form>
          </SectionCard>

          <SectionCard
            title="Consultar saldo"
            subtitle="Obtén el saldo actual de un usuario registrado."
            icon="📊"
          >
            <form onSubmit={handleBalance} style={styles.formGrid}>
              <Field
                label="User ID"
                type="number"
                value={balanceUserId}
                onChange={(e) => setBalanceUserId(e.target.value)}
                required
                style={styles.fullWidth}
              />
              <PrimaryButton type="submit" disabled={loading} style={{ width: "fit-content" }}>
                Consultar
              </PrimaryButton>
            </form>

            {balanceData && (
              <div style={styles.resultBox}>
                <ResultRow label="ID usuario" value={balanceData.user_id} />
                <ResultRow label="ID cuenta" value={balanceData.account_id} />
                <ResultRow label="Saldo actual" value={`$${balanceData.balance}`} last />
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Transferir saldo"
            subtitle="Mueve dinero entre dos usuarios registrados."
            icon="🔁"
          >
            <form onSubmit={handleTransfer} style={styles.formGrid}>
              <Field
                label="User ID origen"
                type="number"
                value={fromUserId}
                onChange={(e) => setFromUserId(e.target.value)}
                required
              />
              <Field
                label="User ID destino"
                type="number"
                value={toUserId}
                onChange={(e) => setToUserId(e.target.value)}
                required
              />
              <Field
                label="Monto"
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                required
              />
              <Field
                label="Descripción"
                value={transferDescription}
                onChange={(e) => setTransferDescription(e.target.value)}
                placeholder="Pago cena"
              />
              <PrimaryButton type="submit" disabled={loading} style={{ width: "fit-content" }}>
                Transferir
              </PrimaryButton>
            </form>

            {transferResult && (
              <div style={styles.resultBox}>
                <ResultRow label="Saldo origen" value={`$${transferResult.from_balance}`} />
                <ResultRow label="Saldo destino" value={`$${transferResult.to_balance}`} last />
              </div>
            )}
          </SectionCard>
        </section>

        <section style={styles.historyCard}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitleWrap}>
              <h2 style={styles.cardTitle}>Historial de movimientos</h2>
              <p style={styles.cardSubtitle}>
                Consulta los movimientos asociados a un usuario y visualiza la trazabilidad de sus operaciones.
              </p>
            </div>
            <div style={styles.iconBox}>
              <EmojiIcon>📜</EmojiIcon>
            </div>
          </div>

          <form onSubmit={handleMovements} style={styles.formGrid}>
            <Field
              label="User ID"
              type="number"
              value={movementsUserId}
              onChange={(e) => setMovementsUserId(e.target.value)}
              required
              style={styles.fullWidth}
            />
            <PrimaryButton type="submit" disabled={loading} style={{ width: "fit-content" }}>
              Ver historial
            </PrimaryButton>
          </form>

          <p style={styles.helper}>{movementCountText}</p>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Tx ID</th>
                  <th style={styles.th}>Tipo</th>
                  <th style={styles.th}>Dirección</th>
                  <th style={styles.th}>Monto</th>
                  <th style={styles.th}>Estado</th>
                  <th style={styles.th}>Descripción</th>
                  <th style={styles.th}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {movements.length === 0 ? (
                  <tr>
                    <td style={styles.emptyState} colSpan={7}>
                      No hay movimientos para mostrar.
                    </td>
                  </tr>
                ) : (
                  movements.map((item) => (
                    <tr key={`${item.transaction_id}-${item.direction}-${item.created_at}`}>
                      <td style={styles.td}>{item.transaction_id}</td>
                      <td style={styles.td}>{item.type}</td>
                      <td style={styles.td}>
                        <span style={styles.chip}>{item.direction}</span>
                      </td>
                      <td style={styles.td}>${item.amount}</td>
                      <td style={styles.td}>{item.status}</td>
                      <td style={styles.td}>{item.description || "-"}</td>
                      <td style={styles.td}>{new Date(item.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
