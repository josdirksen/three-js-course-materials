import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// create the camera to determine what we're looking at
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-2, 2, -3)
camera.lookAt(new THREE.Vector3(0, 0, 0))

// create a renderer that renders a scene with a camera
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// create a mesh, a combination between a shape and a material
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshNormalMaterial()
const cube = new THREE.Mesh(geometry, material)

// combine everything we want to render in a scene
const scene = new THREE.Scene()
scene.add(cube)

// create the stats object
const stats = new Stats()
// stats.showPanel(0)
// stats.showPanel(1)
document.body.append(stats.domElement)

// add a simple control gui, with a custom config object
const gui = new GUI()
const myConfig = {
  rotationSpeedX: 0.01,
  rotationSpeedY: 0.01,
  rotationSpeedZ: 0.01
}
const rotationFolder = gui.addFolder('Rotation Speed')
rotationFolder.add(myConfig, 'rotationSpeedX', 0, 0.1)
rotationFolder.add(myConfig, 'rotationSpeedY', 0, 0.1)
rotationFolder.add(myConfig, 'rotationSpeedZ', 0, 0.1)

// but we can also directly update properties of the cube
const sizeFolder = gui.addFolder('Mesh size')
sizeFolder.add(cube.scale, 'x', 0, 5)
sizeFolder.add(cube.scale, 'y', 0, 5)
sizeFolder.add(cube.scale, 'z', 0, 5)

// and we can alter the position of the cube as well
const positionFolder = gui.addFolder('Mesh position')
positionFolder.add(cube.position, 'x', -5, 5)
positionFolder.add(cube.position, 'y', -5, 5)
positionFolder.add(cube.position, 'z', -5, 5)

const orbitControls = new OrbitControls(camera, renderer.domElement)

// and add a nice little background to the scene
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('stary_sky.jpg')
scene.background = texture

// create an animation loop
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  cube.rotation.x += myConfig.rotationSpeedX
  cube.rotation.y += myConfig.rotationSpeedY
  cube.rotation.z += myConfig.rotationSpeedZ

  stats.update()
  orbitControls.update()
}
animate()
