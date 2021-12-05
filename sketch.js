// IMPORTAÇÃO
import p5 from 'node-p5';

// PALETA DE CORES
var colors = [
  //blues 01
  "rgba(100, 176, 254, 1)",
  ,
  // blues 02
  "rgba(147, 144, 254, 1)",

  //purples 01
  "rgba(199, 119, 254, 1)",

  //purples 02
  "rgba(243, 106, 254, 1)",

  //reds 01
  "rgba(254, 110, 205, 1)",

  //reds 02
  "rgba(254, 130, 112, 1)",

  //yellow 01
  "rgba(235, 159, 35, 1)",

  //yellow 02
  "rgba(189, 191, 0, 1)",

  //green 01
  "rgba(137, 217, 0, 1)",

  //green 02
  "rgba(93, 229, 48, 1)",

  // teal 01
  "rgba(69, 225, 130, 1)",

  //teal 02
  "rgba(72, 206, 223, 1)",
];

var starsColors = [
  //blues 01
  "rgba(193, 224, 254, 1)",

  // blues 02
  "rgba(212, 211, 254, 1)",

  //purples 01
  "rgba(233, 200, 254, 1)",

  //purples 02
  "rgba(251, 195, 254, 1)",

  //reds 01
  "rgba(254, 197, 235, 1)",

  //reds 02
  "rgba(254, 205, 198, 1)",

  //yellow 01
  "rgba(247, 217, 166, 1)",

  //yellow 02
  "rgba(229, 230, 149, 1)",

  //green 01
  "rgba(208, 240, 151, 1)",

  //green 02
  "rgba(190, 245, 171, 1)",
  
  // teal 01
  "rgba(180, 243, 205, 1)",

  //teal 02
  "rgba(181, 236, 243, 1)",
];

var colorSet;

// CRIAÇÃO DE FUNÇÃO
export default function getGif(stars) {

  // VARIÁVEL PARA GUARDAR OS FRAMES
  let GIF = [];

  // IMPORTAÇÃO DE FONTE
  let pressStart = p5.loadFont("fonts/Mister Pixel Regular.otf");

  // DEFINIÇÃO DE MÓDULO
  class Module {
    constructor(xOff, yOff, x, y, speed, unit) {
      this.xOff = xOff;
      this.yOff = yOff;
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.unit = unit;
      this.xDir = 1;
      this.yDir = 1.618;
    }

    // CONFIGURAÇÃO DE ATUALIZAÇÃO
    update() {
      this.x = this.x + this.speed * this.xDir;
      if (this.x >= this.unit || this.x <= 0) {
        this.xDir *= -1;
        this.x = this.x + 1 * this.xDir;
      }
      this.y = this.y + this.speed * this.yDir;
      if (this.y >= this.unit || this.y <= 0) {
        this.yDir *= -1;
        this.y = this.y + 1 * this.yDir;
      }
    }

    // DESENHO DE CADA ESTRELA
    draw(p) {
      p.fill(starsColors[p.floor(p.random(0,12))]);
      p.strokeWeight(0);
      t = t + 1;
      p.circle(this.xOff + this.x, this.yOff + this.y, p.noise(t) * 2.5);
      p.ellipse(
        this.xOff + this.x,
        this.yOff + this.y,
        p.noise(t) * 13,
        p.sin(t)
      );
      p.ellipse(
        this.xOff + this.x,
        this.yOff + this.y,
        p.sin(t),
        p.noise(t) * 13
      );
    }
  }

  // DEFINIÇÃO DE VARIÁVEIS
  let unit;
  let count;
  let mods = [];
  let t = 0;
  let results = stars[0];

  //FUNÇÃO DE DESENHO
  function sketch(p) {
    //CONFIGURAÇÃO DE TELA
    p.setup = () => {
      let canvas = p.createCanvas(800, 800);
      p.noStroke();
      
      colorSet = p.floor(p.random(0,12));
      
      // CONFIGURAÇÃO DE MARGEM
      let moldure = 150;
      let nWidth = 800 - moldure;
      let nHeight = 800 - moldure;

      // EQUAÇÃO DE DESTRIBUIÇÃO DE ESTRELAS
      unit = Math.sqrt((nWidth * nHeight) / results);

      let wideCount = nWidth / unit;
      let highCount = nHeight / unit;
      count = wideCount * highCount;

      // LOOP DE CRIAÇÃO DE CADA ESTRELA
      let index = 0;

      for (let y = 0; y < highCount; y++) {
        for (let x = 0; x < wideCount; x++) {
          mods[index++] = new Module(
            x * unit + moldure / 2,
            y * unit + moldure / 2,
            unit / 2,
            unit / 2,
            p.random(0.05, 0.25),
            unit
          );
        }
      }

      // RENDERIZADOR
      const renderer = setTimeout(() => {
        console.log("Exportando...");
        p.saveFrames(canvas, "output", GIF, 2, 7);
        console.log("Exportado!)");
        clearTimeout(renderer)
      }, 1000 * 60);
    };

    // 
    p.draw = () => {

      // CONFIGURAÇÃO DE FUNDO
      p.background(0, 0, 42);

      p.loadPixels();
      for (var x = 0; x < 800; x++) {
        for (var y = 0; y < 800; y++) {
          var index = (x + y * 800) * 4;
          p.pixels[index + 0] = y / 16 - 30;
          p.pixels[index + 1] = 0;
          p.pixels[index + 2] = y / 8 - 30;
          p.pixels[index + 3] = 255;
        }
      }
      p.updatePixels();

      // DEFINIÇÃO DE COR DE DESTAQUE
      var accentColor = colors[colorSet];

      // LOOP DE ATUALIZAÇÃO DE ESTRELAS
      for (let i = 0; i < count; i++) {
        mods[i].update();
        mods[i].draw(p);
      }

      // DESENHO DE MARGEM PRETA
      p.noFill();
      p.stroke(0);
      p.strokeWeight(125);
      p.square(0, 0, 800, 100);

      // DESENHO DE MARGEM DESTACADA
      p.stroke(accentColor);
      p.strokeWeight(5);
      p.square(62, 62, 675, 45);

      // TEXTO
      p.noStroke();
      p.textSize(24);
      p.textFont(pressStart);
      p.textAlign(p.CENTER , p.BOTTOM)
      p.fill(accentColor);
      p.text("@ceubrbot", p.width / 2, p.height / 18);
      p.text(results + " vítimas em " + stars[1] + ".", p.width / 2, p.height / 1.0275);

      // TIMER DE ENCERRAÇÃO
      setTimeout(()=>{
        p.noLoop()
      }, 1000 * 60 * 3)
    };
  }
  let p5Instance = p5.createSketch(sketch);
}
