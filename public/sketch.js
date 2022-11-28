
var socket;

class Figura{
  constructor(x,y) {
    this.x = x
    this.y = y
    this.alto = 100
    this.ancho = 200
    this.tamañoDeTextoNombre = 20
    this.tamañoDeTextoEstereotipo = 10
    this.tamañoDeTextoDescripcion = 13
    this.seleccionado = false
    this.nombre = "{nombre}"
    this.estereotipo = "{estereotipo}"
    this.descripcion = "{descripcion}"
    this.centroX = this.x + this.ancho / 2  
    this.centroY = this.y + this.alto / 2
    this.colorCajaDeMovimiento = color(255,255,255)
  }

  reconstruirFigura(elOtroObjeto){
    this.x = elOtroObjeto.x
    this.y = elOtroObjeto.y
    this.alto = elOtroObjeto.alto
    this.ancho = elOtroObjeto.ancho
    this.nombre = elOtroObjeto.nombre
    this.descripcion = elOtroObjeto.descripcion
    this.centroX = elOtroObjeto.centroX
    this.centroY = elOtroObjeto.centroY 
  }
  set setCentroX (centrox){
    this.centroX = centrox
  }
  set setCentroY(centroy){
    this.centroY = centroy
  }
  get getCentroX(){
    return this.centroX
  }
  get getCentroY(){
    return this.centroY
  }
  set setNombre(nombre){
    this.nombre = nombre
  }
  get getNombre(){
    return this.nombre
  }
  set setDescripcion(descripcion){
    this.descripcion = descripcion
  }
  get getDescripcion(){
    return this.descripcion
  }
  get getEstereotipo(){
    return this.estereotipo
  }
  set setAncho(ancho){
    this.ancho = ancho
    this.centroX = this.x + this.ancho/2
  }
  get getAncho(){
    return this.ancho
  }
  set setAlto(alto){
    this.alto = alto
    this.centroY = this.y +this.alto/2
  }
  get getAlto(){
    return this.alto
  }
  get getSeleccionado(){
    return this.seleccionado
  }
  set setSeleccionado(seleccionado){
    this.seleccionado = seleccionado
  }
  set setX(x){
    this.x = x
    this.centroX = this.x + this.ancho /2
  }
  get getX(){
    return this.x
  }
  set setY(y){
    this.y = y
    this.centroY = this.y + this.alto/2
  }
  get getY(){
    return this.y
  }
  enAreaCentral(x, y){
    if(this.x < x && this.x + this.ancho > x && this.y < y && this.y + this.alto > y){
      return true
    }else{
      return false
    }
  }
  dibujarCajaEnMovimiento(){
    push()
    if(this.seleccionado){
      fill(this.colorCajaDeMovimiento)
      rect(this.x + this.ancho, this.y, 20, 20)
      rect(this.x, this.y + this.alto, 20, 20)
    }
    pop()
  }
  dibujarTexto(){
    push()
    fill(255, 255, 255)
    textAlign(CENTER, CENTER)
    textSize(this.tamañoDeTextoEstereotipo)
    text(`[${this.getEstereotipo}]`, this.getCentroX, this.getY+40)
    textSize(this.tamañoDeTextoDescripcion)
    text(this.getDescripcion, this.getX+10, this.getY+60, this.getAncho-15)
    textStyle(BOLD)
    textSize(this.tamañoDeTextoNombre)
    text(this.getNombre, this.getCentroX, this.getY+20)
    pop()
  }
  enCajaDerecha(x, y){
    if(this.x + this.ancho < x && this.x + this.ancho+20 > x && y > this.y && y < this.y+20){
      return true
    }
    return false
  }
  enCajaIzquierda(x,y){
    if(this.x < x && this.x +20 > x && y > this.y + this.alto && y < this.y + this.alto +20){
      return true
    }
    return false
  }
}

class Persona extends Figura{
    constructor(x, y){
      super(x,y)
      super.estereotipo = "Person"
    }
    draw(){
      push();
      fill(8, 66, 123)
      rect(this.x, this.y, this.ancho, this.alto, 20)
      circle(this.x + this.ancho/2, this.y-50, 53)      
      super.dibujarTexto()
      super.dibujarCajaEnMovimiento()
      pop()
    }
}

