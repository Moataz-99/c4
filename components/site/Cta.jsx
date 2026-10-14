export default function Cta({ c }) {
  return (
    <section id="cta" data-move="4">
      <div className="wrap">
        <div className="final reveal">
          <h2>{c.title}</h2>
          <p>{c.text}</p>
          <a href="#contact" className="btn btn-light btn-lg">{c.button}</a>
        </div>
      </div>
    </section>
  );
}
