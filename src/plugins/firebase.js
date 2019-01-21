import VueFirestore from 'vue-firestore'
import Firebase from '@firebase/app'

require('@firebase/firestore')

var config = {
  apiKey: 'AIzaSyDFzzj1ZXi2RDfX6uymryyBPqimI8Oi0tA',
  authDomain: 'todoappbatch18-46450.firebaseapp.com',
  databaseURL: 'https://todoappbatch18-46450.firebaseio.com',
  projectId: 'todoappbatch18-46450',
  storageBucket: 'todoappbatch18-46450.appspot.com',
  messagingSenderId: '468294422820'
}

var firebaseApp = Firebase.initializeApp(config)

export default ({ app, router, Vue }) => {
  Vue.prototype.$db = firebaseApp
  Vue.use(VueFirestore)
}
