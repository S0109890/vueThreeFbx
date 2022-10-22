<template>
  <div id="container" ref="i"></div>
</template>
<script defer>
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Stats } from 'three/examples/jsm/libs/stats.module.js'

export default {
  name: 'ThreeTest',
  data() {
    return {
      container: null,
      stats: null,
      controls: null,
      camera: null,
      scene: null,
      renderer: null,
      light: null,
      clock: null,
      mixers: []
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    init: function () {
      this.clock = new THREE.Clock()

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.shadowMap.enabled = true
      document.body.appendChild(this.renderer.domElement)

      //this.container.appendChild(this.renderer.domElement)

      //create new div
      var newDiv = document.createElement('div')
      newDiv.id = 'container'
      //add div to html body
      document.body.appendChild(newDiv)

      //Get new dic by it's id
      this.container = document.getElementById('container')
      // console.log('2', this.container)
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
      this.camera.position.set(100, 200, 300)

      //.domElement : HTMLDOMElement
      //The HTMLDOMElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will not set up new event listeners.
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.set(0, 100, 0)
      this.controls.update()

      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xa0a0a0)
      this.scene.fog = new THREE.Fog(0xa0a0a0, 100, 2000)

      this.light = new THREE.HemisphereLight(0xffffff, 0x444444)
      this.light.position.set(0, 200, 0)
      this.scene.add(this.light)

      this.light = new THREE.DirectionalLight(0xffffff)
      this.light.position.set(0, 200, 100)
      this.light.castShadow = true
      // this.light.shadow.camara.top = 180
      // this.light.shadow.camera.bottom = -100
      // this.light.shadow.camera.left = -120
      // this.light.shadow.camera.right = 120
      this.scene.add(this.light)

      // //ground
      // var mesh = new THREE.Mesh(
      //   new THREE.PlaneGeometry(2000, 2000),
      //   new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
      // )
      // mesh.rotation.x = -Math.PI / 2
      // mesh.receiveShadow = true
      // this.scene.add(mesh)

      // //grid
      // var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000)
      // grid.material.opacity = 0.2
      // grid.material.transparent = true
      // this.scene.add(grid)

      // // //texture
      // // // instantiate a loader
      // const textureLoader = new THREE.TextureLoader()
      // //color
      // const colorTexture = textureLoader.load('static/moon0/tex/m_basecolor.png')
      // colorTexture.encoding = THREE.sRGBEncoding
      // //normal
      // const normalTexutre = textureLoader.load('static/moon0/tex/m_normal.png')
      // normalTexutre.anisotropy = 4
      // //roughness
      // const roughnessTexture = textureLoader.load('static/moon0/tex/m_roughness.png')
      // //metalness
      // const metalnessTexture = textureLoader.load('static/moon0/tex/m_metallic.png')

      // //material
      // const standardMaterial = new THREE.MeshStandardMaterial({
      //   map: colorTexture,
      //   normalMap: normalTexutre,
      //   metalness: 1,
      //   metalnessMap: metalnessTexture,
      //   roughnessMap: roughnessTexture,
      //   roughness: 1
      //   //envMapIntensity: API.envMapIntensity
      // })

      // bg img
      const imageLoader = new THREE.TextureLoader()
      imageLoader.load('static/moon0/360_img.jpg', data => {
        const material = new THREE.MeshBasicMaterial({
          map: data,
          side: THREE.BackSide
          // side: THREE.FrontSide,
        })
        const geometry = new THREE.SphereGeometry(400, 32, 32)
        const imgBGMesh = new THREE.Mesh(geometry, material)
        this.scene.add(imgBGMesh)
      })

      //this.renderer.render(this.scene, this.camera)

      //model
      var fbxloader = new FBXLoader()
      fbxloader.load(
        'static/moon0/source/m1.fbx',
        object => {
          object.scale.set(1, 1, 1)
          object.position.y = 100
          // object.position.x = -25;
          object.position.z = -100
          this.scene.add(object)
          console.log(object)
        },
        xhr => {
          console.log(xhr.loaded / xhr.total) * 100 + '% loaded'
        },
        error => {
          console.log(error)
        }
      )
      // loader.load(
      //   'static/moon0/source/M.fbx',
      //   //material
      //   standardMaterial,
      //   //scene add
      //   object => {
      //     object.traverse(function (child) {
      //       if (child.isMesh) {
      //         textureLoader.load('static/moon0/textures/x.jpg', texture => {
      //           child.material.map = texture
      //           child.material.needsupdate = true
      //           console.log('#', texture)
      //         })
      //         //console.log(child.geometry.attributes.uv)

      //         child.castShadow = true
      //         child.receiveShadow = true
      //       }
      //     })
      //     this.scene.add(object)
      //   },
      //   //call when loading is in progresses
      //   function (xhr) {
      //     console.log((xhr.loaded / xhr.total) * 100 + '%loaded')
      //   },
      //   //called when loading has errors
      //   function (error) {
      //     console.log('an error happened')
      //   }
      // )
      // loader.load('static/moon0/source/M.fbx', function (object) {
      //   // object.mixer = new THREE.AnimationMixer(object)
      //   // this.mixers.push(object.mixer)
      //   console.log('#', this.object)

      //   var action = object.mixer.clipAction(object.animations[0])
      //   action.play()

      //   object.traverse(function (child) {
      //     if (child.isMesh) {
      //       child.castShadow = true
      //       child.receiveShadow = true
      //     }
      //     //max to webgl 회전 보정??
      //     if (child.isGroup) {
      //       child.rotation.x = Math.PI
      //       child.rotation.y = Math.PI
      //       child.rotation.z = Math.PI
      //     }
      //   })
      //   this.scene.add(object)
      // })

      //윈도우 리사이즈
      window.addEventListener('resize', this.onWindowResize, false)

      // //stats
      // this.stats = new Stats()
      // this.container.appendChild(this.stats.dom)
    },
    onWindowResize: function () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate: function () {
      //domElement ㄱㅘㄴ련
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
      // requestAnimationFrame(this.animate)
      // console.log('test3')
      // if (this.mixers.length > 0) {
      //   for (var i = 0; i < this.mixers.length; i++) {
      //     console.log(this.mixers[i])
      //     this.mixers[i].update(this.clock.getDelta())
      //   }
      // }
      // this.renderer.render(this.scene, this.camera)
      // this.stats.update()
    }
  }
}
</script>
