import './style.css'
import * as THREE from 'three'

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

// create an animation loop
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0.1
}
animate()
