import imagenX from "../imgs/imagenX.png"
import imagenM from "../imgs/imagenM.png"
import imagenV from "../imgs/imagenV.png"

export default function LandingPage() {
	
  return (
    <section>
      <br />
      <div className="border rounded-4 bg-light">
        <div className="row">
          <div className="col mt-2 mb-2 pt-2">
            <img src={imagenX} alt="Casa" style={{ width: 300, margin: 0 }} />
          </div>
          <div className="col mt-2 mb-2 pt-2">
            <p className="h3">¿Quiénes somos?</p>
            <p className="text-center">
              Somos una empresa que desempeña un papel fundamental en el sector
              de la construcción en Honduras, brindando servicios de diseño,
              construcción y mantenimiento de su hogar u oficina.
              <br />
              <br />
              Centramos nuestra atención en la excelencia y la innovación,
              buscando proporcionar un servicio excepcional con el objetivo de
              lograr la plena satisfacción del cliente.
            </p>
          </div>
        </div>
      </div>
      <br />
      <div className="border rounded-4 bg-light">
        <div className="row">
          <div className="col mt-2 mb-2 pt-2">
            <img src={imagenM} alt="Casa" style={{ width: 300, margin: 0 }} />
          </div>
          <div className="col mt-2 mb-2 pt-2">
            <div className="w-75 mx-auto">
              <p className="h3">Misión</p>
              <p className="text-center ">
                En Inversiones Carranza nuestra misión es proporcionar servicios
                de construcción de alta calidad, cumpliendo con los más altos
                estándares de seguridad, calidad, eficiencia y satisfacción del
                cliente.
                <br />
                Nos comprometemos a desarrollar proyectos que mejoren la calidad
                de vida de las personas y contribuyan al desarrollo sostenible
                de distintas comunidades.
                <br />
                Todo bajo los principios filosóficos de integridad,
                responsabilidad, innovación y trabajo en equipo.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="border rounded-4 bg-light">
        <div className="row">
          <div className="col mt-2 mb-2 pt-2">
            <img src={imagenV} alt="Casa" style={{ width: 300, margin: 0 }} />
          </div>
          <div className="col mt-2 mb-2 pt-2">
            <div className="w-75 mx-auto">
              <p className="h3">Visión</p>
              <p className="text-center">
                Seremos una empresa líder en el sector de la construcción,
                reconocida por nuestra excelencia en la ejecución de proyectos y
                la satisfacción del cliente. Buscamos mantener y fortalecer
                nuestra posición como referentes en la prestación de servicios
                de construcción, remodelación, diseño y mantenimiento de obras
                civiles en el ámbito regional y nacional. Nos aseguraremos de
                ofrecer soluciones innovadoras y eficientes a nuestros clientes
                y así lograr proyectar una imagen sólida y confiable, tanto a
                nivel local como internacional, consolidando así nuestra
                reputación como una empresa de confianza y calidad en el mercado
                de la construcción.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
    </section>
  );
}
