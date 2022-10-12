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

      this.container.appendChild(this.renderer.domElement)

      this.container = document.createElement('div')
      document.body.appendChild(this.container)

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
      this.camera.position.set(100, 200, 300)

      //.domElement : HTMLDOMElement
      //The HTMLDOMElement used to listen for mouse / touch events. This must be passed in the constructor; changing it here will not set up new event listeners.
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.set(0, 100, 0)
      this.controls.update()

      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xa0a0a0)
      this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000)

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

      //ground
      var mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
      )
      mesh.rotation.x = -Math.PI / 2
      mesh.receiveShadow = true
      this.scene.add(mesh)

      //grid
      var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000)
      grid.material.opacity = 0.2
      grid.material.transparent = true
      this.scene.add(grid)

      //model
      var loader = new FBXLoader()
      loader.load('static/moon0/source/M.fbx', geometry => {
        this.scene.add(geometry)
      })
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

      //window.addEventListener('resize', this.onWindowResize, false)

      // //stats
      // this.stats = new Stats()
      // this.container.appendChild(this.stats.dom)
    },
    onWindowResize: function () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)
      console.log('test99')
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
