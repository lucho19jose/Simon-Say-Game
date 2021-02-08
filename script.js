const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
//swal('Hola!')

class Juego {
  constructor() { 
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarsecuencia()
    setTimeout(this.siguienteNivel,500)
  }

  inicializar() {
    //this.eliminarEventosClick = this.eliminarEventosClick.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar();
    this.nivel = 1
    this.colores = {//...array de colores
      celeste,
      violeta,
      naranja,
      verde,
    }
  }
  toggleBtnEmpezar()
  {
    if(btnEmpezar.classList.contains('hidden'))
    {
      btnEmpezar.classList.remove('hidden');
    }
    else
    {
      btnEmpezar.classList.add('hidden');
    }
  }

  generarsecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
  }

  siguienteNivel(){
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosCLick()
  }

  transformarNumeroAcolor(numero){
    switch (numero){
      case 0:
        return 'celeste'
      
      case 1:
        return 'violeta'
      
      case 2:
        return 'naranja'
      
      case 3:
        return 'verde'
      
    }
  }
  transformarcolorANumero(color){
    switch (color){
      case "celeste":
        return 0
      
      case "violeta":
        return 1
      
      case "naranja":
        return 2
      
      case "verde":
        return 3
      
    }
  }

  iluminarSecuencia(){
    for(let i=0; i< this.nivel; i++){
      let color = this.transformarNumeroAcolor(this.secuencia[i])
      setTimeout(()=> this.iluminarColor(color), 1000*i)
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }
  agregarEventosCLick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }
  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev){
    const nombreColor = ev.target.dataset.color 
    const numColor = this.transformarcolorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numColor === this.secuencia[this.subnivel]){
      this.subnivel ++
      if(this.subnivel === this.nivel){
        this.nivel ++
        //this.eliminarEventosClick()
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL+1)){
          this.ganoElJuego()
          this.toggleBtnEmpezar()
        }else{
          console.log("next level")
          console.log(nombreColor)
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    }else{
      this.eliminarEventosClick()
      console.log("perdio")
      console.log(nombreColor)
      this.perdioElJuego()
      this.toggleBtnEmpezar()
    }
  }

  ganoElJuego(){
    swal('Juego Javascript', 'You Won,=)!', 'success')
    .then(this.inicializar)
  }
  perdioElJuego(){
    swal('Juego Javascript', 'Sorry Try again!', 'error')
    .then(() => {
      this.eliminarEventosClick
      this.inicializar
    })
  }
}

function empezarJuego() {
  window.juego = new Juego()
}
