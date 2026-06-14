export default function CMSHomePage() {
  return (
    <main
      style={{
        alignItems: "center",
        display: "flex",
        fontFamily: "system-ui, sans-serif",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "40rem", textAlign: "center" }}>
        <h1>Undersea Expeditions CMS</h1>
        <p>Edit trips, homepage content, socials, contact details, about content, and FAQs in Payload.</p>
        <p>
          Open <a href="/admin">/admin</a> to manage content.
        </p>
      </div>
    </main>
  );
}
