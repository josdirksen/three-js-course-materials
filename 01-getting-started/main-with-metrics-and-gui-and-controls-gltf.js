import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DirectionalLight } from 'three'

const gltfLoader = new GLTFLoader()

// create the camera to determine what we're looking at
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(2, 2, -3)
camera.lookAt(new THREE.Vector3(0, 0, 0))

// create a renderer that renders a scene with a camera
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// combine everything we want to render in a scene
const scene = new THREE.Scene()

// lets load a mesh using the gltf loader
// gltfLoader.load('low_poly_animals/scene.gltf', (gltf) => {
//   const loadedScene = gltf.scene.children[0]
//   loadedScene.scale.setScalar(0.05)
//   scene.add(loadedScene)
// })
const completeLoadedScene = await gltfLoader.loadAsync('low_poly_animals/scene.gltf')
const model = completeLoadedScene.scene.children[0]
model.scale.setScalar(0.05)
scene.add(model)

// set the materials to mesh normal
const defaultMaterial = new THREE.MeshNormalMaterial()
model.traverse((child) => {
  if (child.isMesh) {
    child.material = defaultMaterial
  }
})

// create the stats object
const stats = new Stats()
document.body.append(stats.domElement)

// add a simple control gui, with a custom config object
const gui = new GUI()
const rotationSpeedFolder = gui.addFolder('Rotation Speed')
const myConfig = {
  rotationSpeedX: 0.0,
  rotationSpeedY: 0.0,
  rotationSpeedZ: 0.0
}
rotationSpeedFolder.add(myConfig, 'rotationSpeedX', 0, 0.1)
rotationSpeedFolder.add(myConfig, 'rotationSpeedY', 0, 0.1)
rotationSpeedFolder.add(myConfig, 'rotationSpeedZ', 0, 0.1)

const orbitControls = new OrbitControls(camera, renderer.domElement)

// and add a nice little background to the scene
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('stary_sky.jpg')
scene.background = texture

// lets add some lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(15, 15, -15)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0x222222)
scene.add(ambientLight)

// create an animation loop
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  stats.update()
  orbitControls.update()

  model.rotation.x += myConfig.rotationSpeedX
  model.rotation.y += myConfig.rotationSpeedY
  model.rotation.z += myConfig.rotationSpeedZ
}
animate()
