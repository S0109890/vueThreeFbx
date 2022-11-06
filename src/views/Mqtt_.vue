<template>
  <div>
    <h1>MQTT 테스트</h1>
    {{ msg }}
  </div>
</template>

<script>
import mqtt from 'mqtt'
export default {
  data() {
    return {
      mtopic: '1',
      msg: '',
      mqttDataList: [] // mqtt를 통해 받은 데이터(리스트로 계속 추가됨)
    }
  },
  mounted() {
    this.createMqtt()
  },
  methods: {
    createMqtt() {
      // mqtt연결
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)
      mqttClient.on('connect', () => {
        // mqtt연결 시 구독한다.
        const topic = this.mtopic // 구독할 topic
        console.log('connect')
        mqttClient.subscribe(topic, {}, (error, res) => {
          if (error) {
            console.error('mqtt client error', error)
          }
        })
      })
      // 메세지 실시간 수신
      mqttClient.on('message', (topic, message) => {
        this.msg = '\'{"rotation":' + message + "}'"
        console.log(this.msg)
        const mqttData = JSON.parse(this.msg) // json string으로만 받을 수 있음
        // 선택된 devicdId만 수용함
        this.mqttDataList.push(mqttData) // 리스트에 계속 추가함
        console.log('message : ', mqttData) //메세지 출력
      })
    }
  }
}
</script>
