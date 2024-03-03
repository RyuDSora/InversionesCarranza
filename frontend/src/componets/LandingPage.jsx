import imagenX from "../imgs/imagenX.png"
import imagenM from "../imgs/imagenM.png"
import imagenV from "../imgs/imagenV.png"
import Container from "react-bootstrap/esm/Container";


export default function LandingPage() {
	const P_Mision = 'En Inversiones Carranza nuestra misión es proporcionar servicios de construcción'
  +'de alta calidad, cumpliendo con los más altos'
  +'estándares de seguridad, calidad, eficiencia y satisfacción del'
  +'cliente. \n'
  +'Nos comprometemos a desarrollar proyectos que mejoren la calidad'
  +'de vida de las personas y contribuyan al desarrollo sostenible'
  +'de distintas comunidades.\n'
  +'Todo bajo los principios filosóficos de integridad,'
  +'responsabilidad, innovación y trabajo en equipo.';
  const P_Vision = 'Seremos una empresa líder en el sector de la construcción, '
  +'reconocida por nuestra excelencia en la ejecución de proyectos y '
  +'la satisfacción del cliente. Buscamos mantener y fortalecer'
  +' nuestra posición como referentes en la prestación de servicios'
  +' de construcción, remodelación, diseño y mantenimiento de obras'
  +' civiles en el ámbito regional y nacional. Nos aseguraremos de'
  +' ofrecer soluciones innovadoras y eficientes a nuestros clientes'
  +' y así lograr proyectar una imagen sólida y confiable, tanto a'
  +' nivel local como internacional, consolidando así nuestra'
  +' reputación como una empresa de confianza y calidad en el mercado'
  +' de la construcción.';
  const P_Des = 'Somos una empresa que desempeña un papel fundamental en el sector '
  +'de la construcción en Honduras, brindando servicios de diseño,'
  +'construcción y mantenimiento de su hogar u oficina.\n'
  +'Centramos nuestra atención en la excelencia y la innovación,'
  +'buscando proporcionar un servicio excepcional con el objetivo de'
  +'lograr la plena satisfacción del cliente.';
  return (
    <Container>
      <section>
      <br />
      {Tabs(imagenX,'¿Quiénes somos?',P_Des,'casa')}
      <br />
      {Tabs(imagenM,'Misión',P_Mision,'mision')}
      <br />
      {Tabs(imagenV,'Visión',P_Vision,'vision')}
      <br />
    </section>
    </Container>
  );
}

 function Tabs(logo,nombre,parrafo,alter) {
  return(
    <div className="rounded-4 shadow-lg" style={{backgroundColor:'rgb(255,255,255,0.7)'}}>
        <div className="row">
          <div className="col-sm-6 mt-2 mb-2 pt-2 d-flex justify-content-center align-items-center">
            <img src={logo} alt={alter} style={{ width: 300, margin: 0 }} />
          </div>
          <div className="col-sm-6 mt-2 mb-2 pt-2">
            <div className="w-75 mx-auto">
              <p className="h3">{nombre}</p>
              <p className="text-center">
                {parrafo}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
 }