class Database extends Figura{
  constructor(x, y){
    super(x,y)
    super.estereotipo = "Database"
  }
  draw(){
    push();
    stroke(color(138, 138, 138))
    fill(17, 104, 189)
    rect(this.x, this.y, this.ancho, this.alto-1, 10)
    ellipse(this.x + this.ancho/2, this.y+5, this.ancho, 25)
    noStroke()
    ellipse(this.x + this.ancho/2, this.y+94.9, this.ancho, 26)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Mobile extends Figura{
  constructor(x, y){
    super(x,y)
    super.estereotipo = "Mobile"
  }
  draw(){
    push();
    stroke(color(138, 138, 138))
    fill(color(17, 104, 189))
    rect(this.x, this.y, this.ancho, this.alto, 10)
    stroke(8, 66, 123)
    fill(8, 66, 123)
    circle(this.x + this.ancho/16, this.y+50, 5)  
    rect(this.x-15 + this.ancho, this.y+38, this.ancho/32, this.alto/4, 20)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Web extends Figura{
  constructor(x, y){
    super(x,y)
    super.estereotipo = "Web"
  }
  draw(){
    push();
    stroke(color(138, 138, 138))
    fill(color(17, 104, 189))
    rect(this.x, this.y, this.ancho, this.alto, 5)
    stroke(8, 66, 123)
    fill(8, 66, 123)
    circle(this.x + this.ancho/8, this.y+8, 4)  
    circle(this.x + this.ancho/16, this.y+8, 4)
    circle(this.x + this.ancho/16+25, this.y+8, 4)
    rect(this.x + this.ancho/16+40, this.y+4, this.ancho-70, this.alto/16, 20)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Sistema extends Figura{
  constructor(x,y, esAzul){
    super(x,y)
    super.estereotipo = "Software System"
    this.esAzul = esAzul
    if(this.esAzul){
      this.colorCentro = color(17, 104, 189)
      this.colorBorde = color(138, 138, 138) 
    }else{
      this.colorCentro = color(153, 153, 153)
      this.colorBorde = color(138, 138, 138)
    }
  }
  draw(){
    push();
    stroke(this.colorBorde)
    fill(this.colorCentro)
    rect(this.x, this.y, this.ancho, this.alto)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Container extends Figura{
  constructor(x,y){
    super(x,y)
    super.estereotipo = "Container"
      this.colorBorde = color(0, 170, 228) 
  }
  draw(){
    push();
    stroke(this.colorBorde)
    fill(0, 170, 228)
    rect(this.x, this.y, this.ancho, this.alto)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Component extends Figura{
  constructor(x,y){
    super(x,y)
    super.estereotipo = "Component"
      this.colorBorde = color(140, 206, 250) 
  }
  draw(){
    push();
    stroke(this.colorBorde)
    fill(135, 206, 235) 
    rect(this.x, this.y, this.ancho, this.alto)
    super.dibujarTexto()
    super.dibujarCajaEnMovimiento()
    pop()
  }
}

class Linea {
  constructor(figura1, figura2){
  this.figura1 = figura1
  this.figura2 = figura2
  this.radioDeAreaCentral = 20
  this.estereotipo = "{technology}"
  this.tieneEstereotipo = true
  this.centroLineaX
  this.centroLineaY
  this.seleccionado = false
  this.nombreDeRelacion = "{descripcion}"
  }
  reconstruirLinea(elOtroObjeto){
    this.setEstereotipo = elOtroObjeto.setEstereotipo
    this.setTieneEstereotipo = elOtroObjeto.tieneEstereotipo
    this.setNombreDeRelacion = elOtroObjeto.nombreDeRelacion
    this.centroLineaX = elOtroObjeto.centroLineaX
    this.centroLineaY = elOtroObjeto.centroLineaY 
  }
  set setEstereotipo(estereotipo){
    this.estereotipo = estereotipo
  }
  get getEstereotipo(){
    return this.estereotipo
  }
  set setSeleccionado(seleccionado){
    this.seleccionado = seleccionado
  }
  get getSeleccionado(){
    return this.seleccionado
  }
  set setNombreDeRelacion(nombreDeRelacion){
    this.nombreDeRelacion = nombreDeRelacion
  }
  get getNombreDeRelacion(){
    return this.nombreDeRelacion
  }
  set setTieneEstereotipo(tieneEstereotipo){
    this.tieneEstereotipo = tieneEstereotipo
  }
  get getTieneEstereotipo(){
    return this.tieneEstereotipo
  }

  draw(){
    push()
    this.centroLineaX = (this.figura1.getCentroX + this.figura2.getCentroX)/2
    this.centroLineaY = (this.figura1.getCentroY +this.figura2.getCentroY) /2
    drawingContext.setLineDash([10,5])
    line(this.figura1.getCentroX, this.figura1.getCentroY, this.figura2.getCentroX, this.figura2.getCentroY)
    if(this.getSeleccionado){
      fill(255,255,255)
      circle(this.centroLineaX, this.centroLineaY, this.radioDeAreaCentral)
      fill(0,0,0)
    }
    if(this.getTieneEstereotipo){
      textAlign(CENTER, CENTER)
      text(this.figura1.getNombre + '>'+ this.figura2.getNombre, this.centroLineaX, this.centroLineaY+20)
      text(`[${this.getEstereotipo}]`, this.centroLineaX, this.centroLineaY+5)
    }else{
      textAlign(CENTER,CENTER)
      text(this.figura1.getNombre + '>'+ this.figura2.getNombre, this.centroLineaX, this.centroLineaY+5)
    }
    textStyle(BOLD)
    text(this.nombreDeRelacion , this.centroLineaX, this.centroLineaY-10)
    pop()
  }
  enAreaCentral(x,y){
    if(this.radioDeAreaCentral > dist(this.centroLineaX, this.centroLineaY, x, y)){
      return true
    }
    return false
  }
}

var vectorDeEntidades = []
var vectorDeLineas = []
var elementoActual = null
var elementoParaEditar = null
var preparadoParaColocarElemento = false
var elementoQueSeColocara = ''
var ponerElemento = false
var relacionUno = null
var relacionDos = null
var lineaActual = null
var lineaParaEditar = null
var nivelDeDiagrama
var ultimoElementoClickeado
let seArrastroUnaFiguraUsandoElMouse = false
var myCanvas
var room = window.location.href.split('/')[4]

function setup() {
  // put setup code here
  createCanvas(1520,630)
  socket = io.connect('https://ec2-52-87-253-204.compute-1.amazonaws.com/')
  socket.on('welcome', (msg)=>{
    console.log('Received: ', msg);
  })
  socket.emit('joinRoom', room)
  socket.on('newUser', (res) => console.log(res))
  socket.on('err', (err) => console.log(err))
  socket.on('success', (res) => console.log(res))
  socket.on('mouse', draw2)
}

function draw(){
  background(220)
  vectorDeLineas.forEach(function(elemento){
    elemento.draw()
  })
  vectorDeEntidades.forEach(function(elemento){
    elemento.draw()
  })
}

function draw2(vectorDeEntidades2, vectorDeLineas2, room) {
  // put drawing code here
  let vectorDeEntidadesRecuperadas = []
  let vectorDeLineasRecuperadas = []
  vectorDeEntidades2.forEach(function(elemento){
    let entidadAReconstruir
    if(elemento.estereotipo === 'Person'){
      entidadAReconstruir = new Persona(0,0)
    }else{
      if(elemento.estereotipo === 'Database'){
        entidadAReconstruir = new Database(0,0)
      }else{
        if(elemento.estereotipo === 'Mobile'){
          entidadAReconstruir = new Mobile(0,0)
        }else{
          if(elemento.estereotipo === 'Web'){
            entidadAReconstruir = new Web(0,0)
          }else{
            if(elemento.estereotipo === 'Container'){
              entidadAReconstruir = new Container(0,0)
            }else{
              if(elemento.estereotipo === 'Component'){
                entidadAReconstruir = new Component(0,0)
              }else{
                 entidadAReconstruir = new Sistema(0,0, elemento.esAzul)
              }
            }
          }
        }
      }
    }
    entidadAReconstruir.reconstruirFigura(elemento)
    vectorDeEntidadesRecuperadas.push(entidadAReconstruir)
  })
  vectorDeEntidades = vectorDeEntidadesRecuperadas
  if(vectorDeLineas2 !== undefined){
    vectorDeLineas2.forEach(function(elemento){
      let figura1 = null
      let figura2 = null
      for(let i = 0; i < vectorDeEntidades.length && (figura1 === null || 
        figura2 === null); i++){
          if(vectorDeEntidades[i].getX === elemento.figura1.x &&
            vectorDeEntidades[i].getY === elemento.figura1.y){
              figura1 = vectorDeEntidades[i]
            }
            if(vectorDeEntidades[i].getX === elemento.figura2.x &&
              vectorDeEntidades[i].getY === elemento.figura2.y){
                figura2 = vectorDeEntidades[i]
            }
        }
        let lineaActual = new Linea(figura1, figura2)
        lineaActual.reconstruirLinea(elemento)
        vectorDeLineasRecuperadas.push(lineaActual)
    })
    vectorDeLineas = vectorDeLineasRecuperadas
  }
}

function mousePressed(){
  if(elementoActual != null && elementoActual.getSeleccionado){
    distanciaX = mouseX - elementoActual.getX
    distanciaY = mouseY - elementoActual.getY
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
  }
}

function doubleClicked(){
  if(elementoActual !== null && elementoActual.getSeleccionado){
    if(elementoActual.enAreaCentral(mouseX, mouseY)){
      if (elementoActual.getEstereotipo === 'Person'
       || elementoActual.getEstereotipo === 'Software System' 
       || elementoActual.getEstereotipo === 'Database'
       || elementoActual.getEstereotipo === 'Mobile'
       || elementoActual.getEstereotipo === 'Web'
       || elementoActual.getEstereotipo === 'Container'
       || elementoActual.getEstereotipo === 'Component'){
        elementoParaEditar = elementoActual
        mostrarModalEditarFigura()
      }
    }
  }
}

function mouseDragged(){
  if(elementoActual != null && elementoActual.getSeleccionado){
    if(elementoActual.enAreaCentral(mouseX, mouseY)){
      elementoActual.setX = mouseX-distanciaX
      elementoActual.setY = mouseY-distanciaY
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
    }else
      if(elementoActual.enCajaDerecha(mouseX,mouseY)){
        if(mouseIsPressed){
          if(elementoActual.getX + distanciaX - mouseX < 0){
            elementoActual.setAncho = elementoActual.getAncho + abs(elementoActual.getX + distanciaX - mouseX)
          }else{
            elementoActual.setAncho = elementoActual.getAncho - abs(elementoActual.getX + distanciaX - mouseX)
          }
          distanciaX = mouseX - elementoActual.getX 
          socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
        }
      }else
      if(elementoActual.enCajaIzquierda(mouseX, mouseY)){
        if(mouseIsPressed){
          if(elementoActual.getY + distanciaX - mouseY < 0){
            elementoActual.setAlto = elementoActual.getAlto + abs(elementoActual.getY + distanciaY - mouseY)
          }else{
            elementoActual.setAlto = elementoActual - abs(elementoActual.getY + distanciaY - mouseY)
          }
          distanciaY = mouseY - elementoActual.getY
          socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
        }
      }
      seArrastroUnaFiguraUsandoElMouse = true
  }
}

function mouseClicked(event){
  if(!preparadoParaColocarElemento){
   buscarElementoEnPizarra()
   //buscarLineaEnPizarra()
  }else{
    if(elementoQueSeColocara === 'persona' && ponerElemento){
      let nuevaPersona = new Persona(mouseX - 100, mouseY - 50)
      vectorDeEntidades.push(nuevaPersona)
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
      preparadoParaColocarElemento = false
      ponerElemento = false
    }else
    if((elementoQueSeColocara === 'sistema' || elementoQueSeColocara === 'sistema en diseño') && ponerElemento){
      let nuevoSistema = new Sistema(mouseX - 100, mouseY - 50, elementoQueSeColocara === 'sistema en diseño')
      vectorDeEntidades.push(nuevoSistema)
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
      preparadoParaColocarElemento = false
      ponerElemento = false
    }else
    if(elementoQueSeColocara === 'database' && ponerElemento){
      let nuevaDb = new Database(mouseX - 100, mouseY - 50)
      vectorDeEntidades.push(nuevaDb)
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
      preparadoParaColocarElemento = false
      ponerElemento = false
    }else
    if(elementoQueSeColocara === 'mobile' && ponerElemento){
      let nuevoMobile = new Mobile(mouseX - 100, mouseY - 50)
      vectorDeEntidades.push(nuevoMobile)
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
      preparadoParaColocarElemento = false
      ponerElemento = false
    }else
    if(elementoQueSeColocara === 'web' && ponerElemento){
      let nuevoWeb = new Web(mouseX - 100, mouseY - 50)
      vectorDeEntidades.push(nuevoWeb)
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
      preparadoParaColocarElemento = false
      ponerElemento = false
    }else
    if(elementoQueSeColocara === 'container' && ponerElemento){
      let nuevoContainer = new Container(mouseX - 100, mouseY - 50)
      vectorDeEntidades.push(nuevoContainer)
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
      preparadoParaColocarElemento = false
      ponerElemento = false
    }else
    if(elementoQueSeColocara === 'component' && ponerElemento){
      let nuevoComponent = new Component(mouseX - 100, mouseY - 50)
      vectorDeEntidades.push(nuevoComponent)
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
      preparadoParaColocarElemento = false
      ponerElemento = false
    }else
    if(elementoQueSeColocara === 'relacion' && ponerElemento){
      buscarElementoEnPizarra()
      if(relacionUno === null){
        relacionUno = elementoActual
      }else{
        relacionDos = elementoActual
      }
      if(relacionUno !== null && relacionDos !== null && relacionUno !== relacionDos ){
        let nuevaRelacion = new Linea(relacionUno, relacionDos)
        if(nivelDeDiagrama === 1){
          nuevaRelacion.setTieneEstereotipo = false
        }
        vectorDeLineas.push(nuevaRelacion)
        socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
        preparadoParaColocarElemento = false
        ponerElemento = false
        relacionUno = null
        relacionDos = null
      }
    }else{
      ponerElemento = true
    }
  }
  return false
}

function mouseReleased(){
  if(modalEditarFigura.classList.contains('hidden') && seArrastroUnaFiguraUsandoElMouse){
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
    seArrastroUnaFiguraUsandoElMouse = false
  }
}



function buscarElementoEnPizarra(){
  if(elementoActual !== null){
    elementoActual.setSeleccionado = false
  }
  let encontro = false
  for(let i = 0; i < vectorDeEntidades.length && !encontro; i++){
    if(vectorDeEntidades[i].enAreaCentral(mouseX, mouseY)){
      elementoActual = vectorDeEntidades[i]
      elementoActual.setSeleccionado = true
      encontro = true
      ultimoElementoClickeado = elementoActual
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
    }
  }
  if(!modalEditarFigura.classList.contains('hidden') || !encontro){
    elementoActual = null
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
  }
}

function buscarLineaEnPizarra(){
  if(lineaActual !== null ){
    lineaActual.setSeleccionado = false
    socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
  }/*
  for(let i = 0; i < vectorDeLineas.length && !encontro; i++){
    if(vectorDeLineas[i].enAreaCentral(mouseX, mouseY)){
      elementoActual = vectorDeLineas[i]
      elementoActual.seleccionado = true
      encontro = true
      ultimoElementoClickeado = elementoActual
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas)
    }
  }*/
}

function eliminarForma(){
    if(vectorDeLineas.length !== 0){
      vectorDeLineas.pop()
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
    }else{
      vectorDeEntidades.pop()
      socket.emit('mouse', vectorDeEntidades, vectorDeLineas, room)
    }
}


